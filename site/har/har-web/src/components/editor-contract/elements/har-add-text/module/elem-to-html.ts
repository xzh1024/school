import { Element } from 'slate';
import { Boot } from '@wangeditor/editor';

function fieldToHtml(elemNode: Element): string {
  // @ts-ignore
  if (Boot.registerContractTemplateDiff) {
    // @ts-ignore
    return `<span data-w-e-type="har-add-text" style="color: #fff;background: green;">${elemNode.children?.[0]?.text ?? ''}</span>`;
  }
  // @ts-ignore
  return `${elemNode.children?.[0]?.text ?? ''}`;
}

export const fieldToHtmlConf = {
  type: 'har-add-text',
  elemToHtml: fieldToHtml
};
