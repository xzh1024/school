<template>
  <drawer
    v-model="visible"
    :options="{
      ...options,
      okLoading: isLoading,
      escToClose: false,
      maskClosable: false
    }"
    :title="id ? '修改谈判记录' : '添加谈判记录'"
    @before="onBeforeUpdate"
  >
    <i-form ref="iForm" v-model="editForm" :options="formProps">
      <template #planInfoForm>
        <a-descriptions table-layout="fixed" :column="4" layout="vertical">
          <a-descriptions-item label="归属项目">{{
            planDetail.projectName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="编号">
            {{ planDetail.code || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="计划名称">
            {{ planDetail.planName || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="铺位类型">
            {{ planDetail.estateTypeName || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="目标商户">
            {{ handleArrToString(planDetail.merchantName || []) }}
          </a-descriptions-item>
          <a-descriptions-item label="渠道">
            {{ planDetail.channelName || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="开始时间">
            {{ planDetail.startDate || '--' }}
          </a-descriptions-item>
          <a-descriptions-item label="结束时间">
            {{ planDetail.endDate || '--' }}
          </a-descriptions-item>
        </a-descriptions>
        <i-table :options="tableProps" :data="planDetail.floorList"></i-table>
      </template>
      <template #line1Form>
        <div class="split-bg"></div>
      </template>
      <template #line2Form>
        <div class="split-bg"></div>
      </template>
      <template #line3Form>
        <div class="split-bg"></div>
      </template>
      <template #line4Form>
        <div class="split-bg"></div>
      </template>
      <template #merchantIdForm>
        <div class="input-box">
          <a-select
            v-model="editForm.merchantId"
            placeholder="请选择商户"
            :options="merchantDropList"
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
            :options="brandDropList"
          ></a-select>
          <a-button class="btn-pos" type="text" @click="addBrandVisible = true"
            >新增</a-button
          >
        </div>
      </template>
      <template #expectMinAreaForm>
        <a-input-number
          v-model="editForm.expectMinArea"
          :min="0"
          :max="999999999.99"
          hide-button
          placeholder="请输入意向面积"
        >
          <template #append>㎡</template>
        </a-input-number>
      </template>
      <template #expectMaxAreaForm>
        <a-input-number
          v-model="editForm.expectMaxArea"
          :min="0"
          :max="999999999.99"
          hide-button
          placeholder="请输入意向面积"
        >
          <template #append>㎡</template>
        </a-input-number>
      </template>
      <template #expectLeaseMonthForm>
        <a-input-number
          v-model="editForm.expectLeaseMonth"
          :min="0"
          :max="999999999.99"
          hide-button
          placeholder="请输入期望租期"
        >
          <template #append>月</template>
        </a-input-number>
      </template>

      <template #negotiatorTitleForm>
        <div style="font-size: 16px; color: #333333">谈判人员</div>
      </template>
      <template #attendeeListForm>
        <div class="input-box">
          <a-select
            v-model="editForm.attendeeList"
            placeholder="请选择参会人员"
            multiple
            :field-names="{
              label: 'name',
              value: 'userId'
            }"
            :options="attendList"
          ></a-select>
          <a-button
            v-permission="['invest:negotiate:add', 'invest:negotiate:update']"
            class="btn-pos"
            type="text"
            @click="onAddStaff('our')"
            >新增</a-button
          >
        </div>
      </template>
      <template #customerListForm>
        <div class="input-box">
          <a-select
            v-model="editForm.customerList"
            placeholder="请选择对接人员"
            multiple
            :field-names="{
              label: 'name',
              value: 'userId'
            }"
            :options="merchantAttendList"
          ></a-select>
          <a-button
            v-permission="['invest:negotiate:add', 'invest:negotiate:update']"
            class="btn-pos"
            type="text"
            @click="onAddStaff('customer')"
            >新增</a-button
          >
        </div>
      </template>
    </i-form>
    <modal-form
      v-bind="addStaffForm"
      v-model:visible="addStaffForm.visible"
      :mask-closable="false"
      :closable="false"
      @register="resetRegister"
      @submit="onSubmit"
    >
    </modal-form>
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
  import { ref, computed, watch, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import type { EditForm, BrandForm } from './add';
  import { merchant_type } from '@/config/resource_manage_status';
  import {
    planList,
    projectList,
    brandDropList,
    merchantDropList,
    estateDropList,
    addMerchantForm,
    getPlanListData,
    getProjectListData,
    getBrandDropList,
    getMerchantDropList,
    getEstateDropList
  } from '@/views/attract-merchant/__components__/common';
  import {
    ModalForm,
    type ModalFormProps,
    useModalForm
  } from '@/components/IForm';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import CreateMerchant from '@/views/resource-manage/_component_/create-merchant.vue';
  import CreateBrand from '@/views/resource-manage/_component_/create-brand.vue';
  import { handleArrToString, formatTime, getActiveProjectId } from '@/utils';
  import {
    cbdApiProjectInvestPlanDetailIdGet,
    CbdApiProjectInvestPlanDetailIdGetResponse,
    cbdApiProjectNegotiateAddPost,
    cbdApiProjectNegotiateChannelMemberListGet,
    CbdApiProjectNegotiateAddPostRequest,
    cbdApiProjectNegotiateInfoGet,
    cbdApiProjectNegotiateMerchantUserListGet,
    cbdApiProjectNegotiateUpdatePost,
    cbdApiProjectResourceMerchantSavePost,
    CbdApiProjectNegotiateUpdatePostRequest,
    cbdApiProjectNegotiateMerchantUserAddPost,
    CbdApiProjectNegotiateMerchantUserAddPostRequest,
    cbdApiProjectInvestChannelAddUserPost
  } from '@/api';
  import dayjs from 'dayjs';
  import { Message } from '@arco-design/web-vue';
  import useDictData from '@/hooks/useDictData';

  type attendItem = { name?: string; userId: number };
  const isLoading = ref(false);
  const addMerchantVisible = ref(false);
  const addBrandVisible = ref(false);
  const addBrandForm = ref<BrandForm>({});
  const iForm: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: undefined
    },
    planId: {
      type: Number,
      default: undefined
    },
    options: {
      type: Object,
      default: () => {}
    }
  });
  const [houseTypeList] = useDictData('00005');
  const emits = defineEmits(['update:modelValue', 'refresh']);
  type planDetailType = CbdApiProjectInvestPlanDetailIdGetResponse & {
    floorList?: any[];
  };
  const planDetail = ref<planDetailType>({} as planDetailType);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const source = ref(true);
  function onAddStaff(type: string) {
    source.value = type === 'our';
    methods.show();
  }
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
  const editForm = ref<EditForm>({
    recordId: undefined,
    projectId: undefined,
    planId: undefined,
    merchantId: undefined,
    merchantName: '',
    brandId: undefined,
    brandName: '',
    negotiateMode: undefined,
    negotiateDate: '',
    negotiateTime: [],
    negotiateStime: '',
    negotiateEtime: '',
    leaseType: undefined,
    estateId: undefined,
    expectMinArea: undefined,
    expectMaxArea: undefined,
    expectLeaseDate: '',
    expectLeaseMonth: undefined,
    expectMinRent: undefined,
    expectMaxRent: undefined,
    negotiateContent: '',
    negotiateAnnexList: [],
    attendeeList: [],
    customerList: []
  });
  const [resetRegister, methods] = useModalForm<ModalFormProps>();
  const attendList = ref<attendItem[]>([]);
  const merchantAttendList = ref<attendItem[]>([]);
  const [getAttendList] = useFuncProxy(async () => {
    attendList.value = await cbdApiProjectNegotiateChannelMemberListGet({
      channelId: planDetail.value.channelId + ''
    });
  });

  const tableProps = ref<Recordable>({
    tableCard: false,
    pageShow: false,
    menu: false,
    columns: [
      {
        label: '楼宇',
        prop: 'buildingName'
      },
      {
        label: '楼层',
        prop: 'floorName'
      },
      {
        label: '铺位号',
        prop: 'estateName'
      },
      {
        label: '建筑面积（㎡）',
        prop: 'acreage'
      },
      {
        label: '使用面积（㎡）',
        prop: 'useAcreage'
      }
    ]
  });
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectNegotiateInfoGet({
      recordId: String(props.id)
    });
    editForm.value = res as unknown as EditForm;
    editForm.value.attendeeList = res.attendeeList.map((el: any) => {
      return el.userId;
    });
    editForm.value.customerList = res.customerList.map((el: any) => {
      return el.userId;
    });
    editForm.value.negotiateTime = [
      dayjs(new Date()).format('HH:mm'),
      dayjs(new Date()).format('HH:mm')
    ] as unknown as string[];
  });
  const onBeforeUpdate = async () => {
    const res = await iForm.value?.submit();
    if (!res) {
      try {
        isLoading.value = true;
        const {
          negotiateTime = [],
          attendeeList = [],
          customerList = [],
          negotiateAnnexList = []
        } = editForm.value;
        const tempAttend = attendList.value.filter((el: any) =>
          attendeeList.includes(el.userId)
        );
        const temp = merchantAttendList.value.filter((el: any) =>
          customerList.includes(el.userId)
        );
        const tempList: string[] = negotiateAnnexList.map(
          (el: any) => el.key || el.id
        );
        const merObj =
          merchantDropList.value.find(
            (el: any) => el.value === editForm.value.merchantId
          ) || {};
        const brandObj =
          brandDropList.value.find(
            (el: any) => el.value === editForm.value.brandId
          ) || {};
        const storeObj =
          estateDropList.value.find(
            (el: any) => el.value === editForm.value.estateId
          ) || {};
        const p = {
          ...editForm.value,
          negotiateStime: negotiateTime[0],
          negotiateEtime: negotiateTime[1],
          negotiateDate: formatTime(editForm.value.negotiateDate, 'YYYY-MM-DD'),
          attendeeList: tempAttend,
          customerList: temp,
          merchantName: merObj!.label,
          brandName: brandObj!.label,
          estateName: storeObj!.label,
          negotiateAnnexList: tempList || []
        };
        if (!props.id) {
          await cbdApiProjectNegotiateAddPost({
            ...p
          } as unknown as CbdApiProjectNegotiateAddPostRequest);
        } else {
          await cbdApiProjectNegotiateUpdatePost({
            ...p
          } as unknown as CbdApiProjectNegotiateUpdatePostRequest);
        }
        Message.success('保存成功');
        emits('refresh');
        visible.value = false;
      } catch (e) {
        console.log(e);
      } finally {
        isLoading.value = false;
      }
    }
  };

  const [getMerchantUserList] = useFuncProxy(async (v) => {
    merchantAttendList.value = await cbdApiProjectNegotiateMerchantUserListGet({
      merchantId: v
    });
  });
  async function onSubmit(v: any) {
    try {
      if (source.value) {
        if (!planDetail.value.channelId) {
          Message.error('请先选择计划');
          return false;
        }
        const { name, phone, userTitle: post } = v;
        await cbdApiProjectInvestChannelAddUserPost({
          id: planDetail.value.channelId!,
          channelMemberInfoList: [{ name, phone, post }]
        });
        getAttendList();
      } else {
        await cbdApiProjectNegotiateMerchantUserAddPost({
          ...v,
          merchantId: editForm.value.merchantId
        } as CbdApiProjectNegotiateMerchantUserAddPostRequest);
        getMerchantUserList(editForm.value.merchantId);
      }
      Message.success('保存成功');
      methods.hide();
    } catch (e) {
    } finally {
    }
  }
  const onSuccess = () => {
    getBrandDropList();
  };
  const addStaffForm = ref({
    visible: false,
    title: '添加谈判人员',
    submitLoading: false,
    schemas: [
      {
        label: '姓名',
        field: 'name',
        componentProps: {
          maxLength: 18
        },
        rules: [{ required: true, message: '姓名不能为空' }]
      },
      {
        label: '电话号码',
        field: 'phone',
        componentProps: {
          maxLength: 50
        },
        rules: [{ required: true, message: '电话号码不能为空' }]
      },
      {
        label: '职务',
        field: 'userTitle',
        componentProps: {
          maxLength: 100
        },
        rules: [{ required: true, message: '职务不能为空' }]
      }
    ]
  });
  const formProps = computed(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '基本信息',
        type: 'groupTitle'
      },
      {
        label: '归属项目：',
        prop: 'projectId',
        type: 'select',
        dic: projectList.value,
        options: {
          disabled: !!props.id,
          allowSearch: true
        },
        rules: [{ required: true, message: '归属项目不能为空' }]
      },
      {
        label: '计划名称：',
        prop: 'planId',
        type: 'select',
        options: {
          disabled: !!props.id,
          allowSearch: true
        },
        rules: [{ required: true, message: '计划名称不能为空' }],
        dic: planList.value
      },
      {
        prop: 'planInfo',
        type: 'groupTitle'
      },
      {
        prop: 'line1',
        type: 'groupTitle'
      },
      {
        label: '谈判对象',
        type: 'groupTitle'
      },
      {
        label: '商户：',
        type: 'select',
        dic: merchantDropList.value,
        prop: 'merchantId',
        options: {
          allowSearch: true
        },
        rules: [{ required: true, message: '目标商户不能为空' }]
      },
      {
        label: '意向品牌：',
        type: 'select',
        dic: brandDropList.value,
        prop: 'brandId',
        options: {
          allowSearch: true
        },
        rules: [{ required: true, message: '意向品牌不能为空' }]
      },
      {
        prop: 'line2',
        type: 'groupTitle'
      },
      {
        label: '初始阶段谈判',
        type: 'groupTitle'
      },
      {
        label: '谈判模式：',
        type: 'select',
        prop: 'negotiateMode',
        dic: [
          {
            label: '电话沟通',
            value: 1
          },
          {
            label: '拜访客户',
            value: 2
          }
        ],
        rules: [{ required: true, message: '编号不能为空' }]
      },
      {
        label: '谈判日期：',
        prop: 'negotiateDate',
        type: 'date',
        options: {
          disabledDate: (current: string) => dayjs(current).isAfter(dayjs())
        },
        rules: [{ required: true, message: '谈判日期不能为空' }]
      },
      {
        label: '谈判时间：',
        type: 'timeRange',
        prop: 'negotiateTime',
        options: {
          multiple: true,
          type: 'time-range',
          format: 'HH:mm'
        },
        rules: [{ required: true, message: '谈判时间不能为空' }]
      },
      {
        label: '谈判地址：',
        prop: 'address',
        options: {
          maxLength: 10
        },
        rules: [{ required: true, message: '渠道不能为空' }]
      },
      {
        label: '租赁意向：',
        prop: 'leaseType',
        type: 'select',
        span: 6,
        dic: houseTypeList,
        options: {
          allowSearch: true,
          onChange(v: any) {
            getEstateDropList({
              projectIds: editForm.value.projectId,
              leaseType: v,
              type: 1
            });
            editForm.value.estateId = undefined;
          }
        },
        rules: [{ required: true, message: '租赁意向不能为空' }]
      },
      {
        label: '意向店铺：',
        prop: 'estateId',
        type: 'select',
        dic: estateDropList.value,
        span: 6,
        rules: [{ required: true, message: '意向店铺不能为空' }]
      },
      {
        label: '最小意向面积：',
        prop: 'expectMinArea',
        type: 'inputNumber',
        span: 6,
        rules: [{ required: true, message: '最小意向面积不能为空' }]
      },
      {
        label: '最大意向面积',
        prop: 'expectMaxArea',
        type: 'inputNumber',
        span: 6,
        rules: [{ required: true, message: '最大意向面积不能为空' }]
      },
      {
        label: '期望起租日期：',
        type: 'date',
        prop: 'expectLeaseDate',
        rules: [{ required: true, message: '期望起租日期不能为空' }]
      },
      {
        label: '期望租期（月）：',
        prop: 'expectLeaseMonth',
        options: {
          hideButton: true
        },
        rules: [{ required: true, message: '期望租期不能为空' }]
      },
      {
        label: '期望租金范围(最小)：',
        prop: 'expectMinRent',
        type: 'inputNumber',
        options: {
          min: 0,
          max: 99999999.99,
          hideButton: true
        },
        span: 6,
        rules: [{ required: true, message: '期望租金范围不能为空' }]
      },
      {
        label: '期望租金范围(最大)：',
        prop: 'expectMaxRent',
        type: 'inputNumber',
        span: 6,
        options: {
          min: 0,
          max: 99999999.99,
          hideButton: true
        },
        rules: [{ required: true, message: '期望租金范围不能为空' }]
      },
      {
        label: '谈判内容：',
        type: 'textarea',
        prop: 'negotiateContent',
        span: 24,
        rules: [{ required: true, message: '谈判内容不能为空' }]
      },
      {
        type: 'groupTitle',
        prop: 'line3'
      },
      {
        type: 'groupTitle',
        label: '附件信息'
      },
      {
        type: 'customUpload',
        prop: 'negotiateAnnexList',
        options: {
          urlKey: 'previewAddress',
          accept: '.doc,.docx,.png,.jpg,.jpeg,.xls,.xlsx,.pdf'
        },
        span: 24
      },
      {
        type: 'groupTitle',
        prop: 'line4'
      },
      {
        label: '谈判人员',
        type: 'groupTitle'
      },
      {
        label: '我方参会人员',
        prop: 'attendeeList',
        span: 24,
        rules: [{ required: true, message: '我方参会人员不能为空' }]
      },
      {
        label: '客户对接人',
        prop: 'customerList',
        span: 24,
        rules: [{ required: true, message: '客户对接人不能为空' }]
      }
    ]
  }));
  const [getPlanDetail] = useFuncProxy(async (v) => {
    const res = await cbdApiProjectInvestPlanDetailIdGet({
      id: v
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
      ]
    } as CbdApiProjectInvestPlanDetailIdGetResponse;
    editForm.value.leaseType = editForm.value.leaseType || res.estateType;
    editForm.value.estateId = editForm.value.estateId || res.estateId;
    getEstateDropList({
      projectIds: res.projectId,
      estateType: res.estateType,
      type: 1
    });
    getAttendList(planDetail.value.channelId);
  });
  onMounted(() => {
    editForm.value.negotiateTime = [
      dayjs(new Date()).format('HH:mm'),
      dayjs(new Date()).format('HH:mm')
    ] as unknown as string[];
    editForm.value.negotiateDate = new Date() as unknown as string;
    getProjectListData();
    if (props.planId) {
      editForm.value.planId = props.planId ? Number(props.planId) : undefined;
    }
    if (props.id) {
      initEditInfo();
    } else {
      // 新增
      editForm.value.projectId = getActiveProjectId();
    }
  });
  watch(
    () => editForm.value.projectId,
    (v) => {
      getPlanListData(v);
      getBrandDropList(v);
      getMerchantDropList(v);
    }
  );
  watch(
    () => editForm.value.planId,
    (v) => {
      if (v) {
        getPlanDetail(v);
      }
    }
  );
  watch(
    () => editForm.value.merchantId,
    (v) => {
      getMerchantUserList(v);
    }
  );
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
    .radio-box {
      width: 100%;
      padding-right: 20px;
      p {
        margin: 0;
        color: #333333;
      }
    }
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
</style>
