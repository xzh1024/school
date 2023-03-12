import { Editor, Transforms } from 'slate';
import { t, DomEditor, IDomEditor, IButtonMenu } from '@wangeditor/editor';
import { genUUID } from '@/utils';
import { updateNodeByUID } from '../../../../utils/helpers';

class EditTableField implements IButtonMenu {
  title = t('harTableModule.editTableField');
  tag = 'button';

  getValue(editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return '';
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false;
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // const [entry] = Editor.nodes(editor, {
    //   match: (n) => DomEditor.checkNodeType(n, 'har-table'),
    //   universal: true
    // });
    const updateNodeByUID = genUUID();
    Transforms.setNodes(
      editor as unknown as Editor, // @ts-ignore
      { updateNodeByUID },
      {
        match: (n) => DomEditor.checkNodeType(n, 'har-table'),
        universal: true
      }
    );

    // Promise.resolve().then(() => {
    //   editor.emit('edit-field', [
    //     ...entry,
    //     updateNodeByUID.bind(this, editor, updateNodeByUID)
    //   ]);
    // });
  }

  isDisabled(editor: IDomEditor): boolean {
    return false;
  }
}

export default EditTableField;
