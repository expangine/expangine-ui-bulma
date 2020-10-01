import { Exprs, Types } from 'expangine-runtime';
import { addComponent, createSlot } from 'expangine-ui';
import { COLLECTION } from '../constants';

export type ContainerType = '' | 'is-fluid' | 'is-widescreen' | 'is-fullhd';

export interface ContainerAttributes
{
  type: ContainerType;
}

export interface ContainerComputed
{
  containerClass: string;
}

export const Container = addComponent<ContainerAttributes, never, never, never, ContainerComputed>({
  collection: COLLECTION,
  name: 'container',
  attributes: {
    type: {
      type: Types.enumForText([
        ['Default', ''],
        ['Fluid', 'is-fluid'],
        ['Widescreen', 'is-widescreen'],
        ['Full HD', 'is-fullhd'],
      ]),
      default: Exprs.const(''),
    },
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
