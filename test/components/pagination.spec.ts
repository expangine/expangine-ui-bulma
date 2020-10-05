import { Exprs } from 'expangine-runtime';
import { createComponent, mount } from 'expangine-ui';
import { Pagination } from '../../src';
import { expectHTML } from '../helper';


// tslint:disable: no-magic-numbers

describe('components/pagination', () => 
{

  it('1', () =>
  {
    const d = {
      current: 1,
      total: 1,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);
  });

  it('2', () =>
  {
    const d = {
      current: 1,
      total: 2,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 2);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link is-current" aria-current="page">2</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);
  });

  it('3', () =>
  {
    const d = {
      current: 1,
      total: 3,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 2);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link is-current" aria-current="page">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 3);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link is-current" aria-current="page">3</a></li>
          <!--if-->
          <!--if-->
        </ul>
      </nav>`
    ]);
  });

  it('4', () =>
  {
    const d = {
      current: 1,
      total: 4,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <!--if-->
          <li><a class="pagination-link">4</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 2);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link is-current" aria-current="page">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <!--if-->
          <li><a class="pagination-link">4</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 3);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link is-current" aria-current="page">3</a></li>
          <!--if-->
          <li><a class="pagination-link">4</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 4);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>       
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">4</a></li>
        </ul>
      </nav>`
    ]);
  });

  // <li><span class="pagination-ellipsis">…</span></li>

  it('5', () =>
  {
    const d = {
      current: 1,
      total: 5,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <li><a class="pagination-link">4</a></li>
          <li><a class="pagination-link">5</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 2);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link is-current" aria-current="page">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <li><a class="pagination-link">4</a></li>
          <li><a class="pagination-link">5</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 3);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <!--if-->
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link is-current" aria-current="page">3</a></li>
          <li><a class="pagination-link">4</a></li>
          <!--if-->
          <li><a class="pagination-link">5</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 4);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <!--if-->
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>  
          <li><a class="pagination-link is-current" aria-current="page">4</a></li>
          <!--if-->
          <li><a class="pagination-link">5</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 5);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <!--if-->
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>  
          <li><a class="pagination-link">4</a></li>
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">5</a></li>
        </ul>
      </nav>`
    ]);
  });

  it('9', () =>
  {
    const d = {
      current: 1,
      total: 9,
    };
    const c = mount(d, createComponent(Pagination, {
      current: Exprs.get('current'),
      total: Exprs.get('total'),
    }));

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" disabled="true">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 2);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <!--if-->
          <!--if-->
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link is-current" aria-current="page">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 3);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <!--if-->
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link is-current" aria-current="page">3</a></li>
          <li><a class="pagination-link">4</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 4);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><a class="pagination-link">2</a></li>
          <li><a class="pagination-link">3</a></li>
          <li><a class="pagination-link is-current" aria-current="page">4</a></li>
          <li><a class="pagination-link">5</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 5);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">4</a></li>
          <li><a class="pagination-link is-current" aria-current="page">5</a></li>  
          <li><a class="pagination-link">6</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 6);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">5</a></li>
          <li><a class="pagination-link is-current" aria-current="page">6</a></li>  
          <li><a class="pagination-link">7</a></li>
          <li><a class="pagination-link">8</a></li>
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 7);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">6</a></li>
          <li><a class="pagination-link is-current" aria-current="page">7</a></li>
          <li><a class="pagination-link">8</a></li>
          <!--if-->
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 8);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">6</a></li>
          <li><a class="pagination-link">7</a></li>
          <li><a class="pagination-link is-current" aria-current="page">8</a></li>
          <!--if-->
          <li><a class="pagination-link">9</a></li>
        </ul>
      </nav>`
    ]);

    c.scope.set('current', 9);

    expectHTML(c, [
      `<nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous">Previous</a>
        <a class="pagination-next" disabled="true">Next</a>
        <ul class="pagination-list">
          <li><a class="pagination-link">1</a></li>
          <li><span class="pagination-ellipsis">…</span></li>
          <li><a class="pagination-link">6</a></li>
          <li><a class="pagination-link">7</a></li>
          <li><a class="pagination-link">8</a></li>
          <!--if-->
          <li><a class="pagination-link is-current" aria-current="page">9</a></li>
        </ul>
      </nav>`
    ]);
  });

});