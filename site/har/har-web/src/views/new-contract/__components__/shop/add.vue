<template>
  <a-spin :loading="loading" style="display: block" tip="加载中......">
    <div class="shop-box">
      <i-form ref="iForm" v-model="editForm" :options="formProps">
        <template #lineForm>
          <div class="split"></div>
        </template>
        <template #tableListForm>
          <a-row>
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
            <a-col :span="7" :offset="1">
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
                  <a-checkbox-group
                    v-model="editForm.floorId"
                    class="card-content"
                    direction="vertical"
                  >
                    <div v-for="item in floorData" :key="item.value">
                      <a-checkbox :value="item.value">{{
                        item.label
                      }}</a-checkbox>
                    </div>
                  </a-checkbox-group>
                </a-card>
              </a-form-item>
            </a-col>
            <a-col :span="7" :offset="1">
              <a-form-item
                style="width: 100%; margin-bottom: 0"
                field="estateId"
                class="building"
                :rules="[{ required: true, message: '商铺未选择' }]"
              >
                <a-card style="width: 100%">
                  <template #title>
                    <div class="card-title">铺位</div>
                  </template>
                  <div style="height: 290px">
                    <i-table
                      v-model:selected-keys="editForm.estateId"
                      style="height: 100%"
                      :options="plateOptions"
                      :data="computedHouseData"
                    >
                      <template #header>
                        <div class="flex justify-center align-center">
                          <div style="white-space: nowrap">铺位号：</div>
                          <a-input-search v-model="searchKey"></a-input-search>
                        </div>
                      </template>
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
        </template>
      </i-form>
      <i-table :options="tableOptions" :data="tableData">
        <template #mainBerthCell="{ record }">
          <a-checkbox
            v-if="record.doorPlate !== '合计'"
            :model-value="selectKeys.indexOf(record.id) > -1"
            @click="onCheck(record.id)"
          ></a-checkbox>
          <div v-else>--</div>
        </template>
        <template #menu="{ record }">
          <a-popconfirm
            v-if="record.doorPlate !== '合计'"
            content="数据删除后无法恢复，是否删除？"
            @ok="deleteOne(record)"
          >
            <a-button type="text">删除</a-button>
          </a-popconfirm>
          <div v-else>--</div>
        </template>
      </i-table>
      <div class="bottoms">
        <footer-btn
          :btn-loading="subLoading"
          need-pre
          @on-cancel="cancelClick"
          @on-save="submit"
          @on-pre="preClick"
          @on-next="nextClick"
        />
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed, Ref } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import useDictData from '@/hooks/useDictData';
  import FooterBtn from '../footer-btn.vue';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    type CbdApiProjectCommonAssetsSelectListGetResponse,
    cbdApiProjectDictGetDictDataIdGet,
    CbdApiProjectDictGetDictDataIdGetResponse,
    type CbdApiProjectFormalContractBerthInfoContractIdGetResponse
  } from '@/api';
  import NP from 'number-precision';
  import { useContractStore } from '@/store/project/contract';
  import useApi from './useApi';
  import { useRequest } from '@har/use';
  type showItem =
    Required<CbdApiProjectFormalContractBerthInfoContractIdGetResponse>['misContractBerthDetailVos'][0];
  type HouseItem = CbdApiProjectCommonAssetsSelectListGetResponse[0] & {
    extra?: {
      acreage?: number;
      useAcreage?: number;
    };
  };
  const contractInfo = useContractStore();
  const contractId = contractInfo.$state.contractInfo.contractId || '';
  // contractType: number; //1意向合同 2正式合同
  const contractType = contractInfo.$state.contractInfo.contractType;
  const { requestBerthInfoApi, requestSubmitApi, requestSubjectInfoApi } =
    useApi(contractType);
  const emits = defineEmits(['onCancel', 'onNext', 'onPre', 'onSave']);
  const props = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  });
  const iForm: Ref = ref(null);
  const houseTypeList = ref<CbdApiProjectDictGetDictDataIdGetResponse>([]);
  const editForm = ref<{
    projectId?: number;
    projectName?: string;
    buildingId?: number;
    floorId: number[];
    estateId: number[];
    categoryId?: number;
  }>({
    projectId: undefined,
    buildingId: undefined,
    estateId: [],
    floorId: [],
    categoryId: undefined
  });
  const buildingData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  const floorData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  const houseData = ref<HouseItem[]>([]);
  const formProps = computed<Recordable>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '铺位信息',
        type: 'groupTitle'
      },
      {
        label: '归属项目：',
        prop: 'projectName',
        options: {
          disabled: true
        }
      },
      {
        label: '铺位类型：',
        prop: 'categoryId',
        type: 'select',
        dic: houseTypeList,
        options: {
          fieldNames: {
            label: 'dataName',
            value: 'id'
          },
          onChange() {
            editForm.value.buildingId = undefined;
            editForm.value.floorId = [];
            editForm.value.estateId = [];
          }
        },
        rules: [{ required: true, message: '铺位类型不能为空' }]
      },
      {
        type: 'groupTitle',
        prop: 'line'
      },
      {
        type: 'groupTitle',
        prop: 'tableList'
      }
    ]
  }));
  const tableOptions = ref<Recordable>({
    indexTitle: '序号',
    index: true,
    pageShow: false,
    menuSpan: 18,
    menuOtherOptions: {
      summaryText: '合计',
      summary({ data = [] }) {
        const countData = {
          isSummary: true,
          doorPlate: '合计',
          acreage: 0,
          useAcreage: 0
        };
        data.forEach((record: any) => {
          countData.acreage = NP.plus(countData.acreage, record.acreage);
          countData.useAcreage = NP.plus(
            countData.useAcreage,
            record.useAcreage
          );
        });
        return [countData];
      }
    },
    columns: [
      {
        label: '项目名称',
        prop: 'projectName'
      },
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
        prop: 'doorPlate'
      },
      {
        label: '建筑面积（㎡）',
        prop: 'acreage'
      },
      {
        label: '使用面积（㎡）',
        prop: 'useAcreage'
      },
      {
        label: '是否主营铺位',
        prop: 'mainBerth'
      }
    ]
  });
  const searchKey = ref<string>('');
  const selectKeys = ref<number[]>([]);
  const computedHouseData = computed<HouseItem[]>(() => {
    return houseData.value
      .filter((el: HouseItem) => el.label!.indexOf(searchKey.value) > -1)
      .map((el: HouseItem) => {
        return {
          ...el,
          ...el.extra
        };
      });
  });
  const plateOptions = ref({
    menu: false,
    pageShow: false,
    tableCard: false,
    menuOtherOptions: {
      'row-selection': {
        type: 'checkbox'
      },
      'rowKey': 'id',
      'scroll': {
        x: '0',
        y: 200
      }
    },
    columns: [
      {
        label: '铺位号',
        prop: 'label',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '建筑面积(㎡)',
        prop: 'acreage',
        align: 'center',
        width: 120
      },
      {
        label: '使用面积(㎡)',
        prop: 'useAcreage',
        align: 'center',
        width: 120
      }
    ]
  });
  const tableData = computed(() => {
    return computedHouseData.value.filter(
      (el: HouseItem) => editForm.value.estateId.indexOf(el.value!) > -1
    );
  });
  const deleteOne = (record: HouseItem) => {
    const idx = editForm.value.estateId.findIndex(
      (e: number) => e === record.value
    );
    editForm.value.estateId.splice(idx, 1);
    // 删除的是主营,且table还有数据就默认选中第一个
    if (record.value === selectKeys.value[0] && tableData.value.length) {
      selectKeys.value = [tableData.value[0].value!];
    }
  };
  const onCheck = (idx: number) => {
    selectKeys.value = [idx];
  };
  const cancelClick = async () => {
    await emits('onCancel');
  };

  // 提交数据的方法
  const subLoading = ref(false);
  const reqSubmitInfo = async (callback: () => void) => {
    const res = await iForm.value.submit();
    if (!res) {
      try {
        subLoading.value = true;
        let temp = tableData.value.map((el: any) => {
          return {
            doorPlateId: el.id,
            buildingId: el.buildingId,
            buildingName: el.buildingName,
            floorId: el.floorId,
            floorName: el.floorName,
            doorPlate: el.doorPlate,
            acreage: el.acreage,
            useAcreage: el.useAcreage,
            mainBerth: selectKeys.value.includes(el.value!) ? 1 : 0
          };
        });
        // 选择的铺位完全等于详情返回的,且过滤后的数据为空,那就是请求还没返回用户就点了下一步,直接用返回的数据
        const ids: number[] = (
          detail.value.misContractBerthDetailVos! || []
        ).map((el: showItem) => el.doorPlateId);
        if (
          !temp.length &&
          ids.length === selectKeys.value.length &&
          ids.every((a: number) => selectKeys.value.includes(a))
        ) {
          temp = detail.value.misContractBerthDetailVos as any;
        }
        await requestSubmitApi({
          contractId: contractId as number,
          projectId: editForm.value.projectId!,
          categoryId: editForm.value.categoryId!,
          projectName: editForm.value.projectName,
          misContractBerthDetailVos: temp
        });
        editForm.value = {
          projectId: undefined,
          buildingId: undefined,
          estateId: [],
          floorId: [],
          categoryId: undefined
        };
        callback && callback();
      } catch (e) {
        console.log(e);
      } finally {
        subLoading.value = false;
      }
    }
  };
  // 点击提交按钮
  const submit = () => {
    reqSubmitInfo(() => {
      emits('onSave');
    });
  };
  // 上一步
  const preClick = () => {
    emits('onPre');
  };
  // 下一步
  const nextClick = () => {
    reqSubmitInfo(() => {
      emits('onNext');
    });
  };
  const startDate = ref('');
  const endDate = ref('');
  // 新增时获取主体信息=== 拿项目id和项目名
  const getContractInfo = async () => {
    const res = await requestSubjectInfoApi({
      contractId: (contractId || '') as string
    });
    startDate.value = res.leaseStartDate || '';
    endDate.value = res.leaseEndDate || '';
    editForm.value.projectId = res.projectId;
    editForm.value.projectName = res.projectName;
  };
  // 编辑时获取信息回显
  const detail = ref<CbdApiProjectFormalContractBerthInfoContractIdGetResponse>(
    {} as CbdApiProjectFormalContractBerthInfoContractIdGetResponse
  );
  const loading = ref(false);
  const initContractShopInfo = async () => {
    try {
      loading.value = true;
      detail.value = await requestBerthInfoApi({
        contractId: (contractId || '') as string
      });
      const item = houseTypeList.value.find(
        (el: any) => el.dataCode === '2023010616242002'
      ) || { id: undefined };
      editForm.value.projectId =
        detail.value.projectId || editForm.value.projectId;
      editForm.value.categoryId =
        detail.value.categoryId || (item.id ? Number(item.id) : undefined);
      const target = detail.value.misContractBerthDetailVos || [];
      if (target.length) {
        editForm.value.buildingId = target[0].buildingId;
      }
      const floorObj: {
        [index: number]: number;
      } = {};
      const tempEstate: number[] = [];
      target.forEach((el: showItem) => {
        if (!floorObj[`${el.floorId}`]) {
          floorObj[`${el.floorId}`] = el.floorId;
        }
        tempEstate.push(el.doorPlateId);
        if (el.mainBerth === 1) {
          selectKeys.value = [el.doorPlateId];
        }
      });
      editForm.value.floorId = Object.values(floorObj);
      editForm.value.estateId = tempEstate;
    } catch (e) {
    } finally {
      loading.value = false;
    }
  };
  const { run: getHouseTypeList } = useRequest(
    cbdApiProjectDictGetDictDataIdGet,
    {
      manual: true,
      onSuccess(res) {
        houseTypeList.value = res;
        const item = houseTypeList.value.find(
          (el: any) => el.dataCode === '2023010616242002'
        ) || { id: undefined };
        if (!props.isEdit) {
          editForm.value.categoryId = item.id ? Number(item.id) : undefined;
        }
      }
    }
  );
  onMounted(async () => {
    await getHouseTypeList({
      id: '00005'
    });
    await getContractInfo();
    if (props.isEdit) {
      await initContractShopInfo();
    }
  });
  watch(
    () => editForm.value.categoryId,
    () => {
      if (editForm.value.projectId) {
        getBuildingData(`${editForm.value.projectId}`, '2');
      }
    }
  );
  watch(
    () => editForm.value.projectId,
    (v) => {
      if (v) {
        getBuildingData(`${v}`, '2');
      }
    }
  );
  watch(
    () => editForm.value.buildingId,
    (v) => {
      floorData.value = [];
      houseData.value = [];
      if (v) {
        // editForm.value.floorId = [];
        getBuildingData(`${v}`, '3');
      }
    }
  );
  watch(
    () => editForm.value.floorId,
    (v) => {
      if (v && v.length) {
        const t = v.join(',');
        getBuildingData(t, '4');
      }
    }
  );
  watch(
    () => tableData,
    (v) => {
      if (v.value.length) {
        // 新增
        if (!props.isEdit) {
          selectKeys.value = [v.value[0].value!];
        } else {
          // 编辑且没有已勾选数据的时候
          if (!selectKeys.value.length) {
            selectKeys.value = [v.value[0].value!];
          }
        }
      }
    },
    { deep: true }
  );
  const getBuildingData = async (pv: string, level: string) => {
    const res = await cbdApiProjectCommonAssetsSelectListGet({
      parentValues: pv,
      level: level,
      categoryId: String(editForm.value.categoryId || ''),
      leaseStartDate: startDate.value,
      leaseEndDate: endDate.value
    });
    if (level === '2') {
      buildingData.value = res;
    }
    if (level === '3') {
      floorData.value = res;
    }
    if (level === '4') {
      houseData.value = res || [];
    }
  };
</script>

<style scoped lang="less">
  .shop-box {
    padding: 16px;
    background-color: #f7f7f7;
    .split {
      width: calc(100% + 40px);
      margin-left: -20px;
      height: 20px;
      background-color: #f7f7f7;
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
  .search {
    margin-bottom: 15px;
  }
  .card-content {
    box-sizing: border-box;
    height: 290px;
    width: 100%;
    overflow-y: scroll;

    .radio-box {
      width: 100%;
      padding-right: 20px;
      p {
        margin: 0;
        color: #333333;
      }
    }
  }
  .building {
    :deep(.arco-form-item-label-col) {
      display: none;
    }
  }
  .bottoms {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
</style>
