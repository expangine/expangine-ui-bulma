import { Exprs, TextOps, Types } from 'expangine-runtime';
import { createComponent, createIfs, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst, ifTemplate } from '../helpers';
import { BaseEventType, Colors, Size } from '../Types';
import { IconClasses, IconObject, IconRender, IconType } from './Icon';


export const ButtonType = Types.enumForText([
  ['a', 'Link'],
  ['button', 'Button'],
  ['submit', 'Form Submit'],
  ['reset', 'Form Reset'],
]);

export interface ButtonAttributes
{
  type: string;
  color: string;
  light: boolean;
  size: string;
  fullWidth: boolean;
  outlined: boolean;
  inverted: boolean;
  rounded: boolean;
  loading: boolean;
  disabled: boolean;
  leftIcon: IconType;
  rightIcon: IconType;
  title: string;
  href: string;
}

export interface ButtonComputed
{
  tagName: string;
  inputType: string;
  classes: string;
  leftIconClasses: string;
  rightIconClasses: string;
}

export interface ButtonEvents
{
  click: void;
}

export const Button = createComponent<ButtonAttributes, ButtonEvents, never, never, ButtonComputed>({
  collection: COLLECTION,
  name: 'button',
  attributes: {
    type: {
      type: Types.optional(ButtonType),
      default: Exprs.const('button'),
    },
    color: Types.optional(Colors),
    size: Types.optional(Size),
    leftIcon: Types.optional(IconObject),
    rightIcon: Types.optional(IconObject),
    title: Types.optional(Types.text()),
    href: Types.optional(Types.text()),
    light: Types.optional(Types.bool()),
    fullWidth: Types.optional(Types.bool()),
    outlined: Types.optional(Types.bool()),
    inverted: Types.optional(Types.bool()),
    rounded: Types.optional(Types.bool()),
    loading: Types.optional(Types.bool()),
    disabled: Types.optional(Types.bool()),
  },
  computed: {
    classes: Exprs.tuple(
      'button',
      Exprs.get('size'),
      ifTemplate(['color'], 'is-{value}'),
      ifConst(['light'], 'is-light'),
      ifConst(['fullWidth'], 'is-fullwidth'),
      ifConst(['outlined'], 'is-outlined'),
      ifConst(['inverted'], 'is-inverted'),
      ifConst(['rounded'], 'is-rounded'),
      ifConst(['loading'], 'is-loading'),
    ),
    tagName: Exprs.switch(Exprs.get('type'), TextOps.isEqual)
      .case('a')
        .than('a')
      .case('button')
        .than('button')
      .default('input'),
    inputType: Exprs.switch(Exprs.get('type'), TextOps.isEqual)
      .case('submit')
        .than('submit')
      .case('reset')
        .than('reset'),
    leftIconClasses: Exprs.if(
      Exprs.get('leftIcon'),
    ).than(
      IconClasses('leftIcon'),
    ),
    rightIconClasses: Exprs.if(
      Exprs.get('rightIcon'),
    ).than(
      IconClasses('rightIcon'),
    ),
  },
  events: {
    click: BaseEventType,
  },
  render: (c) => 
    [Exprs.get('tagName'), {
      class: Exprs.get('classes'),
      type: Exprs.get('inputType'),
      disabled: Exprs.get('disabled'),
      title: Exprs.get('title'),
      href: Exprs.get('ref'),
    }, {
      click: (e: any) => c.trigger('click', e),
    }, [
      createIfs([
        [Exprs.and(Exprs.get('leftIcon'), Exprs.get('rightIcon')), [
          IconRender('leftIconClasses'),
          ['span', {}, {}, [createSlot()]],
          IconRender('rightIconClasses'),
        ]],
        [Exprs.get('leftIcon'), [
          IconRender('leftIconClasses'),
          ['span', {}, {}, [createSlot()]],
        ]],
        [Exprs.get('rightIcon'), [
          ['span', {}, {}, [createSlot()]],
          IconRender('rightIconClasses'),
        ]],
      ], [
        createSlot()
      ]),
    ]]
})