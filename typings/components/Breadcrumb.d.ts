import { IconType } from '../elements/Icon';
import { LinkOptions } from "../helpers/Link";
export interface BreadcrumbAttributes {
    crumbs: any[];
    getIcon: IconType;
    getText: string;
    getOptions: LinkOptions;
    separator: string;
    align: string;
    size: string;
}
export interface BreadcrumbEvents {
    click: void;
}
export interface BreadcrumbComputed {
    classes: string;
    crumbsMapped: any[];
}
export declare type BreadcrumbSlots = 'default';
export declare const BreadcrumbSeparator: import("expangine-runtime").EnumType;
export declare const Breadcrumb: import("expangine-ui").Component<BreadcrumbAttributes, BreadcrumbEvents, "default", never, BreadcrumbComputed>;
