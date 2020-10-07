import { Expression } from 'expangine-runtime';
import { NodeTemplate } from 'expangine-ui';
import { FieldStateType } from '../form/Field';
export interface IconType {
    style: string;
    name: string;
    size?: string;
    status?: string;
    side?: string;
    rotate?: string;
    flip?: string;
    spins?: boolean;
    bordered?: boolean;
    square?: boolean;
    decorative?: boolean;
    title?: boolean;
}
export interface IconAttributes {
    icon: IconType;
    fieldState: FieldStateType;
}
export interface IconComputed {
    classes: object;
}
export declare const Icons: import("expangine-runtime").EnumType;
export declare const IconStyle: import("expangine-runtime").EnumType;
export declare const IconObject: import("expangine-runtime").ObjectType<{
    props: Record<string, import("expangine-runtime").Type<any>>;
}>;
export declare const IconClasses: (attr: string, overrides?: Record<string, Expression>, iconClass?: string) => import("expangine-runtime").ObjectExpression;
export declare const IconClassesObject: (attr: string[], overrides?: Record<string, Expression>, iconClass?: string) => {
    span: import("expangine-runtime").TupleExpression;
    i: import("expangine-runtime").TupleExpression;
    transform: import("expangine-runtime").TupleExpression;
    decorative: import("expangine-runtime").PathExpression | import("expangine-runtime").OrExpression;
    title: import("expangine-runtime").PathExpression | import("expangine-runtime").OrExpression;
};
export declare const IconRender: (classes: string) => NodeTemplate;
export declare const IconRenderObject: (classes: any) => NodeTemplate;
export declare const Icon: import("expangine-ui").Component<IconAttributes, never, never, never, IconComputed>;
