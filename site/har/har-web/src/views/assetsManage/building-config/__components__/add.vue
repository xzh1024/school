<template>
  <drawer
    v-model="visible"
    :options="{ ...options, okLoading: isLoading, width: '60vw' }"
    :show-log="!!id"
    :title="!!id ? '修改楼宇' : '新增楼宇'"
    @cancel="onCancel"
    @before="onBeforeUpdate"
  >
    <i-form ref="iForm" v-model="editForm" :options="formProps">
      <template #floorForm>
        <div class="split-bg"></div>
      </template>
      <template #lineForm>
        <div class="split-bg"></div>
      </template>
      <template #tableListForm>
        <div
          :style="{
            'min-height': '30vh',
            'max-height': '45vh',
            'overflow-y': floorData.length ? 'scroll' : 'hidden'
          }"
        >
          <i-table :options="tableProps" :data="floorData">
            <template #floorNameCell="{ record }">
              <a-input
                v-model="record.floorName"
                :max-length="20"
                :placeholder="`不填写默认为${record.facadeNumber}F`"
              />
            </template>
            <template #storyHeightCell="scope">
              <a-input
                v-model="scope.record.storyHeight"
                :max-length="10"
                placeholder="不填写默认为2.8m"
                @blur="onHeightBlur(scope.record.storyHeight, scope.rowIndex)"
              />
            </template>
            <template #areaCell="scope">
              <a-input
                v-model="scope.record.area"
                :max-length="10"
                placeholder="不填写默认为0㎡"
                @blur="onAreaBlur(scope.record.area, scope.rowIndex)"
              />
            </template>
            <!--            <template #menu="scope">-->
            <!--              <a-popconfirm-->
            <!--                content="数据删除后无法恢复，是否删除？"-->
            <!--                @ok="onDelete(scope.rowIndex)"-->
            <!--              >-->
            <!--                <a-button type="text">删除</a-button>-->
            <!--              </a-popconfirm>-->
            <!--            </template>-->
          </i-table>
        </div>
      </template>
    </i-form>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import addressOptions from '@/utils/area.json';
  import type { EditForm } from './add';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectBuildingAddPost,
    CbdApiProjectBuildingAddPostRequest,
    cbdApiProjectBuildingUpdateInfoIdGet,
    cbdApiProjectBuildingUpdatePost,
    CbdApiProjectBuildingUpdatePostRequest,
    cbdApiProjectCommonProjectSelectListGet,
    type CbdApiProjectCommonProjectSelectListGetResponse
  } from '@/api';
  import { numToString, getActiveProjectId } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import useAreaInfo from '@/hooks/useAreaInfo';

  const isEdit = computed(() => !!props.id);
  const isLoading = ref(false);
  const iForm: Ref = ref(null);
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
      default: () => {}
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
  const floorNumber = ref(0);
  const underFloorNumber = ref(0);
  const tableProps = ref<Recordable>({
    tableCard: false,
    indexTitle: '序号',
    index: true,
    pageShow: false,
    menu: false,
    columns: [
      {
        label: '楼层',
        prop: 'floor'
      },
      {
        label: '楼层名称',
        prop: 'floorName'
      },
      {
        label: '层⾼（m）',
        prop: 'storyHeight'
      },
      {
        label: '层⾯积（㎡）',
        prop: 'area'
      }
    ]
  });
  const onHeightBlur = (v: string, i: number) => {
    if (!v) return false;
    const ma = v.match(/^\d+\.?\d{0,2}$/)!;
    const t = (ma && ma[0]) || '';
    if (!t) {
      Message.error('层高需大于0且不能超过两位小数');
    } else if (/^0+\.?0{0,2}$/.test(t)) {
      Message.error('层高需大于0且不能超过两位小数');
    } else if (t.endsWith('.')) {
      Message.error('层高输入有误');
    }
  };
  const onAreaBlur = (v: string, i: number) => {
    if (!v) return false;
    const ma = v.match(/^\d+\.?\d{0,2}$/)!;
    const t = (ma && ma[0]) || '';
    if (!t) {
      Message.error('层面积需大于0且不能超过两位小数');
    } else if (/^0+\.?0{0,2}$/.test(t)) {
      Message.error('层面积需大于0且不能超过两位小数');
    } else if (t.endsWith('.')) {
      Message.error('层面积输入有误');
    }
  };
  const onDelete = (i: number) => {
    floorData.value.splice(i, 1);
  };
  const formProps = computed<any>(() => {
    return {
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
          rules: [{ required: true, message: '归属项目必选' }],
          options: {
            disabled: isEdit.value,
            allowSearch: true
          }
        },
        {
          label: '楼宇名称：',
          prop: 'name',
          options: {
            maxLength: 20
          },
          rules: [{ required: true, message: '楼宇名称不能为空' }]
        },
        // {
        //   label: '楼宇类型：',
        //   type: 'select',
        //   prop: 'type',
        //   dic: buildingTypeList,
        //   rules: [{ required: true, message: '楼宇类型必选' }]
        // },
        {
          label: '所在区域：',
          type: 'cascader',
          prop: 'areaCode',
          dic: addressOptions,
          rules: [{ required: true, message: '所在区域不能为空' }],
          options: {
            pathMode: true,
            onChange: async function areaChange(e: any) {
              const { provinceName, cityName, countyName } = await useAreaInfo(
                String(e[0]),
                String(e[1]),
                String(e[2])
              );
              editForm.value.provinceCode = e[0];
              editForm.value.cityCode = e[1];
              editForm.value.districtCode = e[2];
              editForm.value.provinceName = provinceName;
              editForm.value.cityName = cityName;
              editForm.value.districtName = countyName;
            }
          }
        },
        {
          label: '楼宇编号：',
          prop: 'code',
          options: {
            disabled: true,
            placeholder: '系统自动生成'
          },
          rules: [{ required: false, message: '楼宇编号不能为空' }]
        },

        {
          label: '详细地址：',
          type: 'textarea',
          prop: 'address',
          span: 12,
          options: {
            maxLength: 200
          },
          rules: [{ required: true, message: '详细地址不能为空' }]
        },

        {
          prop: 'floor',
          type: 'groupTitle'
        },
        {
          label: '楼层信息',
          prop: 'floor2',
          type: 'groupTitle'
        },
        {
          label: '地上楼层：',
          prop: 'groundFloorCount',
          type: 'inputNumber',
          options: {
            mode: 'button',
            onChange(v: number) {
              if (String(v).indexOf('.') === -1) {
                floorNumber.value = v;
                handleTableData('on', v);
              }
            },
            readOnly: !!props.id,
            allowClear: !props.id,
            min: !!props.id ? floorNumber.value : 0,
            max: 150
          },
          rules: [
            { required: true, message: '地上楼层不能为空' },
            { min: 0, match: /^[0-9]+$/, message: '只能输入正整数' }
          ]
        },
        {
          label: '地下楼层：',
          prop: 'undergroundFloorCount',
          type: 'inputNumber',
          options: {
            mode: 'button',
            onChange(v: number) {
              if (String(v).indexOf('.') === -1) {
                underFloorNumber.value = v;
                handleTableData('under', v);
              }
            },
            readOnly: !!props.id,
            allowClear: !props.id,
            min: !!props.id ? underFloorNumber.value : 0,
            max: 20
          },
          rules: [
            { required: true, message: '地下楼层不能为空' },
            { min: 0, match: /^[0-9]+$/, message: '只能输入正整数' }
          ]
        },
        {
          prop: 'tableList',
          type: 'groupTitle'
        },
        {
          prop: 'line',
          type: 'groupTitle'
        },
        {
          label: '其他信息',
          prop: 'other',
          type: 'groupTitle'
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
    };
  });
  const editForm = ref<EditForm>({
    projectId: undefined,
    id: undefined,
    name: '',
    provinceCode: '',
    cityCode: '',
    districtCode: '',
    provinceName: '',
    cityName: '',
    districtName: '',
    type: undefined,
    code: '',
    groundFloorCount: 0,
    undergroundFloorCount: 0,
    address: '',
    areaCode: [],
    attachmentList: [],
    areaName: {
      cityName: '',
      districtName: '',
      provinceName: ''
    }
  });
  const floorData = ref<Array<any>>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [initEditInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectBuildingUpdateInfoIdGet({
      id: String(props.id)
    });
    const {
      provinceCode,
      cityCode,
      districtCode,
      floorList,
      provinceName,
      cityName,
      districtName
    } = res;
    editForm.value = res as EditForm;
    floorNumber.value = res.groundFloorCount!;
    underFloorNumber.value = res.undergroundFloorCount!;
    editForm.value.areaCode = [
      Number(provinceCode),
      Number(cityCode),
      Number(districtCode)
    ];
    editForm.value.areaName = {
      provinceName: provinceName!,
      cityName: cityName!,
      districtName: districtName!
    };
    floorData.value = floorList!;
  });
  const handleTableData = (type: string, v: number) => {
    const onNum: number = editForm.value.groundFloorCount;
    const underNum: number = editForm.value.undergroundFloorCount;
    if (type === 'on') {
      if (v < 0) {
        editForm.value.groundFloorCount = 0;
        return false;
      }
      // 新增/减少的层数
      const changeNum: number = v + underNum - floorData.value.length;
      for (let i = Math.abs(changeNum); i > 0; i--) {
        if (changeNum > 0) {
          floorData.value.unshift({
            floor: `${numToString(v - i + 1)}楼`,
            floorName: `${v - i + 1}F`,
            facadeNumber: v - i + 1,
            storyHeight: undefined,
            area: undefined
          });
        } else {
          floorData.value.shift();
        }
      }
    }
    if (type === 'under') {
      if (v < 0) {
        editForm.value.undergroundFloorCount = 0;
        return false;
      }
      const changeNum: number = v + onNum - floorData.value.length;
      for (let i = Math.abs(changeNum); i > 0; i--) {
        if (changeNum > 0) {
          floorData.value.push({
            floor: `负${numToString(v - i + 1)}楼`,
            floorName: `-${v - i + 1}F`,
            facadeNumber: -(v - i + 1),
            storyHeight: undefined,
            area: undefined
          });
        } else {
          floorData.value.pop();
        }
      }
    }
  };
  const onBeforeUpdate = async () => {
    const res = await iForm.value?.submit();
    if (!res) {
      if (
        editForm.value.undergroundFloorCount === 0 &&
        editForm.value.groundFloorCount === 0
      ) {
        Message.error('地上楼层和地下楼层不能同时为0');
        return false;
      }
      // 处理默认层高和面积
      floorData.value.forEach((el: any) => {
        if (!el.storyHeight) {
          el.storyHeight = '2.8';
        }
        if (!el.area) {
          el.area = '0';
        }
      });
      let flag = false;
      let flag2 = false;
      if (
        floorData.value.some((el: any) => {
          return (
            Number(el.storyHeight < 0) ||
            !/^\d+\.?\d{0,2}$/.test(el.storyHeight)
          );
        })
      ) {
        flag = true;
      }
      if (
        floorData.value.some((el: any) => {
          return Number(el.area < 0) || !/^\d+\.?\d{0,2}$/.test(el.area);
        })
      ) {
        flag2 = true;
      }
      if (flag) {
        Message.error('层高需大于0且不能超过两位小数');
        return false;
      }
      if (flag2) {
        Message.error('层面积需大于0且不能超过两位小数');
        return false;
      }
      const { attachmentList = [] } = editForm.value;
      const picCodeTempList = attachmentList.map((i: any) => i.key || i.id);
      const p = {
        ...editForm.value,
        attachmentList: picCodeTempList,
        floorList: floorData.value,
        p: props.id
      };
      try {
        isLoading.value = true;
        if (!props.id) {
          await cbdApiProjectBuildingAddPost(
            p as unknown as CbdApiProjectBuildingAddPostRequest
          );
        } else {
          await cbdApiProjectBuildingUpdatePost(
            p as unknown as CbdApiProjectBuildingUpdatePostRequest
          );
        }
        Message.success('保存成功');
        emits('refresh');
        visible.value = false;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };
  const onCancel = async () => {};
  onMounted(async () => {
    getProjectList();
    if (props.id) {
      initEditInfo();
    } else {
      editForm.value.projectId = getActiveProjectId();
    }
  });
</script>
<style scoped lang="less">
  :deep(.arco-input-number) {
    .arco-input-wrapper {
      .arco-input {
        text-align: center;
      }
    }
  }
  :deep(.arco-input-prepend) {
    .arco-btn {
      color: #333333;
    }
  }
  :deep(.arco-input-append) {
    .arco-btn {
      color: #333333;
    }
  }
</style>
