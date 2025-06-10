import FileSaver from 'file-saver';
import JSZip from 'jszip';
import QrCode from 'qrcode';
import { downloadByUrl } from './tools';

/**
 * @function getQrcode
 * @description 生成Base64的二维码
 * @param {String} url - 字符串
 * @return {Promise<string>}
 */
export const getQrcode = (url) => {
  return QrCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    width: 720,
    margin: 1,
    scale: 0,
    rendererOpts: {
      quality: 0.5,
    },
  }).then(res => res);
};

/**
 * @function bulkDownloadQrcode
 * @description 批量生成二维码图片并下载保存为压缩包
 * @param {BulkDownParams} params
 * @return {Promise<void>}
 */
export const bulkDownloadQrcode = async ({ urls, fileType = 'png', filesName }) => {
  const zip = new JSZip();
  const folder = zip.folder('QrCode');
  const qrCodes = urls.map(url => getQrcode(url));
  return Promise.all(qrCodes)
    .then(res => {
      const images = res.map(image => getBlob(image));
      images.forEach((image, index) => {
        folder?.file(`${filesName ? filesName[index] : urls[index]}-${new Date().getTime()}.${fileType}`, image, {
          binary: true,
        });
      });
      return res;
    })
    .then(() => {
      return zip.generateAsync({ type: 'blob' }).then(content => {
        FileSaver.saveAs(content, 'QrCode.zip');
      });
    });
};

/**
 * @function downloadQrcode
 * @description 生成二维码图片并下载保存
 * @param {string} url
 * @param {string} fileName
 * @return {void}
 */
export const downloadQrcode = async (url, fileName) => {
  const image = await getQrcode(url);
  const blob = getBlob(image);
  const urls = window.URL.createObjectURL(blob);
  downloadByUrl(urls, fileName);
  window.URL.revokeObjectURL(urls);
};

/**
 * @function getBlob
 * @description 将base64图片转为Blob对象
 * @param {string} base64
 * @return {Blob}
 */
const getBlob = (base64) => {
  var mimeStr = base64.split(',')[0].split(':')[1].split(';')[0]; // mime类型
  var byteStr = atob(base64.split(',')[1]); //base64 解码
  var arrayBuffer = new ArrayBuffer(byteStr.length); //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer); //创建视图
  for (var i = 0; i < byteStr.length; i += 1) {
    intArray[i] = byteStr.charCodeAt(i);
  }
  return new Blob([intArray], {
    type: mimeStr,
  });
};
