import uniqueId from '@form-create/utils/lib/unique';
import { useDisabled, useRequired } from '../../utils';

const label = '开关';
const name = 'a-switch';

export default {
  icon: 'icon-switch',
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
      useDisabled(),
      {
        type: 'inputNumber',
        field: 'width',
        title: '宽度（px）'
      },
      { type: 'input', field: 'checked-value', title: 'switch 打开时的值' },
      { type: 'input', field: 'unchecked-value', title: 'switch 关闭时的值' },
      { type: 'input', field: 'checked-color', title: 'switch 打开时的背景色' },
      {
        type: 'input',
        field: 'unchecked-color',
        title: 'switch 关闭时的背景色'
      }
    ];
  }
};
