import { ref } from 'vue';
import {
  cbdApiProjectTemplateBuildingFloorSelectGet,
  cbdApiProjectTemplateContractStoreSelectGet,
  cbdApiProjectTemplateEstateSelectGet,
  cbdApiProjectTemplateEstateTypeSelectGet,
  cbdApiProjectTemplateFormatSelectGet,
  cbdApiProjectTemplateMerchantBrandSelectGet,
  cbdApiProjectTemplateMerchantSelectGet,
  cbdApiProjectTemplateStoreAllSelectGet
} from '@/api';
import useFuncProxy from '@/hooks/useFuncProxy';

type ListItemType = {
  label?: string;
  value?: number;
};

export default function () {
  //  楼层
  const floorList = ref<ListItemType[]>([]);
  const [getFloorList] = useFuncProxy(async (projectId: string) => {
    const d = await cbdApiProjectTemplateBuildingFloorSelectGet({
      buildingId: projectId
    });
    floorList.value = d;
  });

  // 铺位类型
  const shopTypeList = ref<ListItemType[]>([]);
  const [getShopTypeList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateEstateTypeSelectGet();
    shopTypeList.value = d;
  });

  // 铺位
  const shopList = ref<ListItemType[]>([]);
  const [getShopList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateEstateSelectGet({
      buildingId: ''
    });
    shopList.value = d;
  });

  // 商户
  const merchantList = ref<ListItemType[]>([]);
  const [getMerchantList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateMerchantSelectGet({
      projectId: ''
    });
    merchantList.value = d;
  });

  // 店铺
  const storeList = ref<ListItemType[]>([]);
  const [getStoreList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateStoreAllSelectGet({
      projectId: '',
      merchantId: '',
      sceneId: ''
    });
    storeList.value = d;
  });

  // 合同
  const contractList = ref<ListItemType[]>([]);
  const [getContractList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateContractStoreSelectGet({
      projectId: ''
    });
    contractList.value = d;
  });

  // 品牌
  const brandList = ref<ListItemType[]>([]);
  const [getBrandList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateMerchantBrandSelectGet({
      projectId: ''
    });
    brandList.value = d;
  });

  // 业态
  const businessList = ref<unknown>([]);
  const [getBusinessList] = useFuncProxy(async () => {
    const d = await cbdApiProjectTemplateFormatSelectGet();
    businessList.value = d;
  });

  return {
    floorList,
    getFloorList,
    shopTypeList,
    getShopTypeList,
    shopList,
    getShopList,
    merchantList,
    getMerchantList,
    storeList,
    getStoreList,
    contractList,
    getContractList,
    brandList,
    getBrandList,
    businessList,
    getBusinessList
  };
}
