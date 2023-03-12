<template>
  <drawer
    v-model="visible"
    :title="!!id ? '修改活动' : '新增活动'"
    :mask-close="false"
    :esc-to-close="false"
    unmount-on-close
    :options="{
      okLoading: loading
    }"
    @before="onSubmit"
  >
    <div class="add-box">
      <i-form ref="activityForm" v-model="editForm" :options="formProps">
        <template #basicForm>
          <div class="block-title">基本信息</div>
        </template>
        <template #line1Form>
          <div class="split-bg"></div>
        </template>
        <template #ruleForm>
          <div class="block-title">活动规则</div>
        </template>
        <template #timeForm>
          <a-form-item label="活动时间" required>
            <a-range-picker
              v-model="editForm.time"
              show-time
              :allow-clear="false"
              :default-picker-value="recent30Days"
              @change="onChange"
            />
          </a-form-item>
        </template>
        <template #budgetForm>
          <a-form-item
            hide-label
            label="活动预算（¥）"
            required
            field="budget"
            :rules="[
              { required: true, message: '活动预算不能为空' },
              {
                validator(value, callback) {
                  if (/^0+\.?0{0,2}$/.test(value)) {
                    callback('活动预算不能为0');
                  } else if (String(value).endsWith('.')) {
                    callback('活动预算输入有误');
                  }
                }
              }
            ]"
          >
            <a-input v-model="budget1" placeholder="请输入金额"></a-input>
          </a-form-item>
        </template>
        <template #line2Form>
          <div class="split-bg"></div>
        </template>
        <template #tableForm>
          <i-table :options="tableOptions" :data="tableData">
            <template #header>
              <div class="flex justify-between">
                <div>活动详情</div>
                <a-button type="primary" @click="addLine">添加行</a-button>
              </div>
            </template>
            <template #spanCell="scope">
              <a-input-group>
                <a-space>
                  <a-form-item hide-label>
                    <a-input
                      v-model="scope.record.start"
                      :disabled="!!scope.rowIndex"
                      placeholder="请输入金额"
                      @blur="onStartBlur(scope.record.start, scope.rowIndex)"
                    />
                  </a-form-item>
                  {{ scope.rowIndex === tableData.length - 1 ? '以上' : '至' }}
                  <a-form-item hide-label>
                    <a-input
                      v-if="scope.rowIndex !== tableData.length - 1"
                      v-model="scope.record.end"
                      placeholder="请输入金额"
                      @blur="onEndBlur(scope.record.end, scope.rowIndex)"
                    />
                  </a-form-item>
                </a-space>
              </a-input-group>
            </template>
            <template #amountCell="scope">
              <a-input
                v-model="scope.record.amount"
                hide-button
                :max="editForm.type === 'consume_discount' ? 10 : undefined"
                :placeholder="'请输入' + label"
                @blur="onAmountBlur(scope.record.amount, scope.rowIndex)"
              />
            </template>
            <template #menu="scope">
              <a-popconfirm
                v-if="scope.rowIndex !== 0"
                content="确认删除该数据吗？"
                @ok="onDelete(scope.rowIndex, scope.record)"
              >
                <a-button type="text" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </i-table>
        </template>
        <template #line3Form>
          <div class="split-bg"></div>
        </template>
        <template #useRuleForm>
          <div class="block-title">适用规则</div>
          <a-form-item
            label="适用店铺"
            required
            field="applyType"
            style="margin-bottom: 0"
          >
            <apply-shop
              v-model="editForm.applyType"
              radio-layout="vertical"
              :project-id="editForm.projectId"
              :shop-list="list"
              @submit="getData"
            />
          </a-form-item>
        </template>
        <template #otherForm>
          <div class="block-title">其他设置</div>
        </template>
      </i-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ApplyShop from '@/views/svc/__components__/applyShop.vue';
  import {
    cardActivitySceneList,
    cardActivityTypeList,
    StatusListType
  } from '@/utils/dic';

  import {
    svcWebActivityDiscountSavePost,
    svcWebCommonCardSelectListGet,
    SvcWebActivityDiscountSavePostRequest,
    SvcWebCommonCardSelectListGetResponse,
    svcWebActivityDiscountInfoIdGet,
    svcWebActivityDiscountUpdatePost,
    SvcWebActivityDiscountUpdatePostRequest,
    SvcWebActivityDiscountInfoIdGetResponse
  } from '@/api/svc-web';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import { Message } from '@arco-design/web-vue';
  import lsStore from '@/utils/ls-store';
  import { getRecentDays } from '@/utils';
  import useControlInput from '@/hooks/useControlInput';
  // import { getActiveProjectId } from '@/utils';
  // 输入开始金额限制

  const budget = computed<string>({
    get() {
      return String(editForm.value.budget || '');
    },
    set(val) {
      editForm.value.budget = val as unknown as number;
    }
  });
  const budget1 = useControlInput(budget, /\d+\.?\d{0,2}/);

  const list = ref<any>([]);
  type SelectShop =
    Required<SvcWebActivityDiscountUpdatePostRequest>['activityStoreList'][0];
  type tempShop =
    Required<SvcWebActivityDiscountInfoIdGetResponse>['cardStoreList'][0];
  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const recent30Days = ref<any[]>([
    getRecentDays(30).startDate + ' 00:00:00',
    getRecentDays(30).endDate + ' 00:00:00'
  ]);
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const editForm = ref<
    Partial<
      SvcWebActivityDiscountSavePostRequest & {
        time: any;
        cardStoreList: any[];
      }
    >
  >({
    projectId: undefined,
    name: '',
    time: recent30Days as unknown as string[],
    startTime: '',
    endTime: '',
    scene: '',
    cardIds: [],
    activityStoreList: [],
    type: '',
    applyType: 1,
    budget: undefined,
    rangeList: [],
    desc: '',
    adPictureResourceCodes: []
  });
  const label = computed(() => {
    return editForm.value?.type === 'consume_discount'
      ? '消费折扣（折）'
      : editForm.value?.type === 'discount'
      ? '折扣（折）'
      : editForm.value?.type === 'gift'
      ? '赠送金额（元）'
      : '优惠金额（元）';
  });
  const tableOptions = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      pageShow: false,
      tableCard: false,
      columns: [
        {
          label: '购卡金额',
          prop: 'span'
        },
        {
          label: label.value,
          align: 'center',
          prop: 'amount'
        }
      ]
    };
  });
  type ItemType = { start?: number; end?: number; amount?: number };
  const activityForm: Ref = ref(null);
  const loading = ref(false);
  const tableData = ref<ItemType[]>([{ start: undefined, end: undefined }]);

  const addLine = () => {
    if (tableData.value.length >= 10) {
      Message.error('最多添加10个区间');
      return false;
    }
    tableData.value[tableData.value?.length - 1].end = undefined;
    tableData.value.push({ start: undefined, end: undefined });
  };

  // const arr = [100, 200, 300];

  // const first = computed(() => {
  //   const index = 0;
  //   let min = 0;
  //   if (index === 0) {
  //     min = 0;
  //   } else {
  //     min = arr[index - 1];
  //   }
  //
  //   // todo 1.判断前一个后一位是否有值
  //   // 2. 判断优惠
  //   //
  //   const max = arr[index + 1];
  //   return [min, max];
  // });

  const onStartBlur = (v: string, i: number) => {
    if (!v) return false;
    if (i === 0) {
      const ma = v.match(/\d+\.?\d{0,2}/)!;
      const t = ma[0];
      if (/^0+\.?0{0,2}$/.test(t)) {
        Message.error('购卡金额输入有误');
      } else if (t.endsWith('.')) {
        Message.error('购卡金额输入有误');
      }
      tableData.value[0].start = ma[0] as unknown as number;
    }
  };
  const onEndBlur = (v: string, i: number) => {
    if (!v) return false;
    const ma = v.match(/\d+\.?\d{0,2}/)!;
    const t = ma[0] || '';
    if (/^0+\.?0{0,2}$/.test(t)) {
      Message.error('金额不能为0');
    } else if (t.endsWith('.')) {
      Message.error('金额输入有误');
    }
    if (Number(t) <= Number(tableData.value[i].start!)) {
      Message.error('金额需大于起始值');
      return false;
    }
    tableData.value[i].end = ma[0] as unknown as number;
    if (tableData.value[i + 1]) {
      tableData.value[i + 1]['start'] = v as unknown as number;
    }
  };
  const onAmountBlur = (v: string, i: number) => {
    if (!v) return false;
    let target;
    // 折扣类型 discount consume_discount
    if (
      editForm.value.type === 'discount' ||
      editForm.value.type === 'consume_discount'
    ) {
      const mdc = v.match(/\d+\.?\d?/)!;
      const t = mdc && mdc[0];
      if (Number(v) <= 0 || Number(v) >= 10) {
        Message.error('折扣输入有误');
      } else if (t?.endsWith('.')) {
        Message.error('折扣输入有误');
      }
      target = mdc[0] as unknown as number;
    } else {
      // 金额类型
      const ma = v.match(/\d+\.?\d{0,2}/)!;
      const t = ma[0] || '';
      if (/^0+\.?0{0,2}$/.test(t)) {
        Message.error('金额输入有误');
      } else if (t.endsWith('.')) {
        Message.error('金额输入有误');
      } else if (Number(t) >= Number(tableData.value[i].start!)) {
        Message.error('优惠金额不能超过购卡金额');
      }
      target = ma[0] as unknown as number;
    }
    tableData.value[i].amount = target as unknown as number;
  };
  const onSubmit = async () => {
    const res = await activityForm.value?.submit();
    let flag = false;
    let isAmountQualify = false;
    // 没输第一个
    const t = tableData.value[0] || {};
    if (!Number(t.start)) {
      Message.error('购卡金额不能为0');
      return false;
    }
    // 隐藏的最后一个,默认为最大值,便于比较
    tableData.value[tableData.value?.length - 1].end = 99999999;
    if (
      tableData.value.some(
        (el: ItemType) => Number(el.end!) <= Number(el.start!)
      )
    ) {
      flag = true;
    }
    // 金额类型 需要判断优惠的不能大于区间开始值
    if (editForm.value.type === 'gift' || editForm.value.type === 'decrement') {
      if (
        tableData.value.some(
          (el: ItemType) => Number(el.amount!) >= Number(el.start!)
        )
      ) {
        isAmountQualify = true;
      }
    }
    if (flag) {
      Message.error('购卡金额输入有误');
      return false;
    }
    if (isAmountQualify) {
      Message.error('优惠金额不能大于等于购卡金额');
      return false;
    }
    // 算完后重新初始化
    tableData.value[tableData.value?.length - 1].end = undefined;
    if (tableData.value.some((el: ItemType) => !el.amount)) {
      const t =
        editForm.value?.type === 'consume_discount' ||
        editForm.value?.type === 'discount'
          ? '折扣不能为空'
          : '优惠金额不能为空';
      Message.error(t);
      return false;
    }
    if (!res) {
      try {
        loading.value = true;
        const { adPictureResourceCodes = [] } = editForm.value;
        const temp = adPictureResourceCodes.map((el: any) => el.key || el.id);
        const [startTime = '', endTime = ''] = editForm.value.time;
        const p = {
          id: props.id,
          ...editForm.value,
          adPictureResourceCodes: temp,
          startTime,
          endTime,
          rangeList: tableData.value
        };
        if (!props.id) {
          await svcWebActivityDiscountSavePost({
            ...p
          } as unknown as SvcWebActivityDiscountSavePostRequest);
        } else {
          await svcWebActivityDiscountUpdatePost({
            ...p
          } as unknown as SvcWebActivityDiscountUpdatePostRequest);
        }
        Message.success('保存成功');
        visible.value = false;
        emits('refresh');
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
  };
  const onDelete = (i: number, v: ItemType) => {
    const t = tableData.value.length;
    tableData.value.splice(i, 1);
    if (i !== t - 1) {
      tableData.value[i]['start'] = v.start;
    }
    tableData.value[tableData.value.length - 1].end = undefined;
  };

  const [getCardList] = useFuncProxy(async (v) => {
    cardList.value = await svcWebCommonCardSelectListGet({
      projectId: v as string
    });
  });
  const [getDetailData] = useFuncProxy(async () => {
    const res = await svcWebActivityDiscountInfoIdGet({
      id: String(props.id!)
    });
    editForm.value = {
      ...res
    } as unknown as SvcWebActivityDiscountSavePostRequest;
    tableData.value = res.rangeList || [];
    const { cardStoreList = [] } = res;
    editForm.value.activityStoreList = cardStoreList.map((el: any) => {
      return {
        id: el.id,
        venueApplyType: el.spaceApplyType,
        venueIds: el.venueIds
      };
    });
    list.value = cardStoreList.map((el: tempShop) => {
      return {
        ...el,
        linkTel: el.contactsPhone,
        linkman: el.contacts,
        name: el.storeName,
        venueIds: el.spaceApplyType === 1 ? [] : el.venueIds,
        // typeData.value === 2 部分店铺可用 如果el.venueApplyType =1 为全场地可用,
        // typeData.value === 3 所有店铺不可用 如果el.venueApplyType =1 为全场地不可用,改为-1
        spaceApplyType:
          editForm.value.applyType === 1 || editForm.value.applyType === 2
            ? el.spaceApplyType
            : el.spaceApplyType === 1
            ? -1
            : el.spaceApplyType
      };
    });
    const { startTime = '', endTime = '' } = res;
    editForm.value.time = [startTime, endTime];
  });
  const getData = (v: SelectShop[]) => {
    editForm.value.activityStoreList = v;
  };
  watch(
    () => editForm.value.projectId,
    (v) => {
      getCardList(v);
      lsStore.setItem('svcServiceProjectId', v);
    }
  );
  getSvcProjectDrop();
  onMounted(() => {
    if (props.id) {
      getDetailData();
    } else {
      editForm.value.projectId = lsStore.getItem('svcServiceProjectId');
    }
  });
  const onChange = (e: any) => {
    const [startTime = '', endTime = ''] = e;
    editForm.value.startTime = startTime;
    editForm.value.endTime = endTime;
  };
  const typeDropList = ref<StatusListType[]>([]);
  const formProps = computed<Recordable>(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        {
          prop: 'basic',
          type: 'groupTitle'
        },
        {
          label: '项目',
          prop: 'projectId',
          type: 'select',
          span: 12,
          dic: svcProjectDropList,
          rules: [{ required: true, message: '项目名称不能为空' }]
        },
        {
          label: '活动名称',
          prop: 'name',
          span: 12,
          options: {
            maxLength: 20
          },
          rules: [{ required: true, message: '活动名称不能为空' }]
        },
        {
          // label: '活动时间',
          prop: 'time',
          // type: 'dateRange',
          span: 24
          // rules: [{ required: true, message: '活动时间不能为空' }],
          // options: {
          //   showTime: true,
          //   onChange: (e: any) => {
          //     const [startTime = '', endTime = ''] = e;
          //     editForm.value.startTime = startTime;
          //     editForm.value.endTime = endTime;
          //   }
          // }
        },
        {
          prop: 'line1',
          type: 'groupTitle'
        },
        {
          prop: 'rule',
          type: 'groupTitle'
        },
        {
          label: '活动场景',
          prop: 'scene',
          type: 'select',
          span: 12,
          dic: cardActivitySceneList,
          rules: [{ required: true, message: '活动场景不能为空' }]
        },
        {
          label: '对应电子卡',
          prop: 'cardIds',
          type: 'select',
          span: 12,
          dic: cardList,
          options: {
            multiple: true
          },
          rules: [{ required: true, message: '对应电子卡不能为空' }]
        },
        {
          label: '类型',
          prop: 'type',
          type: 'select',
          dic: typeDropList,
          span: 12,
          options: {
            disabled: editForm.value.scene === 'consume'
          },
          rules: [{ required: true, message: '类型不能为空' }]
        },
        {
          label: '活动预算（¥）',
          prop: 'budget',
          // type: 'inputNumber',
          span: 12
          // options: {
          //   hideButton: true,
          //   onBlur() {
          //     editForm.value.budget =
          //       editForm.value.budget! <= 0 ? undefined : editForm.value.budget;
          //   }
          // },
        },
        {
          prop: 'table',
          type: 'groupTitle'
        },
        {
          prop: 'line2',
          type: 'groupTitle'
        },
        {
          hideTitle: editForm.value.scene !== 'consume',
          prop: 'useRule',
          type: 'groupTitle'
        },
        {
          hideTitle:
            editForm.value.scene !== 'consume' ||
            editForm.value.applyType === 1,
          prop: 'applyShop',
          type: 'groupTitle'
        },
        {
          hideTitle: editForm.value.scene !== 'consume',
          prop: 'line3',
          type: 'groupTitle'
        },
        {
          prop: 'other',
          type: 'groupTitle'
        },
        {
          label: '活动描述',
          prop: 'desc',
          type: 'textarea',
          rules: [{ required: true, message: '活动描述不能为空' }],
          options: {
            maxLength: 200
          },
          span: 24
        },
        {
          label: '活动广告图',
          prop: 'adPictureResourceCodes',
          type: 'customUpload',
          rules: [{ required: true, message: '活动广告图不能为空' }],
          span: 24,
          limit: 1,
          options: {
            urlKey: 'previewAddress',
            options: {
              accept: 'image/*'
            }
          }
        }
      ]
    };
  });
  watch(
    () => editForm.value.scene,
    (v) => {
      if (v === 'consume') {
        editForm.value.type = 'consume_discount';
        typeDropList.value = cardActivityTypeList;
      } else {
        editForm.value.type = props.id ? editForm.value.type : '';
        typeDropList.value = cardActivityTypeList.slice(0, 3);
      }
    },
    { immediate: true }
  );
</script>
<style scoped lang="less">
  .add-box {
    width: 100%;
    .block-title {
      padding-top: 0;
    }
  }
</style>
