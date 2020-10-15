import { ExpressionMap } from 'expangine-runtime';
export interface LinkOptions {
    href: string;
    tab?: boolean;
    download?: boolean;
    external?: boolean;
}
export declare const LinkOptionsType: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare function getLinkAttributes(path: string[], defaultHref?: string): ExpressionMap;
