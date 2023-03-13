<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    :on-before-ok="handleBeforeOk"
    @cancel="handleCancel"
  >
    <div v-if="[1, 2].includes(handleType)" class="select-box">
      <a-select
        v-model:model-value="selectArr"
        :options="selectOptions"
        placeholder="请选择"
        :field-names="{ value: 'userCode', label: 'username' }"
        allow-search
      >
        <template #option="{ data }">
          <div class="select-cell flex align-center">
            <a-avatar v-if="data.avatar" class="margin-right-16">
              {{ data.avatar }}
            </a-avatar>
            <div class="margin-right-16">
              {{ data.username || data.userName }}
            </div>
            <div class="margin-right-16">{{ data.phoneNumber }}</div>
            <div class="margin-right-16">{{ data.deptName }}</div>
            <div>{{ data.roleName }}</div>
          </div>
        </template>
      </a-select>
    </div>
    <div v-if="handleType === 2" class="exist-man-box">
      <div
        v-for="(item, index) in existMan"
        :key="`e_${index}`"
        class="man-cell-box"
      >
        <div class="man-cell">
          <a-avatar :size="32">
            <img :src="item.avatar" />
          </a-avatar>
          <div>{{ item.name }}</div>
        </div>
        <div class="connect-line-box flex align-center">
          <div class="round"></div>
          <div class="line"></div>
          <div class="round"></div>
        </div>
      </div>
    </div>
    <div class="textarea-box">
      <div class="remark-title">备注</div>
      <a-textarea
        v-model="remark"
        show-word-limit
        :max-length="50"
        allow-clear
      ></a-textarea>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { computed, PropType, Ref } from 'vue';

  const emits = defineEmits([
    'update:modelValue',
    'update:selectValue',
    'update:remarkValue',
    'handleBeforeOk'
  ]);

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    handleType: {
      type: Number,
      default: 0
    },
    selectValue: {
      type: [String, Array],
      default: () => []
    },
    selectOptions: {
      type: Array as PropType<any>,
      default: () => []
    },
    remarkValue: {
      type: String,
      default: ''
    }
  });

  const handleCancel = () => {
    selectArr.value = [];
    remark.value = '';
  };

  const handleBeforeOk = () => {
    emits('handleBeforeOk');
  };

  const remark = computed({
    get() {
      return props.remarkValue;
    },
    set(v) {
      emits('update:remarkValue', v);
    }
  });

  const selectArr = computed({
    get() {
      return props.selectValue;
    },
    set(v) {
      emits('update:selectValue', v);
    }
  });

  //已存在流程节点人 临时
  const existMan: any = [];

  const title_arr: any = [];
  const title = computed(() => {
    return (
      title_arr.find((item: any) => item.value === props.handleType)?.label ||
      '提示'
    );
  });

  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
</script>

<style scoped lang="less">
  .margin-right-16 {
    margin-right: 16px;
  }
  .select-box {
    margin-bottom: 12px;
  }
  .select-cell {
    padding: 8px 0;
  }
  .exist-man-box {
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    user-select: none;
    .man-cell-box {
      display: flex;
      align-items: flex-start;
      &:last-child {
        .connect-line-box {
          display: none;
        }
      }
      .man-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        white-space: nowrap;
      }
      .connect-line-box {
        padding: 15px 8px;
        .round {
          width: 5px;
          height: 5px;
          background: #d9d9d9;
          border-radius: 50%;
        }
        .line {
          width: 52px;
          height: 2px;
          background: #d9d9d9;
        }
      }
    }
  }
  .textarea-box {
    .remark-title {
      margin-bottom: 12px;
    }
  }
</style>
