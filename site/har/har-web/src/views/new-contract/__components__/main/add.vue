<template>
  <a-spin :loading="loading" style="display: block" tip="加载中......">
    <div class="warp">
      <i-form ref="basicFormRefs" v-model="pageForm" :options="formOptions">
        <!-- 商户详情 -->
        <template #detailForm>
          <div class="details-warp">
            <Descriptions :invest-info="investInfo"></Descriptions>
          </div>
        </template>

        <!-- 商户名称插槽 -->
        <template #merchantIdForm>
          <div class="input-box">
            <a-select
              v-model="pageForm.merchantId"
              placeholder="请选择商户"
              :multiple="false"
              :allow-search="true"
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
        <!-- 品牌插槽 -->
        <template #brandIdForm>
          <div class="input-box">
            <a-select
              v-model="pageForm.brandId"
              placeholder="请选择目标品牌"
              :multiple="false"
              :allow-search="true"
              :options="brandDropList"
              @change="brandChange"
            ></a-select>
            <a-button
              class="btn-pos"
              type="text"
              @click="addBrandVisible = true"
              >新增</a-button
            >
          </div>
        </template>
        <template #storeIdForm>
          <div class="input-box">
            <a-select
              v-model="pageForm.storeId"
              placeholder="请选择店铺或新增店铺"
              :multiple="false"
              :allow-search="true"
              :disabled="contractStore.contractInfo.contractId ? true : false"
              :options="storeDropList"
            ></a-select>
            <a-button
              v-if="!contractStore.contractInfo.contractId"
              class="btn-pos"
              type="text"
              @click="addStoreVisible = true"
              >新增</a-button
            >
          </div>
        </template>
        <template #line1Form>
          <div class="split-bg"></div>
        </template>

        <template #defaultAmountForm>
          <a-input
            v-model="pageForm.defaultAmount"
            allow-clear
            placeholder="请输入违约金"
            :max-length="12"
            @input="moneyText"
          >
            <template #append> 元 </template>
          </a-input>
        </template>

        <!-- 货品组别插槽 -->
        <template #goodsGroupIdsForm>
          <div class="input-box">
            <a-select
              v-model="pageForm.goodsGroupIds"
              placeholder="请选择货品组别"
              :multiple="true"
              :allow-search="true"
              :options="kindsDropList"
            ></a-select>
            <a-button
              class="btn-pos"
              type="text"
              @click="addKindsVisible = true"
              >新增</a-button
            >
          </div>
        </template>

        <template #line2Form>
          <div class="split-bg"></div>
        </template>
      </i-form>
      <!-- 开票信息表单 -->
      <div class="invoice">
        <div class="titles">
          <span>开票信息</span>
<!--          <span class="left-line"></span>-->
          <span class="isAdd">
            <a-button v-if="!showInvoice" type="primary" @click="showClick">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
            <a-button v-else type="primary" status="danger" @click="showClick">
              <template #icon>
                <icon-minus />
              </template>
            </a-button>
          </span>
<!--          <span class="right-line"></span>-->
        </div>
        <i-form
          v-if="showInvoice"
          ref="invoiceFormRefs"
          v-model="invoiceForm"
          :options="invoiceOptions"
        >
          <template #bankNoForm>
            <a-input
              v-model="invoiceForm.bankNo"
              allow-clear
              placeholder="请输入"
              :max-length="30"
              @input="numberyText('bankNo')"
            >
            </a-input>
          </template>
          <template #phoneForm>
            <a-input
              v-model="invoiceForm.phone"
              allow-clear
              placeholder="请输入"
              :max-length="11"
              @input="numberyText('phone')"
            >
            </a-input>
          </template>
        </i-form>
      </div>
      <footer-btn
        :need-pre="false"
        @on-cancel="cancelClick"
        @on-save="submitClick"
        @on-next="nextClick"
      />

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

      <create-store
        v-model:drawer-visible="addStoreVisible"
        v-model:form-data="addBrandForm"
        :project-id="pageForm.projectId"
        :merchant-id="pageForm.merchantId"
        drawer-title="新增店铺"
        @submit-success="storeSuccess"
      />
      <CreateKinds
        v-model:drawer-visible="addKindsVisible"
        v-model:form-data="addBrandForm"
        drawer-title="添加货品组别"
        :project-id="pageForm.projectId"
        @submit-success="kindSubmit"
      />
    </div>
  </a-spin>
