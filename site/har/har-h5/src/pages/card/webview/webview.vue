<template>
  <web-view :src="webviewPath" />
</template>

<script setup lang="ts">
  import ls from "@/ls";
  import { onUnload } from "@dcloudio/uni-app";
  const webviewPath = ls.get("webviewPath");

  onUnload(() => {
    ls.set("webviewPath", "");
  });
</script>
