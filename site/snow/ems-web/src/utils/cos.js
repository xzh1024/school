import { getAiCosKey } from '@api/ai';
import Cos from 'cos-js-sdk-v5';

export const bucket = 'fssc-1259627966';

export const region = 'ap-shanghai';

export default class COS {
  constructor(options) {
    const { type } = options;
    this.type = type;
    const cos = new Cos({
      getAuthorization: (options, callBack) => {
        if (this.type === 'ai') {
          this.aiCosAuth(callBack);
        }
      },
    });
    this.cos = cos;
    if (window.location.pathname.endsWith('ai-submit')) {
      this.aiCosAuth();
    }
  }

  type = null;

  cos = null;

  bucket = '';

  region = '';

  aiCosAuth = callBack => {
    getAiCosKey().then(res => {
      const { data } = res;
      console.log(data, 177778888);
      this.bucket = data.bucket;
      this.region = data.region;
      callBack &&
        callBack({
          TmpSecretId: data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials.tmpSecretKey,
          SecurityToken: data.credentials.sessionToken,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
          ScopeLimit: true,
        });
    });
  };

  // 获取对象
  getObjUrl = key => {
    return new Promise((resolve, reject) => {
      this.cos.getObjectUrl(
        {
          Bucket: this.bucket,
          Region: this.region,
          Key: key,
          Sign: true,
        },
        (error, data) => {
          if (error) reject(error);
          resolve(data);
        },
      );
    });
  };

  // 上传文件
  uploadToCos = ({ key, file, ...options }) => {
    return new Promise((resolve, reject) => {
      this.cos.uploadFile(
        {
          Bucket: this.bucket,
          Region: this.region,
          Key: key || file.name,
          Body: file,
          ...options,
        },
        (error, data) => {
          if (error) reject(error);
          resolve(data);
        },
      );
    });
  };

  // 根据key下载文件
  downloadObjFile = async (key, fileName) => {
    const urlData = await this.getObjUrl(key);
    const downloadUrl =
      urlData.Url +
      (fileName
        ? `${urlData.Url.indexOf('?') > -1 ? '&' : '?'}response-content-disposition=attachment;filename=${fileName}`
        : '');
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = downloadUrl;
      document.body.appendChild(iframe);
      // 等待下载完成
      iframe.onload = () => {
        document.body.removeChild(iframe);
        resolve(downloadUrl);
      };
      iframe.onerror = () => {
        document.body.removeChild(iframe);
        reject();
      };
    });
  };
}
