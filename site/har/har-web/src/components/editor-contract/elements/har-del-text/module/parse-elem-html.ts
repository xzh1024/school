import { Descendant, Element } from 'slate';
import { IDomEditor } from '@wangeditor/editor';
import $, { DOMElement } from '../../../utils/dom';
import { TPL } from '../../../interface';
import { decode } from '../../../utils/util';
import { MIN_WIDTH } from '../../../config';

function parseFieldHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): Element {
  // @ts-ignore
  const text = elem.innerText;
  return {
    type: 'har-del-text',
    children: [{ text }]
  } as Element;
}

export const parseFieldHtmlConf = {
  selector: `span[data-w-e-type="har-del-text"]`,
  parseElemHtml: parseFieldHtml
};
