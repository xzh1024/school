import $, {
  css,
  append,
  addClass,
  removeClass,
  hasClass,
  on,
  focus,
  attr,
  hide,
  show,
  // scrollTop,
  // scrollLeft,
  offset,
  width,
  height,
  parent,
  parents,
  is,
  dataset,
  val,
  text,
  removeAttr,
  insertBefore,
  children,
  html,
  remove,
  find,
  each,
  empty,
  data,
  appendTo,
  Dom7Array
} from 'dom7';

const METHOD_LIST = [
  css,
  append,
  addClass,
  removeClass,
  hasClass,
  on,
  focus,
  attr,
  hide,
  show,
  // scrollTop,
  // scrollLeft,
  offset,
  width,
  height,
  parent,
  parents,
  is,
  dataset,
  val,
  text,
  removeAttr,
  insertBefore,
  children,
  html,
  remove,
  find,
  each,
  empty,
  data,
  appendTo
];

METHOD_LIST.forEach((method: Function) => {
  if (method && method.name) {
    $.fn[method.name] = method;
  }
});

export default $;

export enum NodeType {
  ELEMENT_NODE = 1,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  PROCESSING_INSTRUCTION_NODE = 7,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11
}

/**
 * 获取 tagName lower-case
 * @param $elem $elem
 */
export function getTagName($elem: Dom7Array): string {
  if ($elem.length) return $elem[0].tagName.toLowerCase();
  return '';
}

/**
 * 获取 $elem 某一个 style 值
 * @param $elem $elem
 * @param styleKey style key
 */
export function getStyleValue($elem: Dom7Array, styleKey: string): string {
  let res = '';

  const styleStr = $elem.attr('style') || ''; // 如 'line-height: 2.5; color: red;'
  const styleArr = styleStr.split(';'); // 如 ['line-height: 2.5', ' color: red', '']
  const length = styleArr.length;
  for (let i = 0; i < length; i++) {
    const styleItemStr = styleArr[i]; // 如 'line-height: 2.5'
    if (styleItemStr) {
      const arr = styleItemStr.split(':'); // ['line-height', ' 2.5']
      if (arr[0].trim() === styleKey) {
        res = arr[1].trim();
      }
    }
  }

  return res;
}

import DOMNode = globalThis.Node;
import DOMComment = globalThis.Comment;
import DOMElement = globalThis.Element;
import DOMText = globalThis.Text;
import DOMRange = globalThis.Range;
import DOMSelection = globalThis.Selection;
import DOMStaticRange = globalThis.StaticRange;

export {
  DOMNode,
  DOMComment,
  DOMElement,
  DOMText,
  DOMRange,
  DOMSelection,
  DOMStaticRange
};
