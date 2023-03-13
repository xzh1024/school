<template>
  <ht-dialog
    v-bind="$attrs"
    :title="'维修履历-[' + plateNumber + ']'"
    width="1200px"
    class="dialog"
    v-on="$listeners"
  >
    <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
    <component
      :is="activeTab"
      :vehicleId="vehicleId"
      :enableAdd="enableAdd"
      :discount="discount"
      :billType="billType"
      :canDiscount="canDiscount"
      @addItem="addItem"
      @addPart="addPart"
      @addAdvice="addAdvice"
    />
    <div style="margin: 10px 0 5px 0; text-align: center;">
      <el-button type="primary" size="mini" plain @click="$emit('close')">
        关 闭（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import OrderHistory from "./components/OrderHistory";
import ItemHistory from "./components/ItemHistory";
import PartHistory from "./components/PartHistory";
import Advise from "./components/Advise";
import { getDisCountInfo } from "@/utils/discount";
export default {
  name: "RepaireHistory",
  components: {
    OrderHistory,
    ItemHistory,
    PartHistory,
    Advise
  },
  props: {
    hisType: {
      // 履历类型，默认为工单，工单可以进行添加项目和配件操作
      type: String,
      default: "other"
    },
    billType: {
      type: String,
      default: ""
    },
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    "$attrs.visible": {
      handler() {
        this.activeTab = "OrderHistory";
      },
      immediate: true
    },
    orderInfo: {
      handler(value) {
        if (value && value.id) {
          const { status, vehicle } = value;
          this.enableEdit = status == "recepting" || status == "repairing";
          this.vehicleId = vehicle ? vehicle.vehicleId : 0;
          this.plateNumber = vehicle ? vehicle.plateNumber : "";
          this.initDefaultDiscount();
        }
      },
      deep: true
    }
  },
  computed: {
    enableAdd() {
      if (!this.orderInfo) return false;
      const { status } = this.orderInfo;
      // console.log(this.hisType);
      // console.log(this.hisType === "order");
      // console.log(status !== "completed");
      return this.hisType === "order" && status !== "completed"; // 已完成的工单不显示添加按钮
    }
  },
  mounted() {
    const value = this.orderInfo;
    if (value && value.id) {
      const { status, vehicle } = value;
      this.enableEdit = status == "recepting" || status == "repairing";
      this.vehicleId = vehicle ? vehicle.vehicleId : 0;
      this.plateNumber = vehicle ? vehicle.plateNumber : "";
    }
  },
  data() {
    return {
      tabs: [
        { name: "工单履历", id: "OrderHistory" },
        { name: "项目履历", id: "ItemHistory" },
        { name: "配件履历", id: "PartHistory" },
        { name: "最近维修建议", id: "Advise" }
      ],
      activeTab: "OrderHistory",
      discount: "",
      canDiscount: false,
      plateNumber: "",
      vehicleId: null,
      enableEdit: false
    };
  },
  methods: {
    initDefaultDiscount() {
      const discountInfo = getDisCountInfo(this.orderInfo, "part");
      this.discount = discountInfo.canChangeDiscount
        ? discountInfo.discount || 1
        : null;
      this.canDiscount = discountInfo.canChangeDiscount;
    },
    addItem(e) {
      this.$emit("addItem", e);
    },
    addPart(e) {
      this.$emit("addPart", e);
    },
    addAdvice(e) {
      this.$emit("addAdvice", e);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep {
    .el-dialog__body {
      background: #e7ebed;
    }
  }
}
.tabs-regular {
  ::v-deep {
    .active {
      background: #fff !important;
    }
  }
}
</style>
