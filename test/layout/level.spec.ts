import { createComponent, mount } from 'expangine-ui';
import { Level, registerComponents } from '../../src';
import { expectHTML } from '../helper';


describe('layout/level', () => 
{
  registerComponents();

  it('empty', () =>
  {
    const i = mount({}, createComponent(Level));

    expectHTML(i, [
      `<div class="level"></div>`
    ]);
  });

  it('centered empty', () =>
  {
    const i = mount({}, createComponent(Level, { centered: true }));

    expectHTML(i, [
      `<div class="level"></div>`
    ]);
  });

  it('left', () =>
  {
    const i = mount({}, createComponent(Level, {}, {}, {
      left: {
        0: ['A'],
        1: ['B'],
      },
    }));

    expectHTML(i, [
      `<div class="level">
        <div class="level-left">
          <div class="level-item">A</div>
          <div class="level-item">B</div>
        </div>
      </div>`
    ]);
  });

  it('right', () =>
  {
    const i = mount({}, createComponent(Level, {}, {}, {
      right: {
        0: ['A'],
        1: ['B'],
      },
    }));

    expectHTML(i, [
      `<div class="level">
        <div class="level-right">
          <div class="level-item">A</div>
          <div class="level-item">B</div>
        </div>
      </div>`
    ]);
  });

  it('center items', () =>
  {
    const i = mount({}, createComponent(Level, {}, {}, {
      default: {
        0: ['A'],
        1: ['B'],
      },
    }));

    expectHTML(i, [
      `<div class="level">
        <div class="level-item">A</div>
        <div class="level-item">B</div>
      </div>`
    ]);
  });

  it('mobile', () =>
  {
    const i = mount({}, createComponent(Level, { mobile: true }, {}, {
      default: {
        0: ['A'],
        1: ['B'],
      },
    }));

    expectHTML(i, [
      `<div class="level is-mobile">
        <div class="level-item">A</div>
        <div class="level-item">B</div>
      </div>`
    ]);
  });

  it('centered', () =>
  {
    const i = mount({}, createComponent(Level, { centered: true }, {}, {
      default: {
        0: ['A'],
        1: ['B'],
      },
    }));

    expectHTML(i, [
      `<div class="level">
        <div class="level-item has-text-centered">A</div>
        <div class="level-item has-text-centered">B</div>
      </div>`
    ]);
  });

  it('multiple', () =>
  {
    const i = mount({}, createComponent(Level, { centered: true, mobile: true}, {}, {
      left: {
        0: ['A'],
        1: ['B'],
      },
      default: {
        0: ['C'],
        1: ['D'],
      },
      right: {
        0: ['E'],
      },
    }));

    expectHTML(i, [
      `<div class="level is-mobile">
        <div class="level-left">
          <div class="level-item has-text-centered">A</div>
          <div class="level-item has-text-centered">B</div>
        </div>
        <div class="level-item has-text-centered">C</div>
        <div class="level-item has-text-centered">D</div>
        <div class="level-right">
          <div class="level-item has-text-centered">E</div>
        </div>
      </div>`
    ]);
  });

});