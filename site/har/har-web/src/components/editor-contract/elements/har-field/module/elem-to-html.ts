import { Element } from 'slate';
import { FieldElement } from './custom-types';
import { TPL } from '../../../interface';
import { bindPX, encode } from '../../../utils/util';

function fieldToHtml(elemNode: Element): string {
  const {
    width = 'auto',
    props: {
      dataset: { info }
    }
  } = elemNode as FieldElement;
  return `<span data-w-e-type="${TPL.FIELD}" data-info="${encode(
    info
  )}" style="width: ${bindPX(width)};">${info.label}</span>`;
}

export const fieldToHtmlConf = {
  type: 'har-field',
  elemToHtml: fieldToHtml
};
