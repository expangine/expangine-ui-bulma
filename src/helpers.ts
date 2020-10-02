import { Expression, Exprs } from 'expangine-runtime';


export function ifConst(path: string[], value: any): Expression
{
  return Exprs.if(
    Exprs.get(...path),
  ).than(
    Exprs.const(value)
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

export const GetOverride = (path: string[], overrideName: string, overrides?: Record<string, Expression>) =>
  overrides && overrides[overrideName]
    ? Exprs.or(overrides[overrideName], Exprs.get(...path))
    : Exprs.get(...path);