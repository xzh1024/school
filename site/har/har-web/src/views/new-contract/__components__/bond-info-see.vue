<template>
  <div class="container-box">
    <template v-if="bondInfoTable.length">
      <div
        v-for="(item, index) in bondInfoTable"
        :key="index"
        class="table-box"
      >
        <div class="table-title flex align-center">
          <div class="margin-right-24">{{ item.itemTypeName }}</div>
          <!-- <div>{{ `${item.taxIncluded ? '是' : '不'}含税` }}</div> -->
        </div>
        <div class="table-content">
          <a-descriptions layout="vertical" :column="{ xs: 1, md: 3, lg: 4 }">
            <a-descriptions-item label="金额">{{
              item.amount + '元'
            }}</a-descriptions-item>
            <a-descriptions-item label="账单生成日">{{
              item.receivableDate
            }}</a-descriptions-item>
            <!-- <a-descriptions-item label="税率">{{
              item.taxRate + '%'
            }}</a-descriptions-item> -->
            <a-descriptions-item label="是否自动转移">{{
              item.transfer ? '是' : '否'
            }}</a-descriptions-item>
            <a-descriptions-item v-if="item.transfer" label="转入费用项目">{{
              item.intoTaxIncludedName
            }}</a-descriptions-item>
            <!--占位-->
            <a-descriptions-item v-else label="">{{ '' }}</a-descriptions-item>
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
    cbdApiProjectFormalContractBondInfoContractIdGet,
    CbdApiProjectFormalContractBondInfoContractIdGetResponse,
    cbdApiProjectIntentionContractBondInfoContractIdGet
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
    getBondInfo({ contractId: contractId.value });
    // if (contractType.value === 1) {
    //   getIntentionBondInfo({ contractId: contractId.value });
    // } else if (contractType.value === 2) {
    //   getBondInfo({ contractId: contractId.value });
    // }
  });

  const bondInfoTable =
    ref<CbdApiProjectFormalContractBondInfoContractIdGetResponse>([]);
  //正式
  const { run: getBondInfo } = useRequest(
    contractType.value === 2
      ? cbdApiProjectFormalContractBondInfoContractIdGet
      : cbdApiProjectIntentionContractBondInfoContractIdGet,
    {
      manual: true,
      onSuccess(d) {
        bondInfoTable.value = d;
      }
    }
  );
  //意向
  // const { run: getIntentionBondInfo } = useRequest(
  //   cbdApiProjectIntentionContractBondInfoContractIdGet,
  //   {
  //     manual: true,
  //     onSuccess(d) {
  //       bondInfoTable.value = d;
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
