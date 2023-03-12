<template>
  <ht-dialog
    title="调拨出库仓库优先级设置"
    v-bind="$attrs"
    :show-close="true"
    width="815px"
    top="7vh"
    v-on="$listeners"
  >
    <div>
      <div class="dialog-priority-content">
        <div
          class="priority-item"
          v-for="(item, index) in priorityWarehouseArr"
          :key="index"
        >
          <span
            v-show="index % 3 === 0 && index !== 0"
            class="priority-next"
          ></span>
          <span class="priority-item-index">{{ index + 1 }}</span>
          <div class="priority-item-select">
            <ht-select
              :options="options"
              v-model="item.id"
              placeholder="请选择"
            />
          </div>
          <span
            v-show="(index + 1) % 3 === 0 && index !== 0"
            class="priority-next"
          ></span>
          <span
            v-show="
              ((index - 1) % 3 === 0 || index % 3 === 0) && index !== Length - 1
            "
            class="priority-next-2"
          ></span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" plain @click="savetHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import {
  getTansferWarehouse,
  changeCompanyPriority
} from "@/api/transfer/warehousePerm";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
export default {
  name: "EditAllocsDialog",
  data() {
    return {
      options: [],
      priorityWarehouseArr: [],
      priorityWarehouseIds: []
    };
  },
  props: {
    EditObj: {
      type: Object
    }
  },
  watch: {
    "$attrs.visible"(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.loadData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  computed: {
    Length() {
      return this.priorityWarehouseArr.length || 0;
    }
  },
  methods: {
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    loadData() {
      this.priorityWarehouseArr = this.EditObj.storehouseTree;
      getTansferWarehouse().then(res => {
        this.options = res.filter(item =>
          this.EditObj.storeIds.includes(item.id)
        );
        this.options.map(item => {
          return {
            ...item,
            type: undefined
          };
        });
        if (!this.priorityWarehouseArr) {
          this.priorityWarehouseArr = this.options;
        }
        this.$forceUpdate();
      });
    },
    savetHandle() {
      try {
        this.priorityWarehouseIds = [];
        this.priorityWarehouseArr.forEach(item => {
          if (!this.priorityWarehouseIds.includes(item.id)) {
            this.priorityWarehouseIds.push(item.id);
          } else {
            throw "优先级设置不能有相同的数据！";
          }
        });
        changeCompanyPriority({
          businessCompanyId: this.EditObj.businessCompanyId,
          priorityWarehouseIds: this.priorityWarehouseIds
        })
          .then(() => {
            this.$message.success("更新成功！");
            this.$emit("update:visible", false);
            this.$emit("refeshData");
          })
          .catch(err => {
            this.$message.error(err);
          });
      } catch (e) {
        this.$message.error(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-priority-content {
  .priority-item {
    display: inline-block;
    margin-top: 16px;
    &:first-child {
      margin-left: 24px;
    }
    .priority-item-index {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #3aa7ff;
      font-size: 16px;
      color: #ffffff;
      line-height: 32px;
      text-align: center;
      margin-left: 8px;
    }
    .priority-item-select {
      display: inline-block;
      margin: 0 8px;
      width: 152px;
      height: 32px;
    }
    .priority-next {
      display: inline-block;
      width: 24px;
      height: 16px;
      background: url("~@/assets/images/process-line.png") no-repeat;
      background-size: 100% 100%;
    }
    .priority-next-2 {
      display: inline-block;
      width: 40px;
      height: 16px;
      background: url("~@/assets/images/process-line2.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
.dialog-footer-align {
  margin-top: 20px;
}
</style>
