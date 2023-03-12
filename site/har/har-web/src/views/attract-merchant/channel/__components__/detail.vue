<template>
  <drawer v-model="visible" title="查看渠道信息" @cancel="visible = false">
    <div class="i-card" style="width: 100%">
      <div class="block-title">基本信息</div>
      <a-descriptions
        style="width: 100%; padding-bottom: 16px"
        :column="4"
        layout="vertical"
      >
        <a-descriptions-item label="归属项目：">{{
          data.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="编号：">{{
          data.code
        }}</a-descriptions-item>
        <a-descriptions-item label="渠道类型：">{{
          valueFindLabel(channelTypeList, data.type)
        }}</a-descriptions-item>
        <a-descriptions-item label="渠道名称：">{{
          data.name
        }}</a-descriptions-item>
        <a-descriptions-item label="办公地址：">{{
          data.address
        }}</a-descriptions-item>
        <a-descriptions-item label="主要负责人姓名：">{{
          data.principalName
        }}</a-descriptions-item>
        <a-descriptions-item label="主要负责人职位：">{{
          data.principalPost
        }}</a-descriptions-item>
        <a-descriptions-item label="主要负责人联系方式：">{{
          data.principalPhone
        }}</a-descriptions-item>
      </a-descriptions>
      <div class="split-bg"></div>
      <div class="block-title">其他人员</div>
      <i-table
        style="width: 100%; padding-bottom: 16px"
        :options="tableProps"
        :data="others"
      ></i-table>
      <div class="split-bg"></div>
      <div class="block-title">附件信息</div>
      <i-custom-upload
        v-model="data.attachmentPic"
        url-key="previewAddress"
        :options="{
          showUploadButton: false,
          showRemoveButton: false
        }"
      >
      </i-custom-upload>
    </div>
    <template #footer>
      <a-button v-permission="['invest:channel:update']" @click="update"
        >修改</a-button
      >
      <a-button type="primary" @click="visible = false">返回</a-button>
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
  import { channelTypeList } from '@/utils/dic';
  import { cbdApiProjectInvestChannelInfoIdGet } from '@/api';
  import type { OtherItem } from './add';
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
  const emits = defineEmits(['update:modelValue', 'update']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const data = ref<any>({});
  const others = ref<OtherItem[]>([]);
  const tableProps = ref<Recordable>({
    tableCard: false,
    indexTitle: '序号',
    index: true,
    menu: false,
    pageShow: false,
    columns: [
      {
        label: '姓名',
        prop: 'name'
      },
      {
        label: '电话',
        prop: 'phone'
      },
      {
        label: '职务',
        prop: 'post'
      }
    ]
  });
  const [getDetailData] = useFuncProxy(async () => {
    const res = await cbdApiProjectInvestChannelInfoIdGet({
      id: props.id! + ''
    });
    data.value = res.baseInfo;
    data.value.attachmentPic = res.baseInfo!.attachmentPic!;
    others.value = res.channelMemberInfoList as OtherItem[];
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
