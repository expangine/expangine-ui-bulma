import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Select } from '../../src';
import { expectHTML } from '../helper';

// tslint:disable no-magic-numbers

describe('form/select', () => 
{

  it('value number', () =>
  {
    const d = {
      todos: [
        { name: 'A', value: 0 },
        { name: 'B', value: 1 },
        { name: 'C', value: 2 },
      ],
      todo: 1,
    };
    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getValue: Exprs.get('option', 'value'),
      getText: Exprs.get('option', 'name'),
      value: Exprs.get('todo'),
    }, {
      update: Exprs.get('todo').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLSelectElement;

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <!--for-->
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
        </select>
      </div>`
    ]);

    expect(s.options.item(0).selected).toBeFalsy();
    expect(s.options.item(1).selected).toBeTruthy();
    expect(s.options.item(2).selected).toBeFalsy();
    expect(c.scope.get('todo')).toBe(1);

    s.value = '0';
    s.dispatchEvent(new Event('change'));

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <!--for-->
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
        </select>
      </div>`
    ]);

    expect(s.options.item(0).selected).toBeTruthy();
    expect(s.options.item(1).selected).toBeFalsy();
    expect(s.options.item(2).selected).toBeFalsy();
    expect(c.scope.get('todo')).toBe(0);
  });

  it('value object default value', () =>
  {
    const d = {
      todos: [
        { name: 'A', value: 0 },
        { name: 'B', value: 1 },
        { name: 'C', value: 2 },
      ],
      todo: null as any,
    };
    d.todo = d.todos[1];

    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getText: Exprs.get('option', 'name'),
      value: Exprs.get('todo'),
    }, {
      update: Exprs.get('todo').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLSelectElement;

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <!--for-->
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
        </select>
      </div>`
    ]);

    expect(s.options.item(0).selected).toBeFalsy();
    expect(s.options.item(1).selected).toBeTruthy();
    expect(s.options.item(2).selected).toBeFalsy();
    expect(c.scope.get('todo')).toStrictEqual(d.todos[1]);

    s.value = '0';
    s.dispatchEvent(new Event('change'));

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <!--for-->
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
        </select>
      </div>`
    ]);

    expect(s.options.item(0).selected).toBeTruthy();
    expect(s.options.item(1).selected).toBeFalsy();
    expect(s.options.item(2).selected).toBeFalsy();
    expect(c.scope.get('todo')).toStrictEqual(d.todos[0]);
  });

  it('multiple inner value', () =>
  {
    const d = {
      todos: [
        { name: 'A', value: 0 },
        { name: 'B', value: 1 },
        { name: 'C', value: 2 },
        { name: 'D', value: 3 },
        { name: 'E', value: 4 },
        { name: 'F', value: 5 },
      ],
      todo: [2, 4, 5, 6],
    };

    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getValue: Exprs.get('option', 'value'),
      getText: Exprs.get('option', 'name'),
      value: Exprs.get('todo'),
      multiple: Exprs.true(),
    }, {
      update: Exprs.get('todo').set(Exprs.get('values')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLSelectElement;

    expectHTML(c, [
      `<div class="select">
        <select multiple="">
          <!--if-->
          <!--for-->
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
          <option value="3">D</option>
          <option value="4">E</option>
          <option value="5">F</option>
        </select>
      </div>`
    ]);

    expect(s.multiple).toBeTruthy();
    expect(s.options.item(0).selected).toBeFalsy();
    expect(s.options.item(1).selected).toBeFalsy();
    expect(s.options.item(2).selected).toBeTruthy();
    expect(s.options.item(3).selected).toBeFalsy();
    expect(s.options.item(4).selected).toBeTruthy();
    expect(s.options.item(5).selected).toBeTruthy();
    expect(c.scope.get('todo')).toEqual([2, 4, 5, 6]);

    s.options.item(3).selected = true;
    s.options.item(4).selected = false;
    s.options.item(1).selected = false;
    expect(c.scope.get('todo')).toEqual([2, 4, 5, 6]);

    s.dispatchEvent(new Event('change'));

    expect(c.scope.get('todo')).toEqual([2, 3, 5]);
  });

});