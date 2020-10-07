import { FieldStateType } from './Field';
import { IconType } from '../elements/Icon';
export interface ControlAttributes {
    status: string;
    loading: boolean;
    leftIcon: IconType;
    rightIcon: IconType;
    fieldState: FieldStateType;
}
export declare type ControlSlots = 'default';
export interface ControlComputed {
    controlClass: string;
    leftIconClasses: string;
    rightIconClasses: string;
}
export declare const Control: import("expangine-ui").Component<ControlAttributes, never, "default", never, ControlComputed>;
