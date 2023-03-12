import {IEditorConfig, IToolbarConfig} from '@wangeditor/editor';
import {customOssRequest} from '@/utils/oss-upload';

type EditorConfig = Partial<IEditorConfig>
type ToolbarConfig = Partial<IToolbarConfig>

export const MIN_WIDTH = 16;

export function genToolbarConfig(mode: string): ToolbarConfig {
  const config: ToolbarConfig = {
    excludeKeys: ['group-video'],
  };
  if (mode === 'TPL') {
    config.insertKeys = {
      index: 0, // 插入的位置，基于当前的 toolbarKeys
      keys: ['insertHarField', 'insertHarTable'],
    };
  }
  return config;
}

export function genEditorConfig(mode: string): EditorConfig {
  const config: EditorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn?: (url: string) => void) {
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          console.log(file, 'file');
          try {
            const res = await customOssRequest(file);
            insertFn && insertFn(res?.url);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

  config.hoverbarKeys = {
    'har-table': {
      menuKeys: ['enter']
    },
    'har-field': {
      menuKeys: ['insertBeforeText', 'insertAfterText']
    }
  };

  if (mode === 'TPL') {
    config.hoverbarKeys['har-table'].menuKeys.push(
      ...[
        'harTableFullWidth',
        'harTableEdit',
        'insertHarTableCol',
        'deleteHarTableCol',
        'deleteHarTable'
      ]
    );
    config.hoverbarKeys['har-field'].menuKeys.push(...['fieldEdit']);
  }
  return config;
}
