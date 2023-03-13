import { Element } from 'slate';
import { TableCellElement, TableElement } from './custom-types';
import { TPL } from '../../../interface';
import { encode } from '../../../utils/util';
import { tableElementToField } from '../../../utils/helpers';

function tableToHtml(elemNode: Element, childrenHtml: string): string {
  const { width = 'auto' } = elemNode as TableElement;

  const info = tableElementToField(elemNode as TableElement);

  return `<table data-w-e-type="${TPL.TABLE}" data-info="${encode(
    info
  )}" style="width: ${width};"><tbody>${childrenHtml}</tbody></table>`;
}

function tableRowToHtml(elem: Element, childrenHtml: string): string {
  return `<tr data-w-e-type="${TPL.TABLE_ROW}">${childrenHtml}</tr>`;
}

function tableCellToHtml(cellNode: Element, childrenHtml: string): string {
  const {
    colSpan = 1,
    rowSpan = 1,
    isHeader = false,
    width = 'auto'
  } = cellNode as TableCellElement;
  const tag = isHeader ? 'th' : 'td';
  return `<${tag} data-w-e-type="${TPL.TABLE_CELL}" colSpan="${colSpan}" rowSpan="${rowSpan}" width="${width}">${childrenHtml}</${tag}>`;
}

export const tableToHtmlConf = {
  type: 'har-table',
  elemToHtml: tableToHtml
};

export const tableRowToHtmlConf = {
  type: 'har-table-row',
  elemToHtml: tableRowToHtml
};

export const tableCellToHtmlConf = {
  type: 'har-table-cell',
  elemToHtml: tableCellToHtml
};
