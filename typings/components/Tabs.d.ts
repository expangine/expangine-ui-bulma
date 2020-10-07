export interface TabsAttributes {
    value: any;
    tabs: any[];
    align: string;
    size: string;
    type: string;
    fullWidth: boolean;
    getText: string;
    getIcon: string;
    getValue: any;
}
export interface TabsComputed {
    classes: string;
}
export interface TabsEvents {
    update: {
        tab: any;
        tabIndex: number;
        tabValue: any;
    };
}
export declare const TabsType: import("expangine-runtime").EnumType;
export declare const Tabs: import("expangine-ui").Component<TabsAttributes, TabsEvents, never, never, TabsComputed>;
