import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Breadcrumb } from '../../src';
import { expectHTML } from '../helper';


describe('components/breadcrumb', () => 
{

  it('default', () =>
  {
    const i = mount({}, createComponent(Breadcrumb, {
      crumbs: [
        { text: 'Bulma' },
        { text: 'Documentation' },
        { text: 'Components' },
        { text: 'Breadcrumb' },
      ],
      getText: Exprs.get('crumb', 'text'),
    }));

    expectHTML(i, [
      `<nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Bulma</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Components</a></li>
          <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
        </ul>
      </nav>`
    ]);
  });

  it('href', () =>
  {
    const i = mount({}, createComponent(Breadcrumb, {
      crumbs: [
        { text: 'Bulma', link: 'https://bulma.io/' },
        { text: 'Documentation', link: 'https://bulma.io/documentation/' },
        { text: 'Components', link: 'https://bulma.io/documentation/components/' },
        { text: 'Breadcrumb', link: 'https://bulma.io/documentation/components/breadcrumb/' },
      ],
      getText: Exprs.get('crumb', 'text'),
      getHref: Exprs.get('crumb', 'link'),
    }));

    expectHTML(i, [
      `<nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="https://bulma.io/">
              Bulma
            </a>
          </li>
          <li>
            <a href="https://bulma.io/documentation/">
              Documentation
            </a>
          </li>
          <li>
            <a href="https://bulma.io/documentation/components/">
              Components
            </a>
          </li>
          <li class="is-active">
            <a href="https://bulma.io/documentation/components/breadcrumb/" aria-current="page">
              Breadcrumb
            </a>
          </li>
        </ul>
      </nav>`
    ]);
  });

  it('alignment', () =>
  {
    const i = mount({}, createComponent(Breadcrumb, {
      crumbs: [
        { text: 'Bulma' },
        { text: 'Documentation' },
        { text: 'Components' },
        { text: 'Breadcrumb' },
      ],
      getText: Exprs.get('crumb', 'text'),
      align: 'is-centered',
    }));

    expectHTML(i, [
      `<nav class="breadcrumb is-centered" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Bulma</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Components</a></li>
          <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
        </ul>
      </nav>`
    ]);
  });

  it('icons', () =>
  {
    const i = mount({}, createComponent(Breadcrumb, {
      crumbs: [
        { text: 'Bulma', icon: { style: 'fas', name: 'fa-home', decorative: true, size: 'is-small' } },
        { text: 'Documentation', icon: { style: 'fas', name: 'fa-book', decorative: true, size: 'is-small' } },
        { text: 'Components', icon: { style: 'fas', name: 'fa-puzzle-piece', decorative: true, size: 'is-small' } },
        { text: 'Breadcrumb', icon: { style: 'fas', name: 'fa-thumbs-up', decorative: true, size: 'is-small' } },
      ],
      getText: Exprs.get('crumb', 'text'),
      getIcon: Exprs.get('crumb', 'icon'),
    }));

    expectHTML(i, [
      `<nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li>
            <a href="#">
              <span class="icon is-small">
                <i class="fas fa-home" aria-hidden="true"></i>
              </span>
              <span>Bulma</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon is-small">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              <span>Documentation</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span class="icon is-small">
                <i class="fas fa-puzzle-piece" aria-hidden="true"></i>
              </span>
              <span>Components</span>
            </a>
          </li>
          <li class="is-active">
            <a href="#" aria-current="page">
              <span class="icon is-small">
                <i class="fas fa-thumbs-up" aria-hidden="true"></i>
              </span>
              <span>Breadcrumb</span>
            </a>
          </li>
        </ul>
      </nav>`
    ]);
  });

  it('separator', () =>
  {
    const i = mount({}, createComponent(Breadcrumb, {
      crumbs: [
        { text: 'Bulma' },
        { text: 'Documentation' },
        { text: 'Components' },
        { text: 'Breadcrumb' },
      ],
      getText: Exprs.get('crumb', 'text'),
      separator: 'has-arrow-separator',
    }));

    expectHTML(i, [
      `<nav class="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
        <ul>
          <li><a href="#">Bulma</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Components</a></li>
          <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
        </ul>
      </nav>`
    ]);
  });

});