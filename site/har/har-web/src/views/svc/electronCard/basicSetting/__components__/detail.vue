<template>
  <drawer
    v-model="visible"
    title="电子卡详情"
    :footer="false"
    :show-log="true"
    :options="{ okLoading: isLoading }"
    :log-options="{
      modeId: props.detailId,
      mode: 'card'
    }"
  >
    <div class="warp">
      <div class="left-item">
        <a-descriptions
          :label-style="{ 'margin-bottom': '20px' }"
          layout="vertical"
          :column="2"
        >
          <a-descriptions-item label="项目：">{{
            info.projectName
          }}</a-descriptions-item>
          <a-descriptions-item label="储值卡名称：">{{
            info.cardName
          }}</a-descriptions-item>
          <a-descriptions-item label="商场名称：">{{
            info.marketName
          }}</a-descriptions-item>
          <a-descriptions-item label="参考购卡及充值金额：" :span="24">{{
            piceValue
          }}</a-descriptions-item>
        </a-descriptions>
        <a-descriptions layout="vertical">
          <a-descriptions-item label="适用店铺：" :span="24">
            <span>
              {{
                info.applyType === 1
                  ? '全部门店可用'
                  : info.applyType === 2
                  ? '指定店铺可用'
                  : '指定店铺不可用'
              }}
            </span>
            <i-table
              v-if="info.applyType !== 1"
              :options="page.options"
              :data="info.cardStoreList"
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
                {{ spaceApplyTypeHash[record.venueApplyType] }}
                <a-button type="text" @click="onViewStadiumModel(record)"
                  >查看</a-button
                >
              </template>
            </i-table>
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions layout="vertical" :column="2">
          <a-descriptions-item label="商场LOGO：">
            <i-custom-upload
              v-model="info.marketLogo"
              url-key="previewAddress"
              :options="{
                showUploadButton: false,
                showRemoveButton: false
              }"
            >
            </i-custom-upload>
          </a-descriptions-item>
          <a-descriptions-item label="卡背景：">
            <i-custom-upload
              v-model="info.cardBack"
              url-key="previewAddress"
              :options="{
                showUploadButton: false,
                showRemoveButton: false
              }"
            >
            </i-custom-upload>
          </a-descriptions-item>
          <a-descriptions-item label="储值卡详情：">{{
            info.cardDetail
          }}</a-descriptions-item>

          <a-descriptions-item label="创建人：">{{
            info.createBy
          }}</a-descriptions-item>
          <a-descriptions-item label="创建时间：">{{
            info.createTime
          }}</a-descriptions-item>

          <a-descriptions-item label="更新人：">{{
            info.updateBy
          }}</a-descriptions-item>
          <a-descriptions-item label="更新时间：">{{
            info.updateTime
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="right-item">
        <div class="bg">
          <iframe
            id="basicsIframe"
            ref="basicRefs"
            :src="`${H5Url}/pages/card/cardRecord/cardRecord`"
            frameborder="0"
            class="content"
            @load="iframeOnload"
          ></iframe>
        </div>
      </div>
    </div>
    <edit-chosen-item
      v-if="page.showUpdateStadiumModel"
      v-model="page.showUpdateStadiumModel"
      disabled
      title="适用场地"
      :search="page.shopSearch"
      :options="editStadiumOptions"
      :can-use="info.applyType === 3"
      :default-check-status="chooseModelDefaultCheckStatus"
      :api="svcWebCardVenueGet"
      @submit="page.showUpdateStadiumModel = false"
    >
    </edit-chosen-item>
  </drawer>
</template>

<script setup lang="ts">
  import {
    ref,
    computed,
    watch,
    reactive,
    Ref,
    onMounted,
    nextTick
  } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    svcWebCardDetailIdGet,
    svcWebCardVenueGet,
    svcWebCommonClassifySelectGet,
    SvcWebCardDetailIdGetResponse,
    SvcWebCommonClassifySelectGetResponse
  } from '@/api/svc-web';
  import EditChosenItem from '@/views/svc/__components__/edit-chosen-item.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ITable from '@/components/i-table/index.vue';
  import Messenger from '@har/messenger';
  import { H5Url } from '@/utils/h5Url';
  import debounce from 'lodash/debounce';
  // import { formatPrice } from '@/utils';
  import { spaceApplyTypeHash } from '@/utils/dic';
  type StadiumTypeItem = SvcWebCommonClassifySelectGetResponse[0];
  interface PageConfig {
    search: {
      id: string;
    };
    shopSearch: {
      storeId: number | undefined;
      cardId: string;
    };
    refresh: boolean;
    showUpdateStadiumModel: boolean;
    showUpdateGoodsModel: boolean;
    options: any;
  }
  const piceValue: Ref = ref('');
  const basicRefs: Ref = ref(null);
  const isLoading: Ref = ref(false);
  const messenger = new Messenger('basciRefs', 'cardCode');

  const emits = defineEmits(['update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: [Number, String],
      required: true
    }
  });
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
      id: String(props.detailId)
    },
    shopSearch: {
      storeId: undefined,
      cardId: ''
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
    console.log(record);
    page.showUpdateStadiumModel = true;
    chooseModelDefaultCheckStatus.value =
      record.venueApplyType === -1 ? 1 : record.venueApplyType || 0;
    page.shopSearch.storeId = record.id;
    page.shopSearch.cardId = String(props.detailId);
  }

  const info = ref<SvcWebCardDetailIdGetResponse>(
    {} as SvcWebCardDetailIdGetResponse
  );
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    info.value = await svcWebCardDetailIdGet({
      id: props.detailId as unknown as string
    });
    const a: any = info.value.cardAmountList;
    piceValue.value = a.join('元，') + '元';

    await iframeOnload();
    sendData(info.value);
  });

  let ready: () => void;
  const readyFn = new Promise<void>((resolve) => (ready = resolve));
  //iframe 加载完成渲染h5
  const iframeOnload = () => {
    ready();
  };
  const sendData = debounce(function (data: any) {
    readyFn.then(() => {
      messenger.targets['cardCode'].send({
        cardName: data.cardName,
        marketLogoUrl:
          data.marketLogo[0]?.url || data.marketLogo?.previewAddress || [],
        cardBackgroundUrl:
          data.cardBack[0]?.url || data.cardBack?.previewAddress || []
      });
    });
  }, 500);

  watch(
    () => page.shopSearch.storeId,
    (v) => {
      if (v) {
        getStadiumDropList();
      }
    }
  );

  onMounted(() => {
    getData();
    nextTick(async () => {
      await messenger.addTarget(basicRefs.value.contentWindow, 'cardCode');
    });
  });
</script>
<style scoped lang="less">
  .warp {
    display: flex;
    width: 100%;
    overflow: auto;
    height: 100%;

    .left-item {
      width: 70vw;
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      margin-right: 16px;
    }
    .right-item {
      height: 100%;
      width: 30vw;
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      justify-content: center;

      .bg {
        width: 416px;
        height: 842px;
        background: url(@/assets/images/svc/phone-bg.png);
        background-color: #fff;
        position: relative;
        .content {
          width: 370px;
          height: 568px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee;
          position: absolute;
          left: 22px;
          top: 100px;
        }
      }
    }
  }
</style>
