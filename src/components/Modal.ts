import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createIf, createIfElse, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType, Size } from '../Types';


export interface ModalAttributes
{
  open: boolean;
  clipped: boolean;
  hideClose: boolean;
  closeSize: string;
  card: boolean;
  title: string;
}

export interface ModalEvents
{
  close: void;
}

export interface ModalComputed
{
  classes: string;
  closeClasses: string;
}

export type ModalSlots = 'default' | 'footer' | 'title';

export const Modal = addComponent<ModalAttributes, ModalEvents, ModalSlots, never, ModalComputed>({
  collection: COLLECTION,
  name: 'modal',
  attributes: {
    open: {
      type: Types.bool(),
      required: true,
    },
    hideClose: Types.bool(),
    closeSize: {
      type: Size,
      default: Exprs.const('is-large'),
    },
    clipped: Types.bool(),
    card: Types.bool(),
    title: Types.text(),
  },
  computed: {
    classes: Exprs.tuple(
      'modal',
      ifConst(['open'], 'is-active'),
      ifConst(['clipped'], 'is-clipped'),
    ),
    closeClasses: Exprs.tuple(
      Exprs.if(
        Exprs.get('card')
      ).than(
        Exprs.const('delete')
      ).else(
        Exprs.const('modal-close'),
      ), 
      Exprs.get('closeSize')
    ),
  },
  events: {
    close: BaseEventType,
  },
  slots: {
    default: Types.object(),
    footer: Types.object(),
    title: Types.object({
      title: Types.text(),
    }),
  },
  render: (c) => 
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      ['div', { class: 'modal-background' }],
      createIfElse(Exprs.get('card'), [
        ['div', { class: 'modal-card' }, {}, [
          ['header', { class: 'modal-card-head' }, {}, [
            ['p', { class: 'modal-card-title'}, {}, [
              c.whenSlot('title', 
                () => Exprs.get('title'), 
                () => createSlot({ name: 'title', scope: {
                  title: Exprs.get('title'),
                }}),
              ),
            ]],
            createIf(Exprs.not(Exprs.get('hideClose')), [
              ['button', {
                class: Exprs.get('closeClasses'),
                ariaLabel: 'close',
              }, {
                click: (e: any) => c.trigger('close', e),
              }],
            ]),
          ]],
          ['section', { class: 'modal-card-body' }, {}, [
            createSlot(),
          ]],
          ['footer', { class: 'modal-card-foot' }, {}, [
            createSlot({ name: 'footer' }),
          ]]
        ]],
      ], [
        ['div', { class: 'modal-content' }, {}, [
          createSlot(),
        ]],
        createIf(Exprs.not(Exprs.get('hideClose')), [
          ['button', {
            class: Exprs.get('closeClasses'),
            ariaLabel: 'close',
          }, {
            click: (e: any) => c.trigger('close', e),
          }],
        ]),
      ]),
    ]],
});