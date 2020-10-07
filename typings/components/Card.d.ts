import { IconType } from '../elements/Icon';
export interface CardAttributes {
    header: string;
    headerIcon: IconType;
    headerIconHref: string;
    image: any;
    footerLinks: boolean;
}
export interface CardComputed {
    headerIconClasses: string;
    footerItemTag: string;
}
export interface CardEvents {
    headerIconClick: void;
    footerItemClick: void;
}
export declare type CardSlots = 'header' | 'default' | 'footerItems' | 'image';
export declare const Card: import("expangine-ui").Component<CardAttributes, CardEvents, CardSlots, never, CardComputed>;
