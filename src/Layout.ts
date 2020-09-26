
import { addComponent, createFor, createSlot } from 'expangine-ui';
import { Types, Exprs } from 'expangine-runtime';
import { COLLECTION } from './constants';


export type ContainerType = '' | 'is-fluid' | 'is-widescreen' | 'is-fullhd';

export const Container = addComponent<{ type: ContainerType }, never, never, never, { containerClass: string }>({
  collection: COLLECTION,
  name: 'container',
  attributes: {
    type: {
      type: Types.enumForText([
        ['Default', ''],
        ['Fluid', 'is-fluid'],
        ['Widescreen', 'is-widescreen'],
        ['Full HD', 'is-fullhd'],
      ]),
      default: Exprs.const(''),
    },
  },
  computed: {
    containerClass: Exprs.tuple('container', Exprs.get('type')),
  },
  render: (c) => ['div', {
    class: Exprs.get('containerClass'),
  }, {}, [
    createSlot({})
  ]],
});

export const Level = addComponent<{ centered: boolean, mobile: boolean }, never, 'left' | 'right' | 'default', never, { itemClass: any, levelClass: any }>({
  collection: COLLECTION,
  name: 'level',
  attributes: {
    centered: {
      type: Types.bool(),
      default: Exprs.false(),
    },
    mobile: {
      type: Types.bool(),
      default: Exprs.false(),
    },
  },
  computed: {
    itemClass: Exprs.object({ 
      'level-item': true,
      'has-text-centered': Exprs.get('centered'),
    }),
    levelClass: Exprs.object({ 
      'level': true,
      'is-mobile': Exprs.get('mobile'),
    }),
  },
  slots: {
    left: {
      scope: Types.object(),
      array: true,
    },
    right: {
      scope: Types.object(),
      array: true,
    },
    default: {
      scope: Types.object(),
      array: true,
    },
  },
  render: (c) => 
    ['div', { class: Exprs.get('levelClass') }, {}, [
      c.whenSlot('left', '', () =>
        ['div', { class: 'level-left' }, {}, [
          createFor(c.getSlotArrayLength('left'), [
            ['div', { class: Exprs.get('itemClass') }, {}, [
              createSlot({ name: 'left', slotIndex: Exprs.get('index') })
            ]]
          ]),
        ]]
      ),
      c.whenSlot('default', '', () =>
        createFor(c.getSlotArrayLength('default'), [
          ['div', { class: Exprs.get('itemClass') }, {}, [
            createSlot({ name: 'default', slotIndex: Exprs.get('index') })
          ]]
        ]),
      ),
      c.whenSlot('right', '', () =>
        ['div', { class: 'level-right' }, {}, [
          createFor(c.getSlotArrayLength('right'), [
            ['div', { class: Exprs.get('itemClass') }, {}, [
              createSlot({ name: 'right', slotIndex: Exprs.get('index') })
            ]]
          ]),
        ]]
      ),
    ]],
});

export const Media = addComponent<never, never, 'left' | 'right' | 'default'>({
  collection: COLLECTION,
  name: 'media',
  slots: {
    left: Types.object(),
    right: Types.object(),
    default: Types.object(),
  },
  render: (c) => 
    ['article', { class: 'media' }, {}, [
      c.whenSlot('left', '', () =>
        ['figure', { class: 'media-left' }, {}, [
          createSlot({ name: 'left' })
        ]]
      ),
      ['div', { class: 'media-content' }, {}, [
        createSlot({})
      ]],
      c.whenSlot('right', '', () =>
        ['div', { class: 'media-right' }, {}, [
          createSlot({ name: 'right' })
        ]]
      ),
    ]],
});

export type HeroType = 'is-primary' | 'is-info' | 'is-success' | 'is-link' | 'is-warning' | 'is-danger' | 'is-light' | 'is-dark';

export type HeroSize = '' | 'is-medium' | 'is-large' | 'is-fullheight' | 'is-fullheight-with-navbar';

export const Hero = addComponent<{ type: HeroType, size: HeroSize, gradient: boolean }, never, 'default' | 'footer' | 'header', never, { heroClass: string }>({
  collection: COLLECTION,
  name: 'hero',
  attributes: {
    type: Types.optional(Types.enumForText([
      ['is-primary', 'Primary'],
      ['is-info', 'Info'],
      ['is-success', 'Success'],
      ['is-link', 'Link'],
      ['is-warning', 'Warning'],
      ['is-danger', 'Danger'],
      ['is-light', 'Light'],
      ['is-dark', 'Dark'],
    ])),
    size: Types.optional(Types.enumForText([
      ['', 'Default'],
      ['is-medium', 'Medium'],
      ['is-large', 'Large'],
      ['is-fullheight', 'Fullheight'],
      ['is-fullheight-with-navbar', 'Fullheight with Navbar'],
    ])),
    gradient: {
      type: Types.bool(),
      default: Exprs.false(),
    },
  },
  computed: {
    heroClass: Exprs.tuple(
      'hero', 
      Exprs.get('type'), 
      Exprs.get('size'), 
      Exprs.if(Exprs.get('gradient')).than(Exprs.const('is-bold'))
    ),
  },
  slots: {
    header: Types.object(),
    footer: Types.object(),
    default: Types.object(),
  },
  render: (c) => 
    ['section', { class: Exprs.get('heroClass') }, {}, [
      c.whenSlot('header', '', () =>
        ['div', { class: 'hero-head' }, {}, [
          createSlot({ name: 'header' }),
        ]],
      ),
      ['div', { class: 'hero-body' }, {}, [
        createSlot({}),
      ]],
      c.whenSlot('footer', '', () =>
        ['div', { class: 'hero-foot' }, {}, [
          createSlot({ name: 'footer' }),
        ]],
      ),
    ]],
})

// Tiles