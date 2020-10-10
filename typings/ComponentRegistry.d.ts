import { Component } from 'expangine-ui';
export declare type ComponentMap = Record<string, Component<any, any, any, any, any>>;
export declare type ComponentRegister = (comp: Component<any, any, any, any, any>) => void;
export declare const BulmaRegistry: Record<string, Component<any, any, any, any, any>>;
export declare function addComponent<A = never, E = never, S extends string = never, L = never, C = never>(comp: Component<A, E, S, L, C>, id?: string): Component<A, E, S, L, C>;
export declare function registerComponents(target?: ComponentMap | ComponentRegister): void;
