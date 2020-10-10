import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export const Block = addComponent({
  collection: COLLECTION,
  name: 'block',
  render: (c) => 
    ['div', { class: 'block' }, {}, [
      createSlot(),
    ]],
});