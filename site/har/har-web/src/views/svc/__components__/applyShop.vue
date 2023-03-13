<template>
  <div class="wrapper">
    <a-radio-group
      v-model="applyType"
      :direction="radioLayout"
      class="radioLess"
      :disabled="disabled"
      @change="onChangeApplyType"
    >
      <a-radio :value="1" class="radio-items">全部店铺可用</a-radio>
      <a-radio :value="2" class="radio-items">指定店铺可用</a-radio>
      <a-radio :value="3" class="radio-items">指定店铺不可用</a-radio>
      <a-button
        v-if="applyType !== 1"
        type="text"
        :disabled="disabled"
        @click="page.showChooseShop = true"
        >选择店铺</a-button
      >
    </a-radio-group>
    <i-table
      v-if="[2, 3].includes(applyType)"
      :options="page.options"
      :data="selectShopsList"
    >
      <template #spaceApplyTypeCell="{ record }">
        {{ spaceApplyTypeHash[record.spaceApplyType] }}
        <a-button
          type="text"
          :disabled="props.disabled"
          @click="onUpdateStadiumModel(record)"
          >修改</a-button
        >
      </template>
    </i-table>
    <!-- 选择店铺引入组件 -->
    <choose-item
      v-model="page.showChooseShop"
      v-model:select-keys="selectShopsKeys"
      :search="page.search"
      title="选择店铺"
      :options="chooseShopOptions"
      :api="svcWebStorePageGet"
      @reset="page.search = { type: 1 }"
      @submit="handleSelectShop"
    />
    <edit-chosen-item
      v-if="page.showUpdateStadiumModel"
      v-model="page.showUpdateStadiumModel"
      v-model:select-keys="editStadiumKeys"
      v-model:default-check-status="chooseModelDefaultCheckStatus"
      :can-use="applyType === 3"
      :disabled="disabled"
      title="适用场地"
      :search="page.shopSearch"
      :options="editStadiumOptions"
      :api="svcWebVenuePageGet"
      @submit="handleUpdateShopStadium"
    />
  </div>
</template>

