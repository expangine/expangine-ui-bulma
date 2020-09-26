
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