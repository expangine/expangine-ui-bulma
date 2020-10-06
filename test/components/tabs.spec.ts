import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Tabs } from '../../src';
import { expectHTML } from '../helper';

// tslint:disable: no-magic-numbers

describe('components/tabs', () => 
{

  it('default', () =>
  {
    const d = {
      current: 'Pictures',
    };
    const c = mount(d, createComponent(Tabs, {
      value: Exprs.get('current'),
      tabs: ['Pictures', 'Music', 'Videos', 'Documents'],
    }, {
      update: Exprs.get('current').set(Exprs.get('tabValue')),
    }));

    expectHTML(c, [
      `<div class="tabs">
        <ul>
          <li class="is-active"><a>Pictures</a></li>
          <li><a>Music</a></li>
          <li><a>Videos</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>`
    ]);

    c.scope.set('current', 'Videos');

    expectHTML(c, [
      `<div class="tabs">
        <ul>
          <li><a>Pictures</a></li>
          <li><a>Music</a></li>
          <li class="is-active"><a>Videos</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>`
    ]);

    const doc = (c.node.elements[0] as HTMLElement).querySelectorAll('a')[3];
    doc.click();

    expect(c.scope.get('current')).toBe('Documents');

    expectHTML(c, [
      `<div class="tabs">
        <ul>
          <li><a>Pictures</a></li>
          <li><a>Music</a></li>
          <li><a>Videos</a></li>
          <li class="is-active"><a>Documents</a></li>
        </ul>
      </div>`
    ]);
  });

  it('icons', () =>
  {
    const d = {
      current: 0,
      tabs: [
        { id: 0, text: 'Pictures', icon: { style: 'fas', name: 'fa-image', decorative: true, size: 'is-small' } },
        { id: 1, text: 'Music', icon: { style: 'fas', name: 'fa-music', decorative: true, size: 'is-small' } },
        { id: 2, text: 'Videos', icon: { style: 'fas', name: 'fa-film', decorative: true, size: 'is-small' } },
        { id: 3, text: 'Documents', icon: { style: 'far', name: 'fa-file-alt', decorative: true, size: 'is-small' } },
      ],
    };
    const c = mount(d, createComponent(Tabs, {
      value: Exprs.get('current'),
      tabs: Exprs.get('tabs'),
      getText: Exprs.get('tab', 'text'),
      getIcon: Exprs.get('tab', 'icon'),
      getValue: Exprs.get('tab', 'id'),
      align: 'is-centered',
    }, {
      update: Exprs.get('current').set(Exprs.get('tabValue')),
    }));

    expectHTML(c, [
      `<div class="tabs is-centered">
        <ul>
          <li class="is-active">
            <a>
              <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
              <span>Pictures</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
              <span>Music</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
              <span>Videos</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
              <span>Documents</span>
            </a>
          </li>
        </ul>
      </div>`
    ]);

    c.scope.set('current', 1);

    expectHTML(c, [
      `<div class="tabs is-centered">
        <ul>
          <li>
            <a>
              <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
              <span>Pictures</span>
            </a>
          </li>
          <li class="is-active">
            <a>
              <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
              <span>Music</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span>
              <span>Videos</span>
            </a>
          </li>
          <li>
            <a>
              <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
              <span>Documents</span>
            </a>
          </li>
        </ul>
      </div>`
    ]);
  });

});