import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';

export const VisibilityBreakpoint = Types.enumForText([
  ['Always', 'is-hidden'],
  ['Mobile', 'is-hidden-mobile'],
  ['Touch', 'is-hidden-touch'],
  ['Tablet', 'is-hidden-tablet'],
  ['Tablet Only', 'is-hidden-tablet-only'],
  ['Desktop', 'is-hidden-desktop'],
  ['Desktop Only', 'is-hidden-desktop-only'],
  ['Widescreen', 'is-hidden-widescreen'],
  ['Widescreen Only', 'is-hidden-widescreen-only'],
  ['Full HD', 'is-hidden-fullhd'],
]);

export const Visibility = addComponent({
  collection: COLLECTION,
  name: 'visibility',
  attributes: {
    hidden: Types.bool(),
    hiddenBreakpoint: {
      type: VisibilityBreakpoint,
      default: Exprs.const('is-hidden'),
    },
    invisible: Types.bool(),
    screenReaderOnly: Types.bool(),
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['div', {
      class: Exprs.tuple(
        Exprs.if(
          Exprs.get('hidden')
        ).than(
          Exprs.get('hiddenBreakpoint')
        ),
        ifConst(['invisible'], 'is-invisible'),
        ifConst(['screenReaderOnly'], 'is-sr-only'),
      ),
    }, {}, [
      createSlot(),
    ]],
})