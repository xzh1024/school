<template>
  <div class="stage-table">
    <i-table :data="tableData" :options="tableOptions">
      <template #header>
        <div class="flex align-center justify-between">
          <div>
            <div v-if="name" class="group-title">{{ name }}</div>
          </div>
          <a-button type="primary" :disabled="isAddRowOperate" @click="addRow()"
            >添加行</a-button
          >
        </div>
      </template>
      <template #startVolumeCell="{ record }">
        <a-input
          v-model="record.startVolume"
          hide-button
          disabled
          placeholder="请输入开始销售额度"
        ></a-input>
      </template>
      <template #endVolumeCell="{ record }">
        <a-input
          v-model="record.endVolume"
          placeholder="∞"
          @focus="focusVolume(record)"
          @blur="changeVolume(record)"
        ></a-input>
      </template>
      <template #groupIdCell="{ record, rowIndex }">
        <a-form-item
          hide-label
          :field="`commissionList.${rowIndex}.groupId`"
          :rules="[{ required: true, message: '请选择货品组别' }]"
        >
          <a-select
            v-model="record.groupId"
            placeholder="请选择货品组别"
            :options="goodsGroupListComputed"
          ></a-select>
        </a-form-item>
      </template>
      <template #commissionRatioCell="{ record, rowIndex }">
        <a-form-item
          hide-label
          :field="
            props.isChildren
              ? `commissionList.${props.parentIndex}.subCommissionList.${rowIndex}`
              : `commissionList.${rowIndex}.commissionRatio`
          "
          :rules="[{ required: true, message: '请填写抽成比例' }]"
        >
          <a-input
            v-model="record.commissionRatio"
            hide-button
            placeholder="请输入抽成比例"
          >
            <template #append>%</template>
          </a-input>
        </a-form-item>
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="deleteHandle(record)">删除</a-button>
      </template>
    </i-table>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';

  interface propTypes {
    modelValue: tableItem[];
    algMethod: number;
    name?: string;
    isChildren?: boolean;
    parentIndex?: number;
  }
  const props = withDefaults(defineProps<propTypes>(), {
    modelValue: () => [],
    algMethod: -1,
    name: ''
  });

  const temporaryVolume = ref<string>('0');
  const emits = defineEmits(['update:modelValue']);
  const tableData = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  interface groupListItem {
    label: string;
    value: number;
    disabled?: boolean;
  }
  const goodsGroupList = ref<groupListItem[]>(inject('goodsGroup') || []);

  interface tableItem {
    id?: number;
    startVolume?: number | string;
    endVolume?: string;
    groupId?: number;
    commissionRatio?: number;
  }

  // 抽成   抽成方式是否是货品组别分类抽成
  const isAlgMethodProductGroup = computed(() => {
    return props.algMethod === 24;
  });

  const isAddRowOperate = computed(() => {
    if (!tableData.value.length) return false;
    return props.algMethod !== 24;
  });
  const tableOptions = computed(() => {
    return {
      tableCard: false,
      // header: false,
      pageShow: false,
      rowKey: 'id',
      indexTitle: '序号',
      index: true,
      columns: [
        {
          label: '开始销售额度（元）',
          prop: 'startVolume',
          hide: isAlgMethodProductGroup.value
        },
        {
          label: '结束销售额度（元）',
          prop: 'endVolume',
          hide: isAlgMethodProductGroup.value
        },
        {
          label: '货品组别',
          prop: 'groupId',
          width: 220,
          hide: !isAlgMethodProductGroup.value
        },
        { label: '抽成比例', prop: 'commissionRatio' }
      ]
    };
  });
  function addRow(v?: string) {
    tableData.value.push({
      id: new Date().getTime(),
      startVolume: v || '0',
      endVolume: ''
    });
  }
  function deleteHandle(record: tableItem) {
    const { id } = record;
    const index = tableData.value?.findIndex((i) => i.id === id);
    const { endVolume } = tableData.value[index];
    if (tableData.value[index - 1]) {
      tableData.value[index - 1].endVolume = endVolume;
    } else {
      if (tableData.value[index + 1]) {
        tableData.value[index + 1].startVolume = '0';
      }
    }
    tableData.value?.splice(index, 1);
  }
  function changeVolume(record: tableItem) {
    const { endVolume } = record;

    if (endVolume === '') return;
    const index = tableData.value?.findIndex(
      (i: tableItem) => i.id === record.id
    );
    if (!endVolume) {
      return (tableData.value[index].endVolume = temporaryVolume.value);
    }
    if (tableData.value[index + 1]) {
      const { startVolume = 0 } = tableData.value[index + 1];
      if (Number(startVolume) === Number(endVolume)) return;
      if (Number(endVolume) > Number(startVolume)) {
        tableData.value[index].endVolume = temporaryVolume.value || '';
        return Message.error('结束销售额不能大于开始销售额');
      }
      tableData.value.splice(index + 1, 0, {
        id: new Date().getTime(),
        startVolume: String(endVolume),
        endVolume: String(startVolume)
      });
    } else {
      addRow(endVolume);
    }
  }

  function focusVolume(record: tableItem) {
    const { endVolume = '' } = record;
    temporaryVolume.value = endVolume;
  }

  const selectIds = computed(() => {
    return tableData.value.map((i) => {
      return i.groupId;
    });
  });
  const goodsGroupListComputed = computed(() => {
    return goodsGroupList.value.map((i) => {
      return { ...i, disabled: selectIds.value.includes(i.value) };
    });
  });
</script>

<style scoped lang="less">
  .justify-between {
    justify-content: space-between;
  }
  .stage-table {
    width: 100%;
    //padding-top: 16px;
  }
  .group-title {
    color: #333;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
</style>
