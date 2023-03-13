import {
  cbdApiProjectCommonCompanyTreeSelectGet,
  type CbdApiProjectCommonCompanyTreeSelectGetResponse
} from '@/api';
import { ref } from 'vue';
export default function useGetCompanyData() {
  const list = ref<CbdApiProjectCommonCompanyTreeSelectGetResponse>([]);
  cbdApiProjectCommonCompanyTreeSelectGet({}).then((response) => {
    response.forEach(
      (el: CbdApiProjectCommonCompanyTreeSelectGetResponse[0]) => {
        list.value.push(el);
      }
    );
  });
  return [list];
}
