import { useSize } from '../../utils';

const label = '表格';
const name = 'a-table';

const columns = [
  { title: '表格列1', prop: 'prop1' },
  { title: '表格列2', prop: 'prop2' }
];

export default {
  icon: 'icon-editor',
  label,
  name,
  mask: false,
  rule() {
    return {
      type: 'a-table',
      props: {
        columns: columns,
        style: `marginBottom: 20px`
      }
    };
  },
  props() {
    return [
      {
        type: 'Struct',
        field: 'columns',
        title: '表格列',
        props: {
          defaultValue: [],
          title: '表格列'
        }
      },
      {
        type: 'switch',
        field: 'bordered',
        title: '是否显示边框',
        value: true
      },
      {
        type: 'switch',
        field: 'stripe',
        title: '是否开启斑马纹效果',
        value: false
      },
      useSize()
    ];
  }
};
