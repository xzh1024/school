import { Descendant, Text, Element } from 'slate';
import { IDomEditor, DomEditor } from '@wangeditor/editor';
import { TPL } from '../../../interface';
import { decode } from '../../../utils/util';
import $, { getTagName, getStyleValue, DOMElement } from '../../../utils/dom';

function parseCellHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): Element {
  const $elem = $(elem);

  children = children.filter((child) => {
    if (Text.isText(child)) return true;
    return !!editor.isInline(child);
  });

  // 无 children ，则用纯文本
  if (children.length === 0) {
    // @ts-ignore
    children = [{ text: elem.innerText.replace(/\s+/gm, ' ') }];
  }

  const colSpan = parseInt($elem.attr('colSpan') || '1');
  const rowSpan = parseInt($elem.attr('rowSpan') || '1');
  const width = $elem.attr('width') || 'auto';

  return {
    type: 'har-table-cell',
    isHeader: getTagName($elem) === 'th',
    colSpan,
    rowSpan,
    width,
    children
  } as Element;
}

export const parseCellHtmlConf = {
  selector: `td[data-w-e-type="${TPL.TABLE_CELL}"],th[data-w-e-type="${TPL.TABLE_CELL}"]`,
  parseElemHtml: parseCellHtml
};

function parseRowHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): Element {
  return {
    type: 'har-table-row',
    children: children.filter(
      (child) => DomEditor.getNodeType(child) === 'har-table-cell'
    )
  } as Element;
}

export const parseRowHtmlConf = {
  selector: `tr[data-w-e-type]`,
  parseElemHtml: parseRowHtml
};

function parseTableHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): Element {
  const $elem = $(elem);

  // 计算宽度
  let width = 'auto';
  if (getStyleValue($elem, 'width') === '100%') width = '100%';
  if ($elem.attr('width') === '100%') width = '100%'; // 兼容 v4 格式
  return {
    type: 'har-table',
    width,
    props: {
      dataset: {
        info: decode($elem.attr('data-info'))
      }
    },
    children: children.filter(
      (child) => DomEditor.getNodeType(child) === 'har-table-row'
    )
  } as Element;
}

export const parseTableHtmlConf = {
  selector: `table[data-w-e-type="${TPL.TABLE}"]`, // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseTableHtml
};
