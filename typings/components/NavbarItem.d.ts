export interface NavbarItemAttributes {
    tab: boolean;
    active: boolean;
}
export interface NavbarItemClick {
    click: void;
}
export declare type NavbarItemSlots = 'default';
export declare const NavbarItem: import("expangine-ui").Component<NavbarItemAttributes, NavbarItemClick, "default", never, never>;
