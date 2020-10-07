export interface HeroAttributes {
    color: string;
    size: string;
    gradient: boolean;
}
export interface HeroComputed {
    heroClass: string;
}
export declare type HeroSlots = 'default' | 'footer' | 'header';
export declare const HeroSize: import("expangine-runtime").Type<any>;
export declare const Hero: import("expangine-ui").Component<HeroAttributes, never, HeroSlots, never, HeroComputed>;
