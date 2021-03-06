import { Types, Exprs } from 'expangine-runtime';
import { createFor, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';


export interface LevelAttributes
{ 
  centered: boolean;
  mobile: boolean; 
}

export type LevelSlots = 'left' | 'right' | 'default';

export interface LevelComputed
{
  itemClass: string[];
  levelClass: string[];
}

export const Level = addComponent<LevelAttributes, never, LevelSlots, never, LevelComputed>({
  collection: COLLECTION,
  name: 'level',
  attributes: {
    centered: Types.bool(),
    mobile: Types.bool(),
  },
  computed: {
    itemClass: Exprs.tuple(
      'level-item',
      ifConst(['centered'], 'has-text-centered'),
    ),
    levelClass: Exprs.tuple(
      'level',
      ifConst(['mobile'], 'is-mobile'),
    ),
  },
  slots: {
    left: {
      scope: Types.object(),
      array: true,
    },
    right: {
      scope: Types.object(),
      array: true,
    },
    default: {
      scope: Types.object(),
      array: true,
    },
  },
  render: (c) => 
    ['div', { class: Exprs.get('levelClass') }, {}, [
      c.whenSlot('left', () => '', () =>
        ['div', { class: 'level-left' }, {}, [
          createFor(c.getSlotArrayLength('left'), [
            ['div', { class: Exprs.get('itemClass') }, {}, [
              createSlot({ name: 'left', slotIndex: Exprs.get('index') })
            ]]
          ]),
        ]]
      ),
      c.whenSlot('default', () => '', () =>
        createFor(c.getSlotArrayLength('default'), [
          ['div', { class: Exprs.get('itemClass') }, {}, [
            createSlot({ name: 'default', slotIndex: Exprs.get('index') })
          ]]
        ]),
      ),
      c.whenSlot('right', () => '', () =>
        ['div', { class: 'level-right' }, {}, [
          createFor(c.getSlotArrayLength('right'), [
            ['div', { class: Exprs.get('itemClass') }, {}, [
              createSlot({ name: 'right', slotIndex: Exprs.get('index') })
            ]]
          ]),
        ]]
      ),
    ]],
});