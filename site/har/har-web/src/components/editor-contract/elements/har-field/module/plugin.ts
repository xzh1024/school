import { Message } from '@arco-design/web-vue';
import { IDomEditor, DomEditor } from '@wangeditor/editor';

import { TPL } from '../../../interface';
import { deleteFilter } from '../../../utils/helpers';

function withTable<T extends IDomEditor>(editor: T): T {
  const { isInline, isVoid, deleteBackward, deleteForward } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === TPL.FIELD) return true;
    return isInline(elem);
  };
  newEditor.isVoid = (elem) => {
    const type = DomEditor.getNodeType(elem);
    // @ts-ignore
    if (type === TPL.FIELD) return true;
    return isVoid(elem);
  };

  newEditor.deleteForward = (unit) => {
    console.log('deleteForward');
    if (deleteFilter(newEditor, 'har-field', 'Delete')) {
      Message.warning('结构性数据不能删除');
      return;
    }
    // 执行默认的删除
    deleteForward(unit);
  };

  newEditor.deleteBackward = (unit) => {
    console.log('deleteBackward');
    if (deleteFilter(newEditor, 'har-field', 'Backspace')) {
      Message.warning('结构性数据不能删除');
      return;
    }
    // 执行默认的删除
    deleteBackward(unit);
  };
  // 返回 editor ，重要！
  return newEditor;
}

export default withTable;
