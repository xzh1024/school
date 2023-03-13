<template>
  <div>
    <div class="change-no-box">
      <div class="inner-box">
        <div class="inner-title">存款处理单号：</div>
        <div class="inner-no">{{ info.changeNo || '系统自动生成' }}</div>
      </div>
    </div>
    <cost-bill-info-box
      :need-edit="false"
      :const-info-obj="{
        constInfo: info.costInfoObj,
        constProjectList: info.costInfoObj?.constProjectList
      }"
      :relation-list="relationList"
    />
    <collection-table :table-data="info.collectionTableData" />
    <return-table
      v-if="info.changType === 1"
      v-model:return-table-data="info.returnTableList"
      :need-edit="false"
    />
    <transfer-table
      v-if="info.changType === 2"
      v-model:transfer-table-data="info.transferTableData"
      :need-edit="false"
    />
    <file-list v-model:file-data="info.fileData" :need-edit="false" />
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import CostBillInfoBox from '@/views/finance-manage/deposit/_components_/cost-bill-info-box.vue';
  import CollectionTable from '@/views/finance-manage/deposit/_components_/collection-table.vue';
  import ReturnTable from '@/views/finance-manage/deposit/_components_/return-table.vue';
  import TransferTable from '@/views/finance-manage/deposit/_components_/transfer-table.vue';
  import FileList from '@/views/finance-manage/deposit/_components_/file-list.vue';
  import { CbdApiProjectDepositInfoChangeIdGetResponse } from '@/api';
  const props = defineProps({
    data: {
      type: Object as PropType<CbdApiProjectDepositInfoChangeIdGetResponse>,
      default: () => {
        return {};
      }
    }
  });
  const info = computed<any>(() => {
    return {
      changType: props.data.changType,
      changeId: props.data.changeId,
      changeNo: props.data.changeNo || '',
      flowId: props.data.flowId || '',
      businessStat: props.data.businessStat || -1,
      auditStat: props.data.auditStat || -1,
      costInfoObj: {
        projectId: props.data.projectId,
        projectName: props.data.projectName,
        merchantId: props.data.merchantId,
        merchantName: props.data.merchantName,
        storeId: props.data.storeId,
        storeName: props.data.storeName,
        contractCode: props.data.contractCode,
        constProjectList: props.data.expenseItem || []
      },
      collectionTableData: props.data.receiptList || [],
      returnTableList: props.data.returnRecord || [],
      transferTableData:
        props.data.transferRecord?.map((item) => {
          return {
            ...item,
            expenseItemName: item.expenseItemName || '',
            availableAmount: String(item.availableAmount),
            acceptExpenseItemName: undefined
          };
        }) || [],
      fileData: props.data.resourceList || []
    };
  });
  const relationList = computed(() => {
    if (info.value.changType === 1) {
      return info.value.returnTableList;
    } else if (info.value.changType === 2) {
      return info.value.transferTableData;
    }
  });
</script>

<style scoped lang="less">
  .content-container {
    width: 100%;
  }
  .tab-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .i-tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 16px;
    cursor: pointer;
  }
  .i-active {
    color: #4c8af7;
  }
  .i-solid {
    position: absolute;
    bottom: 0;
    width: 110px;
    height: 2px;
    background: transparent;
  }
  .bg-blue {
    background: #4c8af7 !important;
  }
  .drawer-content-box {
    height: calc(100vh - 48px - 48px - 66px);
    overflow-y: auto;
  }
  .i-dark-btn {
    color: #4c8af7 !important;
    background: #dbe8fd !important;
  }
  .i-btn {
    //width: 104px;
    //height: 40px;
    //background: #4c8af7;
    //border-radius: 4px;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .change-no-box {
    .inner-box {
      padding: 16px;
      background: #fff;
      .inner-title {
        color: #333;
        font-size: 14px;
      }
      .inner-no {
        margin-top: 8px;
        color: #999;
        font-size: 16px;
      }
    }
  }
  .examine-box {
    padding: 16px;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 60vw;
    padding: 12px 25px;
    background: #fff;
  }
  .drawer-content {
    width: 100%;
    padding: 16px;
    background: #fff;
  }
</style>
