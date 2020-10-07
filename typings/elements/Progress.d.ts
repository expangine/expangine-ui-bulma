export declare const PROGRESS_MIN = 0;
export declare const PROGRESS_MAX_DEFAULT = 100;
export interface ProgressAttributes {
    value: number;
    max: number;
    color: string;
    size: string;
    indeterminate: boolean;
}
export interface ProgressComputed {
    classes: string;
    percent: string;
}
export declare const Progress: import("expangine-ui").Component<ProgressAttributes, never, never, never, ProgressComputed>;
