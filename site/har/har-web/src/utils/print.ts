import html2canvas from 'html2canvas';
import printJS from 'print-js';

const html2canvasBaseOptions = {
  width: 794,
  backgroundColor: '#ffffff'
};
/**
 * getHtml2Pdf
 * @params dom ${HTMLElement}
 */
export async function getHtml2Pdf(dom: HTMLElement, options = {}) {
  return html2canvas(dom, {
    ...html2canvasBaseOptions,
    ...options
  });
}

/**
 * getHtml2Pdf
 * @params dom ${Element}
 */
export function toPrint(element: any) {
  printJS({ printable: element, type: 'html' });
}

/**
 *
 * randomColor
 * @return {string} random color
 *
 */
export function randomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}
