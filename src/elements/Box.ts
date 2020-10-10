import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export const Box = addComponent({
  collection: COLLECTION,
  name: 'box',
  render: (c) => 
    ['div', { class: 'box' }, {}, [
      createSlot(),
    ]],
});