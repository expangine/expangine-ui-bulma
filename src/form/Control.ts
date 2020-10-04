import { Types, Exprs } from 'expangine-runtime';
import { addComponent, createSlot, createIf } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { Status } from '../Types';
import { ifConst } from '../helpers';
import { FieldState, FieldStateType } from './Field';
import { IconObject, IconType, IconClasses, IconRender } from '../elements/Icon';


export interface ControlAttributes
{ 
  status: string;
  loading: boolean;
  leftIcon: IconType;
  rightIcon: IconType;
  fieldState: FieldStateType;
}

export type ControlSlots = 'default';

export interface ControlComputed
{
  controlClass: string;
  leftIconClasses: string;
  rightIconClasses: string;
}

export const Control = addComponent<ControlAttributes, never, ControlSlots, never, ControlComputed>({
  collection: COLLECTION,
  name: 'control',
  attributes: {
    status: Status,
    leftIcon: IconObject,
    rightIcon: IconObject,
    fieldState: {
      type: FieldState,
      default: Exprs.get('fieldState'),
    },
    loading: Types.bool(),
  },
  computed: {
    controlClass: Exprs.tuple(
      'control',
      ifConst(['leftIcon'], 'has-icons-left'),
      ifConst(['rightIcon'], 'has-icons-right'),
      ifConst(['loading'], 'is-loading'),
    ),
    leftIconClasses: Exprs.if(
      Exprs.get('leftIcon'),
    ).than(
      IconClasses('leftIcon', {
        side: Exprs.const('is-left'),
        size: Exprs.get('fieldState', 'size'),
        status: Exprs.get('fieldState', 'status'),
      }),
    ),
    rightIconClasses: Exprs.if(
      Exprs.get('rightIcon'),
    ).than(
      IconClasses('rightIcon', {
        side: Exprs.const('is-right'),
        size: Exprs.get('fieldState', 'size'),
        status: Exprs.get('fieldState', 'status'),
      }),
    ),
  },
  slots: {
    default: Types.object({
      fieldState: FieldState,
    }),
  },
  render: (c) =>
    ['div', { class: Exprs.get('controlClass') }, {}, [
      createSlot({ scope: { fieldState: Exprs.get('fieldState') }}),
      createIf(Exprs.get('leftIcon'), [
        IconRender('leftIconClasses'),
      ]),
      createIf(Exprs.get('rightIcon'), [
        IconRender('rightIconClasses'),
      ]),
    ]],
});