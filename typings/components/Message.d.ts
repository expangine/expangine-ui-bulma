export interface MessageAttributes {
    header: string;
    deletable: boolean;
    size: string;
    color: string;
}
export interface MessageEvents {
    deleted: void;
}
export interface MessageComputed {
    classes: string;
}
export declare type MessageSlots = 'default';
export declare const Message: import("expangine-ui").Component<MessageAttributes, MessageEvents, "default", never, MessageComputed>;
