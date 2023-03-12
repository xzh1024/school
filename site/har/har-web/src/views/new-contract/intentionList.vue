<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="doRefresh"
      v-model:selectedKeys="selectedKeys"
      :options="options"
      :api="cbdApiProjectIntentionContractListGet"
      @reset="onReset"
    >
      <template #showAbandonForm>
        <a-checkbox v-model="checkValue" :value="1" @change="onCheck"
          >显示已作废数据</a-checkbox
        >
      </template>
      <template #header>
        <a-space>
          <a-button
            v-permission="[
              'intention:contract:save',
              'intention:contract:info'
            ]"
            class="i-btn"
            type="primary"
            @click="onAdd"
            >添加</a-button
          >
          <a-button
            v-permission="['intention:contract:export']"
            class="i-btn"
            type="primary"
            @click="onExport"
            >导出</a-button
          >
          <a-button
            v-permission="['intention:contract:delete']"
            class="i-btn"
            type="primary"
            @click="onHandleDel"
            >删除</a-button
          >
          <a-button
            v-permission="['intention:contract:approval:confirm']"
            class="i-btn"
            type="primary"
            @click="onConfirmExamine"
            >确认</a-button
          >
        </a-space>
      </template>
      <template #businessStatusCell="{ record }">{{
        businessName(record.businessStatus)
      }}</template>
      <template #verifyStatusCell="{ record }">{{
        examineName(record.verifyStatus)
      }}</template>
      <template #optionalCell="{ record }">
        <a-space>
          <div
            v-if="
              ![4, 5].includes(record.businessStatus) &&
              record.verifyStatus !== 2 &&
              record.isModify
            "
            v-permission="[
              'intention:contract:save',
              'intention:contract:info'
            ]"
            class="s-btn"
            @click="onEdit(record)"
            >编辑</div
          >
          <div class="s-btn" @click="onSee(record)">查看</div>
          <div
            v-if="
              (record.businessStatus === 1 && record.verifyStatus === 1) ||
              (record.businessStatus === 2 && record.verifyStatus === 1) ||
              (record.businessStatus === 2 &&
                [3, 4].includes(record.verifyStatus)) ||
              (record.businessStatus === 5 && record.verifyStatus === 5)
            "
            v-permission="['intention:contract:delete']"
            class="s-btn"
            @click="onDel(record.id)"
            >删除</div
          >
        </a-space>
      </template>
    </i-table>

    <contract-container />

    <a-modal
      v-model:visible="exportVisible"
      title="提示"
      title-align="start"
      @ok="confirmExport"
      @cancel="exportVisible = false"
    >
      <div>{{ exportContent }}</div>
    </a-modal>

    <a-modal
      v-model:visible="delVisible"
      title="提示"
      title-align="start"
      @ok="confirmDel"
      @cancel="delVisible = false"
    >
      <div>数据删除后无法恢复，是否删除？</div>
    </a-modal>

    <a-modal
      v-model:visible="examineVisible"
      title="提示"
      title-align="start"
      @ok="confirmExamine"
      @cancel="examineVisible = false"
    >
      <div>数据确认后无法删除，是否提交审批？</div>
      <div class="margin-top-xl">
        <div class="margin-bottom-xs">备注：</div>
        <a-textarea
          v-model="remarks"
          placeholder="请输入长度不超过200个字符的内容"
          :max-length="200"
          allow-clear
          show-word-limit
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import {
    examine_status,
    business_status,
    intention_business_status
  } from '@/config/contract_status';
  import { Message } from '@arco-design/web-vue';
  import ContractContainer from '@/views/new-contract/__components__/contract-container.vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectIntentionContractListGet,
    cbdApiProjectCommonMerchantListGet,
    cbdApiProjectCommonContractStoreSelectGet,
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectIntentionContractExportGet,
    CbdApiProjectFormalContractListGetResponse,
    CbdApiProjectIntentionContractListGetRequest
  } from '@/api';
  import {
    CbdApiProjectCommonMerchantListGetResponse,
    CbdApiProjectCommonProjectSelectListGetResponse,
    CbdApiProjectFormalContractListGetRequest,
    CbdApiProjectCommonContractStoreSelectGetResponse,
    CbdApiProjectCommonMerchantBrandListGetResponse
  } from '@/api';
  import { exportDownload } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useContractStore } from '@/store/project/contract';

  onMounted(() => {
    getProjectList();
    getMerchantList('');
    getStoreSelectList('');
    getMerchantBrandList('');
  });

  const tableListRef = ref<any>(null);

  //项目下拉列表
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  //商户下拉列表
  const merchantList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const [getMerchantList] = useFuncProxy(async (projectId: string) => {
    merchantList.value = await cbdApiProjectCommonMerchantListGet({
      projectId
    });
  });
  //合同-店铺下拉
  const storeSelectList =
    ref<CbdApiProjectCommonContractStoreSelectGetResponse>([]);
  const [getStoreSelectList] = useFuncProxy(async (projectId: string) => {
    storeSelectList.value = await cbdApiProjectCommonContractStoreSelectGet({
      projectId
    });
  });
  //商户品牌下拉
  const merchantBrandList =
    ref<CbdApiProjectCommonMerchantBrandListGetResponse>([]);
  const [getMerchantBrandList] = useFuncProxy(async (projectId: string) => {
    merchantBrandList.value = await cbdApiProjectCommonMerchantBrandListGet({
      projectId
    });
  });

  const exportVisible = ref(false);
  const exportContent = ref('');
  const onExport = () => {
    exportContent.value = selectedKeys.value.length
      ? '是否导出选中数据？'
      : '是否导出结果页全部数据？';
    exportVisible.value = true;
  };
  const confirmExport = () => {
    const url = cbdApiProjectIntentionContractExportGet.requestConfig.path;
    const params = Object.keys(search.value)
      .filter(
        (key) =>
          search.value[
            key as keyof CbdApiProjectIntentionContractListGetRequest
          ] !== undefined
      )
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            search.value[
              key as keyof CbdApiProjectIntentionContractListGetRequest
            ]
        }),
        {}
      );

    if (selectedKeys.value.length > 0) {
      console.log('导出指定数据', params);
      exportDownload(
        url,
        { ...params, contractIds: selectedKeys.value.join(',') },
        '意向合同'
      );
      selectedKeys.value = [];
    } else {
      console.log('导出结果页所有数据', params);
      exportDownload(url, { ...params, contractIds: '' }, '意向合同');
      selectedKeys.value = [];
    }
  };

  const delVisible = ref(false);
  const delHandleType = ref(0); // 1列表内容删除 2顶部删除按钮
  const contractIds = ref<Array<number>>([]);
  const onHandleDel = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先选择删除项' });
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value.data.find(
        (sub: any) => Number(sub.id) === Number(item)
      );
      return (
        obj &&
        ((obj.businessStatus === 1 && obj.verifyStatus === 1) ||
          (obj.businessStatus === 2 && obj.verifyStatus === 1) ||
          (obj.businessStatus === 2 && [3, 4].includes(obj.verifyStatus)))
      );
    });
    if (!flag) return Message.error({ content: '选择数据存在不能删除项' });
    contractIds.value = selectedKeys.value;
    delVisible.value = true;
    delHandleType.value = 2;
  };
  const confirmDel = async () => {
    console.log('确认删除');
    const d = await contractStore.delIntentionContract(contractIds.value);
    if (d) {
      contractIds.value = [];
      selectedKeys.value = [];
      Message.success({ content: '删除成功' });
      contractStore.tableRefreshChange();
      delHandleType.value = 0;
    }
  };

  const examineVisible = ref(false);
  const remarks = ref(''); //备注
  const onConfirmExamine = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先选择审批项' });
    const flag = selectedKeys.value.every((item) => {
      const obj = tableListRef.value.data.find(
        (sub: any) => Number(sub.id) === Number(item)
      );
      return obj && obj.businessStatus === 2 && obj.verifyStatus === 1;
    });
    if (!flag) return Message.error({ content: '选择数据存在不能提交审批项' });
    examineVisible.value = true;
  };
  const confirmExamine = async () => {
    const d = await contractStore.confirmIntentionContract(
      selectedKeys.value.map(String),
      [],
      remarks.value
    );
    if (d) {
      Message.success({ content: '提交审批成功' });
      selectedKeys.value = [];
      contractStore.tableRefreshChange();
    }
  };

  type RecordData =
    Required<CbdApiProjectFormalContractListGetResponse>['rows'][0];
  const contractStore = useContractStore();
  const onAdd = () => {
    contractStore.setContractInfo({
      contractType: 1,
      handleType: 1,
      contractId: '',
      businessStatus: 0,
      verifyStatus: 0
    });
    contractStore.drawerVisibleChange();
  };
  const onEdit = (record: RecordData) => {
    contractStore.setContractInfo({
      contractType: 1,
      handleType: 2,
      contractId: record.id,
      businessStatus: record.businessStatus,
      verifyStatus: record.verifyStatus
    });
    contractStore.drawerVisibleChange();
  };
  const onSee = (record: RecordData) => {
    console.log(record, '--查看--');
    contractStore.setContractInfo({
      contractType: 1,
      handleType: 3,
      contractId: record.id,
      businessStatus: record.businessStatus,
      verifyStatus: record.verifyStatus,
      isModify: true
    });
    contractStore.drawerVisibleChange();
  };
  const onDel = (recordId: string | number) => {
    console.log(recordId, '--删除--');
    contractIds.value = [Number(recordId)];
    delVisible.value = true;
    delHandleType.value = 1;
  };

  const doRefresh = ref(false);

  watch(
    () => contractStore.tableRefresh,
    (val) => {
      if (val) {
        doRefresh.value = true;
        contractStore.tableRefreshChange();
      }
    }
  );
  const search = ref<CbdApiProjectIntentionContractListGetRequest>({});

  const checkValue = ref<boolean | (string | number | boolean)[]>([]);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    console.log(value, '------');
    console.log(Number(value), '---');
    checkValue.value = value;
    search.value.cancel = Number(value) + '';
  };

  //重置列表
  const onReset = () => {
    search.value.startSignDate = '';
    search.value.endSignDate = '';
    search.value.cancel = '';
    checkValue.value = false;
    getMerchantList('');
    getStoreSelectList('');
    getMerchantBrandList('');
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
    menu: false,
    menuSpan: 24,
    pageShow: true,
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '项目名称',
        prop: 'projectName',
        type: 'select',
        width: 140,
        ellipsis: true,
        tooltip: true,
        dic: projectList
      },
      {
        label: '项目名称',
        prop: 'projectId',
        search: true,
        hide: true,
        type: 'select',
        dic: projectList,
        options: {
          allowSearch: true,
          onChange: (val: string) => {
            getMerchantList(val);
            getStoreSelectList(val);
            getMerchantBrandList(val);
          }
        }
      },
      {
        label: '意向合同号',
        prop: 'code',
        width: 186,
        search: true,
        options: {
          maxLength: 20
        }
      },
      {
        label: '合同版本号',
        prop: 'version',
        width: 110
      },
      {
        label: '业务状态',
        prop: 'businessStatus',
        type: 'select',
        dic: intention_business_status,
        search: true
      },
      {
        label: '审批状态',
        prop: 'verifyStatus',
        type: 'select',
        dic: examine_status,
        search: true
      },
      {
        label: '商户',
        prop: 'merchantName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '商户',
        prop: 'merchantId',
        search: true,
        hide: true,
        type: 'select',
        dic: merchantList,
        options: {
          allowSearch: true,
          maxLength: 20
        }
      },
      {
        label: '店铺',
        prop: 'storeName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '店铺',
        prop: 'storeId',
        search: true,
        hide: true,
        type: 'select',
        dic: storeSelectList,
        options: {
          allowSearch: true,
          maxLength: 20
        }
      },
      {
        label: '品牌',
        prop: 'brandName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '品牌',
        prop: 'brandId',
        search: true,
        hide: true,
        type: 'select',
        dic: merchantBrandList,
        options: {
          allowSearch: true,
          maxLength: 20
        }
      },
      {
        label: '签约日期',
        prop: 'signDate',
        type: 'dateRange',
        search: true,
        options: {
          onChange: (val: string[]) => {
            const [start, end] = val;
            search.value.startSignDate = start;
            search.value.endSignDate = end;
          }
        }
      },
      {
        label: '',
        prop: 'showAbandon',
        type: 'checkbox',
        search: true,
        hide: true
      },
      {
        label: '操作',
        prop: 'optional',
        width: 140,
        fixed: 'right'
      }
    ]
  });

  const businessName = computed(() => (val: number) => {
    return (
      intention_business_status.find(
        (item) => Number(item.value) === Number(val)
      )?.label || '--'
    );
  });

  const examineName = computed(() => (val: number) => {
    return (
      examine_status.find((item) => Number(item.value) === Number(val))
        ?.label || '--'
    );
  });
</script>

<style scoped lang="less">
  .i-btn {
    //min-width: 80px;
    //height: 30px;
    //border-radius: 4px;
  }
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
</style>
