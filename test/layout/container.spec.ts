import { createComponent, mount } from 'expangine-ui';
import { Container } from '../../src';
import { expectHTML } from '../helper';


describe('layout/container', () => 
{

  it('default', () =>
  {
    const i = mount({}, createComponent(Container));

    expectHTML(i, [
      `<div class="container"></div>`
    ]);
  });

  it('fluid', () =>
  {
    const i = mount({}, createComponent(Container, { type: 'is-fluid' }));

    expectHTML(i, [
      `<div class="container is-fluid"></div>`
    ]);
  });

  it('widescreen', () =>
  {
    const i = mount({}, createComponent(Container, { type: 'is-widescreen' }));

    expectHTML(i, [
      `<div class="container is-widescreen"></div>`
    ]);
  });

  it('fullhd', () =>
  {
    const i = mount({}, createComponent(Container, { type: 'is-fullhd' }));

    expectHTML(i, [
      `<div class="container is-fullhd"></div>`
    ]);
  });

});