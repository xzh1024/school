<template>
  <drawer
    v-model="visible"
    :show-log="Boolean(props.rowId || '')"
    :mask-close="false"
    :log-options="{
      modeId: props.rowId,
      // 这个接口是mis的vms访问不到
      logUrl: groundPcApiCommonProjectSelectListGet,
      mode: 'cbd_mis_energy_consumption_device'
    }"
    title="查看会员"
    width="54%"
  >
    <template #footer>
      <a-button @click="onCancel">返回</a-button>
      <a-button type="primary" @click="handleEdit({} as any)"> 编辑 </a-button>
    </template>
    <div class="member-model-box">
      <a-form ref="formRef" :model="editForm" layout="vertical">
        <a-card :bordered="false">
          <a-row class="flex align-center">
            <a-form-item field="projectId" label="项目名称">
              <div class="form_item_value">{{ valueFindLabel(projectList, editForm.projectId) }}</div>
            </a-form-item>
          </a-row>
          <div class="photo_title">会员人脸</div>
          <a-row class="flex">
            <div class="photo_left">
              <div class="faceBox">
                <!-- @/assets/images/cashier-pic.png -->
                <a-image
                  class="bgImg"
                  width="212"
                  height="212"
                  :src="editForm.avatarUrl"
                >
                </a-image>
              </div>
            </div>
            <a-col :span="9">
              <a-form-item field="name" label="姓名">
                <div class="form_item_value">{{ editForm.name || '--' }}</div>
              </a-form-item>
              <a-form-item field="phone" label="手机号">
                <div class="form_item_value">{{ editForm.phone || '--' }}</div>
              </a-form-item>
              <a-form-item field="idCard" label="身份证号">
                <div class="form_item_value">{{ editForm.identityNo || '--' }}</div>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item field="projectId" label="备注">
            <a-row>
              <div class="form_item_value">{{ editForm.remark || '--' }}</div>
            </a-row>
          </a-form-item>
        </a-card>

        <a-card :bordered="false">
          <i-form
            ref="iFormRef"
            v-model="editForm"
            class="equipment_form"
            :options="formProps"
          >
            <template #sourceTypeForm>
              <div class="form_item_value">{{ valueFindLabel(sourceTypeData, editForm.sourceType) }}</div>
            </template>
            <template #labelIdsForm>
              <div class="form_item_value">{{ handleLablesToString }}</div>
            </template>
            <template #birthDayForm>
              <div class="form_item_value">{{ editForm.birthDay || '--' }}</div>
            </template>
            <template #genderForm>
              <div class="form_item_value">{{ editForm.gender ? '男' : '女' }}</div>
            </template>
            <template #heightForm>
              <div class="form_item_value">{{ editForm.height || '--' }}CM</div>
            </template>
            <template #weightForm>
              <div class="form_item_value">{{ editForm.weight || '--' }}KG</div>
            </template>
            <template #fitnessLevelForm>
              <a-rate
                v-model="editForm.fitnessLevel"
                :readonly="Boolean(props.rowId || '')"
                allow-clear
              />
            </template>
          </i-form>
          <a-row>
            <a-form-item class="goal" field="projectId" label="健身目标">
              <div class="form_item_value">{{ editForm.fitnessGoal || '--' }}</div>
            </a-form-item>
          </a-row>
        </a-card>
      </a-form>
    </div>
    <add-model
      v-model="modelVisible"
      :title="modelTitle"
      :row-id="rowId"
      :source="modelSource"
      @reset="reset"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import AddModel from './addMember.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { EditForm } from '../type/useAddModel';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  import { valueFindLabel } from '@/utils';
  import useDictData from '@/hooks/useDictData';
  import {
    groundPcApiMemberLabelSelectListGet,
    GroundPcApiMemberLabelSelectListGetResponse,
    groundPcApiMemberDetailIdGet,
    groundPcApiCommonProjectSelectListGet
  } from '@/api/ground-pc-api';
  // import {
  //   cbdApiProjectSysOptPageOptListPost,
  //   groundPcApiMemberDetailIdGet,
  //   groundPcApiMemberDetailIdGetResponse as detailDataType
  // } from '@/api';
  import { useAddModel } from '../type/useAddModel';
  const { modelVisible, modelSource, modelTitle, handleEdit } = useAddModel();
  const formRef: Ref = ref(null);
  const iFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    },
    options: {
      type: Object,
      default: () => {
        return {
          energyTypeData: [],
          usageTypeData: []
        };
      }
    }
  });
  // 项目名称--下拉列表
  const projectList = ref<optionItem[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await groundPcApiCommonProjectSelectListGet({});
  });
  // 会员标签--下拉列表
  const memberLabelData = ref<GroundPcApiMemberLabelSelectListGetResponse>([]);
  const [getMemberLabelData] = useFuncProxy(async (v: string) => {
    memberLabelData.value = await groundPcApiMemberLabelSelectListGet({});
  });
  type itemType = {
    label: string;
    value: string | number;
  };
  function getTableColumnLabel(key: string | number, arr: Array<itemType>) {
    const findItem = arr.find((it: itemType) => it.value === key);
    return findItem ? findItem.label : '';
  }
  const emits = defineEmits(['update:modelValue', 'reset']);
  // 刷新详情
  function reset() {
    modelVisible.value = false;
    initEditInfo();
    emits('reset');
  }

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        iFormRef.value?.resetFields();
      }
      emits('update:modelValue', v);
    }
  });
  // 会员来源--下拉列表
  const sourceTypeData = ref([
    { label: '小程序注册', value: 1 },
    { label: '老带新', value: 2 },
    { label: '顾问推荐', value: 3 },
    { label: '客户自到店', value: 4 },
    { label: '自主发掘', value: 5 }
  ]);
  // let arr = [];

  const valuesFindLabels = (
    arr: { label?: string; value?: number | string }[],
    v?: (number | string)[]
  ) => {
    const resArr: string[] = [];
    v?.forEach((e) => {
      const item = arr.find((a) => a.value === e);
      if (item?.label) resArr.push(item.label);
    });
    return resArr;
  };
  const handleLablesToString = computed(() => {
    const resArr = valuesFindLabels(memberLabelData.value, [1, 2]);
    return resArr.join('、') || '--';
  });
  // const [sourceTypeData] = useDictData('00005');
  const editForm = ref<any>({});
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '会员来源',
        prop: 'sourceType'
        // formatter: (sourceType: number) => {
        //   return getTableColumnLabel(sourceType, sourceTypeData.value);
        // },
        // dic: sourceTypeData.
      },
      {
        label: '会员标签',
        prop: 'labelIds'
      },
      {
        label: '生日',
        prop: 'birthDay'
      },
      {
        label: '性别',
        prop: 'gender'
      },
      {
        label: '身高',
        prop: 'height'
      },
      {
        label: '体重',
        prop: 'weight'
      },
      {
        label: '健身等级',
        prop: 'fitnessLevel'
      }
    ]
  }));
  const onCancel = () => {
    visible.value = false;
  };

  type optionItem = {
    label?: string;
    value?: string | number;
  };
  const personList = ref<optionItem[]>([
    {
      label: '成年人',
      value: 1
    },
    {
      label: '未成年人',
      value: 2
    }
  ]);
  const phonePreList = ref<string[]>(['86']);
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await groundPcApiMemberDetailIdGet({ id: props.rowId });
    // 编辑回显的时候要看，有些默认值是否存在，不存在特殊 处理
    editForm.value = { ...res };
  });
  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.rowId) {
        console.log(props.rowId, 11);
        initEditInfo();
        getProjectList();
        getMemberLabelData();
      }
    }
  );
</script>

<style scoped lang="less">
  .member-model-box {
    .goal {
      margin-bottom: 0 !important;
    }
    :deep(.arco-form-item-label) {
      font-size: 14px;
      color: #999999;
      line-height: 22px;
    }
    :deep(.arco-form-item) {
      margin-bottom: 16px;
    }
    .form_item_value {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
    }
    .photo_title {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
      margin-bottom: 8px;
    }

    .photo_left {
      margin-right: 16px;
      cursor: pointer;

      .faceBox {
        width: 212px;
        height: 212px;
        background: #e6e6e6;
        border-radius: 4px;
        display: flex;
        align-items: flex-end;
        position: relative;

        .bgImg {
          display: inline-block;
          width: 230px;
          height: 230px;
        }
      }
    }

    :deep(.equipment_form) {
      .card {
        margin-bottom: 0 !important;
        padding: 0 !important;
      }
    }
  }
</style>
