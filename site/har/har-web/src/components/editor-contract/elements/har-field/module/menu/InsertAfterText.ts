import {
  DomEditor,
  IButtonMenu,
  IDomEditor,
  t
} from '@wangeditor/editor';
import { Editor, Path, Transforms } from 'slate';

class InsertAfterText implements IButtonMenu {
  title = t('fieldModule.insertAfterText');
  tag = 'button';
  getValue(editor: IDomEditor): string | boolean {
    return '';
  }
  isActive(editor: IDomEditor): boolean {
    return false;
  }
  isDisabled(editor: IDomEditor): boolean {
    return false;
  }
  exec(editor: IDomEditor, value: string | boolean) {
    const [nodeEntry] = Editor.nodes(editor as unknown as Editor, {
      match: (n) => {
        const type = DomEditor.getNodeType(n);
        return type === 'har-field';
      }
    });
    if (nodeEntry) {
      const [, path] = nodeEntry;
      const nextPath = Path.next(path);
      Transforms.insertNodes(editor as unknown as Editor, [{ text: ' ' }], {
        at: nextPath
      });
    }
  }
}

export default InsertAfterText;
