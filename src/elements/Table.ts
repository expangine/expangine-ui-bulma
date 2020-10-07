import { defs, Exprs, ListType, Type, Types } from 'expangine-runtime';
import { addComponent, ComponentInstance, createFor, createIf, createIfElse, createSlot, NodeTemplate } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { TextAlignment } from '../Types';


export interface TableAttributes
{
  columns: Array<{ heading: string, property?: string }>;
  rows: any[];
  getRowKey: any;
  hideHeader: boolean;
  isSelected: boolean;
  bordered: boolean;
  striped: boolean;
  narrow: boolean;
  hoverable: boolean;
  fullWidth: boolean;
  scrollable: boolean;
}

export interface TableComputed
{
  classes: string;
}

export type TableSlots = 'header' | 'footer';

const Row = Types.many(Types.object(), Types.entity('', defs));
const ListRow = Types.list(Row);
const Index = Types.number(0, undefined, true);
const Column = Types.object({
  heading: Types.text(),
  property: Types.optional(Types.text()),
  align: Types.optional(TextAlignment),
  headingAlign: Types.optional(TextAlignment),
});

const isRowList = (type?: Type): type is ListType =>
  type instanceof ListType && Row.isCompatible(type.options.item);

const getListType = (type?: Type): Type => 
  isRowList(type) ? type : ListRow;

const getListItemType = (type?: Type): Type =>
  isRowList(type) ? type.options.item : Row;

export const Table = addComponent<TableAttributes, never, TableSlots, never, TableComputed>({
  collection: COLLECTION,
  name: 'table',
  attributes: {
    rows: {
      type: (a) => getListType(a.rows),
      required: true,
    },
    columns: {
      type: Types.list(Column),
      required: true,
    },
    getRowKey: {
      type: Types.any(),
      default: Exprs.get('rowIndex'),
      callable: (a) => Types.object({
        row: getListItemType(a.rows),
        rowIndex: Index,
      }),
    },
    isSelected: {
      type: Types.bool(),
      callable: (a) => Types.object({
        row: getListItemType(a.rows),
      }),
    },
    hideHeader: Types.bool(),
    bordered: Types.bool(),
    striped: Types.bool(),
    narrow: Types.bool(),
    hoverable: Types.bool(),
    fullWidth: Types.bool(),
    scrollable: Types.bool(),
  },
  computed: {
    classes: Exprs.tuple(
      'table',
      ifConst(['bordered'], 'is-bordered'),
      ifConst(['striped'], 'is-striped'),
      ifConst(['narrow'], 'is-narrow'),
      ifConst(['hoverable'], 'is-hoverable'),
      ifConst(['fullWidth'], 'is-fullwidth'),
    ),
  },
  slots: {
    header: Types.object({
      column: Column,
      columnIndex: Index,
    }),
    footer: Types.object({
      column: Column,
      columnIndex: Index,
    }),
  },
  render: (c) =>
    createIfElse(Exprs.get('scrollable'), [
      ['div', { class: 'table-container' }, {}, [
        RenderTable(c),
      ]],
    ], [
      RenderTable(c),
    ])
})

const RenderTable = (c: ComponentInstance<TableAttributes, never, TableSlots, never, TableComputed>): NodeTemplate =>
  ['table', {
    class: Exprs.get('classes'),
  }, {}, [
    createIf(Exprs.not(Exprs.get('hideHeader')), [
      ['thead', {}, {}, [
        ['tr', {}, {}, [
          createFor(Exprs.get('columns'), [
            ['th', { class: Exprs.get('column', 'headingAlign') }, {}, [
              c.whenSlot('header', 
                () => Exprs.get('column', 'heading'), 
                () => createSlot({ name: 'header', scope: {
                  column: Exprs.get('column'),
                  columnIndex: Exprs.get('columnIndex'),
                }}),
              ),
            ]],
          ], { 
            item: 'column', 
            index: 'columnIndex', 
          }),
        ]],
      ]],
    ]),
    ['tbody', {}, {}, [
      createFor(Exprs.get('rows'), [
        ['tr', {
          class: Exprs.object({
            'is-selected': c.call('isSelected', {
              row: Exprs.get('row'),
            }),
          })
        }, {}, [
          createFor(Exprs.get('columns'), [
            ['td', { class: Exprs.get('column', 'align') }, {}, [
              Exprs.get('row', Exprs.get('column', 'property')),
            ]]
          ], {
            item: 'column', 
            index: 'columnIndex', 
          }),
        ]],
      ], { 
        item: 'row', 
        index: 'rowIndex', 
        key: c.call('getRowKey', {
          row: Exprs.get('row'),
          rowIndex: Exprs.get('rowIndex'),
        })
      }),
    ]],
    c.whenSlot('footer', () => '', () => 
      ['tfoot', {}, {}, [
        ['tr', {}, {}, [
          createFor(Exprs.get('columns'), [
            ['th', { class: Exprs.get('column', 'align') }, {}, [
              createSlot({ name: 'header', scope: {
                column: Exprs.get('column'),
                columnIndex: Exprs.get('columnIndex'),
              }}),
            ]],
          ], { 
            item: 'column', 
            index: 'columnIndex', 
          }),
        ]],
      ]],
    )
  ]]
