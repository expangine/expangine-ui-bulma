export interface FieldStateType {
    status?: string;
    size?: string;
}
export declare const FieldState: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export interface FieldAttributes {
    label: string;
    status: string;
    size: string;
    message: string;
    grouped: boolean;
    groupedAlign: string;
    groupedWrap: boolean;
    horizontal: boolean;
    horizontalLabelAlignment: string;
}
export declare type FieldSlots = 'label' | 'default' | 'message';
export interface FieldComputed {
    fieldClass: string;
    fieldState: any;
    messageClass: string;
}
export declare const FieldGroupType: import("expangine-runtime").EnumType;
export declare const Field: import("expangine-ui").Component<FieldAttributes, never, FieldSlots, never, FieldComputed>;
