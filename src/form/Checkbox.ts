import { AnyOps, Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';




export interface CheckboxAttributes
{
  value: any;
  checkedValue: any;
  uncheckedValue: any;
  disabled: boolean;
  label: string;
}

export interface CheckboxEvents
{
  update: CheckboxUpdateEvent;
}

export interface CheckboxUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: any;
}

export type CheckboxSlots = 'default';

export const CheckboxUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  value: Types.any(),
});

export const Checkbox = addComponent<CheckboxAttributes, CheckboxEvents, CheckboxSlots>({
  collection: COLLECTION,
  name: 'checkbox',
  attributes: {
    value: Types.any(),
    label: Types.text(),
    checkedValue: {
      type: Types.any(),
      default: Exprs.true(),
    },
    uncheckedValue: {
      type: Types.any(),
      default: Exprs.false(),
    },
    disabled: Types.bool(),
  },  
  events: {
    update: CheckboxUpdateEventType,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['label', {
      class: 'checkbox',
      disabled: Exprs.get('disabled'),
    }, {}, [
      ['input', {
        type: 'checkbox',
        disabled: Exprs.get('disabled'),
        checked: Exprs.op(AnyOps.isEqual, {
          value: Exprs.get('value'),
          test: Exprs.get('checkedValue'),
        }),
      }, {
        change: (e: any) => {
          const checked = e.nativeEvent.target.checked;

          e.value = checked
            ? c.scope.get('checkedValue')
            : c.scope.get('uncheckedValue');

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