import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { FileComponent } from '../../src';
import { expectHTML, triggerFileChange } from '../helper';

// tslint:disable no-magic-numbers

describe('form/file', () => 
{

  it('default', () =>
  {
    const c = mount({}, createComponent(FileComponent));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('label', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      label: 'Choose an image...',
    }));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose an image...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('name', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      name: 'imageFile'
    }));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="imageFile">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('showFileNames', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      showFileNames: true
    }));

    expectHTML(c, [
      `<div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
          </span>
        </label>
      </div>`
    ]);
  });

  it('showFileNames file event', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      showFileNames: true
    }));
    const e = (c.node.elements[0] as HTMLElement).querySelector('input');

    expectHTML(c, [
      `<div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
          </span>
        </label>
      </div>`
    ]);

    triggerFileChange(e, [
      new File([], 'image.png', { type: 'image/png' }),
      new File([], 'readme.md', { type: 'text/md' }),
    ]);

    expectHTML(c, [
      `<div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
            image.png
          </span>
        </label>
      </div>`
    ]);
  });

  it('showFileNames multiple file event', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      showFileNames: true,
      multiple: true,
    }));
    const e = (c.node.elements[0] as HTMLElement).querySelector('input');

    expectHTML(c, [
      `<div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file" multiple="">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
          </span>
        </label>
      </div>`
    ]);

    triggerFileChange(e, [
      new File([], 'image.png', { type: 'image/png' }),
      new File([], 'readme.md', { type: 'text/md' }),
    ]);

    expectHTML(c, [
      `<div class="file has-name">
        <label class="file-label">
          <input class="file-input" type="file" multiple="">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
            image.png, readme.md
          </span>
        </label>
      </div>`
    ]);
  });

  it('status', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      color: 'success'
    }));

    expectHTML(c, [
      `<div class="file is-success">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('size', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      size: 'is-small'
    }));

    expectHTML(c, [
      `<div class="file is-small">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('icon', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      icon: {
        style: 'fas',
        name: 'fa-upload',
      },
    }));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('alignment', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      alignment: 'is-right',
    }));

    expectHTML(c, [
      `<div class="file is-right">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('accept', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      accept: 'image/*',
    }));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file" accept="image/*">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('boxed', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      boxed: true,
    }));

    expectHTML(c, [
      `<div class="file is-boxed">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('fullWidth', () =>
  {
    const c = mount({}, createComponent(FileComponent, {
      fullWidth: true,
    }));

    expectHTML(c, [
      `<div class="file is-fullwidth">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('default slot', () =>
  {
    const c = mount({}, createComponent(FileComponent, {}, {}, {
      default: [
        'Greetings!'
      ]
    }));

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Greetings!
            </span>
          </span>
          <!--if-->
        </label>
      </div>`
    ]);
  });

  it('name slot', () =>
  {
    const d = {
      fileCount: 0,
    };
    const c = mount(d, createComponent(FileComponent, {
      multiple: true,
    }, {
      update: Exprs.get('fileCount').set(Exprs.get('files', 'length')),
    }, {
      name: [
        Exprs.template('({count}) files', {
          count: Exprs.get('fileCount'),
        }),
      ],
    }));
    const e = (c.node.elements[0] as HTMLElement).querySelector('input');

    expect(c.scope.get('fileCount')).toBe(0);

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file" multiple="">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
            (0) files
          </span>
        </label>
      </div>`
    ]);

    triggerFileChange(e, [
      new File([], 'image.png', { type: 'image/png' }),
      new File([], 'readme.md', { type: 'text/md' }),
    ]);

    expect(c.scope.get('fileCount')).toBe(2);

    expectHTML(c, [
      `<div class="file">
        <label class="file-label">
          <input class="file-input" type="file" multiple="">
          <span class="file-cta">
            <!--if-->
            <span class="file-label">
              Choose a file...
            </span>
          </span>
          <span class="file-name">
            (2) files
          </span>
        </label>
      </div>`
    ]);
  });

});