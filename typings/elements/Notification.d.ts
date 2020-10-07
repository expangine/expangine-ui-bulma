export interface NotificationAttributes {
    color: string;
    deletable: boolean;
    deleteSize: string;
    message: string;
    light: boolean;
}
export interface NotificationEvents {
    deleted: void;
}
export interface NotificationComputed {
    classes: string;
}
export declare type NotificationSlots = 'default';
export declare const Notification: import("expangine-ui").Component<NotificationAttributes, NotificationEvents, "default", never, NotificationComputed>;
