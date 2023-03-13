<template>
  <div class="container">
    <div class="container-basic">
      <p class="container-basic-information"
        >房源门牌号：{{ basicData.doorPlate }}</p
      >
      <p class="container-basic-information">
        房源面积：{{ basicData.acreage }}.00m²
      </p>
      <p class="container-basic-information"> 地址：{{ basicData.address }} </p>
    </div>
    <div class="container-basic">
      <p class="container-basic-information">
        项目名称：{{ basicData.projectName }}
      </p>
      <p class="container-basic-information">
        房源类型：{{ basicData.categoryName }}
      </p>
    </div>
    <div class="container-basic">
      <p class="container-basic-information">
        归属楼宇：{{ basicData.buildingName }}
      </p>
      <p class="container-basic-information">
        房源编号：{{ basicData.code }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { cbdApiProjectAssetEstateInfoEstateIdGet } from '@/api';

  interface Props {
    estateId: number | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    estateId: null
  });
  const basicData = ref<any>({
    projectName: '', // 项目
    buildingName: '', // 楼宇
    floorName: '', // 房源楼层
    doorPlate: '', // 门牌号
    categoryName: '', // 类型
    code: '', // 编号
    acreage: '', // 面积
    provinceCode: '', // 省编号
    provinceName: '', // 省
    cityCode: '', // 市编号
    cityName: '', // 市
    districtCode: '', // 区县编号
    districtName: '', // 区县
    address: '' // 详细地址
  });

  const estateId = computed(() => {
    return props.estateId;
  });

  onMounted(() => {
    // eslint-disable-next-line no-use-before-define
    handleBasicInformation();
  });
  /**
   * @param { 获取房源详情 }
   * @param { estateId } id
   */
  const handleBasicInformation = async () => {
    const res = await cbdApiProjectAssetEstateInfoEstateIdGet({
      estateId: estateId.value as unknown as string
    });
    basicData.value = res;
  };
</script>

<style lang="less" scoped>
  @import './basicInformation.less';
</style>
