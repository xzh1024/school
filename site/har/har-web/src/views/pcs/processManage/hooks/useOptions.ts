import { ref } from 'vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import {
  flowableEngineDeptDeptTreeGet,
  flowableEngineRoleListGet,
  flowableEngineUserListGet
} from '@/api/flowable-engine';

type OptionItemType = { label: string; value: string };

export function useOptions() {
  const userOptionsList = ref<OptionItemType[]>([]);
  const roleOptionsList = ref<OptionItemType[]>([]);
  const deptOptionsList = ref<any>([]);

  const [getUserOptionList] = useFuncProxy(async () => {
    const d = await flowableEngineUserListGet({
      pageNum: '1',
      pageSize: '99999'
    });
    userOptionsList.value =
      d.rows?.map((it) => {
        return {
          label: it.nickName || '',
          value: `${it.userCode}`
        };
      }) || [];
  });

  const [getRoleOptionList] = useFuncProxy(async () => {
    const d = await flowableEngineRoleListGet();
    roleOptionsList.value =
      d?.map((it) => {
        return {
          label: it.roleName || '',
          value: `${it.roleCode}`
        };
      }) || [];
  });

  const [getDeptOptionList] = useFuncProxy(async () => {
    const d = await flowableEngineDeptDeptTreeGet();
    deptOptionsList.value = (d || []).map((item) => {
      // @ts-ignore
      item.children = (item.children || []).map((it) => {
        return {
          label: it.label,
          id: `${it.id}`
        };
      });

      return {
        label: item.label,
        id: `${item.id}`
      };
    });
  });

  return {
    userOptionsList,
    roleOptionsList,
    deptOptionsList,
    getUserOptionList,
    getRoleOptionList,
    getDeptOptionList
  };
}
