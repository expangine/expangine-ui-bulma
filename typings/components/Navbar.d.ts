export interface NavbarAttributes {
    color: string;
    fixed: string;
    transparent: boolean;
    extraSpace: boolean;
    main: boolean;
}
export interface NavbarComputed {
    classes: string;
    burgerClasses: string;
    menuClasses: string;
}
export interface NavbarState {
    active: boolean;
}
export declare type NavbarSlots = 'left' | 'right' | 'brand';
export declare const NavbarSlotOnly: string[];
export declare const NavbarFixed: import("expangine-runtime").EnumType;
export declare const Navbar: import("expangine-ui").Component<NavbarAttributes, never, NavbarSlots, NavbarState, NavbarComputed>;
