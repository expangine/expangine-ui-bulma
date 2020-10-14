import { Exprs, Types } from 'expangine-runtime';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { BaseEventType, LinkOptions } from '../Types';


export interface NavbarLogoAttributes
{
  options: any;
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
    options: LinkOptions,
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
      ['img', {
        src: Exprs.get('src'),
        height: Exprs.get('height'),
        alt: Exprs.get('alt'),
      }],
    ]],
})