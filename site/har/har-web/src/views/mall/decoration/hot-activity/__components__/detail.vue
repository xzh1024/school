<template>
  <drawer v-model="visible" title="活动项查看">
    <template #footer>
      <a-button v-permission="['hot:edit']" type="primary" @click="showEdit"
        >编辑</a-button
      >
    </template>
    <div class="white-detail-box">
      <a-descriptions
        v-if="props.category === ACTIVITY"
        layout="vertical"
        :column="4"
      >
        <a-descriptions-item label="满减券">
          <a-image
            width="150"
            :src="
            page.activity.fullPic[0] && page.activity.fullPic[0].previewAddress
          "
          ></a-image>
        </a-descriptions-item>
        <a-descriptions-item label="折扣券">
          <a-image
            width="150"
            :src="
            page.activity.discountPic[0] &&
            page.activity.discountPic[0].previewAddress
          "
          ></a-image>
        </a-descriptions-item>
        <a-descriptions-item label="礼品券">
          <a-image
            width="150"
            :src="
            page.activity.giftPic[0] && page.activity.giftPic[0].previewAddress
          "
          ></a-image>
        </a-descriptions-item>
        <a-descriptions-item label="积分现金券">
          <a-image
            width="150"
            :src="
            page.activity.cashPic[0] && page.activity.cashPic[0].previewAddress
          "
          ></a-image>
        </a-descriptions-item>
      </a-descriptions>
      <i-table
        v-else-if="props.category === WELFARE"
        v-model="page.search"
        :options="page.welfare.options"
        :data="page.welfare.data"
      >
        <template #couponPicCell="{ record }">
          <a-image
            width="70"
            :src="record.pic[0] && record.pic[0].previewAddress"
          ></a-image>
        </template>
        <template #couponTemplateTypeCell="{ record }">
          {{ couponTypeHash[record.couponTemplateType] || '--' }}
        </template>
        <template #thresholdAmountCell="{ record }">
          {{ record.thresholdAmount || '无门槛' }}
        </template>
      </i-table>
      <i-table
        v-else-if="props.category === COUPON"
        v-model="page.search"
        :options="page.coupon.options"
        :data="page.coupon.data"
      >
        <template #industryIconCell="{ record }">
          <a-image
            width="70"
            :src="record.pic[0] && record.pic[0].previewAddress"
          ></a-image>
        </template>
      </i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { couponTypeHash } from '@/utils/dic';
  import {
    cbdApiProjectHotDiscountInfoHotIdGet,
    cbdApiProjectHotBenefitInfoHotIdGet,
    cbdApiProjectHotFormatInfoHotIdGet
  } from '@/api';
  // import type { CbdApiProjectHotDiscountInfoHotIdGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import Bus from '../../refresh';
  interface PageConfig {
    search: {
      hotId: string;
    };
    activity: any;
    welfare: any;
    coupon: any;
  }

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
    }
  });
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<PageConfig>({
    search: {
      hotId: ''
    },
    activity: {
      hotId: 0,
      id: 0,
      fullPic: [],
      discountPic: [],
      giftPic: [],
      cashPic: []
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
            label: '图片',
            prop: 'couponPic'
          }
        ]
      },
      data: []
    },
    coupon: {
      options: {
        indexTitle: '序号',
        index: true,
        tableCard: false,
        pageShow: false,
        menu: false,
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
          }
        ]
      }
    }
  });
  const showEdit = () => {
    emits('edit');
  };
  const [getData] = useFuncProxy(async () => {
    if (props.category === ACTIVITY) {
      page.activity = await cbdApiProjectHotDiscountInfoHotIdGet({
        hotId: props.hotId
      });
    } else if (props.category === WELFARE) {
      page.welfare.data = await cbdApiProjectHotBenefitInfoHotIdGet({
        hotId: props.hotId
      });
    } else if (props.category === COUPON) {
      page.coupon.data = await cbdApiProjectHotFormatInfoHotIdGet({
        hotId: props.hotId
      });
    }
  });
  onMounted(() => {
    if (props.hotId && props.category) {
      page.search.hotId = props.hotId;
      getData();
    }
    Bus.$on('refresh', (id) => {
      if (props.hotId === id) {
        getData();
      }
    });
  });
</script>
