import { Exprs, Types } from 'expangine-runtime';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifElseConst } from '../util';


export interface TitleAttributes
{
  text: string;
  sub: boolean;
  size: number;
}

export const TitleSize = Types.enumForText([
  ['Default', ''],
  ['1', 'is-1'],
  ['2', 'is-2'],
  ['3', 'is-3'],
  ['4', 'is-4'],
  ['5', 'is-5'],
  ['6', 'is-6'],
]);

export const Title = addComponent<TitleAttributes>({
  collection: COLLECTION,
  name: 'title',
  attributes: {
    text: Types.text(),
    sub: Types.bool(),
    size: TitleSize,
  },
  render: (c) =>
    ['p', { 
      class: Exprs.tuple(
        ifElseConst(['sub'], 'subtitle', 'title'),
        Exprs.get('size'),
      )
    }, {}, [
      Exprs.get('text'),
    ]]
});