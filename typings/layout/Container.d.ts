export interface ContainerAttributes {
    type: string;
}
export interface ContainerComputed {
    containerClass: string;
}
export declare const ContainerType: import("expangine-runtime").EnumType;
export declare const Container: import("expangine-ui").Component<ContainerAttributes, never, never, never, ContainerComputed>;
