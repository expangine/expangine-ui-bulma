import { AnyOps, Exprs, Types } from 'expangine-runtime';
import { addComponent, ComponentInstance } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { Status, Size, Autocomplete, UpdateOn } from '../Types';
import { ifConst, ifTemplate } from '../util';




export interface TextareaAttributes
{
  value: string;
  size: string;
  rows: number;
  placeholder: string;
  autocomplete: string;
  status: string;
  rounded: boolean;
  disabled: boolean;
  readonly: boolean;
  fixedSize: boolean;
  updateOn: string;
}

export interface TextareaEvents
{
  update: TextareaUpdateEvent;
  input: TextareaUpdateEvent;
  change: TextareaUpdateEvent;
  blur: TextareaUpdateEvent;
  keydown: TextareaUpdateEvent;
}

export interface TextareaComputed
{
  classes: string;
}

export interface TextareaUpdateEvent
{
  nativeEvent: any;
  stop: boolean;
  prevent: boolean;
  value: string;
}

export const TextareaUpdateEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
  value: Types.text(),
});

export const Textarea = addComponent<TextareaAttributes, TextareaEvents, never, never, TextareaComputed>({
  collection: COLLECTION,
  name: 'textarea',
  attributes: {
    value: Types.text(),
    rows: Types.number(),
    status: Status,
    size: Size,
    autocomplete: Autocomplete,
    placeholder: Types.text(),
    rounded: Types.bool(),
    disabled: Types.bool(),
    readonly: Types.bool(),
    fixedSize: Types.bool(),
    updateOn: {
      type: UpdateOn,
      default: Exprs.const('input'),
    },
  },  
  computed: {
    classes: Exprs.tuple(
      'textarea',
      Exprs.get('size'),
      ifTemplate(['status'], 'is-{value}'),
      ifConst(['rounded'], 'is-rounded'),
      ifConst(['fixedSize'], 'has-fixed-size'),
    ),
  },
  events: {
    input: TextareaUpdateEventType,
    change: TextareaUpdateEventType,
    keydown: TextareaUpdateEventType,
    blur: TextareaUpdateEventType,
    update: TextareaUpdateEventType,
  },
  render: (c) => 
    ['textarea', {
      class: Exprs.get('classes'),
      placeholder: Exprs.get('placeholder'),
      autocomplete: Exprs.get('autocomplete'),
      disabled: Exprs.get('disabled'),
      readOnly: Exprs.get('readonly'),
      rows: Exprs.get('rows'),
    }, {
      change: handleUpdate(c, 'change'),
      input: handleUpdate(c, 'input'),
      keydown: handleUpdate(c, 'keydown'),
      blur: handleUpdate(c, 'blur'),
    }, [
      Exprs.if(
        Exprs.op(AnyOps.isDefined, {
          value: Exprs.get('value')
        })
      ).than(
        Exprs.get('value')
      ).else(
        Exprs.const('')
      ),
    ]]
});

function handleUpdate<K extends keyof TextareaEvents>(c: ComponentInstance<TextareaAttributes, TextareaEvents, never, never, TextareaComputed>, eventName: K)
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