import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';
import { ifConst } from '../helpers';
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
  ['is-16x16', '16px'],
  ['is-24x24', '24px'],
  ['is-32x32', '32px'],
  ['is-48x48', '48px'],
  ['is-64x64', '64px'],
  ['is-96x96', '96px'],
  ['is-128x128', '128px'],
]);

export const ImageRatios = Types.enumForText([
  ['is-1by1', 'Square'],
  ['is-5by4', '5 x 4'],
  ['is-4by3', '4 x 3'],
  ['is-3by2', '3 x 2'],
  ['is-5by3', '5 x 3'],
  ['is-16by9', '16 x 9'],
  ['is-2by1', '2 x 1'],
  ['is-3by1', '3 x 1'],
  ['is-4by5', '4 x 5'],
  ['is-3by4', '3 x 4'],
  ['is-2by3', '2 x 3'],
  ['is-3by5', '3 x 5'],
  ['is-9by16', '9 x 16'],
  ['is-1by2', '1 x 2'],
  ['is-1by3', '1 x 3'],
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