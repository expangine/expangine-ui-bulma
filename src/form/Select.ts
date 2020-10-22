import { AnyOps, Expression, Exprs, ListOps, ListType, ObjectType, Type, Types } from 'expangine-runtime';
import { createFor, createIf, createIfElse, createSlot, NodeTemplate, TypeProvider } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Status, Size } from '../Types';
import { ifConst, ifTemplate } from '../util';




export interface SelectAttributes
{
  value: string;
  options: any[];
  getValue: any;
  getText: any;
  getDisabled: any;
  getGroup: any; 
  getSortBy: number;
  getSortByGroup: number;
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
  optionsMapped: any[];
  optionsSorted: any[];
  optionsGrouped: any[];
  optionsGroupedSorted: any[];
}

export interface SelectUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: any;
  values: any[];
  option: any;
  options: any[];
}

const ValueType = Types.text();
const ListValue = Types.list(ValueType);

const getListType = (type?: Type): Type => 
  type instanceof ListType
    ? type
    : ListValue;

const getListItemType = (type?: Type): Type =>
  type instanceof ListType
    ? type.options.item
    : ValueType;

const getListItemScope: TypeProvider<{ options: any[] }, ObjectType> = 
  (a) => Types.object({
    option: getListItemType(a.options),
  });

export const Select = addComponent<SelectAttributes, SelectEvents, SelectSlots, never, SelectComputed>({
  collection: COLLECTION,
  name: 'select',
  attributes: {
    value: {
      type: (a) => a.getValue
        ? a.multiple
          ? Types.many(a.getValue, Types.list(a.getValue))
          : a.getValue
        : a.value || ValueType,
      required: true,
    },
    options: {
      type: (a) => getListType(a.options),
      required: true,
    },
    getValue: {
      type: (a) => a.getValue 
        ? a.getValue
        : getListItemType(a.options),
      default: Exprs.get('option'),
      callable: getListItemScope,
    },
    getText: {
      type: Types.text(),
      default: Exprs.get('option'),
      callable: getListItemScope,
    },
    getDisabled: {
      type: Types.bool(),
      callable: getListItemScope,
    },
    getGroup: {
      type: Types.text(),
      callable: getListItemScope,
    },
    getSortBy: {
      type: Types.number(),
      callable: (a) => Types.object({
        a: getListItemType(a.options),
        b: getListItemType(a.options),
      }),
    },
    getSortByGroup: {
      type: Types.number(),
      callable: (a) => Types.object({
        a: Types.object({
          by: Types.text(),
          group: getListType(a.options),
        }),
        b: Types.object({
          by: Types.text(),
          group: getListType(a.options),
        }),
      }),
    },
    status: Status,
    size: Size,
    emptyText: Types.text(),
    placeholder: Types.text(),
    multiple: Types.bool(),
    multipleSize: Types.number(0, undefined, true),
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
    optionsMapped: (c) => Exprs.op(ListOps.map, {
      list: Exprs.get('options'),
      transform: Exprs.object({
        data: Exprs.get('option'),
        index: Exprs.get('optionIndex'),
        value: c.getAttributeExpression('getValue'),
        group: c.getAttributeExpression('getGroup'),
        disabled: c.getAttributeExpression('getDisabled'),
        text: c.getAttributeExpression('getText'),
      }),
    }, {
      item: 'option',
      index: 'optionIndex',
    }),
    optionsSorted: (c) => c.hasCallable('getSortBy')
      ? Exprs.op(ListOps.sort, {
          list: Exprs.get('optionsMapped'),
          compare: c.call('getSortBy', {
            a: Exprs.get('value', 'data'),
            b: Exprs.get('test', 'data'),
          }),
        })
      : Exprs.get('optionsMapped'),
    optionsGrouped: (c) => c.hasCallable('getGroup')
      ? Exprs.op(ListOps.group, {
          list: Exprs.get('optionsSorted'),
          by: c.call('getGroup', {
            option: Exprs.get('sortedOption', 'data'),
          }),
        }, {
          item: 'sortedOption',
        })
      : Exprs.noop(),
    optionsGroupedSorted: (c) => c.hasCallable('getSortByGroup')
      ? Exprs.op(ListOps.sort, {
          list: Exprs.get('optionsGrouped'),
          compare: c.getAttributeExpression('getSortByGroup'),
        }, {
          value: 'a',
          test: 'b'
        })
      : Exprs.get('optionsGrouped'),
  },
  slots: {
    text: getListItemScope,
  },
  events: {
    update: (a) => Types.object({
      nativeEvent: Types.any(),
      stop: Types.bool(),
      prevent: Types.bool(),
      value: a.getValue || ValueType,
      values: a.getValue 
        ? Types.list(a.getValue)
        : ListValue,
      option: getListItemType(a.options),
      options: getListType(a.options),
    }),
  },
  render: (c) => {
    const RenderOption: NodeTemplate = 
      ['option', { 
        value: Exprs.get('opt', 'index'),
        disabled: Exprs.get('opt', 'disabled'),
        selected: Exprs.if(
          Exprs.op(ListOps.isValid, {
            value: Exprs.get('value'),
          })
        ).than( 
          Exprs.op(ListOps.contains, {
            list: Exprs.get('value'),
            item: Exprs.get('opt', 'value'),
            isEqual: Exprs.op(AnyOps.isEqual, {
              value: Exprs.get('valueItem'),
              test: Exprs.get('optValue'),
            })
          }, {
            value: 'valueItem',
            test: 'optValue'
          })
        ).else(
          Exprs.op(AnyOps.isEqual, {
            value: Exprs.get('value'),
            test: Exprs.get('opt', 'value'),
          })
        ),
      }, {}, [
        c.whenSlot('text', 
          () => Exprs.get('opt', 'text'),
          () => createSlot({ name: 'text', scope: { 
            option: Exprs.get('opt', 'data') 
          }})
        )
      ]];
    const RenderOptions = (list: Expression) =>
      createFor(list, [
        RenderOption,
      ], {
        item: 'opt',
        index: 'optIndex',
      });

    return ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      ['select', {
        multiple: Exprs.get('multiple'),
        size: Exprs.get('multipleSize'),
        disabled: Exprs.get('disabled'),
        readOnly: Exprs.get('readonly'),
      }, {
        change: (e: any) => {
          const givenOptions = c.scope.get('optionsMapped', [] as never, true);
          
          const select = e.nativeEvent.target as HTMLSelectElement;
          const selectOptions: HTMLOptionElement[] = Array.prototype.slice.call(select.selectedOptions);
          const optionsMapped: any[] = selectOptions
            .map((option) => option.value ? givenOptions[parseInt(option.value)] : null)
            .filter((x) => Boolean(x));
          const options = optionsMapped
            .map((mapped) => mapped.data);
          const values = optionsMapped
            .map((mapped) => mapped.value);

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
        c.hasCallable('getGroup')
          ? createFor(Exprs.get('optionsGroupedSorted'), [
              createIfElse(Exprs.get('grouped', 'by'), [
                ['optgroup', {
                  label: Exprs.get('grouped', 'by'),
                }, {}, [
                  RenderOptions(Exprs.get('grouped', 'group')),
                ]],
              ], [
                RenderOptions(Exprs.get('grouped', 'group')),
              ]),
            ], {
              item: 'grouped',
              index: 'groupedIndex',
            })
          : RenderOptions(Exprs.get('optionsSorted')),
      ]],
    ]];
  },
});