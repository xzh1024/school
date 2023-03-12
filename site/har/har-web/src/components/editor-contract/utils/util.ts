import { Editor, Location } from 'slate';
import { nanoid } from 'nanoid';
import { find, kebabCase } from 'lodash';
import { DomEditor, IDomEditor, SlateNode } from '@wangeditor/editor';
import { ContractTemplateElement } from '../interface';

export function decode<T>(value: string, errorVal?: T): T {
  try {
    return JSON.parse(window.decodeURIComponent(value));
  } catch {}
  return errorVal as T;
}

export function encode(value: string | object) {
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  return window.encodeURIComponent(str);
}

export function getCurrentNode(
  editor: IDomEditor,
  matchNode: Array<string> = []
): ContractTemplateElement | null {
  const { selection } = editor;
  if (selection) {
    return getNode(editor, selection as Location, matchNode);
  }
  return null;
}

export function getBeforeNode(
  editor: IDomEditor,
  matchNode: Array<string> = []
): ContractTemplateElement | null {
  const { selection } = editor;
  if (selection) {
    const before = Editor.before(editor as unknown as Editor, selection);
    if (before) {
      // @ts-ignore
      return getNode(editor, before, matchNode);
    }
  }
  return null;
}

export function getNode(
  editor: IDomEditor,
  location: Location,
  matchNode: Array<string> = []
): ContractTemplateElement | null {
  const nodeList = Editor.nodes(editor as unknown as Editor, {
    // @ts-ignore
    at: location,
    match: (n: SlateNode) => {
      const type = DomEditor.getNodeType(n);
      return matchNode.includes(type);
    }
  });
  return <ContractTemplateElement>nodeList.next().value?.[0] ?? null;
}

export function genDatasetStr(dataset = {}, excludesKey: string[] = []) {
  return Object.entries(dataset)
    .map(([k, v]) => {
      if (k === 'info') {
        v = encode(v as { [propName: string]: unknown });
      }
      return excludesKey.includes(k)
        ? null
        : kebabCase('data-' + k) + '=' + `"${v}"`;
    })
    .filter((t) => t)
    .join('\n');
}

export function processProps(props = { style: {}, dataset: {} }) {
  const style = props?.style ?? {};
  const dataset = props?.dataset ?? {};
  // 自定义数据
  const mergeDataset = Object.assign({}, {}, dataset);
  // 自定义样式
  const mergeStyle = Object.assign(
    {},
    {
      'color': 'red',
      'text-decoration': 'underline'
    },
    style
  );
  // 自定义PROPS
  return Object.assign(
    {},
    {
      style: mergeStyle,
      dataset: mergeDataset,
      title: '不可编辑'
    },
    props
  );
}

/**
 * 获取随机数字符串
 * @param prefix 前缀
 * @returns 随机数字符串
 */
export function genRandomStr(prefix = 'r'): string {
  return `${prefix}-${nanoid()}`;
}

export function bindPX(val: string | number = '0', defaultPx = 'px'): string {
  const t = String(val).toString().trim();
  const m = ['px', 'em', 'rem', 'vw', 'vh', 'ex', 'ch', 'vmin', 'vmax', '%'];
  if (find(m, (itm) => t.endsWith(itm))) {
    return val as string;
  }
  return t + defaultPx;
}

/**
 * 替换 html 特殊字符，如 > 替换为 &gt;
 * @param str html str
 */
export function replaceHtmlSpecialSymbols(str: string) {
  return str
    .replace(/ {2}/g, ' &nbsp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/®/g, '&reg;')
    .replace(/©/g, '&copy;')
    .replace(/™/g, '&trade;');
}
