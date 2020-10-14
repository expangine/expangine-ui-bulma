import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { BaseEventType } from '../Types';
import { ifConst } from '../util';


export interface NavbarItemAttributes
{
  tab: boolean;
  active: boolean;
}

export interface NavbarItemClick
{
  click: void;
}

export type NavbarItemSlots = 'default';

export const NavbarItem = addComponent<NavbarItemAttributes, NavbarItemClick, NavbarItemSlots>({
  collection: COLLECTION,
  name: 'navbar-item',
  attributes: {
    tab: Types.bool(),
    active: Types.bool(),
  },
  slots: {
    default: Types.object(),
  },
  events: {
    click: BaseEventType,
  },
  render: (c) =>
    ['div', {
      class: Exprs.tuple(
        'navbar-item', 
        ifConst(['tab'], 'is-tab'), 
        ifConst(['active'], 'is-active'),
      ),
    }, {
      click: (e: any) => c.trigger("click", e),
    }, [
      createSlot(),
    ]],
})