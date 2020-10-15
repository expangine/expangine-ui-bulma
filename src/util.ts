import { Expression, Exprs } from 'expangine-runtime';


export function ifConst(path: string[], value: any): Expression
{
  return Exprs.if(
    Exprs.get(...path),
  ).than(
    Exprs.const(value)
  );
}
export function ifElseConst(path: string[], truthy: any, falsy: any): Expression
{
  return Exprs.if(
    Exprs.get(...path),
  ).than(
    Exprs.const(truthy)
  ).else(
    Exprs.const(falsy)
  );
}

export function ifTemplate(path: string[], template: string): Expression
{
  return Exprs.if(
    Exprs.get(...path)
  ).than(
    Exprs.template(template, {
      value: Exprs.get(...path),
    }),
  );
}

export function ifExpr(path: string[], expr: Expression): Expression
{
  return Exprs.if(
    Exprs.get(...path),
  ).than(
    expr
  );
}

export function getOverride(path: string[], overrideName: string, overrides?: Record<string, Expression>)
{
  return overrides && overrides[overrideName]
    ? Exprs.or(overrides[overrideName], Exprs.get(...path))
    : Exprs.get(...path);
}

