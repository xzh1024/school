import { throttle } from 'lodash';
import { h, VNode } from 'snabbdom';
import { DomEditor, IDomEditor } from '@wangeditor/editor';
import {Element as SlateElement, Transforms, Location, Editor} from 'slate';
import { TableCellElement } from '../custom-types';
import { isCellInFirstRow } from '../../../../utils/helpers';

// 拖拽列宽相关信息
let isMouseDownForResize = false;
let clientXWhenMouseDown = 0;
let cellWidthWhenMouseDown = 0;
let cellPathWhenMouseDown: Location | null = null;
let editorWhenMouseDown: IDomEditor | null = null;

function onMouseDown(event: Event) {
  const elem = event.target as HTMLElement;

  if (
    !elem?.className?.includes?.('har-table-cell') ||
    elem.style.cursor !== 'col-resize'
  )
    return;
  elem.style.cursor = 'auto';

  event.preventDefault();

  // 记录必要信息
  isMouseDownForResize = true;
  const { clientX } = event as MouseEvent;
  clientXWhenMouseDown = clientX;
  const { width } = elem.getBoundingClientRect();
  cellWidthWhenMouseDown = width;

  // 绑定事件
  document.body.addEventListener('mousemove', onMouseMove);
  document.body.addEventListener('mouseup', onMouseUp);
}

document.body.addEventListener('mousedown', onMouseDown); // 绑定事件

function onMouseUp(event: Event) {
  isMouseDownForResize = false;
  editorWhenMouseDown = null;
  cellPathWhenMouseDown = null;

  // 解绑事件
  document.body.removeEventListener('mousemove', onMouseMove);
  document.body.removeEventListener('mouseup', onMouseUp);
}

const onMouseMove = throttle(function (event: Event) {
  if (!isMouseDownForResize) return;
  if (editorWhenMouseDown == null || cellPathWhenMouseDown == null) return;
  event.preventDefault();

  const { clientX } = event as MouseEvent;
  let newWith = cellWidthWhenMouseDown + (clientX - clientXWhenMouseDown); // 计算新宽度
  newWith = Math.floor(newWith * 100) / 100; // 保留小数点后两位
  if (newWith < 30) newWith = 30; // 最小宽度

  // 这是宽度
  Transforms.setNodes(
    editorWhenMouseDown as unknown as Editor,
    // @ts-ignore
    { width: newWith.toString() },
    {
      at: cellPathWhenMouseDown
    }
  );
}, 100);

function renderTableCell(
  cellNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const isFirstRow = isCellInFirstRow(editor, cellNode as TableCellElement);
  const {
    colSpan = 1,
    rowSpan = 1,
    isHeader = false
  } = cellNode as TableCellElement;
  // @ts-ignore
  const isTplMode = editor.mode === 'TPL';

  // ------------------ 不是第一行，直接渲染 <td> ------------------
  if (!isFirstRow) {
    return h(
      // 'td',
      'div',
      {
        props: {
          colSpan: colSpan,
          rowSpan: rowSpan,
          contentEditable: isTplMode
        },
        style: { display: 'table-cell' },
        className: 'har-table-cell'
      },
      children
    );
  }

  // ------------------ 是第一行：1. 判断 th ；2. 拖拽列宽 ------------------
  // const Tag = isHeader ? 'th' : 'td'; // 坑：th和td被编辑器原有功能全局拦截了，这里用div代替
  const Tag = 'div';
  const className = isHeader
    ? 'har-table-cell har-table-th'
    : 'har-table-cell har-table-td';

  const vnode = h(
    Tag,
    {
      props: {
        colSpan: colSpan,
        rowSpan: rowSpan,
        contentEditable: isTplMode
      },
      className: className,
      style: { borderRightWidth: '3px', display: 'table-cell' },
      on: {
        mousemove: throttle(function (this: VNode, event: MouseEvent) {
          if (!isTplMode) {
            return;
          }
          const elem = this.elm as HTMLElement;
          if (elem == null) return;
          const { left, width, top, height } = elem.getBoundingClientRect();
          const { clientX, clientY } = event;

          if (isMouseDownForResize) return; // 此时正在修改列宽

          // 非 mousedown 状态，计算 cursor 样式
          const matchX = clientX > left + width - 5 && clientX < left + width; // X 轴，是否接近 cell 右侧？
          const matchY = clientY > top && clientY < top + height; // Y 轴，是否在 cell 之内
          // X Y 轴都接近，则修改鼠标样式
          if (matchX && matchY) {
            elem.style.cursor = 'col-resize';
            editorWhenMouseDown = editor;
            cellPathWhenMouseDown = DomEditor.findPath(editor, cellNode);
          } else {
            if (!isMouseDownForResize) {
              elem.style.cursor = 'auto';
              editorWhenMouseDown = null;
              cellPathWhenMouseDown = null;
            }
          }
        }, 100)
      }
    },
    children
  );
  return vnode;
}

export default renderTableCell;
