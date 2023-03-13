/**
 * @description table menu
 */
import InsertTable from './InsertTable';
import DeleteTable from './DeleteTable';
import InsertRow from './InsertRow';
import DeleteRow from './DeleteRow';
import InsertCol from './InsertCol';
import DeleteCol from './DeleteCol';
import TableHeader from './TableHeader';
import FullWidth from './FullWidth';
import EditTableField from './EditTableField';

export const insertTableMenuConf = {
  key: 'insertHarTable',
  factory() {
    return new InsertTable();
  }
};

export const deleteTableMenuConf = {
  key: 'deleteHarTable',
  factory() {
    return new DeleteTable();
  }
};

export const insertTableRowConf = {
  key: 'insertHarTableRow',
  factory() {
    return new InsertRow();
  }
};

export const deleteTableRowConf = {
  key: 'deleteHarTableRow',
  factory() {
    return new DeleteRow();
  }
};

export const insertTableColConf = {
  key: 'insertHarTableCol',
  factory() {
    return new InsertCol();
  }
};

export const deleteTableColConf = {
  key: 'deleteHarTableCol',
  factory() {
    return new DeleteCol();
  }
};

export const tableHeaderMenuConf = {
  key: 'harTableHeader',
  factory() {
    return new TableHeader();
  }
};

export const tableFullWidthMenuConf = {
  key: 'harTableFullWidth',
  factory() {
    return new FullWidth();
  }
};

export const tableEditMenuConf = {
  key: 'harTableEdit',
  factory() {
    return new EditTableField();
  }
};
