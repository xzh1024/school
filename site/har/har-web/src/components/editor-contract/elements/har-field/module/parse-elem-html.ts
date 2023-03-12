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
  const $elem = $(elem);
  // @ts-ignore
  const width = elem.style.width ?? MIN_WIDTH;
  const info = decode($elem.attr('data-info'));
  return {
    type: 'har-field',
    width,
    props: {
      dataset: {
        info
      }
    },
    // text,
    children: [{ text: '' }]
  } as Element;
}

export const parseFieldHtmlConf = {
  selector: `span[data-w-e-type="${TPL.FIELD}"]`,
  parseElemHtml: parseFieldHtml
};
