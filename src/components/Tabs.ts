import { Exprs, ListType, ObjectType, Type, Types } from 'expangine-runtime';
import { addComponent, createComponent, createFor } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { IconObject } from '../elements';
import { ifConst } from '../helpers';
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
  ['', 'Default'],
  ['is-boxed', 'Borders'],
  ['is-toggle', 'Toggle'],
  ['is-toggle is-toggle-rounded', 'Toggle Rounded'],
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

const getTabScope = (type?: Type): ObjectType =>
  Types.object({
    tab: getListItemType(type),
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
      callable: (a) => getTabScope(a.tabs),
    },
    getIcon: {
      type: IconObject,
      callable: (a) => getTabScope(a.tabs),
    },
    getValue: {
      type: (a) => a.getValue || getListItemType(a.tabs),
      default: Exprs.get('tab'),
      callable: (a) => getTabScope(a.tabs),
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
    const TabScope = {
      tab: Exprs.get('tab'),
      tabIndex: Exprs.get('tabIndex'),
    };

    return ['div', { 
      class: Exprs.get('classes'),
    }, {}, [
      ['ul', {}, {}, [
        createFor(Exprs.get('tabs'), [
          createComponent(Tab, {
            text: c.call('getText', TabScope),
            icon: c.call('getIcon', TabScope),
            value: c.call('getValue', TabScope),
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