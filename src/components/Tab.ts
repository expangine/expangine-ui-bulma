import { AnyOps, Exprs, Types } from 'expangine-runtime';
import { addComponent, createIfElse } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { IconClasses, IconObject, IconRender, IconType } from '../elements';


export interface TabAttributes
{
  text: string;
  icon: IconType;
  value: any;
  active: any;
}

export interface TabComputed
{
  isActive: boolean;
  classes: string;
  iconClasses: string;
}

export interface TabEvents
{
  update: { tabValue: any };
}

const DefaultAny = Types.any();

export const Tab = addComponent<TabAttributes, TabEvents, never, never, TabComputed>({
  collection: COLLECTION,
  name: 'tab',
  attributes: {
    text: Types.text(),
    icon: IconObject,
    value: (a) => a.value || DefaultAny,
    active: (a) =>  a.value || DefaultAny,
  },
  computed: {
    isActive: Exprs.op(AnyOps.isEqual, {
      value: Exprs.get('value'),
      test: Exprs.get('active'),
    }),
    classes: Exprs.object({
      'is-active': Exprs.get('isActive'),
    }),
    iconClasses: Exprs.if(
      Exprs.get('icon')
    ).than(
      IconClasses('icon'),
    ),
  },
  events: {
    update: (a) => Types.object({
      tabValue: a.value || DefaultAny,
    }),
  },
  render: (c) =>
    ['li', {
      class: Exprs.get('classes'),
    }, {}, [
      ['a', {}, {
        click: Exprs
          .get('emit', 'update')
          .set(Exprs.object({
            tabValue: Exprs.get('value'),
          })),
      }, [
        createIfElse(Exprs.get('icon'), [
          IconRender('iconClasses'),
          ['span', {}, {}, [
            Exprs.get('text'),
          ]]
        ], [
          Exprs.get('text'),
        ]),
      ]],
    ]],
});