import { Exprs, ListType, ObjectType, Type, Types } from 'expangine-runtime';
import { createComponent, createFor, TypeProvider } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconObject } from '../elements';
import { ifConst } from '../util';
import { Alignment, Size } from '../Types';
import { Tab } from './Tab';


export interface TabsAttributes
{
  value: any;
  tabs: any[];
  align: string;
  size: string;
  type: string;
  fullWidth: boolean;
  getText: string;
  getIcon: string;
  getValue: any;
}

export interface TabsComputed
{
  classes: string;
}

export interface TabsEvents
{
  update: {
    tab: any;
    tabIndex: number;
    tabValue: any;
  };
}

export const TabsType = Types.enumForText([
  ['Default', ''],
  ['Borders', 'is-boxed'],
  ['Toggle', 'is-toggle'],
  ['Toggle Rounded', 'is-toggle is-toggle-rounded'],
]);

const DefaultTab = Types.text();
const ListTab = Types.list(DefaultTab);
const Index = Types.number(0, undefined, true);

const getListType = (type?: Type): Type => 
  type instanceof ListType
    ? type
    : ListTab;

const getListItemType = (type?: Type): Type =>
  type instanceof ListType
    ? type.options.item
    : DefaultTab;

const getTabScope: TypeProvider<{ tabs: any }, ObjectType> = (a) =>
  Types.object({
    tab: getListItemType(a.tabs),
    tabIndex: Index,
  });
  

export const Tabs = addComponent<TabsAttributes, TabsEvents, never, never, TabsComputed>({
  collection: COLLECTION,
  name: 'tabs',
  attributes: {
    value: {
      type: (a) => a.getValue || DefaultTab,
      required: true,
    },
    tabs: {
      type: (a) => getListType(a.tabs),
      required: true,
    },
    getText: {
      type: Types.text(),
      default: Exprs.get('tab'),
      callable: getTabScope,
    },
    getIcon: {
      type: IconObject,
      callable: getTabScope,
    },
    getValue: {
      type: (a) => a.getValue || getListItemType(a.tabs),
      default: Exprs.get('tab'),
      callable: getTabScope,
    },
    align: Alignment,
    size: Size,
    type: TabsType,
    fullWidth: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'tabs',
      Exprs.get('type'),
      Exprs.get('size'),
      Exprs.get('align'),
      ifConst(['fullWidth'], 'is-fullwidth'),
    ),
  },
  events: {
    update: (a) => Types.object({
      tab: getListItemType(a.tabs),
      tabIndex: Index,
      tabValue: a.getValue || getListItemType(a.tabs),
    }),
  },
  render: (c) => {
    return ['div', { 
      class: Exprs.get('classes'),
    }, {}, [
      ['ul', {}, {}, [
        createFor(Exprs.get('tabs'), [
          createComponent(Tab, {
            text: c.getAttributeExpression('getText'),
            icon: c.getAttributeExpression('getIcon'),
            value: c.getAttributeExpression('getValue'),
            active: Exprs.get('value'),
          }, {
            update: Exprs
              .get('emit', 'update')
              .set(Exprs.object({
                tab: Exprs.get('tab'),
                tabIndex: Exprs.get('tabIndex'),
                tabValue: Exprs.get('tabValue'),
              })),
          }),
        ], {
          item: 'tab',
          index: 'tabIndex',
        }),
      ]],
    ]];
  },
});