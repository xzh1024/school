<template>
  <drawer v-model="visible" title="查看店铺" show-log>
    <div class="detail-box">
      <div class="i-card">
        <a-descriptions :column="4" table-layout="fixed" layout="vertical">
          <a-descriptions-item label="项目名称">{{
            data.projectName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺名称">{{
            data.name || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="客服电话">{{
            data.customerServiceTel || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="门店地址">{{
            data.address || '--'
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions :column="1" layout="vertical">
          <a-descriptions-item label="服务设施">
            <a-space>
              <p
                v-for="i in activeFeatures"
                :key="i.value"
                style="margin: 0; padding-bottom: 10px"
                >{{ i.label }}</p
              >
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item label="店招">
            <i-custom-upload
              :model-value="[data.storeLogoAttachment]"
              url-key="previewAddress"
              :options="{
                showUploadButton: false,
                showRemoveButton: false
              }"
            />
          </a-descriptions-item>
          <a-descriptions-item label="其他图片">
            <i-custom-upload
              v-model="data.storePhotoAttachments"
              url-key="previewAddress"
              :options="{
                showUploadButton: false,
                showRemoveButton: false
              }"
            />
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <a-descriptions :column="4" table-layout="fixed" layout="vertical">
          <a-descriptions-item label="营业状态">{{
            data.operatingStatus ? statusDic[data.operatingStatus] : '--'
          }}</a-descriptions-item>
        </a-descriptions>
        <a-descriptions
          title="营业时间"
          :column="4"
          table-layout="fixed"
          layout="vertical"
        >
          <a-descriptions-item
            v-for="item in data.openTimes"
            :key="item.week"
            :label="'星期' + weekDic[item.week]"
          >
            {{ item.startTime }}~{{ item.endTime }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button type="primary" @click="handleEditShop">编辑</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { Ref, ref, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { useRequest } from '@har/use';
  import { weekDic } from '@/utils/dic';
  import {
    groundPcApiCommonStoreFeatureSelectGet,
    GroundPcApiCommonStoreFeatureSelectGetResponse,
    groundPcApiStoreOperationInfoIdGet,
    GroundPcApiStoreOperationInfoIdGetResponse
  } from '@/api/ground-pc-api';
  type EachFeature = GroundPcApiCommonStoreFeatureSelectGetResponse[number];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refreshDetail: {
      type: Boolean,
      default: false
    },
    shopId: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:refresh', 'edit']);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const handleEditShop = () => {
    emits('edit', { id: props.shopId });
  };
  const statusDic: { [index: number]: string } = {
    0: '试营业',
    1: '营业中',
    2: '打烊'
  };
  const data = ref<GroundPcApiStoreOperationInfoIdGetResponse>({
    id: 0,
    projectId: 0,
    customerServiceTel: '',
    address: '',
    projectName: '',
    name: '',
    features: [],
    openTimes: [],
    storeLogoAttachment: {},
    storePhotoAttachments: [],
    operatingStatus: 0
  });
  const { run: getShopInfo } = useRequest(groundPcApiStoreOperationInfoIdGet, {
    manual: true,
    onSuccess(res) {
      data.value = res;
    }
  });
  const activeFeatures = computed(() => {
    return featuresList.value.filter((e: EachFeature) =>
      (data.value.features || []).includes(e.value)
    );
  });
  const featuresList = ref<GroundPcApiCommonStoreFeatureSelectGetResponse>([]);
  const { run: getFeatures } = useRequest(
    groundPcApiCommonStoreFeatureSelectGet,
    {
      manual: true,
      onSuccess(res) {
        featuresList.value = res;
      }
    }
  );
  onMounted(() => {
    getShopInfo({
      id: props.shopId
    });
    getFeatures();
  });
  watch(
    () => props.shopId,
    (v) => {
      if (v) {
        getShopInfo({
          id: props.shopId
        });
      }
    },
    { immediate: true }
  );
  watch(
    () => props.refreshDetail,
    () => {
      getShopInfo({
        id: props.shopId
      });
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .detail-box {
    width: 100%;
    min-height: 100%;
  }
</style>
