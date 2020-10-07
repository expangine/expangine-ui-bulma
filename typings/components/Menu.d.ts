export interface MenuAttributes {
    menu: any[];
    value: any;
    getLabel: string;
    getItems: any[];
    getItemText: string;
    getItemValue: string;
    getSubItems: any[];
    getSubItemText: string;
    getSubItemValue: string;
}
export interface MenuEvents {
    update: {
        item: any;
        itemValue: any;
    };
}
export declare type MenuSlots = 'menuLabel' | 'menuItem' | 'menuSubItem';
export declare const Menu: import("expangine-ui").Component<MenuAttributes, MenuEvents, MenuSlots, never, never>;
