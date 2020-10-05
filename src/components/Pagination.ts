import { Expression, Exprs, NumberOps, Types } from 'expangine-runtime';
import { addComponent, createFor, createIf, createIfs, NodeTemplateChild, Scope } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../helpers';
import { Alignment, Size } from '../Types';


export interface PaginationAttributes
{
  current: number;
  total: number;
  around: number;
  align: string;
  size: string;
  rounded: boolean;
  zeroBased: boolean;
  previousLabel: string;
  nextLabel: string;
}

export interface PaginationEvents
{
  update: { page: number };
}

export interface PaginationComputed
{
  classes: string;
  adjusted: number;
  hasNext: boolean;
  hasPrev: boolean;
  hasFirst: boolean;
  hasSecond: boolean;
  hasFirstEllipsis: boolean;
  hasLast: boolean;
  hasSecondToLast: boolean;
  hasLastEllipsis: boolean;
  rangeFirst: number;
  rangeLast: number;
  rangeSize: number;
}

const Index = Types.number(0, undefined, true);

/**
 * {1}[2][3][4][5][.][9]
 * [1]{2}[3][4][5][.][9]
 * [1][2]{3}[4][5][.][9]
 * [1][2][3]{4}[5][.][9]
 * [1][.][4]{5}[6][.][9]
 * [1][.][5]{6}[7][8][9]
 * [1][.][5][6]{7}[8][9]
 * [1][.][5][6][7]{8}[9]
 * [1][.][5][6][7][8]{9}
 */

