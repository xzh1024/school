import { IModuleConf } from '@wangeditor/editor';
import { renderFieldConf } from './render-elem/index';
import { fieldToHtmlConf } from './elem-to-html';
import { parseFieldHtmlConf } from './parse-elem-html';
import {
  insertFieldMenuConf,
  FieldEditMenuConf,
  InsertAfterTextMenuConf,
  InsertBeforeTextMenuConf
} from './menu/index';
import withField from './plugin';

const table: Partial<IModuleConf> = {
  renderElems: [renderFieldConf],
  elemsToHtml: [fieldToHtmlConf],
  parseElemsHtml: [parseFieldHtmlConf],
  menus: [
    insertFieldMenuConf,
    FieldEditMenuConf,
    InsertAfterTextMenuConf,
    InsertBeforeTextMenuConf
  ],
  editorPlugin: withField
};

export default table;
