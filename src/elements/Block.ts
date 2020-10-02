import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';


export const Block = addComponent({
  collection: COLLECTION,
  name: 'block',
  render: (c) => 
    ['div', { class: 'block' }, {}, [
      createSlot(),
    ]],
});