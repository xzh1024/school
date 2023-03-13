<template>
  <drawer v-model="visible" title="收银机查询" :footer="false">
    <div class="white-detail-box">
      <a-divider orientation="left">收银机信息</a-divider>
      <a-descriptions :columns="3">
        <a-descriptions-item label="收银机编号">
          {{ info.code }}
        </a-descriptions-item>
        <a-descriptions-item label="收银机类型">
          {{ info.type === 1 ? '手持' : '台式' }}
        </a-descriptions-item>
        <a-descriptions-item label="服务器地址">
          {{ info.serverUrl }}
        </a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">店铺信息</a-divider>
      <i-table :options="options" :data="shopInfoData"></i-table>
      <a-divider orientation="left">客显信息</a-divider>
      <a-row>
        <a-col :span="12">
          <img
            v-if="isImgShow"
            class="img-temp"
            src="@/assets/images/cashier-pic.png"
            alt=""
          />
        </a-col>
        <a-col :span="11" :offset="1">
          <a-image
            v-for="(item, idx) in viceView && viceView.resourceList"
            :key="idx"
            :src="item.previewAddress"
            width="80"
            height="80"
          ></a-image>
          <p>每条数据时间间隔（秒）：{{ viceView.intervalTime || '--' }}</p>
        </a-col>
      </a-row>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectCashierInfoIdGet,
    type CbdApiProjectCashierInfoIdGetResponse
  } from '@/api';

  type ShopInfos = CbdApiProjectCashierInfoIdGetResponse['storeInfo'];
  type ViewInfoType =
    Required<CbdApiProjectCashierInfoIdGetResponse>['viewInfo'][0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const emits = defineEmits(['update:modelValue']);
  const options = ref<Recordable>({
    index: true,
    indexTitle: '序号',
    tableCard: false,
    menu: false,
    pageShow: false,
    columns: [
      { label: '店铺号', prop: 'code' },
      { label: '店铺名称', prop: 'name' },
      { label: '经营业态', prop: 'scene' }
      // { label: '经营品牌', prop: 'brand' }
    ]
  });
  const info = ref<CbdApiProjectCashierInfoIdGetResponse>({
    viewInfo: []
  });
  const isImgShow = computed(() => {
    return info.value.viewInfo!.find((e) => e.type === 1);
  });
  const viceView = computed<ViewInfoType>(() => {
    return info.value.viewInfo!.find((e) => e.type === 2) || {};
  });
  const shopInfoData = computed<ShopInfos[]>(() => {
    return info.value.storeInfo ? [info.value.storeInfo] : [];
  });
  const [getData] = useFuncProxy(async () => {
    info.value = await cbdApiProjectCashierInfoIdGet({ id: props.id });
  });
  onMounted(() => {
    if (props.id) getData();
  });
</script>

<style scoped lang="less">
  .img-temp {
    width: 100%;
  }
</style>
