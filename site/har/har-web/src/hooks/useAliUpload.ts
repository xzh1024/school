import { Ref, ref } from 'vue';
import { cbdApiProjectFileDirectUploadSignGet } from '@/api';
import { svcWebFileDirectUploadSignGet } from '@/api/svc-web';
import { getPlatformFlag } from '@/utils';
import {groundPcApiFileDirectUploadSignGet} from "@/api/ground-pc-api";

export function useAliUpload() {
  const params: Ref = ref({});

  async function getSign() {
    try {
      const p = getPlatformFlag();
      switch (p) {
        case 'platform':
          // 上传
          break;
        case 'svc':
          params.value = await svcWebFileDirectUploadSignGet();
          break;
        case 'vms':
          params.value = await groundPcApiFileDirectUploadSignGet();
          break;
        default:
          params.value = await cbdApiProjectFileDirectUploadSignGet();
      }
    } catch (e) {
      console.error(e);
    }
  }
  return { getSign, params };
}
