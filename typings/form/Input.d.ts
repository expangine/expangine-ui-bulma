export interface InputAttributes {
    type: string;
    value: string;
    size: string;
    placeholder: string;
    autocomplete: string;
    status: string;
    rounded: boolean;
    disabled: boolean;
    readonly: boolean;
    updateOn: string;
}
export interface InputEvents {
    update: InputUpdateEvent;
    input: InputUpdateEvent;
    change: InputUpdateEvent;
    blur: InputUpdateEvent;
    keydown: InputUpdateEvent;
}
export interface InputComputed {
    classes: string;
}
export interface InputUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: string;
}
export declare const InputUpdateEventType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const Input: import("expangine-ui").Component<InputAttributes, InputEvents, never, never, InputComputed>;
