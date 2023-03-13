<template>
  <div class="page-container">
    <i-table
      ref="tableListRef"
      v-model="search"
      v-model:refresh-now="isRefresh"
      v-model:selectedKeys="selectedKeys"
      v-model:page="page"
      :options="options"
      :api="getList"
      @reset="onReset"
    >
      <template #showAbandonForm>
        <a-checkbox v-model="checkValue" :value="1" @change="onCheck">
          显示已作废数据
        </a-checkbox>
      </template>
      <template #header>
        <div class="flex align-center justify-between">
          <a-space>
            <a-button class="i-btn" type="primary">签单</a-button>
            <a-button class="i-btn" type="primary" @click="onBatchFreeze">
              批量冻结
            </a-button>
            <a-button class="i-btn" type="primary" @click="onBatchThaw">
              批量解冻
            </a-button>
          </a-space>
          <div class="flex align-center">
            <a-descriptions
              layout="inline-horizontal"
              :column="5"
              :label-style="{ color: '#999999', marginLeft: '16px' }"
              :value-style="{ color: '#333333' }"
            >
              <a-descriptions-item label="合计销售：">
                ￥{{ cardOrderCount?.totalAmount }}
              </a-descriptions-item>
              <a-descriptions-item label="张数：">
                {{ cardOrderCount?.totalCardNum }}
              </a-descriptions-item>
              <a-descriptions-item label="总次数：">
                {{ cardOrderCount?.totalNum }}
              </a-descriptions-item>
              <a-descriptions-item label="已消费次数：">
                {{ cardOrderCount?.totalConsumedNum }}
              </a-descriptions-item>
              <a-descriptions-item label="未消费次数：">
                {{ cardOrderCount?.totalUnConsumedNum }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </template>
      <template #businessStatCell="{ record }">
        {{ valueFindLabel(pay_collect_status, record.businessStat) }}
      </template>
      <template #auditStatCell="{ record }">
        {{ valueFindLabel(examine_status, record.auditStat) }}
      </template>
      <template #optionalCell="{ record }">
        <a-space>
          <div class="s-btn" @click="onSee(record)"> 查看 </div>
        </a-space>
      </template>
    </i-table>
    <detail
      v-if="page.showDetail"
      :id="selectRow?.id"
      v-model="page.showDetail"
      :row-data="selectRow"
      @refresh="
        () => {
          page.showDetail = false;
          initData();
        }
      "
    />
    <batch-freeze
      v-model:visible="batchFreezeVisible"
      @submit="doBatchFreeze"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import {
    cbdApiProjectMisPayMethodListPost,
    CbdApiProjectMisPayMethodListPostResponse,
    CbdApiProjectMisPaymentRefundPageListGetResponse
  } from '@/api';
  import {
    groundPcApiCardOrderTimeLimitListGet,
    GroundPcApiCardOrderTimeLimitListGetRequest,
    groundPcApiCardOrderTimeLimitStatisticsGet,
    GroundPcApiCardOrderTimeLimitStatisticsGetResponse,
    groundPcApiCardOrderTimeLimitFreezePut,
    GroundPcApiCardOrderTimeLimitFreezePutRequest,
    groundPcApiCardOrderTimeLimitThawPut
  } from '@/api/ground-pc-api';
  import { pay_collect_status, examine_status } from '@/utils/dic';
  import {
    projectList,
    storeSelectList,
    getExpenseList,
    getProjectListData,
    getMerchantDropList,
    getStoreSelectList
  } from '@/views/finance-manage/useGetCommonData';
  import { getActiveProjectId, valueFindLabel } from '@/utils';
  import { useRequest } from '@har/use';
  import BatchFreeze from './__components__/batchFreeze.vue';

  type RowModel =
    Required<CbdApiProjectMisPaymentRefundPageListGetResponse>['rows'][0];
  type PageConfig = {
    showDetail: boolean;
    id: string;
    current: number;
    pageSize: number;
    total: number;
  };

  const getList = (params: GroundPcApiCardOrderTimeLimitListGetRequest) => {
    // 获取统计信息
    getCardOrderCount();
    return groundPcApiCardOrderTimeLimitListGet(params);
  };
  const page = reactive<PageConfig>({
    showDetail: false,
    id: '',
    current: 1,
    pageSize: 10,
    total: 0
  });
  const tableListRef = ref<InstanceType<typeof ITable>>();

  const checkValue = ref<boolean | (string | number | boolean)[]>(false);
  const onCheck = (value: boolean | (string | number | boolean)[]) => {
    checkValue.value = value;
    search.value.cancelStat = value ? 1 : 0;
  };
  type SearchType = {
    projectId?: number;
    cancelStat?: number;
    purchaseStartTime?: string;
    purchaseEndTime?: string;
    activeStartTime?: string;
    activeEndTime?: string;
    expirationStartTime?: string;
    expirationEndTime?: string;
  };
  const search = ref<SearchType>({});

  const isRefresh = ref(false);
  const selectRow = ref<RowModel>();
  const cardOrderCount =
    ref<GroundPcApiCardOrderTimeLimitStatisticsGetResponse>({
      totalAmount: 0,
      totalCardNum: 0,
      totalNum: 0,
      totalConsumedNum: 0,
      totalUnConsumedNum: 0
    });
  const { run: getCardOrderCount } = useRequest(
    groundPcApiCardOrderTimeLimitStatisticsGet,
    {
      manual: true,
      onSuccess(res) {
        cardOrderCount.value = res;
      }
    }
  );
  const batchFreezeVisible = ref(false);
  // 批量冻结
  const batchFreezeIds = ref<number[]>([]);
  const onBatchFreeze = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先勾选数据' });
    let flag = false;
    const ids: number[] = [];
    selectedKeys.value.forEach((id) => {
      const findData = tableListRef.value?.data.find(
        (item: RowModel) => item.id === id
      );
      if (findData && findData.cardStatus === 1) {
        flag = true;
        ids.push(id);
      }
    });
    if (!flag) return Message.error({ content: '所选卡都已冻结或已过期' });
    batchFreezeIds.value = [...ids];
    batchFreezeVisible.value = true;
  };
  const doBatchFreeze = (data = {}) => {
    submitBatchFreeze({
      ...data,
      ids: batchFreezeIds.value
    } as GroundPcApiCardOrderTimeLimitFreezePutRequest);
  };
  const { run: submitBatchFreeze } = useRequest(
    groundPcApiCardOrderTimeLimitFreezePut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '冻结成功' });
        initData();
        batchFreezeVisible.value = false;
      }
    }
  );
  // 批量解冻
  const batchThawIds = ref<number[]>([]);
  const onBatchThaw = () => {
    if (selectedKeys.value.length < 1)
      return Message.error({ content: '请先勾选数据' });
    let flag = false;
    const ids: number[] = [];
    selectedKeys.value.forEach((id) => {
      const findData = tableListRef.value?.data.find(
        (item: RowModel) => item.id === id
      );
      if (findData && findData.cardStatus === 2) {
        console.log(findData.cardStatus);
        console.log(2222);
        flag = true;
        ids.push(id);
      }
    });
    if (!flag)
      return Message.error({ content: '所选卡都已解冻，无需再次解冻' });
    batchThawIds.value = [...ids];
    submitBatchThaw({ ids: batchThawIds.value });
  };
  const { run: submitBatchThaw } = useRequest(
    groundPcApiCardOrderTimeLimitThawPut,
    {
      manual: true,
      onSuccess: () => {
        Message.success({ content: '解冻成功' });
        initData();
      }
    }
  );
  const initData = () => {
    selectedKeys.value = [];
    Object.assign(page, { total: 0, current: 1 });
    isRefresh.value = true;
  };
  const onSee = (record: RowModel) => {
    page.showDetail = true;
    selectRow.value = record;
  };

  const selectedKeys = ref<Array<number>>([]);
  const payMethodList = ref<{ value: number; label: string }[]>([]);
  const options = computed(() => {
    return {
      menuOtherOptions: {
        pagePosition: 'bl',
        scroll: {
          x: '150%'
        },
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true,
          width: 10
        },
        onSelectionChange: (e: number[]) => {
          selectedKeys.value = e;
        }
      },
      menu: false,
      menuSpan: 24,
      pageShow: true,
      index: true,
      indexTitle: '序号',
      indexWidth: 20,
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          search: true,
          type: 'select',
          width: 60,
          dic: projectList,
          options: {
            allowSearch: true,
            onChange: (val: number) => {
              getPayMethodList({ projectId: val, scenes: 1 });
              getMerchantDropList(val);
              getStoreSelectList(val);
            }
          },
          formatter({ projectName }: any) {
            return projectName;
          }
        },
        {
          label: '店铺名称',
          prop: 'storeId',
          search: true,
          type: 'select',
          width: 60,
          options: {
            allowSearch: true,
            maxLength: 20
          },
          dic: storeSelectList,
          formatter({ storeName }: any) {
            return storeName;
          }
        },
        {
          label: '编号',
          prop: 'orderNo',
          width: 60
        },
        {
          label: '次卡名称',
          prop: 'cardName',
          width: 60
        },
        {
          label: '有效期(天)',
          prop: 'buyNum',
          width: 40
        },
        {
          label: '购卡人姓名',
          prop: 'membersName',
          width: 40
        },
        {
          label: '电话',
          prop: 'membersPhone',
          width: 60
        },
        {
          label: '购买渠道',
          prop: 'purchaseChannel',
          width: 40,
          search: true,
          type: 'select',
          dic: [
            {
              label: '线上',
              value: 1
            },
            {
              label: '线下',
              value: 2
            }
          ],
          formatter({ purchaseChannelName }: any) {
            return purchaseChannelName;
          }
        },
        {
          label: '激活状态',
          prop: 'activeStatus',
          width: 40,
          search: true,
          type: 'select',
          dic: [
            {
              label: '已激活',
              value: 1
            },
            {
              label: '未激活',
              value: 2
            }
          ],
          formatter({ activeStatusName }: any) {
            return activeStatusName;
          }
        },
        {
          label: '卡状态',
          prop: 'cardStatus',
          width: 40,
          search: true,
          type: 'select',
          dic: [
            {
              label: '使用中',
              value: 1
            },
            {
              label: '已冻结',
              value: 2
            },
            {
              label: '已过期',
              value: 3
            }
          ],
          formatter({ cardStatusName }: any) {
            return cardStatusName;
          }
        },
        {
          label: '签单门店',
          prop: 'signStoreName',
          width: 60
        },
        {
          label: '购买时间',
          prop: 'purchaseTime',
          type: 'dateRange',
          search: true,
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [purchaseStartTime, purchaseEndTime] = val;
              search.value.purchaseStartTime = purchaseStartTime;
              search.value.purchaseEndTime = purchaseEndTime;
            }
          }
        },
        {
          label: '激活时间',
          prop: 'activeTime',
          type: 'dateRange',
          search: true,
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [activeStartTime, activeEndTime] = val;
              search.value.activeStartTime = activeStartTime;
              search.value.activeEndTime = activeEndTime;
            }
          }
        },
        {
          label: '到期时间',
          prop: 'expirationTime',
          type: 'dateRange',
          search: true,
          hide: true,
          options: {
            onChange: (val: string[]) => {
              const [expirationStartTime, expirationEndTime] = val;
              search.value.expirationStartTime = expirationStartTime;
              search.value.expirationEndTime = expirationEndTime;
            }
          }
        },
        {
          label: '持卡人信息',
          prop: 'memberKeyWord',
          search: true,
          hide: true,
          options: {
            allowSearch: true,
            maxLength: 20,
            placeholder: '姓名/电话/会员号'
          }
        },
        {
          label: '销售人员',
          prop: 'salesStaffId',
          type: 'select',
          search: true,
          hide: true,
          dic: [
            {
              label: '销售人员一',
              value: 1
            },
            {
              label: '销售人员二',
              value: 2
            }
          ]
        },
        {
          label: '操作',
          prop: 'optional',
          width: 20,
          fixed: 'right'
        }
      ]
    };
  });
  type PayMethod = Required<CbdApiProjectMisPayMethodListPostResponse>[0];
  type MethodDetail = Required<PayMethod>['methodDetails'][0];
  const { run: getPayMethodList } = useRequest(
    cbdApiProjectMisPayMethodListPost,
    {
      manual: true,
      onSuccess(res) {
        payMethodList.value = [];
        res.forEach((el: PayMethod) => {
          el.methodDetails?.forEach((each: MethodDetail) => {
            if (each.switchs === 1) {
              payMethodList.value.push({
                value: Number(each.id),
                label: String(each.paymentMethod)
              });
            }
          });
        });
      }
    }
  );
  const onReset = () => {
    search.value = {
      cancelStat: checkValue.value ? 1 : 0,
      projectId: getActiveProjectId()
    };
  };
  onMounted(() => {
    getProjectListData();
    getExpenseList({ parentExpenseCode: '0' });
    const id = search.value.projectId;
    if (id) {
      getMerchantDropList(id);
      getStoreSelectList(id);
      getPayMethodList({ projectId: id, scenes: 1 });
    }
  });
</script>

<style scoped lang="less">
  .i-btn {
    min-width: 80px;
    height: 30px;
    border-radius: 4px;
  }
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }

  .count-item {
    .count-label {
      color: #999999;
    }
  }
</style>
