import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../helpers';
import { Colors } from '../Types';


export type HeroSize = '' | 'is-medium' | 'is-large' | 'is-fullheight' | 'is-fullheight-with-navbar';

export interface HeroAttributes
{ 
  color: string;
  size: HeroSize;
  gradient: boolean; 
}

export type HeroSlots = 'default' | 'footer' | 'header';

export interface HeroComputed
{ 
  heroClass: string 
}

export const HeroSizeType = Types.optional(Types.enumForText([
  ['', 'Default'],
  ['is-medium', 'Medium'],
  ['is-large', 'Large'],
  ['is-fullheight', 'Fullheight'],
  ['is-fullheight-with-navbar', 'Fullheight with Navbar'],
]));

export const Hero = addComponent<HeroAttributes, never, HeroSlots, never, HeroComputed>({
  collection: COLLECTION,
  name: 'hero',
  attributes: {
    color: Colors,
    size: HeroSizeType,
    gradient: Types.bool(),
  },
  computed: {
    heroClass: Exprs.tuple(
      'hero', 
      Exprs.get('color'), 
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