</template>
<script lang="ts" setup>
  import {
    ref,
    Ref,
    reactive,
    computed,
    onMounted,
    watch,
    nextTick
  } from 'vue';
  import {
    cbdApiProjectCommonMerchantBrandListGet,
    cbdApiProjectInvestPlanContractDetailIdGet,
    cbdApiProjectCommonMerchantListGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonGoodsGroupSelectGet,
    cbdApiProjectFormalContractSubjectInfoContractIdGet,
    cbdApiProjectInvestPlanSelectGet,
    cbdApiProjectResourceFormatTreeGet,
    cbdApiProjectFormalContractSubjectSavePost,
    cbdApiProjectResourceMerchantSavePost,
    cbdApiProjectIntentionContractSubjectSavePost,
    cbdApiProjectCommonContractStoreSelectGet,
    CbdApiProjectCommonContractStoreSelectGetResponse,
    type CbdApiProjectCommonMerchantBrandListGetResponse,
    type CbdApiProjectCommonMerchantListGetResponse,
    type CbdApiProjectCommonGoodsGroupSelectGetResponse,
    type CbdApiProjectCommonProjectSelectListGetResponse,
    type CbdApiProjectInvestPlanSelectGetResponse
  } from '@/api';
  import { isEmpty } from 'lodash';
  import { invoiceTypeOption, manageOption, taxpayerOption } from '@/utils/dic';
  import CreateMerchant from '@/views/resource-manage/_component_/create-merchant.vue';
  import CreateBrand from '@/views/resource-manage/_component_/create-brand.vue';
  import CreateKinds from './main-create-kinds.vue';
  import CreateStore from './create-store.vue';
  import { merchant_type } from '@/config/resource_manage_status';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import lsStore from '@/utils/ls-store';
  import { useContractStore } from '@/store/project/contract';
  import FooterBtn from '../footer-btn.vue';
  import Descriptions from './descriptions.vue';
  import dayjs from 'dayjs';
  defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['onCancel', 'onSave', 'onNext']);
  const contractStore = useContractStore();
  type BrandForm = {
    id?: number | string;
    projectId?: number | string;
    projectName?: string;
    code?: string;
    name?: string;
    formatId?: number | string;
    formatName?: string;
    status?: number;
    remarks?: string;
  };
  interface IndustryListItem {
    label?: string;
    value?: string | number;
    parentId?: string | number;
    isLeaf?: boolean;
    children?: Array<IndustryListItem>;
  }
  const pageForm = ref<any>({
    merchantId: '',
    brandId: '',
    projectId: ''
  });
  const invoiceForm = ref<any>({ invoiceType: 1, categoryType: 1 });
  const showInvoice = ref(false);
  const addMerchantVisible = ref(false);
  const addBrandVisible = ref(false);
  const addStoreVisible = ref(false);
  const addKindsVisible = ref(false);
  const loading = ref(false);
  const brandDropList = ref<CbdApiProjectCommonMerchantBrandListGetResponse>(
    []
  );
  const investInfo: Ref = ref({});
  const investmentDropList = ref<CbdApiProjectInvestPlanSelectGetResponse>([]);
  const storeDropList = ref<CbdApiProjectCommonContractStoreSelectGetResponse>(
    []
  );
  const kindsDropList = ref<CbdApiProjectCommonGoodsGroupSelectGetResponse>([]);
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
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
  const merchantDropList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const formatData = ref<Array<IndustryListItem>>([]);
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '基本信息',
          type: 'groupTitle'
        },
        {
          label: '归属项目',
          prop: 'projectId',
          type: 'select',
          rules: [{ required: true, message: '请选择项目' }],
          options: {
            allowSearch: true,
            allowClear: false,
            disabled: contractStore.contractInfo.contractId ? true : false
          },
          on: {
            change() {
              pageForm.value.merchantId = '';
              pageForm.value.brandId = '';
              pageForm.value.storeId = '';
            }
          },
          dic: projectList.value,
          span: 6
        },
        {
          label: '招商计划名称',
          prop: 'investPlanId',
          type: 'select',
          rules: [{ required: false, message: '请选择项目' }],
          dic: investmentDropList.value,
          options: {
            allowSearch: true,
            disabled: contractStore.contractInfo.contractId ? true : false
          },
          on: {
            change(v: string) {
              pageForm.value.investPlanId = v;
              getInvestmentDetail(v);
            }
          },
          span: 6
        },
        {
          label: '',
          prop: 'detail',
          span: 24,
          display: pageForm.value.investPlanId ? true : false
        },
        {
          label:
            contractStore.contractInfo.contractType === 1
              ? '意向合同编号'
              : '正式合同编号',
          prop: 'code',
          rules: [{ required: false, message: '系统自动生成' }],
          options: { disabled: true },
          span: 6
        },
        {
          label: '纸质合同编号',
          prop: 'paperCode',
          rules: [{ required: false, message: '请输入纸质合同编号' }],
          options: {
            maxLength: 50
          },
          span: 6
        },
        {
          label: '商户名称：',
          type: 'select',
          options: {
            multiple: true
          },
          prop: 'merchantId',
          rules: [{ required: true, message: '请选择商户名称' }],
          span: 6
        },
        {
          label: '品牌：',
          type: 'select',
          prop: 'brandId',
          options: {
            multiple: true
          },
          rules: [{ required: true, message: '请选择品牌' }],
          span: 6
        },
        {
          label: '业态',
          prop: 'formatId',
          type: 'cascader',
          rules: [{ required: true, message: '请选择' }],
          options: {
            disabled: true
          },
          dic: formatData.value,
          span: 6
        },
        {
          label: '店铺名称',
          prop: 'storeId',
          rules: [{ required: true, message: '请输入店铺名称' }],
          span: 6
        },
        {
          label: '经营方式',
          prop: 'operatMode',
          type: 'select',
          dic: manageOption,
          rules: [{ required: true, message: '请选择经营方式' }],
          span: 6
        },
        {
          label: '签约日期',
          prop: 'signDate',
          type: 'date',
          rules: [{ required: true, message: '请选择签约日期' }],
          on: {
            change(v: string) {
              if (!v) return;
              pageForm.value.leaseStartDate = v;
            }
          },
          span: 6
        },
        {
          label: '租赁开始日期',
          prop: 'leaseStartDate',
          type: 'date',
          on: {
            change(v: string) {
              if (!pageForm.value.leaseEndDate) return;
              if (v > pageForm.value.leaseEndDate) {
                Message.warning('租赁开始时间不能大于租赁结束日期');
                nextTick(() => {
                  pageForm.value.leaseStartDate = '';
                });
              }
            }
          },
          rules: [{ required: true, message: '请选择租赁开始日期' }],
          span: 6
        },
        {
          label: '租赁结束日期',
          prop: 'leaseEndDate',
          type: 'date',
          rules: [{ required: true, message: '请选择租赁结束日期' }],
          on: {
            change(v: string) {
              if (v < pageForm.value.leaseStartDate) {
                Message.warning('租赁结束日期不能小于租赁开始时间');
                nextTick(() => {
                  pageForm.value.leaseEndDate = '';
                });
              }
            }
          },
          span: 6
        },
        {
          label: '合同生效日期',
          prop: 'effectStartDate',
          type: 'date',
          span: 6
        },
        {
          label: '合同失效日期',
          prop: 'effectEndDate',
          type: 'date',
          span: 6
        },
        {
          prop: 'line1',
          type: 'groupTitle'
        },
        {
          label: '相关信息',
          type: 'groupTitle'
        },
        {
          label: '是否主力店铺',
          prop: 'mainStores',
          type: 'select',
          rules: [{ required: true, message: '请选择是否主力店铺' }],
          dic: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ],
          span: 6
        },
        {
          label: '是否统一收据',
          prop: 'unifiedCashier',
          type: 'select',
          rules: [{ required: true, message: '请选择是否统一收据' }],
          dic: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ],
          span: 6
        },
        {
          label: '违约金',
          type: 'inputNumber',
          prop: 'defaultAmount',
          rules: [{ required: true, message: '请输入违约金' }],
          span: 6
        },

        {
          label: '货品组别',
          prop: 'goodsGroupIds',
          rules: [{ required: true, message: '请选择货品组别' }],
          span: 24
        },
        {
          label: '备注',
          type: 'textarea',
          prop: 'remark',
          options: {
            maxLength: 200,
            showWordLimit: true,
            autoSize: {
              minRows: 4
            }
          },
          span: 24
        },
        {
          prop: 'line2',
          type: 'groupTitle'
        }
      ]
    };
  });
  const invoiceOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '发票类型',
          prop: 'invoiceType',
          type: 'select',
          rules: [{ required: true, message: '请选择发票类型' }],
          dic: invoiceTypeOption,
          span: 6
        },
        {
          label: '发票抬头',
          prop: 'invoiceRise',
          rules: [{ required: true, message: '请输入发票抬头' }],
          options: { maxLength: 100 },
          span: 6
        },
        {
          label: '纳税人类别',
          prop: 'categoryType',
          type: 'select',
          rules: [{ required: true, message: '请选择纳税人类别' }],
          dic: taxpayerOption,
          span: 6
        },
        {
          label: '纳税人识别号',
          prop: 'category',
          rules: [{ required: true, message: '请输入纳税人识别号' }],
          options: { maxLength: 20 },
          span: 6
        },
        {
          label: '开户银行',
          prop: 'bank',
          rules: [{ required: true, message: '请输入开户银行' }],
          options: { maxLength: 100 },
          span: 6
        },
        {
          label: '银行账号',
          prop: 'bankNo',
          rules: [{ required: true, message: '请输入开户银行账号' }],
          span: 6
        },
        {
          label: '联系电话',
          prop: 'phone',
          span: 6
        },
        {
          label: '开票地址',
          prop: 'address',
          options: { maxLength: 100 },
          span: 6
        }
      ]
    };
  });
  const invoiceFormRefs: Ref = ref(null);
  const basicFormRefs: Ref = ref(null);
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
  function merchantChange(v: any) {
    pageForm.value.merchantId = v;
    pageForm.value.storeId = '';
    getStoreList();
  }
  function brandChange(v: any) {
    pageForm.value.brandId = v;
    console.log(storeDropList.value);
    const formatIdLess = brandDropList.value.filter(
      (items) => items.value === v
    );
    if (formatIdLess.length > 0) {
      pageForm.value.formatId = formatIdLess[0].formatId;
    }
  }
  //获取品牌下拉
  const [getBrandDropList] = useFuncProxy(async () => {
    brandDropList.value = await cbdApiProjectCommonMerchantBrandListGet({
      projectId: `${pageForm.value.projectId}`
    });
  });
  //获取商户下拉
  const [getMerchantDropList] = useFuncProxy(async () => {
    merchantDropList.value = await cbdApiProjectCommonMerchantListGet({
      projectId: `${pageForm.value.projectId}`
    });
  });
  //获取项目下拉
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  //获取业态下拉
  const [getBusinessTypeList] = useFuncProxy(async () => {
    const d: any = await cbdApiProjectResourceFormatTreeGet({
      projectId: String(pageForm.value.projectId)
    });
    formatData.value = connectName(d);
  });
  const connectName = (arr: Array<IndustryListItem>) => {
    arr.forEach((item) => {
      if (item.children) {
        if (item.children.length === 0) {
          delete item.children;
        } else {
          connectName(item.children);
        }
      }
    });
    return arr;
  };
  //获取招商计划下拉
  const [getInvestmentList] = useFuncProxy(async () => {
    investmentDropList.value = await cbdApiProjectInvestPlanSelectGet({
      projectId: pageForm.value.projectId
    });
  });
  //获取货品类别下拉
  const [getKindsList] = useFuncProxy(async () => {
    kindsDropList.value = await cbdApiProjectCommonGoodsGroupSelectGet({
      projectId: pageForm.value.projectId
    });
  });
  //获取店铺类别下拉
  const [getStoreList] = useFuncProxy(async (id) => {
    storeDropList.value = await cbdApiProjectCommonContractStoreSelectGet({
      projectId: pageForm.value.projectId,
      merchantId: pageForm.value.merchantId
    });
    if (id) {
      pageForm.value.storeId = id;
    }
  });
  //获取主体详情
  const [getMainDetail] = useFuncProxy(async () => {
    loading.value = true;
    const res = await cbdApiProjectFormalContractSubjectInfoContractIdGet({
      contractId: contractStore.contractInfo.contractId + ''
    });

    if (!isEmpty(res.invoice)) {
      // 判断是否含有开票信息
      showInvoice.value = true;
      pageForm.value = res;
      invoiceForm.value = res.invoice;
    } else {
      showInvoice.value = false;
      pageForm.value = res;
    }
    pageForm.value.defaultAmount = pageForm.value.defaultAmount + '';
    if (res.investPlanId) {
      getInvestmentDetail(res.investPlanId + '');
    }
    loading.value = false;
  });

  //获取招商详情
  const getInvestmentDetail = async (detailId: string) => {
    if (!detailId) return;
    investInfo.value = await cbdApiProjectInvestPlanContractDetailIdGet({
      id: detailId
    });
    // pageForm.value.merchantId = investInfo.value.merchantId;
    // pageForm.value.brandId = investInfo.value.brandId;
  };
  //违约金校验
  const moneyText = () => {
    pageForm.value.defaultAmount = (pageForm.value.defaultAmount.match(
      /^\d{1,9}(\.\d{0,2})?$/
    ) || [''])[0];
  };
  //数字校验
  const numberyText = (code: string) => {
    invoiceForm.value[code] = invoiceForm.value[code].replace(/[^\d]/g, '');
  };
  //保存
  const submitClick = async () => {
    const res = await basicFormRefs.value.submit();
    if (showInvoice.value) {
      const res2 = await invoiceFormRefs.value.submit();
      if (res2) return;
      if (
        invoiceForm.value.category &&
        invoiceForm.value.category.length < 15
      ) {
        Message.warning('纳税人识别号不能少于15个字符');
        return false;
      }
      pageForm.value.invoice = invoiceForm.value;
    }

    if (!res) {
      try {
        loading.value = true;
        if (contractStore.contractInfo.contractType === 1) {
          //新增意向合同
          await cbdApiProjectIntentionContractSubjectSavePost(pageForm.value);
        } else {
          await cbdApiProjectFormalContractSubjectSavePost(pageForm.value);
        }
        loading.value = false;
        emits('onSave');
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    }
  };
  //下一步
  const nextClick = async () => {
    const res = await basicFormRefs.value.submit();
    if (showInvoice.value) {
      const res2 = await invoiceFormRefs.value.submit();
      if (res2) return;
      pageForm.value.invoice = invoiceForm.value;
    }
    if (!res) {
      try {
        loading.value = true;
        if (contractStore.contractInfo.contractType === 1) {
          //新增意向合同
          const result = await cbdApiProjectIntentionContractSubjectSavePost(
            pageForm.value
          );
          contractStore.setContractInfo({
            contractType: contractStore.contractInfo.contractType,
            handleType: contractStore.contractInfo.contractId ? 2 : 1,
            contractId: result.contractId,
            businessStatus: 1,
            verifyStatus: 1
          });
        } else {
          const result = await cbdApiProjectFormalContractSubjectSavePost(
            pageForm.value
          );
          contractStore.setContractInfo({
            contractType: contractStore.contractInfo.contractType,
            handleType: contractStore.contractInfo.contractId ? 2 : 1,
            contractId: result.contractId,
            businessStatus: 1,
            verifyStatus: 1
          });
        }
        loading.value = false;
        emits('onNext');
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    }
  };
  const cancelClick = async () => {
    await emits('onCancel');
  };
  //是否展示开票信息
  const showClick = () => {
    showInvoice.value = !showInvoice.value;
    pageForm.value.invoice = {};
    invoiceForm.value = { invoiceType: 1, categoryType: 1 };
  };
  const onSuccess = () => {
    getBrandDropList();
  };
  const kindSubmit = () => {
    getKindsList();
  };
  const storeSuccess = (id?: Number) => {
    console.log(id, '拿到了');

    getStoreList(id);
  };

  watch(
    () => pageForm.value.projectId,
    (v) => {
      if (v) {
        getBrandDropList();
        getMerchantDropList();
        getBusinessTypeList();
        getKindsList();
        getStoreList();
        getInvestmentList();
      }
    },
    {
      deep: true
    }
  );

  onMounted(() => {
    getProjectList();
    if (contractStore.contractInfo.contractId) {
      getMainDetail();
    } else {
      pageForm.value.signDate = dayjs(new Date()).format('YYYY-MM-DD');
      pageForm.value.leaseStartDate = dayjs(new Date()).format('YYYY-MM-DD');
      //获取默认项目id
      pageForm.value.projectId = lsStore.getItem('projectId')
        ? Number(lsStore.getItem('projectId'))
        : '';
    }
  });
</script>
<style lang="less" scoped>
  .warp {
    height: 100%;
    background-color: #fff;
    padding: 16px;
    margin: 16px;
    overflow: hidden;
    .details-warp {
      width: 100%;
      height: 324px;
      background: #f2f2f4;
      padding: 16px;
    }
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
    .invoice {
      margin-top: 16px;
      position: relative;
      .titles {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
        .isAdd {
          position: absolute;
          right: 0;
        }
        .left-line {
          position: absolute;
          left: 5%;
          z-index: 1;
          width: 77%;
          height: 1px;
          background: #f6f6f6;
          transform: translateY(-50%);
          content: '';
        }
        .right-line {
          position: absolute;
          right: 0;
          z-index: 1;
          width: 10%;
          height: 1px;
          background: #f6f6f6;
          transform: translateY(-50%);
          content: '';
        }
      }
    }
  }
</style>
