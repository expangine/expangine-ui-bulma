import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
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
  render: (c) =>
    ['div', {
      class: Exprs.get('classes'),
    }, {}, [
      createSlot()
    ]],
})