import { IconType } from '../elements';
export interface TabAttributes {
    text: string;
    icon: IconType;
    value: any;
    active: any;
}
export interface TabComputed {
    isActive: boolean;
    classes: string;
    iconClasses: string;
}
export interface TabEvents {
    update: {
        tabValue: any;
    };
}
export declare const Tab: import("expangine-ui").Component<TabAttributes, TabEvents, never, never, TabComputed>;