export const Pagination = addComponent<PaginationAttributes, PaginationEvents, never, never, PaginationComputed>({
  collection: COLLECTION,
  name: 'pagination',
  attributes: {
    current: {
      type: Index,
      required: true,
    },
    total: {
      type: Index,
      required: true,
    },
    around: {
      type: Index,
      default: Exprs.const(1),
    },
    align: Alignment,
    size: Size,
    rounded: Types.bool(),
    zeroBased: Types.bool(),
    previousLabel: {
      type: Types.text(),
      default: Exprs.const('Previous'),
    },
    nextLabel: {
      type: Types.text(),
      default: Exprs.const('Next'),
    },
  },
  computed: {
    classes: Exprs.tuple(
      'pagination',
      Exprs.get('align'),
      Exprs.get('size'),
      ifConst(['rounded'], 'is-rounded'),
    ),
    adjusted: Exprs.if(
      Exprs.get('zeroBased')
    ).than(
      Exprs.op(NumberOps.add, {
        value: Exprs.get('current'),
        addend: 1,
      }),
    ).else(
      Exprs.get('current'),
    ),
    rangeSize: Exprs.op(NumberOps.min, {
      a: Exprs.op(NumberOps.add, {
        value: Exprs.op(NumberOps.mul, {
          value: Exprs.get('around'),
          multiplier: 2,
        }),
        addend: 1,
      }),
      b: Exprs.get('total'),
    }),
    rangeFirst: Exprs.op(NumberOps.clamp, {
      min: 1, 
      max: Exprs.op(NumberOps.sub, {
        value: Exprs.get('total'),
        subtrahend: Exprs.get('rangeSize'),
      }),
      value: Exprs.op(NumberOps.sub, {
        value: Exprs.get('adjusted'),
        subtrahend: Exprs.get('around'),
      }),
    }),
    rangeLast: Exprs.op(NumberOps.add, {
      value: Exprs.get('rangeFirst'),
      addend: Exprs.op(NumberOps.sub, {
        value: Exprs.get('rangeSize'),
        subtrahend: 1,
      }),
    }),
    hasNext: Exprs.op(NumberOps.isLess, {
      value: Exprs.get('adjusted'),
      test: Exprs.get('total'),
    }),
    hasPrev: Exprs.op(NumberOps.isGreater, {
      value: Exprs.get('adjusted'),
      test: 1,
    }),
    hasFirst: Exprs.op(NumberOps.isGreater, {
      value: Exprs.get('rangeFirst'),
      test: 1,
    }),
    hasSecond: Exprs.op(NumberOps.isEqual, {
      value: Exprs.get('rangeFirst'),
      test: 3,
    }),
    hasFirstEllipsis: Exprs.op(NumberOps.isGreater, {
      value: Exprs.get('rangeFirst'),
      test: 2,
    }),
    hasLast: Exprs.op(NumberOps.isLess, {
      value: Exprs.get('rangeLast'),
      test: Exprs.get('total'),
    }),
    hasSecondToLast: Exprs.op(NumberOps.isEqual, {
      value: Exprs.get('rangeLast'),
      test: Exprs.op(NumberOps.sub, {
        value: Exprs.get('total'),
        subtrahend: 2
      }),
    }),
    hasLastEllipsis: Exprs.op(NumberOps.isLess, {
      value: Exprs.get('rangeLast'),
      test: Exprs.op(NumberOps.sub, {
        value: Exprs.get('total'),
        subtrahend: 1,
      }),
    }),
  },
  events: {
    update: Types.object({
      page: Index,
    }),
  },
  render: (c) => {

    const gotoPage = (page: number) =>
      c.trigger('update', { 
        page: c.scope.get('zeroBased') ? page - 1 : page,
      });

    const renderItem = (page: Expression): NodeTemplateChild =>
      ['li', {}, {}, [
        ['a', { 
          class: Exprs.tuple(
            'pagination-link',
            Exprs.if(
              Exprs.op(NumberOps.isEqual, {
                value: Exprs.get('adjusted'),
                test: page,
              }),
            ).than(
              Exprs.const('is-current')
            ),
          ),
          ariaCurrent: Exprs.if(
            Exprs.op(NumberOps.isEqual, {
              value: Exprs.get('adjusted'),
              test: page,
            }),
          ).than(
            Exprs.const('page')
          ),
        }, { 
          click: (e: any, scope: Scope) => gotoPage(scope.evalNow(page)),
        }, [
          page,
        ]],
      ]];

    return ['nav', {
      class: Exprs.get('classes'),
      role: 'navigation',
      ariaLabel: 'pagination'
    }, {}, [
      createIf(Exprs.get('previousLabel'), [
        ['a', { 
          class: 'pagination-previous',
          disabled: Exprs.not(Exprs.get('hasPrev')),
        }, {
          click: (e: any, scope: Scope) => gotoPage(scope.get('current') - 1),
        }, [
          Exprs.get('previousLabel'),
        ]],
      ]),
      createIf(Exprs.get('nextLabel'), [
        ['a', { 
          class: 'pagination-next',
          disabled: Exprs.not(Exprs.get('hasNext')),
        }, {
          click: (e: any, scope: Scope) => gotoPage(scope.get('current') + 1),
        }, [
          Exprs.get('nextLabel'),
        ]],
      ]),
      ['ul', { class: 'pagination-list' }, {}, [
        createIf(Exprs.get('hasFirst'), [
          renderItem(
            Exprs.const(1)
          ),
        ]),
        createIfs([
          [Exprs.get('hasSecond'), [
            renderItem(
              Exprs.const(1 + 1)
            ),
          ]],
          [Exprs.get('hasFirstEllipsis'), [
            ['li', {}, {}, [
              ['span', {
                class: 'pagination-ellipsis',
                innerHTML: '&hellip;',
              }],
            ]]
          ]]
        ]),
        createFor(Exprs.get('rangeSize'), [
          renderItem(
            Exprs.op(NumberOps.add, {
              value: Exprs.get('index'),
              addend: Exprs.get('rangeFirst'),
            }),
          )
        ]),
        createIfs([
          [Exprs.get('hasSecondToLast'), [
            renderItem(
              Exprs.op(NumberOps.sub, {
                value: Exprs.get('total'),
                subtrahend: 1,
              })
            ),
          ]],
          [Exprs.get('hasLastEllipsis'), [
            ['li', {}, {}, [
              ['span', {
                class: 'pagination-ellipsis',
                innerHTML: '&hellip;',
              }],
            ]]
          ]]
        ]),
        createIf(Exprs.get('hasLast'), [
          renderItem(
            Exprs.get('total')
          ),
        ]),
      ]],
    ]];
  },
})