import { DomEditor, IDomEditor } from '@wangeditor/editor';
import { cloneDeep } from 'lodash';
import {
  Descendant,
  Editor,
  Element as SlateElement, Location,
  Path, Point,
  Transforms,
} from 'slate';
import {
  TableElement,
  TableCellElement,
  TableRowElement
} from '../elements/har-table/module/custom-types';
import { Field } from '../interface';

/**
 * 获取第一行所有 cells
 * @param tableNode table node
 */
export function getFirstRowCells(tableNode: TableElement): TableCellElement[] {
  const rows = tableNode.children || []; // 所有行
  if (rows.length === 0) return [];
  const firstRow = rows[0] || {}; // 第一行
  const cells = firstRow.children || []; // 第一行所有 cell
  return cells;
}

/**
 * 表格是否带有表头？
 * @param tableNode table node
 */
export function isTableWithHeader(tableNode: TableElement): boolean {
  const firstRowCells = getFirstRowCells(tableNode);
  return firstRowCells.every((cell) => !!cell.isHeader);
}

/**
 * 单元格是否在第一行
 * @param editor editor
 * @param cellNode cell node
 */
export function isCellInFirstRow(
  editor: IDomEditor,
  cellNode: TableCellElement
): boolean {
  const rowNode = editor.getParentNode(cellNode);
  if (rowNode == null) return false;
  const tableNode = editor.getParentNode(rowNode);
  if (tableNode == null) return false;

  const firstRowCells = getFirstRowCells(tableNode as TableElement);
  return firstRowCells.some((c) => c === cellNode);
}

export function getCellData(editor: IDomEditor, cellNode: SlateElement) {
  const rowNode = editor.getParentNode(cellNode);
  if (!cellNode) {
    return null;
  }
  // @ts-ignore
  const tableNode = editor.getParentNode(rowNode);
  if (rowNode == null) {
    return null;
  }

  // @ts-ignore
  const info = tableNode.props.dataset.info;
  const index = rowNode.children.indexOf(cellNode);

  if (index === -1) {
    return null;
  }

  return info.children[index];
}

export function setTableRow(editor: IDomEditor, data: Field) {
  const addNodeRecordList: Array<TableRowElement> = [];
  const [te] = Editor.nodes(editor as unknown as Editor, {
    match: (n) => DomEditor.checkNodeType(n, 'har-table'),
    universal: true
  });
  if (!te) {
    // 光标没有选择表格
    return null;
  }

  function execUpdateTable() {
    const [tableEntry] = Editor.nodes(editor as unknown as Editor, {
      match: (n) => DomEditor.checkNodeType(n, 'har-table'),
      universal: true
    });
    const [tablePath] = tableEntry;
    Transforms.setNodes(
      editor as unknown as Editor,
      {
        // @ts-ignore
        props: { dataset: { info: data } }
      },
      {
        mode: 'highest',
        at: tablePath
      }
    );
  }

  function execAdd(key: 'field' | 'label') {
    const [cellEntry] = Editor.nodes(editor as unknown as Editor, {
      match: (n) => DomEditor.checkNodeType(n, 'har-table-cell'),
      universal: true
    });
    if (cellEntry) {
      const [cellNode, cellPath] = cellEntry;

      // 获取 cell length ，即多少列
      const rowNode = DomEditor.getParentNode(editor, cellNode);
      const cellsLength = rowNode?.children.length || 0;
      if (cellsLength === 0) return;

      // 拼接新的 row
      const newRow: TableRowElement = {
        type: 'har-table-row',
        children: []
      };
      addNodeRecordList.push(newRow);
      for (let i = 0; i < data.children.length; i++) {
        const item = data.children[i];
        const cell: TableCellElement = {
          type: 'har-table-cell',
          isHeader: key === 'label',
          children: [{ text: item[key] }]
        };
        newRow.children.push(cell);
      }

      // 插入 row
      const rowPath = Path.parent(cellPath); // 获取 tr 的 path
      const newRowPath = Path.next(rowPath);
      Transforms.insertNodes(editor as unknown as Editor, newRow, { at: newRowPath });
    }
  }

  function execDel() {
    const [tableEntry] = Editor.nodes(editor as unknown as Editor, {
      match: (n) => DomEditor.checkNodeType(n, 'har-table'),
      universal: true
    });
    if (tableEntry) {
      // @ts-ignore
      const removeList = tableEntry[0].children.filter(
        (rowNode: TableRowElement) =>
          rowNode.type === 'har-table-row' &&
          !addNodeRecordList.includes(rowNode)
      );
      if (removeList.length) {
        const rowPath = DomEditor.findPath(editor, removeList[0]);
        Transforms.removeNodes(editor as unknown as Editor, { at: rowPath });
        if (removeList.length > 1) {
          Promise.resolve().then(() => {
            execDel();
          });
        }
      }
    }
  }

  execUpdateTable();
  execAdd('field');
  execAdd('label');
  execDel();
}

