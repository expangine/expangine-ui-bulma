import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Size } from '../Types';


export interface SectionAttributes
{
  size: string;
}

export type SectionSlots = 'default';

export const Section = addComponent<SectionAttributes, never, SectionSlots>({
  collection: COLLECTION,
  name: 'section',
  attributes: {
    size: Size,
  },
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) =>
    ['section', {
      class: Exprs.tuple(
        'section',
        Exprs.get('size')
      ),
    }, {}, [
      createSlot()
    ]],
})