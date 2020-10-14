import { Exprs, Types } from 'expangine-runtime';
import { createIf, createIfElse, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType, Size } from '../Types';


export interface ModalAttributes
{
  open: boolean;
  clipped: boolean;
  hideClose: boolean;
  closeSize: string;
  closeOnBackdrop: boolean;
  card: boolean;
  title: string;
}

export interface ModalEvents
{
  close: void;
  backdrop: void;
}

export interface ModalComputed
{
  classes: string;
  closeActualSize: string;
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
    closeSize: Size,
    closeOnBackdrop: Types.bool(),
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
    closeActualSize: Exprs.if(
      Exprs.get('closeSize')
    ).than(
      Exprs.get('closeSize')
    ).elseif(
      Exprs.not(Exprs.get('card'))
    ).than(
      Exprs.const('is-large')
    ),
    closeClasses: Exprs.tuple(
      Exprs.if(
        Exprs.get('card')
      ).than(
        Exprs.const('delete')
      ).else(
        Exprs.const('modal-close'),
      ), 
      Exprs.get('closeActualSize')
    ),
  },
  events: {
    close: BaseEventType,
    backdrop: BaseEventType,
  },
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
    footer: Types.object(),
    title: Types.object({
      title: Types.text(),
    }),
  },
  render: (c) => 
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      ['div', { class: 'modal-background' }, {
        click: (e: any) => {
          c.trigger('backdrop', e);

          if (!e.prevent && !e.stop && c.scope.get('closeOnBackdrop')) {
            c.trigger('close', e);
          }
        },
      }],
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