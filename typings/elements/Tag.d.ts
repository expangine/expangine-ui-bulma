export interface TagAttributes {
    text: string;
    color: string;
    size: string;
    rounded: boolean;
    light: boolean;
    deleteTag: boolean;
    deletable: boolean;
    deleteSize: string;
}
export interface TagEvents {
    deleted: void;
    click: void;
}
export interface TagComputed {
    classes: string;
}
export declare type TagSlots = 'default';
export declare const Tag: import("expangine-ui").Component<TagAttributes, TagEvents, "default", never, TagComputed>;
