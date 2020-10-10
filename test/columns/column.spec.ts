import { createComponent, mount } from 'expangine-ui';
import { Column, registerComponents } from '../../src';
import { expectHTML } from '../helper';


describe('layout/column', () => 
{
  registerComponents();

  it('default', () =>
  {
    const i = mount({}, createComponent(Column));

    expectHTML(i, [
      `<div class="column"></div>`
    ]);
  });

  it('width', () =>
  {
    const i = mount({}, createComponent(Column, { width: 2 }));

    expectHTML(i, [
      `<div class="column is-2"></div>`
    ]);
  });

  it('offset', () =>
  {
    const i = mount({}, createComponent(Column, { offset: 2 }));

    expectHTML(i, [
      `<div class="column is-offset-2"></div>`
    ]);
  });

  it('narrow', () =>
  {
    const i = mount({}, createComponent(Column, { narrow: true }));

    expectHTML(i, [
      `<div class="column is-narrow"></div>`
    ]);
  });

  it('narrow breakpoint', () =>
  {
    const i = mount({}, createComponent(Column, { narrow: true, narrowBreakpoint: 'is-narrow-mobile' }));

    expectHTML(i, [
      `<div class="column is-narrow-mobile"></div>`
    ]);
  });

  it('narrow breakpoint without narrow', () =>
  {
    const i = mount({}, createComponent(Column, { narrow: false, narrowBreakpoint: 'is-narrow-mobile' }));

    expectHTML(i, [
      `<div class="column"></div>`
    ]);
  });

});