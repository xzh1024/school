import { h, VNode } from 'snabbdom';
import { IDomEditor, SlateElement } from '@wangeditor/editor';

function renderTableRow(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  return h('tr', {}, children);
}

export default renderTableRow;
