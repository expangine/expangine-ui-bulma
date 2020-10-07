import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';


export interface TagsAttributes
{
  attached: boolean;
}

export interface TagsComputed
{
  classes: string;
}

export const Tags = addComponent<TagsAttributes, never, never, never, TagsComputed>({
  collection: COLLECTION,
  name: 'tags',
  attributes: {
    attached: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'tags',
      ifConst(['attached'], 'has-addons'),
    ),
  },
  render: (c) =>
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      createSlot()
    ]],
})