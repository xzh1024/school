<template>
  <div>
    <i-table
      ref="refTable"
      v-model:selected-keys="selectedKeys"
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="options"
      :api="cbdApiProjectInvestExpensesListGet"
      @reset="onReset"
    >
      <template #showAbandonForm>
        <a-checkbox v-model="showCancel" @change="onCheck"
          >显示已作废数据</a-checkbox
        >
      </template>
      <template #header>
        <a-space>
          <a-button
            v-permission="['invest:expenses:confirm']"
            type="primary"
            :disabled="!selectedKeys.length"
            @click="onVerifyClick"
            >确认</a-button
          >
          <a-button
            v-permission="['invest:expenses:export']"
            type="primary"
            @click="onExportClick"
            >批量导出</a-button
          >
        </a-space>
      </template>
      <template #typeCell="{ record }">
        {{ valueFindLabel(attractBillTypeList, record.type) }}
      </template>
      <template #settleModeCell="{ record }">
        {{ valueFindLabel(calculateTypeList, record.settleMode) }}
      </template>
      <template #businessStatusCell="{ record }">
        {{ valueFindLabel(attractBusinessStatusList, record.businessStatus) }}
      </template>
      <template #verifyStatusCell="{ record }">
        {{ valueFindLabel(attractVerifyStatusList, record.verifyStatus) }}
      </template>
      <template #optionCell="{ record }">
        <div class="flex" style="margin-left: -15px">
          <a-button
            v-if="record.verifyStatus !== 2"
            v-permission="['invest:expenses:info']"
            type="text"
            @click="onEdit(record)"
            >编辑</a-button
          >
          <a-button
            v-permission="['invest:expenses:info']"
            type="text"
            @click="onDetail(record)"
            >查看</a-button
          >
        </div>
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      :id="String(page.id)"
      v-model="page.detailVisible"
      v-model:is-edit="page.isEdit"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, Ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    type CbdApiProjectInvestExpensesListGetResponse,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectInvestExpensesListGet,
    cbdApiProjectInvestExpensesPeriodSelectGet,
    cbdApiProjectInvestExpensesBatchConfirmPost,
    cbdApiProjectInvestPlanSelectGet,
    cbdApiProjectCommonInvestChannelListGet,
    CbdApiProjectInvestPlanSelectGetResponse,
    CbdApiProjectCommonInvestChannelListGetResponse,
    cbdApiProjectCommonMisContractSelectGet,
    CbdApiProjectCommonMisContractSelectGetResponse
  } from '@/api';
  import {
    attractBillTypeList,
    calculateTypeList,
    attractBusinessStatusList,
    attractVerifyStatusList
  } from '@/utils/dic';
  import { download, valueFindLabel } from '@/utils';
  import axios from 'axios';
  import { Modal } from '@arco-design/web-vue';
  import useToken from '@/composables/useToken';
  import { useRequest } from '@har/use';

  type RowData =
    Required<CbdApiProjectInvestExpensesListGetResponse>['rows'][0];
  const selectedKeys = ref<number[]>([]);
  const token = useToken();
  const refTable: Ref = ref(null);
  const planDropList = ref<CbdApiProjectInvestPlanSelectGetResponse>([]);
  const channelDropList = ref<CbdApiProjectCommonInvestChannelListGetResponse>(
    []
  );
  const page = reactive<{
    detailVisible: boolean;
    refresh: boolean;
    isEdit: boolean;
    search: Recordable;
    title: string;
    id?: number;
  }>({
    detailVisible: false,
    isEdit: false,
    refresh: false,
    id: undefined,
    search: {
      projectId: ''
    },
    title: ''
  });
  const options = computed<Recordable>(() => {
    return {
      indexTitle: '序号',
      index: true,
      menu: false,
      menuSpan: 18,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false
        }
      },
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',
          options: {
            allowClear: false,
            onChange(e: string) {
              getPlanList({ projectId: e });
              getChannelList({ projectId: e });
            }
          },
          dicRequest: cbdApiProjectCommonProjectSelectListGet
        },
        {
          label: '项目名称',
          width: 140,
          ellipsis: true,
          tooltip: true,
          prop: 'projectName'
        },
        {
          label: '招商计划',
          prop: 'planId',
          type: 'select',
          ellipsis: true,
          tooltip: true,
          dic: planDropList,
          options: {
            allowSearch: true,
            maxLength: 40
          },
          search: true,
          hide: true
        },
        {
          label: '招商计划',
          prop: 'planName',
          width: 180
        },
        {
          label: '账单类型',
          width: 100,
          prop: 'type'
        },
        {
          label: '账单编号',
          width: 180,
          prop: 'code'
        },
        {
          label: '渠道名称',
          width: 100,
          prop: 'channelName'
        },
        {
          label: '账期',
          width: 100,
          prop: 'period'
        },
        {
          label: '渠道名称',
          type: 'select',
          prop: 'channelId',
          search: true,
          hide: true,
          dic: channelDropList,
          options: {
            allowSearch: true,
            maxLength: 20
          }
        },
        {
          label: '计算方式',
          prop: 'settleMode',
          width: 100,
          type: 'select',
          dic: calculateTypeList,
          search: true
        },
        {
          label: '关联合同',
          prop: 'contractCode',
          width: 180,
          type: 'select',
          options: {
            maxLength: 20,
            allowSearch: true,
            fieldNames: {
              label: 'code',
              value: 'code'
            }
          },
          search: true,
          dic: contractList.value
        },
        {
          label: '账期',
          type: 'select',
          width: 100,
          search: true,
          hide: true,
          prop: 'period',
          dicRequest: cbdApiProjectInvestExpensesPeriodSelectGet
        },
        {
          label: '账单金额',
          width: 100,
          prop: 'adjustedAmount'
        },
        {
          label: '业务状态',
          type: 'select',
          width: 100,
          search: true,
          options: {
            multiple: true
          },
          prop: 'businessStatus',
          dic: attractBusinessStatusList
        },
        {
          label: '审批状态',
          type: 'select',
          width: 120,
          search: true,
          options: {
            multiple: true
          },
          prop: 'verifyStatus',
          dic: attractVerifyStatusList
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
          prop: 'option',
          width: 220,
          align: 'left',
          fixed: 'right'
        }
      ]
    };
  });
  const showCancel = ref(false);
  const onReset = () => {
    showCancel.value = false;
    page.search = {};
    getPlanList({ projectId: '' });
    getChannelList({ projectId: '' });
  };
  const onCheck = (e: boolean | (string | number | boolean)[]) => {
    page.search.cancel = e ? 1 : 0;
  };
  const onEdit = (record?: RowData) => {
    page.detailVisible = true;
    page.isEdit = true;
    page.id = record?.id;
  };
  const onDetail = (record?: RowData) => {
    page.detailVisible = true;
    page.isEdit = false;
    page.id = record?.id;
  };
  const exportData = async () => {
    try {
      const d: any = await axios({
        method: 'get',
        url: `/cbd-api-project/invest/expenses/export`,
        params: {
          ...page.search,
          ids: selectedKeys.value.join(',')
        },
        headers: {
          Authorization: token.getToken()
        },
        responseType: 'blob'
      });
      const blob = new Blob([d.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      download(url, '招商费用单');
    } catch (e) {
      console.error(e);
    }
  };
  const onExportClick = () => {
    const msg = selectedKeys.value.length
      ? '确认导出当前勾选的数据吗?'
      : '您未勾选数据,要导出本页数据吗?';
    Modal.open({
      title: '提示',
      content: msg,
      onOk() {
        exportData();
      }
    });
  };
  // 批量审批点击
  const onVerifyClick = () => {
    const tempArr = refTable.value.data.filter((el: RowData) =>
      selectedKeys.value.includes(el.id)
    );
    // 只有145状态的可以提交
    const idsArr = tempArr
      .filter(
        (el: RowData) =>
          [1, 4, 5].includes(el.verifyStatus) && el.businessStatus === 1
      )
      .map((a: RowData) => a.id);
    const msg = `您勾选了 ${selectedKeys.value.length} 条数据 ,${
      idsArr.length === 0
        ? ' 所选数据都不能提交审批'
        : '其中 ' + idsArr.length + ' 条可提交审批, 提交后无法删除, 是否提交?'
    }`;
    Modal.open({
      title: '提示',
      content: msg,
      onOk: async () => {
        if (idsArr.length) {
          await cbdApiProjectInvestExpensesBatchConfirmPost({
            ids: idsArr
          });
          selectedKeys.value = [];
          page.refresh = true;
        }
      }
    });
  };

  const { run: getPlanList } = useRequest(cbdApiProjectInvestPlanSelectGet, {
    manual: true,
    onSuccess(res) {
      planDropList.value = res;
    }
  });
  const { run: getChannelList } = useRequest(
    cbdApiProjectCommonInvestChannelListGet,
    {
      manual: true,
      onSuccess(res) {
        channelDropList.value = res;
      }
    }
  );
  type ContractItem = CbdApiProjectCommonMisContractSelectGetResponse[0];
  const contractList = ref<ContractItem[]>([]);
  const { run: getContractList } = useRequest(
    cbdApiProjectCommonMisContractSelectGet,
    {
      manual: true,
      onSuccess(res) {
        res.forEach((el: ContractItem) => {
          if (
            contractList.value.every((a: ContractItem) => a.code !== el.code)
          ) {
            contractList.value.push(el);
          }
        });
      }
    }
  );
  onMounted(() => {
    getPlanList({ projectId: page.search.projectId || '' });
    getChannelList({ projectId: page.search.projectId || '' });
    getContractList({});
  });
</script>
<style scoped lang="less"></style>
