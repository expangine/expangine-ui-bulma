import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';
import { ifTemplate } from '../util';

const SPACING_MIN = 0;
const SPACING_MAX = 6;

export const SpacingAmount = Types.number(SPACING_MIN, SPACING_MAX, true);

export const Spacing = addComponent({
  collection: COLLECTION,
  name: 'spacing',
  attributes: {
    padding: SpacingAmount,
    paddingTop: SpacingAmount,
    paddingBottom: SpacingAmount,
    paddingLeft: SpacingAmount,
    paddingRight: SpacingAmount,
    margin: SpacingAmount,
    marginTop: SpacingAmount,
    marginBottom: SpacingAmount,
    marginLeft: SpacingAmount,
    marginRight: SpacingAmount,
  },
  slots: {
    default: Types.object(),
  },
  render: (c) => 
    ['div', {
      class: Exprs.tuple(
        ifTemplate(['padding'], 'p-{value}'),
        ifTemplate(['paddingTop'], 'pt-{value}'),
        ifTemplate(['paddingBottom'], 'pb-{value}'),
        ifTemplate(['paddingLeft'], 'pl-{value}'),
        ifTemplate(['paddingRight'], 'pr-{value}'),
        ifTemplate(['margin'], 'm-{value}'),
        ifTemplate(['marginTop'], 'mt-{value}'),
        ifTemplate(['marginBottom'], 'mb-{value}'),
        ifTemplate(['marginLeft'], 'ml-{value}'),
        ifTemplate(['marginRight'], 'mr-{value}'),
      ),
    }, {}, [
      createSlot(),
    ]],
})