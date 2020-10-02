import { ComponentInstanceAny } from 'expangine-ui';
import { Exprs, NumberOps } from 'expangine-runtime';


export function expectHTML(instance: ComponentInstanceAny, html: string[], ignoreWhitespace: boolean = true)
{
  expect(instance.node.elements.length).toBe(html.length);
  
  for (let i = 0; i < html.length; i++) 
  {
    const node = instance.node.elements[i];

    if (node instanceof HTMLElement) {
      expect(processText(node.outerHTML, ignoreWhitespace)).toBe(processText(html[i], ignoreWhitespace));
    } else if (node instanceof Text) {
      expect(processText(node.textContent, ignoreWhitespace)).toBe(processText(html[i], ignoreWhitespace));
    } else if (node instanceof Comment) {
      expect(`<!--${node.textContent}-->`).toBe(html[i]);
    } else {
      expect(html[i]).toBeNull();
    }
  }
}

export function processText(input: string, stripWhitespace: boolean): string
{
  if (stripWhitespace)
  {
    input = input.replace(/>\s+/g, '>').replace(/\s+</g, '<');
  }

  return input;
}

export function increment(path: string[], by: number = 1)
{
  return Exprs.set(Exprs.get(), ...path)
    .to(Exprs.op(NumberOps.add, {
      value: Exprs.get(...path),
      addend: Exprs.const(by),
    }))
  ;
}

export function triggerFileChange(e: HTMLElement, files: File[])
{
  const ev = document.createEvent('UIEvents');
  ev.initEvent('change', true, true);
  Object.defineProperty(e, 'files', {
    writable: false,
    value: files,
  });
  e.dispatchEvent(ev);
}