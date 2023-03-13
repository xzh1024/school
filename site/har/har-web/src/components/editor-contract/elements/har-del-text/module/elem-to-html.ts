import { Element } from 'slate';
import { Boot } from '@wangeditor/editor';

function fieldToHtml(elemNode: Element): string {
  // @ts-ignore
  if (Boot.registerContractTemplateDiff) {
    // @ts-ignore
    return `<span data-w-e-type="har-del-text" style="color: #fff;background: red;">${elemNode.children?.[0]?.text ?? ''}</span>`;
  }
  return '';
}

export const fieldToHtmlConf = {
  type: 'har-del-text',
  elemToHtml: fieldToHtml
};
