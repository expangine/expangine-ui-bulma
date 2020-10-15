import { Exprs, ListOps, ListType, NumberOps, ObjectType, Type, Types } from 'expangine-runtime';
import { createFor, createSlot, createIfElse, createComponent } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconObject, IconType, Icon } from '../elements/Icon';
import { Alignment, Size } from '../Types';
import { getLinkAttributes, LinkOptionsType, LinkOptions } from "../helpers/Link";


export interface BreadcrumbAttributes
{
  crumbs: any[];
  getIcon: IconType;  
  getText: string;
  getOptions: LinkOptions;
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
  crumbsMapped: any[];
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
  crumb: Exprs.get('crumb', 'data'),
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
    getOptions: {
      type: LinkOptionsType,
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
    crumbsMapped: (c) => Exprs.op(ListOps.map, {
      list: Exprs.get('crumbs'),
      transform: Exprs.object({
        data: Exprs.get('crumb'),
        text: c.getAttributeExpression('getText'),
        icon: c.getAttributeExpression('getIcon'),
        options: c.getAttributeExpression('getOptions'),
      }),
    }, {
      item: 'crumb',
      index: 'crumbIndex',
    }),
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
        createFor(Exprs.get('crumbsMapped'), [
          ['li', {
            class: Exprs.if(
              isLastCrumb
            ).than(
              Exprs.const('is-active'),
            ),
          }, {}, [
            ['a', {
              ...getLinkAttributes(['crumb', 'options']),
              ariaCurrent: Exprs.if(
                isLastCrumb
              ).than(
                Exprs.const('page')
              ),
            }, {
              click: Exprs.get('emit', 'click').set(
                Exprs.object(getCrumbScope)
              ),
            }, [
              createIfElse(Exprs.get('crumb', 'icon'), [
                createComponent(Icon, {
                  icon: Exprs.get('crumb', 'icon'),
                }),
                ['span', {}, {}, [
                  c.whenSlot('default', 
                    () => Exprs.get('crumb', 'text'), 
                    () => createSlot({ scope: getCrumbScope })
                  ),
                ]]
              ], [
                c.whenSlot('default', 
                  () => Exprs.get('crumb', 'text'), 
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