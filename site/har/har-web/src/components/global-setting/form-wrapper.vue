<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :default-value="defaultValue"
    @change="handleChange"
  />
  <a-switch
    v-else
    :default-checked="defaultSwitch"
    size="small"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { computed, Ref } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: Number,
      default: 0
    }
  });
  const defaultSwitch: Ref<boolean> = computed(() => {
    return !!props.defaultValue;
  });
  const emit = defineEmits(['inputChange']);
  const handleChange = (value: unknown) => {
    emit('inputChange', {
      value,
      key: props.name
    });
  };
</script>
