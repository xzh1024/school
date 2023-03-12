import {
  Element as SlateElement,
  Range,
  Point,
  Path,
  Location,
  Transforms, Editor
} from 'slate';
import { throttle } from 'lodash';
import { h, VNode } from 'snabbdom';
import { IDomEditor, DomEditor } from '@wangeditor/editor';
import { FieldElement } from '../custom-types';
import { bindPX } from '../../../../utils/util';
import { MIN_WIDTH } from '../../../../config';

let isMouseDownForResize = false;
let clientXWhenMouseDown = 0;
let cellWidthWhenMouseDown = 0;
let cellPathWhenMouseDown: Location | null = null;
let editorWhenMouseDown: IDomEditor | null = null;

function onMouseDown(event: Event) {
  const elem = event.target as HTMLElement;

  if (
    !elem?.className?.includes?.('w-e-panel-content-har-field-tpl') ||
    elem.style.cursor !== 'col-resize'
  )
    return;
  // elem.style.cursor = 'auto';
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
  if (newWith < MIN_WIDTH) newWith = MIN_WIDTH; // 最小宽度

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

function renderField(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const {
    width,
    props: {
      dataset: { info }
    }
  } = elemNode as FieldElement;

  // @ts-ignore
  const isTplMode = editor.mode === 'TPL';
  // @ts-ignore
  const text = info?.content ?? '';

  return h(
    'span',
    {
      props: {
        title: info?.field ? info.field : undefined,
        contentEditable: false
      },
      className: isTplMode ? 'w-e-panel-content-har-field-tpl' : '',
      style: isTplMode
        ? {
            'width': bindPX(width),
            'border-bottom': '1px solid #333'
          }
        : {},
      on: {
        mousemove: throttle(function (this: VNode, event: MouseEvent) {
          if (!isTplMode) {
            return;
          }
          const elem = this.elm as HTMLElement;
          if (elem == null) return;
          if (isMouseDownForResize) return; // 此时正在修改列宽
          elem.style.cursor = 'col-resize';
          editorWhenMouseDown = editor;
          cellPathWhenMouseDown = DomEditor.findPath(editor, elemNode);
        }, 100)
      }
    },
    [isTplMode ? ' ' : text]
  );
}

export default renderField;
