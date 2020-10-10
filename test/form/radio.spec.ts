import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Control, Radio, registerComponents } from '../../src';
import { expectHTML } from '../helper';

// tslint:disable no-magic-numbers

describe('form/radio', () => 
{
  registerComponents();

  it('value number', () =>
  {
    const d = {
      current: 2,
    };
    const c = mount(d, createComponent(Control, {}, {}, {
      default: [
        createComponent(Radio, {
          value: Exprs.get('current'),
          name: 'radios',
          label: 'Option 1',
          checkedValue: 1
        }, {
          update: Exprs.get('current').set(Exprs.get('value')),
        }),
        createComponent(Radio, {
          value: Exprs.get('current'),
          name: 'radios',
          label: 'Option 2',
          checkedValue: 2
        }, {
          update: Exprs.get('current').set(Exprs.get('value')),
        })
      ],
    }));
      
    const s = (c.node.elements[0] as HTMLElement).querySelectorAll('input');

    expectHTML(c, [
      `<div class="control">
        <label class="radio">
          <input type="radio" name="radios">
          Option 1
        </label>
        <label class="radio">
          <input type="radio" name="radios" checked="true">
          Option 2
        </label>
        <!--if-->
        <!--if-->
      </div>`
    ]);

    expect(s[0].checked).toBeFalsy();
    expect(s[1].checked).toBeTruthy();

    expect(c.scope.get('current')).toBe(2);

    s[0].checked = true;
    s[0].dispatchEvent(new Event('change'));

    expect(s[0].checked).toBeTruthy();
    expect(s[1].checked).toBeFalsy();

    expect(c.scope.get('current')).toBe(1);

    expectHTML(c, [
      `<div class="control">
        <label class="radio">
          <input type="radio" name="radios" checked="true">
          Option 1
        </label>
        <label class="radio">
          <input type="radio" name="radios">
          Option 2
        </label>
        <!--if-->
        <!--if-->
      </div>`
    ]);
  });

});