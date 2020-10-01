import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Checkbox } from '../../src';
import { expectHTML } from '../helper';

// tslint:disable no-magic-numbers

describe('form/checkbox', () => 
{

  it('value boolean', () =>
  {
    const d = {
      isChecked: true,
    };
    const c = mount(d, createComponent(Checkbox, {
      value: Exprs.get('isChecked'),
    }, {
      update: Exprs.get('isChecked').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLInputElement;

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox" checked="true">
      </label>`
    ]);

    expect(c.scope.get('isChecked')).toBe(true);

    s.checked = false;
    s.dispatchEvent(new Event('change'));

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
      </label>`
    ]);

    expect(c.scope.get('isChecked')).toBe(false);
  });

  it('value number', () =>
  {
    const d = {
      isChecked: 0,
    };
    const c = mount(d, createComponent(Checkbox, {
      value: Exprs.get('isChecked'),
      checkedValue: 0,
      uncheckedValue: 1,
    }, {
      update: Exprs.get('isChecked').set(Exprs.get('value')),
    }));

    const s = c.node.elements[0].childNodes[0] as HTMLInputElement;

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox" checked="true">
      </label>`
    ]);

    expect(c.scope.get('isChecked')).toBe(0);

    s.checked = false;
    s.dispatchEvent(new Event('change'));

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
      </label>`
    ]);

    expect(c.scope.get('isChecked')).toBe(1);
  });

  it('label constant', () =>
  {
    const c = mount({}, createComponent(Checkbox, {
      label: 'Ready?',
    }));

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
        Ready?
      </label>`
    ]);
  });

  it('label dynamic', () =>
  {
    const d = {
      text: 'Ready?',
    };
    const c = mount(d, createComponent(Checkbox, {
      label: Exprs.get('text'),
    }));

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
        Ready?
      </label>`
    ]);

    c.scope.set('text', 'Not Ready!');

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
        Not Ready!
      </label>`
    ]);
  });

  it('label slot', () =>
  {
    const c = mount({}, createComponent(Checkbox, {}, {}, {
      default: [
        ['span', {}, {}, ['Greetings Earthling']],
      ],
    }));

    expectHTML(c, [
      `<label class="checkbox">
        <input type="checkbox">
        <span>
          Greetings Earthling
        </span>
      </label>`
    ]);
  });

});