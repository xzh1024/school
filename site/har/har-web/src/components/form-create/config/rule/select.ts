import uniqueId from '@form-create/utils/lib/unique';
import {
  useClear,
  useDisabled,
  useOptions,
  useRequired,
  useSize
} from '../../utils/index';

const label = '选择器';
const name = 'a-select';

export default {
  icon: 'icon-select',
  label,
  name,
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: label,
      info: '',
      effect: {},
      props: {},
      options: [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' }
      ]
    };
  },
  props() {
    return [
      useRequired(),
      useOptions(),
      useSize(),
      { type: 'switch', field: 'multiple', title: '是否多选' },
      useDisabled(),
      useClear(),
      {
        type: 'inputNumber',
        field: 'max-tag-count',
        title: '多选模式下，最多显示的标签数量。0 表示不限制',
        value: 0,
        props: {
          mode: 'button'
        }
      },
      {
        type: 'inputNumber',
        field: 'limit',
        title: '多选时用户最多可以选择的项目数，为 0 则不限制',
        value: 0,
        props: {
          mode: 'button'
        }
      },
      {
        type: 'input',
        field: 'autocomplete',
        title: 'autocomplete 属性'
      },
      { type: 'input', field: 'placeholder', title: '占位符' },
      {
        type: 'switch',
        field: 'allow-search',
        title: '是否可搜索'
      },
      { type: 'switch', field: 'allow-create', title: '是否允许用户创建新条目' }
    ];
  }
};
