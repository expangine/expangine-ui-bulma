import { Exprs, ListType, NumberOps, ObjectType, Type, Types } from 'expangine-runtime';
import { createFor, createSlot, createIfElse, createComponent } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconObject, IconType, Icon } from '../elements/Icon';
import { Alignment, Size } from '../Types';


export interface BreadcrumbAttributes
{
  crumbs: any[];
  getIcon: IconType;  
  getText: string;
  getHref: string;
  separator: string;
  align: string;
  size: string;
}

export interface BreadcrumbEvents
{
  click: void;
}

export interface BreadcrumbComputed
{
  classes: string;
}

export type BreadcrumbSlots = 'default';

export const BreadcrumbSeparator = Types.enumForText([
  ['Arrow', 'has-arrow-separator'],
  ['Bullet', 'has-bullet-separator'],
  ['Dot', 'has-dot-separator'],
  ['Succeeds', 'has-succeeds-separator'],
]);

const Any = Types.any();
const ListAny = Types.list(Any);
const Index = Types.number(0, undefined, true);

const getListType = (type?: Type): Type => 
  type instanceof ListType
    ? type
    : ListAny;

const getListItemType = (type?: Type): Type =>
  type instanceof ListType
    ? type.options.item
    : Any;

const getListItemScope = (type?: Type): ObjectType =>
  Types.object({
    crumb: getListItemType(type),
    crumbIndex: Index,
  })

const isLastCrumb = Exprs.op(NumberOps.isEqual, {
  value: Exprs.get('crumbIndex'),
  test: Exprs.op(NumberOps.sub, {
    value: Exprs.get('crumbs', 'length'),
    subtrahend: 1
  }),
});

const getCrumbScope = {
  crumb: Exprs.get('crumb'),
  crumbIndex: Exprs.get('crumbIndex'),
};

export const Breadcrumb = addComponent<BreadcrumbAttributes, BreadcrumbEvents, BreadcrumbSlots, never, BreadcrumbComputed>({
  collection: COLLECTION,
  name: 'breadcrumb',
  attributes: {
    crumbs: {
      type: (a) => getListType(a.crumbs),
      required: true,
    },
    getText: {
      type: Types.text(),
      callable: (a) => getListItemScope(a.crumbs),
    },
    getIcon: {
      type: IconObject,
      callable: (a) => getListItemScope(a.crumbs),
    },
    getHref: {
      type: Types.text(),
      callable: (a) => getListItemScope(a.crumbs),
    },
    separator: BreadcrumbSeparator,
    align: Alignment,
    size: Size,
  },
  computed: {
    classes: Exprs.tuple(
      'breadcrumb',
      Exprs.get('size'),
      Exprs.get('align'),
      Exprs.get('separator'),
    ),
  },
  events: {
    click: (a) => getListItemScope(a.crumbs),
  },
  slots: {
    default: (a) => getListItemScope(a.crumbs),
  },
  render: (c) => 
    ['nav', {
      class: Exprs.get('classes'),
      ariaLabel: 'breadcrumbs',
    }, {}, [
      ['ul', {}, {}, [
        createFor(Exprs.get('crumbs'), [
          ['li', {
            class: Exprs.if(
              isLastCrumb
            ).than(
              Exprs.const('is-active'),
            ),
          }, {}, [
            ['a', {
              href: Exprs.or(
                c.call('getHref', getCrumbScope),
                Exprs.const('#'),
              ),
              ariaCurrent: Exprs.if(
                isLastCrumb
              ).than(
                Exprs.const('page')
              ),
            }, {}, [
              createIfElse(c.call('getIcon', getCrumbScope), [
                createComponent(Icon, {
                  icon: c.call('getIcon', getCrumbScope),
                }),
                ['span', {}, {}, [
                  c.whenSlot('default', 
                    () => c.call('getText', getCrumbScope), 
                    () => createSlot({ scope: getCrumbScope })
                  ),
                ]]
              ], [
                c.whenSlot('default', 
                  () => c.call('getText', getCrumbScope), 
                  () => createSlot({ scope: getCrumbScope })
                ),
              ]),
            ]],
          ]],
        ], {
          index: 'crumbIndex',
          item: 'crumb',
        }),
      ]],
    ]],
});