import { Exprs } from 'expangine-runtime';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { BaseEventType, Size } from '../Types';


export interface DeleteAttributes
{
  size: string;
}

export interface DeleteEvents
{
  click: void;
}

export const Delete = addComponent<DeleteAttributes, DeleteEvents>({
  collection: COLLECTION,
  name: 'delete',
  attributes: {
    size: Size,
  },
  events: {
    click: BaseEventType,
  },
  render: (c) =>
    ['button', {
      class: Exprs.tuple('delete', Exprs.get('size')),
    }],
})