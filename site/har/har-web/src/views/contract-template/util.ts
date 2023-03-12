import { Editor } from 'slate';
import { kebabCase } from 'lodash';
import { DomEditor, SlateDescendant } from '@wangeditor/editor';

export function decode<T>(value: string, errorVal?: T): T {
  try {
    return JSON.parse(window.decodeURIComponent(value));
  } catch {}
  return errorVal as T;
}

export function encode(value: any) {
  const str = typeof value === 'string' ? value : JSON.stringify(value);
  return window.encodeURIComponent(str);
}

export function getCurrentNode(
  editor: any,
  matchNode: Array<string> = []
): SlateDescendant | null {
  const { selection } = editor;
  if (selection) {
    return getNode(editor, selection, matchNode);
  }
  return null;
}

export function getBeforeNode(
  editor: any,
  matchNode: Array<string> = []
): SlateDescendant | null {
  const { selection } = editor;
  if (selection) {
    const before = Editor.before(editor, selection);
    if (before) {
      // @ts-ignore
      return getNode(editor, before, matchNode);
    }
  }
  return null;
}

export function getNode(
  editor: any,
  location: Location,
  matchNode: Array<string> = []
): SlateDescendant | null {
  const nodeList = Editor.nodes(editor, {
    // @ts-ignore
    at: location,
    match: (n: any) => {
      const type = DomEditor.getNodeType(n);
      return matchNode.includes(type);
    }
  });
  return <SlateDescendant>nodeList.next().value?.[0] ?? null;
}

export function genDatasetStr(dataset = {}, excludesKey: string[] = []) {
  return Object.entries(dataset)
    .map(([k, v]) => {
      if (k === 'info') {
        v = encode(v);
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

// export function renderTable(data: Field, getDOM = false): VNode {
//   const vnode = h(
//     'table',
//     {
//       style: {
//         width: '100%'
//       }
//     },
//     [
//       h('thead', [
//         h(
//           'tr',
//           data.children.map((item) => h('td', [item.label]))
//         )
//       ]),
//       h('tbody', [
//         h(
//           'tr',
//           data.children.map((item) => h('td', [item.field]))
//         )
//       ])
//     ]
//   );
//   if (getDOM) {
//     pa
//   }
//   return vnode;
// }
