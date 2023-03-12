<template>
  <div class="warps">
    <div class="left">
      <a-collapse
        v-if="selectProjectId"
        destroy-on-hide
        :default-active-key="[selectProjectId]"
        accordion
      >
        <a-collapse-item
          v-for="i in projectList"
          :key="i.value"
          :header="i.label"
          class="pay"
        >
          <div
            v-for="p in payList"
            :key="p"
            class="pay-items"
            :class="
              activeLess === p.value && selectProjectId === i.value
                ? 'active'
                : ''
            "
            @click="payClick(p.value, i.value)"
            >{{ p.name }}</div
          >
        </a-collapse-item>
      </a-collapse>
    </div>
    <div class="right">
      <cost-setting
        v-if="activeLess === 1"
        :project-id="selectProjectId"
      ></cost-setting>
      <pay-way v-if="activeLess === 2" :project-id="selectProjectId"></pay-way>
      <collection-maintain
        v-if="activeLess === 3"
        :project-id="selectProjectId"
      ></collection-maintain>
      <invoice-setting
        v-if="activeLess === 4"
        :project-id="selectProjectId"
      ></invoice-setting>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { cbdApiProjectCommonProjectSelectListGet } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Ref, ref } from 'vue';
  import CostSetting from './__components__/cost-setting/index.vue';
  import PayWay from './__components__/pay-way/index.vue';
  import CollectionMaintain from './__components__/collection-maintain/index.vue';
  import InvoiceSetting from './__components__/invoice-setting/index.vue';

  const payList: Ref = ref([
    { name: '费用设置', value: 1 },
    { name: '支付方式维护', value: 2 },
    { name: '收款账户维护', value: 3 },
    // { name: '发票设置', value: 4 }
  ]);
  const selectProjectId = ref<string>('');
  const activeLess = ref<number>(1);
  const payClick = (key: number, value: string) => {
    selectProjectId.value = value;

    activeLess.value = key;
  };
  const projectList: Ref = ref({});
  //获取项目下拉
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
    selectProjectId.value = projectList.value[0].value;
  });

  getProjectList();
</script>
<style lang="less" scoped>
  .warps {
    display: flex;
    width: 100%;
    height: 100%;
    .left {
      width: 158px;
      height: max-content;
      background: #fff;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
      .pay {
        background: #fff !important;
      }
      :deep(.arco-collapse-item-content) {
        padding: 0;
      }
      :deep(.arco-collapse-item) {
        border: none;
      }
      :deep(.arco-collapse-item-header) {
        border: none !important;
      }
      :deep(.arco-collapse-item-content) {
        border: none !important;
      }
      .active {
        color: #286eff !important;
        background: #f1f2f4;
      }
      .pay-items {
        height: 32px;
        line-height: 32px;
        padding-left: 16px;
        cursor: pointer;
        color: #666666;
        margin: 0 16px;
      }
      .pay-items:hover {
        background: #f1f2f4;
        color: #286eff;
        font-weight: bold;
      }
    }
    .right {
      width: 100%;
      background: #fff;
      height: 100%;
      overflow: auto;
    }
  }
  :deep(.arco-collapse-item-content) {
    background-color: #fff;
  }
</style>
