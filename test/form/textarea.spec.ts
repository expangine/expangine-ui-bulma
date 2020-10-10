import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { registerComponents, Textarea } from '../../src';
import { expectHTML } from '../helper';


describe('form/textarea', () => 
{
  registerComponents();

  it('default', () =>
  {
    const d = {
      message: 'Hi',
    };
    const i = mount(d, createComponent(Textarea, {
      value: Exprs.get('message'),
    }, {
      update: Exprs.get('message').set(Exprs.get('value')),
    }));
    const e = i.node.elements[0] as HTMLTextAreaElement;

    expectHTML(i, [
      `<textarea class="textarea">Hi</textarea>`
    ]);

    expect(i.scope.get('message')).toEqual('Hi');

    e.value = 'Howdy';

    expect(i.scope.get('message')).toEqual('Hi');

    e.dispatchEvent(new Event('input'));

    expect(i.scope.get('message')).toEqual('Howdy');

    expectHTML(i, [
      `<textarea class="textarea">Howdy</textarea>`
    ]);
  });

  it('placeholder', () =>
  {
    const i = mount({}, createComponent(Textarea, { placeholder: 'Email' }));
    
    expectHTML(i, [
      `<textarea class="textarea" placeholder="Email"></textarea>`
    ]);
  });

  it('disabled', () =>
  {
    const i = mount({}, createComponent(Textarea, { disabled: true }));
    
    expectHTML(i, [
      `<textarea class="textarea" disabled=""></textarea>`
    ]);
  });

  it('readonly', () =>
  {
    const i = mount({}, createComponent(Textarea, { readonly: true }));
    
    expectHTML(i, [
      `<textarea class="textarea" readonly=""></textarea>`
    ]);
  });

  it('status', () =>
  {
    const i = mount({}, createComponent(Textarea, { status: 'primary' }));
    
    expectHTML(i, [
      `<textarea class="textarea is-primary"></textarea>`
    ]);
  });

  it('size', () =>
  {
    const i = mount({}, createComponent(Textarea, { size: 'is-large' }));
    
    expectHTML(i, [
      `<textarea class="textarea is-large"></textarea>`
    ]);
  });

  it('autocomplete', () =>
  {
    const i = mount({}, createComponent(Textarea, { autocomplete: 'new-password' }));
    
    expectHTML(i, [
      `<textarea class="textarea" autocomplete="new-password"></textarea>`
    ]);
  });

  it('rounded', () =>
  {
    const i = mount({}, createComponent(Textarea, { rounded: true }));
    
    expectHTML(i, [
      `<textarea class="textarea is-rounded"></textarea>`
    ]);
  });

  it('rows', () =>
  {
    const i = mount({}, createComponent(Textarea, { rows: 2 }));
    
    expectHTML(i, [
      `<textarea class="textarea" rows="2"></textarea>`
    ]);
  });

});