import { Exprs, NumberOps, Types } from 'expangine-runtime';
import { addComponent, createFor, createSlot } from 'expangine-ui';
import { Breakpoint, COLLECTION } from './constants';

// tslint:disable: no-magic-numbers

export const COLUMN_MIN = 1;

export const COLUMN_MAX = 12;

export const COLUMN_DEFAULT_GAP = 3;

export const COLUMN_DEFAULT_OFFSET = 0;


export const Columns = addComponent<{ gap: number, multiline: boolean, verticalAlign: boolean, centered: boolean, mobile: boolean }, never, 'default', never, { columnsClass: string }>({
  collection: COLLECTION,
  name: 'columns',
  attributes: {
    gap: {
      type: Types.number(0, 8, true),
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
      Exprs.if(Exprs.get('multiline')).than(Exprs.const('is-multiline')),
      Exprs.if(Exprs.get('verticalAlign')).than(Exprs.const('is-vcentered')),
      Exprs.if(Exprs.get('centered')).than(Exprs.const('is-centered')),
      Exprs.if(Exprs.get('mobile')).than(Exprs.const('is-mobile')),
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


export const Column = addComponent<{ width: number, offset: number, narrow: boolean, narrowBreakpoint: Breakpoint }, never, never, never, { columnClass: string }>({
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
      Exprs.if(Exprs.get('narrow')).than(Exprs.get('narrowBreakpoint')),
    ),
  },
  render: (c) => 
    ['div', { class: Exprs.get('columnClass') }, {}, [
      createSlot({}),
    ]],
});