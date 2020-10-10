import { Exprs, TextOps, Types } from 'expangine-runtime';
import { createFor, Scope } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export interface PanelTabsAttributes
{
  active: string;
  tabs: string[];
}

export interface PanelTabsEvents
{
  change: void;
}

export const PanelTabs = addComponent<PanelTabsAttributes, PanelTabsEvents>({
  collection: COLLECTION,
  name: 'panel-tabs',
  attributes: {
    active: {
      type: Types.text(),
      required: true,
    },
    tabs: {
      type: Types.list(Types.text()),
      required: true,
    },
  },
  events: {
    change: Types.object({
      tab: Types.text(),
    }),
  },
  render: (c) => 
    ['p', {
      class: 'panel-tabs',
    }, {}, [
      createFor(Exprs.get('tabs'), [
        ['a', {
          class: Exprs.object({
            'is-active': Exprs.op(TextOps.isEqual, {
              a: Exprs.get('item'),
              b: Exprs.get('active'),
            })
          })
        }, {
          click: (e: any, scope: Scope) => c.trigger('change', scope.evalNow('item')),
        }, [
          Exprs.get('item'),
        ]],
      ]),
    ]],
});