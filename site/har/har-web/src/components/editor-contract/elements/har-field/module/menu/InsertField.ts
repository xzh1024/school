import { IButtonMenu, IDomEditor, SlateTransforms, t} from '@wangeditor/editor';

import { Field } from '../../../../interface';

class InsertField implements IButtonMenu {
  title = t('fieldModule.insertField');
  tag = 'button';

  getValue(editor: IDomEditor): string | boolean {
    return '';
  }
  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false;
  }
  isDisabled(editor: IDomEditor): boolean {
    return false;
  }

  exec(editor: IDomEditor, value: string | boolean) {
    const node = {
      // @ts-ignore
      type: 'har-field',
      width: 60,
      props: {
        dataset: {
          info: new Field()
        }
      },
      children: [{ text: '' }]
    };
    // editor.insertNode(node);
    // editor.insertNodes({ text: '123' });
    SlateTransforms.insertNodes(editor, [{ text: ' ' }, node, { text: ' ' }]);
  }
}

export default InsertField;
