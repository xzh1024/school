<template>
  <a-tabs type="line">
    <a-tab-pane v-if="[2, 3, 4].includes(houseStatus)" key="1" title="经营情况">
      <manage />
    </a-tab-pane>
    <a-tab-pane v-if="[2, 3, 4].includes(houseStatus)" key="2" title="缴费记录">
      <pay-record />
    </a-tab-pane>
    <a-tab-pane key="3" title="基本信息">
      <a-descriptions
        :data="detail.basicData.data"
        :value-style="listItemStyle"
      >
        <descriptions-item
          v-for="(item, idx) in basicInfoItems"
          :key="idx"
          :span="item.span || 1"
          :label="item.label + '：'"
        >
          {{ useFormatDescription(detail.basicData.data, item) }}
        </descriptions-item>
      </a-descriptions>
    </a-tab-pane>
    <a-tab-pane
      v-if="[1, 2, 3, 4].includes(houseStatus)"
      key="4"
      title="合同信息"
    >
      <contract />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import { reactive, inject } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectLeaseRecordBasicInfoGet,
    CbdApiProjectLeaseRecordBasicInfoGetRequest
  } from '@/api';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import { ListDataType, listItemStyle } from '@/utils/dic';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import Manage from './manage/manage.vue';
  import PayRecord from './pay-record/index.vue';
  import Contract from './contract/index.vue';

  defineProps({
    houseStatus: {
      type: Number,
      default: -1
    }
  });

  const basicInfoItems: Array<ListDataType> = [
    {
      label: '房源门牌号',
      prop: 'doorPlate'
    },
    {
      label: '项目名称',
      prop: 'projectName'
    },
    {
      label: '归属楼宇',
      prop: 'buildingName'
    },
    {
      label: '房源面积',
      prop: 'acreage',
      hasUnit: true,
      unit: '㎡'
    },
    {
      label: '房源类型',
      prop: 'categoryName'
    },
    {
      label: '房源编号',
      prop: 'code'
    },
    {
      label: '地址',
      prop: 'address',
      span: 3
    },
    {
      label: '出租类型',
      prop: 'leasePurposeName'
    },
    {
      label: '经营业态',
      prop: 'manageName'
    },
    {
      label: '费用类型',
      prop: 'costType'
    }
  ];
  const detail = reactive<any>({
    basicData: {
      data: {
        address: ''
      }
    }
  });
  const [getInfo] = useFuncProxy(async () => {
    const houseId = inject<any>('houseId');
    const contractId = inject<any>('contractId');
    const res = await cbdApiProjectLeaseRecordBasicInfoGet({
      id: houseId.value,
      contractId: contractId.value
    } as CbdApiProjectLeaseRecordBasicInfoGetRequest);
    detail.basicData.data = res;
    detail.basicData.data.address =
      res.provinceName! + res.cityName + res.districtName + res.address;
  });
  getInfo();
</script>

<style scoped></style>
