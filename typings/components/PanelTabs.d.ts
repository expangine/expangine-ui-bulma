export interface PanelTabsAttributes {
    active: string;
    tabs: string[];
}
export interface PanelTabsEvents {
    change: void;
}
export declare const PanelTabs: import("expangine-ui").Component<PanelTabsAttributes, PanelTabsEvents, never, never, never>;
