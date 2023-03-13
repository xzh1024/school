<template>
  <drawer v-model="visible" :title="title" :footer="false" @cancel="onClose">
    <div class="container-box">
      <div class="content-box">
        <cost-search
          v-model:search-data="searchData"
          :is-disabled="searchDisabled"
          @on-search="doSearch"
        />
        <i-table
          v-model:selected-keys="selectedKeys"
          :options="options"
          :data="projectList"
        ></i-table>
      </div>
      <div class="footer-box">
        <a-button class="i-btn margin-right-8" type="primary" @click="onClose"
          >取消</a-button
        >
        <a-button
          :disabled="selectedKeys.length < 1"
          class="i-btn"
          type="primary"
          @click="onConfirm"
          >确认</a-button
        >
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { computed, reactive, ref, watch } from 'vue';
  import CostSearch from '@/views/finance-manage/deposit/_components_/cost-search.vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectDepositAccountListGet,
    CbdApiProjectDepositAccountListGetResponse
  } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { useDepositStore } from '@/store/project/deposit';

  const depositStore = useDepositStore();

  const emits = defineEmits(['update:showDrawer', 'confirmChoose']);

  const props = defineProps({
    title: {
      type: String,
      default: '选择费用'
    },
    showDrawer: {
      type: Boolean,
      default: false
    }
  });

  const searchData = ref({});
  const searchDisabled = ref(false);
  const doSearch = (setValue = true) => {
    console.log(searchData.value, '-----');
    if (setValue) {
      depositStore.setSearchData({ ...searchData.value, disabled: true });
    }
    getList({ ...searchData.value });
  };

  const projectList = ref<CbdApiProjectDepositAccountListGetResponse>([]);
  const { run: getList } = useRequest(cbdApiProjectDepositAccountListGet, {
    manual: true,
    onSuccess(e) {
      projectList.value = e;
      if (depositStore.costInfo.constProjectList) {
        selectedKeys.value = [];
        // const localKeys = depositStore.costInfo.constProjectList.map((item) =>
        //   Number(item.id)
        // );
        // e.forEach((item) => {
        //   if (localKeys.includes(item.id)) {
        //     selectedKeys.value.push(Number(item.id));
        //   }
        // });
        // console.log(localKeys, '--*--');
        // console.log(e, '--*--');
        selectedKeys.value = depositStore.costInfo.constProjectList.map(
          (item) => Number(item.id)
        );
      }
      // console.log(depositStore.costInfo.constProjectList);
      // selectedKeys.value = [1, 4];
    }
  });

  // type ProjectDepositAccountList =
  //   CbdApiProjectDepositAccountListGetResponse[0];
  //
  // interface CodeArr extends ProjectDepositAccountList {
  //   uid: string;
  // }

  //确认选择
  const onConfirm = () => {
    const codeArr: CbdApiProjectDepositAccountListGetResponse = [];
    selectedKeys.value.forEach((item) => {
      const code = projectList.value.find((sub) => sub.id === item) || {};
      codeArr.push(code as CbdApiProjectDepositAccountListGetResponse[0]);
    });
    const isUnify = codeArr.every(
      (item) => item.contractCode === codeArr[0].contractCode
    );
    if (!isUnify)
      return Message.error({ content: '请选择同一合同号下费用项目' });
    if (Object.keys(codeArr[0]).length < 1)
      return Message.error({ content: '请选择至少费用项目' });
    console.log(codeArr, '---codeArr---');
    const chooseList = codeArr.map((item) => {
      const {
        id,
        expenseItemId,
        expenseItemName,
        contractRangeDate,
        receivedAmount,
        processedAmount,
        availableAmount
      } = item;
      return {
        id,
        expenseItemId,
        expenseItemName,
        contractRangeDate,
        receivedAmount,
        processedAmount,
        availableAmount
      };
    });
    const {
      projectId,
      projectName,
      merchantId,
      merchantName,
      storeId,
      storeName,
      contractCode
    } = codeArr[0];
    const costChooseInfo = {
      projectId,
      projectName,
      merchantId,
      merchantName,
      storeId,
      storeName,
      contractCode,
      constProjectList: chooseList
    };
    console.log(costChooseInfo, '----*----');
    depositStore.setCostInfo(costChooseInfo);
    onClose(false);
    emits('confirmChoose');
  };

  const resetList = () => {
    selectedKeys.value = [];
    searchData.value = {};
    projectList.value = [];
  };

  const selectedKeys = ref<Array<number>>([]);
  const options = reactive({
    menuOtherOptions: {
      rowKey: 'id',
      rowSelection: {
        type: 'checkbox',
        showCheckedAll: true
      },
      onSelect: (e: number[]) => {
        console.log(e, '--选择的数据id--');
        selectedKeys.value = e;
      }
    },
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    tableCard: false,
    columns: [
      {
        label: '合同号',
        prop: 'contractCode'
      },
      {
        label: '合同租期',
        prop: 'contractRangeDate'
      },
      {
        label: '费用项目',
        prop: 'expenseItemName'
      },
      {
        label: '已收金额',
        prop: 'receivedAmount'
      },
      {
        label: '可用余额',
        prop: 'availableAmount'
      }
    ]
  });

  const visible = computed({
    get() {
      return props.showDrawer;
    },
    set(v) {
      emits('update:showDrawer', v);
    }
  });

  watch(
    () => visible.value,
    (val) => {
      if (val) {
        searchData.value = depositStore.searchData;
        searchDisabled.value = depositStore.searchData?.disabled || false;
        if (Object.keys(searchData.value).length > 0) {
          doSearch(false);
        }
      }
    }
  );

  const onClose = (isClear: any) => {
    visible.value = false;
    if (isClear) {
      depositStore.clearSearchData();
    }
    resetList();
  };
</script>

<style scoped lang="less">
  //.i-btn {
  //  width: 104px;
  //  height: 40px;
  //  background: #4c8af7;
  //  border-radius: 4px;
  //}
  .margin-right-8 {
    margin-right: 8px;
  }
  .container-box {
    width: 100%;
    .content-box {
      width: 100%;
      padding: 16px;
      background: #fff;
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
  }
</style>
