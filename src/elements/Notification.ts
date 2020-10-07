import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createIf, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType, Colors, Size } from '../Types';


export interface NotificationAttributes
{
  color: string;
  deletable: boolean;
  deleteSize: string;
  message: string;
  light: boolean;
}

export interface NotificationEvents
{
  deleted: void;
}

export interface NotificationComputed
{
  classes: string;
}

export type NotificationSlots = 'default';

export const Notification = addComponent<NotificationAttributes, NotificationEvents, NotificationSlots, never, NotificationComputed>({
  collection: COLLECTION,
  name: 'notification',
  attributes: {
    message: Types.text(),
    color: Colors,
    light: Types.bool(),
    deletable: Types.bool(),
    deleteSize: Size,
  },
  computed: {
    classes: Exprs.tuple(
      'notification',
      Exprs.get('color'),
      ifConst(['light'], 'is-light'),
    ),
  },
  events: {
    deleted: BaseEventType,
  },
  slots: {
    default: Types.object({
      message: Types.text(),
    }),
  },
  render: (c) =>
    ['div', { 
      class: Exprs.get('classes'),
    }, {}, [
      createIf(Exprs.get('deletable'), [
        ['button', {
          class: Exprs.tuple('delete', Exprs.get('deleteSize'))
        }, {
          click: (e: any) => c.trigger('deleted', e),
        }]
      ]),
      c.whenSlot('default', 
        () => Exprs.get('message'),
        () => createSlot({ scope: { message: Exprs.get('message') } }),
      ),
    ]],
})