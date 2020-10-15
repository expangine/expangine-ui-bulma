import { Exprs, TextOps, Types } from 'expangine-runtime';
import { createFor, createIf, createIfElse, createIfs, createSlot, NodeTemplateChild, Scope } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconClasses, IconClassesObject, IconObject, IconRender, IconRenderObject, IconType } from '../elements';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';
import { getLinkAttributes, LinkOptionsType } from "../helpers/Link";


export interface DropdownAttributes
{
  text: string;
  icon: IconType;
  open: boolean;
  triggerMode: string;
  dropUp: boolean;
  rightAligned: boolean;
  items: any[];
}

export interface DropdownComputed
{
  classes: string;
  iconClasses: string;
}

export interface DropdownEvents
{
  open: void;
  close: void;
  itemClick: void;
}

export type DropdownSlots = 'trigger' | 'default';

export const DropdownTriggerEvents = Types.enumForText([
  ['Toggle', 'toggle'],
  ['Focus / Blur', 'focus'],
  ['Click / Click Out', 'click'],
  ['Hover', 'hover'],
  ['None', 'none'],
]);

export const DropdownItem = Types.object({
  text: Types.optional(Types.text()),
  html: Types.optional(Types.bool()),
  options: Types.optional(LinkOptionsType),
  divider: Types.optional(Types.bool()),
  active: Types.optional(Types.bool()),
  leftIcon: Types.optional(IconObject),
  rightIcon: Types.optional(IconObject),
});

