import uniqueId from '@form-create/utils/lib/unique';
import { useDisabled, useRequired } from '../../utils';

const label = '颜色选择器';
const name = 'a-colorPicker';

export default {
  icon: 'icon-color',
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
        type: 'switch',
        field: 'showAlpha',
        title: '是否支持透明度选择'
      },
      {
        type: 'select',
        field: 'colorFormat',
        title: '颜色的格式',
        options: [
          { label: 'hsl', value: 'hsl' },
          { label: 'hsv', value: 'hsv' },
          {
            label: 'hex',
            value: 'hex'
          },
          { label: 'rgb', value: 'rgb' }
        ]
      }
    ];
  }
};
