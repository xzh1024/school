export type OSSFile = {
  accessid: string;
  callback: string;
  cdnUrl: string;
  dir: string;
  expire: string;
  file: File;
  host: string;
  key: string;
  name: string;
  percent: number;
  policy: string;
  response: {
    data: {
      accessid: string;
      callback: string;
      cdnUrl: string;
      dir: string;
      expire: string;
      host: string;
      key: string;
      policy: string;
      signature: string;
      url: string;
    };
  };
  signature: string;
  status: string;
  type: string;
  uid: string;
  url: string;
};
export interface FileItem {
  /**
   * @zh 当前上传文件的唯一标示
   * @en The unique identifier of the currently uploaded file
   */
  uid: string;
  /**
   * @zh 当前上传文件的状态
   * @en The status of the currently uploaded file
   */
  status?: FileStatus;
  /**
   * @zh 文件对象
   * @en File object
   */
  file?: File;
  /**
   * @zh 上传进度百分比
   * @en Upload progress percentage
   */
  percent?: number;
  /**
   * @zh 当前文件上传请求返回的响应
   * @en The response returned by the current file upload request
   */
  response?: any;
  /**
   * @zh 图片地址
   * @en The image address
   */
  url?: string;
  /**
   * @zh 图片文件名
   * @en Picture file name
   */
  name?: string;
}

export interface RequestOption {
  /**
   * @zh 上传的URL
   * @en Uploaded URL
   * */
  action?: string;
  /**
   * @zh 请求报文的头信息
   * @en Header information of the request message
   * */
  headers?: Record<string, string>;
  /**
   * @zh 上传文件的文件名
   * @en File name of the uploaded file
   * */
  name?: string | ((fileItem: FileItem) => string);
  /**
   * @zh 上传文件
   * @en upload files
   * */
  fileItem: FileItem;
  /**
   * @zh 附加的请求信息
   * @en Additional requested information
   * */
  data?:
    | Record<string, string | Blob>
    | ((fileItem: FileItem) => Record<string, string | Blob>);
  /**
   * @zh 是否携带cookie信息
   * @en Whether to carry cookie information
   * */
  withCredentials?: boolean;
  /**
   * @zh 更新当前文件的上传进度。percent: 当前上传进度百分比
   * @en Update the upload progress of the current file. percent: current upload progress percentage
   * */
  onProgress: (percent: number, event?: ProgressEvent) => void;
  /**
   * @zh 上传成功后，调用onSuccess方法，传入的response参数将会附加到当前上传文件的response字段上
   * @en After the upload is successful, call the onSuccess method, the incoming response parameter will be appended to the response field of the currently uploaded file
   * */
  onSuccess: (response?: any) => void;
  /**
   * @zh 上传失败后，调用onError方法，传入的response参数将会附加到当前上传文件的response字段上
   * @en After the upload fails, call the onError method, and the response parameter passed in will be appended to the response field of the currently uploaded file
   * */
  onError: (response?: any) => void;
}
