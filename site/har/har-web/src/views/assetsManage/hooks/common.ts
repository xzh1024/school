import { ref } from 'vue';
import {
  cbdApiProjectCommonProjectSelectListGet,
  cbdApiProjectCommonBuildingListSelectGet,
  cbdApiProjectCommonBuildingFloorListSelectGet,
  cbdApiProjectCommonEstateSelectListGet,
  CbdApiProjectCommonBuildingFloorListSelectGetResponse
} from '@/api';
import useFuncProxy from '@/hooks/useFuncProxy';
import useDataDictionary from '@/hooks/useDataDictionary';

type ListItemType = {
  value?: number;
  label?: string;
};
export function useFilter(onGetProjectList: Function) {
  let flag = true;
  // 项目下拉
  const projectList = ref<ListItemType[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonProjectSelectListGet({});
    projectList.value = res;
    if (flag) {
      onGetProjectList?.();
      flag = false;
    }
  });

  // 楼宇下拉
  const buildingList = ref<ListItemType[]>([]);
  const [getBuildingList] = useFuncProxy(async (projectId: string) => {
    if (!projectId) return;
    const res = await cbdApiProjectCommonBuildingListSelectGet({
      projectId: projectId
    });
    buildingList.value = res;
  });

  // 楼层下拉
  const floorList = ref<ListItemType[]>([]);
  const [getFloorList] = useFuncProxy(async (buildingId: string) => {
    let res: CbdApiProjectCommonBuildingFloorListSelectGetResponse = [];
    if (buildingId) {
      res = await cbdApiProjectCommonBuildingFloorListSelectGet({
        buildingId: buildingId
      });
    }
    floorList.value = res;
  });

  // 铺位 / 房源 下拉
  const shopList = ref<ListItemType[]>([]);
  const [getShopList] = useFuncProxy(async (floorId: string) => {
    const res = await cbdApiProjectCommonEstateSelectListGet({
      floorId: floorId
    });
    shopList.value = res;
  });

  const shopTypeList = useDataDictionary('00005');

  // 铺位 / 房源 状态
  const shopStatusData = [
    { label: '启用', value: 0 },
    { label: '禁用', value: 1 }
  ];

  return {
    projectList,
    getProjectList,

    buildingList,
    getBuildingList,

    floorList,
    getFloorList,

    shopList,
    getShopList,

    shopTypeList,

    shopStatusData
  };
}
