<template>
  <div class="i-card">
    <h3>基础信息</h3>
    <i-form ref="baseFormRef" v-model="formData" :options="baseFormOptions">
      <template #membersPhoneForm>
        <div class="input-box">
          <a-input
            v-model="formData.membersPhone"
            placeholder="请输入会员电话"
            @input="membersPhoneInput"
          />
          <a-button class="btn-pos" type="text" @click="addMember">新增会员</a-button>
        </div>
      </template>
    </i-form>
  </div>
  <div v-show="formData.cardId" class="i-card">
    <div class="row">
      <h3>{{ type === 1 ? '限期' : '次' }}卡信息</h3>
    </div>
    <i-form ref="cardFormRef" v-model="formData" :options="cardFormOptions">
      <template #tableForm>
        <a-table
          v-model:selectedKeys="selectedKeys"
          :row-selection="rowSelection"
          :columns="columns"
          :data="data"
          :pagination="false"
          style="width: 100%"
        >
          <template #columns>
            <a-table-column
              v-for="(item, index) in columns"
              :key="index"
              :title="item.title"
              :data-index="item.dataIndex"
            >
              <template #cell="row">
                <!-- <a-input
                  v-model="row[item.dataIndex]"
                  :placeholder="`请输入${item.title}`"
                /> -->
                {{ row[item.dataIndex] }}
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </i-form>
  </div>
  <div class="i-card">
    <h3>其他信息</h3>
    <i-form ref="otherFormRef" v-model="formData" :options="otherOptions" />
  </div>
  <!-- 会员注册 -->
  <member-add v-model="memberAddVisible" @reset="getUserInfoByPhoneNo" title="新增会员"></member-add>
</template>

