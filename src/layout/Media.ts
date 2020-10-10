import { Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export type MediaSlots = 'left' | 'right' | 'default';

export const Media = addComponent<never, never, MediaSlots>({
  collection: COLLECTION,
  name: 'media',
  slots: {
    left: Types.object(),
    right: Types.object(),
    default: Types.object(),
  },
  render: (c) => 
    ['article', { class: 'media' }, {}, [
      c.whenSlot('left', () => '', () =>
        ['figure', { class: 'media-left' }, {}, [
          createSlot({ name: 'left' })
        ]]
      ),
      ['div', { class: 'media-content' }, {}, [
        createSlot()
      ]],
      c.whenSlot('right', () => '', () =>
        ['div', { class: 'media-right' }, {}, [
          createSlot({ name: 'right' })
        ]]
      ),
    ]],
});