import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { TextAlignment, TextTransform, FontFamily } from '../Types';
import { ifTemplate } from '../util';


const SIZE_MIN = 1;
const SIZE_MAX = 7;

export const TypographySize = Types.number(SIZE_MIN, SIZE_MAX, true);


export const Typography = addComponent({
  collection: COLLECTION,
  name: 'typography',
  attributes: {
    size: TypographySize,
    sizeMobile: TypographySize,
    sizeTablet: TypographySize,
    sizeDesktop: TypographySize,
    sizeWidescreen: TypographySize,
    sizeFullhd: TypographySize,
    align: TextAlignment,
    transform: TextTransform,
    family: FontFamily,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['div', {
      class: Exprs.tuple(
        Exprs.get('align'),
        Exprs.get('transform'),
        Exprs.get('family'),
        ifTemplate(['size'], 'is-size-{value}'),
        ifTemplate(['sizeMobile'], 'is-size-{value}-mobile'),
        ifTemplate(['sizeTablet'], 'is-size-{value}-tablet'),
        ifTemplate(['sizeDesktop'], 'is-size-{value}-desktop'),
        ifTemplate(['sizeWidescreen'], 'is-size-{value}-widescreen'),
        ifTemplate(['sizeFullhd'], 'is-size-{value}-fullhd'),
      ),
    }, {}, [
      createSlot(),
    ]],
})