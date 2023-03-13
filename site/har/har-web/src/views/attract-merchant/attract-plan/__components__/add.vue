<template>
  <drawer
    v-model="visible"
    :title="id ? '编辑招商计划' : '添加招商计划'"
    :mask-close="false"
    :options="{ ...options, okLoading: isLoading }"
  >
    <i-form ref="iForm" v-model="editForm" :options="formProps">
      <template #merchantIdForm>
        <div class="input-box">
          <a-select
            v-model="editForm.merchantId"
            placeholder="请选择商户"
            multiple
            :options="merchantDropList"
            @change="merchantChange"
          ></a-select>
          <a-button
            class="btn-pos"
            type="text"
            @click="addMerchantVisible = true"
            >新增</a-button
          >
        </div>
      </template>
      <template #brandIdForm>
        <div class="input-box">
          <a-select
            v-model="editForm.brandId"
            placeholder="请选择目标品牌"
            multiple
            :options="brandDropList"
            @change="brandChange"
          ></a-select>
          <a-button class="btn-pos" type="text" @click="addBrandVisible = true"
            >新增</a-button
          >
        </div>
      </template>
      <template #tableListForm>
        <a-row :gutter="24">
          <a-col :span="7">
            <a-form-item
              style="width: 100%; margin-bottom: 0"
              field="buildingId"
              class="building"
              :rules="[{ required: true, message: '楼宇未选择' }]"
            >
              <a-card style="width: 100%">
                <template #title>
                  <div class="card-title">楼宇</div>
                </template>
                <a-radio-group
                  v-model="editForm.buildingId"
                  class="card-content"
                  direction="vertical"
                >
                  <a-radio
                    v-for="item in buildingData"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.label }}</a-radio
                  >
                </a-radio-group>
              </a-card>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item
              style="width: 100%; margin-bottom: 0"
              field="floorId"
              class="building"
              :rules="[{ required: true, message: '楼层未选择' }]"
            >
              <a-card style="width: 100%">
                <template #title>
                  <div class="card-title">楼层</div>
                </template>
                <a-radio-group
                  v-model="editForm.floorId"
                  class="card-content"
                  direction="vertical"
                >
                  <a-radio
                    v-for="item in floorData"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.label }}</a-radio
                  >
                </a-radio-group>
              </a-card>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              style="width: 100%; margin-bottom: 0"
              field="estateId"
              class="building"
              :rules="[{ required: true, message: '商铺未选择' }]"
            >
              <a-card style="width: 100%">
                <template #title>
                  <div class="card-title">商铺</div>
                </template>
                <div style="height: 290px">
                  <i-table
                    v-model:selected-keys="editForm.estateId"
                    style="height: 100%"
                    :options="tableOptions"
                    :data="houseData"
                  >
                    <template #acreageCell="{ record }">{{
                      record.acreage
                    }}</template>
                    <template #useAcreageCell="{ record }">{{
                      record.useAcreage
                    }}</template>
                  </i-table>
                </div>
              </a-card>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="statistic">
          <!--          <a-space>-->
          <!--            <span class="label">总建筑面积：</span>-->
          <!--            <span class="number">{{ editForm.acreage || '&#45;&#45;' }}㎡</span>-->
          <!--            <span class="label">总使用面积：</span>-->
          <!--            <span class="number">{{ editForm.useAcreage || '&#45;&#45;' }}㎡</span>-->
          <!--          </a-space>-->
        </div>
      </template>
      <template #line1Form>
        <div class="split-bg"></div>
      </template>
      <template #line2Form>
        <div class="split-bg"></div>
      </template>
      <template #rentPolicyForm>
        <div style="font-size: 16px; color: #333333">佣金政策</div>
      </template>
      <template v-if="editForm.settleMode === 1" #amountForm>
        <a-row style="width: 100%">
          <a-col :span="10">
            <a-input disabled placeholder="每份合同"></a-input>
          </a-col>
          <a-col :span="10" :offset="1">
            <a-input-number
              v-model="editForm.amount"
              hide-button
              :max="999999999.99"
            >
              <template #prepend>￥</template>
            </a-input-number>
          </a-col>
        </a-row>
      </template>
      <template v-else #ratioTypeForm>
        <a-row style="width: 100%">
          <a-col :span="10">
            <a-select
              v-if="editForm.settleMode === 2"
              v-model="editForm.ratioType"
              placeholder="请选择"
              :options="ratioLabelList"
            ></a-select>
            <a-input v-else disabled placeholder="每份合同"></a-input>
          </a-col>
          <a-col :span="10">
            <a-input-number v-model="editForm.ratio" hide-button :max="100">
              <template #suffix>%</template>
            </a-input-number>
          </a-col>
        </a-row>
      </template>
      <template v-if="editForm.settleMode === 2" #expenseItemsForm>
        <a-select
          v-model="editForm.expenseItems"
          placeholder="请选择"
          :field-names="{
            label: 'expenseType',
            value: 'expenseId'
          }"
          multiple
          :options="feeTypeList"
        ></a-select>
      </template>
      <template #billGenType1Form>
        <a-row style="width: 100%">
          <a-col :span="10">
            <a-select
              v-model="editForm.billGenType1"
              placeholder="请选择"
              :options="billTypeList1"
            ></a-select>
          </a-col>
          <a-col :span="10" :offset="1">
            <a-select
              v-model="editForm.billGenDate"
              placeholder="请选择"
              :options="dateRangeList"
            ></a-select>
          </a-col>
        </a-row>
      </template>
      <template #billGenType2Form>
        <a-row style="width: 100%">
          <a-col :span="10">
            <a-select
              v-model="editForm.billGenType2"
              placeholder="请选择"
              :options="billTypeList2"
            ></a-select>
          </a-col>
          <a-col :span="14">
            <a-input-number
              v-model="editForm.billGenDate"
              hide-button
              :min="1"
              :max="31"
              placeholder="请输入账单生成日期"
            />
          </a-col>
        </a-row>
      </template>
      <template #taxFeeForm>
        <a-input-number v-model="editForm.taxFee" placeholder="请输入税率">
          <template #suffix>%</template>
        </a-input-number>
      </template>
    </i-form>
    <template #footer>
      <a-button @click="visible = false">返回</a-button>
      <a-button
        v-permission="['invest:plan:draft']"
        type="primary"
        @click="saveDraft"
        >添加草稿</a-button
      >
      <a-button
        v-permission="['invest:plan:save']"
        type="primary"
        @click="onSubmit"
        >发起审批</a-button
      >
    </template>
    <create-merchant
      v-model:drawer-visible="addMerchantVisible"
      v-model:form-data="addMerchantForm"
      :project-list="projectList"
      :merchant-type="merchant_type"
      @confirm-submit="onConfirm"
    />
    <create-brand
      v-model:drawer-visible="addBrandVisible"
      v-model:form-data="addBrandForm"
      drawer-title="新增品牌"
      :handle-type="0"
      @submit-success="onSuccess"
    />
  </drawer>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    watch,
    onMounted,
    Ref,
    reactive,
    nextTick
  } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import type { EditForm, BrandForm } from './add';
  import { merchant_type } from '@/config/resource_manage_status';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { calculationList, ratioLabelList } from '@/utils/dic';
  import { getActiveProjectId } from '@/utils';
  import CreateMerchant from '@/views/resource-manage/_component_/create-merchant.vue';
  import CreateBrand from '@/views/resource-manage/_component_/create-brand.vue';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectInvestPlanDraftPost,
    cbdApiProjectInvestPlanSelectGet,
    type CbdApiProjectInvestPlanSelectGetResponse,
    type CbdApiProjectCommonAssetsSelectListGetResponse,
    type CbdApiProjectCommonMerchantBrandListGetResponse,
    cbdApiProjectCommonMerchantListGet,
    type CbdApiProjectCommonMerchantListGetResponse,
    cbdApiProjectCommonInvestChannelListGet,
    cbdApiProjectInvestPlanSavePost,
    cbdApiProjectInvestPlanDetailIdGet,
    type CbdApiProjectInvestPlanDraftPostRequest,
    type CbdApiProjectInvestPlanSavePostRequest,
    CbdApiProjectCommonProjectSelectListGetResponse,
    cbdApiProjectResourceMerchantSavePost,
    cbdApiProjectCommonMisTreeExpenseGet,
    CbdApiProjectCommonMisTreeExpenseGetResponse
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import useDictData from '@/hooks/useDictData';

  const tableOptions = ref({
    menu: false,
    pageShow: false,
    tableCard: false,
    menuOtherOptions: {
      'row-selection': {
        type: 'radio'
      },
      'rowKey': 'id',
      'scroll': {
        y: 200
      }
    },
    columns: [
      {
        label: '铺位号',
        prop: 'label',
        width: 100,
        ellipsis: true,
        tooltip: true
      },
      {
        label: '建筑面积',
        prop: 'acreage',
        width: 95
      },
      {
        label: '使用面积',
        prop: 'useAcreage',
        width: 95
      }
    ]
  });
  const isLoading = ref(false);
  const iForm: Ref = ref(null);
  const [houseTypeList] = useDictData('00005');
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    },
    options: {
      type: Object,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const buildingData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  const floorData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  const houseData = ref<any[]>([]);
  const planDropList = ref<CbdApiProjectInvestPlanSelectGetResponse>([]);
  const brandDropList = ref<CbdApiProjectCommonMerchantBrandListGetResponse>(
    []
  );
  const merchantDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const channelDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const feeTypeList = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const addMerchantForm: any = reactive({
    projectId: '',
    code: '',
    type: '',
    name: '',
    shortName: '',
    companyName: '',
    legalPerson: '',
    idNumber: '',
    businessLicenseNumber: '',
    bank: '',
    bankAccountName: '',
    bankAccount: '',
    linkman: '',
    linkTel: '',
    address: '',
    attachment: [],
    remark: ''
  });

  const addBrandForm = ref<BrandForm>({});
  const onSuccess = () => {
    getBrandDropList();
  };
  const onConfirm = async (data: any) => {
    try {
      await cbdApiProjectResourceMerchantSavePost({
        ...data
      });
      Message.success({
        content: '新增成功'
      });
      addMerchantVisible.value = false;
      getMerchantDropList();
    } catch (e) {
      console.error(e);
    }
  };

  const billTypeList1 = ref([
    { label: '合同签订次月', value: 1 },
    { label: '合同生效次月', value: 2 },
    { label: '合同执行完毕次月', value: 3 }
  ]);
  const billTypeList2 = ref([
    { label: '租金账单生成次月', value: 1 },
    { label: '租金账单收取次月', value: 2 }
  ]);
  const dateRangeList = computed(() => {
    const arr = [];
    for (let i = 1; i <= 31; i++) {
      arr.push({ label: `${i}`, value: i });
    }
    return [...arr, { label: '自然月底', value: -1 }];
  });
  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    code: '',
    planName: '',
    estateType: undefined,
    buildingId: undefined,
    floorId: undefined,
    estateId: undefined,
    merchantId: [],
    brandId: [],
    channelId: undefined,
    settleMode: undefined,
    startDate: '',
    endDate: '',
    ratioType: undefined,
    ratio: undefined,
    expenseItems: [],
    billGenType1: undefined,
    billGenType2: undefined,
    taxIncluded: undefined,
    taxFee: undefined,
    amount: undefined,
    billGenDate: undefined,
    remark: ''
  });
  const formProps = computed(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '基本信息',
        prop: 'basicInfo',
        type: 'groupTitle'
      },
      {
        label: '归属项目：',
        prop: 'projectId',
        type: 'select',
        dic: projectList.value,
        options: {
          onChange(e: any) {
            editForm.value.projectId = e;
            editForm.value.merchantId = [];
            editForm.value.brandId = [];
            editForm.value.buildingId = undefined;
            editForm.value.estateId = undefined;
            editForm.value.channelId = undefined;
            getFeeTypeList();
          }
        },
        rules: [{ required: true, message: '归属项目不能为空' }]
      },
      {
        label: '编号：',
        prop: 'code',
        options: {
          disabled: true,
          placeholder: '系统自动生成'
        },
        rules: [{ message: '编号不能为空' }]
      },
      {
        label: '计划名称：',
        prop: 'planName',
        // type: 'select',
        // dic: [{label:'公司',value:'公司'},{label:'个人',value:'个人'}]||planDropList.value,
        // dic: planDropList.value,
        rules: [{ required: true, message: '计划名称不能为空' }]
      },
      {
        label: '铺位类型：',
        prop: 'estateType',
        type: 'select',
        dic: houseTypeList,
        rules: [{ required: true, message: '铺位类型不能为空' }],
        options: {
          onChange() {
            buildingData.value = [];
            floorData.value = [];
            houseData.value = [];
          }
        }
      },
      {
        label: '目标商户：',
        type: 'select',
        options: {
          multiple: true
        },
        prop: 'merchantId',
        rules: [{ required: true, message: '目标商户不能为空' }]
      },
      {
        label: '目标品牌：',
        type: 'select',
        prop: 'brandId',
        options: {
          multiple: true
        },
        rules: [{ required: true, message: '目标品牌不能为空' }]
      },
      {
        label: '渠道：',
        type: 'select',
        prop: 'channelId',
        dic: channelDropList.value,
        rules: [{ required: true, message: '渠道不能为空' }]
      },
      {
        label: '开始时间：',
        prop: 'startDate',
        type: 'date',
        span: 6,
        rules: [{ required: true, message: '开始时间不能为空' }]
      },
      {
        label: '结束时间：',
        prop: 'endDate',
        type: 'date',
        span: 6,
        rules: [{ required: true, message: '结束时间不能为空' }]
      },
      {
        prop: 'line1',
        type: 'groupTitle'
      },
      {
        prop: 'tableList',
        type: 'groupTitle'
      },
      {
        prop: 'line2',
        type: 'groupTitle'
      },
      {
        prop: 'rentPolicy',
        type: 'groupTitle'
      },
      {
        label: '计算方式：',
        type: 'select',
        prop: 'settleMode',
        dic: calculationList,
        rules: [{ required: true, message: '是否含税不能为空' }],
        on: {
          change() {
            iForm.value?.clearValidate(['ratioType', 'amount']);
          }
        }
      },
      {
        label: editForm.value.settleMode === 1 ? '金额：' : '比例：',
        prop: editForm.value.settleMode === 1 ? 'amount' : 'ratioType',
        type: 'select',
        span: 8,
        rules: [
          {
            required: true,
            message: `${
              editForm.value.settleMode === 1 ? '金额' : '比例类型'
            }不能为空`
          }
        ]
      },
      {
        label: '关联费用项目',
        prop: 'expenseItems',
        type: 'select',
        display: editForm.value.settleMode === 2,
        span: 8,
        rules: [{ required: true, message: '关联费用项目不能为空' }]
      },
      {
        label: '账单生成日期：',
        prop: editForm.value.settleMode === 1 ? 'billGenType1' : 'billGenType2',
        type: 'select',
        span: 8,
        rules: [{ required: true, message: '账单生成日期不能为空' }]
      },
      {
        label: '是否含税：',
        type: 'select',
        prop: 'taxIncluded',
        dic: [
          { label: '是', value: 1 },
          { label: '否', value: 2 }
        ],
        rules: [{ required: true, message: '是否含税不能为空' }]
      },
      {
        label: '税率：',
        prop: 'taxFee',
        span: 8,
        rules: [{ required: true, message: '税率不能为空' }]
      },
      {
        label: '备注：',
        prop: 'remark',
        type: 'textarea',
        span: 24
      }
    ]
  }));

  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectInvestPlanDetailIdGet({
      id: String(props.id)
    });
    editForm.value.estateType = res.estateType;
    await nextTick(() => {
      editForm.value = res as unknown as EditForm;
      editForm.value.estateId = [res.estateId];
    });
  });
  // 保存草稿 // 不填必填项也可以提交
  const saveDraft = async () => {
    // const res = await iForm.value?.submit();
    const res = false;
    if (!res) {
      try {
        const { estateId = [] } = editForm.value;
        await cbdApiProjectInvestPlanDraftPost({
          ...editForm.value,
          estateId: estateId[0]
        } as unknown as CbdApiProjectInvestPlanDraftPostRequest);
        await nextTick(() => {
          Message.success('保存成功');
          emits('refresh');
          visible.value = false;
        });
      } catch (e) {
      } finally {
      }
    }
  };
  // 发起审批
  const onSubmit = async () => {
    const res = await iForm.value?.submit();
    if (!res) {
      try {
        isLoading.value = true;
        const { estateId = [] } = editForm.value;
        await cbdApiProjectInvestPlanSavePost({
          ...editForm.value,
          estateId: estateId[0]
        } as unknown as CbdApiProjectInvestPlanSavePostRequest);
        await nextTick(() => {
          Message.success('保存成功');
          emits('refresh');
          visible.value = false;
        });
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };

  const addMerchantVisible = ref(false);
  const addBrandVisible = ref(false);
  function merchantChange(v: any) {
    editForm.value.merchantId = v;
  }
  function brandChange(v: any) {
    editForm.value.brandId = v;
  }

  watch(
    () => editForm.value.projectId,
    (v) => {
      floorData.value = [];
      houseData.value = [];
      getBuildingData(`${v}`, '2');
      getPlanDropList();
      getBrandDropList();
      getMerchantDropList();
      getChannelDropList();
    }
  );
  watch(
    () => editForm.value.estateType,
    () => {
      editForm.value.buildingId = undefined;
      editForm.value.floorId = undefined;
      editForm.value.estateId = undefined;
      if (editForm.value.projectId) {
        getBuildingData(`${editForm.value.projectId}`, '2');
      }
    }
  );
  watch(
    () => editForm.value.buildingId,
    (v) => {
      if (v) {
        floorData.value = [];
        houseData.value = [];
        editForm.value.buildingId = v;
        getBuildingData(`${v}`, '3');
      }
    }
  );
  watch(
    () => editForm.value.floorId,
    (v) => {
      if (v) {
        houseData.value = [];
        editForm.value.floorId = v;
        getBuildingData(`${v}`, '4');
      }
    }
  );
  const getBuildingData = async (pv: string, level: string) => {
    const res = await cbdApiProjectCommonAssetsSelectListGet({
      parentValue: pv,
      level: level,
      categoryId: String(editForm.value.estateType || '')
    });
    if (level === '2') {
      buildingData.value = res;
    }
    if (level === '3') {
      floorData.value = res;
    }
    if (level === '4') {
      houseData.value = res.map((el: any) => {
        return {
          ...el,
          ...el.extra
        };
      });
      console.log(houseData.value);
    }
  };
  const [getPlanDropList] = useFuncProxy(async () => {
    planDropList.value = await cbdApiProjectInvestPlanSelectGet({
      projectId: `${editForm.value.projectId}`
    });
  });
  const [getBrandDropList] = useFuncProxy(async () => {
    brandDropList.value = await cbdApiProjectCommonMerchantBrandListGet({
      projectId: `${editForm.value.projectId}`
    });
  });
  const [getMerchantDropList] = useFuncProxy(async () => {
    merchantDropList.value = await cbdApiProjectCommonMerchantListGet({
      projectId: `${editForm.value.projectId}`
    });
  });
  const [getChannelDropList] = useFuncProxy(async () => {
    channelDropList.value = await cbdApiProjectCommonInvestChannelListGet({
      projectId: `${editForm.value.projectId}`
    });
  });
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [getFeeTypeList] = useFuncProxy(async () => {
    feeTypeList.value = await cbdApiProjectCommonMisTreeExpenseGet({
      parentExpenseCodes: '202212270001,202212270002',
      chargingMethod: '1',
      projectId: editForm.value.projectId
        ? String(editForm.value.projectId)
        : ''
    });
  });
  onMounted(async () => {
    getProjectList();
    if (props.id) {
      initEditInfo();
    } else {
      editForm.value.projectId = getActiveProjectId();
    }
    getFeeTypeList();
  });
</script>
<style scoped lang="less">
  .input-box {
    position: relative;
    width: 100%;

    .btn-pos {
      position: absolute;
      top: -35px;
      right: 0;
      z-index: 1;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
  .card-title {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  .type {
    text-align: center;
    color: #999999;
    padding-bottom: 10px;
  }
  .card-content {
    box-sizing: border-box;
    height: 290px;
    width: 100%;
    overflow-y: scroll;
  }
  .statistic {
    text-align: right;
    .label {
      font-size: 14px;
      font-weight: 500;
      color: #999999;
    }
    .number {
      color: #333333;
    }
  }
  .building {
    :deep(.arco-form-item-label-col) {
      display: none;
    }
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
  }
</style>
