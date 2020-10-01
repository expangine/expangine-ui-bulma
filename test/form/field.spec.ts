import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Control, Field } from '../../src';
import { expectHTML } from '../helper';


describe('form/field', () => 
{

  it('empty', () =>
  {
    const i = mount({}, createComponent(Field))

    expectHTML(i, [
      `<div class="field">
        <!--if-->
        <!--if-->
      </div>`
    ]);
  });

  it('empty control', () =>
  {
    const i = mount({}, createComponent(Field, {}, {}, {
      default: [
        createComponent(Control)
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <!--if-->
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <!--if-->
      </div>`
    ]);
  });

  it('empty controls has-addons', () =>
  {
    const i = mount({}, createComponent(Field, {}, {}, {
      default: [
        createComponent(Control),
        createComponent(Control),
      ],
    }));

    expectHTML(i, [
      `<div class="field has-addons">
        <!--if-->
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <!--if-->
      </div>`
    ]);
  });

  it('with label text', () =>
  {
    const i = mount({}, createComponent(Field, { label: 'Name' }, {}, {
      default: [
        createComponent(Control)
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <label class="label">
          Name
        </label>
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <!--if-->
      </div>`
    ]);
  });

  it('with label slot', () =>
  {
    const i = mount({}, createComponent(Field, { label: 'Name' }, {}, {
      label: [
        Exprs.template('Hello {label}', {
          label: Exprs.get('label'),
        }),
      ],
      default: [
        createComponent(Control)
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <label class="label">
          Hello Name
        </label>
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <!--if-->
      </div>`
    ]);
  });

  it('with message text', () =>
  {
    const i = mount({}, createComponent(Field, { message: 'Details' }, {}, {
      default: [
        createComponent(Control)
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <!--if-->
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <p class="help">
          Details
        </p>
      </div>`
    ]);
  });

  it('with message slot', () =>
  {
    const i = mount({}, createComponent(Field, { message: 'Details' }, {}, {
      default: [
        createComponent(Control)
      ],
      message: [
        Exprs.template('{message}!', {
          message: Exprs.get('message'),
        }),
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <!--if-->
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <p class="help">
          Details!
        </p>
      </div>`
    ]);
  });

  it('status', () =>
  {
    const i = mount({}, createComponent(Field, { message: 'Details', label: 'Name', status: 'success' }, {}, {
      default: [
        createComponent(Control, {
          fieldState: Exprs.get('fieldState'),
        }),
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <label class="label">
          Name
        </label>
        <div class="control">
          <!--if-->
          <!--if-->
        </div>
        <p class="help is-success">
          Details
        </p>
      </div>`
    ]);
  });

  it('status with icon', () =>
  {
    const i = mount({}, createComponent(Field, { message: 'Details', label: 'Name', status: 'success' }, {}, {
      default: [
        createComponent(Control, {
          fieldState: Exprs.get('fieldState'),
          leftIcon: {
            style: 'fas',
            name: 'fa-home',
          },
        }),
      ],
    }));

    expectHTML(i, [
      `<div class="field">
        <label class="label">
          Name
        </label>
        <div class="control has-icons-left">
          <span class="icon is-left has-text-success">
            <i class="fas fa-home"></i>
          </span>
          <!--if-->
        </div>
        <p class="help is-success">
          Details
        </p>
      </div>`
    ]);
  });

});