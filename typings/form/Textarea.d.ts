export interface TextareaAttributes {
    value: string;
    size: string;
    rows: number;
    placeholder: string;
    autocomplete: string;
    status: string;
    rounded: boolean;
    disabled: boolean;
    readonly: boolean;
    fixedSize: boolean;
    updateOn: string;
}
export interface TextareaEvents {
    update: TextareaUpdateEvent;
    input: TextareaUpdateEvent;
    change: TextareaUpdateEvent;
    blur: TextareaUpdateEvent;
    keydown: TextareaUpdateEvent;
}
export interface TextareaComputed {
    classes: string;
}
export interface TextareaUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    value: string;
}
export declare const TextareaUpdateEventType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const Textarea: import("expangine-ui").Component<TextareaAttributes, TextareaEvents, never, never, TextareaComputed>;
