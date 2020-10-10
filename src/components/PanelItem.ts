import { Exprs, Types } from 'expangine-runtime';
import { createIf, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { IconClasses, IconObject, IconRender, IconType } from '../elements';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';


export interface PanelItemAttributes
{
  active: boolean;
  text: string;
  icon: IconType;
}

export interface PanelItemEvents
{
  click: void;
}

export interface PanelItemComputed
{
  classes: string;
  iconClasses: string;
}

export type PanelItemSlots = 'default';

export const PanelItem = addComponent<PanelItemAttributes, PanelItemEvents, PanelItemSlots, never, PanelItemComputed>({
  collection: COLLECTION,
  name: 'panel-item',
  attributes: {
    active: Types.bool(),
    text: Types.text(),
    icon: IconObject,
  },
  computed: {
    classes: Exprs.tuple(
      'panel-block',
      ifConst(['active'], 'is-active'),
    ),
    iconClasses: Exprs.if(
      Exprs.get('icon'),
    ).than(
      IconClasses('icon'),
    ),
  },
  events: {
    click: BaseEventType,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['a', {
      class: Exprs.get('classes'),
    }, {
      click: (e: any) => c.trigger('click', e),
    }, [
      createIf(Exprs.get('icon'), [
        IconRender('iconClasses'),
      ]),
      c.whenSlot('default', 
        () => Exprs.get('text'), 
        () => createSlot()
      ),
    ]],
});