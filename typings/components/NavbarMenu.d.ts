export interface NavbarMenuAttributes {
    text: string;
    href: string;
    active: boolean;
    arrowless: boolean;
    hoverable: boolean;
    right: boolean;
    dropUp: boolean;
    boxed: boolean;
}
export interface NavbarMenuEvents {
    click: void;
}
export interface NavbarMenuComputed {
    classes: string;
    linkClasses: string;
    dropdownClasses: string;
}
export interface NavbarMenuState {
    open: boolean;
}
export declare type NavbarMenuSlots = 'default' | 'items';
export declare const NavbarMenu: import("expangine-ui").Component<NavbarMenuAttributes, NavbarMenuEvents, NavbarMenuSlots, NavbarMenuState, NavbarMenuComputed>;
