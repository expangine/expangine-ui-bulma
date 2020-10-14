import { Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export type FooterSlots = 'default';

export const Footer = addComponent<never, never, FooterSlots>({
  collection: COLLECTION,
  name: 'footer',
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) =>
    ['footer', {
      class: 'footer',
    }, {}, [
      createSlot()
    ]],
})