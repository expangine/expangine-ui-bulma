import { addComponent } from '../ComponentRegistry';
import { COLLECTION } from '../constants';


export const NavbarDivider = addComponent({
  collection: COLLECTION,
  name: 'navbar-divider',
  targets: [
    `${COLLECTION}/navbar-menu`,
  ],
  render: (c) =>
    ['hr', {
      class: 'navbar-divider',
    }],
})