(global as any).self = global;

import { writeFileSync } from 'fs';
import { BulmaRegistry } from '../src';
import Docs from '../docs/index.json';
import { isEmpty, isFunction, isObject, ObjectType, Type } from 'expangine-runtime';


for (const id in BulmaRegistry) {
  const comp = BulmaRegistry[id];
  const existing = Docs.components[id];
  const updated = {
    category: "MISSING",
    label: "MISSING",
    description: "MISSING",
    preview: ["bulma/button", { fullWidth: true, text: comp.name }],
    template: [`${comp.collection}/${comp.name}`],
    // attributes
    ...(comp.attributes ? {
      attributes: objectMap(comp.attributes, (attrInput) => {
        const attr = attrInput instanceof Type || isFunction(attrInput)
          ? { type: attrInput }
          : attrInput;
        const type = isFunction(attr.type)
          ? attr.type({})
          : attr.type;

        const options: any = {
          label: "MISSING",
          description: "MISSING",
        };

        if (!attr.required) {
          options.default = "MISSING";
        }
        if (attr.callable) {
          const callable = isFunction(attr.callable)
            ? attr.callable({})
            : attr.callable;

          if (callable instanceof ObjectType) {
            options.callable = objectMap(callable.options.props, (prop) => "MISSING");
          } else {
            options.callable = "MISSING";
          }
        }
        if (!type.isSimple()) {
          options.type = "MISSING";
        }
        
        return options;
      }),
    } : {}),
    // slots
    ...(comp.slots ? {
      slots: objectMap(comp.slots, (slotInput) => {
        const slot = slotInput instanceof Type || isFunction(slotInput)
          ? { scope: slotInput }
          : slotInput;
        const scope = isFunction(slot.scope)
          ? slot.scope({})
          : slot.scope;
        
        const options: any = {
          label: "MISSING",
          description: "MISSING",
        };

        if (scope instanceof ObjectType && !isEmpty(scope.options.props)) {
          options.scope = objectMap(scope.options.props, (prop) => "MISSING");
        }
        if (!slot.required) {
          options.default = "MISSING";
        }

        return options;
      })
    } : {}),
    // events
    ...(comp.events ? {
      events: objectMap(comp.events, (eventInput) => {
        const event = isFunction(eventInput)
          ? eventInput({})
          : eventInput;
        
        const options: any = {
          label: "MISSING",
          description: "MISSING",
        };

        if (!isEmpty(event.options.props)) {
          options.scope = objectMap(event.options.props, (prop) => "MISSING");
        }
        
        return options;
      })
    } : {}),
  };

  if (!existing) {
    Docs.components[id] = updated;
  } else {
    Docs.components[id] = merge(existing, updated);
  }
}

writeFileSync('./docs/index-updated.json', JSON.stringify(Docs, undefined, '  '));

function objectMap<K extends string, S, T>(source: Record<K, S>, map: (source: S) => T): Record<K, T>
{
  const target: Record<K, T> = Object.create(null);

  for (const key in source)
  {
    target[key] = map(source[key]);
  }

  return target;
}

function merge(target: any, template: any)
{
  if (isObject(template) && isObject(target))
  {
    for (const prop in target)
    {
      template[prop] = merge(target[prop], template[prop]);
    }

    return template;
  }

  return target;
}