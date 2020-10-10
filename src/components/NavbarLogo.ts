import { Exprs, Types } from 'expangine-runtime';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { BaseEventType } from '../Types';


export interface NavbarLogoAttributes
{
  href: string;
  src: string;
  height: number;
  alt: string;
}

export interface NavbarLogoEvents
{
  click: void;
}

export const NavbarLogo = addComponent<NavbarLogoAttributes, NavbarLogoEvents>({
  collection: COLLECTION,
  name: 'navbar-logo',
  attributes: {
    href: Types.text(),
    src: Types.text(),
    alt: Types.text(),
    height: Types.number(),
  },
  events: {
    click: BaseEventType,
  },
  render: (c) =>
    ['a', {
      class: 'navbar-item',
      href: Exprs.get('href'),
    }, {
      click: (e: any) => c.trigger('click', e),
    }, [
      ['img', {
        src: Exprs.get('src'),
        height: Exprs.get('height'),
        alt: Exprs.get('alt'),
      }],
    ]],
})