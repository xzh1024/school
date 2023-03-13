<template>
  <div style="width: 100%" class="i-card">
    <div class="block-title" style="padding-top: 0">基本信息</div>
    <a-descriptions
      :column="4"
      layout="vertical"
      :value-style="{ paddingBottom: '20px' }"
    >
      <a-descriptions-item label="归属项目：">{{
        data.projectName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="归属楼宇：">{{
        data.buildingName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="归属楼层：">{{
        data.floorName || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="楼宇编号：">{{
        data.code || data.id
      }}</a-descriptions-item>
      <a-descriptions-item label="铺位类型：">{{
        valueFindLabel(shopLocationTypeList, data.categoryId)
      }}</a-descriptions-item>
      <a-descriptions-item label="建筑面积：">{{
        data.acreage
      }}</a-descriptions-item>
      <a-descriptions-item label="使用面积：">{{
        data.useAcreage || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="底价日租金：">{{
        data.bottomDayRent || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="底价月租金：">{{
        data.bottomMonthRent || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="基准日租金：">{{
        data.datumDayRent || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="基准月租金：">{{
        data.datumMonthRent || '--'
      }}</a-descriptions-item>
      <a-descriptions-item label="描述：">{{
        data.remark || '--'
      }}</a-descriptions-item>
    </a-descriptions>
    <!--    <div class="split-bg"></div>-->
    <div class="block-title">其他信息</div>
    <i-custom-upload
      :model-value="data.attachments"
      url-key="previewAddress"
      :options="{
        showUploadButton: false,
        showRemoveButton: false
      }"
    >
    </i-custom-upload>
  </div>
</template>

<script setup lang="ts">
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { valueFindLabel } from '@/utils';
  import { PropType } from 'vue';
  import useDictData from '@/hooks/useDictData';
  const [shopLocationTypeList] = useDictData('00005');
  type dataType = {
    projectName: string;
    buildingName: string;
    floorName: string;
    code: string;
    id?: string;
    categoryId: number;
    acreage: string;
    useAcreage: string;
    remark: string;
    other: string;
    bottomDayRent: string;
    bottomMonthRent: string;
    datumDayRent: string;
    datumMonthRent: string;
    attachments: Recordable;
  };
  defineProps({
    data: {
      type: Object as PropType<dataType>,
      default: () => {
        return {
          attachments: []
        };
      }
    }
  });
</script>
<style scoped lang="less"></style>
