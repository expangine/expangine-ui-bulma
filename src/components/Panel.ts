import { Exprs, Types } from 'expangine-runtime';
import { createFor, createIf, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Colors } from '../Types';


export interface PanelAttributes
{
  color: string;
  heading: string;
}

export interface PanelComputed
{
  classes: string;
}

export type PanelSlots = 'heading' | 'default';


export const Panel = addComponent<PanelAttributes, never, PanelSlots, never, PanelComputed>({
  collection: COLLECTION,
  name: 'panel',
  attributes: {
    color: Colors,
    heading: Types.text(),
  },
  computed: {
    classes: Exprs.tuple(
      'panel',
      Exprs.get('color'),
    ),
  },
  slots: {
    heading: Types.object(({
      heading: Types.text(),
    })),
    default: {
      scope: Types.object(),
      required: true,
      array: true,
      accepts: [
        `${COLLECTION}/panel-block`,
        `${COLLECTION}/panel-item`,
        `${COLLECTION}/panel-tabs`,
      ],
    },
  },
  render: (c) => 
    ['nav', {
      class: Exprs.get('classes'),
    }, {}, [
      c.whenSlot('heading', 
        () => createIf(Exprs.get('heading'), [
          ['p', { class: 'panel-heading' }, {}, [
            Exprs.get('heading'),
          ]],
        ]), 
        () => ['p', { class: 'panel-heading' }, {}, [
          createSlot({ name: 'heading', scope: {
            heading: Exprs.get('heading'),
          }}),
        ]]
      ),
      createFor(c.getSlotArrayLength(), [
        createSlot({ slotIndex: Exprs.get('index') }),
      ]),
    ]],
});