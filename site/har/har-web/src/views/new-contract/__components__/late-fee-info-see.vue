<template>
  <div class="container-box">
    <template v-if="lateFeeInfoTable.length">
      <div
        v-for="(item, index) in lateFeeInfoTable"
        :key="index"
        class="table-box"
      >
        <div class="table-title flex align-center">
          <div class="margin-right-24">{{ item.itemTypeName }}</div>
          <div>{{ `${item.taxIncluded ? '' : '不'}含税` }}</div>
        </div>
        <div class="table-content">
          <a-descriptions layout="vertical" :column="{ xs: 1, md: 3, lg: 4 }">
            <a-descriptions-item label="滞纳金起算基准">{{
              item.startDatum === 1 ? '账单生成日期' : '账单确认日期'
            }}</a-descriptions-item>
            <a-descriptions-item label="免滞纳金区间"
              >{{ item.sectionUnit === 1 ? '月' : '天'
              }}{{ `/${item.section}` }}</a-descriptions-item
            >
            <a-descriptions-item label="滞纳金计算方式">{{
              item.calculationMethod === 1 ? '按比例' : '按金额'
            }}</a-descriptions-item>
            <a-descriptions-item
              :label="item.calculationMethod === 1 ? '比例' : '金额'"
              >{{ item.amount + `${item.calculationMethod === 1 ? '‰' : '元'}`
              }}{{
                item.calculationMethod === 1
                  ? ''
                  : `${item.sectionUnit === 1 ? '月' : '/天'}`
              }}</a-descriptions-item
            >
            <a-descriptions-item label="税率">{{
              item.taxRate + '%'
            }}</a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </template>
    <div v-else class="bg-white padding-lg">
      <a-empty />
    </div>
    <div class="f-bottom">
      <footer-btn
        :need-save="false"
        @on-cancel="onCancel"
        @on-pre="onPre"
        @on-next="onNext"
        @on-update="onUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import {
    cbdApiProjectFormalContractLateFeeInfoContractIdGet,
    CbdApiProjectFormalContractLateFeeInfoContractIdGetResponse,
    cbdApiProjectIntentionContractLateFeeInfoContractIdGet
  } from '@/api';
  import { useContractStore } from '@/store/project/contract';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import { useRequest } from '@har/use';
  const emits = defineEmits(['onCancel', 'onNext', 'onUpdate', 'onPre']);
  const contractStore = useContractStore();
  const contractId = computed(() => {
    return contractStore.contractInfo.contractId + '';
  });
  //合同类型
  const contractType = computed(() => {
    return contractStore.contractInfo.contractType;
  });

  onMounted(() => {
    console.log('--onMounted--');
    getLateFeeInfo({ contractId: contractId.value });
    // if (contractType.value === 1) {
    //   getIntentionLateFeeInfo({ contractId: contractId.value });
    // } else if (contractType.value === 2) {
    //   getLateFeeInfo({ contractId: contractId.value });
    // }
  });

  const lateFeeInfoTable =
    ref<CbdApiProjectFormalContractLateFeeInfoContractIdGetResponse>([]);
  const { run: getLateFeeInfo } = useRequest(
    contractType.value === 2
      ? cbdApiProjectFormalContractLateFeeInfoContractIdGet
      : cbdApiProjectIntentionContractLateFeeInfoContractIdGet,
    {
      manual: true,
      onSuccess(d) {
        lateFeeInfoTable.value = d;
      }
    }
  );
  // //意向
  // const { run: getIntentionLateFeeInfo } = useRequest(
  //   cbdApiProjectIntentionContractLateFeeInfoContractIdGet,
  //   {
  //     manual: true,
  //     onSuccess(d) {
  //       lateFeeInfoTable.value = d;
  //     }
  //   }
  // );

  const onCancel = () => {
    emits('onCancel');
  };

  const onPre = () => {
    emits('onPre');
  };

  const onNext = () => {
    emits('onNext');
  };

  const onUpdate = () => {
    emits('onUpdate');
  };
</script>

<style scoped lang="less">
  .margin-right-24 {
    margin-right: 24px;
  }
  .container-box {
    padding: 16px;
    .table-box {
      margin-bottom: 16px;
      padding: 16px 16px 8px 16px;
      background: #fff;
      user-select: none;
      .table-title {
        padding: 8px 12px;
        color: #333;
        font-size: 14px;
        background: #f2f2f4;
        border-bottom: 1px solid #d3d3d3;
      }
      .table-content {
        margin-top: 16px;
      }
    }
  }
</style>
