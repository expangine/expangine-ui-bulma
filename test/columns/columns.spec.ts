import { createComponent, mount } from 'expangine-ui';
import { Column, Columns, registerComponents } from '../../src';
import { expectHTML } from '../helper';


describe('layout/columns', () => 
{
  registerComponents();

  it('default', () =>
  {
    const i = mount({}, createComponent(Columns));

    expectHTML(i, [
      `<div class="columns">
        <!--for-->
      </div>`
    ]);
  });

  it('with gap', () =>
  {
    const i = mount({}, createComponent(Columns, { gap: 2 }));

    expectHTML(i, [
      `<div class="columns is-variable is-2">
        <!--for-->
      </div>`
    ]);
  });

  it('with multiline', () =>
  {
    const i = mount({}, createComponent(Columns, { multiline: true }));

    expectHTML(i, [
      `<div class="columns is-multiline">
        <!--for-->
      </div>`
    ]);
  });

  it('with verticalAlign', () =>
  {
    const i = mount({}, createComponent(Columns, { verticalCenter: true }));

    expectHTML(i, [
      `<div class="columns is-vcentered">
        <!--for-->
      </div>`
    ]);
  });

  it('with centered', () =>
  {
    const i = mount({}, createComponent(Columns, { centered: true }));

    expectHTML(i, [
      `<div class="columns is-centered">
        <!--for-->
      </div>`
    ]);
  });

  it('with mobile', () =>
  {
    const i = mount({}, createComponent(Columns, { mobile: true }));

    expectHTML(i, [
      `<div class="columns is-mobile">
        <!--for-->
      </div>`
    ]);
  });

  it('with columns', () =>
  {
    const i = mount({}, createComponent(Columns, {}, {}, {
      default: {
        0: [createComponent(Column, {}, {}, {
          default: ['A']
        })],
        1: [createComponent(Column, { width: 4 }, {}, {
          default: ['B']
        })],
      },
    }));

    expectHTML(i, [
      `<div class="columns">
        <div class="column">A</div>
        <div class="column is-4">B</div>
      </div>`
    ]);
  });

});