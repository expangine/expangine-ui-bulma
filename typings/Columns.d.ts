import { Breakpoint } from './constants';
export declare const COLUMN_MIN = 1;
export declare const COLUMN_MAX = 12;
export declare const COLUMN_DEFAULT_GAP = 3;
export declare const COLUMN_DEFAULT_OFFSET = 0;
export declare const Columns: import("expangine-ui").Component<{
    gap: number;
    multiline: boolean;
    verticalAlign: boolean;
    centered: boolean;
    mobile: boolean;
}, never, "default", never, {
    columnsClass: string;
}>;
export declare const Column: import("expangine-ui").Component<{
    width: number;
    offset: number;
    narrow: boolean;
    narrowBreakpoint: Breakpoint;
}, never, never, never, {
    columnClass: string;
}>;
