import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Dropdown, registerComponents } from '../../src';
import { expectHTML } from '../helper';


describe('components/dropdown', () => 
{
  registerComponents();

  it('default', () =>
  {
    const d = {
      items: [
        { href: '#', text: 'Dropdown item' },
        { text: 'Other dropdown item' },
        { href: '#', text: 'Active dropdown item', active: true },
        { href: '#', text: 'Other dropdown item' },
        { divider: true },
        { href: '#', text: 'With a divider' },
      ],
    };
    const c = mount(d, createComponent(Dropdown, {
      text: 'Dropdown button',
      open: true,
      items: Exprs.get('items'),
    }));

    expectHTML(c, [
      `<div class="dropdown is-active">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true">
            <span>Dropdown button</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              Dropdown item
            </a>
            <div class="dropdown-item">
              <p>Other dropdown item</p>
            </div>
            <a href="#" class="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" class="dropdown-item">
              Other dropdown item
            </a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>`
    ]);
  });

  it('html', () =>
  {
    const d = {
      items: [
        { html: true, text: 'You can insert <strong>any type of content</strong> within the dropdown menu.' },
        { divider: true },
        { html: true, text: 'You simply need to use a <code>&lt;div&gt;</code> instead.' },
        { divider: true },
        { href: '#', text: 'This is a link' },
      ],
    };
    const c = mount(d, createComponent(Dropdown, {
      text: 'Content',
      open: true,
      items: Exprs.get('items'),
    }));

    expectHTML(c, [
      `<div class="dropdown is-active">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true">
            <span>Content</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <div class="dropdown-item">
              <p><span>You can insert <strong>any type of content</strong> within the dropdown menu.</span></p>
            </div>
            <hr class="dropdown-divider">
            <div class="dropdown-item">
              <p><span>You simply need to use a <code>&lt;div&gt;</code> instead.</span></p>
            </div>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">
              This is a link
            </a>
          </div>
        </div>
      </div>`
    ]);
  });

});