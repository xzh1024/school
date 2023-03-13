<template>
  <drawer v-model="visible" :mask-closable="false" title="活动项设置">
    <template #footer>
      <a-button @click="onClose">取消</a-button>
      <a-button type="primary" @click="onSubmit">确认</a-button>
    </template>
    <div v-if="props.category === 'activity'">
      <a-divider orientation="left">热门活动</a-divider>
      <i-form :options="page.formOptions">
        <template #fullForm>
          <i-custom-upload
            v-model="data.full"
            url-key="previewAddress"
            :options="{
              limit: 1,
              listType: 'picture-card',
              accept: 'image/*'
            }"
          />
        </template>
        <template #discountForm>
          <i-custom-upload
            v-model="data.discount"
            url-key="previewAddress"
            :options="{
              limit: 1,
              listType: 'picture-card',
              accept: 'image/*'
            }"
          />
        </template>
        <template #giftForm>
          <i-custom-upload
            v-model="data.gift"
            url-key="previewAddress"
            :options="{
              limit: 1,
              listType: 'picture-card',
              accept: 'image/*'
            }"
          />
        </template>
        <template #deductionForm>
          <i-custom-upload
            v-model="data.deduction"
            url-key="previewAddress"
            :options="{ limit: 1, accept: 'image/*' }"
          />
        </template>
      </i-form>
    </div>

    <div v-else-if="props.category === 'welfare'">
      <a-divider orientation="left">商家福利</a-divider>
      <div class="flex">
        <div class="required">优惠券：</div>
        <a-button type="text" @click="showChooseWelfare = true"
          >选择优惠券</a-button
        >
      </div>
      <i-table
        ref="welfareTable"
        :options="page.welfare.options"
        :data="page.welfare.data"
      >
        <template #couponTemplateTypeCell="{ record }">
          {{ couponTypeHash[record.couponTemplateType] || '--' }}
        </template>
        <template #thresholdAmountCell="{ record }">
          {{ record.thresholdAmount || '无门槛' }}
        </template>
        <template #couponPicCell="{ record }">
          <i-custom-upload
            v-model="record.pic"
            url-key="previewAddress"
            :options="{
              limit: 1,
              accept: 'image/*'
            }"
            @finish="onGetNewFile($event, record)"
          ></i-custom-upload>
        </template>
        <template #positionCell="item">
          <a-button
            v-if="item.rowIndex > 0"
            type="text"
            @click="changeWelfareSort(item.record.id, 1)"
            >上移</a-button
          >
          <a-button
            v-if="item.rowIndex < welfareTable.data.length - 1"
            type="text"
            @click="changeWelfareSort(item.record.id, 2)"
            >下移</a-button
          >
          <a-popconfirm
            content="确认删除吗?"
            @ok="handleDelete(item.record, WELFARE, item.rowIndex)"
          >
            <a-button type="text">删除</a-button>
          </a-popconfirm>
        </template>
      </i-table>
      <choose-item
        v-if="showChooseWelfare"
        v-model="showChooseWelfare"
        :search="page.search"
        title="选择优惠券"
        :options="page.welfareListOptions"
        :type-enum="mallWelfareTypeHash"
        :select-keys="selectWelfareKeys"
        :api="cbdApiProjectCommonCouponSelectPageGet"
        @submit="handleAddWelfare"
      ></choose-item>
    </div>

    <div v-else-if="props.category === 'coupon'">
      <a-divider orientation="left">品类券</a-divider>
      <div class="flex">
        <div class="required">品类券：</div>
        <a-button type="text" @click="onOpenSelectModal">选择品类券</a-button>
      </div>
      <choose-item
        v-model="showChooseCoupon"
        title="选择品类券"
        :options="page.couponListOptions"
        :select-keys="selectCouponKeys"
        :static-data="typeCouponList"
        pic-key="iconAttachment"
        @submit="handleAddCoupon"
      ></choose-item>
      <i-table
        ref="couponTable"
        :options="page.coupon.options"
        :data="page.coupon.data"
      >
        <template #industryIconCell="{ record }">
          <a-image
            :src="record.pic[0] && record.pic[0].previewAddress"
            width="80"
          ></a-image>
        </template>
        <template #operationCell="item">
          <a-button
            v-if="item.rowIndex > 0"
            type="text"
            @click="couponChangeSort(item.record.id, 1)"
            >上移</a-button
          >
          <a-button
            v-if="item.rowIndex < couponTable.data.length - 1"
            type="text"
            @click="couponChangeSort(item.record.id, 2)"
            >下移</a-button
          >
          <a-popconfirm
            content="确认删除吗?"
            @ok="handleDelete(item.record, COUPON, item.rowIndex)"
          >
            <a-button type="text">删除</a-button>
          </a-popconfirm>
        </template>
      </i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, computed, Ref, ref, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import Bus from '../../refresh';
  import { Message } from '@arco-design/web-vue';
  import { couponTypeHash } from '@/utils/dic';

  import {
    cbdApiProjectHotDiscountInfoHotIdGet,
    cbdApiProjectHotBenefitInfoHotIdGet,
    cbdApiProjectHotDiscountEditPost,
    cbdApiProjectHotFormatInfoHotIdGet,
    cbdApiProjectHotBenefitMovePost,
    cbdApiProjectHotBenefitDeleteIdPost,
    cbdApiProjectHotFormatDeleteIdPost,
    cbdApiProjectHotBenefitUpdPicPost,
    cbdApiProjectHotFormatMovePost,
    cbdApiProjectCommonCouponSelectPageGet,
    cbdApiProjectFormatCouponListGet,
    cbdApiProjectHotBenefitAddPost,
    cbdApiProjectHotFormatAddPost
  } from '@/api';
  import type { CbdApiProjectHotBenefitInfoHotIdGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { mallWelfareTypeHash } from '@/utils/dic';

  type WelfareData = CbdApiProjectHotBenefitInfoHotIdGetResponse[0];
  const ACTIVITY = 'activity';
  const WELFARE = 'welfare';
  const COUPON = 'coupon';

  const emits = defineEmits(['update:modelValue', 'edit']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: ''
    },
    hotId: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      default: ''
    }
  });
  const showChooseWelfare: Ref = ref(false);
  const showChooseCoupon: Ref = ref(false);
  const visible: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const selectWelfareKeys = ref<number[]>([]);
  const selectCouponKeys = ref<number[]>([]);
  const typeCouponList = ref<any>([]);
  const couponTable: Ref = ref(null);
  const welfareTable: Ref = ref(null);
  const page = reactive<any>({
    welfareId: '',
    search: {
      projectId: props.projectId
    },
    formOptions: {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '满减券',
          prop: 'full',
          span: 6
        },
        {
          label: '折扣券',
          prop: 'discount',
          span: 6
        },
        {
          label: '礼品券',
          prop: 'gift',
          span: 6
        },
        {
          label: '积分现金券',
          prop: 'deduction',
          span: 6
        }
      ]
    },
    welfare: {
      options: {
        indexTitle: '序号',
        index: true,
        tableCard: false,
        pageShow: false,
        menu: false,
        columns: [
          {
            label: '优惠券名称',
            prop: 'couponTemplateName'
          },
          {
            label: '类型',
            prop: 'couponTemplateType'
          },
          {
            label: '使用门槛',
            prop: 'thresholdAmount'
          },
          {
            label: '剩余库存',
            prop: 'surplusStock'
          },
          {
            label: '操作',
            prop: 'couponPic'
          },
          {
            label: '调整位置',
            prop: 'position'
          }
        ]
      }
    },
    welfareListOptions: {
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectWelfareKeys.value = e;
        }
      },
      columns: [
        {
          label: '优惠券名称',
          prop: 'name',
          search: true
        },
        {
          label: '类型',
          prop: 'type',
          search: true,
          type: 'select',
          dic: [
            {
              label: '满减券',
              value: 1
            },
            {
              label: '折扣券',
              value: 2
            },
            {
              label: '礼品券',
              value: 3
            },
            {
              label: '积分现金券',
              value: 4
            }
          ]
        },
        {
          label: '使用门槛',
          prop: 'threshold'
        },
        {
          label: '剩余库存',
          prop: 'stock'
        }
      ]
    },
    couponListOptions: {
      tableCard: false,
      pageShow: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectCouponKeys.value = e;
        }
      },
      columns: [
        {
          label: '业态名称',
          prop: 'name'
        },
        {
          label: '排序',
          prop: 'sort'
        },
        {
          label: '图标',
          prop: 'pic'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ]
    },
    coupon: {
      options: {
        indexTitle: '序号',
        index: true,
        tableCard: false,
        pageShow: false,
        menu: false,
        // menuOtherOptions: {
        //   rowKey: 'id',
        //   rowSelection: {
        //     type: 'checkbox',
        //     showCheckedAll: true
        //   },
        //   onSelect: (e: number[]) => {
        //     selectKeys.value = e;
        //   }
        // },
        columns: [
          {
            label: '业态名称',
            prop: 'formatName'
          },
          {
            label: '业态图标',
            prop: 'industryIcon'
          },
          {
            label: '备注',
            prop: 'remark'
          },
          {
            label: '调整位置',
            prop: 'operation'
          }
        ]
      }
    }
  });
  const data = reactive<any>({
    full: [],
    discount: [],
    gift: [],
    deduction: []
  });
  async function changeWelfareSort(id: number, direction: number) {
    await cbdApiProjectHotBenefitMovePost({
      id,
      direction
    });
    getData();
  }
  async function couponChangeSort(id: number, direction: number) {
    await cbdApiProjectHotFormatMovePost({
      id,
      direction
    });
    getData();
  }
  async function onSubmit() {
    if (props.category === ACTIVITY) {
      await cbdApiProjectHotDiscountEditPost({
        id: Number(page.welfareId),
        fullPic: [
          (data.full[0] && data.full[0].id) ||
            (data.full[0] && data.full[0].key)
        ].filter((a: string) => a),
        discountPic: [
          (data.discount[0] && data.discount[0].id) ||
            (data.discount[0] && data.discount[0].key)
        ].filter((a: string) => a),
        giftPic: [
          (data.gift[0] && data.gift[0].id) ||
            (data.gift[0] && data.gift[0].key)
        ].filter((a: string) => a),
        cashPic: [
          (data.deduction[0] && data.deduction[0].id) ||
            (data.deduction[0] && data.deduction[0].key)
        ].filter((a: string) => a)
      });
    } else if (props.category === WELFARE) {
      const res = page.welfare.data.find(
        (el: WelfareData) => !(el.pic && el.pic.length)
      );
      if (res) {
        Message.error('请上传优惠券图片');
        throw new Error('优惠券图片必传');
      }
    }

    Bus.$emit('refresh', props.hotId);
    visible.value = false;
  }
  function onClose() {
    // if (props.category === WELFARE) {
    //   const res = page.welfare.data.find(
    //     (el: WelfareData) => !(el.pic && el.pic.length)
    //   );
    //   if (res) {
    //     Message.error('请上传优惠券图片');
    //     throw new Error('优惠券图片必传');
    //   }
    // }
    visible.value = false;
  }
  async function onOpenSelectModal() {
    typeCouponList.value = await cbdApiProjectFormatCouponListGet();
    showChooseCoupon.value = true;
  }
  async function handleAddWelfare() {
    if (selectWelfareKeys.value.length >= 2) {
      await cbdApiProjectHotBenefitAddPost({
        hotId: Number(props.hotId),
        couponIdList: selectWelfareKeys.value
      });
      showChooseWelfare.value = false;
      selectWelfareKeys.value = [];
      getData();
    } else {
      Message.error('至少选择两张优惠券');
    }
  }
  async function handleAddCoupon() {
    await cbdApiProjectHotFormatAddPost({
      hotId: Number(props.hotId),
      formatIdList: selectCouponKeys.value
    });
    showChooseCoupon.value = false;
    selectCouponKeys.value = [];
    getData();
  }
  async function handleDelete(v: any, source: string, idx: number) {
    if (source === WELFARE) {
      await cbdApiProjectHotBenefitDeleteIdPost({
        id: v.id
      });
      selectWelfareKeys.value.splice(idx, 1);
    } else if (source === COUPON) {
      await cbdApiProjectHotFormatDeleteIdPost({
        id: v.id
      });
      selectCouponKeys.value.splice(idx, 1);
    }
    Message.success('操作成功');
    Bus.$emit('refresh', props.hotId);
    getData();
  }
  const [getData] = useFuncProxy(async () => {
    if (props.category === ACTIVITY) {
      const res = await cbdApiProjectHotDiscountInfoHotIdGet({
        hotId: props.hotId
      });
      page.welfareId = res.id;
      data.full = res.fullPic;
      data.discount = res.discountPic;
      data.gift = res.giftPic;
      data.deduction = res.cashPic;
    } else if (props.category === WELFARE) {
      selectWelfareKeys.value = [];
      page.welfare.data = await cbdApiProjectHotBenefitInfoHotIdGet({
        hotId: props.hotId
      });
      page.welfare.data.forEach((el: WelfareData) => {
        selectWelfareKeys.value.push(Number(el.couponTemplateId));
      });
    } else if (props.category === COUPON) {
      selectCouponKeys.value = [];
      page.coupon.data = await cbdApiProjectHotFormatInfoHotIdGet({
        hotId: props.hotId
      });
      page.coupon.data.forEach((el: any) => {
        selectCouponKeys.value.push(el.formatId);
      });
    }
  });
  async function onGetNewFile(e: any, data: any) {
    if (!e.length || e[0].key) {
      await cbdApiProjectHotBenefitUpdPicPost({
        id: data.id,
        pic: [e.length ? e[0].key : '']
      });
      Bus.$emit('refresh', props.hotId);
    }
  }
  onMounted(() => {
    if (props.hotId && props.category) {
      page.search.hotId = props.hotId;
      getData();
    }
  });
</script>
<style lang="less" scoped>
  .required {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    color: #666;
    font-weight: bold;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      color: red;
      transform: translateY(-50%);
      content: '*';
    }
  }
</style>
