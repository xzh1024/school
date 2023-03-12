<template>
  <drawer v-model="visible" title="新建优惠券">
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" @click="onSubmit">保存</a-button>
    </template>
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-form
        ref="couponForm"
        :form="form"
        :model="form"
        :rules="page.rules"
        layout="vertical"
      >
        <a-row>
          <a-col :span="10">
            <a-form-item field="name" :label="nameStrObj[type] + '：'">
              <a-input
                v-model="form.name"
                maxlength="50"
                :placeholder="'请输入' + nameStrObj[type]"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="2">
            <a-form-item field="stock" label="发放数量（张）：">
              <a-input
                v-model="form.stock"
                placeholder="请输入发放数量"
                max-length="10"
                @input="form.stock = form.stock.replace(/[^\d]/g, '')"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="type === '1'">
          <a-col :span="10">
            <a-form-item field="fullReducedAmount" label="满减券金额（¥）：">
              <a-input
                v-model="form.fullReducedAmount"
                max-length="18"
                @input="
                form.fullReducedAmount = form.fullReducedAmount.replace(
                  /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                  '$1'
                )
              "
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item v-if="type === '2'" field="discount" label="折扣券折扣：">
          <a-row>
            <a-col :span="10">
              <a-input
                v-model="form.discount"
                placeholder="请输入折扣"
                max-length="3"
                @input="form.discount = form.discount.replace(/[^\d.]/, '')"
              >
                <template #append>折</template>
              </a-input>
            </a-col>
            <a-col :span="4" :offset="1">
              <a-checkbox v-model="form.useDiscountMax">最多优惠</a-checkbox>
            </a-col>
            <a-col :span="8" :offset="1">
              <a-input
                v-model="form.maximumDiscount"
                :disabled="!form.useDiscountMax"
                max-length="18"
                @input="
                form.maximumDiscount = form.maximumDiscount.replace(
                  /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                  '$1'
                )
              "
              >
                <template #append>元</template>
              </a-input>
            </a-col>
          </a-row>
        </a-form-item>
        <a-row v-if="type === '4'">
          <a-col :span="10">
            <a-form-item field="integral" label="积分现金券购买积分：">
              <a-input
                v-model="form.integral"
                max-length="10"
                placeholder="请输入积分现金券购买积分"
                @input="
                form.integral = form.integral.replace(/^\D*(\d+).*$/g, '$1')
              "
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="10" :offset="2">
            <a-form-item
              field="deductionAmount"
              label="积分现金券抵扣金额（¥）："
            >
              <a-input
                v-model="form.deductionAmount"
                max-length="18"
                placeholder="请输入积分现金券抵扣金额"
                @input="
                form.deductionAmount = form.deductionAmount.replace(
                  /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                  '$1'
                )
              "
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item
          v-if="['1', '2', '4'].includes(type)"
          field="hasStore"
          label="适用店铺："
        >
          <a-radio-group
            v-if="type !== GIFT_COUPON_TYPE"
            v-model="form.applicationScopeStore.type"
            style="width: 150px"
            direction="vertical"
            @change="onChangeApplyType"
          >
            <a-radio :value="1">全部店铺可用</a-radio>
            <a-radio :value="2">指定店铺可用</a-radio>
            <a-radio :value="3">指定店铺不可用</a-radio>
          </a-radio-group>
        </a-form-item>
        <i-table
          v-if="
          type === GIFT_COUPON_TYPE ||
          [2, 3].includes(form.applicationScopeStore.type)
        "
          :options="page.options"
          :data="selectShopsList"
        >
          <template #header>
            <a-button type="text" @click="page.showChooseShop = true"
            >选择店铺</a-button
            >
          </template>
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
          <template #spaceApplyTypeCell="{ record }">
            {{ spaceApplyTypeHash[record.spaceApplyType] }}
            <a-button type="text" @click="onUpdateStadiumModel(record)"
            >修改</a-button
            >
          </template>
          <template #pdtApplyTypeCell="{ record }">
            {{ pdtApplyTypeHash[record.pdtApplyType] }}
            <a-button type="text" @click="onUpdateGoodsModel(record)"
            >修改</a-button
            >
          </template>
        </i-table>
        <a-form-item
          field="hasThresholdAmount"
          label="使用门槛："
          style="width: 100%; margin-top: 25px"
        >
          <a-radio-group v-model="form.hasThresholdAmount" direction="vertical">
            <a-radio :value="1">无门槛</a-radio>
            <a-row
              style="
              display: flex;
              align-items: center;
              width: 600px;
              margin: 10px 0;
            "
            >
              <a-col :span="4">
                <a-radio :value="2"> 订单满</a-radio>
              </a-col>
              <a-col :span="6">
                <a-input
                  v-model="form.thresholdAmount"
                  :disabled="form.hasThresholdAmount !== 2"
                  max-length="18"
                  @input="
                  form.thresholdAmount = form.thresholdAmount.replace(
                    /^\D*(\d*(?:\.\d{0,2})?).*$/g,
                    '$1'
                  )
                "
                /></a-col>
              <a-col :span="8" :offset="1">元可用</a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="hasEffectiveDate" label="生效日期：">
          <a-radio-group
            v-model="form.effectiveDate.type"
            direction="vertical"
            @change="form.hasEffectiveDate = form.effectiveDate.type"
          >
            <a-row flex style="align-items: center; width: 600px; margin: 10px 0">
              <a-col :span="2">
                <a-radio :value="1"></a-radio>
              </a-col>
              <a-col :span="8">
                <a-range-picker
                  :disabled="form.effectiveDate.type !== 1"
                  style="width: 350px"
                  @change="onDateChange"
                />
              </a-col>
            </a-row>
            <a-row flex style="align-items: center; width: 600px; margin: 20px 0">
              <a-col :span="10">
                <a-radio :value="2"> 领券后立即生效，有效期</a-radio>
              </a-col>
              <a-col :span="4">
                <a-input
                  v-model="form.temp.value2expire"
                  :disabled="form.effectiveDate.type !== 2"
                  max-length="5"
                  @input="
                  form.temp.value2expire = form.temp.value2expire.replace(
                    /[^\d]/g,
                    ''
                  )
                "
                /></a-col>
              <a-col :span="2" :offset="1">天</a-col>
            </a-row>
            <a-row flex style="align-items: center; width: 600px; margin: 10px 0">
              <a-col :span="4">
                <a-radio :value="3"> 领券</a-radio>
              </a-col>
              <a-col :span="4">
                <a-input
                  v-model="form.effectiveDate.delay"
                  :disabled="form.effectiveDate.type !== 3"
                  max-length="5"
                  @input="
                  form.effectiveDate.delay = form.effectiveDate.delay.replace(
                    /[^\d]/g,
                    ''
                  )
                "
                /></a-col>
              <a-col :span="6" :offset="1">天后生效，有效期</a-col>
              <a-col :span="4">
                <a-input
                  v-model="form.temp.value3expire"
                  :disabled="form.effectiveDate.type !== 3"
                  max-length="5"
                  @input="
                  form.temp.value3expire = form.temp.value3expire.replace(
                    /[^\d]/g,
                    ''
                  )
                "
                /></a-col>
              <a-col :span="2" :offset="1">天</a-col>
            </a-row>
            <div class="tip"
            >若设置固定用券时间，编辑保存后对已领取及后续领取的券均生效。若设置动态
              用券时间，编辑保存后仅对后续领取的券生效</div
            >
          </a-radio-group>
        </a-form-item>
        <a-form-item field="instruction" label="使用说明：">
          <a-input
            v-model="form.instruction"
            placeholder="请输入使用说明"
          ></a-input>
        </a-form-item>
        <a-divider orientation="left">发放和领取规则</a-divider>
        <a-form-item field="userLimit" label="领取人限制：">
          <a-radio-group
            v-model="form.claimRestrictions.recipient.type"
            style="width: 100%"
            direction="vertical"
            @change="form.userLimit = form.claimRestrictions.recipient.type"
          >
            <a-radio :value="1" style="width: 180px"
            >不限制，所有人可参与</a-radio
            >
            <a-row style="width: 100%; margin: 15px 0">
              <a-col :span="8">
                <a-radio :value="2"> 指定会员等级可参与</a-radio>
              </a-col>
              <a-col :span="8">
                <a-select
                  :disabled="form.claimRestrictions.recipient.type !== 2"
                  multiple
                  placeholder="选择会员等级"
                  @change="onSelectMemberLevel($event)"
                >
                  <a-option
                    v-for="item in memberLevelList"
                    :key="item.value"
                    :value="item.value"
                  >{{ item.label }}</a-option
                  >
                </a-select>
              </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="everyUserLimit" label="每人限领次数：">
          <a-radio-group
            v-model="form.claimRestrictions.perPerson.type"
            style="width: 100%"
            direction="vertical"
            @change="form.everyUserLimit = form.claimRestrictions.perPerson.type"
          >
            <a-row flex style="align-items: center; margin-bottom: 20px">
              <a-col :span="6">
                <a-radio :value="1"> 限领</a-radio>
              </a-col>
              <a-col :span="4">
                <a-input
                  v-model="form.temp.totalLimit"
                  :disabled="form.claimRestrictions.perPerson.type !== 1"
                  max-length="3"
                  @input="
                  form.temp.totalLimit = form.temp.totalLimit.replace(
                    /[^\d]/g,
                    ''
                  )
                "
                ></a-input>
              </a-col>
              <a-col :span="2" :offset="1">次 </a-col>
            </a-row>
            <a-row flex style="align-items: center">
              <a-col :span="6">
                <a-radio :value="2"> 每人每天限领</a-radio>
              </a-col>
              <a-col :span="4">
                <a-input
                  v-model="form.temp.dailyLimit"
                  :disabled="form.claimRestrictions.perPerson.type !== 2"
                  max-length="3"
                  @input="
                  form.temp.dailyLimit = form.temp.dailyLimit.replace(
                    /[^\d]/g,
                    ''
                  )
                "
                ></a-input>
              </a-col>
              <a-col :span="2" :offset="1">次 </a-col>
            </a-row>
          </a-radio-group>
        </a-form-item>
      </a-form>
      <choose-item
        v-model="page.showChooseShop"
        v-model:select-keys="selectShopsKeys"
        :search="page.search"
        title="选择店铺"
        :options="chooseShopOptions"
        :api="cbdApiProjectCommonStoreSelectPageGet"
        @reset="page.search = { type: 1 }"
        @submit="handleSelectShop"
      />
      <edit-chosen-item
        v-if="page.showUpdateStadiumModel"
        v-model="page.showUpdateStadiumModel"
        v-model:select-keys="editStadiumKeys"
        v-model:default-check-status="chooseModelDefaultCheckStatus"
        :can-use="form.applicationScopeStore.type === 3"
        title="适用场地"
        :search="page.shopSearch"
        :options="editStadiumOptions"
        :api="cbdApiProjectCommonSpaceSelectPageGet"
        @submit="handleUpdateShopStadium"
      >
      </edit-chosen-item>
      <edit-chosen-item
        v-if="page.showUpdateGoodsModel"
        ref="refGoodsTable"
        v-model:select-keys="editGoodsKeys"
        v-model:default-check-status="chooseModelDefaultCheckStatus"
        v-model="page.showUpdateGoodsModel"
        title="适用商品"
        :is-stadium="false"
        :can-use="form.applicationScopeStore.type === 3"
        :search="page.shopSearch"
        :options="editGoodsOptions"
        :api="cbdApiProjectCommonProductSelectPageGet"
        @submit="handleUpdateShopGoods"
      >
      </edit-chosen-item>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, Ref, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ChooseItem from '@/components/choose-item/index.vue';
  import EditChosenItem from '@/views/mall/member/right/__components__/edit-chosen-item.vue';
  import {
    cbdApiProjectCommonFormatSelectListGet,
    cbdApiProjectCommonMembersLevelSelectGet,
    cbdApiProjectCommonSpaceSelectPageGet,
    cbdApiProjectCommonProductSelectPageGet,
    cbdApiProjectCommonStoreSelectPageGet,
    cbdApiProjectProductAttributeClassifyListGet,
    cbdApiProjectProductAttributeBrandListGet,
    cbdApiProjectMarketCouponAddPost,
    cbdApiProjectCommonVenueClassifyGet
  } from '@/api';
  import { spaceApplyTypeHash, pdtApplyTypeHash } from '@/utils/dic';
  import addressOptions from '@/utils/area.json';
  import useRowspan from '@/hooks/useRowspan';
  import Bus from '@/views/mall/share-data';
  import { Message } from '@arco-design/web-vue';
  import type {
    BrandListItem,
    GoodsClassifyItem,
    IndustryItem,
    StadiumTypeItem
  } from '@/utils/dic';
  import type {
    CbdApiProjectCommonStoreSelectPageGetResponse,
    CbdApiProjectCommonProductSelectPageGetResponse
  } from '@/api';
  type ShopItemData =
    Required<CbdApiProjectCommonStoreSelectPageGetResponse>['rows'][0];
  type ShopGoodsData =
    Required<CbdApiProjectCommonProductSelectPageGetResponse>['rows'][0];

  const [getColSpanData, spanMethod] = useRowspan();
  const GIFT_COUPON_TYPE = '3';
  const couponForm: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const nameStrObj: { [key: string]: string } = {
    '1': '满减券名称',
    '2': '折扣券名称',
    '3': '礼品券名称',
    '4': '积分现金券名称'
  };
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const chooseModelDefaultCheckStatus = ref<number>(0);

  const goodsCate = ref<Array<GoodsClassifyItem>>([]);
  const brandList = ref<Array<BrandListItem>>([]);
  const industryList = ref<Array<IndustryItem>>([]);
  const editGoodsKeys = ref<number[]>([]);
  const selectShopsKeys = ref<number[]>([]);
  const editStadiumKeys = ref<number[]>([]);
  const selectShopsList = ref<Array<ShopItemData>>([]);
  const stadiumDropList = ref<Array<StadiumTypeItem>>([]);
  const form: Ref = ref({
    useDiscountMax: false,
    applicationScopeStore: {
      type: ''
    },
    hasEffectiveDate: '',
    effectiveDate: {
      fixedStartDate: '',
      fixedEndDate: '',
      delay: ''
    },
    claimRestrictions: {
      recipient: {},
      perPerson: {}
    },
    // 提交时特殊处理这几个值
    temp: {
      dailyLimit: '',
      totalLimit: '',
      value2expire: '',
      value3expire: ''
    },
    hasThresholdAmount: ''
  });

  const editGoodsOptions = computed(() => {
    return {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        'span-all': true,
        'rowKey': 'id',
        'rowSelection': {
          type: 'checkbox',
          showCheckedAll: true
        },
        'onSelect': (e: number[]) => {
          editGoodsKeys.value = e;
        },
        'spanMethod': spanMethod
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
          prop: 'productName'
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
          prop: 'classifyName'
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
          prop: 'brandName'
        },
        {
          label: '单位',
          prop: 'unitName'
        },
        {
          label: '规格',
          prop: 'specValueNames'
        },
        {
          label: '门店零售价（¥）',
          prop: 'salePrice'
        },
        {
          label: '库存',
          prop: 'availableNum'
        }
      ]
    };
  });
  const editStadiumOptions = computed(() => {
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
  const page = reactive<any>({
    showChooseShop: false,
    showUpdateGoodsModel: false,
    showUpdateStadiumModel: false,
    canUseStoreList: [], // 用来缓存选择的数据
    canNotUseStoreList: [], // 用来缓存选择的数据
    search: { type: 1 },
    shopSearch: {
      type: 2
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
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '所属区域',
          prop: 'area'
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
          prop: 'spaceApplyType'
        },
        {
          label: '适用商品',
          prop: 'pdtApplyType'
        }
      ]
    },
    rules: {
      name: [{ required: true, message: '请输入优惠券名称' }],
      stock: [{ required: true, message: '请输入发放数量' }],
      fullReducedAmount: [{ required: true, message: '请输入满减金额' }],
      discount: [
        {
          required: true,
          message: '折扣输入不正确',
          match: /(^0\.[1-9]$)|(^[1-9]\.[0-9]$)|(^[1-9]$)/
        }
      ],
      maximumDiscount: [{ required: true, message: '请输入最多优惠额度' }],
      integral: [{ required: true, message: '请输入积分现金券购买积分' }],
      deductionAmount: [
        { required: true, message: '请输入积分现金券抵扣金额' }
      ],
      hasStore: [{ required: true, message: '请指定适用店铺' }],
      hasThresholdAmount: [{ required: true, message: '请指定使用门槛' }],
      hasEffectiveDate: [{ required: true, message: '请指定生效日期' }],
      instruction: [{ required: true, message: '请输入使用说明' }],
      userLimit: [{ required: true, message: '请指定限领次数' }],
      everyUserLimit: [{ required: true, message: '请指定每人限领次数' }]
    }
  });
  const chooseShopOptions = computed(() => {
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
          prop: 'storeName'
        },
        {
          label: '经营业态',
          prop: 'manageName'
        },
        {
          label: '经营业态',
          prop: 'sceneId',
          search: true,
          hide: true,
          type: 'cascader',
          options: {
            'check-strictly': true,
            'fieldNames': {
              value: 'id',
              label: 'formatData'
            }
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
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        }
      ]
    };
  });
  async function onSubmit() {
    const res = await couponForm.value.validate();
    if (!res) {
      // 礼品券 设计不存在店铺全可用,制定可用,指定不可用的选择默认:指定店铺可用 type默认为 2
      if (props.type === GIFT_COUPON_TYPE) {
        form.value.applicationScopeStore.type = '2';
      }
      // 处理使用期限
      form.value.effectiveDate.expire =
        form.value.effectiveDate.type === 2
          ? form.value.temp.value2expire
          : form.value.temp.value3expire;
      // 处理领取限制数据
      form.value.claimRestrictions.perPerson.number =
        form.value.claimRestrictions.perPerson.type === 1
          ? form.value.temp.totalLimit
          : form.value.temp.dailyLimit;
      form.value.applicationScopeStore.storeList = [];
      selectShopsList.value.forEach((el: any) => {
        el['applicationVenue'] = {
          type: el.spaceApplyType === -1 ? 1 : el.spaceApplyType,
          ids: el.spaceIds
        };
        el['applicationProduct'] = {
          type: el.pdtApplyType === -1 ? 1 : el.pdtApplyType,
          ids: el.productId
        };
        form.value.applicationScopeStore.storeList.push({
          id: el.id,
          applicationVenue: el.applicationVenue,
          applicationProduct: el.applicationProduct
        });
      });
      if (form.value.hasThresholdAmount === 2 && !form.value.thresholdAmount) {
        Message.error('请输入使用门槛');
        throw new Error('请输入使用门槛');
      }
      if (
        form.value.effectiveDate.type === 1 &&
        !form.value.effectiveDate.fixedStartDate
      ) {
        Message.error('请选择时间');
        throw new Error('请选择时间');
      }
      if (
        form.value.effectiveDate.type === 2 &&
        !form.value.temp.value2expire
      ) {
        Message.error('请输入有效期');
        throw new Error('请输入有效期');
      }
      if (
        form.value.effectiveDate.type === 3 &&
        (!form.value.temp.value3expire || !form.value.effectiveDate.delay)
      ) {
        Message.error('生效日期有误');
        throw new Error('生效日期有误');
      }
      if (
        form.value.claimRestrictions.recipient.type === 2 &&
        !form.value.claimRestrictions.recipient.memberLevelList?.length
      ) {
        Message.error('请指定会员等级');
        throw new Error('未指定会员等级');
      }
      if (
        form.value.claimRestrictions.perPerson.type === 1 &&
        !form.value.temp.totalLimit
      ) {
        Message.error('请指定每人限领次数');
        throw new Error('请指定每人限领次数');
      }
      if (
        form.value.claimRestrictions.perPerson.type === 2 &&
        !form.value.temp.dailyLimit
      ) {
        Message.error('请指定每人每天限领次数');
        throw new Error('请指定每人每天限领次数');
      }
      await cbdApiProjectMarketCouponAddPost({
        ...form.value,
        type: props.type
      });
      emits('refresh');
      visible.value = false;
    }
  }
  function onChangeApplyType(v: string | number | boolean) {
    form.value.hasStore = v; // 表单校验
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
      form.value.rightsStoreList = page.canUseStoreList || [];
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
      form.value.rightsStoreList = page.canNotUseStoreList || [];
      selectShopsKeys.value = page.canNotUseStoreList.map((el: any) => el.id);
    }
  }
  function onDateChange(v: any = []) {
    form.value.effectiveDate.fixedStartDate = v[0];
    form.value.effectiveDate.fixedEndDate = v[1];
  }
  function onUpdateGoodsModel(record: any) {
    console.log(record);
    chooseModelDefaultCheckStatus.value =
      record.pdtApplyType === -1 ? 1 : record.pdtApplyType;
    page.showUpdateGoodsModel = true;
    page.shopSearch.storeId = record.id;
    // 编辑店铺商品勾选回显
    editGoodsKeys.value = record.productId || [];
  }
  function onUpdateStadiumModel(record: any) {
    console.log(record);
    chooseModelDefaultCheckStatus.value =
      record.spaceApplyType === -1 ? 1 : record.spaceApplyType;
    page.showUpdateStadiumModel = true;
    page.shopSearch.storeId = record.id;
    // 编辑店铺场馆勾选回显
    editStadiumKeys.value = record.spaceIds || [];
  }
  function onSelectMemberLevel(
    e:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) {
    form.value.claimRestrictions.recipient.memberLevelList = e;
  }
  function handleSelectShop(v: { data: Array<ShopItemData> }) {
    // 对旧数据根据 selectShopsKeys过滤,排除掉本次取消勾选的数据
    selectShopsList.value = selectShopsList.value.filter((el: ShopItemData) =>
      selectShopsKeys.value.includes(el.id)
    );
    // 找出本次选择前已选择的店铺
    const alreadyHasKeysList: number[] = [];
    selectShopsList.value.forEach((el: ShopItemData) => {
      alreadyHasKeysList.push(el.id);
    });
    // 得到本次选择的店铺
    const list = (v.data || []).filter(
      (el: ShopItemData) =>
        selectShopsKeys.value.includes(el.id) &&
        !alreadyHasKeysList.includes(el.id)
    );
    // 对新选择的数据进行处理
    list.forEach((el: Record<string, any>) => {
      // 指定店铺可用 列表中显示全部可用
      if (form.value.applicationScopeStore.type === 2) {
        el.spaceApplyType = 1;
        el.pdtApplyType = 1;
        // 指定店铺不可用 列表中显示全部不可用
      } else if (form.value.applicationScopeStore.type === 3) {
        el.spaceApplyType = -1;
        el.pdtApplyType = -1;
      }
      if (props.type === GIFT_COUPON_TYPE) {
        el.spaceApplyType = 1;
        el.pdtApplyType = 1;
      }
    });
    // 将新选择的和前面已选择好的拼接 ===> 不能直接覆盖,否则前面编辑的会被覆盖
    selectShopsList.value = selectShopsList.value.concat(list);
    // 同步更新form中的数据
    form.value.rightsStoreList = selectShopsList.value || [];
    page.showChooseShop = false;
  }
  function handleUpdateShopStadium(v: any) {
    selectShopsList.value.forEach((el: any) => {
      if (el.id === page.shopSearch.storeId) {
        el.spaceApplyType = v.type;
        el.spaceIds = editStadiumKeys.value;
      }
    });
    form.value.rightsStoreList = selectShopsList.value;
    // 清空选中状态,防止下次进入时依旧选中上次的数据
    editStadiumKeys.value = [];
    page.showUpdateStadiumModel = false;
  }
  function handleUpdateShopGoods(v: {
    type: number;
    data: Array<ShopGoodsData>;
  }) {
    selectShopsList.value.forEach((el: any) => {
      if (el.id === page.shopSearch.storeId) {
        el.pdtApplyType = v.type;
        el.productId = editGoodsKeys.value;
      }
    });
    form.value.rightsStoreList = selectShopsList.value;
    // 清空选中状态,防止下次进入时依旧选中上次的数据
    editGoodsKeys.value = [];
    page.showUpdateGoodsModel = false;
  }
  const memberLevelList: Ref = ref([]);
  const [getMembersData] = useFuncProxy(async () => {
    memberLevelList.value = await cbdApiProjectCommonMembersLevelSelectGet({});
  });
  const [getIndustryList] = useFuncProxy(async () => {
    industryList.value = await cbdApiProjectCommonFormatSelectListGet({});
  });
  const [getGoodsCategory] = useFuncProxy(async () => {
    goodsCate.value = await cbdApiProjectProductAttributeClassifyListGet();
  });
  const [getBrandList] = useFuncProxy(async () => {
    brandList.value = await cbdApiProjectProductAttributeBrandListGet();
  });
  const [getStadiumDropList] = useFuncProxy(async () => {
    stadiumDropList.value = await cbdApiProjectCommonVenueClassifyGet({});
  });
  onMounted(() => {
    getMembersData();
    getIndustryList();
    getGoodsCategory();
    getBrandList();
    getStadiumDropList();
    Bus.$on('data', (v) => {
      getColSpanData('id', v, 5);
    });
  });
</script>
<style scoped lang="less">
  .tip {
    margin-bottom: 20px;
    color: #999;
  }
</style>
