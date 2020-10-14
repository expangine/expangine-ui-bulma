import { Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export const Block = addComponent({
  collection: COLLECTION,
  name: 'block',
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) => 
    ['div', { class: 'block' }, {}, [
      createSlot(),
    ]],
});