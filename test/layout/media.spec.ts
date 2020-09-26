import { createComponent, mount } from 'expangine-ui';
import { Media } from '../../src';
import { expectHTML } from '../helper';


describe('layout/media', () => 
{

  it('empty', () =>
  {
    const i = mount({}, createComponent(Media));

    expectHTML(i, [
      `<article class="media">
        <div class="media-content"></div>
      </article>`
    ]);
  });

  it('left', () =>
  {
    const i = mount({}, createComponent(Media, {}, {}, {
      left: ['A']
    }));

    expectHTML(i, [
      `<article class="media">
        <figure class="media-left">A</figure>
        <div class="media-content"></div>
      </article>`
    ]);
  });

  it('right', () =>
  {
    const i = mount({}, createComponent(Media, {}, {}, {
      right: ['A']
    }));

    expectHTML(i, [
      `<article class="media">
        <div class="media-content"></div>
        <div class="media-right">A</div>
      </article>`
    ]);
  });

  it('full', () =>
  {
    const i = mount({}, createComponent(Media, {}, {}, {
      left: ['A'],
      default: ['B'],
      right: ['C']
    }));

    expectHTML(i, [
      `<article class="media">
        <figure class="media-left">A</figure>
        <div class="media-content">B</div>
        <div class="media-right">C</div>
      </article>`
    ]);
  });

});