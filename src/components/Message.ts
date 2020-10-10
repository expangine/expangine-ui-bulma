import { Exprs, Types } from 'expangine-runtime';
import { createIf, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { BaseEventType, Colors, Size } from '../Types';


export interface MessageAttributes
{
  header: string;
  deletable: boolean;
  size: string;
  color: string;
}

export interface MessageEvents
{
  deleted: void;
}

export interface MessageComputed
{
  classes: string;
}

export type MessageSlots = 'default';

export const Message = addComponent<MessageAttributes, MessageEvents, MessageSlots, never, MessageComputed>({
  collection: COLLECTION,
  name: 'message',
  attributes: {
    header: Types.text(),
    deletable: Types.bool(),
    size: Size,
    color: Colors,
  },
  computed: {
    classes: Exprs.tuple(
      'message',
      Exprs.get('size'),
      Exprs.get('color'),
    ),
  },
  events: {
    deleted: BaseEventType,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['article', {
      class: Exprs.get('classes'),
    }, {}, [
      createIf(Exprs.get('header'), [
        ['div', { class: 'message-header' }, {}, [
          ['p', {}, {}, [Exprs.get('header')]],
          ['button', { 
            class: 'delete', 
            ariaLabel: 'delete' 
          }, {
            click: (e: any) => c.trigger('deleted', e),
          }],
        ]]
      ]),
      ['div', { class: 'message-body' }, {}, [
        createSlot(),
      ]],
    ]],
}) 