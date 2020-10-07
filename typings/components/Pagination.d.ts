export interface PaginationAttributes {
    current: number;
    total: number;
    around: number;
    align: string;
    size: string;
    rounded: boolean;
    zeroBased: boolean;
    previousLabel: string;
    nextLabel: string;
}
export interface PaginationEvents {
    update: {
        page: number;
    };
}
export interface PaginationComputed {
    classes: string;
    adjusted: number;
    hasNext: boolean;
    hasPrev: boolean;
    hasFirst: boolean;
    hasSecond: boolean;
    hasFirstEllipsis: boolean;
    hasLast: boolean;
    hasSecondToLast: boolean;
    hasLastEllipsis: boolean;
    rangeFirst: number;
    rangeLast: number;
    rangeSize: number;
}
/**
 * {1}[2][3][4][5][.][9]
 * [1]{2}[3][4][5][.][9]
 * [1][2]{3}[4][5][.][9]
 * [1][2][3]{4}[5][.][9]
 * [1][.][4]{5}[6][.][9]
 * [1][.][5]{6}[7][8][9]
 * [1][.][5][6]{7}[8][9]
 * [1][.][5][6][7]{8}[9]
 * [1][.][5][6][7][8]{9}
 */
export declare const Pagination: import("expangine-ui").Component<PaginationAttributes, PaginationEvents, never, never, PaginationComputed>;
