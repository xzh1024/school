<template>
  <drawer
    v-model="visible"
    show-log
    :options="{ footer: false }"
    title="查看"
    :width="800"
  >
    <div class="detail-box">
      <a-descriptions
        :data="formDataColumn.basicInfo"
        title="基本信息"
        layout="inline-vertical"
        :column="4"
        :label-style="{
          fontSize: '14px',
          color: '#999',
          paddingTop: '16px',
          paddingBottom: '8px'
        }"
      >
        <descriptions-item
          v-for="(item, index) of formDataColumn.basicInfo"
          :key="index"
          :span="1"
          :label="item.label"
        >
          {{ formData[item.value] ? formData[item.value] : '--' }}
        </descriptions-item>
      </a-descriptions>
      <div class="footer-box">
        <a-button
          class="i-drawer-btn margin-right-8 bg-blue-dark"
          @click="visible = false"
          >返回</a-button
        >
        <a-button class="i-drawer-btn" type="primary" @click="onUpdate"
          >修改</a-button
        >
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import { computed, reactive } from 'vue';

  const emits = defineEmits(['update:drawerVisible', 'onUpdate']);
  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  });
  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });

  const onUpdate = () => {
    visible.value = false;
    emits('onUpdate', props.id);
  };

  const formDataColumn = reactive({
    basicInfo: [
      {
        value: 'projectName',
        label: '归属项目'
      },
      {
        value: 'code',
        label: '编号'
      },
      {
        value: 'name',
        label: '品牌'
      },
      {
        value: 'formatName',
        label: '业态'
      },
      {
        value: 'remark',
        label: '备注'
      }
    ]
  });
</script>
<style scoped lang="less">
  :deep(.arco-descriptions-row) {
    display: flex;
    .arco-descriptions-item {
      display: inline-flex;
      flex: 1;
      flex-direction: column;
      word-break: break-all;
    }
    &:nth-of-type(4) {
      .arco-descriptions-item {
        flex: none;
        width: 25%;
        &:last-child {
          width: 50%;
        }
      }
    }
  }
  .detail-box {
    width: 100%;
    padding: 16px;
    background-color: #fff;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .i-drawer-btn {
    width: 104px;
    height: 40px;
    color: #117cfa;
    font-size: 16px;
    background: #dbe8fd;
    border-radius: 4px;
  }
  .bg-blue-dark {
    color: #fff !important;
    background: #117cfa !important;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 800px;
    padding: 12px 25px;
    background: #fff;
  }
</style>
