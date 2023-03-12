const label = '栅格布局';
const name = 'a-row';

export default {
  icon: 'icon-row',
  label,
  name,
  mask: false,
  rule() {
    return {
      type: 'a-row',
      props: {},
      children: []
    };
  },
  children: 'a-col',
  props() {
    return [
      {
        type: 'inputNumber',
        field: 'gutter',
        title: '栅格间隔',
        value: 0,
        props: { mode: 'button' }
      },
      // {
      //   type: 'switch',
      //   field: 'type',
      //   title: 'flex布局模式',
      //   value: true,
      //   props: { activeValue: 'flex', inactiveValue: 'default' }
      // },
      {
        type: 'select',
        field: 'justify',
        title: 'flex 布局下的水平排列方式',
        value: 'start',
        options: [
          { label: '左对齐', value: 'start' },
          { label: '剧中对齐', value: 'center' },
          { label: '右对齐', value: 'end' },
          { label: '间隔等分', value: 'space-around' },
          { label: '两端对齐', value: 'space-between' }
        ]
      },
      {
        type: 'select',
        field: 'align',
        title: 'flex 布局下的垂直排列方式',
        value: 'start',
        options: [
          { label: '顶部对齐', value: 'start' },
          { label: '上下居中对齐', value: 'center' },
          { label: '底部对齐', value: 'end' },
          { label: '自适应', value: 'stretch' }
        ]
      }
    ];
  }
};
