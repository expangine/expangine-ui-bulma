import { createComponent, mount } from 'expangine-ui';
import { Card } from '../../src';
import { expectHTML } from '../helper';


describe('components/card', () => 
{

  it('default', () =>
  {
    const i = mount({}, createComponent(Card, {
      image: {
        ratio: 'is-4by3',
        src: 'https://bulma.io/images/placeholders/1280x960.png',
        alt: 'Placeholder image'
      }
    }));

    expectHTML(i, [
      `<div class="card">
        <!--if-->
        <div class="card-image">
          <div class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
          </div>
        </div>
        <div class="card-content">
        </div>
      </div>`
    ]);
  });

  it('header', () =>
  {
    const i = mount({}, createComponent(Card, {
      header: 'Component',
      headerIcon: {
        style: 'fas',
        name: 'fa-angle-down',
        decorative: true,
      },
      footerLinks: true,
    }, {}, {
      footerItems: {
        0: ['Save'],
        1: ['Edit'],
        2: ['Delete'],
      },
    }));

    expectHTML(i, [
      `<div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Component
          </p>
          <a class="card-header-icon" href="#">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <!--if-->
        <div class="card-content">
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">Save</a>
          <a class="card-footer-item">Edit</a>
          <a class="card-footer-item">Delete</a>
        </footer>
      </div>`
    ]);
  });

});