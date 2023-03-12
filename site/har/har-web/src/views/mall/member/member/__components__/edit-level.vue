<template>
  <drawer
    v-model="visible"
    :title="id ? '编辑会员等级' : '新增会员等级'"
    :options="{
      okLoading: isLoading
    }"
    @cancel="onCancel"
    @before-ok="onBeforeOk"
  >
    <div class="white-detail-box">
      <a-divider orientation="left">基本信息</a-divider>
      <a-descriptions>
        <a-descriptions-item label="会员等级">{{
            form.defaultName
          }}</a-descriptions-item>
      </a-descriptions>
      <a-form ref="refForm" :model="form" :rules="page.rules" layout="vertical">
        <a-form-item field="name" label="等级名称" style="width: 300px">
          <a-input
            v-model="form.name"
            :maxlength="20"
            placeholder="如：普通会员"
          ></a-input>
        </a-form-item>
        <a-form-item field="levelBean" label="获取条件">
          <a-row style="width: 300px; overflow: visible">
            <a-col :span="6">等级豆</a-col>
            <a-col :span="18">
              <a-input
                v-model="form.levelBean"
                :disabled="level === 0 || form.levelBean === 0"
                :maxlength="10"
                placeholder="请输入该等级对应等级豆数量"
                @input="form.levelBean = form.levelBean.replace(/\D/g, '')"
                @blur="onBeanBlur"
              ></a-input>
              <p class="tip"
              >修改等级对应等级豆数量后，部分客户会因为等级豆无法达到当前数量而发生等级变化</p
              >
            </a-col>
          </a-row>
        </a-form-item>
        <a-divider orientation="left">会员权益</a-divider>
        <a-row>
          <a-col :span="4" style="padding-top: 5px"
          ><a-checkbox v-model="form.discount">消费折扣</a-checkbox></a-col
          >
          <a-col :span="5">
            <a-input
              v-model="form.discountValue"
              :disabled="!form.discount"
              max-length="3"
              @blur="onDiscountBlur"
            >
              <template #append>折</template>
            </a-input>
          </a-col>
        </a-row>
        <a-row style="margin: 15px 0">
          <a-col :span="4" style="padding-top: 5px"
          ><a-checkbox v-model="form.rate"> 积分回馈率</a-checkbox></a-col
          >
          <a-col :span="5">
            <a-input
              v-model="form.rateValue"
              :disabled="!form.rate"
              max-length="3"
              @blur="onRateBlur"
            >
              <template #append>倍</template>
            </a-input>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 15px">
          <a-col :span="4" style="padding-top: 5px"
          ><a-checkbox v-model="form.integral">送</a-checkbox></a-col
          >
          <a-col :span="5">
            <a-input
              v-model="form.integralValue"
              :disabled="!form.integral"
              max-length="10"
              @keyup="
              form.integralValue = form.integralValue.replace(/\D|^0/g, '')
            "
            >
              <template #append>积分</template>
            </a-input>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" style="padding-top: 5px"
          ><a-checkbox v-model="form.coupon">送优惠券</a-checkbox></a-col
          >
          <a-col :span="24" style="padding-top: 10px; color: #999"
          >发放优惠券能有效刺激转化</a-col
          >
        </a-row>
        <a-row v-if="form.coupon" style="width: 100%">
          <a-button type="text" @click="showChooseShop">选择优惠券</a-button>
          <a-col :span="24">
            <i-table :options="page.editOptions" :data="choseItems">
              <template #typeCell="{ record }">
                {{ mallWelfareTypeHash[record.type] }}
              </template>
              <template #giveQuantityCell="{ record }">
                <a-input v-model="record.giveQuantity"></a-input>
              </template>
              <template #menu="{ record }">
                <a-popconfirm
                  content="确认该等级不再赠送此券?"
                  @ok="onDeleteShop(record)"
                >
                  <a-button type="text">删除</a-button>
                </a-popconfirm>
              </template>
            </i-table>
          </a-col>
        </a-row>
      </a-form>
      <choose-item
        v-if="page.showChoose"
        v-model="page.showChoose"
        v-model:select-keys="selectedKeys"
        title="选择优惠券"
        :type-enum="mallWelfareTypeHash"
        :api="cbdApiProjectCommonCouponSelectPageGet"
        :options="page.chooseOptions"
        @submit="getChooseItems"
      />
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed, toRaw, toRefs } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMembersLevelDetailIdGet,
    cbdApiProjectCommonCouponSelectPageGet,
    cbdApiProjectMembersLevelSavePost,
    type CbdApiProjectMembersLevelDetailIdGetResponse
  } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import ChooseItem from '@/components/choose-item/index.vue';
  import { mallWelfareTypeHash } from '@/utils/dic';
  import {
    deleteLocalForm,
    getLocalForm,
    setLocalForm
  } from '@/utils/localFormStore';

  type RightItemType =
    Required<CbdApiProjectMembersLevelDetailIdGetResponse>['levelRightList'][0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    level: {
      type: Number
    }
  });
  const SOURCE_KEY = 'member_level';
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v: boolean) {
      emits('update:modelValue', v);
    }
  });
  const selectedKeys = ref<number[]>([]);
  const refForm: Ref = ref(null);
  const page = reactive<{
    showChoose: boolean;
    rules: Recordable;
    editOptions: Recordable;
    chooseOptions: Recordable;
  }>({
    showChoose: false,
    rules: {
      name: [{ required: true, message: '请输入等级名称' }],
      levelBean: [{ required: true, message: '请输入获取条件' }]
    },
    editOptions: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '优惠券名称',
          prop: 'name'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '使用门槛',
          prop: 'useThreshold'
        },
        {
          label: '剩余库存',
          prop: 'remnantInventory'
        },
        {
          label: '赠送数量',
          prop: 'giveQuantity'
        }
      ]
    },
    chooseOptions: {
      tableCard: true,
      menu: false,
      indexTitle: '序号',
      index: true,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        },
        onSelect: (e: number[]) => {
          selectedKeys.value = e;
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
          type: 'select',
          search: true,
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
          prop: 'surplusStock'
        }
      ]
    }
  });
  const form: Ref = ref({
    name: '',
    defaultName: '',
    discount: false,
    rate: false,
    integral: false,
    coupon: false,
    discountValue: '',
    rateValue: '',
    integralValue: ''
  });
  const isLoading = ref(false);
  async function onBeforeOk(done: (closed: boolean) => void) {
    done(false);
    const res = await refForm.value?.validate();
    if (!res) {
      isLoading.value = true;
      const levelRightList: Array<{ id: number; rightsValue: string }> = [];
      if (form.value.discount) {
        levelRightList.push({
          id: 1,
          rightsValue: form.value.discountValue
        });
      }
      if (form.value.rate) {
        levelRightList.push({
          id: 2,
          rightsValue: form.value.rateValue
        });
      }
      if (form.value.integral) {
        levelRightList.push({
          id: 3,
          rightsValue: form.value.integralValue
        });
      }
      if (form.value.coupon) {
        levelRightList.push({
          id: 4,
          rightsValue: ''
        });
        form.value.rightsCouponList = choseItems.value;
        if (form.value.rightsCouponList.some((el: any) => !el.giveQuantity)) {
          Message.error('优惠券数量必填');
          throw new Error('优惠券数量必填');
        }
      }
      if (props.id) {
        form.value.id = props.id;
      }
      try {
        await cbdApiProjectMembersLevelSavePost({
          ...form.value,
          levelRightList
        });
        if (!props.id) {
          await deleteLocalForm(SOURCE_KEY);
        }
        emits('refresh');
        done(true);
        visible.value = false;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  }
  async function onCancel() {
    // 是新增
    if (!props.id) {
      await setLocalForm(SOURCE_KEY, toRaw(form.value));
    }
    visible.value = false;
  }
  function showChooseShop() {
    page.showChoose = true;
  }
  const choseItems: Ref = ref([]);
  function getChooseItems(e: any) {
    // 对旧数据根据过滤,排除掉本次取消勾选的数据
    choseItems.value = choseItems.value.filter((el: any) =>
      selectedKeys.value.includes(el.id)
    );
    // 找出本次选择前已选择的优惠券
    const alreadyHasKeysList: number[] = [];
    choseItems.value.forEach((el: any) => {
      alreadyHasKeysList.push(el.id);
    });
    const res = (e.data || []).filter(
      (el: any) =>
        selectedKeys.value.includes(el.id) &&
        !alreadyHasKeysList.includes(el.id)
    );
    // 对新选择的数据进行处理
    res.forEach((el: any) => {
      el.useThreshold = el.threshold;
      el.remnantInventory = el.surplusStock;
      el.giveQuantity = el.operate;
    });
    // 将新选择的和前面已选择好的拼接 ===> 不能直接覆盖,否则前面编辑的会被覆盖
    choseItems.value = choseItems.value.concat(res);
    page.showChoose = false;
  }
  function onDeleteShop(record: RightItemType) {
    const idx = selectedKeys.value.findIndex((el: number) => el === record.id);
    const itemIdx = choseItems.value.findIndex(
      (el: any) => el.id === record.id
    );
    selectedKeys.value.splice(idx, 1);
    choseItems.value.splice(itemIdx, 1);
  }
  const [getDetailData] = useFuncProxy(async () => {
    const res = await cbdApiProjectMembersLevelDetailIdGet({
      id: String(props.id)
    });
    form.value = {
      levelBean: res.levelBean,
      defaultName: res.defaultName,
      name: res.name
    };
    (res.levelRightList || []).forEach((it: RightItemType) => {
      if (it.id === 1 && it.checked) {
        form.value.discount = true;
        form.value.discountValue = it.rightsValue;
      }
      if (it.id === 2 && it.checked) {
        form.value.rate = true;
        form.value.rateValue = it.rightsValue;
      }
      if (it.id === 3 && it.checked) {
        form.value.integral = true;
        form.value.integralValue = it.rightsValue;
      }
      if (it.id === 4 && it.checked) {
        form.value.coupon = true;
        choseItems.value = res.rightsCouponList;
        (res.rightsCouponList || []).forEach((it: RightItemType) => {
          selectedKeys.value.push(it.id!);
        });
      }
    });
  });
  function onDiscountBlur() {
    if (
      !/^[0-9](.[0-9])?$/.test(form.value.discountValue) ||
      form.value.discount === '0'
    ) {
      Message.error('请输入0到10之间的数,最多包含一位小数');
      form.value.discountValue = '';
    }
  }
  function onRateBlur() {
    if (
      !/^[+]?([1-9][0-9]*)$|^[+]?([1-9][0-9]*\.\d+)$|^[+]?([0]\.(?!0+$)\d+)$/.test(
        form.value.rateValue
      )
    ) {
      Message.error('倍率必须大于0');
      form.value.rateValue = '';
    }
  }
  function onBeanBlur() {
    if (!form.value.levelBean || form.value.levelBean.startsWith(0)) {
      form.value.levelBean = '';
      Message.error('请输入正整数');
    }
  }
  onMounted(() => {
    if (props.id) {
      getDetailData();
    } else {
      form.value = toRefs(getLocalForm(SOURCE_KEY));
      form.value.defaultName = 'VIP' + (Number(props.level) + 1);
      form.value.levelBean = props.level === 0 ? '0' : '';
    }
  });
</script>
<style scoped lang="less">
  .tip {
    color: #999;
    white-space: nowrap;
  }
</style>
