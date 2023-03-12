import { useSize } from '../../utils';

const label = '间距';
const name = 'a-space';

export default {
  icon: 'icon-space',
  label,
  name,
  rule() {
    return {
      type: name,
      wrap: {
        show: false
      },
      native: false,
      style: {
        width: '100%',
        height: '20px'
      },
      children: []
    };
  },
  props() {
    return [
      {
        type: 'radio',
        field: 'direction',
        title: '间距方向',
        value: 'horizontal',
        options: [
          { label: 'horizontal', value: 'horizontal' },
          { label: 'vertical', value: 'vertical' }
        ],
        props: {
          type: 'button'
        }
      },
      useSize()
    ];
  }
};
