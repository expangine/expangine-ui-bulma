import { Exprs, NumberOps, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { Breakpoint, COLLECTION } from '../constants';


export const COLUMN_MIN = 1;

export const COLUMN_MAX = 12;

export const COLUMN_DEFAULT_OFFSET = 0;

export interface ColumnAttributes
{ 
  width: number;
  offset: number;
  narrow: boolean;
  narrowBreakpoint: Breakpoint;
}

export interface ColumnComputed
{ 
  columnClass: string;
}

export const Column = addComponent<ColumnAttributes, never, never, never, ColumnComputed>({
  collection: COLLECTION,
  name: 'column',
  attributes: {
    width: {
      type: Types.optional(Types.number(COLUMN_MIN, COLUMN_MAX, true)),
    },
    offset: {
      type: Types.number(COLUMN_MIN, COLUMN_MAX, true),
      default: Exprs.const(COLUMN_DEFAULT_OFFSET),
    },
    narrow: {
      type: Types.bool(),
      default: Exprs.const(false),
    },
    narrowBreakpoint: {
      type: Types.enumForText([
        ['is-narrow', 'None'],
        ['is-narrow-mobile', 'Mobile'],
        ['is-narrow-tablet', 'Tablet'],
        ['is-narrow-touch', 'Touch'],
        ['is-narrow-desktop', 'Desktop'],
        ['is-narrow-widescreen', 'Widescreen'],
        ['is-narrow-fullhd', 'Full HD'],
      ]),
      default: Exprs.const('is-narrow'),
    },
  },
  computed: {
    columnClass: Exprs.tuple(
      'column',
      Exprs.if(
        Exprs.op(NumberOps.isValid, {
          value: Exprs.get('width'),
        }),
      ).than(
        Exprs.template('is-{width}', {
          width: Exprs.get('width'),
        }),
      ),
      Exprs.if(
        Exprs.op(NumberOps.isGreater, {
          value: Exprs.get('offset'),
          test: COLUMN_DEFAULT_OFFSET,
        }),
      ).than(
        Exprs.template('is-offset-{offset}', {
          offset: Exprs.get('offset'),
        }),
      ),
      Exprs.if(
        Exprs.get('narrow')
      ).than(
        Exprs.get('narrowBreakpoint')
      ),
    ),
  },
  render: (c) => 
    ['div', { class: Exprs.get('columnClass') }, {}, [
      createSlot(),
    ]],
});