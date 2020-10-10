import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifConst } from '../util';
import { BaseEventType } from '../Types';


export interface ImageAttributes
{
  squareSize: string;
  rounded: boolean;
  ratio: string;
  src: string;
  alt: string;
}

export interface ImageEvents
{
  click: void;
}

export interface ImageComputed
{
  classes: string;
  imageClasses: string;
}

export const ImageSquareSizes = Types.enumForText([
  ['16px', 'is-16x16'],
  ['24px', 'is-24x24'],
  ['32px', 'is-32x32'],
  ['48px', 'is-48x48'],
  ['64px', 'is-64x64'],
  ['96px', 'is-96x96'],
  ['128px', 'is-128x128'],
]);

export const ImageRatios = Types.enumForText([
  ['Square', 'is-1by1'],
  ['5 x 4', 'is-5by4'],
  ['4 x 3', 'is-4by3'],
  ['3 x 2', 'is-3by2'],
  ['5 x 3', 'is-5by3'],
  ['16 x 9', 'is-16by9'],
  ['2 x 1', 'is-2by1'],
  ['3 x 1', 'is-3by1'],
  ['4 x 5', 'is-4by5'],
  ['3 x 4', 'is-3by4'],
  ['2 x 3', 'is-2by3'],
  ['3 x 5', 'is-3by5'],
  ['9 x 16', 'is-9by16'],
  ['1 x 2', 'is-1by2'],
  ['1 x 3', 'is-1by3'],
]);

export const Image = addComponent<ImageAttributes, ImageEvents, never, never, ImageComputed>({
  collection: COLLECTION,
  name: 'delete',
  attributes: {
    src: Types.text(),
    alt: Types.text(),
    rounded: Types.bool(),
    squareSize: ImageSquareSizes,
    ratio: ImageRatios,
  },
  computed: {
    classes: Exprs.tuple(
      'image',
      Exprs.get('squareSize'),
      Exprs.get('ratio'),
    ),
    imageClasses: Exprs.tuple(
      ifConst(['rounded'], 'is-rounded'),
    ),
  },
  events: {
    click: BaseEventType,
  },
  render: (c) =>
    ['div', { 
      class: Exprs.get('classes'),
    }, {
      click: (e: any) => c.trigger('click', e),
    }, [
      c.whenSlot('default', 
        () => ['img', {
          class: Exprs.get('imageClasses'),
          src: Exprs.get('src'),
          alt: Exprs.get('alt'),
        }],  
        () => createSlot()
      ),
    ]],
})