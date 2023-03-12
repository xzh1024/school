<template>
  <a-spin :loading="loading" tip="加载中...">
    <div class="cost-info width-100 overflow">
      <div v-for="(item, index) in form.paySchemes" :key="index" class="form">
        <div class="form-head flex justify-between align-center">
          <div class="flex">
            <div class="select-width">
              <a-form ref="formRef" :model="form.paySchemes[index]">
                <a-form-item
                  hide-label
                  field="expenseId"
                  :rules="[{ required: true, message: '请选择费用项目' }]"
                >
                  <a-select
                    v-model="form.paySchemes[index].expenseId"
                    placeholder="请选择费用项目"
                    :options="projectList"
                    @change="(e) => expenseHandle(e, index)"
                  ></a-select>
                </a-form-item>
              </a-form>
            </div>
            <a-space>
              <div class="expense-content">{{
                expenseFilter(item.chargingMethod)
              }}</div>
              <fee-checkbox
                v-model="form.paySchemes[index].hasTax"
                label="是否含税"
              ></fee-checkbox>
              <fee-checkbox
                v-if="item.chargingMethod === 1"
                v-model="form.paySchemes[index].hasIncrease"
                label="是否递增"
              ></fee-checkbox>
              <fee-checkbox
                v-model="form.paySchemes[index].hasFree"
                label="是否免租"
              ></fee-checkbox>
            </a-space>
          </div>
          <div>
            <a-space>
              <a-button type="text" @click="previewHandle(item)">预览</a-button>
              <a-button type="text" @click="clearHandle(index)">清空</a-button>
              <a-button
                v-if="form.paySchemes.length > 1"
                type="text"
                status="danger"
                @click="deleteHandle(index)"
                >删除</a-button
              >
            </a-space>
          </div>
        </div>
        <stage-content
          ref="stageRef"
          v-model="form.paySchemes[index].paySchemeStages"
          :type="item.chargingMethod"
          :expense-id="item.expenseId"
          :rent-free="Boolean(form.paySchemes[index].hasFree)"
          :has-increase="Number(form.paySchemes[index].hasIncrease || 0)"
          :initial-date="initialDate"
        ></stage-content>
      </div>
      <div class="add-btn">
        <a-button type="primary" @click="addHandle">新增费用项目</a-button>
      </div>
      <footer-btn
        need-next
        need-save
        :btn-loading="btnLoading"
        @on-pre="prevHandle"
        @on-save="submit('save')"
        @on-cancel="$emit('onCancel')"
        @on-next="submit('next')"
      ></footer-btn>
      <i-drawer v-model="visible" title="预览明细" :footer="false">
        <fee-list
          v-if="visible"
          :data="expenseInfoList"
          :expense-type="expenseType"
          :loading="tableLoading"
        ></fee-list>
      </i-drawer>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
  import { computed, reactive, provide, ref, onMounted } from 'vue';
  import StageContent from '@/views/new-contract/__components__/cost-info/stage-content.vue';
  import { contractProjectList } from '@/utils/dic';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectCommonMisGoodsGroupSelectGet,
    cbdApiProjectCommonMisTreeExpenseGet,
    CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectFormalContractGetEstateAreasGet,
    cbdApiProjectFormalContractPayAddOrUpdatePaySchemesPost,
    cbdApiProjectFormalContractPayPaySchemesUpdateInitGet,
    cbdApiProjectFormalContractPayPreviewPaymentInfosByIdPost,
    cbdApiProjectFormalContractPayPreviewPaymentInfosPost,
    cbdApiProjectIntentionContractGetEstateAreasGet,
    cbdApiProjectIntentionContractPayAddOrUpdatePaySchemesPost,
    cbdApiProjectIntentionContractPayPaySchemesUpdateInitGet,
    cbdApiProjectIntentionContractPayPreviewPaymentInfosByIdPost,
    cbdApiProjectIntentionContractPayPreviewPaymentInfosPost,
    CbdApiProjectIntentionContractPayPreviewPaymentInfosPostRequest
  } from '@/api';
  import { modalConfirm } from '@/utils';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import { useContractStore } from '@/store/project/contract';
  import IDrawer from '@/components/drawer/drawer.vue';
  import FeeList from './fee-list.vue';
  import {
    contractPaySchemesItem,
    contractPaySchemesItemRequest,
    previewTypeItem
  } from '@/views/new-contract/__components__/cost-info/index';
  import FeeCheckbox from '@/views/new-contract/__components__/cost-info/fee-checkbox.vue';
  const props = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  });

  type formType = {
    contract?: number | undefined | string;
    paySchemes: contractPaySchemesItem[];
  };
  const emits = defineEmits(['onNext', 'onSave', 'onCancel', 'onPre']);
  const form = ref<formType>({
    paySchemes: [
      {
        key: new Date().getTime(),
        paySchemeStages: [{ startDate: '', endDate: '', freeList: [] }],
        hasTax: true
      }
    ]
  });

  const stageRef = ref();
  const visible = ref(false);
  const formRef = ref();
  const projectList = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);
  const contractStore = useContractStore();
  const expenseType = ref('');
  const expenseInfoList = ref<previewTypeItem[]>([]);
  const btnLoading = ref(false);
  const initialDate = reactive({
    startDate: '',
    endDate: ''
  });

  onMounted(() => {
    const id = contractStore.getContractId();
    getGoodsGroup({ contractId: id + '' });
    getProject({
      parentExpenseCodes: '202212270002,202212270001',
      contractId: id + '',
      contractProjectFilter: '1'
    });
    getFormInfo({ contractId: id + '' });
    getAreaInfo({ contractId: id + '' });
    // init();
  });
  const contractType = computed(() => {
    return contractStore.contractInfo.contractType || 2;
  });

  /*async function init() {
    if (props.isEdit) return;
    try {
      const res = (await getLocalForm('newContractExpenseForm')) as any;
      if (res) form.value = res;
    } catch (e) {
      console.error(e);
    }
  }*/

  // 编辑费用项目初始化
  const editDetails =
    contractType.value === 1
      ? cbdApiProjectIntentionContractPayPaySchemesUpdateInitGet
      : cbdApiProjectFormalContractPayPaySchemesUpdateInitGet;
  const { run: getFormInfo, loading } = useRequest(editDetails, {
    manual: true,
    onSuccess(data = []) {
      if (!data.length) return;
      // 是否默认初始化
      if (data[0].chargingMethod) {
        form.value.paySchemes = data.map((i) => {
          const { hasTax, hasFree, hasIncrease } = i;
          return {
            ...i,
            hasTax: Boolean(hasTax),
            hasFree: Boolean(hasFree),
            hasIncrease: Boolean(hasIncrease)
          };
        }) as contractPaySchemesItem[];
        const { paySchemeStages = [] } = data[data.length - 1];
        const { endDate } = paySchemeStages[paySchemeStages.length - 1];
        //只存 结束日期   新增时会使用
        initialDate.endDate = endDate;
      } else {
        //默认初始化
        const { paySchemeStages = [] } = data[0];
        const { startDate, endDate } = paySchemeStages[0];
        initialDate.startDate = startDate;
        initialDate.endDate = endDate;
        form.value.paySchemes = [
          {
            hasTax: true,
            hasFree: false,
            hasIncrease: false,
            paySchemeStages: [{ startDate, endDate, freeList: [] }]
          }
        ] as contractPaySchemesItem[];
      }
    }
  });

  const { run: getGoodsGroup, data: goodsGroupList } = useRequest(
    cbdApiProjectCommonMisGoodsGroupSelectGet,
    {
      manual: true
    }
  );
  const { run: getProject } = useRequest(cbdApiProjectCommonMisTreeExpenseGet, {
    manual: true,
    onSuccess(data = []) {
      projectList.value = data.map((i) => {
        delete i['children'];
        return { ...i, label: i.expenseType, value: i.expenseId };
      });
    }
  });

  provide('goodsGroup', goodsGroupList || []);

  function addHandle() {
    form.value.paySchemes?.push({
      key: new Date().getTime(),
      paySchemeStages: [{ startDate: '', endDate: '', freeList: [] }]
    });
  }

  async function submit(v: 'save' | 'next') {
    const validateArr: any = [];
    stageRef.value.forEach((i: any) => {
      const submitArr = i.submit();
      validateArr.push(...submitArr);
    });
    formRef.value?.forEach((i: any) => {
      validateArr.push(i.validate());
    });
    const values = await Promise.all(validateArr);
    if (values.filter((i) => !!i).length) return;

    btnLoading.value = true;
    const { paySchemes = [] } = form.value;
    const params = paySchemes.map((i) => {
      const { hasTax, hasFree, hasIncrease } = i;
      return {
        ...i,
        hasTax: Number(hasTax || 0),
        hasFree: Number(hasFree || 0),
        hasIncrease: Number(hasIncrease || 0)
      };
    }) as contractPaySchemesItemRequest[];
    // 新增费用项目
    const addContactApi =
      contractType.value === 1
        ? cbdApiProjectIntentionContractPayAddOrUpdatePaySchemesPost
        : cbdApiProjectFormalContractPayAddOrUpdatePaySchemesPost;
    try {
      await addContactApi({
        contractId: Number(contractStore.getContractId()),
        paySchemes: params
      });
      if (v === 'save') {
        emits('onSave');
      } else {
        emits('onNext');
      }
    } catch (e) {
      console.error(e);
    } finally {
      btnLoading.value = false;
    }
    // console.log(validateArr, 'validateArr');
  }
  function deleteHandle(index: number) {
    modalConfirm('确认删除当前内容？', () => {
      form.value.paySchemes.splice(index, 1);
    });
  }
  function clearHandle(index: number) {
    modalConfirm('确认清空当前内容？', () => {
      form.value.paySchemes[index] = {
        key: new Date().getTime(),
        paySchemeStages: [{ startDate: '', endDate: '', freeList: [] }]
      };
    });
  }

  function expenseHandle(v: any, index: number) {
    const item = projectList.value.find((i) => i.expenseId === v);
    const { chargingMethod } = item || {};

    form.value.paySchemes[index].chargingMethod = chargingMethod;
    //重置递增状态
    form.value.paySchemes[index].hasIncrease = false;
    //重置所有内容
    const { paySchemeStages = [] } = form.value.paySchemes[index];
    const { startDate = '', endDate = '' } = paySchemeStages[0] || {};
    form.value.paySchemes[index].paySchemeStages = [
      {
        startDate,
        endDate,
        freeList: form.value.paySchemes[index].hasFree ? [{}] : []
      }
    ];
  }

  function expenseFilter(v: undefined | string | number) {
    if (v) {
      return contractProjectList.find((i) => i.value === Number(v))?.label;
    }
    return '';
  }

  // 通过配置预览账单
  const addPreviewApi =
    contractType.value === 1
      ? cbdApiProjectIntentionContractPayPreviewPaymentInfosPost
      : cbdApiProjectFormalContractPayPreviewPaymentInfosPost;
  const { run: getAddPreviewInfo, loading: tableLoading } = useRequest(
    addPreviewApi,
    {
      manual: true,
      onSuccess(data) {
        expenseInfoList.value = data;
      }
    }
  );

  // 通过配置ID预览账单
  // const editPreviewInfoApi =
  //   contractType.value === 1
  //     ? cbdApiProjectIntentionContractPayPreviewPaymentInfosByIdPost
  //     : cbdApiProjectFormalContractPayPreviewPaymentInfosByIdPost;
  // const { run: getEditPreviewInfo, loading: tableLoading } = useRequest(
  //   editPreviewInfoApi,
  //   {
  //     manual: true,
  //     onSuccess(data) {
  //       expenseInfoList.value = data;
  //     }
  //   }
  // );

  function previewHandle(item: contractPaySchemesItem) {
    const { hasTax = false, hasFree = false, hasIncrease = false } = item;
    const p = {
      ...item,
      hasTax: Number(hasTax),
      hasFree: Number(hasFree),
      hasIncrease: Number(hasIncrease),
      contractId: contractStore.getContractId()
    } as CbdApiProjectIntentionContractPayPreviewPaymentInfosPostRequest;
    getAddPreviewInfo(p);
    visible.value = true;
  }

  // const onCheckChange = (index: number, key: string) => {
  //   const { paySchemes = [] } = form.value;
  //   paySchemes[index][key] = !paySchemes[index][key];
  // };

  function prevHandle() {
    // const { paySchemes = [] } = form.value;
    // const res = paySchemes.some(
    //   (i: Partial<contractPaySchemeStagesItem>) => !i.id
    // );
    // if (!res) {
    //   modalConfirm('返回可能会丢失数据，是否确认', () => {
    //     emits('onPre');
    //   });
    // } else {
    // }
    emits('onPre');
  }

  // 通过合同id获取铺位总面积
  const AreaInfoApi =
    contractType.value === 1
      ? cbdApiProjectIntentionContractGetEstateAreasGet
      : cbdApiProjectFormalContractGetEstateAreasGet;
  const { run: getAreaInfo, data: areaInfo } = useRequest(AreaInfoApi, {
    manual: true
  });

  provide('areaInfo', areaInfo);
