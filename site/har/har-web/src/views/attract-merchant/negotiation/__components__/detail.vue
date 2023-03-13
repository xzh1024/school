<template>
  <drawer
    v-model="visible"
    title="招商计划查看"
    show-log
    no-padding
    :options="{
      'cancel-text': '返回'
    }"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_invest_plan'
    }"
    @cancel="visible = false"
  >
    <a-tabs
      :default-active-key="1"
      style="width: 100%; background-color: #fff"
      @change="onChange"
    >
      <a-tab-pane :key="1" title="计划详情">
        <PlanDetail hide-commission show-channel :data="planDetail" />
      </a-tab-pane>
      <a-tab-pane :key="2" title="审批详情">
        <div style="background-color: #fff">
          <exam-title
            title="招商计划审批"
            :code="examCode"
            :status="status"
          ></exam-title>
          <examine-detail :process-list="processList" :xml-data="XMLData" />
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3" title="谈判记录">
        <div class="nego-record-list">
          <div class="table-title" style="padding-bottom: 16px">初始阶段</div>
          <div
            v-for="(item, idx) in list"
            :key="idx"
            class="i-card flex align-center each-card"
          >
            <div style="height: 100%; width: 40px">
              <div class="icon-box">
                <span
                  class="line"
                  :class="{
                    hideTail: idx === list.length - 1,
                    hideHead: list.length === 1
                  }"
                ></span>
                <img class="icon" src="@/assets/images/tel.png" alt="" />
              </div>
            </div>
            <div style="width: calc(100% - 40px)">
              <i-card style="background-color: #f8f8f8">
                <template #title>
                  <a-descriptions :column="1">
                    <a-descriptions-item label="谈判模式：">{{
                      valueFindLabel(negotiateStageList, item.negotiateStage)
                    }}</a-descriptions-item>
                    <a-descriptions-item label="参会人员：">
                      {{ handlePerson(item.attendeeList || []) }}
                    </a-descriptions-item>
                  </a-descriptions>
                </template>
                <template #extra>
                  <a-button
                    v-permission="['invest:negotiate:del']"
                    type="text"
                    @click="onEdit(item)"
                    >编辑</a-button
                  >
                  <a-button
                    v-permission="['invest:negotiate:info']"
                    type="text"
                    @click="toDetail(item)"
                    >查看</a-button
                  >
                  <a-popconfirm
                    v-permission="['invest:negotiate:del']"
                    position="left"
                    content="数据删除后无法恢复，是否删除？"
                    @ok="onDelete(item)"
                  >
                    <a-button type="text" status="danger">删除</a-button>
                  </a-popconfirm>
                </template>
                <a-descriptions :column="4" layout="vertical">
                  <a-descriptions-item label="客户对接人">{{
                    handlePerson(item.customerList || [])
                  }}</a-descriptions-item>
                  <a-descriptions-item label="租赁意向">
                    {{ item.leaseName }}
                  </a-descriptions-item>
                  <a-descriptions-item label="意向品牌">{{
                    item.brandName
                  }}</a-descriptions-item>
                  <a-descriptions-item label="谈判日期">{{
                    formatTime(item.negotiateDate, 'YYYY-MM-DD')
                  }}</a-descriptions-item>
                  <a-descriptions-item label="期望起租日期">{{
                    formatTime(item.expectLeaseDate, 'YYYY-MM-DD')
                  }}</a-descriptions-item>
                  <a-descriptions-item label="意向铺位">{{
                    item.estateName
                  }}</a-descriptions-item>
                  <a-descriptions-item label="期望租期(月)">{{
                    item.expectLeaseMonth
                  }}</a-descriptions-item>
                  <a-descriptions-item label="谈判时间"
                    >{{ item.negotiateStime }}-{{
                      item.negotiateEtime
                    }}</a-descriptions-item
                  >
                  <a-descriptions-item label="租赁面积"
                    >{{ item.expectMinArea }}-{{
                      item.expectMaxArea
                    }}㎡</a-descriptions-item
                  >
                  <a-descriptions-item label="期望租金范围"
                    >￥{{ item.expectMinRent }}-
                    {{ item.expectMaxRent }}</a-descriptions-item
                  >
                  <a-descriptions-item label="谈判地址">{{
                    item.address
                  }}</a-descriptions-item>
                </a-descriptions>
              </i-card>
            </div>
          </div>
          <div class="split-bg"></div>
          <div class="block-title" style="padding-left: 16px">意向合同阶段</div>
          <i-table
            :options="contractOptions"
            :data="contractData.expectContractList"
          ></i-table>
          <div class="split-bg"></div>
          <div class="block-title" style="padding-left: 16px">正式合同阶段</div>
          <i-table
            :options="contractOptions"
            :data="contractData.contractList"
          ></i-table>
        </div>
      </a-tab-pane>
    </a-tabs>
    <template v-if="active === 3" #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button
        v-permission="['invest:negotiate:add']"
        type="primary"
        @click="showAddModal"
        >添加</a-button
      >
      <a-button type="primary" @click="visible = false">确认</a-button>
    </template>
    <detail-record
      v-if="showDetail"
      :id="String(recordId)"
      v-model="showDetail"
      @ok="showDetail = false"
      @edit="onEditDetail"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import PlanDetail from '../../__components__/plan-detail.vue';
  import DetailRecord from './detail-record.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ICard from '@/components/i-card/i-card.vue';
  import ITable from '@/components/i-table/index.vue';
  import ExamTitle from '@/components/exam-title/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ExamineDetail from '@/views/homePage/_components_/examine-detail.vue';
  import {
    cbdApiProjectInvestPlanDetailIdGet,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectNegotiateDelGet,
    cbdApiProjectNegotiateRecordListGet,
    cbdApiProjectNegotiateRecordContractGet,
    type CbdApiProjectNegotiateRecordContractGetResponse,
    type CbdApiProjectNegotiateRecordListGetResponse,
    type CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectCommonMisTreeExpenseGet,
    CbdApiProjectInvestPlanDetailIdGetResponse,
    cbdApiProjectPageApprovalInfoGet
  } from '@/api';
  import { negotiateStageList, leaseTypeList } from '@/utils/dic';
  import { valueFindLabel, formatTime } from '@/utils';
  import { useRequest } from '@har/use';

  type RowData =
    Required<CbdApiProjectNegotiateRecordListGetResponse>['rows'][0];
  type FeeItem = CbdApiProjectCommonMisTreeExpenseGetResponse[0];
  type Detail = CbdApiProjectInvestPlanDetailIdGetResponse & {
    floorList: any[];
    showRadio?: string;
    feeTypeNames?: string;
  };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: undefined
    }
  });
  const recordId = ref<number>();
  const active = ref<number>(1);
  const list = ref<Array<RowData>>([]);
  const emits = defineEmits(['update:modelValue', 'showAdd', 'new']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const contractOptions = ref<Recordable>({
    index: true,
    indexTitle: '序号',
    columns: [
      {
        label: '商户',
        prop: 'merchantName'
      },
      {
        label: '合同号',
        prop: 'contractCode'
      },
      {
        label: '状态',
        prop: 'businessStatus'
      },
      {
        label: '合同开始时间',
        prop: 'leaseStartDate'
      },
      {
        label: '合同结束时间',
        prop: 'leaseEndDate'
      }
      // {
      //   label: '详情',
      //   prop: ''
      // }
    ]
  });
  const contractData = ref<CbdApiProjectNegotiateRecordContractGetResponse>({});
  const { run: getContractInfo } = useRequest(
    cbdApiProjectNegotiateRecordContractGet,
    {
      manual: true,
      onSuccess(res) {
        contractData.value = res;
      }
    }
  );
  const showAddModal = () => {
    emits('new', props.id);
  };
  const onChange = (v: any) => {
    active.value = v;
  };
  function onEdit(record: RowData) {
    emits('showAdd', record.recordId);
  }
  function onEditDetail(id: number) {
    emits('showAdd', id);
  }
  const showDetail = ref(false);
  function toDetail(record: RowData) {
    showDetail.value = true;
    recordId.value = record.recordId;
  }
  async function onDelete(record: RowData) {
    try {
      await cbdApiProjectNegotiateDelGet({ recordId: record.recordId + '' });
      getRecordList();
    } catch (e) {}
  }
  const [getRecordList] = useFuncProxy(async () => {
    const res = await cbdApiProjectNegotiateRecordListGet({
      planId: props.id
    });
    list.value = res.rows as Array<RowData>;
    console.log(list.value);
  });
  function handlePerson(arr: { userId?: number; name?: string }[]) {
    let t = '';
    arr.forEach((e: { userId?: number; name?: string }) => {
      t += (e.name || '') + '、';
    });
    return t.slice(0, t.length - 1);
  }

  const feeTypeList = ref<FeeItem[]>([]);
  const planDetail = ref<Detail>({} as Detail);
  const [getPlanDetail] = useFuncProxy(async () => {
    const res = await cbdApiProjectInvestPlanDetailIdGet({
      id: props.id!
    });
    planDetail.value = {
      ...res,
      floorList: [
        {
          buildingName: res.buildingName,
          floorName: res.floorName,
          acreage: res.acreage,
          useAcreage: res.useAcreage,
          estateName: res.estateName
        }
      ],
      feeTypeNames: (res.expenseItemName || []).join('、')
    };
  });

  const XMLData = ref('');
  const processList = ref<any>([]);
  const examCode = ref('');
  const status = ref<number | undefined>(0);
  //流程引擎详情接口
  const getApprovalInfoEngine = async () => {
    try {
      const d = await cbdApiProjectPageApprovalInfoGet({
        procInsId: planDetail.value.flowProcessId || ''
      });
      processList.value = d?.historyInstanceInfoList;
      XMLData.value = d.nodeImg || '';
      status.value = d?.status;
      examCode.value = d?.code || '';
    } catch (e) {
      console.error(e);
    }
  };
  const [getFeeTypeList] = useFuncProxy(async () => {
    feeTypeList.value = await cbdApiProjectCommonMisTreeExpenseGet({
      parentExpenseCodes: '202212270002,202212270003'
    });
  });
  onMounted(async () => {
    await getFeeTypeList();
    if (props.id) {
      await getPlanDetail();
      await getApprovalInfoEngine();
    }
  });
  watch(
    () => active.value,
    (v) => {
      if (v === 3) {
        getRecordList();
        getContractInfo({
          planId: props.id
        });
      }
    }
  );
  watch(
    () => props.refresh,
    () => {
      getPlanDetail();
      getRecordList();
    }
  );
</script>
<style scoped lang="less">
  :deep(.arco-card-actions) {
    margin-top: 0;
  }
  :deep(.arco-tabs-content) {
    padding: 12px 16px;
    background-color: #efefef;
  }
  :deep(.arco-tabs-nav-tab-list) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  :deep(.arco-card-size-medium) {
    .arco-card-header {
      height: 72px;
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    padding: 4px;
    background-color: #4c8af7;
    border-radius: 50%;
    .line {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 1px;
      min-height: 310px;
      background-color: #4c8af7;
      &.hideHead {
        min-height: 0;
        height: 0;
      }
      &.hideTail {
        top: unset;
        bottom: 0;
      }
    }

    .icon {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  }
  .nego-record-list {
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 80vh;
    background-color: #fff;
    .each-card {
      margin-bottom: 0;
      padding-top: 0;
    }
  }
  .table-title {
    padding-top: 16px;
    padding-left: 16px;
    font-size: 16px;
  }
</style>
