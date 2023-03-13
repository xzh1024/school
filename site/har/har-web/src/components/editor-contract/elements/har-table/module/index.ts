import { IModuleConf } from '@wangeditor/editor';
import withTable from './plugin';
import {
  renderTableConf,
  renderTableRowConf,
  renderTableCellConf
} from './render-elem/index';
import {
  tableToHtmlConf,
  tableRowToHtmlConf,
  tableCellToHtmlConf
} from './elem-to-html';
import { preParseTableHtmlConf } from './pre-parse-html';
import {
  parseCellHtmlConf,
  parseRowHtmlConf,
  parseTableHtmlConf
} from './parse-elem-html';
import {
  insertTableMenuConf,
  deleteTableMenuConf,
  insertTableRowConf,
  deleteTableRowConf,
  insertTableColConf,
  deleteTableColConf,
  tableHeaderMenuConf,
  tableFullWidthMenuConf,
  tableEditMenuConf
} from './menu/index';

const table: Partial<IModuleConf> = {
  renderElems: [renderTableConf, renderTableRowConf, renderTableCellConf],
  elemsToHtml: [tableToHtmlConf, tableRowToHtmlConf, tableCellToHtmlConf],
  preParseHtml: [preParseTableHtmlConf],
  parseElemsHtml: [parseTableHtmlConf, parseRowHtmlConf, parseCellHtmlConf],
  menus: [
    insertTableMenuConf,
    deleteTableMenuConf,
    insertTableRowConf,
    deleteTableRowConf,
    insertTableColConf,
    deleteTableColConf,
    tableHeaderMenuConf,
    tableFullWidthMenuConf,
    tableEditMenuConf,
  ],
  editorPlugin: withTable
};

export default table;
