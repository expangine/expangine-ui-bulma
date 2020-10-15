import { ExpressionMap, Exprs, Types } from 'expangine-runtime';


export interface LinkOptions
{
  href: string;
  tab?: boolean;
  download?: boolean;
  external?: boolean;
}

export const LinkOptionsType = Types.object({
  href: Types.text(),
  tab: Types.optional(Types.bool()),
  download: Types.optional(Types.bool()),
  external: Types.optional(Types.bool()),
});

export function getLinkAttributes(path: string[], defaultHref: string = '#'): ExpressionMap {
  return {
    href: Exprs.or(
      Exprs.get(...path, 'href'),
      Exprs.const(defaultHref)
    ),
    download: Exprs.if(
      Exprs.get(...path, 'download')
    ).than(
      Exprs.true()
    ),
    rel: Exprs.if(
      Exprs.get(...path, 'external')
    ).than(
      Exprs.const('noreferrer noopener')
    ),
    target: Exprs.if(
      Exprs.get(...path, 'tab')
    ).than(
      Exprs.const('_blank')
    ),
  };
}
