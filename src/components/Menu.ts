import { AnyOps, Expression, Exprs, ListOps, ListType, Type, Types } from 'expangine-runtime';
import { createFor, createIf, createIfElse, createSlot, NodeTemplate } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';




export interface MenuAttributes
{
  menu: any[];
  value: any;
  getLabel: string;
  getItems: any[];
  getItemText: string;
  getItemValue: string;
  getSubItems: any[];
  getSubItemText: string;
  getSubItemValue: string;
}

export interface MenuEvents
{
  update: { 
    item: any, 
    itemValue: any 
  };
}

export type MenuSlots = 'menuLabel' | 'menuItem' | 'menuSubItem';


const MenuText = Types.text();
const MenuSubItem = Types.object({
  label: MenuText,
});
const MenuItem = Types.object({
  label: MenuText,
  items: Types.list(MenuSubItem),
});
const MenuGroup = Types.object({
  label: MenuText,
  items: Types.list(MenuItem),
});
const MenuGroups = Types.list(MenuGroup);


const getMenuGroups = (type?: Type): ListType =>
  type instanceof ListType
    ? type
    : MenuGroups;

const getMenuItems = (type?: Type): ListType =>
  type instanceof ListType
    ? type
    : Types.list(MenuItem);

const getSubMenuItems = (type?: Type): ListType =>
  type instanceof ListType
    ? type
    : Types.list(MenuSubItem);

const getListItem = (type: Type | undefined, defaultType: Type): Type =>
  type instanceof ListType
    ? type.options.item
    : defaultType;
  

export const Menu = addComponent<MenuAttributes, MenuEvents, MenuSlots>({
  collection: COLLECTION,
  name: 'menu',
  attributes: {
    value: (a) => a.getItemValue || MenuText,
    menu: {
      type: (a) => getMenuGroups(a.menu),
      required: true,
    },
    getItems: {
      type: (a) => getMenuItems(a.getItems),
      default: Exprs.get('menuGroup', 'items'),
      callable: (a) => Types.object({
        menuGroup: getListItem(a.menu, MenuGroup),
      }),
    },
    getLabel: {
      type: MenuText,
      default: Exprs.get('menuGroup', 'label'),
      callable: (a) => Types.object({
        menuGroup: getListItem(a.menu, MenuGroup),
      }),
    },
    getSubItems: {
      type: (a) => getSubMenuItems(a.getSubItems),
      default: Exprs.get('item', 'items'),
      callable: (a) => Types.object({
        item: getListItem(a.getItems, MenuItem),
      }),
    },
    getItemText: {
      type: MenuText,
      default: Exprs.get('item', 'label'),
      callable: (a) => Types.object({
        item: getListItem(a.getItems, MenuItem),
      }),
    },
    getItemValue: {
      type: (a) => a.getItemValue || MenuText,
      default: Exprs.get('item', 'label'),
      callable: (a) => Types.object({
        item: getListItem(a.getItems, MenuItem),
      }),
    },
    getSubItemText: {
      type: MenuText,
      default: Exprs.get('subItem', 'label'),
      callable: (a) => Types.object({
        subItem: getListItem(a.getSubItems, MenuSubItem),
      }),
    },
    getSubItemValue: {
      type: (a) => a.getItemValue || MenuText,
      default: Exprs.get('subItem', 'label'),
      callable: (a) => Types.object({
        subItem: getListItem(a.getSubItems, MenuSubItem),
      }),
    },
  },
  events: {
    update: (a) => Types.object({ 
      item: getListItem(a.getItems, MenuItem),
      itemValue: a.getItemValue || MenuText,
    }),
  },
  slots: {
    menuLabel: (a) => Types.object({
      menuGroup: getListItem(a.menu, MenuGroup),
    }),
    menuItem: (a) => Types.object({
      item: getListItem(a.getItems, MenuItem),
    }),
    menuSubItem: (a) => Types.object({
      subItem: getListItem(a.getSubItems, MenuSubItem),
    }),
  },
  render: (c) => {
    type GetScope = () => Record<string, Expression>;

    const Noop = Exprs.noop();
    const MenuGroupScope = () => ({ menuGroup: Exprs.get('menuGroup') });
    const MenuItemScope = () => ({ item: Exprs.get('item') });
    const MenuSubItemScope = () => ({ subItem: Exprs.get('subItem') });

    const getItemLink = (item: string, slot: MenuSlots, value: Expression | false, text: Expression | false, scope: GetScope): NodeTemplate => 
      ['a', {
        class: Exprs.object({
          'is-active': Exprs.op(AnyOps.isEqual, {
            value,
            test: Exprs.get('value'),
          }),
        }),
      }, {
        click: Exprs
          .get('emit', 'update')
          .set(Exprs.object({
            item: Exprs.get(item),
            itemValue: value,
          })),
      }, [
        c.whenSlot(slot, 
          () => text || '',
          () => createSlot({ name: slot, scope: scope() })
        ),
      ]];

    return ['aside', {
      class: 'menu'
    }, {}, [
      createFor(Exprs.get('menu'), [
        c.whenSlot('menuLabel', 
          () => createIf(c.getAttributeExpression('getLabel', Noop), [
              ['p', { class: 'menu-label' }, {}, [
                c.getAttributeExpression('getLabel', Noop),
              ]]
            ]), 
          () => ['p', { class: 'menu-label' }, {}, [
            createSlot({ name: 'menuLabel', scope: MenuGroupScope() }),
          ]],
        ),
        createIf(Exprs.op(ListOps.isNotEmpty, {
          list: c.getAttributeExpression('getItems', Noop),
        }), [
          ['ul', { class: 'menu-list' }, {}, [
            createFor(c.getAttributeExpression('getItems', Noop), [
              ['li', {}, {}, [
                createIfElse(Exprs.op(ListOps.isNotEmpty, {
                  list: c.getAttributeExpression('getSubItems', Noop),
                }), [
                  getItemLink('item', 'menuItem', c.getAttributeExpression('getItemValue', Noop), c.getAttributeExpression('getItemText', Noop), MenuItemScope),
                  ['ul', {}, {}, [
                    createFor(c.getAttributeExpression('getSubItems', Noop), [
                      ['li', {}, {}, [
                        getItemLink('subItem', 'menuSubItem', c.getAttributeExpression('getSubItemValue', Noop), c.getAttributeExpression('getSubItemText', Noop), MenuSubItemScope),
                      ]],
                    ], {
                      item: 'subItem',
                      index: 'subItemIndex',
                    }),
                  ]],
                ], [
                  getItemLink('item', 'menuItem', c.getAttributeExpression('getItemValue', Noop), c.getAttributeExpression('getItemText', Noop), MenuItemScope),
                ]),
              ]],
            ], {
              item: 'item',
              index: 'itemIndex',
            }),
          ]],
        ]),
      ], {
        item: 'menuGroup',
        index: 'menuGroupIndex',
      }),
    ]];
  },
});