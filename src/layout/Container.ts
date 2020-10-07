import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';


export interface ContainerAttributes
{
  type: string;
}

export interface ContainerComputed
{
  containerClass: string;
}

export const ContainerType = Types.enumForText([
  ['Default', ''],
  ['Fluid', 'is-fluid'],
  ['Widescreen', 'is-widescreen'],
  ['Full HD', 'is-fullhd'],
]);

export const Container = addComponent<ContainerAttributes, never, never, never, ContainerComputed>({
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
  render: (c) => ['div', {
    class: Exprs.get('containerClass'),
  }, {}, [
    createSlot()
  ]],
});
