<template>
  <div class="detail">
    <div class="top">
      <div class="block-title">铺位信息</div>
      <a-descriptions style="width: 500px" layout="vertical" :column="2">
        <a-descriptions-item label="归属项目">{{
          detail.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="铺位类型">{{
          valueFindLabel(houseTypeList, detail.categoryId)
        }}</a-descriptions-item>
      </a-descriptions>
    </div>
    <a-row class="building-box">
      <a-col :span="7">
        <a-card style="width: 100%">
          <template #title>
            <div class="card-title">楼宇</div>
          </template>
          <a-radio-group
            v-model="editForm.buildingId"
            disabled
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
      </a-col>
      <a-col :span="7" :offset="1">
        <a-card style="width: 100%">
          <template #title>
            <div class="card-title">楼层</div>
          </template>
          <a-checkbox-group
            v-model="editForm.floorId"
            disabled
            class="card-content"
            direction="vertical"
          >
            <div v-for="item in floorData" :key="item.value">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </div>
          </a-checkbox-group>
        </a-card>
      </a-col>
      <a-col :span="7" :offset="1">
        <a-card style="width: 100%">
          <template #title>
            <div class="card-title">商铺</div>
          </template>
          <div
            class="flex align-center justify-center search"
            style="height: 40px; width: 100%"
          >
            <div style="white-space: nowrap">铺位号：</div>
            <div style="width: 90%"
              ><a-input-search v-model="searchKey"></a-input-search
            ></div>
          </div>
          <a-checkbox-group
            v-model="editForm.estateId"
            disabled
            class="card-content"
            direction="vertical"
            style="width: 100%; height: 235px"
          >
            <a-row flex justify="space-around">
              <a-col :span="8" class="type">铺位号</a-col>
              <a-col :span="8" class="type">建筑面积（㎡）</a-col>
              <a-col :span="8" class="type">使用面积（㎡）</a-col>
            </a-row>
            <div
              v-for="item in computedHouseData"
              :key="item.value"
              class="flex justify-between align-center radio-box"
            >
              <a-checkbox
                :value="item.value"
                style="width: 33%; text-align: center; margin: 0 auto"
                >{{ item.label }}</a-checkbox
              >
              <p style="width: 33%; text-align: center">{{
                (item.extra && item.extra.acreage) || '--'
              }}</p>
              <p style="width: 33%; text-align: center">{{
                (item.extra && item.extra.useAcreage) || '--'
              }}</p>
            </div>
          </a-checkbox-group>
        </a-card>
      </a-col>
    </a-row>
    <i-table :options="tableOptions" :data="showItems">
      <template #mainBerthCell="{ record }">
        <a-checkbox
          v-if="record.doorPlate !== '合计'"
          :model-value="record.mainBerth === 1"
          disabled
        ></a-checkbox>
        <div v-else>--</div>
      </template>
    </i-table>
    <div class="bottoms">
      <footer-btn
        :need-save="false"
        @on-cancel="cancelClick"
        @on-pre="preClick"
        @on-update="updateClick"
        @on-next="nextClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useDictData from '@/hooks/useDictData';
  import FooterBtn from '../footer-btn.vue';
  import { valueFindLabel } from '@/utils';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    type CbdApiProjectCommonAssetsSelectListGetResponse,
    type CbdApiProjectFormalContractBerthInfoContractIdGetResponse
  } from '@/api';
  import NP from 'number-precision';
  import { useContractStore } from '@/store/project/contract';
  import useApi from '@/views/new-contract/__components__/shop/useApi';
  type showItem =
    Required<CbdApiProjectFormalContractBerthInfoContractIdGetResponse>['misContractBerthDetailVos'][0];
  type HouseItem = CbdApiProjectCommonAssetsSelectListGetResponse[0] & {
    extra?: {
      acreage?: number;
      useAcreage?: number;
    };
  };
  type TempItem = showItem & {
    projectName?: string;
  };
  const contractInfo = useContractStore();
  const contractId = contractInfo.$state.contractInfo.contractId || '';
  const contractType = contractInfo.$state.contractInfo.contractType;
  const { requestBerthInfoApi, requestSubjectInfoApi } = useApi(contractType);
  const emits = defineEmits([
    'onCancel',
    'onNext',
    'onPre',
    'onUpdate',
    'onSave'
  ]);
  const [houseTypeList] = useDictData('00005');
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
  const tableOptions = ref<Recordable>({
    indexTitle: '序号',
    index: true,
    pageShow: false,
    menu: false,
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
        width: 150,
        prop: 'projectName'
      },
      {
        label: '楼宇',
        width: 150,
        prop: 'buildingName'
      },
      {
        label: '楼层',
        width: 150,
        prop: 'floorName'
      },
      {
        label: '铺位号',
        width: 150,
        prop: 'doorPlate'
      },
      {
        label: '建筑面积（㎡）',
        width: 150,
        prop: 'acreage'
      },
      {
        label: '使用面积（㎡）',
        width: 150,
        prop: 'useAcreage'
      },
      {
        label: '是否主营铺位',
        prop: 'mainBerth',
        width: 150
      }
    ]
  });
  const searchKey = ref<string>('');
  const computedHouseData = computed<HouseItem[]>(() => {
    return houseData.value.filter(
      (el: HouseItem) => el.label!.indexOf(searchKey.value) > -1
    );
  });
  const showItems = computed(() => {
    return detail.value.misContractBerthDetailVos?.map((el: TempItem) => {
      return {
        ...el,
        projectName: detail.value.projectName
      };
    });
  });
  const cancelClick = async () => {
    await emits('onCancel');
  };
  //修改
  const updateClick = async () => {
    await emits('onUpdate');
  };
  // 上一步
  const preClick = () => {
    emits('onPre');
  };
  // 下一步
  const nextClick = () => {
    emits('onNext');
  };
  // 编辑时获取信息回显
  const detail = ref<CbdApiProjectFormalContractBerthInfoContractIdGetResponse>(
    {} as CbdApiProjectFormalContractBerthInfoContractIdGetResponse
  );
  const getContractInfo = async () => {
    const res = await requestSubjectInfoApi({
      contractId: (contractId || '') as string
    });
    editForm.value.projectId = res.projectId;
    editForm.value.projectName = res.projectName;
  };
  const initContractShopInfo = async () => {
    detail.value = await requestBerthInfoApi({
      contractId: (contractId || '') as string
    });
    editForm.value.categoryId = detail.value.categoryId;
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
    });
    editForm.value.floorId = Object.values(floorObj);
    editForm.value.estateId = tempEstate;
  };
  onMounted(() => {
    getContractInfo();
    initContractShopInfo();
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
  const getBuildingData = async (pv: string, level: string) => {
    const res = await cbdApiProjectCommonAssetsSelectListGet({
      parentValues: pv,
      level: level,
      categoryId: String(editForm.value.categoryId || '')
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
  .detail {
    padding: 16px;
    background-color: #f7f7f7;
    .top {
      padding: 0 16px 16px;
      background-color: #fff;
      margin-bottom: 20px;
    }
    .building-box {
      padding: 16px;
      margin-bottom: 20px;
      background-color: #fff;
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
