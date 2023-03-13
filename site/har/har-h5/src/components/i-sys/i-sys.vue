<template>
  <view v-if="!loading" class="i-page">
    <view class="page-body">
      <!-- #ifndef H5 -->
      <i-navbar
        v-if="title && showNav"
        :bg="navBg"
        :no-fixed="noFixed"
        :placeholder="navPlaceholder"
        :stop-back="stopBack"
        :opacity="navOpacity"
        :capsule="navCapsule"
        :theme="navTheme"
        :back="back"
        @navback="emits('navback')"
      >
        <template #left>
          <slot name="navLeft"></slot>
        </template>
        <template #center>{{ title }}</template>
      </i-navbar>
      <!-- #endif -->
      <slot></slot>
    </view>
    <view>
      <i-login v-if="isShow"></i-login>
    </view>
  </view>
</template>
<script>
  export default {
    name: "ISys"
  };
</script>
<script setup>
  import { useToggle } from "@har/use";
  import getUser from "@/utils/user";
  import { onLoad } from "@dcloudio/uni-app";
  import ILogin from "@/components/i-login/index.vue";
  import { computed } from "vue";
  import { useAppStore } from "@/stores/app";
  const [loading, toggle] = useToggle(false);
  defineProps({
    navPlaceholder: {
      type: Boolean,
      default: false
    },
    navOpacity: {
      //是否开启滑动渐变
      type: Boolean,
      default: false
    },
    navCapsule: {
      //是否开启胶囊返回
      type: Boolean,
      default: true
    },
    navTheme: {
      type: String,
      default: "dark",
      validate(val) {
        return ["light", "dark"].include(val);
      }
    },
    navBg: {
      type: String,
      default: "bg-blur"
    },
    title: {
      type: String,
      default: ""
    },
    stopBack: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: true
    },
    noFixed: {
      //是否浮动
      type: Boolean,
      default: false
    },
    showNav: {
      type: Boolean,
      default: true
    }
  });
  const store = useAppStore();
  const emits = defineEmits(["load", "navback"]);
  async function init(e) {
    // #ifndef H5
    try {
      toggle(true);
      await getUser();
      toggle(false);
      emits("load", e);
    } catch (e) {
      console.error(e);
    }
    // #endif
  }
  const isShow = computed(() => {
    return store.showLogin;
  });
  onLoad(init);
</script>
