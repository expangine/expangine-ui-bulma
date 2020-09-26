import { createComponent, mount } from 'expangine-ui';
import { Hero } from '../../src';
import { expectHTML } from '../helper';


describe('layout/hero', () => 
{

  it('empty', () =>
  {
    const i = mount({}, createComponent(Hero));

    expectHTML(i, [
      `<section class="hero">
        <div class="hero-body"></div>
      </section>`
    ]);
  });

  it('type primary', () =>
  {
    const i = mount({}, createComponent(Hero, { type: 'is-primary' }));

    expectHTML(i, [
      `<section class="hero is-primary">
        <div class="hero-body"></div>
      </section>`
    ]);
  });

  it('size medium gradient', () =>
  {
    const i = mount({}, createComponent(Hero, { size: 'is-medium', gradient: true }));

    expectHTML(i, [
      `<section class="hero is-medium is-bold">
        <div class="hero-body"></div>
      </section>`
    ]);
  });

  it('size medium not gradient', () =>
  {
    const i = mount({}, createComponent(Hero, { size: 'is-medium', gradient: false }));

    expectHTML(i, [
      `<section class="hero is-medium">
        <div class="hero-body"></div>
      </section>`
    ]);
  });

  it('header and footer slots', () =>
  {
    const i = mount({}, createComponent(Hero, {}, {}, {
      header: ['A'],
      default: ['B'],
      footer: ['C'],
    }));

    expectHTML(i, [
      `<section class="hero">
        <div class="hero-head">A</div>
        <div class="hero-body">B</div>
        <div class="hero-foot">C</div>
      </section>`
    ]);
  });

});