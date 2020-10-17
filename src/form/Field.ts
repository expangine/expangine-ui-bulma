import { Types, Exprs } from 'expangine-runtime';
import { createIf, createIfElse, createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Status, Size, LabelAlignment } from '../Types';
import { ifConst, ifTemplate } from '../util';


export interface FieldStateType 
{
  status?: string;
  size?: string;
}

export const FieldState = Types.object({
  status: Status,
  size: Size,
});

export interface FieldAttributes
{
  label: string;
  status: string;
  size: string;
  message: string;
  grouped: boolean;
  groupedAlign: string;
  groupedWrap: boolean;
  horizontal: boolean;
  horizontalLabelAlignment: string;
}

export type FieldSlots = 'label' | 'default' | 'message';

export interface FieldComputed
{ 
  fieldClass: string;
  fieldState: any;
  messageClass: string;
}

export const FieldGroupType = Types.enumForText([
  ['Left', ''],
  ['Center', 'is-grouped-centered'],
  ['Right', 'is-grouped-right'],
]);

export const Field = addComponent<FieldAttributes, never, FieldSlots, never, FieldComputed>({
  collection: COLLECTION,
  name: 'field',
  attributes: {
    label: Types.text(),
    message: Types.text(),
    grouped: Types.bool(),
    groupedAlign: FieldGroupType,
    groupedWrap: Types.bool(),
    horizontal: Types.bool(),
    status: Status,
    size: Size,
    horizontalLabelAlignment: LabelAlignment,
  },
  computed: {
    fieldClass: (c) => Exprs.tuple(
      'field',
      Exprs.if(
        Exprs.get('grouped'),
      ).than(
        Exprs.tuple(
          'is-grouped',
          Exprs.get('groupedAlign'),
          ifConst(['groupedWrap'], 'is-grouped-multiline'),
        ),
      ),
      ifConst(['horizontal'], 'is-horizontal'),
      c.getSlotSize('default') > 1 ? 'has-addons' : '',
    ),
    fieldState: Exprs.object({
      status: Exprs.get('status'),
      size: Exprs.get('size'),
    }),
    messageClass: Exprs.tuple(
      'help',
      ifTemplate(['status'], 'is-{value}'),
    ),
  },
  slots: {
    label: Types.object({ label: Types.text() }),
    default: {
      scope: Types.object({
        fieldState: FieldState,
      }),
      required: true,
      accepts: [
        `${COLLECTION}/control`,
        `${COLLECTION}/field`,
      ],
    },
    message: Types.object({ message: Types.text() }),
  },
  render: (c) => {
    const RenderLabel = c.whenSlot('label', 
      () => createIf(Exprs.get('label'), [
        ['label', { class: 'label' }, {}, [
          Exprs.get('label')
        ]],
      ]),
      () => ['label', { class: 'label' }, {}, [
        createSlot({ name: 'label', scope: { label: Exprs.get('label') } }),
      ]],
    );
    const RenderMessage = c.whenSlot('message', 
      () => createIf(Exprs.get('message'), [
        ['p', { class: Exprs.get('messageClass') }, {}, [
          Exprs.get('message'),
        ]]   
      ]),
      () => ['p', { class: Exprs.get('messageClass') }, {}, [
        createSlot({ name: 'message', scope: { message: Exprs.get('message') } }),
      ]]
    );
    const RenderControls = createSlot({ 
      scope: { fieldState: Exprs.get('fieldState') }
    });

    return ['div', { 
      class: Exprs.get('fieldClass'),
    }, {}, [
      createIfElse(Exprs.get('horizontal'), [
        ['div', { 
          class: Exprs.tuple(
            'field-label',
            Exprs.get('horizontalLabelAlignment'),
          ),
        }, {}, [
          RenderLabel,
        ]],
        ['div', { class: 'field-body' }, {}, [
          RenderControls,
        ]],
      ], [
        RenderLabel,
        RenderControls,
        RenderMessage,
      ]),
    ]];
  }
});