</script>

<style scoped lang="less">
  .overflow {
    overflow: auto;
  }
  .width-100 {
    width: 100%;
  }
  :deep(.arco-collapse-item-header-title) {
    width: 100%;
  }
  .form-head {
    background: #f2f2f4;
    height: 38px;
    padding: 0 12px;
    border-bottom: 1px solid #d3d3d3;
    :deep(.arco-checkbox-label) {
      white-space: nowrap;
    }
    :deep(.arco-btn) {
      padding: 0;
    }
  }
  .form {
    background: #fff;
    padding: 16px 16px 12px 16px;
    margin-bottom: 16px;
    .select-width {
      :deep(.arco-form-item) {
        margin-bottom: 0px;
      }
    }
    :deep(.arco-form-item) {
      margin-bottom: 6px;
    }
  }
  .add-btn {
    padding: 16px 0;
    :deep(.arco-btn) {
      width: 100%;
    }
  }
  .select-width {
    width: 180px;
    margin-right: 16px;
  }
  .expense-content {
    font-size: 14px;
    color: #333;
    margin-right: 16px;
  }
  :deep(.arco-form-item-wrapper-col) {
    position: relative;
  }
  :deep(.arco-form-item-message) {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: -20px;
  }
  .cost-info {
    padding: 16px;
  }
  .form-head {
    :deep(.arco-select-view-single) {
      width: 85%;
      background-color: transparent;
      border: none;
    }
  }
</style>
