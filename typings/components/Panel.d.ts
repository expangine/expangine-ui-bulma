export interface PanelAttributes {
    color: string;
    heading: string;
}
export interface PanelComputed {
    classes: string;
}
export declare type PanelSlots = 'heading' | 'default';
export declare const Panel: import("expangine-ui").Component<PanelAttributes, never, PanelSlots, never, PanelComputed>;
