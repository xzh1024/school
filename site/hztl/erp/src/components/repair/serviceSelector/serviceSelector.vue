<template>
  <div class="dialog-wrap">
    <ht-dialog v-bind="$attrs" :title="title" width="1200px" v-on="$listeners">
      <div class="wrap" v-if="onlyService">
        <Items :vehicle="vehicle" @addService="addService" />
      </div>
      <div class="wrap" v-else>
        <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
        <component
          :is="activeTab"
          :vehicle="vehicle"
          @addService="addService"
          @addPaidService="addPaidService"
          @addSet="addSet"
          @addPaidSet="addPaidSet"
          @addFixSet="addFixSet"
        />
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import Items from "./items/items";
import Set from "./set/set";
import FixSet from "./fixSet/fixSet";
import Buy from "./buy/buy";
export default {
  name: "dialog-name",
  props: {
    vehicle: {
      type: Object,
      default: () => {}
    },
    onlyService: {
      type: Boolean,
      default: false
    },
    hidePaid: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "添加服务项目"
    }
  },
  watch: {
    "$attrs.visible": {
      handler() {},
      immediate: true
    }
  },
  components: {
    Items,
    Set,
    FixSet,
    Buy
  },
  data() {
    return {
      activeTab: "Items"
    };
  },
  computed: {
    tabs() {
      if (this.hidePaid) {
        return [
          { name: "项目", id: "Items" },
          { name: "套餐", id: "Set" },
          { name: "定保套餐", id: "FixSet" }
        ];
      }
      return [
        { name: "项目", id: "Items" },
        { name: "套餐", id: "Set" },
        { name: "定保套餐", id: "FixSet" },
        { name: "已购", id: "Buy" }
      ];
    }
  },
  methods: {
    cancelHandle() {
      this.$emit("close");
    },
    addService(e) {
      this.$emit("addService", e);
    },
    addPaidService(e) {
      this.$emit("addPaidService", e);
    },
    addSet(e) {
      this.$emit("addSet", e);
    },
    addPaidSet(e) {
      this.$emit("addPaidSet", e);
    },
    addFixSet(e) {
      this.$emit("addFixSet", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  ::v-deep {
    .el-dialog {
      top: 7vh !important;
    }
  }
}
.wrap {
  height: 600px;
}
</style>
