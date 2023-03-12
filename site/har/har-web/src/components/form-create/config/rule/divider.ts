const label = '分割线';
const name = 'a-divider';

export default {
  icon: 'icon-divider',
  label,
  name,
  rule() {
    return {
      type: name,
      props: {},
      wrap: { show: false },
      native: false,
      children: ['']
    };
  },
  props() {
    return [
      {
        type: 'select',
        field: 'direction',
        title: '设置分割线方向',
        value: 'vertical',
        options: [
          { label: 'horizontal', value: 'horizontal' },
          { label: 'vertical', value: 'vertical' }
        ]
      },
      {
        type: 'input',
        field: 'formCreateChild',
        title: '设置分割线文案',
        value: ''
      },
      {
        type: 'select',
        field: 'orientation',
        title: '设置分割线文案的位置',
        value: 'center',
        options: [
          { label: '居左', value: 'left' },
          { label: '居右', value: 'right' },
          { label: '居中', value: 'center' }
        ]
      }
    ];
  }
};
