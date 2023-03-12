import { useSize } from '../../utils';

const label = '按钮';
const name = 'a-button';

export default {
  icon: 'icon-button',
  label,
  name,
  mask: false,
  rule() {
    return {
      type: name,
      props: {},
      children: ['按钮']
    };
  },
  props() {
    return [
      {
        type: 'input',
        field: 'formCreateChild',
        title: '内容'
      },
      useSize(),
      {
        type: 'select',
        field: 'type',
        title: '类型',
        options: [
          { label: 'primary', value: 'primary' },
          { label: 'secondary', value: 'secondary' },
          { label: 'outline', value: 'outline' },
          { label: 'dashed', value: 'dashed' },
          { label: 'text', value: 'text' }
        ]
      },
      {
        type: 'select',
        field: 'status',
        title: '状态',
        options: [
          { label: 'normal', value: 'normal' },
          { label: 'warning', value: 'warning' },
          { label: 'success', value: 'success' },
          { label: 'danger', value: 'danger' }
        ]
      },
      {
        type: 'select',
        field: 'shape',
        title: '形状',
        options: [
          { label: 'square', value: 'square' },
          { label: 'round', value: 'round' },
          { label: 'circle', value: 'circle' }
        ]
      },
      { type: 'switch', field: 'long', title: '是否宽度自适应' }
    ];
  }
};
