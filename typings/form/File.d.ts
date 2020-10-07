import { IconType } from '../elements/Icon';
export interface FileAttributes {
    label: string;
    name: string;
    showFileNames: boolean;
    multiple: boolean;
    accept: string;
    alignment: string;
    fullWidth: boolean;
    boxed: boolean;
    size: string;
    color: string;
    icon: IconType;
}
export interface FileEvents {
    update: FileUpdateEvent;
}
export interface FileUpdateEvent {
    nativeEvent: any;
    stop: boolean;
    prevent: boolean;
    file: File;
    files: FileList;
}
export interface FileState {
    fileNames: string;
}
export declare type FileSlots = 'default' | 'name';
export interface FileComputed {
    fileClasses: string;
    iconClasses: string;
}
export declare const FileType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const FileUpdateEventType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const FileComponent: import("expangine-ui").Component<FileAttributes, FileEvents, FileSlots, FileState, FileComputed>;
