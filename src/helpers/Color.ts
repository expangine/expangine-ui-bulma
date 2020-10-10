import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { Colors } from '../Types';


export const ColorMode = Types.enumForText([
  ['Default', ''],
  ['Dark', '-dark'],
  ['Light', '-light'],
]);

export const Color = addComponent({
  collection: COLLECTION,
  name: 'color',
  attributes: {
    text: Colors,
    textMode: ColorMode,
    background: Colors,
    backgroundMode: ColorMode,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['div', {
      class: Exprs.tuple(
        Exprs.if(
          Exprs.get('text')
        ).than(
          Exprs.template('has-text-{color}{mode}', {
            color: Exprs.get('text'),
            mode: Exprs.or(Exprs.get('textMode'), Exprs.const('')),
          })
        ),
        Exprs.if(
          Exprs.get('background')
        ).than(
          Exprs.template('has-background-{color}{mode}', {
            color: Exprs.get('background'),
            mode: Exprs.or(Exprs.get('backgroundMode'), Exprs.const('')),
          })
        ),
      ),
    }, {}, [
      createSlot(),
    ]],
})