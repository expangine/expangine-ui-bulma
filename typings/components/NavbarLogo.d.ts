import { LinkOptions } from "../helpers/Link";
export interface NavbarLogoAttributes {
    options: LinkOptions;
    src: string;
    height: number;
    alt: string;
}
export interface NavbarLogoEvents {
    click: void;
}
export declare const NavbarLogo: import("expangine-ui").Component<NavbarLogoAttributes, NavbarLogoEvents, never, never, never>;
