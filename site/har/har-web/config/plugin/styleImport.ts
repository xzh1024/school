/**
 * Introduces component library styles on demand.
 * 按需引入组件库样式
 * https://github.com/anncwb/vite-plugin-style-import
 */

import { createStyleImportPlugin } from 'vite-plugin-style-import';

export default function configStyleImportPlugin() {
  return createStyleImportPlugin({
    libs: [
      {
        libraryName: '@arco-design/web-vue',
        esModule: true,
        resolveStyle: (name) => {
          // The use of this part of the component must depend on the parent, so it can be ignored directly.
          // 这部分组件的使用必须依赖父级，所以直接忽略即可。
          const ignoreList = [
            'config-provider',
            'anchor-link',
            'sub-menu',
            'menu-item',
            'menu-item-group',
            'breadcrumb-item',
            'form-item',
            'step',
            'card-grid',
            'card-meta',
            'collapse-panel',
            'descriptions-item',
            'list-item',
            'list-item-meta',
            'table-column',
            'table-column-group',
            'tab-pane',
            'tab-content',
            'timeline-item',
            'tree-node',
            'skeleton-line',
            'skeleton-shape',
            'grid-item',
            'carousel-item',
            'doption',
            'option',
            'use-form-item'
          ];
          // List of components that need to map imported styles
          // 需要映射引入样式的组件列表
          const replaceList: Record<string, string> = {
            'typography-text': 'typography',
            'typography-title': 'typography',
            'typography-paragraph': 'typography',
            'typography-link': 'typography',
            'dropdown-button': 'dropdown',
            'input-password': 'input',
            'input-search': 'input',
            'input-group': 'input',
            'radio-group': 'radio',
            'checkbox-group': 'checkbox',
            'layout-sider': 'layout',
            'layout-content': 'layout',
            'layout-footer': 'layout',
            'layout-header': 'layout',
            'month-picker': 'date-picker',
            'range-picker': 'date-picker',
            'row': 'grid', // 'grid/row.less'
            'col': 'grid', // 'grid/col.less'
            'avatar-group': 'avatar'
          };
          if (ignoreList.includes(name)) return '';
          return replaceList.hasOwnProperty(name)
            ? `@arco-design/web-vue/es/${replaceList[name]}/style/css.js`
            : `@arco-design/web-vue/es/${name}/style/css.js`;

          // less
          // return `@arco-design/web-vue/es/${name}/style/index.js`;
        }
      }
    ]
  });
}
