<template>
  <div class="stage-content">
    <div v-for="(item, index) in stages" :key="index">
      <div class="stage-head">
        <div class="stage-title">阶段{{ index + 1 }}</div>
        <a-space>
          <div @click="addStages"
            ><img class="stage-icon" src="~@/assets/images/add-blue.png" alt=""
          /></div>
          <div v-if="stages.length > 1" @click="deleteStages(index)"
            ><img class="stage-icon" src="~@/assets/images/del-red.png" alt=""
          /></div>
        </a-space>
      </div>
      <stage-form
        ref="stagesFormRef"
        v-model="stages[index]"
        :type="type"
        :expense-id="expenseId"
        :rent-free="rentFree"
        :has-increase="hasIncrease"
      ></stage-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import StageForm from './stage-form.vue';
  import { computed, ref, PropType } from 'vue';
  import { contractPaySchemeStagesItem } from '@/views/new-contract/__components__/cost-info/index';
  import dayjs from 'dayjs';
  import { modalConfirm } from '@/utils';

  const props = defineProps({
    modelValue: {
      type: Array as PropType<contractPaySchemeStagesItem[]>,
      default: () => []
    },
    type: {
      type: [Number, String]
    },
    hasIncrease: {
      type: Number,
      default: 0
    },
    rentFree: {
      type: Boolean,
      default: false
    },
    expenseId: {
      type: [Number, String],
      required: true,
      default: ''
    },
    initialDate: {
      type: Object,
      default: () => {
        return { startDate: '', endDate: '' };
      }
    }
  });

  const emits = defineEmits(['update:modelValue']);

  const stagesFormRef = ref<any[] | undefined>();
  const stages = computed<contractPaySchemeStagesItem[]>({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
  function addStages() {
    const maxIndex = stages.value.length - 1;
    const { endDate = '' } = stages.value[maxIndex];
    const newStartDate = dayjs(endDate).add(1, 'day').format('YYYY-MM-DD');
    let start = newStartDate;
    if (
      dayjs(props.initialDate.endDate).diff(dayjs(newStartDate), 'day') <= 0
    ) {
      start = endDate;
    }
    stages.value.push({
      ...(stages.value[maxIndex] || {}),
      id: new Date().getTime(), // 自定义id  后端查不到做新增处理
      startDate: start,
      endDate: props.initialDate.endDate
    });
  }
  function deleteStages(index: number) {
    modalConfirm('确认删除当前项数据', () => {
      stages.value?.splice(index, 1);
    });
  }
  function submit() {
    const arr: any[] = [];
    stagesFormRef.value?.forEach((i) => {
      arr.push(...i.submit());
    });
    console.log(arr);
    return arr;
  }
  defineExpose({ submit });
</script>

<style scoped lang="less">
  .stage-content {
    background: #fff;
  }
  .stage-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    .stage-title {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      line-height: 24px;
    }
    .stage-icon {
      cursor: pointer;
      width: 16px;
      height: 16px;
      display: block;
    }
  }
  .bg-grey {
    background: #dcdcdc;
  }
  :deep(.arco-select-view-single),
  :deep(.arco-picker),
  :deep(.arco-select-view-multiple) {
    border: 1px solid #dcdcdc;
    background-color: #fff;
    border-radius: 4px;
  }
  :deep(.arco-input-wrapper) {
    background-color: #fff;
    border: 1px solid #dcdcdc;
    //border-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  :deep(.arco-input-outer) {
    border-radius: 4px;
    overflow: hidden;
  }
</style>
