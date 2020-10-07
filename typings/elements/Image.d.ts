export interface ImageAttributes {
    squareSize: string;
    rounded: boolean;
    ratio: string;
    src: string;
    alt: string;
}
export interface ImageEvents {
    click: void;
}
export interface ImageComputed {
    classes: string;
    imageClasses: string;
}
export declare const ImageSquareSizes: import("expangine-runtime").EnumType;
export declare const ImageRatios: import("expangine-runtime").EnumType;
export declare const Image: import("expangine-ui").Component<ImageAttributes, ImageEvents, never, never, ImageComputed>;
