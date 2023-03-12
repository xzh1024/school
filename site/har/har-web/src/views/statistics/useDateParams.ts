import { Ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { formatTime } from '@/utils';

export default function useDateParams(
  dateType: Ref<number>,
  dateValue: Ref<Array<Date | string | number>>
) {
  const t = dateType.value!;
  if (!(dateValue.value && dateValue.value.length)) {
    Message.error('请选择年月');
    return [];
  }
  let startDate = formatTime(dateValue.value[0] as string, 'YYYY-MM-DD');
  let endDate = formatTime(dateValue.value[1] as string, 'YYYY-MM-DD');
  if (t === 2) {
    startDate = formatTime(dateValue.value[0] as string, 'YYYY-MM');
    endDate = formatTime(dateValue.value[1] as string, 'YYYY-MM');
  }
  if (t === 3) {
    startDate = formatTime(dateValue.value[0] as string, 'YYYY');
    endDate = formatTime(dateValue.value[1] as string, 'YYYY');
  }
  return [startDate, endDate];
}
