import { Exprs, Types } from 'expangine-runtime';
import { createSlot } from 'expangine-ui';
import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export interface ContainerAttributes
{
  type: string;
}

export interface ContainerComputed
{
  containerClass: string;
}

export type ContainerSlots = 'default';

export const ContainerType = Types.enumForText([
  ['Default', ''],
  ['Fluid', 'is-fluid'],
  ['Widescreen', 'is-widescreen'],
  ['Full HD', 'is-fullhd'],
]);

export const Container = addComponent<ContainerAttributes, never, ContainerSlots, never, ContainerComputed>({
  collection: COLLECTION,
  name: 'container',
  attributes: {
    type: ContainerType,
  },
  computed: {
    containerClass: Exprs.tuple(
      'container', 
      Exprs.get('type')
    ),
  },
  slots: {
    default: {
      scope: Types.object(),
      required: true,
    },
  },
  render: (c) => ['div', {
    class: Exprs.get('containerClass'),
  }, {}, [
    createSlot()
  ]],
});
