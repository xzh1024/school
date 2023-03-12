import {
  Element as SlateElement,
} from 'slate';
import { h, VNode } from 'snabbdom';
import { IDomEditor } from '@wangeditor/editor';

function renderField(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {

  return h(
    'span',
    {
      style: {
        // 'font-weight': '600',
        'color': '#fff',
        'background': 'red'
      },
      // props: { contentEditable: false }
    },
    children
  );
}

export default renderField;
