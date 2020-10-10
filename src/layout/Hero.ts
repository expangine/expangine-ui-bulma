import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { Colors } from '../Types';


export interface HeroAttributes
{ 
  color: string;
  size: string;
  gradient: boolean; 
}

export interface HeroComputed
{ 
  heroClass: string 
}

export type HeroSlots = 'default' | 'footer' | 'header';

export const HeroSize = Types.optional(Types.enumForText([
  ['Default', ''],
  ['Medium', 'is-medium'],
  ['Large', 'is-large'],
  ['Fullheight', 'is-fullheight'],
  ['Fullheight with Navbar', 'is-fullheight-with-navbar'],
]));

export const Hero = addComponent<HeroAttributes, never, HeroSlots, never, HeroComputed>({
  collection: COLLECTION,
  name: 'hero',
  attributes: {
    color: Colors,
    size: HeroSize,
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