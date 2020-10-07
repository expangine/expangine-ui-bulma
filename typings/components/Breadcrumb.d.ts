import { IconType } from '../elements/Icon';
export interface BreadcrumbAttributes {
    crumbs: any[];
    getIcon: IconType;
    getText: string;
    getHref: string;
    separator: string;
    align: string;
    size: string;
}
export interface BreadcrumbEvents {
    click: void;
}
export interface BreadcrumbComputed {
    classes: string;
}
export declare type BreadcrumbSlots = 'default';
export declare const BreadcrumbSeparator: import("expangine-runtime").EnumType;
export declare const Breadcrumb: import("expangine-ui").Component<BreadcrumbAttributes, BreadcrumbEvents, "default", never, BreadcrumbComputed>;
