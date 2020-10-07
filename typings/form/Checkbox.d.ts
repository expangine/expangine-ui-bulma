export interface CheckboxAttributes {
    value: any;
    checkedValue: any;
    uncheckedValue: any;
    disabled: boolean;
    label: string;
}
export interface CheckboxEvents {
    update: CheckboxUpdateEvent;
}
export interface CheckboxUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: any;
}
export declare type CheckboxSlots = 'default';
export declare const Checkbox: import("expangine-ui").Component<CheckboxAttributes, CheckboxEvents, "default", never, never>;
