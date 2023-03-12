import { IDomEditor, DomEditor } from '@wangeditor/editor';

function withTable<T extends IDomEditor>(editor: T): T {
  const {
    isInline,
    isVoid
  } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    if (type === 'har-add-text') return true;
    return isInline(elem);
  };
  // 返回 editor ，重要！
  return newEditor;
}

export default withTable;
