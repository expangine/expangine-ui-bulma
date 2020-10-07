import { Types } from 'expangine-runtime';

export const Size = Types.enumForText([
  ['', 'Default'],
  ['Small', 'is-small'],
  ['Medium', 'is-medium'],
  ['Large', 'is-large'],
]);

export const Status = Types.enumForText([
  ['None', ''],
  ['Primary', 'primary'],
  ['Error', 'danger'],
  ['Success', 'success'],
  ['Warning', 'warning'],
  ['Info', 'info'],
]);

export const Colors = Types.enumForText([
  ['None', ''],
  ['Primary', 'primary'],
  ['Error', 'danger'],
  ['Success', 'success'],
  ['Warning', 'warning'],
  ['Info', 'info'],

  ['White', 'white'],
  ['Light', 'light'],
  ['Dark', 'dark'],
  ['Black', 'black'],
  ['Text', 'text'],
  ['Link', 'link'],

  ['Orange', 'orange'],
  ['Yellow', 'yellow'],
  ['Green', 'green'],
  ['Turquoise', 'turquoise'],
  ['Cyan', 'cyan'],
  ['Blue', 'blue'],
  ['Purple', 'purple'],
  ['Red', 'red'],
]);

export const Flip = Types.enumForText([
  ['None', ''],
  ['Horizontally', 'flip-h'],
  ['Vertically', 'flip-v'],
]);

export const Rotate = Types.enumForText([
  ['None', ''],
  ['Rotate Right', 'rotate-90'],
  ['Rotate 180', 'rotate-180'],
  ['Rotate Left', 'rotate-270'],
]);

export const Side = Types.enumForText([
  ['Default', ''],
  ['Left', 'is-left'],
  ['Right', 'is-right'],
]);

export const Alignment = Types.enumForText([
  ['Left', ''],
  ['Right', 'is-right'],
  ['Center', 'is-centered'],
]);

export const TextAlignment = Types.enumForText([
  ['Left', ''],
  ['Right', 'has-text-right'],
  ['Center', 'has-text-centered'],
  ['Justify', 'has-text-justified'],
]);

export const TextTransform = Types.enumForText([
  ['None', ''],
  ['Capitalized', 'is-capitalized'],
  ['Lowercase', 'is-lowercase'],
  ['Uppercase', 'is-uppercase'],
  ['Italic', 'is-italic'],
]);

export const TextWeight = Types.enumForText([
  ['Default', ''],
  ['Light', 'has-text-weight-light'],
  ['Normal', 'has-text-weight-normal'],
  ['Medium', 'has-text-weight-medium'],
  ['Semibold', 'has-text-weight-semibold'],
  ['Bold', 'has-text-weight-bold'],
]);

export const FontFamily = Types.enumForText([
  ['Default', ''],
  ['Sans Serif', 'is-family-sans-serif'],
  ['Monospace', 'is-family-monospace'],
  ['Primary', 'is-family-primary'],
  ['Secondary', 'is-family-secondary'],
  ['Code', 'is-family-code'],
]);

export const InputKind = Types.enumForText([
  ['Text', 'text'],
  ['Password', 'password'],
  ['Email', 'email'],
  ['Telephone', 'tel'],
]);

export const Autocomplete = Types.enumForText([
  ['None', 'new-password'],
]);

export const UpdateOn = Types.enumForText([
  ['Input', 'input'],
  ['Change', 'change'],
  ['Blur', 'blur'],
  ['Keydown', 'keydown'],
])

export const BaseEventType = Types.object({
  nativeEvent: Types.any(),
  stop: Types.bool(),
  prevent: Types.bool(),
});