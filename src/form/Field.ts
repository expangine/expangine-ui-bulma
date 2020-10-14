import { Types, Exprs } from 'expangine-runtime';
import { createIf, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Status, Size } from '../Types';
import { ifConst, ifTemplate } from '../util';


export interface FieldStateType 
{
  status?: string;
  size?: string;
}

export const FieldState = Types.object({
  status: Status,
  size: Size,
});

export interface FieldAttributes
{
  name: string;
  label: string;
  status: string;
  size: string;
  message: string;
  grouped: boolean;
}

export type FieldSlots = 'label' | 'default' | 'message';

export interface FieldComputed
{ 
  fieldClass: string;
  fieldState: any;
  messageClass: string;
}

export const Field = addComponent<FieldAttributes, never, FieldSlots, never, FieldComputed>({
  collection: COLLECTION,
  name: 'field',
  attributes: {
    name: Types.text(),
    label: Types.text(),
    message: Types.text(),
    grouped: Types.bool(),
    status: Status,
    size: Size,
  },
  computed: {
    fieldClass: Exprs.tuple(
      'field',
      ifConst(['grouped'], 'is-grouped'),
    ),
    fieldState: Exprs.object({
      status: Exprs.get('status'),
      size: Exprs.get('size'),
    }),
    messageClass: Exprs.tuple(
      'help',
      ifTemplate(['status'], 'is-{value}'),
    ),
  },
  slots: {
    label: Types.object({ label: Types.text() }),
    default: {
      scope: Types.object({
        fieldState: FieldState,
      }),
      required: true,
    },
    message: Types.object({ message: Types.text() }),
  },
  render: (c) => 
    ['div', { 
      class: c.getSlotSize('default') > 1 
        ? Exprs.tuple(Exprs.get('fieldClass'), 'has-addons')
        : Exprs.get('fieldClass') 
    }, {}, [
      c.whenSlot('label', 
        () => createIf(Exprs.get('label'), [
          ['label', { class: 'label' }, {}, [
            Exprs.get('label')
          ]],
        ]),
        () => ['label', { class: 'label' }, {}, [
          createSlot({ name: 'label', scope: { label: Exprs.get('label') } }),
        ]],
      ),
      createSlot({ scope: { fieldState: Exprs.get('fieldState') }}),
      c.whenSlot('message', 
        () => createIf(Exprs.get('message'), [
          ['p', { class: Exprs.get('messageClass') }, {}, [
            Exprs.get('message'),
          ]]   
        ]),
        () => ['p', { class: Exprs.get('messageClass') }, {}, [
          createSlot({ name: 'message', scope: { message: Exprs.get('message') } }),
        ]]
      ),
    ]],
});