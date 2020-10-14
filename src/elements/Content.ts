import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Size } from '../Types';


export interface ContentAttributes
{
  size: string;
}

export const Content = addComponent<ContentAttributes>({
  collection: COLLECTION,
  name: 'content',
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
    ['div', {
      class: Exprs.tuple(
        'content', 
        Exprs.get('size')
      ),
    }, {}, [
      createSlot()
    ]],
})