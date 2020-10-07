export declare const COLUMN_DEFAULT_GAP = 3;
export declare const COLUMN_GAP_MAX = 8;
export declare const COLUMN_GAP_MIN = 0;
export interface ColumnsAttributes {
    gap: number;
    multiline: boolean;
    verticalCenter: boolean;
    centered: boolean;
    mobile: boolean;
}
export declare type ColumnsSlots = 'default';
export interface ColumnsComputed {
    columnsClass: string;
}
export declare const Columns: import("expangine-ui").Component<ColumnsAttributes, never, "default", never, ColumnsComputed>;
