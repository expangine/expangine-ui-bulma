export interface ModalAttributes {
    open: boolean;
    clipped: boolean;
    hideClose: boolean;
    closeSize: string;
    card: boolean;
    title: string;
}
export interface ModalEvents {
    close: void;
}
export interface ModalComputed {
    classes: string;
    closeClasses: string;
}
export declare type ModalSlots = 'default' | 'footer' | 'title';
export declare const Modal: import("expangine-ui").Component<ModalAttributes, ModalEvents, ModalSlots, never, ModalComputed>;
