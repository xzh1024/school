import { groundPcApiCommonVenueSelectListGet } from '@/api/ground-pc-api';
import { ref } from 'vue';

//导出获取店铺下拉调用&&店铺下拉值
export function useVenueOptions() {
  const venueOptions = ref<{ label: string; value: number }[]>();

  async function getVenueOptions(params: Object) {
    try {
      const d = await groundPcApiCommonVenueSelectListGet(params);
      venueOptions.value = d.map((it) => {
        return {
          label: it.name,
          value: it.id
        };
      });
    } catch (e) {
      console.error(e);
    }
  }
  return { getVenueOptions, venueOptions };
}
