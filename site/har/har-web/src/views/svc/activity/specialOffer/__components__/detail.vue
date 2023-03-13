<template>
  <drawer
    v-model="visible"
    title="活动信息查询"
    :footer="Number(detail.status) === 1"
  >
    <template #footer>
      <a-button
        v-if="Number(detail.status) === 1"
        type="primary"
        @click="onEdit"
        >编辑</a-button
      >
    </template>
    <div class="detail-box">
      <div class="block-title">基本信息</div>
      <a-descriptions
        :column="3"
        style="padding-bottom: 16px"
        layout="vertical"
        :label-style="{ marginBottom: '20px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="项目：">{{
          valueFindLabel(svcProjectDropList, detail.projectId)
        }}</a-descriptions-item>
        <a-descriptions-item label="活动名称："
          >{{ detail.name }}
        </a-descriptions-item>
        <a-descriptions-item label="促销活动编号：">
          {{ detail.code }}</a-descriptions-item
        >
        <a-descriptions-item label="活动时间："
          >{{ detail.startTime }} - {{ detail.endTime }}
        </a-descriptions-item>
      </a-descriptions>
      <div class="split-bg"></div>
      <div class="block-title">活动规则</div>
      <a-descriptions
        :column="3"
        layout="vertical"
        :label-style="{ marginBottom: '10px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="活动场景：">{{
          valueFindLabel(cardActivitySceneList, detail.scene)
        }}</a-descriptions-item>
        <a-descriptions-item label="活动类型：">
          {{ valueFindLabel(cardActivityTypeList, detail.type) }}
        </a-descriptions-item>
        <a-descriptions-item label="活动预算（¥）：">
          {{ formatPrice(detail.budget) }}</a-descriptions-item
        >
      </a-descriptions>
      <i-table :options="ruleOptions" :data="detail.rangeList">
        <template #rangeCell="{ record }">
          {{ formatPrice(record.start)
          }}{{ record.end ? '-' + formatPrice(record.end) : ' 以上' }}
        </template>
      </i-table>
      <div class="split-bg" style="margin-top: 20px"></div>
      <div v-if="detail.scene === 'consume'">
        <div class="block-title">适用规则</div>
        <a-descriptions layout="vertical">
          <a-descriptions-item label="适用店铺：" :span="24">
            <span>
              {{
                detail.applyType === 1
                  ? '全部门店可用'
                  : detail.applyType === 2
                  ? '指定店铺可用'
                  : '指定店铺不可用'
              }}
            </span>
            <i-table
              v-if="detail.applyType !== 1"
              :options="page.options"
              :data="detail.cardStoreList"
            >
              <template #areaCell="{ record }">
                {{
                  record.provinceName
                    ? record.provinceName +
                      '/' +
                      record.cityName +
                      '/' +
                      record.districtName
                    : '--'
                }}
              </template>
              <template #venueTypeCell="{ record }">
                {{ spaceApplyTypeHash[record.spaceApplyType] }}
                <a-button type="text" @click="onViewStadiumModel(record)"
                  >查看</a-button
                >
              </template>
            </i-table>
          </a-descriptions-item>
        </a-descriptions>
        <div class="split-bg" style="margin-top: 20px"></div>
      </div>
      <div class="block-title">其他设置</div>
      <a-descriptions
        :column="1"
        :label-style="{ marginBottom: '10px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="活动描述：">{{
          detail.desc
        }}</a-descriptions-item>
        <a-descriptions-item label="活动广告图：">
          <i-custom-upload
            v-model="detail.adPictureResourceCodes"
            url-key="previewAddress"
            :options="{
              showUploadButton: false,
              showRemoveButton: false
            }"
          >
          </i-custom-upload>
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <edit-chosen-item
      v-if="page.showUpdateStadiumModel"
      v-model="page.showUpdateStadiumModel"
      disabled
      title="适用场地"
      :search="page.shopSearch"
      :options="editStadiumOptions"
      :can-use="detail.applyType === 3"
      :default-check-status="chooseModelDefaultCheckStatus"
      :api="svcWebActivityDiscountVenueGet"
      @submit="page.showUpdateStadiumModel = false"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, watch, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    listItemStyle,
    cardActivitySceneList,
    cardActivityTypeList
  } from '@/utils/dic';
  import { valueFindLabel, formatPrice } from '@/utils';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import EditChosenItem from '@/views/svc/__components__/edit-chosen-item.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { spaceApplyTypeHash } from '@/utils/dic';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import {
    svcWebActivityDiscountInfoIdGet,
    SvcWebActivityDiscountInfoIdGetResponse,
    svcWebCommonClassifySelectGet,
    svcWebActivityDiscountVenueGet,
    SvcWebCommonClassifySelectGetResponse
  } from '@/api/svc-web';
  type StadiumTypeItem = SvcWebCommonClassifySelectGetResponse[0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'edit']);
  const detail = ref<SvcWebActivityDiscountInfoIdGetResponse>(
    {} as SvcWebActivityDiscountInfoIdGetResponse
  );
  const label = computed(() => {
    return detail.value?.type === 'consume_discount'
      ? '消费折扣（折）'
      : detail.value?.type === 'discount'
      ? '折扣（折）'
      : detail.value?.type === 'gift'
      ? '赠送金额（元）'
      : '优惠金额（元）';
  });
  const ruleOptions = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      tableCard: false,
      menu: false,
      pageShow: false,
      columns: [
        {
          label: '购卡金额',
          prop: 'range'
        },
        {
          label: label.value,
          prop: 'amount'
        }
      ]
    };
  });
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const onEdit = () => {
    emits('edit', props.id!);
  };
  const [getDetailData] = useFuncProxy(async () => {
    detail.value = await svcWebActivityDiscountInfoIdGet({
      id: props.id
    });
  });
  interface PageConfig {
    search: {
      id: string;
    };
    shopSearch: {
      storeId: number | undefined;
      activityId: string;
    };
    refresh: boolean;
    showUpdateStadiumModel: boolean;
    showUpdateGoodsModel: boolean;
    options: any;
  }
  // 可用场地回显相关=======================================
  const chooseModelDefaultCheckStatus = ref<number>(0);
  const stadiumDropList = ref<Array<StadiumTypeItem>>([]);
  const editStadiumOptions: Ref = computed(() => {
    return {
      tableCard: false,
      menu: false,
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
  const page = reactive<PageConfig>({
    search: {
      id: String(props.id)
    },
    shopSearch: {
      storeId: undefined,
      activityId: ''
    },
    refresh: false,
    showUpdateStadiumModel: false,
    showUpdateGoodsModel: false,
    options: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: false,
      columns: [
        {
          label: '店铺名称',
          prop: 'storeName'
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        },
        {
          label: '适用场地',
          prop: 'venueType'
        }
      ]
    }
  });
  const [getStadiumDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await svcWebCommonClassifySelectGet({
      storeId: String(page.shopSearch.storeId)
    });
  });
  function onViewStadiumModel(record: any) {
    page.showUpdateStadiumModel = true;
    chooseModelDefaultCheckStatus.value =
      record.venueType === -1 ? 1 : record.spaceApplyType || 0;
    page.shopSearch.storeId = record.id;
    page.shopSearch.activityId = props.id;
  }

  watch(
    () => page.shopSearch.storeId,
    (v) => {
      if (v) {
        getStadiumDropList();
      }
    }
  );
  // ===================================
  onMounted(() => {
    getDetailData();
    getSvcProjectDrop();
  });
  watch(
    () => props.refresh,
    () => {
      getDetailData();
      getSvcProjectDrop();
    }
  );
</script>
<style scoped lang="less">
  .detail-box {
    width: 100%;
    padding: 0 16px 16px;
    background-color: #fff;
  }
</style>
