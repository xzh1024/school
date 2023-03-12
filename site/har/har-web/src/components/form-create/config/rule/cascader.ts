import uniqueId from '@form-create/utils/lib/unique';
import {
  useOptions,
  useRequired,
  usePlaceholder,
  useSize,
  useDisabled,
  useClear
} from '../../utils/index';

const label = '级联选择器';
const name = 'a-cascader';

export default {
  icon: 'icon-cascader',
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
        options: [],
        type: 'multiple'
      }
    };
  },
  props() {
    return [
      useRequired(),
      useOptions('multiple'),
      useSize(),
      usePlaceholder('select'),
      useDisabled(),
      useClear(),
      {
        type: 'switch',
        field: 'showAllLevels',
        title: '输入框中是否显示选中值的完整路径',
        value: true
      },
      { type: 'switch', field: 'collapseTags', title: '多选模式下是否折叠Tag' },
      {
        type: 'input',
        field: 'separator',
        value: '-',
        title: '选项分隔符'
      }
    ];
  }
};
