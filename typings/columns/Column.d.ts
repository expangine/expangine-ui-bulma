import { Breakpoint } from '../constants';
export declare const COLUMN_MIN = 1;
export declare const COLUMN_MAX = 12;
export declare const COLUMN_DEFAULT_OFFSET = 0;
export interface ColumnAttributes {
    width: number;
    offset: number;
    narrow: boolean;
    narrowBreakpoint: Breakpoint;
}
export interface ColumnComputed {
    columnClass: string;
}
export declare type ColumnSlots = 'default';
export declare const ColumnNarrowBreakpoint: import("expangine-runtime").EnumType;
export declare const Column: import("expangine-ui").Component<ColumnAttributes, never, "default", never, ColumnComputed>;
