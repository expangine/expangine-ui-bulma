import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';


export interface NavbarItemAttributes
{
  tab: boolean;
  active: boolean;
}

export type NavbarItemSlots = 'default';

export const NavbarItem = addComponent<NavbarItemAttributes, never, NavbarItemSlots>({
  collection: COLLECTION,
  name: 'navbar-item',
  attributes: {
    tab: Types.bool(),
    active: Types.bool(),
  },
  slots: {
    default: Types.object(),
  },
  render: (c) =>
    ['div', {
      class: Exprs.tuple(
        'navbar-item', 
        ifConst(['tab'], 'is-tab'), 
        ifConst(['active'], 'is-active'),
      ),
    }, {}, [
      createSlot(),
    ]],
})