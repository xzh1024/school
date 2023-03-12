import { Editor, Transforms } from 'slate';
import { DomEditor, IButtonMenu, IDomEditor, t } from '@wangeditor/editor';
import { genUUID } from '@/utils';
import { updateNodeByUID } from '../../../../utils/helpers';

class EditField implements IButtonMenu {
  title = t('fieldModule.editField');
  tag = 'button';

  getValue(editor: IDomEditor): string | boolean {
    return '';
  }

  isActive(editor: IDomEditor): boolean {
    return false;
  }

  exec(editor: IDomEditor, value: string | boolean) {
    const [entry] = Editor.nodes(editor as unknown as Editor, {
      match: (n) => DomEditor.checkNodeType(n, 'har-field'),
      universal: true
    });
    const updateUID = genUUID();
    Transforms.setNodes(
      editor as unknown as Editor, // @ts-ignore
      { updateUID },
      {
        match: (n) => DomEditor.checkNodeType(n, 'har-field'),
        universal: true
      }
    );

    Promise.resolve().then(() => {
      editor.emit('edit-field', [
        ...entry,
        updateNodeByUID.bind(this, editor, updateUID)
      ]);
    });
  }

  isDisabled(editor: IDomEditor): boolean {
    return false;
  }
}

export default EditField;
