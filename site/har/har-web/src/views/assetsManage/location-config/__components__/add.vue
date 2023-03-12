<template>
  <drawer
    v-model="visible"
    :options="{
      ...options,
      okLoading: isLoading
    }"
    :title="!!id ? '修改铺位' : '添加铺位'"
    @before="onBeforeUpdate"
  >
    <i-form ref="iForm" v-model="editForm" :options="formProps">
      <template #line1Form>
        <div class="split-bg"></div>
      </template>
      <template #line2Form>
        <div class="split-bg"></div>
      </template>
    </i-form>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import type { EditForm } from './add';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectCommonBuildingFloorListSelectGet,
    type CbdApiProjectCommonBuildingFloorListSelectGetResponse,
    cbdApiProjectCommonBuildingListSelectGet,
    type CbdApiProjectCommonBuildingListSelectGetResponse,
    cbdApiProjectCommonProjectSelectListGet,
    type CbdApiProjectCommonProjectSelectListGetResponse,
    cbdApiProjectDictGetDictDataIdGet,
    CbdApiProjectDictGetDictDataIdGetResponse,
    cbdApiProjectEstateAddPost,
    type CbdApiProjectEstateAddPostRequest,
    cbdApiProjectEstateUpdateInitEstateIdGet,
    cbdApiProjectEstateUpdatePut,
    type CbdApiProjectEstateUpdatePutRequest
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import { getActiveProjectId } from '@/utils';

  type TypeItem = CbdApiProjectDictGetDictDataIdGetResponse[0];
  const isLoading = ref(false);
  const iForm: Ref = ref(null);
  const locationTypes = ref<Array<TypeItem>>([]);
  const projectList = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
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
      default: () => {
        return {};
      }
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const formProps = ref({
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
        dic: projectList,
        options: {
          disabled: !!props.id
        },
        rules: [{ required: true, message: '归属项目不能为空' }]
      },
      {
        label: '楼宇：',
        prop: 'buildingId',
        type: 'select',
        dic: buildingData,
        rules: [{ required: true, message: '楼宇不能为空' }]
      },
      {
        label: '楼层：',
        type: 'select',
        prop: 'floorId',
        dic: floorData,
        rules: [{ required: true, message: '楼层不能为空' }]
      },
      {
        label: '铺位类型：',
        prop: 'categoryId',
        type: 'select',
        dic: locationTypes,
        options: {
          fieldNames: {
            label: 'dataName',
            value: 'id'
          },
          onChange(v: string) {
            localStorage.setItem('mis_building_type', v);
          }
        },
        rules: [{ required: true, message: '铺位类型不能为空' }]
      },
      {
        label: '铺位号：',
        prop: 'doorPlate',
        options: {
          maxLength: 60
        },
        rules: [
          { required: true, message: '铺位号不能为空' },
          { match: /[0-9]+/, message: '必须包含数字' }
        ]
      },
      {
        label: '建筑面积(㎡)：',
        prop: 'acreage',
        type: 'inputNumber',
        options: {
          max: 9999999.99,
          hideButton: true
        },
        rules: [{ required: true, message: '建筑面积不能为空' }]
      },
      {
        label: '使用面积(㎡)：',
        prop: 'useAcreage',
        type: 'inputNumber',
        options: {
          max: 9999999.99,
          hideButton: true
        },
        rules: [{ required: true, message: '使用面积不能为空' }]
      },
      {
        prop: 'line1',
        type: 'groupTitle'
      },
      {
        label: '租金相关',
        prop: 'rent',
        type: 'groupTitle'
      },
      {
        label: '底价日租金：',
        prop: 'bottomDayRent',
        type: 'inputNumber',
        span: 6,
        options: {
          max: 9999999.99,
          min: 0
        },
        rules: [
          {
            trigger: ['blur', 'focus']
          },
          {
            validator: (value: number, cb: (text: string) => void): any => {
              return new Promise((resolve) => {
                const t = editForm.value.datumDayRent;
                if (t && value > t) {
                  cb('底价日租金不能高于基准日租金');
                }
                resolve('');
              });
            }
          }
        ]
      },
      {
        label: '底价月租金：',
        prop: 'bottomMonthRent',
        type: 'inputNumber',
        span: 6,
        options: {
          max: 9999999.99,
          min: 0
        },
        rules: [
          {
            trigger: ['blur', 'focus']
          },
          {
            validator: (value: number, cb: (text: string) => void): any => {
              return new Promise((resolve) => {
                const t = editForm.value.datumMonthRent;
                if (t && value > t) {
                  cb('底价月租金不能高于基准月租金');
                }
                resolve('');
              });
            }
          }
        ]
      },
      {
        label: '基准日租金：',
        prop: 'datumDayRent',
        type: 'inputNumber',
        span: 6,
        options: {
          max: 9999999.99,
          min: 0
        },
        rules: [
          {
            trigger: ['blur', 'focus']
          },
          {
            validator: (value: number, cb: (text: string) => void): any => {
              return new Promise((resolve) => {
                const t = editForm.value.bottomDayRent;
                if (t && value < t) {
                  cb('基准日租金不能小于底价日租金');
                }
                resolve(undefined);
              });
            }
          }
        ]
      },
      {
        label: '基准月租金：',
        prop: 'datumMonthRent',
        type: 'inputNumber',
        span: 6,
        options: {
          max: 9999999.99,
          min: 0
        },
        rules: [
          {
            trigger: ['blur', 'focus']
          },
          {
            validator: (value: number, cb: (text: string) => void): any => {
              return new Promise((resolve) => {
                const t = editForm.value.bottomMonthRent;
                if (t && value < t) {
                  cb('基准月租金不能低于底价月租金');
                }
                resolve('');
              });
            }
          }
        ]
      },
      {
        prop: 'line2',
        type: 'groupTitle'
      },
      {
        label: '其他信息',
        prop: 'other',
        type: 'groupTitle'
      },
      {
        label: '备注：',
        type: 'textarea',
        prop: 'remark',
        options: {
          maxLength: 200
        },
        span: 24
      },
      {
        prop: 'attachmentList',
        type: 'customUpload',
        span: 24,
        options: {
          urlKey: 'previewAddress'
        }
      }
    ]
  });
  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    buildingId: undefined,
    floorId: undefined,
    categoryId: undefined,
    doorPlate: '',
    acreage: undefined,
    useAcreage: undefined,
    bottomDayRent: undefined,
    bottomMonthRent: undefined,
    datumDayRent: undefined,
    datumMonthRent: undefined,
    remark: '',
    attachmentList: []
  });
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectEstateUpdateInitEstateIdGet({
      estateId: String(props.id)
    });
    editForm.value = {
      ...res,
      attachmentList: res.attachments,
      bottomDayRent: Number(res.bottomDayRent),
      bottomMonthRent: Number(res.bottomMonthRent),
      datumDayRent: Number(res.datumDayRent),
      datumMonthRent: Number(res.datumMonthRent)
    } as EditForm;
  });
  const onBeforeUpdate = async () => {
    const res = await iForm.value?.submit();
    if (!res) {
      try {
        isLoading.value = true;
        const { attachmentList } = editForm.value;
        const p = {
          ...editForm.value,
          attachments: attachmentList.map((el: any) => el.key || el.id)
        };
        if (!props.id) {
          await cbdApiProjectEstateAddPost(
            p as CbdApiProjectEstateAddPostRequest
          );
        } else {
          await cbdApiProjectEstateUpdatePut(
            p as CbdApiProjectEstateUpdatePutRequest
          );
        }
        Message.success('操作成功');
        emits('refresh');
        visible.value = false;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };
  onMounted(async () => {
    await getTypeData();
    await getProjectList();
    if (props.id) {
      initEditInfo();
    } else {
      editForm.value.projectId = getActiveProjectId();
      const t = (editForm.value.categoryId = Number(
        localStorage.getItem('mis_building_type')
      ));
      if (t && locationTypes.value.some((el: TypeItem) => el.id === t)) {
        editForm.value.categoryId = t;
      }
    }
  });
  const [getBuildingData] = useFuncProxy(async (v) => {
    buildingData.value = await cbdApiProjectCommonBuildingListSelectGet({
      projectId: v
    });
  });
  const [getFloorData] = useFuncProxy(async (v) => {
    floorData.value = await cbdApiProjectCommonBuildingFloorListSelectGet({
      buildingId: v
    });
  });
  watch(
    () => editForm.value.projectId,
    (v) => {
      if (v) {
        getBuildingData(v);
      }
    }
  );
  watch(
    () => editForm.value.buildingId,
    (v) => {
      if (v) {
        getFloorData(v);
      }
    }
  );
  watch(
    () => editForm.value.categoryId,
    (v) => {
      if (!props.id) {
        if (v === 2) {
          editForm.value.acreage = 0;
          editForm.value.useAcreage = 0;
        } else {
          editForm.value.acreage = undefined;
          editForm.value.useAcreage = undefined;
        }
      }
    }
  );
  const [getTypeData] = useFuncProxy(async () => {
    locationTypes.value = await cbdApiProjectDictGetDictDataIdGet({
      id: '00005'
    });
  });
</script>
<style scoped lang="less"></style>
