import { RequestFunctionParams } from 'yapi-to-typescript';
import axios, { AxiosRequestConfig } from 'axios';
import { cbdApiProjectFileDirectUploadSignGet } from '@/api';
import lsStore from '@/utils/ls-store';
import { merge } from 'lodash';
import { Message } from '@arco-design/web-vue';
import { service } from '@/api/request';

export interface IProgressEvent extends ProgressEvent {
  // 上传进度百分比:0-100，上传失败为 -1
  uploadRate?: number;
  // 下载进度百分比:0-100，下载失败为 -1
  downloadRate?: number;
}

interface dataType {
  [key: string]: any;
}
type CustomOssRequestOptions = {
  onUploadProgress?(progressEvent: IProgressEvent): void;
};
export function customOssRequest(
  file: File,
  url?: string,
  data?: dataType,
  options?: CustomOssRequestOptions
): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const onUploadProgress = options?.onUploadProgress;
    try {
      const params = await cbdApiProjectFileDirectUploadSignGet();
      const { key, policy, accessid, signature, dir, callback, cdnUrl } =
        params;
      const newParams: any = {
        ...data,
        key: dir! + key!,
        policy,
        OSSAccessKeyId: accessid,
        success_action_status: '200',
        signature,
        callback
      };
      const formData = new FormData();
      formData.append('name', file.name);
      const type = file?.name?.split('.')?.pop()?.toLowerCase();
      // eslint-disable-next-line no-restricted-syntax,no-shadow
      for (const key of Object.keys(newParams)) {
        if (newParams[key]) {
          formData.append(
            key,
            key === 'key' ? `${newParams[key]}.${type}` : newParams[key]
          );
        }
      }
      formData.append('x:filename', file.name);
      formData.append('file', file);
      const res = await axios({
        url: url || params?.host || '/cbd-api-project/common/upload',
        method: 'post',
        headers: {
          Authorization: lsStore.getItem('token') || '',
        },
        data: formData,
        onUploadProgress(data: ProgressEvent) {
          const rate = Math.floor((data.loaded / data.total) * 100);
          typeof onUploadProgress === 'function' &&
          onUploadProgress(
            Object.assign(data, {uploadRate: rate < 100 ? rate : 99}),
          );
        },
      });
      typeof onUploadProgress === 'function' &&
      onUploadProgress(
        Object.assign(new ProgressEvent('progress'), {uploadRate: 100}),
      );
      resolve({
        ...params,
        url: `${cdnUrl}/${newParams.key}.${type}`,
        res,
        signature,
      });
    } catch (e) {
      typeof onUploadProgress === 'function' &&
        onUploadProgress(
          Object.assign(new ProgressEvent('progress'), { uploadRate: -1 })
        );
      reject(e);
    }
  });
}

interface IDownloadConfig extends AxiosRequestConfig {
  url: string;

  onDownloadProgress?(progressEvent: IProgressEvent): void;

  downloadSuccessMsg?: string | null;
}

export async function download(config: IDownloadConfig, filename?: string) {
  const onDownloadProgress = config.onDownloadProgress;
  config = merge(
    {
      responseType: 'blob',
      downloadSuccessMsg: '下载成功',
    },
    config,
    {
      onDownloadProgress(data: ProgressEvent) {
        const rate = Math.floor((data.loaded / data.total) * 100);
        typeof onDownloadProgress === 'function' &&
          onDownloadProgress(
            Object.assign(data, {downloadRate: rate < 100 ? rate : 99}),
          );
      }
    }
  );
  try {
    const data = await service({} as RequestFunctionParams, {}, config);

    typeof onDownloadProgress === 'function' &&
    onDownloadProgress(
      Object.assign(new ProgressEvent('Progress'), {downloadRate: 100}),
    );

    const blobUrl = window.URL.createObjectURL(data as Blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename as string;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    if (config.downloadSuccessMsg) {
      Message.success(config.downloadSuccessMsg as string);
    }
  } catch (e) {
    Message.error('下载失败');
    typeof onDownloadProgress === 'function' &&
      onDownloadProgress(
        Object.assign(new ProgressEvent('Progress'), {
          downloadRate: -1,
        })
      );
    return Promise.reject(e);
  }
}

type ChooseFileConfig = {
  // 接收的上传文件类型，具体参考 HTML标准
  accept?: string;
  // 文件最大数，单位kb，默认：102400kb
  maxSize?: number;
};

export function chooseFile(config?: ChooseFileConfig): Promise<File | null> {
  return new Promise(function (resolve) {
    config = merge(
      {
        maxSize: 102400
      },
      config ?? {}
    );
    let fileEl: HTMLInputElement | null = document.createElement('input');
    fileEl.type = 'file';
    if (config.accept) {
      fileEl.accept = config.accept;
    }
    fileEl.addEventListener(
      'change',
      function () {
        const file = this.files?.[0];
        if (file == null) {
          fileEl = null;
          return resolve(null);
        }
        const acceptList = (config?.accept?.split(',') ?? [])
          .map((itm: string) => {
            itm = itm.trim();
            if (itm.startsWith('.')) {
              itm = itm.slice(1);
            }
            return itm;
          })
          .filter((t) => t);
        const fileSize = file.size / 1024; // 转单位为 kb;
        const fileName = file.name;
        const fileType = file.type;
        const fileNameList = fileName.split('.');
        if (config?.accept) {
          let validName = false;
          validName = acceptList.includes(
            fileNameList[fileNameList.length - 1]
          );
          if (!validName) {
            validName = config?.accept?.includes(fileType);
          }
          if (!validName) {
            fileEl = null;
            Message.warning(
              `文件格式错误，请选择：${acceptList.join('，')} 格式文件`
            );
            return resolve(null);
          }
        }
        if (typeof config?.maxSize === 'number') {
          if (fileSize > config.maxSize) {
            fileEl = null;
            Message.warning(`文件大小超出${config.maxSize / 1024}MB`);
            return resolve(null);
          }
        }
        fileEl = null;
        resolve(file);
      },
      { once: true }
    );
    fileEl.click();
  });
}
