import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
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
    default: Types.object(),
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