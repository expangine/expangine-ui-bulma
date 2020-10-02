import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';


export const Box = addComponent({
  collection: COLLECTION,
  name: 'box',
  render: (c) => 
    ['div', { class: 'box' }, {}, [
      createSlot(),
    ]],
});