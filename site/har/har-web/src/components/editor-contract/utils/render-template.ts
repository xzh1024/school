import { decode, encode } from './util';
import { Field } from '../interface';

export default function renderTemplate(
  html: string,
  data: { [propName: string]: unknown },
): string {
  const el = document.createElement('div');
  el.innerHTML = html;

  // 单独字段渲染
  const fieldElList = el.querySelectorAll(`span[data-w-e-type="har-field"]`);
  for (let i = 0; i < fieldElList.length; i++) {
    const fieldEl = fieldElList[i] as HTMLSpanElement;
    const info: Field = decode(fieldEl.getAttribute('data-info') ?? '');
    const field = info?.field;
    if (info && field) {
      const text = (data[field] as string) ?? '';
      info.content = text;
      fieldEl.innerText = text;
      fieldEl.setAttribute('data-info', encode(info));
    }
  }

  // 表格渲染
  const tableElList = el.querySelectorAll(`table[data-w-e-type="har-table"]`);
  for (let i = 0; i < tableElList.length; i++) {
    const tableEl = tableElList[i];
    const renderTrList = [];
    const info: Field = decode(tableEl.getAttribute('data-info') ?? '');
    const tbody = tableEl.querySelector('tbody');
    const trList = tableEl.querySelectorAll('tbody > tr:nth-child(2)');
    const field = info?.field;
    if (field && trList.length) {
      const renderListData =
        (data[field] as Array<{ [propName: string]: unknown }>) ?? [];
      for (let j = 0; j < renderListData.length; j++) {
        const item = renderListData[j];
        const tr = trList[0].cloneNode(true) as HTMLTableRowElement;
        tr.querySelectorAll('td').forEach((td) => {
          // @ts-ignore
          const t = (td?.innerText ?? '').trim();
          if (t) {
            td.innerText = (item[t] as string) ?? '';
          }
        });
        renderTrList.push(tr);
      }
    }
    trList[0]?.remove?.();
    tbody &&
      renderTrList.forEach((t) => {
        tbody.append(t);
      });
  }
  return el.innerHTML;
}
