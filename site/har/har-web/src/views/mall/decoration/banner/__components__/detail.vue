<template>
  <drawer v-model="visible" title="banner详情" :footer="false">
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions :label-style="{ 'margin-bottom': '20px' }">
        <a-descriptions-item label="banner名称：">{{
            info.name
          }}</a-descriptions-item>
        <a-descriptions-item label="所属类型：">{{
            typeHash[info.type]
          }}</a-descriptions-item>
        <a-descriptions-item label="跳转地址：">{{
            info && info.detailType
              ? `【${DetailTypeHash[info.detailType]}】${info.detailName}`
              : '--'
          }}</a-descriptions-item>
        <a-descriptions-item label="展示顺序：">
          {{ info.sequence }}
        </a-descriptions-item>
        <a-descriptions-item label="当前状态：" :span="3">{{
            info.status === 1 ? '已上架' : '已下架'
          }}</a-descriptions-item>
        <a-descriptions-item label="banner封面：" :span="3">
          <a-image
            :src="
            info.coverPic && info.coverPic[0] && info.coverPic[0].previewAddress
          "
            width="200"
          ></a-image>
        </a-descriptions-item>
        <!--      <a-descriptions-item label="banner详情：" :span="3">-->
        <!--        <div v-html="info.detail"> </div>-->
        <!--      </a-descriptions-item>-->
      </a-descriptions>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { cbdApiProjectBannerInfoIdGet } from '@/api';
  import type { CbdApiProjectBannerInfoIdGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';

  const typeHash: { [index: number]: string } = {
    1: '热门活动页',
    2: '优质商家页',
    3: '个人中心'
  };
  const DetailTypeHash: { [index: number]: string } = {
    1: '店铺',
    2: '活动'
  };
  const emits = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    bannerId: {
      type: Number,
      required: true
    }
  });
  const info = ref<CbdApiProjectBannerInfoIdGetResponse>({
    id: 0,
    type: 0,
    name: '',
    sequence: 0,
    coverPic: [],
    detailType: 0,
    detailId: 0,
    detailName: '',
    status: 0
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    info.value = await cbdApiProjectBannerInfoIdGet({
      id: String(props.bannerId)
    });
  });
  watch(
    () => props.bannerId,
    () => {
      getData();
    },
    { immediate: true }
  );
</script>
<style scoped></style>
