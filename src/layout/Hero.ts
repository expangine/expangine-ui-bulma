import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../helpers';


export type HeroType = 'is-primary' | 'is-info' | 'is-success' | 'is-link' | 'is-warning' | 'is-danger' | 'is-light' | 'is-dark';

export type HeroSize = '' | 'is-medium' | 'is-large' | 'is-fullheight' | 'is-fullheight-with-navbar';

export interface HeroAttributes
{ 
  type: HeroType;
  size: HeroSize;
  gradient: boolean; 
}

export type HeroSlots = 'default' | 'footer' | 'header';

export interface HeroComputed
{ 
  heroClass: string 
}

export const Hero = addComponent<HeroAttributes, never, HeroSlots, never, HeroComputed>({
  collection: COLLECTION,
  name: 'hero',
  attributes: {
    type: Types.optional(Types.enumForText([
      ['is-primary', 'Primary'],
      ['is-info', 'Info'],
      ['is-success', 'Success'],
      ['is-link', 'Link'],
      ['is-warning', 'Warning'],
      ['is-danger', 'Danger'],
      ['is-light', 'Light'],
      ['is-dark', 'Dark'],
    ])),
    size: Types.optional(Types.enumForText([
      ['', 'Default'],
      ['is-medium', 'Medium'],
      ['is-large', 'Large'],
      ['is-fullheight', 'Fullheight'],
      ['is-fullheight-with-navbar', 'Fullheight with Navbar'],
    ])),
    gradient: {
      type: Types.bool(),
      default: Exprs.false(),
    },
  },
  computed: {
    heroClass: Exprs.tuple(
      'hero', 
      Exprs.get('type'), 
      Exprs.get('size'), 
      ifConst(['gradient'], 'is-bold'),
    ),
  },
  slots: {
    header: Types.object(),
    footer: Types.object(),
    default: Types.object(),
  },
  render: (c) => 
    ['section', { class: Exprs.get('heroClass') }, {}, [
      c.whenSlot('header', () => '', () =>
        ['div', { class: 'hero-head' }, {}, [
          createSlot({ name: 'header' }),
        ]],
      ),
      ['div', { class: 'hero-body' }, {}, [
        createSlot(),
      ]],
      c.whenSlot('footer', () => '', () =>
        ['div', { class: 'hero-foot' }, {}, [
          createSlot({ name: 'footer' }),
        ]],
      ),
    ]],
})