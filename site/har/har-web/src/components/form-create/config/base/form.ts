import { useSize } from '../../utils';
export default function form() {
  return [
    {
      type: 'radio',
      field: 'layout',
      value: 'horizontal',
      title: '布局方式',
      options: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '纵向' },
        { value: 'inline', label: '内联' }
      ],
      props: {
        type: 'button'
      }
    },
    useSize(),
    {
      type: 'radio',
      field: 'label-align',
      value: 'right',
      title: '对齐方向',
      options: [
        { value: 'left', label: '左对齐' },
        { value: 'right', label: '右对齐' }
      ],
      props: {
        type: 'button'
      }
    },
    {
      type: 'switch',
      field: 'auto-label-width',
      value: false,
      title: '标签宽度自适应'
    },
    {
      type: 'switch',
      field: 'auto-label-width',
      value: false,
      title: '标签宽度自适应'
    },
    {
      type: 'switch',
      field: 'formCreateSubmitBtn',
      value: false,
      title: '是否显示表单提交按钮'
    },
    {
      type: 'switch',
      field: 'formCreateResetBtn',
      value: false,
      title: '是否显示表单重置按钮'
    }
  ];
}
