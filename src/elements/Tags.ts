import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
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
  slots: {
    default: {
      type: Types.object(),
      required: true,
      only: [
        `${COLLECTION}/tag`,
      ],
    },
  },
  render: (c) =>
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      createSlot()
    ]],
})