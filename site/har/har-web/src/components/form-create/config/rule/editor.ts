import uniqueId from '@form-create/utils/lib/unique';
import { useRequired } from '../../utils';

const label = '富文本框';
const name = 'fc-editor';

export default {
  icon: 'icon-editor',
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
      { type: 'switch', field: 'disabled', title: '是否禁用' }
    ];
  }
};