export const Dropdown = addComponent<DropdownAttributes, DropdownEvents, DropdownSlots, never, DropdownComputed>({
  collection: COLLECTION,
  name: 'dropdown',
  attributes: {
    triggerMode: {
      type: DropdownTriggerEvents,
      default: Exprs.const('toggle'),
    },
    text: Types.text(),
    icon: {
      type: IconObject,
      default: Exprs.const({
        style: 'fas',
        name: 'fa-angle-down',
        size: 'is-small',
        decorative: true,
      }),
    },
    open: Types.bool(),
    dropUp: Types.bool(),
    rightAligned: Types.bool(),
    items: Types.list(DropdownItem),
  },
  computed: {
    classes: Exprs.tuple(
      'dropdown',
      ifConst(['open'], 'is-active'),
      ifConst(['rightAligned'], 'is-right'),
      ifConst(['dropUp'], 'is-up'),
      Exprs.if(
        Exprs.op(TextOps.isEqual, {
          a: Exprs.get('triggerMode'),
          b: Exprs.const('hover'),
        }),
      ).than(
        Exprs.const('is-hoverable'),
      ),
    ),
    iconClasses: Exprs.if(
      Exprs.get('icon')
    ).than(
      IconClasses('icon')
    ),
  },
  events: {
    open: BaseEventType,
    close: BaseEventType,
    itemClick: Types.object({
      ...BaseEventType.options.props,
      item: DropdownItem,
    }),
  },
  slots: {
    trigger: Types.object({
      text: Types.text(),
    }),
    default: Types.object(),
  },
  render: (c) => {
    const getTriggerMode = () => {
      return c.scope.get('triggerMode', 'toggle' as never, true);
    };

    const getOpen = () => {
      return Boolean(c.scope.get('open', false as never, true));
    };

    const setOpen = (e: any, open: boolean) => {
      if (Boolean(open) !== getOpen()) {
        c.scope.set('open', open as never, true);
        c.trigger(open ? 'open' : 'close', e);
      }
    };

    const getItemContentAttributes = () => ({
      innerHTML: Exprs.if(
        Exprs.get('item', 'html')
      ).than(
        Exprs.get('item', 'text')
      ),
      textContent: Exprs.if(
        Exprs.not(Exprs.get('item', 'html'))
      ).than(
        Exprs.get('item', 'text')
      ),
    });

    const getItemTemplate = (): NodeTemplateChild[] => [
      createIfs([
        [Exprs.and(Exprs.get('item', 'leftIcon'), Exprs.get('item', 'rightIcon')), [
          IconRenderObject(
            IconClassesObject(['item', 'leftIcon']),
          ),
          ['span', getItemContentAttributes()],
          IconRenderObject(
            IconClassesObject(['item', 'rightIcon'], {
              side: Exprs.const('is-right'),
            }),
          ),
        ]],
        [Exprs.get('item', 'leftIcon'), [
          IconRenderObject(
            IconClassesObject(['item', 'leftIcon']),
          ),
          ['span', getItemContentAttributes()],
        ]],
        [Exprs.get('item', 'rightIcon'), [
          ['span', getItemContentAttributes()],
          IconRenderObject(
            IconClassesObject(['item', 'rightIcon'], {
              side: Exprs.const('is-right'),
            }),
          ),
        ]],
      ], [
        createIfElse(Exprs.get('item', 'html'), [
          ['span', { innerHTML: Exprs.get('item', 'text') }]
        ], [
          Exprs.get('item', 'text'),
        ]),
      ]),
    ];

    return ['div', {
      class: Exprs.get('classes')
    }, {
      mouseenter: (e: any) => {
        const triggerMode = getTriggerMode();

        if (triggerMode === 'hover') {
          c.trigger('open', e);
        }
      },
      mouseleave: (e: any) => {
        const triggerMode = getTriggerMode();

        if (triggerMode === 'hover') {
          c.trigger('close', e);
        }
      },
      click: (e: any) => {
        const triggerMode = getTriggerMode();

        if (triggerMode === 'toggle') {
          setOpen(e, !getOpen());
        } else if (triggerMode === 'click') {
          setOpen(e, true);
        }
      },
      focusin: (e: any) => {
        const triggerMode = getTriggerMode();

        if (triggerMode === 'focus') {
          setOpen(e, true);
        }
      },
      focusout: (e: any) => {
        const triggerMode = getTriggerMode();

        if (triggerMode === 'focus' || triggerMode === 'click') {
          setOpen(e, false);
        }
      },
    }, [
      ['div', { class: 'dropdown-trigger' }, {}, [
        c.whenSlot('trigger', 
          () => ['button', {
            class: 'button',
            ariaHaspopup: true,
            // ariaControls: 'dropdown-menu' id of dropdown-menu
          }, {}, [
            ['span', {}, {}, [Exprs.get('text')]],
            createIf(Exprs.get('icon'), [
              IconRender('iconClasses'),
            ]),
          ]], 
          () => createSlot({ name: 'trigger', scope: {
            text: Exprs.get('text'),
          }})
        ),
      ]],
      ['div', { 
        class: 'dropdown-menu', 
        role: 'menu',
        // id: '' generated id
      }, {}, [
        ['div', { class: 'dropdown-content' }, {}, [
          c.whenSlot('default', 
            () => createFor(Exprs.get('items'), [
              createIfs([
                [Exprs.get('item', 'divider'), [
                  ['hr', { class: 'dropdown-divider' }]
                ]],
                [Exprs.get('item', 'options', 'href'), [
                  ['a', { 
                    class: Exprs.tuple(
                      'dropdown-item',
                      ifConst(['item', 'active'], 'is-active'),
                    ),
                    ...getLinkAttributes(['item', 'options']),
                  }, {}, getItemTemplate()]
                ]]
              ], [
                ['div', { 
                  class: Exprs.tuple(
                    'dropdown-item',
                    ifConst(['item', 'active'], 'is-active'),
                  ),
                }, {
                  click: (e: any, scope: Scope) => {
                    e.item = scope.get('item');

                    c.trigger('itemClick', e);
                  },
                }, [
                  ['p', {}, {}, getItemTemplate()],
                ]],
              ]),
            ]), 
            () => ['div', { class: 'dropdown-item' }, {}, [
              createSlot()
            ]],
          ),
        ]],
      ]],
    ]];
  },
});