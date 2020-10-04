import { Exprs, NumberOps } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Table } from '../../src';
import { expectHTML } from '../helper';


describe('elements/table', () => 
{

  it('default', () =>
  {
    const d = {
      tasks: [
        { id: 1, name: 'Do this', due: '2020-11-08' },
        { id: 2, name: 'Do that', due: '2020-12-12' },
      ],
    };
    const c = mount(d, createComponent(Table, {
      rows: Exprs.get('tasks'),
      columns: Exprs.const([
        { heading: 'ID', property: 'id' },
        { heading: 'Name', property: 'name' },
        { heading: 'Due', property: 'due', align: 'has-text-right' },
      ]),
      getRowKey: Exprs.get('row', 'id'),
      striped: true,
      isSelected: Exprs.op(NumberOps.isEqual, {
        value: Exprs.get('row', 'id'),
        test: 1,
      }),
    }));

    expectHTML(c, [
      `<table class="table is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          <tr class="is-selected">
            <td>1</td>
            <td>Do this</td>
            <td class="has-text-right">2020-11-08</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Do that</td>
            <td class="has-text-right">2020-12-12</td>
          </tr>
        </tbody>
      </table>`
    ])
  });
  
});