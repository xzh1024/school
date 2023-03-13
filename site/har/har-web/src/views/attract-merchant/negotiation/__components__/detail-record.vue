<template>
  <drawer v-model="visible" title="查看" @cancel="visible = false">
    <div class="detail-wrapper">
      <div class="block-title">基本信息</div>
      <a-descriptions :column="4" layout="vertical" style="width: 100%">
        <a-descriptions-item label="归属项目：">{{
          info.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="编号：">{{
          info.code
        }}</a-descriptions-item>
        <a-descriptions-item label="计划名称：">{{
          info.planName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="铺位类型：">{{
          info.leaseName || '--'
        }}</a-descriptions-item>
        <a-descriptions-item label="目标商户：">{{
          info.merchantName
        }}</a-descriptions-item>
        <a-descriptions-item label="渠道：">{{
          info.address
        }}</a-descriptions-item>
        <a-descriptions-item label="开始时间：">{{
          formatTime(info.negotiateDate, 'YYYY-MM-DD') +
          ' ' +
          info.negotiateStime
        }}</a-descriptions-item>
        <a-descriptions-item label="结束时间：">{{
          formatTime(info.negotiateDate, 'YYYY-MM-DD') +
          ' ' +
          info.negotiateEtime
        }}</a-descriptions-item>
      </a-descriptions>
      <i-table
        style="width: 100%; margin-bottom: 16px"
        :options="buildingProps"
        :data="floorList"
      ></i-table>
      <div class="split-bg"></div>
      <a-descriptions
        style="width: 100%; padding-top: 15px"
        :column="4"
        :title="valueFindLabel(negotiateStageList, info.negotiateStage)"
        layout="vertical"
      >
        <a-descriptions-item label="商户名称">{{
          info.merchantName
        }}</a-descriptions-item>
        <a-descriptions-item label="意向品牌">
          {{ info.brandName }}
        </a-descriptions-item>
        <a-descriptions-item label="谈判模式">
          {{ info.negotiateMode === 1 ? '电话沟通' : '拜访客户' }}
        </a-descriptions-item>
        <a-descriptions-item label="谈判日期">{{
          formatTime(info.negotiateDate, 'YYYY-MM-DD')
        }}</a-descriptions-item>
        <a-descriptions-item label="谈判时间">{{
          info.negotiateStime + '~' + info.negotiateEtime
        }}</a-descriptions-item>
        <a-descriptions-item label="谈判地址">{{
          info.address
        }}</a-descriptions-item>
        <a-descriptions-item label="租赁意向">{{
          info.leaseType
        }}</a-descriptions-item>
        <a-descriptions-item label="意向铺位">{{
          info.estateName
        }}</a-descriptions-item>
        <a-descriptions-item label="意向面积">{{
          info.expectMinArea + '~' + info.expectMaxArea
        }}</a-descriptions-item>
        <a-descriptions-item label="期望起租日期">{{
          formatTime(info.expectLeaseDate, 'YYYY-MM-DD')
        }}</a-descriptions-item>
        <a-descriptions-item label="期望租期">{{
          info.expectLeaseMonth
        }}</a-descriptions-item>
        <a-descriptions-item label="期望租金范围">{{
          info.expectMinRent + '~' + info.expectMaxRent
        }}</a-descriptions-item>
        <a-descriptions-item label="租赁意向">{{
          info.negotiateContent
        }}</a-descriptions-item>
      </a-descriptions>
      <div class="split-bg"></div>
      <a-descriptions
        style="width: 100%; padding-top: 15px"
        :column="4"
        title="附件信息"
        layout="vertical"
      >
        <i-custom-upload
          v-model="info.negotiateAnnexList"
          url-key="previewAddress"
          :options="{
            showRemoveButton: false,
            showUploadButton: false
          }"
        ></i-custom-upload>
      </a-descriptions>
      <div class="split-bg"></div>
      <a-descriptions
        style="width: 100%; padding-top: 15px"
        :column="1"
        title="谈判人员"
        layout="vertical"
      >
        <a-descriptions-item label="我方参会人员">
          {{ handlePerson(info.attendeeList || []) }}
        </a-descriptions-item>
        <a-descriptions-item label="客户对接人">{{
          handlePerson(info.customerList || [])
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <template #footer>
      <a-button @click="onEdit">编辑</a-button>
      <a-button type="primary" @click="emits('ok')">确定</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { formatTime, valueFindLabel } from '@/utils';
  import { negotiateStageList } from '@/utils/dic';
  import {
    cbdApiProjectInvestPlanDetailIdGet,
    cbdApiProjectNegotiateInfoGet,
    CbdApiProjectNegotiateInfoGetResponse
  } from '@/api';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  });
  const emits = defineEmits(['update:modelValue', 'ok', 'edit']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  function handlePerson(arr: { userId?: number; name?: string }[]) {
    let t = '';
    arr.forEach((e: { userId?: number; name?: string }) => {
      t += (e.name || '') + '、';
    });
    return t.slice(0, t.length - 1);
  }
  const info = ref<CbdApiProjectNegotiateInfoGetResponse & { code?: string }>(
    {} as CbdApiProjectNegotiateInfoGetResponse & { code?: string }
  );
  const buildingProps = ref<Recordable>({
    tableCard: false,
    indexTitle: '序号',
    index: true,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '楼宇',
        prop: 'buildingName'
      },
      {
        label: '楼层名称',
        prop: 'floorName'
      },
      {
        label: '建筑面积（㎡）',
        prop: 'acreage'
      },
      {
        label: '使用面积（㎡）',
        prop: 'useAcreage'
      }
    ]
  });
  const [getDetailData] = useFuncProxy(async () => {
    info.value = await cbdApiProjectNegotiateInfoGet({
      recordId: props.id
    });
    getData();
  });
  const floorList = ref<any[]>([]);
  const [getData] = useFuncProxy(async () => {
    const { buildingName, floorName, acreage, useAcreage, estateName } =
      await cbdApiProjectInvestPlanDetailIdGet({
        id: info.value.planId + ''
      });
    floorList.value = [
      {
        buildingName,
        floorName,
        acreage,
        useAcreage,
        estateName
      }
    ];
  });
  const onEdit = () => {
    emits('edit', props.id);
  };
  onMounted(() => {
    getDetailData();
  });
</script>
<style scoped lang="less">
  .detail-wrapper {
    width: 100%;
    padding: 0 16px 16px;
    background-color: #fff;
  }
</style>
