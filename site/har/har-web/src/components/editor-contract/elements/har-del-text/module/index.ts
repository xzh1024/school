import { IModuleConf } from '@wangeditor/editor';
import { renderFieldConf } from './render-elem/index';
import { fieldToHtmlConf } from './elem-to-html';
import { parseFieldHtmlConf } from './parse-elem-html';
import withField from './plugin';

const table: Partial<IModuleConf> = {
  renderElems: [renderFieldConf],
  elemsToHtml: [fieldToHtmlConf],
  parseElemsHtml: [parseFieldHtmlConf],
  editorPlugin: withField
};

export default table;
