import { Selection } from 'slate';
import $ from '../dom';
// @ts-ignore
import diffMatchPatch from './diff-match-patch.js';

const INSERT_TAG = 'ins';
const DELETE_TAG = 'del';

class Diff {
  // 私有编码
  private privateUnicodeRange = 57344;
  private mapLength = 0;
  private tagMap: Recordable = {};
  private dmp: diffMatchPatch;

  constructor() {
    // 增加'不换行空格'符号的映射
    const unicodeCharacter = String.fromCharCode(
      this.privateUnicodeRange + this.mapLength
    );
    this.tagMap['&nbsp;'] = unicodeCharacter;
    this.tagMap[unicodeCharacter] = '&nbsp;';
    this.mapLength++;

    // 实例化Diff
    this.dmp = new diffMatchPatch();
  }

  exec(oldHtml = '', newHtml = '') {
    const newCharacter = this.convertHtmlToDiffCharacter(newHtml);
    const oldCharacter = this.convertHtmlToDiffCharacter(oldHtml);
    const diffs = this.dmp.diff_main(newCharacter, oldCharacter);
    this.dmp.diff_cleanupSemantic(diffs);
    let diffOutputHtml = '';
    for (let x = 0; x < diffs.length; x++) {
      const operation = diffs[x][0];
      const character = diffs[x][1];
      const characterFull = this.insertTagsForOperation(character, operation);
      const html = this.convertDiffCharacterBackToHtml(characterFull);
      diffOutputHtml += html;
    }
    return removeDiffTag(diffOutputHtml);
  }

  private insertTagsForOperation(character: string, operation: number) {
    // 判断这些是否都是标签
    let n = -1;
    do {
      n++;
    } while (character.charCodeAt(n) >= this.privateUnicodeRange + 1);

    // 都是标签直接跳过，不插入任何东西
    if (n >= character.length) {
      return character;
    }

    let openTag = '';
    let closeTag = '';
    if (operation === -1) {
      openTag = `<${INSERT_TAG}>`;
      closeTag = `</${INSERT_TAG}>`;
    } else if (operation === 1) {
      openTag = `<${DELETE_TAG}>`;
      closeTag = `</${DELETE_TAG}>`;
    } else {
      return character;
    }

    let outputString = openTag;
    let isOpen = true;
    for (let x = 0; x < character.length; x++) {
      // 命中的普通字符
      if (character.charCodeAt(x) < this.privateUnicodeRange) {
        // 如果标签没有打开就打开它
        if (!isOpen) {
          outputString += openTag;
          isOpen = true;
        }
        // 始终在输出中添加常规字符
        outputString += character[x];
      } else {
        // 命中了映射的unicode字符。关闭标签。
        if (isOpen) {
          outputString += closeTag;
          isOpen = false;
        }
        // 当前是删除文本操作，如果不要将删除的标签，直接 continue
        if (operation === 1) {
          // continue;
        } else {
          outputString += character[x];
        }
        outputString += character[x];
      }
    }
    if (isOpen) outputString += closeTag;
    return outputString;
  }

  // 建立标签的映射关系
  private convertHtmlToDiffCharacter(htmlString: string) {
    htmlString = htmlString.replace(/&nbsp;/g, this.tagMap['&nbsp;']);

    let character = '';
    let offset = 0;
    while (offset < htmlString.length) {
      const tagStart = htmlString.indexOf('<', offset);
      if (tagStart < 0) {
        character += htmlString.substr(offset);
        break;
      } else {
        const tagEnd = htmlString.indexOf('>', tagStart);
        if (tagEnd < 0) {
          // 无效的 HTML，在标签的开始截断
          console.log('Invalid HTML. String will be truncated.');
          character += htmlString.substr(offset, tagStart - offset);
          break;
        }
        const tagString = htmlString.substr(tagStart, tagEnd + 1 - tagStart);
        // 标签是否已经映射?
        let unicodeCharacter = this.tagMap[tagString];
        if (unicodeCharacter === undefined) {
          // 没有映射，添加映射
          unicodeCharacter = String.fromCharCode(
            this.privateUnicodeRange + this.mapLength
          );
          this.tagMap[tagString] = unicodeCharacter;
          this.tagMap[unicodeCharacter] = tagString;
          this.mapLength++;
        }
        // 在这个位置，已经完成了映射关系，所以现在可以使用它了
        character += htmlString.substr(offset, tagStart - offset);
        character += unicodeCharacter;
        offset = tagEnd + 1;
      }
    }
    return character;
  }
  // 将映射的标签还原成HTML
  private convertDiffCharacterBackToHtml(character: string) {
    let htmlString = '';
    for (let x = 0; x < character.length; x++) {
      const charCode = character.charCodeAt(x);
      if (charCode < this.privateUnicodeRange) {
        htmlString += character[x];
        continue;
      }
      const tagString = this.tagMap[character[x]];
      if (tagString === undefined) {
        // 有一个字符超出了我们的范围，但没有映射。先直接使用该字符，考虑是否需要增加上界或改变范围?
        htmlString += character[x];
      } else {
        htmlString += tagString;
      }
    }
    return htmlString;
  }
}

