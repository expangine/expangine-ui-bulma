import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { Alignment } from '../Types';


export interface ButtonsAttributes
{
  attached: boolean;
  alignment: boolean;
}

export interface ButtonsComputed
{
  classes: string;
}

export const Buttons = addComponent<ButtonsAttributes, never, never, never, ButtonsComputed>({
  collection: COLLECTION,
  name: 'buttons',
  attributes: {
    attached: Types.bool(),
    alignment: Alignment,
  },
  computed: {
    classes: Exprs.tuple(
      'buttons',
      Exprs.get('alignment'),
      ifConst(['attached'], 'has-addons'),
    ),
  },
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) =>
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      createSlot()
    ]],
})