import { Exprs, NumberOps, Types } from 'expangine-runtime';
import { addComponent, createFor, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../helpers';


export const COLUMN_DEFAULT_GAP = 3;

export const COLUMN_GAP_MAX = 8;

export const COLUMN_GAP_MIN = 0;

export interface ColumnsAttributes
{ 
  gap: number;
  multiline: boolean;
  verticalAlign: boolean;
  centered: boolean;
  mobile: boolean;
}

export type ColumnsSlots = 'default';

export interface ColumnsComputed
{ 
  columnsClass: string;
}

export const Columns = addComponent<ColumnsAttributes, never, ColumnsSlots, never, ColumnsComputed>({
  collection: COLLECTION,
  name: 'columns',
  attributes: {
    gap: {
      type: Types.number(COLUMN_GAP_MIN, COLUMN_GAP_MAX, true),
      default: Exprs.const(COLUMN_DEFAULT_GAP),
    },
    multiline: {
      type: Types.bool(),
      default: Exprs.const(false),
    },
    verticalAlign: {
      type: Types.bool(),
      default: Exprs.const(false),
    },
    centered: {
      type: Types.bool(),
      default: Exprs.const(false),
    },
    mobile: {
      type: Types.bool(),
      default: Exprs.const(false),
    },
  },
  computed: {
    columnsClass: Exprs.tuple(
      'columns',
      Exprs.if(
        Exprs.op(NumberOps.isNotEqual, {
          value: Exprs.get('gap'),
          test: COLUMN_DEFAULT_GAP,
        })
      ).than(
        Exprs.template('is-variable is-{gap}', { 
          gap: Exprs.get('gap') 
        }),
      ),
      ifConst(['multiline'], 'is-multiline'),
      ifConst(['verticalAlign'], 'is-vcentered'),
      ifConst(['centered'], 'is-centered'),
      ifConst(['mobile'], 'is-mobile'),
    ),
  },
  slots: {
    default: {
      scope: Types.object(),
      array: true,
    },
  },
  render: (c) => 
    ['div', { class: Exprs.get('columnsClass') }, {}, [
      createFor(c.getSlotArrayLength(), [
        createSlot({ slotIndex: Exprs.get('index') }),
      ]),
    ]],
});