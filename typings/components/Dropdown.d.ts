import { IconType } from '../elements';
export interface DropdownAttributes {
    text: string;
    icon: IconType;
    open: boolean;
    triggerMode: string;
    dropUp: boolean;
    rightAligned: boolean;
    items: any[];
}
export interface DropdownComputed {
    classes: string;
    iconClasses: string;
}
export interface DropdownEvents {
    open: void;
    close: void;
    itemClick: void;
}
export declare type DropdownSlots = 'trigger' | 'default';
export declare const DropdownTriggerEvents: import("expangine-runtime").EnumType;
export declare const DropdownItem: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const Dropdown: import("expangine-ui").Component<DropdownAttributes, DropdownEvents, DropdownSlots, never, DropdownComputed>;
