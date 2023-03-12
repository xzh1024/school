<template>
  <drawer
    v-model="visible"
    title="查看楼宇信息"
    show-log
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_assets_building'
    }"
    @cancel="visible = false"
  >
    <div class="i-card" style="width: 100%">
      <h4 class="block-title" style="padding-top: 0">基本信息</h4>
      <a-descriptions
        table-layout="fixed"
        layout="vertical"
        :column="4"
        style="padding-bottom: 16px"
      >
        <a-descriptions-item label="归属项目：">{{
          baseInfo.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="楼宇名称：">{{
          baseInfo.name
        }}</a-descriptions-item>
        <!--        <a-descriptions-item label="楼宇类型：">{{-->
        <!--          valueFindLabel(projectTypeList, baseInfo.type)-->
        <!--        }}</a-descriptions-item>-->
        <a-descriptions-item label="楼宇编号：">{{
          baseInfo.code
        }}</a-descriptions-item>
        <a-descriptions-item label="所在区域：">{{
          areaStr
        }}</a-descriptions-item>
        <a-descriptions-item label="详细地址：">{{
          otherInfo.address
        }}</a-descriptions-item>
      </a-descriptions>
      <div class="split-bg"></div>
      <h4 class="block-title">楼层信息</h4>
      <a-descriptions style="width: 50%" :column="2">
        <a-descriptions-item label="地上楼层"
          >{{ baseInfo.groundFloorCount }}层</a-descriptions-item
        >
        <a-descriptions-item label="地下楼层"
          >{{ baseInfo.undergroundFloorCount }}层</a-descriptions-item
        >
      </a-descriptions>
      <i-table
        style="padding-bottom: 16px"
        :options="tableProps"
        :data="data.floorList"
      ></i-table>
      <div class="split-bg"></div>
      <h4 class="block-title">其他信息</h4>
      <i-custom-upload
        v-model="otherInfo.attachmentList"
        url-key="previewAddress"
        :options="{
          showUploadButton: false,
          showRemoveButton: false
        }"
      >
      </i-custom-upload>
    </div>
    <template #footer>
      <a-button type="primary" @click="update">修改</a-button>
      <a-button @click="visible = false">返回</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { valueFindLabel } from '@/utils';
  import {
    cbdApiProjectBuildingInfoIdGet,
    cbdApiProjectSysOptPageOptListPost,
    type CbdApiProjectBuildingInfoIdGetResponse
  } from '@/api';
  import useDataDictionary from '@/hooks/useDataDictionary';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    }
  });
  const projectTypeList = useDataDictionary('00003');
  const emits = defineEmits(['update:modelValue', 'update']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const tableProps = ref<Recordable>({
    tableCard: false,
    indexTitle: '序号',
    index: true,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '楼层',
        prop: 'floor'
      },
      {
        label: '楼层名称',
        prop: 'floorName'
      },
      {
        label: '层⾼（m）',
        prop: 'storyHeight'
      },
      {
        label: '层⾯积（㎡）',
        prop: 'area'
      }
    ]
  });
  const data = ref<CbdApiProjectBuildingInfoIdGetResponse>({
    baseInfo: {},
    areaInfo: {},
    otherInfo: {},
    floorList: []
  });
  const baseInfo = computed(() => data.value.baseInfo!);
  const otherInfo = computed(() => data.value.otherInfo!);
  const areaStr = computed(() => {
    const {
      provinceName = '',
      cityName = '',
      districtName = ''
    } = otherInfo.value!;
    return provinceName + cityName + districtName || '--';
  });
  const [getDetailData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectBuildingInfoIdGet({ id: props.id! + '' });
  });
  getDetailData();
  const update = () => {
    emits('update');
  };
  watch(
    () => props.refresh,
    () => {
      if (props.id) {
        getDetailData();
      }
    }
  );
</script>
<style scoped lang="less"></style>
