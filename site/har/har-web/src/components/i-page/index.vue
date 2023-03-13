<template>
  <section>
    <i-loading :loading="loading" />
    <a-result
      v-if="error"
      status="error"
      title="页面访问异常"
      :subtitle="error.message"
    />
    <slot v-else-if="!loading" />
  </section>
</template>

<script setup lang="ts">
  type Props = {
    loading?: boolean;
    error?: Error;
  };
  const { loading = false, error } = defineProps<Props>();
</script>
