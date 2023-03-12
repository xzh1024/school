<template>
  <drawer
    v-model:visible="drawerVisible"
    :mask-closable="false"
    :title="title"
    :no-padding="true"
    :width="'75%'"
    :footer="false"
    :show-log="handleType === 3"
    :log-options="{
      modeId: contractId,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_contract'
    }"
    @cancel="doCancel"
    @close="doClose"
  >
    <div class="container-box">
      <div class="step-nav-box">
        <step-nav :active-step="mainStep" />
      </div>
      <contract-tabs
        v-if="mainStep === 1"
        v-model:active="tabIndex"
        :tab-options="tabOptions"
        @change="onTabChange"
      >
        <!-- 合同主体 -->
        <template #1>
          <Main
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-save="doSave"
            @on-next="doNext(2)"
          ></Main>
          <MainDetail
            v-else
            @on-cancel="doCancel"
            @on-next="doNext(2)"
            @on-update="doUpdate"
          />
        </template>
        <template #2>
          <shop
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-save="doSave"
            @on-pre="doPre"
            @on-next="doNext(3)"
          ></shop>
          <shop-detail
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(3)"
            @on-update="doUpdate"
          />
        </template>
        <template #3>
          <cost-info
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-save="doSave"
            @on-next="doNext(4)"
          />
          <cost-info-see
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(4)"
            @on-update="doUpdate"
          />
        </template>
        <template #4>
          <bond-info
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-save="doSave"
            @on-next="doNext(5)"
          />
          <bond-info-see
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(5)"
            @on-update="doUpdate"
          />
        </template>
        <template #5>
          <late-fee-info
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-save="doSave"
            @on-next="doNext(6)"
          />
          <late-fee-info-see
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(6)"
            @on-update="doUpdate"
          />
        </template>
        <template #6>
          <RefundForm
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-save="doSave"
            @on-next="doNext(7)"
            @on-update="doUpdate"
          />
          <RefundDetail
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(7)"
            @on-update="doUpdate"
          />
        </template>
        <template #7>
          <AffixForm
            v-if="[1, 2].includes(handleType) || isEdit"
            :is-edit="isEdit || prevChangeEdit"
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-save="doSave"
            @on-next="doNext(8)"
            @on-update="doUpdate"
          />
          <AffixDetail
            v-else
            @on-cancel="doCancel"
            @on-pre="doPre"
            @on-next="doNext(8)"
            @on-update="doUpdate"
          />
        </template>
      </contract-tabs>
      <div v-if="mainStep === 2">
        <fee-list
          @on-cancel="doCancel"
          @on-next="doNext(9)"
          @on-pre="doPre"
          @on-update="doUpdate"
        ></fee-list>
      </div>
      <div v-if="mainStep === 3">
        <StraightMatterForm
          @on-cancel="doCancel"
          @on-save="doSave"
          @on-next="doNext(10)"
          @on-pre="doPre"
          @on-update="doUpdate"
        />
      </div>
      <div v-if="mainStep === 4">
        <approval-info @on-pre="doPre" @on-cancel="doCancel" />
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, ref, watch } from 'vue';
  import StepNav from '@/views/new-contract/__components__/step-nav.vue';
  import ContractTabs from '@/views/new-contract/__components__/contract-tabs.vue';
  import BondInfo from '@/views/new-contract/__components__/bond-info.vue';
  import Main from './main/add.vue';
  import MainDetail from './main/detail.vue';
  import Shop from './shop/add.vue';
  import ShopDetail from './shop/detail.vue';
  import FeeList from './feeList.vue';
  import { Message } from '@arco-design/web-vue';
  import LateFeeInfo from '@/views/new-contract/__components__/late-fee-info.vue';
  import { useContractStore } from '@/store/project/contract';
  import BondInfoSee from '@/views/new-contract/__components__/bond-info-see.vue';
  import LateFeeInfoSee from '@/views/new-contract/__components__/late-fee-info-see.vue';
  import CostInfo from '@/views/new-contract/__components__/cost-info/index.vue';
  import CostInfoSee from '@/views/new-contract/__components__/cost-info/see.vue';
  import RefundForm from './content/refund/form.vue';
  import RefundDetail from './content/refund/detail.vue';
  import AffixForm from './content/affix/form.vue';
  import AffixDetail from './content/affix/detail.vue';
  import StraightMatterForm from './content/straight-matter/form.vue';
  import ApprovalInfo from '@/views/new-contract/__components__/approval-info.vue';
  import { cbdApiProjectSysOptPageOptListPost } from '@/api';
  const contractStore = useContractStore();
  //业务操作类型 1新增 2编辑 3查看
  const handleType = computed(() => {
    return contractStore.contractInfo.handleType;
  });
  // 合同id
  const contractId = computed(() => contractStore.contractInfo.contractId);

  const title = computed(() => {
    if (handleType.value === 1) {
      return '新增';
    } else if (handleType.value === 2) {
      return '编辑';
    } else {
      return '查看';
    }
  });

  const mainStep = ref(1);

  const tabIndex = ref(1);
  const tabOptions = [
    {
      label: '主体信息',
      value: 1
    },
    {
      label: '铺位信息',
      value: 2
    },
    {
      label: '费用信息',
      value: 3
    },
    {
      // label:
      //   contractStore.contractInfo.contractType === 1
      //     ? '保证金信息'
      //     : '意向保证金信息',
      label: '保证金信息',
      value: 4
    },
    {
      label: '滞纳金信息',
      value: 5
    },
    {
      label: '返款信息',
      value: 6
    },
    {
      label: '附件',
      value: 7
    }
  ];
  const onTabChange = () => {
    console.log(tabIndex.value, '-tab-');
    //切换后重置业务组件状态为查看
    // if (handleType.value === 3) {
    //   reset();
    // }
  };

  const drawerVisible = computed({
    get() {
      return contractStore.drawerVisible;
    },
    set(v) {
      console.log(v, '---v---');
      contractStore.drawerVisibleChange();
    }
  });
  //弹窗关闭
  const doClose = () => {
    contractStore.clearContractInfo();
    reset();
    mainStep.value = 1;
    maxStep.value = 1;
    tabIndex.value = 1;
  };
  //取消按钮
  const doCancel = () => {
    console.log('取消');
    contractStore.drawerVisibleChange();
    contractStore.tableRefreshChange();
  };
  //重置数据
  const reset = () => {
    isEdit.value = !isEdit.value;
  };

  //是否修改标识
  const isEdit = ref(false);

  watch(
    () => contractStore.drawerVisible,
    (val) => {
      if (val) {
        isEdit.value = handleType.value === 2;
      }
    }
  );

  const doUpdate = () => {
    isEdit.value = true;
  };

  const doSave = () => {
    console.log('保存');
    Message.success({ content: '保存成功' });
    contractStore.drawerVisibleChange();
    contractStore.tableRefreshChange();
  };
  const maxStep = ref(0);
  const doNext = (i: number) => {
    maxStep.value = Math.max(i, maxStep.value);
    console.log('下一步', mainStep.value, tabIndex.value);
    if (mainStep.value === 1 && tabIndex.value <= 6) {
      tabIndex.value++;
    } else {
      mainStep.value++;
    }
  };
  const prevChangeEdit = computed(() => {
    return tabIndex.value < maxStep.value;
  });

  const doPre = () => {
    if (mainStep.value > 1) {
      mainStep.value--;
    } else {
      tabIndex.value--;
    }
    console.log('上一步');
  };
</script>

<style scoped lang="less">
  .container-box {
    width: 100%;
    height: 100%;
    .step-nav-box {
      padding: 12px 16px;
      background: #fff;
    }
  }
</style>
