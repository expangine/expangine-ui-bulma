import { AnyOps, Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';




export interface RadioAttributes
{
  value: any;
  name: string;
  checkedValue: any;
  disabled: boolean;
  label: string;
}

export interface RadioEvents
{
  update: RadioUpdateEvent;
}

export interface RadioUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: any;
}

export type RadioSlots = 'default';

export const RadioUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  value: Types.any(),
});

export const Radio = addComponent<RadioAttributes, RadioEvents, RadioSlots>({
  collection: COLLECTION,
  name: 'radio',
  attributes: {
    value: Types.any(),
    label: Types.optional(Types.text()),
    name: Types.text(),
    checkedValue: Types.any(),
    disabled: Types.bool(),
  },
  events: {
    update: RadioUpdateEventType,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['label', {
      class: 'radio',
      disabled: Exprs.get('disabled'),
    }, {}, [
      ['input', {
        type: 'radio',
        name: Exprs.get('name'),
        disabled: Exprs.get('disabled'),
        checked: Exprs.op(AnyOps.isEqual, {
          value: Exprs.get('value'),
          test: Exprs.get('checkedValue'),
        }),
      }, {
        change: (e: any) => {
          const checked = e.nativeEvent.target.checked;

          if (checked) {
            e.value = c.scope.get('checkedValue');
          }

          c.trigger('update', e);
        },
      }],
      c.whenSlot('default', 
        () => Exprs.op(AnyOps.coalesce, {
            a: Exprs.get('label'),
            b: Exprs.const(''),
          }),
        () => createSlot(),
      ),
    ]]
});
