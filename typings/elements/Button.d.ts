import { IconType } from './Icon';
export interface ButtonAttributes {
    text: string;
    type: string;
    color: string;
    light: boolean;
    size: string;
    fullWidth: boolean;
    outlined: boolean;
    inverted: boolean;
    rounded: boolean;
    loading: boolean;
    disabled: boolean;
    selected: boolean;
    leftIcon: IconType;
    rightIcon: IconType;
    title: string;
    href: string;
}
export interface ButtonComputed {
    tagName: string;
    inputType: string;
    classes: string;
    leftIconClasses: string;
    rightIconClasses: string;
}
export interface ButtonEvents {
    click: void;
}
export declare type ButtonSlots = 'default';
export declare const ButtonType: import("expangine-runtime").EnumType;
export declare const Button: import("expangine-ui").Component<ButtonAttributes, ButtonEvents, "default", never, ButtonComputed>;
