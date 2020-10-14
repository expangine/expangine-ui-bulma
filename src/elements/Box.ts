import { Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export const Box = addComponent({
  collection: COLLECTION,
  name: 'box',
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) => 
    ['div', { class: 'box' }, {}, [
      createSlot(),
    ]],
});