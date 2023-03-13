import uniqueId from '@form-create/utils/lib/unique';
import { useClear, useReadonly, useRequired } from '../../utils';

const label = '评分';
const name = 'a-rate';

export default {
  icon: 'icon-rate',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      props: {}
    };
  },
  props() {
    return [
      useRequired(),
      {
        type: 'inputNumber',
        field: 'count',
        title: '最大分值',
        value: 5,
        props: { mode: 'button', min: 0 }
      },
      useReadonly(),
      useClear(),
      { type: 'switch', field: 'allow-half', title: '是否允许半选' },
      {
        type: 'switch',
        field: 'grading',
        title: '是否开启笑脸分级',
        value: true
      }
    ];
  }
};
