export interface TableAttributes {
    columns: Array<{
        heading: string;
        property?: string;
    }>;
    rows: any[];
    getRowKey: any;
    hideHeader: boolean;
    isSelected: boolean;
    bordered: boolean;
    striped: boolean;
    narrow: boolean;
    hoverable: boolean;
    fullWidth: boolean;
    scrollable: boolean;
}
export interface TableComputed {
    classes: string;
}
export declare type TableSlots = 'header' | 'footer';
export declare const Table: import("expangine-ui").Component<TableAttributes, never, TableSlots, never, TableComputed>;