// 替换删除节点成wangEdit专用元素标签
function replaceTag(node: HTMLElement, type = '') {
  const tagName = node.localName;

  for (let i = 0; i < node.children.length; i++) {
    replaceTag(node.children[i] as HTMLElement, type);
  }
  if (tagName === INSERT_TAG || tagName === DELETE_TAG) {
    if (node.children.length > 0) {
      insertBeforeNodes(node, node.children as unknown as Array<HTMLElement>);
      $(node).remove();
    } else {
      const span = document.createElement('span');
      span.innerText = node.innerText;
      span.setAttribute('data-w-e-type', type);

      $(span).insertBefore(node);
      $(node).remove();
    }
  } else if (tagName === 'span') {
    node.setAttribute('data-w-e-type', type);
  }
  return node;
}

// 替换删除节点成wangEdit专用元素标签
function removeDiffTag(value = '') {
  const boxEl = document.createElement('div');
  boxEl.innerHTML = value;
  const deepEach = (el: Element) => {
    if ('children' in el) {
      for (let i = 0; i < el.children.length; i++) {
        const node = el.children[i];
        const tagName = node.localName;
        // 新增
        if (tagName === INSERT_TAG) {
          replaceTag(node as HTMLElement, 'har-add-text');
        } else if (tagName === DELETE_TAG) {
          // 删除
          replaceTag(node as HTMLElement, 'har-del-text');
        } else if ('children' in node) {
          deepEach(node);
        }
      }
    }
  };

  // const removeSomeNode = (el: Element, root = false) => {
  //   const parentTagName = el.localName;
  //
  //   if ('children' in el) {
  //     for (let i = 0; i < el.children.length; i++) {
  //       const node = el.children[i];
  //       const tagName = node.localName;
  //       if (!root) {
  //         if (parentTagName === tagName) {
  //           insertBeforeNodes(node, node.children);
  //           node.remove();
  //         }
  //       }
  //       removeSomeNode(node);
  //     }
  //   }
  // };

  deepEach(boxEl);
  // removeSomeNode(boxEl);

  return boxEl.innerHTML;
}
//todo  检查类型是否正确
function insertBeforeNodes(el: Element, nodeList: Array<HTMLElement>) {
  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    $(node).insertBefore(el);
  }
}

function getNode(el: HTMLElement, paths: number[]) {
  paths = [...paths];
  paths.pop();
  let node = el;
  try {
    for (const path of paths) {
      node = el.childNodes[path] as HTMLElement;
    }
  } catch {}
  return node;
}

export default function diff(
  oldHtml = '',
  newHtml = '',
  selection?: Selection
) {
  // // 选区位置注入节点
  // if (selection && selection?.focus) {
  //   const { focus } = selection;
  //   const tplEl = document.createElement('div');
  //   tplEl.innerHTML = newHtml;
  //   // 删除Selection属性
  //   const selectionNodeList = tplEl.querySelectorAll('*[data-selection]');
  //   for (const selectionNode of selectionNodeList) {
  //     selectionNode.removeAttribute('data-selection');
  //   }
  //   // 添加Selection属性
  //   const node = getNode(tplEl, focus.path);
  //   if (node) {
  //     node.setAttribute('data-selection', focus.offset.toString());
  //     newHtml = tplEl.innerHTML;
  //   }
  // }
  //
  const res = new Diff().exec(oldHtml, newHtml);
  //
  // // console.log('比对完成后：', res);
  // // 获取新的选区位置
  // if (selection && selection?.focus) {
  //   const tplEl = document.createElement('div');
  //   tplEl.innerHTML = res;
  //   const node = tplEl.querySelector('*[data-selection]');
  //   if (node) {
  //     console.log('选区阶段', node.childNodes);
  //   }
  // }

  // console.log('新节点：', newHtml);
  // console.log('旧节点：', oldHtml);
  console.log('比对结果：', res);
  return res;
}
