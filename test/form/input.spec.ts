import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Input } from '../../src';
import { expectHTML } from '../helper';


describe('form/input', () => 
{

  it('default', () =>
  {
    const d = {
      message: 'Hi',
    };
    const i = mount(d, createComponent(Input, {
      value: Exprs.get('message'),
    }, {
      update: Exprs.get('message').set(Exprs.get('value')),
    }));
    const e = i.node.elements[0] as HTMLInputElement;

    expectHTML(i, [
      `<input class="input" type="text">`
    ]);

    expect(e.value).toEqual('Hi');
    expect(i.scope.get('message')).toEqual('Hi');

    e.value = 'Howdy';

    expect(i.scope.get('message')).toEqual('Hi');

    e.dispatchEvent(new Event('input'));

    expect(i.scope.get('message')).toEqual('Howdy');
  });

  it('placeholder', () =>
  {
    const i = mount({}, createComponent(Input, { placeholder: 'Email' }));
    
    expectHTML(i, [
      `<input class="input" type="text" placeholder="Email">`
    ]);
  });

  it('disabled', () =>
  {
    const i = mount({}, createComponent(Input, { disabled: true }));
    
    expectHTML(i, [
      `<input class="input" type="text" disabled="">`
    ]);
  });

  it('readonly', () =>
  {
    const i = mount({}, createComponent(Input, { readonly: true }));
    
    expectHTML(i, [
      `<input class="input" type="text" readonly="">`
    ]);
  });

  it('status', () =>
  {
    const i = mount({}, createComponent(Input, { status: 'primary' }));
    
    expectHTML(i, [
      `<input class="input is-primary" type="text">`
    ]);
  });

  it('size', () =>
  {
    const i = mount({}, createComponent(Input, { size: 'is-large' }));
    
    expectHTML(i, [
      `<input class="input is-large" type="text">`
    ]);
  });

  it('autocomplete', () =>
  {
    const i = mount({}, createComponent(Input, { autocomplete: 'new-password' }));
    
    expectHTML(i, [
      `<input class="input" type="text" autocomplete="new-password">`
    ]);
  });

  it('rounded', () =>
  {
    const i = mount({}, createComponent(Input, { rounded: true }));
    
    expectHTML(i, [
      `<input class="input is-rounded" type="text">`
    ]);
  });

  it('type', () =>
  {
    const i = mount({}, createComponent(Input, { type: 'password' }));
    
    expectHTML(i, [
      `<input class="input" type="password">`
    ]);
  });

});