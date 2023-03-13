import { ref } from 'vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import {
  svcWebCommonProjectSelectPost,
  SvcWebCommonProjectSelectPostResponse
} from '@/api/svc-web';

const svcProjectDropList = ref<SvcWebCommonProjectSelectPostResponse>([]);
const [getSvcProjectDrop] = useFuncProxy(async (v = '') => {
  svcProjectDropList.value = await svcWebCommonProjectSelectPost({
    name: v
  });
});
export { svcProjectDropList, getSvcProjectDrop };
