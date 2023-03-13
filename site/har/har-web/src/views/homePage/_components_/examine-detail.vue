<template>
  <div class="detail-box">
    <div class="model-box">
      <div class="title">审批模板</div>
      <div v-if="xmlData" class="model-content">
        <process-picture
          :xml="xmlData"
          :flow-viewer="xmlFlowViewer"
        ></process-picture>
      </div>
      <div v-else>暂无数据</div>
    </div>
    <div class="space-box"></div>
    <div class="process-box">
      <div class="title">审批流程</div>
      <div class="process-list">
        <template v-if="processList.length">
          <i-process-cell
            v-for="(item, index) in processList"
            :key="index"
            :item="item"
            :first-show="index > 0"
            :last-show="index < processList.length - 1"
          />
        </template>
        <template v-else>暂无数据</template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IProcessCell from './i-process-cell.vue';
  import ProcessPicture from '@/components/i-bpmn-view/view.vue';

  const props = defineProps({
    processList: {
      type: Array,
      default: () => []
    },
    xmlData: {
      type: String,
      default: ''
    },
    xmlFlowViewer: {
      type: Object
    }
  });
</script>

<style scoped lang="less">
  .title {
    color: #333;
    font-size: 16px;
  }
  .model-box {
    padding: 16px;
    background: #fff;
    .model-content {
      width: 100%;
      height: 216px;
      margin-top: 24px;
      overflow: auto;
      background: #eaeaea;
    }
  }
  .space-box {
    height: 16px;
    background: #eaeaea;
  }
  .process-box {
    padding: 12px 16px;
    background: #fff;
    .process-list {
      margin-top: 12px;
    }
  }
</style>
