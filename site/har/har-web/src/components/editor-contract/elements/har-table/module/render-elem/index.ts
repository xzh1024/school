import renderTable from './render-table';
import renderTableRow from './render-row';
import renderTableCell from './render-cell';

export const renderTableConf = {
  type: 'har-table',
  renderElem: renderTable
};

export const renderTableRowConf = {
  type: 'har-table-row',
  renderElem: renderTableRow
};

export const renderTableCellConf = {
  type: 'har-table-cell',
  renderElem: renderTableCell
};
