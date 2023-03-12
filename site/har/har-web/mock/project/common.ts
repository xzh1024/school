import { create, resData } from '../utils';

export default create([
  {
    url: '/cbd-api-project/common/upload',
    method: 'POST',
    response: {
      accessid: 'LTAI5tRcDrPApzh3Hm2YNiA5',
      policy:
        'eyJleHBpcmF0aW9uIjoiMjAyMy0wMi0wMVQwNzowNjoxMi41MjFaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJoYXItY2JkL3VwbG9hZC9kZXYvIl1dfQ==',
      signature: 'a2SQfdQPCTDvmLNO4jx7c7x4oA8=',
      host: 'https://har-cbd.oss-cn-hangzhou.aliyuncs.com',
      dir: 'har-cbd/upload/dev/20230201/',
      cdnUrl: 'https://har-cbd-cdn.huianrong.com',
      expire: '1675235172',
      callback:
        'eyJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24vanNvbiIsImNhbGxiYWNrSG9zdCI6IjEyMS4xOTYuMjM2LjIyMzo1MDAwMSIsImNhbGxiYWNrVXJsIjoiaHR0cDovLzEyMS4xOTYuMjM2LjIyMzo1MDAwMS9jYmQtYXBpLXByb2plY3QvZmlsZS1kaXJlY3QtdXBsb2FkL2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5Ijoie1wiYnVja2V0XCI6JHtidWNrZXR9LFwib2JqZWN0XCI6JHtvYmplY3R9LFwic2l6ZVwiOiR7c2l6ZX0sXCJtaW1lVHlwZVwiOiR7bWltZVR5cGV9LFwiZm9ybWF0XCI6JHtpbWFnZUluZm8uZm9ybWF0fSxcImZpbGVOYW1lXCI6JHt4OmZpbGVuYW1lfSxcImNsaWVudElkXCI6MSxcInByb2plY3RJZFwiOlsxLDIsNSw2XX0ifQ==',
      key: '1675235142521103568370'
    }
  },
  {
    url: '/cbd-api-project/file-direct-upload/sign',
    method: 'GET',
    response: {
      code: 200,
      msg: 'success',
      data: {
        code: 200,
        msg: 'success',
        data: {
          accessid: 'LTAI5tRcDrPApzh3Hm2YNiA5',
          policy:
            'eyJleHBpcmF0aW9uIjoiMjAyMy0wMi0wMVQwNzowNjoxMi41MjFaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJoYXItY2JkL3VwbG9hZC9kZXYvIl1dfQ==',
          signature: 'a2SQfdQPCTDvmLNO4jx7c7x4oA8=',
          host: 'https://har-cbd.oss-cn-hangzhou.aliyuncs.com',
          dir: 'har-cbd/upload/dev/20230201/',
          cdnUrl: 'https://har-cbd-cdn.huianrong.com',
          expire: '1675235172',
          callback:
            'eyJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24vanNvbiIsImNhbGxiYWNrSG9zdCI6IjEyMS4xOTYuMjM2LjIyMzo1MDAwMSIsImNhbGxiYWNrVXJsIjoiaHR0cDovLzEyMS4xOTYuMjM2LjIyMzo1MDAwMS9jYmQtYXBpLXByb2plY3QvZmlsZS1kaXJlY3QtdXBsb2FkL2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5Ijoie1wiYnVja2V0XCI6JHtidWNrZXR9LFwib2JqZWN0XCI6JHtvYmplY3R9LFwic2l6ZVwiOiR7c2l6ZX0sXCJtaW1lVHlwZVwiOiR7bWltZVR5cGV9LFwiZm9ybWF0XCI6JHtpbWFnZUluZm8uZm9ybWF0fSxcImZpbGVOYW1lXCI6JHt4OmZpbGVuYW1lfSxcImNsaWVudElkXCI6MSxcInByb2plY3RJZFwiOlsxLDIsNSw2XX0ifQ==',
          key: '1675235142521103568370'
        }
      }
    }
  }
]);