<script setup lang="ts">
  import { ref, computed, reactive, onMounted } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import type { TableRowSelection } from '@arco-design/web-vue';
  import MemberAdd from '@/views/vms/memberManage/__components__/addMember.vue';
  import { FormOptions } from '@/components/i-form';
  import {
    sellTableColumns,
    sellPeriodTableColumns
  } from '@/views/vms/card/_components_/hooks';
  import {
    groundPcApiCardBaseGet,
    type GroundPcApiCardBaseGetResponse,
    groundPcApiCardOrderCheckMemberPhonePost,
    groundPcApiCardOrderGetSalesStaffInfoGet,
    type GroundPcApiCardOrderGetSalesStaffInfoGetResponse,
    groundPcApiCardOrderCheckPhysicalNoPhysicalNoPost
  } from '@/api/ground-pc-api';

  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';
  import useFuncProxy from '@/hooks/useFuncProxy';
  const props = defineProps({
    type: {
      // 1、限期卡2、次卡
      type: Number,
      default: 1
    }
  });
  const formData = ref({
    cardId: '',
    payMethodType: '',
    membersName: '',
    membersPhone: '',
    projectId: '',
    storeId: '',
    physicalNo: '',
    membersIdCardNo: ''
  });
  const { getProjectOptions, projectOptions } = useProjectOptions();
  const { getStoreOptions, storeOptions } = useStoreOptions();
  // 卡项下拉
  const cardOptions = ref<GroundPcApiCardBaseGetResponse>([]);
  const [getCardList] = useFuncProxy(async () => {
    const d = await groundPcApiCardBaseGet({
      projectId: formData.value.projectId,
      storeId: formData.value.storeId,
      cardType: `${props.type}`
    });
    cardOptions.value = d;
  });
  // 销售人员信息
  const salesOptions = ref<GroundPcApiCardOrderGetSalesStaffInfoGetResponse>(
    []
  );
  const [getSalesOptions] = useFuncProxy(async () => {
    const d = await groundPcApiCardOrderGetSalesStaffInfoGet({
      projectId: formData.value.projectId,
      storeId: formData.value.storeId
    });
    salesOptions.value = d;
  });
  // 校验物理卡号
  const [validateCard] = useFuncProxy(async () => {
    await groundPcApiCardOrderCheckPhysicalNoPhysicalNoPost({
      physicalNo: formData.value.physicalNo
    });
  });

  getSalesOptions();
  // getCardList();

  const selectedKeys = ref([]);
  const rowSelection = reactive<TableRowSelection>({
    type: 'radio',
    showCheckedAll: true,
    onlyCurrent: false
  });
  const columns = computed(() =>
    props.type === 2 ? sellPeriodTableColumns : sellTableColumns
  );

  const data = ref([{ name: 'xxxxx' }]);

  const [getUserInfoByPhoneNo] = useFuncProxy(async (phone: string) => {
    try {
      const d = await groundPcApiCardOrderCheckMemberPhonePost({
        phone
      });
      formData.value.membersName = d.name || '';
      formData.value.membersIdCardNo = d.identityNo || '';
      if (d.identityNo) {
        // 会员有身份证号填充后不能修改
        // optionsColumns.value[4].options.disabled = true;
      } else {
        // optionsColumns.value[4].options.disabled = false;
      }
    } catch (error) {
      // 会员不存在
    }
  });

  const commonOptions = {
    formCard: false,
    menuForm: false,
    layout: 'vertical'
  };

  // 基础信息
  // @ts-ignore
  const optionsColumns = ref([
    {
      label: '项目名称',
      prop: 'projectId',
      type: 'select',
      span: 6,
      rules: [{ required: true, message: '请选择项目名称' }],
      options: {},
      dic: projectOptions,
      on: {
        change(v: string) {
          getStoreOptions({ projectId: v });
        }
      }
    },
    {
      label: '店铺名称',
      prop: 'storeId',
      type: 'select',
      rules: [{ required: true, message: '请选择店铺名称' }],
      span: 6,
      dic: storeOptions,
      on: {
        change(v: string) {
          getCardList({ projectId: formData.value.projectId, storeId: v });
        }
      }
    },
    {
      label: '会员电话',
      prop: 'membersPhone',
      rules: [{ required: true, message: '请填写会员电话' }],
      span: 6,
      options: {
        'max-length': 11
      }
    },
    {
      label: '会员名称',
      prop: 'membersName',
      rules: [{ required: true, message: '请选择会员名称' }],
      span: 6,
      options: {
        disabled: true
      }
    },
    {
      label: '身份证号',
      prop: 'membersIdCardNo',
      rules: [{ required: true, message: '请填写身份证号' }],
      span: 6,
      options: {}
    },
    {
      label: '卡名称',
      prop: 'cardId',
      rules: [{ required: true, message: '请选择卡片' }],
      type: 'select',
      span: 6,
      dic: cardOptions
    }
  ])
  const baseFormOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: optionsColumns.value
    };
  });

  const membersPhoneInput = (v: string) => {
    if (/^1[0-9]{10}$/.test(v)) {
      getUserInfoByPhoneNo(v);
    }
    formData.value.membersIdCardNo = '';
  };
  // 卡信息
  // @ts-ignore
  const cardFormOptions = computed<FormOptions>(() => {
    const arr =
      props.type === 1
        ? [
            {
              label: '激活方式',
              prop: 'activeType',
              type: 'span',
              span: 6
            },
            ...(formData.value.cardId
              ? [
                  {
                    label: '激活日期',
                    prop: 'activeTime',
                    type: 'span',
                    span: 6,
                    rules: [{ required: true, message: '请选择激活日期' }]
                  }
                ]
              : []),
            {
              label: '入场时段',
              prop: 'purchaseTime',
              type: 'span',
              span: 6
            },
            {
              label: '是否支持转让',
              prop: 'allowTransferType',
              type: 'span',
              span: 6
            },
            {
              label: '支持场馆',
              prop: 'supportStadium',
              type: 'span',
              span: 6
            },
            {
              label: '卡说明',
              prop: 'expirationMethod',
              type: 'span',
              span: 24
            }
          ]
        : [
            {
              label: '有效期',
              prop: 'expirationMethod',
              type: 'span',
              span: 6
            },
            {
              label: '入场时间',
              prop: 'expirationMethod',
              type: 'span',
              span: 6
            },
            {
              label: '卡说明',
              prop: 'expirationMethod',
              type: 'span',
              span: 6
            }
          ];
    return {
      ...commonOptions,
      columns: [...arr, { prop: 'table', span: 24, hideLabel: true }]
    };
  });
  // 其他信息
  // @ts-ignore
  const otherOptions = computed<FormOptions>(() => {
    return {
      ...commonOptions,
      columns: [
        {
          label: '物理卡号',
          prop: 'cardFaceType',
          span: 6,
          on: {
            change(v: string) {
              validateCard(v);
            }
          }
        },
        {
          label: '销售人员信息',
          prop: 'salesStaffId',
          type: 'select',
          span: 6,
          dic: salesOptions
        },
        {
          label: '收款方式',
          prop: 'payMethodType',
          type: 'select',
          span: 6,
          dic: [
            { label: '微信', value: 1 },
            { label: '支付宝', value: 2 },
            { label: '储值卡', value: 3 }
          ],
          rules: [{ required: true, message: '请选择收款方式' }]
        },
        {
          label: '收款金额',
          prop: 'receivedAmount',
          span: 6,
          options: {
            'input-attrs': {
              type: 'number'
            }
          },
          rules: [{ required: true, message: '请填写收款金额' }]
        },
        {
          label: '合同备注',
          prop: 'contractRemark',
          span: 24,
          type: 'textarea'
        }
      ]
    };
  });

  function setFormData(data: any) {
    formData.value = { ...data };
  }

  const baseFormRef = ref();
  const cardFormRef = ref();
  const otherFormRef = ref();
  async function submit() {
    const baseFormRes = await baseFormRef.value?.submit();
    const cardFormRes = await cardFormRef.value?.submit();
    const otherFormRes = await otherFormRef.value?.submit();

    console.log(!baseFormRes && !cardFormRes && !otherFormRes);

    return !baseFormRes && !cardFormRes && !otherFormRes;
  }

  const memberAddVisible = ref(false);
  const addMember = () => {
    memberAddVisible.value = true;
  }

  defineExpose({
    formData,
    setFormData,
    submit
  });

  onMounted(() => {
    getProjectOptions();
    getStoreOptions('');
  });
</script>

<style lang="less" scoped>
  h3 {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin: 0 0 16px 0;
  }

  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .colors {
    display: flex;
    align-items: center;
    position: relative;
  }

  .color-item {
    width: 36px;
    height: 36px;
    border-radius: 4px 4px 4px 4px;
    margin-right: 6px;
    cursor: pointer;
  }

  .color-right {
    position: absolute;
    width: 16px;
  }

  .dropdown-item {
    width: 80px;
  }

  .table-head-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .i-card {
    width: 100%;
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
</style>
