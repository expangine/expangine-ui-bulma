export interface NavbarLinkAttributes {
    text: string;
    options: any;
    tab: boolean;
    active: boolean;
}
export interface NavbarLinkEvents {
    click: void;
}
export declare type NavbarLinkSlots = 'default';
export declare const NavbarLink: import("expangine-ui").Component<NavbarLinkAttributes, NavbarLinkEvents, "default", never, never>;
