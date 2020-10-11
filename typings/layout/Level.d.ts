export interface LevelAttributes {
    centered: boolean;
    mobile: boolean;
}
export declare type LevelSlots = 'left' | 'right' | 'default';
export interface LevelComputed {
    itemClass: string[];
    levelClass: string[];
}
export declare const Level: import("expangine-ui").Component<LevelAttributes, never, import("./Media").MediaSlots, never, LevelComputed>;
