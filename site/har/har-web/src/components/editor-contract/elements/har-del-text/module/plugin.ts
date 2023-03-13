import { IDomEditor, DomEditor } from '@wangeditor/editor';
import { BaseEditor, Editor, Node, Transforms } from 'slate';

function deleteHandler<T extends IDomEditor>(newEditor: T): Node | null {
  const { selection } = newEditor;
  if (selection == null) return null;

  const [cellNodeEntry] = Editor.nodes(newEditor as unknown as BaseEditor, { // @ts-ignore
    match: (n) => n.isDel
  });

  let p: Node | null = cellNodeEntry?.[0];
  if (!p) {
    return null;
  }

  let result = p;
  while (p) {
    // @ts-ignore
    const tpl = newEditor.getParentNode(p);
    // @ts-ignore
    if (tpl == null || !tpl.isDel) {
      break;
    }
    p = tpl;
    result = tpl;
  }

  return result;
}

function withTable<T extends IDomEditor>(editor: T): T {
  const {
    isInline,
    deleteBackward,
    isVoid
  } = editor;
  const newEditor = editor;

  newEditor.isInline = (elem) => {
    const type = DomEditor.getNodeType(elem);
    // @ts-ignore
    if (type === 'har-del-text' || type.isDel) return true;
    return isInline(elem);
  };

  newEditor.deleteBackward = (unit) => {
    const deleteNode = deleteHandler(newEditor);
    if (deleteNode) {
      Transforms.removeNodes(editor as unknown as Editor, {
        // @ts-ignore
        mode: 'all',
        match: (n) => n === deleteNode
      });
      return;
    }

    // 执行默认的删除
    deleteBackward(unit);
  };

  // 返回 editor ，重要！
  return newEditor;
}

export default withTable;
