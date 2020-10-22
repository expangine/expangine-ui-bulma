import { Exprs, NumberOps } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { registerComponents, Select } from '../../src';
import { expectHTML } from '../helper';

// tslint:disable no-magic-numbers

describe('form/select', () => 
{
  registerComponents();

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

  it('getSortBy', () =>
  {
    const d = {
      todos: [
        { name: 'A', value: 0 },
        { name: 'B', value: 2 },
        { name: 'C', value: 1 },
      ],
      todo: 2,
    };

    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getValue: Exprs.get('option', 'value'),
      getText: Exprs.get('option', 'name'),
      getSortBy: Exprs.op(NumberOps.cmp, {
        value: Exprs.get('a', 'value'),
        test: Exprs.get('b', 'value'),
      }),
      value: Exprs.get('todo'),
    }, {
      update: Exprs.get('todo').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLSelectElement;

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <option value="0">A</option>
          <option value="2">C</option>
          <option value="1">B</option>
        </select>
      </div>`
    ]);

    expect(s.multiple).toBeFalsy();
    expect(s.options.item(0).selected).toBeFalsy();
    expect(s.options.item(1).selected).toBeFalsy();
    expect(s.options.item(2).selected).toBeTruthy();
    expect(c.scope.get('todo')).toEqual(2);

    s.value = '1';
    expect(c.scope.get('todo')).toEqual(2);

    s.dispatchEvent(new Event('change'));

    expect(c.scope.get('todo')).toEqual(1);
  });

  it('getGroup', () =>
  {
    const d = {
      todos: [
        { name: 'No', value: 0, group: '' },
        { name: 'A1', value: 1, group: 'A' },
        { name: 'A2', value: 2, group: 'A' },
        { name: 'B1', value: 3, group: 'B' },
        { name: 'B2', value: 4, group: 'B' },
      ],
      todo: 2,
    };

    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getValue: Exprs.get('option', 'value'),
      getText: Exprs.get('option', 'name'),
      getGroup: Exprs.get('option', 'group'),
      value: Exprs.get('todo'),
    }, {
      update: Exprs.get('todo').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLSelectElement;

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <option value="0">No</option>
          <optgroup label="A">
            <option value="1">A1</option>
            <option value="2">A2</option>
          </optgroup>
          <optgroup label="B">
            <option value="3">B1</option>
            <option value="4">B2</option>
          </optgroup>
        </select>
      </div>`
    ]);

    expect(s.multiple).toBeFalsy();
    expect(s.options.item(0).selected).toBeFalsy();
    expect(s.options.item(1).selected).toBeFalsy();
    expect(s.options.item(2).selected).toBeTruthy();
    expect(s.options.item(3).selected).toBeFalsy();
    expect(s.options.item(4).selected).toBeFalsy();
    expect(c.scope.get('todo')).toEqual(2);
  });

  it('getDisabled', () =>
  {
    const d = {
      todos: [
        { name: 'A', value: 0, disabled: 1 },
        { name: 'B', value: 1 },
        { name: 'C', value: 2 },
      ],
      todo: 1,
    };

    const c = mount(d, createComponent(Select, {
      options: Exprs.get('todos'),
      getValue: Exprs.get('option', 'value'),
      getText: Exprs.get('option', 'name'),
      getDisabled: Exprs.get('option', 'disabled'),
      value: Exprs.get('todo'),
    }, {
      update: Exprs.get('todo').set(Exprs.get('value')),
    }));

    expectHTML(c, [
      `<div class="select">
        <select>
          <!--if-->
          <option value="0" disabled="">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
        </select>
      </div>`
    ]);
  });

});