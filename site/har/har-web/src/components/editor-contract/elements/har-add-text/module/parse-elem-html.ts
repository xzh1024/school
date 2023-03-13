import { Descendant, Element } from 'slate';
import { IDomEditor } from '@wangeditor/editor';
import $, { DOMElement } from '../../../utils/dom';

function parseFieldHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): Element {
  // @ts-ignore
  const text = elem.innerText;
  return {
    type: 'har-add-text',
    children: [{ text }]
  } as Element;
}

export const parseFieldHtmlConf = {
  selector: `span[data-w-e-type="har-add-text"]`,
  parseElemHtml: parseFieldHtml
};
