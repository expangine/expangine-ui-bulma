import { Exprs, Types } from 'expangine-runtime';
import { addComponent, ComponentInstance } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { InputKind, Status, Size, Autocomplete, UpdateOn } from '../Types';
import { ifConst, ifTemplate } from '../util';




export interface InputAttributes
{
  type: string;
  value: string;
  size: string;
  placeholder: string;
  autocomplete: string;
  status: string;
  rounded: boolean;
  disabled: boolean;
  readonly: boolean;
  updateOn: string;
}

export interface InputEvents
{
  update: InputUpdateEvent;
  input: InputUpdateEvent;
  change: InputUpdateEvent;
  blur: InputUpdateEvent;
  keydown: InputUpdateEvent;
}

export interface InputComputed
{
  classes: string;
}

export interface InputUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: string;
}

export const InputUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  value: Types.text(),
});

export const Input = addComponent<InputAttributes, InputEvents, never, never, InputComputed>({
  collection: COLLECTION,
  name: 'input',
  attributes: {
    type: {
      type: InputKind,
      default: Exprs.const('text'),
    },
    value: Types.text(),
    status: Status,
    size: Size,
    placeholder: Types.text(),
    autocomplete: Autocomplete,
    rounded: Types.bool(),
    disabled: Types.bool(),
    readonly: Types.bool(),
    updateOn: {
      type: UpdateOn,
      default: Exprs.const('input'),
    },
  },  
  computed: {
    classes: Exprs.tuple(
      'input',
      Exprs.get('size'),
      ifTemplate(['status'], 'is-{value}'),
      ifConst(['rounded'], 'is-rounded'),
    ),
  },
  events: {
    input: InputUpdateEventType,
    change: InputUpdateEventType,
    keydown: InputUpdateEventType,
    blur: InputUpdateEventType,
    update: InputUpdateEventType,
  },
  render: (c) => 
    ['input', {
      class: Exprs.get('classes'),
      type: Exprs.get('type'),
      placeholder: Exprs.get('placeholder'),
      autocomplete: Exprs.get('autocomplete'),
      disabled: Exprs.get('disabled'),
      readOnly: Exprs.get('readonly'),
      value: Exprs.get('value'),
    }, {
      change: handleUpdate(c, 'change'),
      input: handleUpdate(c, 'input'),
      keydown: handleUpdate(c, 'keydown'),
      blur: handleUpdate(c, 'blur'),
    }]
});

function handleUpdate<K extends keyof InputEvents>(c: ComponentInstance<InputAttributes, InputEvents, never, never, InputComputed>, eventName: K)
{
  return (e: any) =>
  {
    e.value = e.nativeEvent.target.value;

    if (c.scope.get('updateOn') === eventName)
    {
      c.trigger('update', e);
    }
    
    c.trigger(eventName, e);
  };
}