import { Expression } from 'expangine-runtime';
export declare function ifConst(path: string[], value: any): Expression;
export declare function ifElseConst(path: string[], truthy: any, falsy: any): Expression;
export declare function ifTemplate(path: string[], template: string): Expression;
export declare function ifExpr(path: string[], expr: Expression): Expression;
export declare function getOverride(path: string[], overrideName: string, overrides?: Record<string, Expression>): import("expangine-runtime").PathExpression | import("expangine-runtime").OrExpression;
