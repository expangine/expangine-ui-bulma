import { Exprs, Types } from 'expangine-runtime';
import { createFor, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';


export interface NavbarMenuAttributes
{
  text: string;
  href: string;
  active: boolean;
  arrowless: boolean;
  hoverable: boolean;
  right: boolean;
  dropUp: boolean;
  boxed: boolean;
}

export interface NavbarMenuEvents
{
  click: void;
}

export interface NavbarMenuComputed
{
  classes: string;
  linkClasses: string;
  dropdownClasses: string;
}

export interface NavbarMenuState
{
  open: boolean;
}

export type NavbarMenuSlots = 'default' | 'items';

export const NavbarMenu = addComponent<NavbarMenuAttributes, NavbarMenuEvents, NavbarMenuSlots, NavbarMenuState, NavbarMenuComputed>({
  collection: COLLECTION,
  name: 'navbar-menu',
  attributes: {
    text: Types.text(),
    href: Types.text(),
    active: Types.bool(),
    arrowless: Types.bool(),
    hoverable: Types.bool(),
    right: Types.bool(),
    dropUp: Types.bool(),
    boxed: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'navbar-item',
      'has-dropdown',
      ifConst(['dropUp'], 'has-dropdown-up'),
      ifConst(['hoverable'], 'is-hoverable'),
      ifConst(['open'], 'is-active'),
    ),
    dropdownClasses: Exprs.tuple(
      'navbar-dropdown',
      ifConst(['right'], 'is-right'),
      ifConst(['boxed'], 'is-boxed'),
    ),
    linkClasses: Exprs.tuple(
      'navbar-link',
      ifConst(['arrowless'], 'is-arrowless'),
      ifConst(['active'], 'is-active'),
    ),
  },
  state: {
    open: Exprs.const(false),
  },
  events: {
    click: BaseEventType,
  },
  slots: {
    default: Types.object({
      text: Types.text(),
    }),
    items: {
      scope: Types.object(),
      only: [
        `${COLLECTION}/navbar-item`,
        `${COLLECTION}/navbar-divider`,
        `${COLLECTION}/navbar-link`,
      ],
    },
  },
  render: (c) =>
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      ['a', {
        class: Exprs.get('linkClasses'),
        href: Exprs.get('href'),
      }, {
        click: Exprs.if(
          Exprs.not(Exprs.get('hoverable'))
        ).than(
          Exprs.get('open').set(Exprs.not(Exprs.get('open'))),
        )
      }, [
        c.whenSlot('default',
          () => Exprs.get('text'), 
          () => createSlot({ scope: {
            text: Exprs.get('text'),
          }}),
        ),
        ['div', {
          class: Exprs.get('dropdownClasses'),
        }, {}, [
          createFor(c.getSlotArrayLength('items'), [
            createSlot({ name: 'items', slotIndex: Exprs.get('index') }),
          ]),
        ]],
      ]],
    ]],
})