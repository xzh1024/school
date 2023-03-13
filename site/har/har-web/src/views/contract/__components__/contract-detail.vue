<template>
  <div>
    <drawer
      v-model="visible"
      :options="{ footer: isFooter, title: '合同详情' }"
    >
      <template #footer>
        <a-button
          v-if="info.update && info.status === 1"
          v-permission="['contract:update']"
          type="outline"
          @click="editContract"
          >编辑合同</a-button
        >
        <a-button
          v-if="info.cancel && info.status !== 1 && info.status !== 7"
          v-permission="['contract:cancel']"
          type="primary"
          @click="contractOperate('cancel')"
          >合同作废</a-button
        >
        <template v-if="info.verify && info.status === 2">
          <a-button
            v-permission="['contract:verify']"
            type="primary"
            @click="contractOperate('refuse')"
            >审核拒绝</a-button
          >
          <a-button
            v-permission="['contract:verify']"
            type="primary"
            @click="contractOperate('pass')"
            >审核通过</a-button
          >
        </template>
      </template>
      <div>
        <a-tabs v-model:active-key="activeIndex">
          <a-tab-pane :key="1" title="合同"> </a-tab-pane>
          <a-tab-pane :key="2" title="审批"> </a-tab-pane>
        </a-tabs>
        <div v-show="activeIndex === 1">
          <template v-if="loading">
            <a-skeleton animation>
              <a-skeleton-line :rows="20" />
            </a-skeleton>
          </template>
          <template v-else>
            <div class="margin-bottom-xs">
              <a-descriptions title="合同基本信息" :column="3">
                <a-descriptions-item label="合同甲方">{{
                  info.ascriptionCompanyName
                }}</a-descriptions-item>
                <a-descriptions-item label="合同编号">{{
                  info.code
                }}</a-descriptions-item>
                <a-descriptions-item label="状态">{{
                  getStatus(info.status)
                }}</a-descriptions-item>
                <a-descriptions-item label="方案号">{{
                  info.schemeCode
                }}</a-descriptions-item>
                <a-descriptions-item label=" 合同开始时间">{{
                  info.periodStart
                }}</a-descriptions-item>
                <a-descriptions-item label="合同结束时间">{{
                  info.periodEnd
                }}</a-descriptions-item>
                <a-descriptions-item label="甲方地址" :span="3">{{
                  info.address
                }}</a-descriptions-item>
                <a-descriptions-item label="备注" :span="3">{{
                  info.remark
                }}</a-descriptions-item>
                <a-descriptions-item label="合同文件" :span="3">
                  <i-custom-upload
                    v-model="info.files"
                    url-key="previewAddress"
                    :options="{
                      showRemoveButton: false,
                      showUploadButton: false
                    }"
                  ></i-custom-upload>
                </a-descriptions-item>
              </a-descriptions>
            </div>
            <div v-if="contractCancelInfo.cancelBy" class="margin-bottom-xs">
              <a-descriptions title="合同作废信息">
                <a-descriptions-item label="操作人">{{
                  contractCancelInfo.cancelBy
                }}</a-descriptions-item>
                <a-descriptions-item label="操作时间" :span="2">{{
                  formatTime(contractCancelInfo.cancelTime)
                }}</a-descriptions-item>
                <a-descriptions-item label="备注" :span="3">{{
                  contractCancelInfo.cancelRemark
                }}</a-descriptions-item>
              </a-descriptions>
            </div>
            <div class="margin-bottom-xs">
              <a-descriptions title="承租人信息" :column="2">
                <a-descriptions-item label="商户/企业名称" :span="3">{{
                  merchantInfo.name || merchantInfo.merchantName
                }}</a-descriptions-item>
                <a-descriptions-item label="地址" :span="3">{{
                  merchantInfo.address
                }}</a-descriptions-item>
                <a-descriptions-item label="承租人/负责人姓名">{{
                  merchantInfo.principal
                }}</a-descriptions-item>
                <a-descriptions-item label="身份证号码">{{
                  merchantInfo.principalId
                }}</a-descriptions-item>
                <a-descriptions-item label=" 户籍地址">{{
                  merchantInfo.principalRegisterAddress
                }}</a-descriptions-item>
                <a-descriptions-item label="公司名称">{{
                  merchantInfo.companyName
                }}</a-descriptions-item>
                <a-descriptions-item label="法人代表">{{
                  merchantInfo.legalPerson
                }}</a-descriptions-item>
                <a-descriptions-item label="社会统一信用代码">{{
                  merchantInfo.uscCode
                }}</a-descriptions-item>
              </a-descriptions>
            </div>
            <div class="margin-bottom-xs">
              <div class="table-title">合同信息</div>
              <i-table
                :options="contractOptions"
                :data="contractTypeList"
              ></i-table>
            </div>
            <div class="margin-bottom-xs">
              <a-tabs :default-active-key="0" justify>
                <a-tab-pane
                  v-for="(item, index) in costTypeList"
                  :key="index"
                  :title="item.costTypeName"
                >
                  <div>
                    <tab-item-desc :tab-item-info="item"></tab-item-desc>
                    <i-table
                      v-if="item.chargingRule.type !== 2"
                      :options="tabTableOptions"
                      :data="item.payPlan"
                    ></i-table>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
            <div class="margin-bottom-xs">
              <div class="table-title">资产租赁情况</div>
              <i-table :options="options" :data="contractEstateList">
                <template #menu="{ record }">
                  <a-button
                    v-if="record.menu !== 'total'"
                    type="text"
                    @click="viewHandle(record)"
                    >查看</a-button
                  >
                </template>
              </i-table>
            </div>
          </template>
        </div>
        <approval-progress
          v-if="activeIndex === 2"
          :config="{
            businessId: info.id,
            approvalProcessCode: '00001'
          }"
        />
      </div>
    </drawer>
    <i-modal v-model="opinionVisible" :title="title" :on-before-ok="submit">
      <div>
        <div class="opinion-tip margin-bottom">{{ descTip }}</div>
        <div>
          <a-textarea
            v-model="opinion"
            :max-length="200"
            show-word-limit
            placeholder="请输入备注"
          ></a-textarea>
        </div>
      </div>
    </i-modal>
    <i-modal
      v-model="viewVisible"
      title="查看"
      :options="{ okText: '关闭', hideCancel: true, width: 1000 }"
    >
      <view-detail v-if="visible" :info="currentView" />
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ContractDetail'
  };
