import { Exprs, NumberOps, Types } from 'expangine-runtime';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Colors, Size } from '../Types';


export const PROGRESS_MIN = 0;

export const PROGRESS_MAX_DEFAULT = 100;

export interface ProgressAttributes
{
  value: number;
  max: number;
  color: string;
  size: string;
  indeterminate: boolean; 
}

export interface ProgressComputed
{
  classes: string;
  percent: string;
}

export const Progress = addComponent<ProgressAttributes, never, never, never, ProgressComputed>({
  collection: COLLECTION,
  name: 'progress',
  attributes: {
    value: {
      type: Types.number(PROGRESS_MIN),
      default: Exprs.const(PROGRESS_MIN),
    },
    max: {
      type: Types.number(PROGRESS_MIN),
      default: Exprs.const(PROGRESS_MAX_DEFAULT),
    },
    color: Colors,
    size: Size,
    indeterminate: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'progress',
      Exprs.get('color'),
      Exprs.get('size'),
    ),
    percent: Exprs.op(NumberOps.toPercent, {
      value: Exprs.op(NumberOps.div, {
        value: Exprs.get('value'),
        divisor: Exprs.get('max'),
      }),
      maxPlaces: Exprs.const(0),
    }),
  },
  render: (c) =>
    ['progress', {
      class: Exprs.get('classes'),
      max: Exprs.get('max'),
      value: Exprs.if(
        Exprs.not(Exprs.get('indeterminate'))
      ).than(
        Exprs.get('value'),
      ),
    }, {}, [
      Exprs.get('percent')
    ]]
})