export interface RadioAttributes {
    value: any;
    name: string;
    checkedValue: any;
    disabled: boolean;
    label: string;
}
export interface RadioEvents {
    update: RadioUpdateEvent;
}
export interface RadioUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: any;
}
export declare type RadioSlots = 'default';
export declare const RadioUpdateEventType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const Radio: import("expangine-ui").Component<RadioAttributes, RadioEvents, "default", never, never>;
