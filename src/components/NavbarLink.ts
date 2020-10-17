import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';
import { getLinkAttributes, LinkOptionsType, LinkOptions } from "../helpers/Link";


export interface NavbarLinkAttributes
{
  text: string;
  options: LinkOptions;
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
  targets: [
    `${COLLECTION}/navbar`,
    `${COLLECTION}/navbar-menu`,
  ],
  attributes: {
    text: Types.text(),
    options: LinkOptionsType,
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
      ...getLinkAttributes(['options']),
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