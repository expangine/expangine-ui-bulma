export interface SelectAttributes {
    value: string;
    options: any[];
    getValue: any;
    getText: any;
    getDisabled: any;
    getGroup: any;
    getSortBy: number;
    getSortByGroup: number;
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
    optionsMapped: any[];
    optionsSorted: any[];
    optionsGrouped: any[];
    optionsGroupedSorted: any[];
}
export interface SelectUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: any;
    values: any[];
    option: any;
    options: any[];
}
export declare const Select: import("expangine-ui").Component<SelectAttributes, SelectEvents, "text", never, SelectComputed>;
