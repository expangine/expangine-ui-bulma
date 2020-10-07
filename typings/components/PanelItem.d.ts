import { IconType } from '../elements';
export interface PanelItemAttributes {
    active: boolean;
    text: string;
    icon: IconType;
}
export interface PanelItemEvents {
    click: void;
}
export interface PanelItemComputed {
    classes: string;
    iconClasses: string;
}
export declare type PanelItemSlots = 'default';
export declare const PanelItem: import("expangine-ui").Component<PanelItemAttributes, PanelItemEvents, "default", never, PanelItemComputed>;