export function tableElementToField(element: TableElement): Field {
  const result = cloneDeep(element.props.dataset.info);
  element.children.forEach((tr, idx) => {
    tr.children.forEach((td, i) => {
      if (!result.children[i]) {
        result.children[i] = new Field();
      }
      if (idx === 0) {
        result.children[i].label = td.children[0].text;
      } else {
        result.children[i].field = td.children[0].text;
      }
    });
  });
  return result;
}

export function updateNodeByUID(
  editor: IDomEditor,
  updateUID: string,
  data: Field
) {
  editor.selectAll();
  Transforms.setNodes(
    editor as unknown as Editor,
    {
      // @ts-ignore
      props: { dataset: { info: data } }
    },
    {
      universal: true,
      mode: 'all',
      match: (n) => {
        // @ts-ignore
        return n.updateUID && n.updateUID === updateUID;
      }
    }
  );
}

/**
 *【反转】替换 html 特殊字符，如 &gt; 替换为 >
 * @param str html str
 */
export function deReplaceHtmlSpecialSymbols(str: string) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&reg;/g, '®')
    .replace(/&copy;/g, '©')
    .replace(/&trade;/g, '™')
    .replace(/&quot;/g, '"');
}

export function isLocation(editor: IDomEditor, location: Location, elem: string): boolean {
  const tables = Editor.nodes(editor as unknown as Editor, {
    at: location,
    mode: 'all',
    match: (n) => {
      const type = DomEditor.getNodeType(n);
      return type === elem;
    }
  });
  let hasIn = false;
  for (const table of tables) {
    hasIn = true;
  }
  return hasIn;
}

export function deleteFilter(newEditor: IDomEditor, elem: string, key: string): boolean {
  // @ts-ignore
  if (newEditor.mode !== 'tpl') {
    const { selection } = newEditor;
    if (selection == null) return false;

    const [cellNodeEntry] = Editor.nodes(newEditor as unknown as Editor, {
      match: (n) => DomEditor.checkNodeType(n, elem)
    });

    if (cellNodeEntry) {
      const [, cellPath] = cellNodeEntry;
      const start = Editor.start(newEditor as unknown as Editor, cellPath);

      if (Point.equals(selection.anchor, start)) {
        return true;
      }
    }

    if (selection) {
      const before = Editor.before(newEditor as unknown as Editor, selection); // 前一个 location
      if (key === 'Backspace') {
        if (before) {
          const isTableOnBeforeLocation = isLocation(newEditor, before, elem); // before
          const isTableOnCurSelection = isLocation(newEditor, selection, elem); // 当前
          if (isTableOnBeforeLocation || isTableOnCurSelection) {
            return true;
          }
        }
      } else if (key === 'Delete') {
        const after = Editor.after(newEditor as unknown as Editor, selection); // 后一个 location
        if (after) {
          const isTableOnBeforeLocation = isLocation(newEditor, after, elem); // after
          const isTableOnCurSelection = isLocation(newEditor, selection, elem); // 当前
          if (isTableOnBeforeLocation || isTableOnCurSelection) {
            return true;
          }
        }
      }
    }
  }

  return false;
}
