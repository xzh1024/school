<template>
  <drawer v-model="visible" title="查看优惠券" :footer="data.info.status === 1">
    <template #footer>
      <a-button
        v-permission="['market:coupon:nullify']"
        type="primary"
        @click="onInvalid"
        >作废</a-button
      >
    </template>
    <div class="white-detail-box">
      <a-tabs default-active-key="0" @change="changeTab">
        <a-tab-pane key="0" title="运营信息">
          <!--        todo-->
          <!--        图表暂时不做-->
          <!--        <a-row flex style="width: 60vw">-->
          <!--          <a-col :span="10">-->
          <!--            <div style="width: 100%; height: 250px">-->
          <!--              <pie-chart :data="data.run.pieChart"></pie-chart>-->
          <!--            </div>-->
          <!--          </a-col>-->
          <!--          <a-col :span="12" :offset="1">-->
          <!--            <div style="width: 100%; height: 250px">-->
          <!--              <bar-chart :data="data.run.barData"></bar-chart>-->
          <!--            </div>-->
          <!--          </a-col>-->
          <!--        </a-row>-->
          <a-divider orientation="left">基本信息</a-divider>
          <a-descriptions>
            <a-descriptions-item v-if="type === '1'" label="满减券名称：">
              {{ data.run.baseInfo.name }}</a-descriptions-item
            >
            <a-descriptions-item v-if="type === '2'" label="折扣券名称：">
              {{ data.run.baseInfo.name }}</a-descriptions-item
            >
            <a-descriptions-item v-if="type === '3'" label="礼品券名称：">
              {{ data.run.baseInfo.name }}</a-descriptions-item
            >
            <a-descriptions-item v-if="type === '4'" label="积分现金券名称：">
              {{ data.run.baseInfo.name }}</a-descriptions-item
            >
            <a-descriptions-item label="发放数量：">
              {{ data.run.baseInfo.stock }} 张</a-descriptions-item
            >
            <a-descriptions-item label="状态：">{{
                couponStatusHash[data.run.baseInfo.status] || '--'
              }}</a-descriptions-item>
            <a-descriptions-item
              v-if="type === '4'"
              label="积分现金券购买积分:"
            >{{
                data.run.baseInfo.discount.integral || '--'
              }}</a-descriptions-item
            >
            <a-descriptions-item
              v-if="type === '4'"
              :span="2"
              label="积分现金券抵扣金额（¥）:"
            >{{
                data.run.baseInfo.discount.deductionAmount || '--'
              }}</a-descriptions-item
            >
            <a-descriptions-item label="已领取">{{
                data.run.baseInfo.receivedNum
              }}</a-descriptions-item>
            <a-descriptions-item label="已使用：">{{
                data.run.baseInfo.usedNum ?? '--'
              }}</a-descriptions-item>
          </a-descriptions>
          <i-table
            v-model="page.search"
            v-model:refresh-now="page.refresh"
            :options="runOptions"
            :api="cbdApiProjectMarketCouponPageOperatingInformationGet"
          >
            <template #receivingDateCell="{ record }">
              {{ formatTime(record.receivingDate) }}
            </template>
            <template #usedDateCell="{ record }">
              {{ formatTime(record.usedDate) }}
            </template>
          </i-table>
        </a-tab-pane>
        <a-tab-pane key="1" title="优惠券信息">
          <a-divider orientation="left">基本信息</a-divider>
          <a-descriptions v-if="type === '1'" :column="2">
            <a-descriptions-item label="满减券名称：">
              {{ data.info.name }}</a-descriptions-item
            >
            <a-descriptions-item label="发放数量：">
              {{ data.info.stock }} 张</a-descriptions-item
            >
            <a-descriptions-item label="满减券金额（¥）：">{{
                data.info.fullReducedAmount
              }}</a-descriptions-item>
          </a-descriptions>
          <a-descriptions v-if="type === '2'" :column="2">
            <a-descriptions-item label="折扣券名称：">
              {{ data.info.name }}</a-descriptions-item
            >
            <a-descriptions-item label="发放数量：">
              {{ data.info.stock }} 张</a-descriptions-item
            >
            <a-descriptions-item label=" 折扣券折扣：">
              {{ data.info.discount }} 折</a-descriptions-item
            >
            <a-descriptions-item label="最多优惠："
            >{{ data.info.maximumDiscount }} 元</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions v-if="type === '3'" :column="2">
            <a-descriptions-item label="礼品券名称：">
              {{ data.info.name }}</a-descriptions-item
            >
            <a-descriptions-item label="发放数量：">
              {{ data.info.stock }} 张</a-descriptions-item
            >
            <a-descriptions-item label="兑换商品">
              （当前商品兑换券可支持以下店铺中选中商品的兑换，每张券只能兑换一个商品）</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions v-if="type === '4'" :column="2">
            <a-descriptions-item label="抵扣券名称：">
              {{ data.info.name }}</a-descriptions-item
            >
            <a-descriptions-item label="发放数量：">
              {{ data.info.stock }} 张</a-descriptions-item
            >
            <a-descriptions-item label=" 抵扣券购买积分：">
              {{ data.info.integral }}</a-descriptions-item
            >
            <a-descriptions-item label="抵扣券抵扣金额（¥）：">
              {{ data.info.deductionAmount }}</a-descriptions-item
            >
          </a-descriptions>
          <a-descriptions
            v-if="['1', '2', '4'].includes(type)"
            :layout="
            data.info.applicationScopeStore.type === 1
              ? 'horizontal'
              : 'vertical'
          "
          >
            <a-descriptions-item label="适用门店：">
            <span>
              {{
                data.info.applicationScopeStore.type === 1
                  ? '全部门店可用'
                  : data.info.applicationScopeStore.type === 2
                    ? '指定店铺可用'
                    : '指定店铺不可用'
              }}
            </span>
              <i-table
                v-if="data.info.applicationScopeStore.type !== 1"
                :options="page.options"
                :data="data.info.applicationScopeStore.storeList"
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
                  {{ spaceApplyTypeHash[record.venueType] }}
                  <a-button type="text" @click="onViewStadiumModel(record)"
                  >查看</a-button
                  >
                </template>
                <template #productTypeCell="{ record }">
                  {{ pdtApplyTypeHash[record.productType] }}
                  <a-button type="text" @click="onViewGoodsModel(record)"
                  >查看</a-button
                  >
                </template>
              </i-table>
            </a-descriptions-item>
          </a-descriptions>
          <i-table
            v-if="type === '3'"
            :options="page.options"
            :data="data.info.applicationScopeStore.storeList"
            style="margin-bottom: 20px"
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
              {{ spaceApplyTypeHash[record.venueType] }}
              <a-button type="text" @click="onViewStadiumModel(record)"
              >查看</a-button
              >
            </template>
            <template #productTypeCell="{ record }">
              {{ pdtApplyTypeHash[record.productType] }}
              <a-button type="text" @click="onViewGoodsModel(record)"
              >查看</a-button
              >
            </template>
          </i-table>
          <a-descriptions :column="1">
            <a-descriptions-item label="使用门槛：">
              {{
                data.info.thresholdAmount
                  ? '满' + data.info.thresholdAmount + '元可用'
                  : '无门槛'
              }}
            </a-descriptions-item>
            <a-descriptions-item label="生效日期：">
              {{ handleValidateDate(data.info.effectiveDate) }}
            </a-descriptions-item>
            <a-descriptions-item label="使用说明：">
              {{ data.info.instruction }}
            </a-descriptions-item>
            <a-descriptions-item label="领取人限制：">
              {{ handleConditionShow(data.info.claimRestrictions) }}
            </a-descriptions-item>
            <a-descriptions-item label="每人限领次数：">
              {{ handleEachConditionShow(data.info.claimRestrictions) }}
            </a-descriptions-item>
          </a-descriptions>
          <edit-chosen-item
            v-if="page.showUpdateStadiumModel"
            v-model="page.showUpdateStadiumModel"
            disabled
            title="适用场地"
            :search="page.shopSearch"
            :options="editStadiumOptions"
            :can-use="data.info.applicationScopeStore.type === 3"
            :default-check-status="chooseModelDefaultCheckStatus"
            :api="cbdApiProjectMarketCouponApplicationVenuePageGet"
            @submit="page.showUpdateStadiumModel = false"
          >
          </edit-chosen-item>
          <edit-chosen-item
            v-if="page.showUpdateGoodsModel"
            ref="refGoodsTable"
            v-model="page.showUpdateGoodsModel"
            disabled
            title="适用商品"
            :is-stadium="false"
            :can-use="data.info.applicationScopeStore.type === 3"
            :search="page.shopSearch"
            :options="editGoodsOptions"
            :default-check-status="chooseModelDefaultCheckStatus"
            :api="cbdApiProjectMarketCouponApplicationProductPageGet"
            @submit="page.showUpdateGoodsModel = false"
          >
          </edit-chosen-item>
        </a-tab-pane>
      </a-tabs>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, onMounted, Ref, computed, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  // import PieChart from '@/components/pie-chart/index.vue';
  // import BarChart from '@/components/bar-chart/index.vue';
  import { Modal } from '@arco-design/web-vue';
  import EditChosenItem from '../../member/right/__components__/edit-chosen-item.vue';
  import {
    couponStatusHash,
    spaceApplyTypeHash,
    pdtApplyTypeHash
  } from '@/utils/dic';
  import {
    cbdApiProjectMarketCouponNullifyIdGet,
    cbdApiProjectMarketCouponInfoIdGet,
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonVenueClassifyGet,
    cbdApiProjectProductAttributeClassifyListGet,
    cbdApiProjectProductAttributeBrandListGet,
    cbdApiProjectMarketCouponApplicationVenuePageGet,
    cbdApiProjectMarketCouponApplicationProductPageGet,
    cbdApiProjectMarketCouponPageOperatingInformationGet,
    cbdApiProjectCommonMembersLevelSelectGet,
    cbdApiProjectMarketCouponBasicOperatingInformationIdGet
  } from '@/api';
  import Bus from '@/views/mall/share-data';
  import { formatTime } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useRowspan from '@/hooks/useRowspan';
  import type {
    CbdApiProjectProductAttributeClassifyListGetResponse,
    CbdApiProjectProductAttributeBrandListGetResponse,
    CbdApiProjectCommonMembersLevelSelectGetResponse,
    CbdApiProjectCommonFormatSelectListGetResponse,
    CbdApiProjectCommonVenueClassifyGetResponse,
    CbdApiProjectMarketCouponInfoIdGetResponse
  } from '@/api';

  type GoodsCateItem =
    Required<CbdApiProjectProductAttributeClassifyListGetResponse>[0];
  type BrandListItem =
    Required<CbdApiProjectProductAttributeBrandListGetResponse>[0];
  type MembersLevelItem =
    Required<CbdApiProjectCommonMembersLevelSelectGetResponse>[0];
  type IndustryListItem =
    Required<CbdApiProjectCommonFormatSelectListGetResponse>[0];
  type StadiumDropListItem =
    Required<CbdApiProjectCommonVenueClassifyGetResponse>[0];
  type StoreListItem = Required<
    Required<CbdApiProjectMarketCouponInfoIdGetResponse>['applicationScopeStore']
  >['storeList'][0];
  type ClaimRestrictions =
    Required<CbdApiProjectMarketCouponInfoIdGetResponse>['claimRestrictions'];
  interface PageConfig {
    search: {
      id: string;
    };
    shopSearch: {
      storeId: number | undefined;
      id: string;
    };
    refresh: boolean;
    showUpdateStadiumModel: boolean;
    showUpdateGoodsModel: boolean;
    options: any;
  }

  const [getColSpanData, spanMethod] = useRowspan();
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const goodsCate = ref<Array<GoodsCateItem>>([]);
  const brandList = ref<Array<BrandListItem>>([]);
  const membersLevel = ref<Array<MembersLevelItem>>([]);
  const industryList = ref<Array<IndustryListItem>>([]);
  const stadiumDropList = ref<Array<StadiumDropListItem>>([]);
  const refGoodsTable: Ref = ref(null);
  const data = reactive<any>({
    info: {
      status: '',
      payType: '',
      applicationScopeStore: {
        type: undefined,
        storeList: []
      }
    },
    run: {
      baseInfo: {
        discount: {}
      }
    }
  });
  const page = reactive<PageConfig>({
    search: {
      id: props.id
    },
    shopSearch: {
      storeId: undefined,
      id: ''
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
          prop: 'name'
        },
        {
          label: '经营业态',
          prop: 'scenes'
        },
        {
          label: '所属区域',
          prop: 'area'
        },
        {
          label: '联系人',
          prop: 'contactUser'
        },
        {
          label: '联系电话',
          prop: 'phone'
        },
        {
          label: '适用场地',
          prop: 'venueType'
        },
        {
          label: '适用商品',
          prop: 'productType'
        }
      ]
    }
  });
  const runOptions = computed(() => {
    return {
      tableCard: false,
      menu: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '用户搜索',
          prop: 'searchKey',
          placeholder: '请输入用户编号/昵称/电话搜索',
          search: true,
          hide: true,
          span: 8
        },
        {
          label: '用户编号',
          prop: 'userCode'
        },
        {
          label: '用户昵称',
          prop: 'userNickName'
        },
        {
          label: '会员等级',
          prop: 'levelId',
          search: true,
          hide: true,
          type: 'select',
          dic: membersLevel.value
        },
        {
          label: '会员等级',
          prop: 'memberLevel'
        },
        {
          label: '用户电话',
          prop: 'phone'
        },
        {
          label: '领取时间',
          prop: 'receivingDate'
        },
        {
          label: '使用时间',
          prop: 'usedDate'
        },
        {
          label: '使用源单编号',
          prop: 'orderNo',
          formatter: (e: any) => e.orderNo || '--'
        }
      ]
    };
  });
  const changeTab = async (v: string | number) => {
    if (v === '1' && !data.info.id) {
      getInfoData();
    }
  };

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });

  const editGoodsOptions = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        spanMethod: spanMethod
      },
      columns: [
        {
          label: '商品名称',
          prop: 'key',
          search: true,
          hide: true
        },
        {
          label: '商品名称',
          prop: 'name'
        },
        {
          label: '商品分类',
          prop: 'classifyId',
          search: true,
          hide: true,
          type: 'cascader',
          dic: goodsCate.value,
          props: {
            value: 'id',
            label: 'name'
          },
          options: {
            checkStrictly: true
          }
        },
        {
          label: '商品分类',
          prop: 'classify'
        },
        {
          label: '品牌',
          prop: 'brandId',
          search: true,
          hide: true,
          type: 'select',
          dic: brandList.value,
          props: {
            value: 'id',
            label: 'name'
          }
        },
        {
          label: '品牌',
          prop: 'band'
        },
        {
          label: '单位',
          prop: 'unit'
        },
        {
          label: '规格',
          prop: 'specValueNames'
        },
        {
          label: '门店零售价（¥）',
          prop: 'price'
        },
        {
          label: '库存',
          prop: 'stock'
        }
      ]
    };
  });
  const editStadiumOptions = computed(() => {
    return {
      tableCard: false,
      menu: false,
      columns: [
        {
          label: '场地名称',
          prop: 'nameOrCode',
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
          options: {
            fieldNames: {
              label: 'name',
              value: 'id'
            }
          },
          dic: stadiumDropList.value
        },
        {
          label: '场地分类',
          prop: 'classify'
        },
        {
          label: '场地编码',
          prop: 'code'
        },
        {
          label: '计费类型',
          prop: 'calType'
        },
        {
          label: '价格（¥）',
          prop: 'price'
        }
      ]
    };
  });
  const chooseModelDefaultCheckStatus = ref<number>(0);
  function onViewStadiumModel(record: StoreListItem) {
    page.showUpdateStadiumModel = true;
    chooseModelDefaultCheckStatus.value =
      record.venueType === -1 ? 1 : record.venueType || 0;
    page.shopSearch.storeId = record.id;
    page.shopSearch.id = props.id;
  }
  function onViewGoodsModel(record: StoreListItem) {
    page.showUpdateGoodsModel = true;
    chooseModelDefaultCheckStatus.value =
      record.productType === -1 ? 1 : record.productType || 0;
    page.shopSearch.storeId = record.id;
    page.shopSearch.id = props.id;
  }
  const [getInfoData] = useFuncProxy(async () => {
    data.info = await cbdApiProjectMarketCouponInfoIdGet({
      id: props.id
    });
    if (data.info.applicationScopeStore.type === 3) {
      data.info.applicationScopeStore.storeList.forEach((el: any) => {
        el.productType = el.productType === 1 ? -1 : el.productType;
        el.venueType = el.venueType === 1 ? -1 : el.venueType;
      });
    }
  });
  function handleValidateDate(v: any = {}) {
    let str = '';
    if (v.type === 1) {
      str =
        formatTime(v.fixedStartDate, 'YYYY-MM-DD HH:mm:ss') +
        '至' +
        formatTime(v.fixedEndDate, 'YYYY-MM-DD HH:mm:ss');
    }
    if (v.type === 2) {
      str = `领券后立即生效，有效期${v.expire}天`;
    }
    if (v.type === 3) {
      str = `领券后${v.delay}天生效，有效期${v.expire}天`;
    }
    return str;
  }
  function handleConditionShow(v: ClaimRestrictions = {}) {
    let str = '';
    if (v.recipient && v.recipient.type === 1) {
      str = '不限制';
    } else if (v.recipient && v.recipient.type === 2) {
      membersLevel.value.forEach((el: MembersLevelItem) => {
        (v.recipient?.memberLevelList || []).forEach((a: number) => {
          if (el.value === a) {
            str += el.label + '、';
          }
        });
      });
      str = str.substring(0, str.length - 1);
    }
    return str;
  }
  function handleEachConditionShow(v: ClaimRestrictions = {}) {
    let str = '';
    if (v.perPerson && v.perPerson.type === 1) {
      str = '限领' + v.perPerson.number + '次';
    } else if (v.perPerson && v.perPerson?.type === 2) {
      str = `每人每天限领${v.perPerson?.number}次`;
    }
    return str;
  }
  function onInvalid() {
    Modal.open({
      title: '优惠券作废',
      content: '请确认是否作废当前优惠券？',
      onOk: async () => {
        await cbdApiProjectMarketCouponNullifyIdGet({
          id: props.id
        });
        getInfoData();
        getRunData();
        page.refresh = true;
        emits('refresh');
      }
    });
  }
  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await cbdApiProjectCommonFormatSelectListGet({});
  });
  const [getStadiumDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await cbdApiProjectCommonVenueClassifyGet({});
  });
  const [getGoodsCategory] = useFuncProxy(async () => {
    goodsCate.value = await cbdApiProjectProductAttributeClassifyListGet();
  });
  const [getBrandList] = useFuncProxy(async () => {
    brandList.value = await cbdApiProjectProductAttributeBrandListGet();
  });
  const [getMembersLevel] = useFuncProxy(async () => {
    membersLevel.value = await cbdApiProjectCommonMembersLevelSelectGet({});
  });
  const [getRunData] = useFuncProxy(async () => {
    data.run.baseInfo =
      await cbdApiProjectMarketCouponBasicOperatingInformationIdGet({
        id: props.id
      });
  });
  getGoodsCategory();
  getBrandList();
  getIndustryList();
  getStadiumDropList();
  getMembersLevel();
  onMounted(() => {
    if (props.id) {
      getRunData();
      getInfoData();
    }
    Bus.$on('data', (v: any) => {
      getColSpanData('id', v, 4);
    });
  });
</script>
<style scoped></style>