</script>

<script setup lang="ts">
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectContractCancelPut,
    cbdApiProjectContractInfoIdGet,
    cbdApiProjectContractVerifyPut
  } from '@/api';
  import { computed, Ref, ref, watch } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { sectionToChinese, formatTime } from '@/utils';
  import NP from 'number-precision';
  import dayjs from 'dayjs';
  import IModal from '@/components/i-modal/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import TabItemDesc from './tab-item-desc.vue';
  import { contractStatusList } from '@/utils/dic';
  import ApprovalProgress from '@/components/approvalProcess/index.vue';
  import ViewDetail from './view-detail.vue';
  import type { TableOptions } from '@/components/i-table';

  const props = defineProps({
    id: {
      type: [Number, String]
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh', 'editChange']);
  watch(
    () => props.id,
    (v) => {
      if (v) getInfo();
    }
  );
  const activeIndex: Ref<number> = ref(1);
  const viewVisible: Ref<boolean> = ref(false);
  // 意见内容
  const opinion: Ref<string> = ref('');
  // 意见类型 // cancel 作废  refuse 拒绝  pass 通过
  const opinionType: Ref<string> = ref('');

  const currentView: Ref = ref({});
  const opinionVisible: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(false);
  const info: Ref = ref({});
  const [getInfo] = useFuncProxy(
    async () => {
      info.value = {};
      loading.value = true;
      info.value = await cbdApiProjectContractInfoIdGet(
        { id: `${props.id}` },
        { cache: true }
      );
      loading.value = false;
    },
    () => {
      loading.value = false;
    }
  );

  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const merchantInfo = computed(() => {
    return info.value?.merchantInfo || {};
  });
  const contractEstateList: Ref = computed(() => {
    const contractEstateList = info.value?.contractEstateList || [];
    return contractEstateList.map((k: any) => {
      const { estatePayPlanList } = k;
      let receivableAmount = 0;
      estatePayPlanList.forEach((i: any) => {
        const { payPlan = [] } = i;
        payPlan.forEach((j: any) => {
          receivableAmount = NP.plus(receivableAmount, j.receivableAmount);
        });
      });
      return { ...k, receivableAmount };
    });
  });
  const costTypeList: Ref = computed(() => {
    return info.value?.costTypeList || [];
  });
  const contractTypeList: Ref = computed(() => {
    const { bond, costType } = info.value;
    return [{ bond, costType }];
  });

  const isFooter = computed(() => {
    const { update, cancel, verify, status } = info.value;
    if (status === undefined) return false;
    return (update && status === 1) || cancel || (verify && status === 2);
  });

  const contractOptions = ref<TableOptions>({
    pageShow: false,
    align: 'center',
    menu: false,
    tableCard: false,
    columns: [
      {
        label: '保证金（￥）',
        prop: 'bond'
      },
      {
        label: '费用类型',
        prop: 'costType'
      }
    ]
  });
  const tabTableOptions = ref<TableOptions>({
    pageShow: false,
    align: 'center',
    menu: false,
    tableCard: false,
    menuOtherOptions: {
      border: true,
      summary({ data = [] }) {
        const countData = {
          payStartDate: '',
          cycle: '',
          totalAmount: 0,
          discountAmount: 0,
          receivableAmount: 0
        };
        data.forEach((record: any) => {
          countData.totalAmount = NP.plus(
            countData.totalAmount,
            record.totalAmount
          );
          countData.discountAmount = NP.plus(
            countData.discountAmount,
            record.discountAmount
          );
          countData.receivableAmount = NP.plus(
            countData.receivableAmount,
            record.receivableAmount
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '缴费截止日期',
        prop: 'payStartDate',
        formatter: (record: any) => {
          return record.payEndDate
            ? dayjs(record.payEndDate).format('YYYY-MM-DD')
            : '合计';
        }
      },
      {
        label: '期数',
        prop: 'cycle',
        formatter: (v: any) => {
          const i = sectionToChinese(v.cycle);
          return v.cycle ? `第${i}期` : '-';
        }
      },
      {
        label: '优惠前金额（¥）',
        prop: 'totalAmount'
      },
      {
        label: '优惠金额',
        prop: 'discountAmount'
      },
      {
        label: '应收金额（¥）',
        prop: 'receivableAmount'
      }
    ]
  });
  interface countDataType {
    name: string;
    receivableAmount: string | number;
    leasePurposeName: string;
    manageName: string;
    menu: string;
  }
  const options = ref<TableOptions>({
    pageShow: false,
    tableCard: false,
    align: 'center',
    menuOtherOptions: {
      summaryText: '合计',
      summary({ data = [] }) {
        const countData: countDataType = {
          name: '合计',
          receivableAmount: 0,
          leasePurposeName: '-',
          manageName: '-',
          menu: 'total'
        };
        let hasCommission = false;
        data.forEach((record: any) => {
          countData.receivableAmount = NP.plus(
            countData.receivableAmount,
            record.receivableAmount
          );
          const { estatePayPlanList = [] } = record;
          hasCommission = estatePayPlanList.some((i: any) => {
            const { chargingRule = {} } = i;
            return chargingRule.type === 2;
          });
        });
        if (hasCommission) {
          countData.receivableAmount =
            countData.receivableAmount > 0
              ? `${countData.receivableAmount}+抽佣`
              : '抽佣';
        }
        return [countData];
      }
    },
    columns: [
      {
        label: '资产',
        prop: 'name',
        formatter: (record: any) => {
          return record?.estateName || record?.name;
        }
      },
      {
        label: '面积(㎡)',
        prop: 'acreage'
      },
      {
        label: '应收金额（¥）',
        prop: 'receivableAmount',
        formatter: (record: any) => {
          let res = record.receivableAmount;
          const { estatePayPlanList = [] } = record;
          const hasCommission = estatePayPlanList.some((i: any) => {
            const { chargingRule = {} } = i;
            return chargingRule.type === 2;
          });
          if (hasCommission) {
            res = res > 0 ? `${res}+抽佣` : '抽佣';
          }
          return res;
          // estatePayPlanList  estatePayPlanList chargingRule
        }
      },
      {
        label: '租赁用途',
        prop: 'leasePurposeName'
      },
      {
        label: '经营业态',
        prop: 'manageName'
      }
    ]
  });

  const title = computed(() => {
    if (opinionType.value === 'cancel') {
      return '合同作废';
    }
    return '审核合同';
  });
  const descTip = computed(() => {
    const t = opinionType.value;
    if (t === 'cancel') {
      return '请确认是否作废当前合同？';
    }
    if (t === 'pass') {
      return '请确认是否通过当前合同审核？';
    }
    return '请确认是否拒绝当前合同审核？';
  });

  function contractOperate(v: string) {
    opinionType.value = v;
    opinionVisible.value = true;
  }
  // 作废
  async function submit(done: (closed: boolean) => void) {
    const t = opinionType.value;
    const { id } = info.value;
    try {
      if (t === 'cancel') {
        await cbdApiProjectContractCancelPut({
          id,
          opinions: opinion.value
        });
      } else {
        const result = t === 'pass' ? 1 : 0;
        await cbdApiProjectContractVerifyPut({
          result,
          id,
          opinions: opinion.value
        });
      }
      done(true);
      Message.success('操作成功');
      opinion.value = '';
      getInfo();
      emits('refresh');
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
  function viewHandle(record: any) {
    currentView.value = record;
    viewVisible.value = true;
  }

  function editContract() {
    emits('editChange');
  }

  function getStatus(v: number) {
    return contractStatusList.find((i) => i.value === v)?.label;
  }

  const contractCancelInfo = computed(() => {
    return info.value?.contractCancelInfo || {};
  });

  defineExpose({ getInfo });
</script>

<style scoped lang="less">
  .opinion-tip {
    color: #333;
    font-size: 14px;
  }

  :deep(.arco-tabs) {
    width: 100%;
  }

  :deep(.arco-tabs-nav-tab-list) {
    display: flex;
    flex: 1;
  }

  :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
    flex: 1;
    justify-content: center;
  }

  :deep(.arco-tabs-nav-ink) {
    display: none;
  }

  :deep(.arco-tabs-tab) {
    border-bottom: 2px solid transparent;
  }

  :deep(.arco-tabs-tab-active) {
    border-bottom: 1px solid rgb(var(--primary-6));
  }
</style>
