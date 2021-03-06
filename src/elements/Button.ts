import { AnyOps, Exprs, Types } from 'expangine-runtime';
import { createIfs, createSlot, NodeTemplate, NodeTemplateChild } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst, ifTemplate } from '../util';
import { BaseEventType, Colors, Size } from '../Types';
import { IconClasses, IconObject, IconRender, IconType } from './Icon';


export interface ButtonAttributes
{
  text: string;
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
  selected: boolean;
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

export type ButtonSlots = 'default';

export const ButtonType = Types.enumForText([
  ['Link', 'a'],
  ['Button', 'button'],
  ['Form Submit', 'submit'],
  ['Form Reset', 'reset'],
]);

export const Button = addComponent<ButtonAttributes, ButtonEvents, ButtonSlots, never, ButtonComputed>({
  collection: COLLECTION,
  name: 'button',
  attributes: {
    type: ButtonType,
    text: Types.text(),
    color: Colors,
    size: Size,
    leftIcon: IconObject,
    rightIcon: IconObject,
    title: Types.text(),
    href: Types.text(),
    light: Types.bool(),
    fullWidth: Types.bool(),
    outlined: Types.bool(),
    inverted: Types.bool(),
    rounded: Types.bool(),
    loading: Types.bool(),
    disabled: Types.bool(),
    selected: Types.bool(),
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
      ifConst(['selected'], 'is-selected'),
    ),
    tagName: Exprs.switch(Exprs.get('type'), AnyOps.isEqual)
      .case('a')
        .than('a')
      .case('submit')
      .case('reset')
        .than('input')
      .default('button'),
    inputType: Exprs.switch(Exprs.get('type'), AnyOps.isEqual)
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
  slots: {
    default: Types.object({
      text: Types.text(),
    }),
  },
  render: (c) => {
    const ContentRender: NodeTemplateChild = 
      c.whenSlot('default',
        () => Exprs.get('text'), 
        () => createSlot({ scope: { text: Exprs.get('text') } })
      );
    const ContentRenderSpan: NodeTemplate = ['span', {}, {}, [
      ContentRender,
    ]];

    return [Exprs.get('tagName'), {
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
          ContentRenderSpan,
          IconRender('rightIconClasses'),
        ]],
        [Exprs.get('leftIcon'), [
          IconRender('leftIconClasses'),
          ContentRenderSpan,
        ]],
        [Exprs.get('rightIcon'), [
          ContentRenderSpan,
          IconRender('rightIconClasses'),
        ]],
      ], [
        ContentRender,
      ]),
    ]];
  },
})