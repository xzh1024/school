import { ComponentOptions, getCurrentInstance } from "vue";
import { useSysScrollTop } from "@/hooks/useSysScrollTop";
import { useAppStore } from "@/stores/app";
export default {
  data() {
    const { onScrollTop, sysScrollTop, offScrollTop } = useSysScrollTop();
    const uid = getCurrentInstance()!.uid;
    return {
      sysScrollTop,
      onScrollTop,
      offScrollTop,
      uid,
      sysLayer: 0
    };
  },
  created() {
    if (this.$parent) {
      this.sysLayer = (this.$parent.sysLayer || 0) + 1;
    }
  },
  onPageScroll(e: any) {
    if (this.$mpType === "page") {
      this.onScrollTop(this.uid, e.scrollTop);
    }
    if (e.scrollTop < 0) {
      return false;
    }
  },
  unmounted() {
    this.offScrollTop(this.uid);
  },
  computed: {
    userInfo() {
      const store = useAppStore();
      return store.userInfo;
    }
  }
} as ComponentOptions;
