<template>
  <view class="i-fixed">
    <view
      :id="`fixed-${uid}`"
      class="i-fixed-box"
      :class="{ fixed }"
      :style="{
        left: sticky ? 'auto' : 0,
        top: fixed ? topHeight + 'px' : 'auto',
        bottom: 'auto',
        zIndex: index + sysLayer
      }"
    >
      <view
        class="i-fixed-content"
        :class="bg"
        :style="{ zIndex: index + sysLayer }"
        @tap="toTop"
        ><slot
      /></view>
      <view class="i-fixed-bg"></view>
      <view
        class="i-fixed-bg"
        :class="[ui, bg]"
        :style="[
          { zIndex: index + sysLayer - 1 },
          opacity ? { opacity: opacityValue } : ''
        ]"
      ></view>
    </view>
    <view
      v-if="sticky ? fixed : placeholder && fixed"
      :id="'skeleton-' + uid"
      class="skeleton"
      :style="[{ height: content.height + 'px', width: width + 'px' }]"
    ></view>
  </view>
</template>
<script setup>
  import {
    getCurrentInstance,
    onMounted,
    ref,
    computed,
    unref,
    watch
  } from "vue";
  import { getRect } from "@/utils";
  import { useSysScrollTop } from "@/hooks/useSysScrollTop";
  import NP from "number-precision";
  import { useAppStore } from "@/stores/app";
  const props = defineProps({
    ui: {
      type: String,
      default: ""
    },
    bg: {
      type: String,
      default: "bg-none"
    },
    sticky: {
      type: Boolean,
      default: false
    },
    noFixed: {
      type: Boolean,
      default: false
    },
    val: {
      type: Number,
      default: 0
    },
    noNav: {
      type: Boolean,
      default: false
    },
    clickTo: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 100
    },
    opacityVal: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    opacityDuration: {
      type: Number,
      default: 4
    }
  });
  const instance = getCurrentInstance();
  const uid = instance.uid;

  const rootUid = instance.root.uid;
  const { sysScrollTop } = useSysScrollTop();
  const scrollTop = computed(() => {
    return sysScrollTop[rootUid] | 0;
  });
  const content = ref({});
  const store = useAppStore();
  const topHeight = computed(
    () => props.val + (props.noNav ? 0 : store.sysNavBar)
  );
  const fixed = ref(!props.sticky && !props.noFixed);

  const opacityValue = ref(props.opacityVal);
  function setFiexd() {
    const { top } = unref(content);
    fixed.value = scrollTop.value >= NP.minus(top, topHeight.value);
  }
  function setOpacityVal() {
    const { top } = unref(content);
    if (scrollTop.value > top - topHeight.value) {
      // 浮点问题  同乘100做处理
      const st = scrollTop.value * 100;
      const t = top * 100;
      const th = topHeight.value;
      const v = Math.floor((st - (t - th)) / (props.opacityDuration * 100)); //缓动
      opacityValue.value = v / 10;
    } else {
      opacityValue.value = 0;
    }
    // console.log( opacityValue.value)
  }
  watch(scrollTop, () => {
    if (props.sticky) {
      // console.log(val)
      setFiexd();
      setOpacityVal();
    }
  });
  onMounted(() => {
    init();
  });
  async function init() {
    try {
      const id = "#fixed-" + uid;
      const d = await getRect(id);
      // console.log(id, d);
      content.value = d;
      setFiexd();
      setOpacityVal();
      // console.log(d);
    } catch (e) {}
  }
  function toTop() {
    if (props.clickTo) {
      uni.pageScrollTo({
        scrollTop: content.value.top,
        duration: 100
      });
    }
  }

  function fixedTop() {
    uni.pageScrollTo({
      scrollTop: content.value.top,
      duration: props.duration
    });
  }
  defineExpose({ fixedTop });
</script>
<script>
  export default {
    name: "IFixed"
  };
</script>

<style lang="scss">
  .i-fixed {
    &-box {
      position: relative;
      width: 100%;
      &.fixed {
        position: fixed;
      }
      .i-fixed {
        &-content {
          position: relative;
        }
        &-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          pointer-events: none;
        }
        // &-bottom {
        //   height: calc(constant(safe-area-inset-bottom) / 5 * 3);
        //   height: calc(env(safe-area-inset-bottom) / 5 * 3);
        // }
      }
    }
  }
</style>
