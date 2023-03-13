import uniqueId from '@form-create/utils/lib/unique';
import {
  defaultOptions as options,
  useDisabled,
  useOptions,
  useRequired
} from '../../utils/index';

const label = '多选框';
const name = 'a-checkbox-group';

export default {
  icon: 'icon-checkbox',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      effect: {
        fetch: ''
      },
      props: {
        options
      }
    };
  },
  props() {
    return [
      useRequired(),
      useOptions('options'),
      {
        type: 'switch',
        field: 'type',
        title: '按钮类型',
        props: { activeValue: 'button', inactiveValue: 'default' }
      },
      useDisabled(),
      {
        type: 'inputNumber',
        field: 'min',
        title: '可被勾选的 checkbox 的最小数量'
      },
      {
        type: 'inputNumber',
        field: 'max',
        title: '可被勾选的 checkbox 的最大数量'
      },
      {
        type: 'input',
        field: 'textColor',
        title: '按钮形式的 Checkbox 激活时的文本颜色'
      },
      {
        type: 'input',
        field: 'fill',
        title: '按钮形式的 Checkbox 激活时的填充色和边框色'
      }
    ];
  }
};
