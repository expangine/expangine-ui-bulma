import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType, LinkOptions } from '../Types';


export interface NavbarLinkAttributes
{
  text: string;
  options: any;
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
    options: LinkOptions,
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
      href: Exprs.get('options', 'href'),
      download: Exprs.if(
        Exprs.get('options', 'download')
      ).than(
        Exprs.true()
      ),
      rel: Exprs.if(
        Exprs.get('options', 'external')
      ).than(
        Exprs.const('noreferrer noopener')
      ),
      target: Exprs.if(
        Exprs.get('options', 'tab')
      ).than(
        Exprs.const('_blank')
      ),
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