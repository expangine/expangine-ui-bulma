import { Types } from 'expangine-runtime';

export const Size = Types.enumForText([
  ['', 'Default'],
  ['is-small', 'Small'],
  ['is-medium', 'Medium'],
  ['is-large', 'Large'],
]);

export const Status = Types.enumForText([
  ['', 'None'],
  ['primary', 'Primary'],
  ['danger', 'Error'],
  ['success', 'Success'],
  ['warning', 'Warning'],
  ['info', 'Info'],
]);

export const Flip = Types.enumForText([
  ['', 'None'],
  ['flip-h', 'Horizontally'],
  ['flip-v', 'Vertically'],
]);

export const Rotate = Types.enumForText([
  ['', 'None'],
  ['rotate-90', 'Rotate Right'],
  ['rotate-180', 'Rotate 180'],
  ['rotate-270', 'Rotate Left'],
]);

export const Side = Types.enumForText([
  ['', 'Default'],
  ['is-left', 'Left'],
  ['is-right', 'Right'],
]);

export const InputKind = Types.enumForText([
  ['text', 'Text'],
  ['password', 'Password'],
  ['email', 'Email'],
  ['tel', 'Telephone'],
]);

export const Autocomplete = Types.enumForText([
  ['new-password', 'None'],
]);

export const UpdateOn = Types.enumForText([
  ['input', 'Input'],
  ['change', 'Change'],
  ['blur', 'Blur'],
  ['keydown', 'Keydown'],
])

