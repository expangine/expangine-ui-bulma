import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';




export interface FieldsetAttributes
{
  disabled: boolean;
}

export type FieldsetSlots = 'default';


export const Fieldset = addComponent<FieldsetAttributes>({
  collection: COLLECTION,
  name: 'fieldset',
  attributes: {
    disabled: Types.bool(),
  },
  slots: {
    default: {
      scope: Types.object(),
      accept: [
        `${COLLECTION}/field`,
      ],
    },
  },
  render: (c) => 
    ['fieldset', {
      disabled: Exprs.get('disabled'),
    }, {}, [
      createSlot(),
    ]]
});
