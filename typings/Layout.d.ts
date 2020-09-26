export declare type ContainerType = '' | 'is-fluid' | 'is-widescreen' | 'is-fullhd';
export declare const Container: import("expangine-ui").Component<{
    type: ContainerType;
}, never, never, never, {
    containerClass: string;
}>;
export declare const Level: import("expangine-ui").Component<{
    centered: boolean;
    mobile: boolean;
}, never, "default" | "left" | "right", never, {
    itemClass: any;
    levelClass: any;
}>;
export declare const Media: import("expangine-ui").Component<never, never, "default" | "left" | "right", never, never>;
export declare type HeroType = 'is-primary' | 'is-info' | 'is-success' | 'is-link' | 'is-warning' | 'is-danger' | 'is-light' | 'is-dark';
export declare type HeroSize = '' | 'is-medium' | 'is-large' | 'is-fullheight' | 'is-fullheight-with-navbar';
export declare const Hero: import("expangine-ui").Component<{
    type: HeroType;
    size: HeroSize;
    gradient: boolean;
}, never, "default" | "footer" | "header", never, {
    heroClass: string;
}>;
