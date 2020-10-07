import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createFor, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { Colors } from '../Types';


export interface NavbarAttributes
{
  color: string;
  fixed: string;
  transparent: boolean;
  extraSpace: boolean;
  main: boolean;
}

export interface NavbarComputed
{
  classes: string;
  burgerClasses: string;
  menuClasses: string;
}

export interface NavbarState
{
  active: boolean;
}

export type NavbarSlots = 'left' | 'right' | 'brand';

export const NavbarSlotOnly = [
  `${COLLECTION}/navbar-logo`,
  `${COLLECTION}/navbar-item`,
  `${COLLECTION}/navbar-link`,
  `${COLLECTION}/navbar-menu`,
];

export const NavbarFixed = Types.enumForText([
  ['None', ''],
  ['Top', 'is-fixed-top'],
  ['Bottom', 'is-fixed-bottom'],
]);

export const Navbar = addComponent<NavbarAttributes, never, NavbarSlots, NavbarState, NavbarComputed>({
  collection: COLLECTION,
  name: 'navbar',
  attributes: {
    color: Colors,
    fixed: NavbarFixed,
    transparent: Types.bool(),
    extraSpace: Types.bool(),
    main: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'navbar',
      Exprs.get('color'),
      Exprs.get('fixed'),
      ifConst(['transparent'], 'is-transparent'),
      ifConst(['extraSpace'], 'is-spaced'),
    ),
    burgerClasses: Exprs.tuple(
      'navbar-burger',
      ifConst(['active'], 'is-active'),
    ),
    menuClasses: Exprs.tuple(
      'navbar-menu',
      ifConst(['active'], 'is-active'),
    ),
  },
  state: {
    active: Exprs.const(false),
  },
  slots: {
    left: {
      scope: Types.object(),
      array: true,
      only: NavbarSlotOnly,
    },
    right: {
      scope: Types.object(),
      array: true,
      only: NavbarSlotOnly,
    },
    brand: {
      scope: Types.object(),
      array: true,
      only: NavbarSlotOnly,
    },
  },
  render: (c) =>
    ['nav', {
      class: Exprs.get('classes'),
      role: 'navigation',
      ariaLabel: ifConst(['main'], 'main navigation'),
    }, {}, [
      ['div', {
        class: 'navbar-brand',
      }, {}, [
        createFor(c.getSlotArrayLength('brand'), [
          createSlot({ name: 'brand', slotIndex: Exprs.get('index') }),
        ]),
        ['a', {
          role: 'button',
          class: Exprs.get('burgerClasses'),
          ariaLabel: 'menu',
          ariaExpanded: 'false',
        }, {
          click: Exprs.get('active').set(Exprs.not(Exprs.get('active'))),
        }, [
          ['span', { ariaHidden: true }],
          ['span', { ariaHidden: true }],
          ['span', { ariaHidden: true }],
        ]],
      ]],
      ['div', {
        class: Exprs.get('menuClasses'),
      }, {}, [
        ['div', {
          class: 'navbar-start'
        }, {}, [
          createFor(c.getSlotArrayLength('left'), [
            createSlot({ name: 'left', slotIndex: Exprs.get('index') }),
          ]),
        ]],
        ['div', {
          class: 'navbar-end'
        }, {}, [
          createFor(c.getSlotArrayLength('right'), [
            createSlot({ name: 'right', slotIndex: Exprs.get('index') }),
          ]),
        ]],
      ]],
    ]],
})