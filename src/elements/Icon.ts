import { Expression, Exprs, Types } from 'expangine-runtime';
import { NodeTemplate } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { Flip, Rotate, Side, Size, Status } from '../Types';
import { COLLECTION } from '../constants';
import { FieldState, FieldStateType } from '../form/Field';
import { GetOverride } from '../util';


export interface IconType
{
  style: string;
  name: string;
  size?: string;
  status?: string;
  side?: string;
  rotate?: string;
  flip?: string;
  spins?: boolean;
  bordered?: boolean;
  square?: boolean;
  decorative?: boolean;
  title?: boolean;
}

export interface IconAttributes
{
  icon: IconType;
  fieldState: FieldStateType;
}

export interface IconComputed
{
  classes: object;
}

export const Icons = Types.enumForText([
  ['Ban', 'fa-ban'],
]);

export const IconStyle = Types.enumForText([
  ['Regular', 'far'],
  ['Solid', 'fas'],
  ['Light', 'fal'],
  ['Duotone', 'fad'],
  ['Brands', 'fab']
]);


export const IconObject = Types.object({
  style: IconStyle,
  name: Icons,
  size: Types.optional(Size),
  status: Types.optional(Status),
  side: Types.optional(Side),
  rotate: Types.optional(Rotate),
  flip: Types.optional(Flip),
  spins: Types.optional(Types.bool()),
  bordered: Types.optional(Types.bool()),
  square: Types.optional(Types.bool()),
});

export const IconClasses = (attr: string, overrides?: Record<string, Expression>, iconClass: string = 'icon') =>
  Exprs.object(IconClassesObject([attr], overrides, iconClass));

export const IconClassesObject = (attr: string[], overrides?: Record<string, Expression>, iconClass: string = 'icon') =>
  ({
    span: Exprs.tuple(
      iconClass,
      GetOverride([...attr, 'size'], 'size', overrides),
      GetOverride([...attr, 'side'], 'side', overrides),
      Exprs.if(
        GetOverride([...attr, 'status'], 'status', overrides)
      ).than(
        Exprs.template('has-text-{status}', { status: GetOverride([...attr, 'status'], 'status', overrides) }),
      )
    ),
    i: Exprs.tuple(
      GetOverride([...attr, 'style'], 'style', overrides),
      Exprs.get(...attr, 'name'),
      Exprs.if(GetOverride([...attr, 'spins'], 'spins', overrides)).than(Exprs.const('fa-spinner')),
      Exprs.if(GetOverride([...attr, 'bordered'], 'bordered', overrides)).than(Exprs.const('fa-border')),
      Exprs.if(GetOverride([...attr, 'square'], 'square', overrides)).than(Exprs.const('fa-fw')),
    ),
    transform: Exprs.tuple(
      GetOverride([...attr, 'rotate'], 'rotate', overrides),
      GetOverride([...attr, 'flip'], 'flip', overrides),
    ),
    decorative: GetOverride([...attr, 'decorative'], 'decorative', overrides),
    title: GetOverride([...attr, 'title'], 'title', overrides),
  });

export const IconRender = (classes: string): NodeTemplate => 
  ['span', { class: Exprs.get(classes, 'span') }, {}, [
    ['i', { 
      class: Exprs.get(classes, 'i'), 
      dataFaTransform: Exprs.get(classes, 'transform'),
      ariaHidden: Exprs.get(classes, 'decorative'),
      title: Exprs.get(classes, 'title'),
    }],
  ]];

export const IconRenderObject = (classes: any): NodeTemplate => 
  ['span', { class: classes.span }, {}, [
    ['i', { 
      class: classes.i, 
      dataFaTransform: classes.transform,
      ariaHidden: classes.decorative,
      title: classes.title,
    }],
  ]];
  
export const Icon = addComponent<IconAttributes, never, never, never, IconComputed>({
  collection: COLLECTION,
  name: 'icon',
  attributes: {
    icon: {
      type: IconObject,
      required: true,
    },
    fieldState: FieldState,
  },
  computed: {
    classes: IconClasses('icon', {
      status: Exprs.get('fieldState', 'status'),
      size: Exprs.get('fieldState', 'size'),
    }),
  },
  render: (c) => IconRender('classes'),
})
