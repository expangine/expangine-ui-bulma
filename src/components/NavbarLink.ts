import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';


export interface NavbarLinkAttributes
{
  text: string;
  href: string;
  tab: boolean;
  active: boolean;
}

export interface NavbarLinkEvents
{
  click: void;
}

export type NavbarLinkSlots = 'default';

export const NavbarLink = addComponent<NavbarLinkAttributes, NavbarLinkEvents, NavbarLinkSlots>({
  collection: COLLECTION,
  name: 'navbar-link',
  attributes: {
    text: Types.text(),
    href: Types.text(),
    tab: Types.bool(),
    active: Types.bool(),
  },
  events: {
    click: BaseEventType,
  },
  slots: {
    default: Types.object({
      text: Types.text(),
    }),
  },
  render: (c) =>
    ['a', {
      class: Exprs.tuple(
        'navbar-item', 
        ifConst(['tab'], 'is-tab'), 
        ifConst(['active'], 'is-active'),
      ),
      href: Exprs.get('href'),
    }, {
      click: (e: any) => c.trigger('click', e),
    }, [
      c.whenSlot('default',
        () => Exprs.get('text'), 
        () => createSlot({ scope: {
          text: Exprs.get('text'),
        }}),
      ),
    ]],
})