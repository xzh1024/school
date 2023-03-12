import uniqueId from '@form-create/utils/lib/unique';
import { useDisabled } from '../../utils';
// import { makeRequiredRule } from '../../utils';
// @ts-nocheck
const label = '上传';
const name = 'IUpload';

export default {
  icon: 'icon-upload',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      props: {
        isAliOss: true,
        accept: '*',
        limit: 1,
        onSuccess(res: any, file: any) {
          file.url = res.data.url;
        }
      }
    };
  },
  props() {
    return [
      //   makeRequiredRule(),
      useDisabled(),
      {
        type: 'select',
        field: 'accept',
        title: '上传类型',
        value: '*',
        options: [
          { label: '任意类型', value: '*' },
          { label: '图片', value: 'image/*' },
          { label: '文件', value: '*' }
        ]
      },
      {
        type: 'inputNumber',
        field: 'limit',
        value: 1,
        title: '最大允许上传个数',
        props: { mode: 'button' }
      }
    ];
  }
};