<script setup lang="ts">
  /**
   * 入参 spaceApplyType 出参 venueApplyType
   **/
  import { ref, reactive, onMounted, Ref, computed, watch } from 'vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import EditChosenItem from './edit-chosen-item.vue';
  import ITable from '@/components/i-table/index.vue';
  import addressOptions from '@/utils/area.json';
  import { Message } from '@arco-design/web-vue';
  import { IndustryItem, spaceApplyTypeHash } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    svcWebCommonFormatTreeGet,
    svcWebVenuePageGet,
    svcWebCommonClassifySelectGet,
    svcWebStorePageGet
  } from '@/api/svc-web';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import lsStore from '@/utils/ls-store';
  interface StadiumTypeItem {
    value?: number;
    label?: string;
  }
  interface propsType {
    disabled?: boolean;
    radioLayout?: 'horizontal' | 'vertical' | undefined;
    modelValue: number;
    projectId?: number;
    shopList: Array<any>;
  }

  const props = withDefaults(defineProps<propsType>(), {
    disabled: false,
    radioLayout: 'horizontal',
    modelValue: 1,
    projectId: undefined,
    shopList: () => []
  });
  const applyType = computed({
    get() {
      return props.modelValue;
    },
    set(v: number) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<any>({
    applyType: 1,
    data: [],
    showChooseShop: false,
    showUpdateStadiumModel: false,
    search: {
      type: 1,
      projectId: lsStore.getItem('svcServiceProjectId')
    },
    shopSearch: {
      type: 2
    },
    tableOptions: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: true,
      columns: [
        {
          label: '购卡及充值金额',
          prop: 'amount'
        }
      ]
    },
    options: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: false,
      columns: [
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '联系人',
          prop: 'linkman'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        },
        {
          label: '适用场地',
          prop: 'spaceApplyType'
        }
      ]
    },
    canUseStoreList: [], // 用来缓存选择的数据
    canNotUseStoreList: [] // 用来缓存选择的数据
  });
  const emits = defineEmits(['submit', 'update:modelValue']);
  // editForm.value.applyType 全部可用 / 部分 /全不可用
  const selectShopsList = ref<any[]>([]); // 选择的店铺
  const selectShopsKeys = ref<number[]>([]); // 选择的店铺id[]
  const editStadiumKeys = ref<number[]>([]); // 修改可用场地时选择的场地数据 id[]
  const chooseModelDefaultCheckStatus = ref<number>(0);
  const stadiumDropList = ref<Array<StadiumTypeItem>>([]);
  const industryList = ref<Array<IndustryItem>>([]);
  const chooseShopOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuSpan: 24,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectShopsKeys.value = e;
        }
      },
      columns: [
        {
          label: '店铺名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '项目',
          prop: 'projectName'
        },
        {
          label: '经营业态',
          prop: 'format'
        },
        {
          label: '经营业态',
          prop: 'formatId',
          search: true,
          hide: true,
          type: 'cascader',
          options: {
            'check-strictly': true
          },
          dic: industryList.value
        },
        {
          label: '所属区域',
          prop: '_area',
          type: 'cascader',
          search: true,
          options: {
            pathMode: true
          },
          on: {
            change: (e: any) => {
              page.search.provinceCode = e[0];
              page.search.cityCode = e[1];
              page.search.districtCode = e[2];
            }
          },
          dic: addressOptions
        },
        {
          label: '联系人',
          prop: 'linkman'
        },
        {
          label: '项目',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',
          dic: svcProjectDropList
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        }
      ]
    };
  });
  const editStadiumOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          editStadiumKeys.value = e;
        }
      },
      columns: [
        {
          label: '场地名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '场地名称',
          prop: 'name'
        },
        {
          label: '场地分类',
          prop: 'classifyId',
          search: true,
          type: 'select',
          hide: true,
          dic: stadiumDropList.value
        },
        {
          label: '场地分类',
          prop: 'classifyName'
        },
        {
          label: '场地编码',
          prop: 'code'
        }
      ]
    };
  });
  const onChangeApplyType = (v: string | number | boolean) => {
    emits('update:modelValue', v as number);
    if (v === 2) {
      // 切换为可用商铺时,将目前(不可用)数据保存起来 page.canNotUseStoreList 中
      page.canNotUseStoreList = [];
      selectShopsKeys.value = [];
      selectShopsList.value.forEach((el: any) => {
        page.canNotUseStoreList.push(el);
      });
      // 清空表格
      selectShopsList.value = [];
      // 如果保存过可用的数据,将数据展示出来
      selectShopsList.value = page.canUseStoreList || [];
      // 更新form数据,保证提交数据是最切换后的
      page.data = page.canUseStoreList || [];
      // 刷新当前应勾选的id
      selectShopsKeys.value = page.canUseStoreList.map((el: any) => el.id);
    } else if (v === 3) {
      page.canUseStoreList = [];
      selectShopsList.value.forEach((el: any) => {
        page.canUseStoreList.push(el);
      });
      selectShopsList.value = [];
      selectShopsList.value = page.canNotUseStoreList;
      // 更新form数据,保证提交数据是最切换后的
      page.data = page.canNotUseStoreList || [];
      selectShopsKeys.value = page.canNotUseStoreList.map((el: any) => el.id);
    }
  };

  function handleSelectShop(v: any) {
    // 对旧数据根据 selectShopsKeys过滤,排除掉本次取消勾选的数据
    selectShopsList.value = selectShopsList.value.filter((el: any) =>
      selectShopsKeys.value.includes(el.id)
    );
    // 找出本次选择前已选择的店铺
    const alreadyHasKeysList: number[] = [];
    selectShopsList.value.forEach((el: any) => {
      alreadyHasKeysList.push(el.id);
    });
    // 得到本次选择的店铺
    const list = (v.data || []).filter(
      (el: any) =>
        selectShopsKeys.value.includes(el.id) &&
        !alreadyHasKeysList.includes(el.id)
    );
    // 对新选择的数据进行处理
    list.forEach((el: any) => {
      // 指定店铺可用 列表中显示全部可用
      if (applyType.value === 2) {
        el.spaceApplyType = 1;
        // 指定店铺不可用 列表中显示全部不可用
      } else if (applyType.value === 3) {
        el.spaceApplyType = -1;
      }
    });
    // 将新选择的和前面已选择好的拼接 ===> 不能直接覆盖,否则前面编辑的会被覆盖
    selectShopsList.value = selectShopsList.value.concat(list);
    page.data = selectShopsList.value.map((el: any) => {
      return {
        id: el.id,
        venueApplyType: el.spaceApplyType === -1 ? 1 : el.spaceApplyType,
        venueIds: el.spaceIds || []
      };
    });
    if (page.data?.length) {
      emits('submit', page.data);
      page.showChooseShop = false;
    } else {
      Message.error('请先勾选店铺');
    }
  }
  function onUpdateStadiumModel(record: any) {
    chooseModelDefaultCheckStatus.value =
      record.spaceApplyType === -1 ? 1 : record.spaceApplyType;
    page.showUpdateStadiumModel = true;
    page.shopSearch.storeId = record.id;
    // 编辑店铺场馆勾选回显
    editStadiumKeys.value = record.spaceIds || record.venueIds || [];
  }
  function handleUpdateShopStadium(v: any) {
    if (
      !editStadiumKeys.value.length &&
      chooseModelDefaultCheckStatus.value !== 1
    ) {
      Message.error('请先勾选场地');
      return false;
    }
    // 构造数据,放到form提交给后台,具体需要看接口需要的数据结构
    selectShopsList.value.forEach((el: any) => {
      if (el.id === page.shopSearch.storeId) {
        el.spaceApplyType = v.type;
        // el.venueApplyType = v.type;
        el.spaceIds = editStadiumKeys.value;
      }
    });
    page.data = selectShopsList.value.map((el: any) => {
      return {
        id: el.id,
        venueApplyType: el.spaceApplyType === -1 ? 1 : el.spaceApplyType,
        venueIds: el.spaceIds || []
      };
    });
    // 清空选中状态,防止下次进入时依旧选中上次的数据
    editStadiumKeys.value = [];
    page.showUpdateStadiumModel = false;
    emits('submit', page.data);
  }

  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await svcWebCommonFormatTreeGet({});
  });
  const [getStadiumClassifyDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await svcWebCommonClassifySelectGet({
      storeId: page.shopSearch.storeId
    });
  });
  const temp = computed(() => props.shopList);
  watch(
    () => temp.value,
    (v) => {
      selectShopsKeys.value = [];
      selectShopsList.value = [];
      selectShopsList.value = v;
      page.canUseStoreList = [];
      page.canNotUseStoreList = [];
      if (applyType.value === 2) {
        page.canUseStoreList = v || [];
      }
      if (applyType.value === 3) {
        page.canNotUseStoreList = props.shopList || [];
      }
      props.shopList.forEach((el: any) => {
        selectShopsKeys.value.push(el.id);
      });
    },
    { immediate: true, deep: true }
  );
  watch(
    () => page.shopSearch.storeId,
    (v) => {
      if (v) {
        getStadiumClassifyDropList();
      }
    }
  );
  watch(
    () => props.projectId,
    (v) => {
      if (v) {
        page.search.projectId = v;
      }
    }
  );
  onMounted(() => {
    getIndustryList();
    getSvcProjectDrop();
  });
</script>
<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
