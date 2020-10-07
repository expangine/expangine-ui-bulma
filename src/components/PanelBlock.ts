import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';


export interface PanelBlockAttributes
{
  active: boolean; 
}

export interface PanelBlockComputed
{
  classes: string;
}

export type PanelBlockSlots = 'default';

export const PanelBlock = addComponent<PanelBlockAttributes, never, PanelBlockSlots, never, PanelBlockComputed>({
  collection: COLLECTION,
  name: 'panel-block',
  attributes: {
    active: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'panel-block',
      ifConst(['active'], 'is-active'),
    ),
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      createSlot(),
    ]],
});