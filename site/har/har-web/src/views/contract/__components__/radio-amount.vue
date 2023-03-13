<template>
  <div class="flex align-center">
    <a-radio v-model="type" :value="1">
      <div class="flex align-center">
        <div class="title-label">每平方固定金额</div>
        <div>
          <a-input-number v-model="price">
            <template #suffix>元</template>
          </a-input-number>
        </div>
      </div>
    </a-radio>
    <div class="margin-left-xs"></div>
    <a-radio v-model="type" :value="2">
      <div class="flex align-center">
        <div class="title-label">固定金额</div>
        <div>
          <a-input-number v-model="fixPrice">
            <template #suffix>元</template>
          </a-input-number>
        </div>
      </div>
    </a-radio>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'RadioAmount'
  };
</script>
<script lang="ts" setup>
  import { computed, onMounted, ref, Ref, watch } from 'vue';

  // const type: Ref<number | null> = ref(null);
  const price: Ref<number> = ref(0);
  const fixPrice: Ref = ref(0);
  const props = defineProps({
    method: {
      type: Number,
      default: 0,
      required: true
    },
    amount: {
      type: Number,
      default: 0,
      required: true
    }
  });
  onMounted(() => {
    if (props.method === 1) {
      price.value = props.amount || 0;
    } else {
      fixPrice.value = props.amount || 0;
    }
    emits('update:amount', 0);
  });

  const emits = defineEmits(['update:method', 'update:amount']);
  const type = computed({
    get() {
      return props.method;
    },
    set(value) {
      emits('update:method', value);
    }
  });
  const selectAmount = computed(() => {
    const { method } = props;
    if (method === 1) return price.value;
    return fixPrice.value;
  });
  watch(selectAmount, (v) => {
    emits('update:amount', v);
  });
</script>

<style scoped lang="less">
  .title-label {
    //width: 110px;
    margin-right: 8px;
    line-height: 32px;
    white-space: nowrap;
  }
</style>
