<template>
  <i-sys :title="title" nav-bg="bg-white">
    <view class="container wrapper">{{ pageContent }}</view>
  </i-sys>
</template>

<script setup lang="ts">
  import { onLoad } from "@dcloudio/uni-app";
  import { ref } from "vue";
  import {
    svcAppletHomePageHelpGet,
    svcAppletHomePageGuideGet
  } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";

  const title = ref("");
  const pageContent = ref("");

  function init() {
    uni.showLoading({});
    if (title.value === "帮助中心") {
      getHelpContent();
    } else {
      getGuideContent();
    }
  }

  const [getHelpContent] = useFuncProxy(async () => {
    const d = await svcAppletHomePageHelpGet();
    pageContent.value = d.content;
    uni.hideLoading();
  });

  const [getGuideContent] = useFuncProxy(async () => {
    const d = await svcAppletHomePageGuideGet();
    pageContent.value = d.content;
    uni.hideLoading();
  });

  onLoad((options: any) => {
    if (options.type === "help") {
      title.value = "帮助中心";
    } else {
      title.value = "使用指引";
    }

    init();
  });
</script>

<style lang="scss" src="../common.scss"></style>
