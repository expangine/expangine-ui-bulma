import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createIf, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType, Colors, Size } from '../Types';


export interface TagAttributes
{
  text: string;
  color: string;
  size: string;
  rounded: boolean;
  light: boolean;
  deleteTag: boolean;
  deletable: boolean;
  deleteSize: string;
}

export interface TagEvents
{
  deleted: void;
  click: void;
}

export interface TagComputed
{
  classes: string;
}

export type TagSlots = 'default';


export const Tag = addComponent<TagAttributes, TagEvents, TagSlots, never, TagComputed>({
  collection: COLLECTION,
  name: 'tag',
  attributes: {
    text: Types.text(),
    color: Colors,
    size: Size,
    rounded: Types.bool(),
    light: Types.bool(),
    deleteTag: Types.bool(),
    deletable: Types.bool(),
    deleteSize: Size,
  },
  computed: {
    classes: Exprs.tuple(
      'tag',
      Exprs.get('color'),
      Exprs.get('size'),
      ifConst(['deleteTag'], 'is-delete'),
      ifConst(['rounded'], 'is-rounded'),
      ifConst(['light'], 'is-light'),
    ),
  },
  events: {
    deleted: BaseEventType,
    click: BaseEventType,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) =>
    ['span', {
      class: Exprs.get('classes'),
    }, {
      click: (e: any) => {
        if (c.scope.get('deleteTag', false as never, true)) {
          c.trigger('deleted', e);
        }
        c.trigger('click', e);
      },
    }, [
      c.whenSlot('default', 
        () => Exprs.get('text'), 
        () => createSlot(),
      ),
      createIf(Exprs.get('deletable'), [
        ['button', {
          class: Exprs.tuple('delete', Exprs.get('deleteSize')),
        }, {
          click: (e: any) => c.trigger('deleted', e),
        }],
      ])
    ]],
})