import { Exprs, Types } from 'expangine-runtime';
import { createComponent, createFor, createIf, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconClasses, IconObject, IconRender, IconType } from '../elements/Icon';
import { ImageRatios, ImageSquareSizes, Image } from '../elements/Image';
import { BaseEventType } from '../Types';


export interface CardAttributes
{
  header: string;
  headerIcon: IconType;
  headerIconHref: string;
  image: any;
  footerLinks: boolean;
}

export interface CardComputed
{
  headerIconClasses: string;
  footerItemTag: string;
}

export interface CardEvents
{
  headerIconClick: void;
  footerItemClick: void;
}

export type CardSlots = 'header' | 'default' | 'footerItems' | 'image';


export const Card = addComponent<CardAttributes, CardEvents, CardSlots, never, CardComputed>({
  collection: COLLECTION,
  name: 'card',
  attributes: {
    header: Types.text(),
    headerIcon: IconObject,
    headerIconHref: Types.text(),
    footerLinks: Types.bool(),
    image: Types.object({
      src: Types.text(),
      alt: Types.text(),
      rounded: Types.bool(),
      squareSize: ImageSquareSizes,
      ratio: ImageRatios,
    }),
  },
  computed: {
    headerIconClasses: IconClasses('headerIcon'),
    footerItemTag: Exprs.if(
      Exprs.get('footerLinks')
    ).than(
      Exprs.const('a')
    ).else(
      Exprs.const('p')
    ),
  },
  events: {
    headerIconClick: BaseEventType,
    footerItemClick: BaseEventType,
  },
  slots: {
    header: Types.object(),
    default: Types.object(),
    image: Types.object(),
    footerItems: {
      scope: Types.object(),
      array: true,
      arrayIndexAlias: 'footerItemIndex',
    },
  },
  render: (c) => 
    ['div', { class: 'card' }, {}, [
      c.whenSlot('header', 
        () => createIf(Exprs.or(
          Exprs.get('header'), 
          Exprs.get('headerIcon')
        ), [
          ['header', { class: 'card-header' }, {}, [
            ['p', { class: 'card-header-title' }, {}, [
              Exprs.get('header'),
            ]],
            createIf(Exprs.get('headerIcon'), [
              ['a', { 
                class: 'card-header-icon',
                href: Exprs.or(
                  Exprs.get('headerIconHref'), 
                  Exprs.const('#')
                ),
              }, { 
                click: (e: any) => c.trigger('headerIconClick', e),
              }, [
                IconRender('headerIconClasses'),
              ]]
            ])
          ]],
        ]), 
        () => createSlot(({ name: 'header' })),
      ),
      c.whenSlot('image', 
        () => createIf(Exprs.get('image'), [
          ['div', { class: 'card-image' }, {}, [
            createComponent(Image, {
              src: Exprs.get('image', 'src'),
              alt: Exprs.get('image', 'alt'),
              rounded: Exprs.get('image', 'rounded'),
              squareSize: Exprs.get('image', 'squareSize'),
              ratio: Exprs.get('image', 'ratio'),
            }),
          ]],
        ]),
        () => ['div', { class: 'card-image' }, {}, [
          createSlot({ name: 'image' }),
        ]]
      ),
      ['div', { class: 'card-content' }, {}, [
        createSlot(),
      ]],
      c.whenSlot('footerItems', 
        () => '', 
        () => ['footer', { class: 'card-footer' }, {}, [
          createFor(c.getSlotArrayLength('footerItems'), [
            [Exprs.get('footerItemTag'), { 
              class: 'card-footer-item' 
            }, {
              click: (e: any) => c.trigger('footerItemClick', e),
            }, [
              createSlot({ 
                name: 'footerItems', 
                slotIndex: Exprs.get('footerItemIndex')
              })
            ]]
          ], {
            index: 'footerItemIndex',
          }),
        ]],
      ),
    ]],
})