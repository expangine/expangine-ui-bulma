export interface SelectAttributes {
    value: string;
    options: any[];
    getValue: any;
    getText: any;
    emptyText: string;
    multiple: boolean;
    multipleSize: number;
    status: string;
    size: string;
    placeholder: string;
    rounded: boolean;
    disabled: boolean;
    readonly: boolean;
    loading: boolean;
}
export interface SelectEvents {
    update: SelectUpdateEvent;
}
export declare type SelectSlots = 'text';
export interface SelectComputed {
    classes: string;
    optionsMap: Map<any, string>;
}
export interface SelectUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: string;
    option: any;
}
export declare const Select: import("expangine-ui").Component<SelectAttributes, SelectEvents, "text", never, SelectComputed>;
