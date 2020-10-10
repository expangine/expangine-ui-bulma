import { isFunction, isObject } from 'expangine-runtime';
import { Component, ComponentRegistry as RootComponentRegistry } from 'expangine-ui';

export type ComponentMap = Record<string, Component<any, any, any, any, any>>;

export type ComponentRegister = (comp: Component<any, any, any, any, any>) => void;

export const BulmaRegistry: Record<string, Component<any, any, any, any, any>> = Object.create(null);

export function addComponent<A = never, E = never, S extends string = never, L = never, C = never>(comp: Component<A, E, S, L, C>, id?: string)
{
  BulmaRegistry[id || `${comp.collection}/${comp.name}`] = comp as any;

  return comp;
}

export function registerComponents(target?: ComponentMap | ComponentRegister)
{
  if (isFunction(target))
  {
    for (const name in BulmaRegistry)
    {
      target(BulmaRegistry[name]);
    }
  }
  else if (isObject(target))
  {
    Object.assign(target, BulmaRegistry);
  }
  else
  {
    Object.assign(RootComponentRegistry, BulmaRegistry);
  }
}