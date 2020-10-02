import { AnyOps, Exprs, ListOps, Types } from 'expangine-runtime';
import { addComponent, createFor, createIf, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { Status, Size } from '../Types';
import { ifConst, ifTemplate } from '../helpers';




export interface SelectAttributes
{
  value: string;
  options: any[];
  getValue: any;
  getText: any;
  emptyText: string;
  multiple: boolean;
  multipleSize: number;
  status: string;
  size: string;
  placeholder: string;
  rounded: boolean;
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
}

export interface SelectEvents
{
  update: SelectUpdateEvent;
}

export type SelectSlots = 'text';

export interface SelectComputed
{
  classes: string;
  optionsMap: Map<any, string>;
}

export interface SelectUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: string;
  option: any;
}

export const SelectUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  value: Types.any(),
  values: Types.list(Types.any()),
  option: Types.any(),
  options: Types.list(Types.any()),
});

export const Select = addComponent<SelectAttributes, SelectEvents, SelectSlots, never, SelectComputed>({
  collection: COLLECTION,
  name: 'select',
  attributes: {
    options: Types.list(Types.any()),
    getValue: {
      type: Types.any(),
      default: Exprs.get('option'),
      callable: Types.object({
        option: Types.any(),
      }),
    },
    getText: {
      type: Types.text(),
      default: Exprs.get('option', 'text'),
      callable: Types.object({
        option: Types.any(),
      }),
    },
    emptyText: Types.text(),
    value: Types.optional(Types.text()),
    status: Types.optional(Status),
    size: Types.optional(Size),
    placeholder: Types.optional(Types.text()),
    multiple: Types.bool(),
    multipleSize: Types.optional(Types.number(0, undefined, true)),
    rounded: Types.bool(),
    disabled: Types.bool(),
    readonly: Types.bool(),
    loading: Types.bool(),
  },  
  computed: {
    classes: Exprs.tuple(
      'select',
      Exprs.get('size'),
      ifTemplate(['status'], 'is-{value}'),
      ifConst(['loading'], 'is-loading'),
      ifConst(['rounded'], 'is-rounded'),
      ifConst(['fixedSize'], 'has-fixed-size'),
    ),
    optionsMap: Exprs.op(ListOps.toMap, {
      list: Exprs.get('options'),
      getValue: Exprs.get('index'),
      getKey: Exprs.get('item'),
    }),
  },
  slots: {
    text: Types.object({
      option: Types.any(),
    }),
  },
  events: {
    update: SelectUpdateEventType,
  },
  render: (c) => 
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      ['select', {
        multiple: Exprs.get('multiple'),
        size: Exprs.get('multipleSize'),
        disabled: Exprs.get('disabled'),
        readOnly: Exprs.get('readonly'),
      }, {
        change: (e: any) => {
          const givenOptions = c.scope.get('options', [] as never, true);
          const getValue = c.callable('getValue');

          const select = e.nativeEvent.target as HTMLSelectElement;
          const selectOptions: HTMLOptionElement[] = Array.prototype.slice.call(select.selectedOptions);
          const options: any[] = selectOptions
            .map((option) => option.value ? givenOptions[parseInt(option.value)] : null)
            .filter((x) => Boolean(x));
          const values = options
            .map((option) => getValue({ option }));

          e.value = values[0];
          e.values = values;
          e.option = options[0];
          e.options = options;
          
          c.trigger('update', e);
        },
      }, [
        createIf(Exprs.get('emptyText'), [
          ['option', {}, {}, [
            Exprs.get('emptyText'),
          ]],
        ]),
        createFor(Exprs.get('options'), [
          ['option', { 
            value: Exprs.get('optionIndex'),
            selected: Exprs.if(
              Exprs.op(ListOps.isValid, {
                value: Exprs.get('value'),
              })
            ).than( 
              Exprs.op(ListOps.contains, {
                list: Exprs.get('value'),
                item: c.call('getValue', {
                  option: Exprs.get('option')
                }),
                isEqual: Exprs.op(AnyOps.isEqual, {
                  value: Exprs.get('value'),
                  test: Exprs.get('test'),
                })
              })
            ).else(
              Exprs.op(AnyOps.isEqual, {
                value: Exprs.get('value'),
                test: c.call('getValue', {
                  option: Exprs.get('option')
                }),
              })
            ),
          }, {}, [
            c.whenSlot('text', 
              () => c.call('getText', { option: Exprs.get('option') }),
              () => createSlot({ name: 'text', scope: { option: Exprs.get('option') } })
            )
          ]],
        ], { item: 'option', index: 'optionIndex' }),
      ]],
    ]],
});