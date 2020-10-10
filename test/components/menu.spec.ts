import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Menu, registerComponents } from '../../src';
import { expectHTML } from '../helper';


describe('components/menu', () => 
{
  registerComponents();

  it('default', () =>
  {
    const d = {
      current: 'Manage Your Team',
      menu: [
        { label: 'General', items: [
          { label: 'Dashboard' },
          { label: 'Customers' },
        ]},
        { label: 'Administration', items: [
          { label: 'Team Settings' },
          { label: 'Manage Your Team', items: [
            { label: 'Members' },
            { label: 'Plugins' },
            { label: 'Add a member' },
          ]},
          { label: 'Invitations' },
          { label: 'Cloud Storage Environment Settings' },
          { label: 'Authentication' },
        ]},
        { label: 'Transactions', items: [
          { label: 'Payments' },
          { label: 'Transfers' },
          { label: 'Balance' },
        ]},
      ],
    };
    const c = mount(d, createComponent(Menu, {
      menu: Exprs.get('menu'),
      value: Exprs.get('current'),
    }));

    expectHTML(c, [
      `<aside class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a class="is-active">Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a>Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p class="menu-label">
          Transactions
        </p>
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside>`
    ]);

    c.scope.set('current', 'Add a member');

    expectHTML(c, [
      `<aside class="menu">
        <p class="menu-label">
          General
        </p>
        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
        <p class="menu-label">
          Administration
        </p>
        <ul class="menu-list">
          <li><a>Team Settings</a></li>
          <li>
            <a>Manage Your Team</a>
            <ul>
              <li><a>Members</a></li>
              <li><a>Plugins</a></li>
              <li><a class="is-active">Add a member</a></li>
            </ul>
          </li>
          <li><a>Invitations</a></li>
          <li><a>Cloud Storage Environment Settings</a></li>
          <li><a>Authentication</a></li>
        </ul>
        <p class="menu-label">
          Transactions
        </p>
        <ul class="menu-list">
          <li><a>Payments</a></li>
          <li><a>Transfers</a></li>
          <li><a>Balance</a></li>
        </ul>
      </aside>`
    ]);
  });

});