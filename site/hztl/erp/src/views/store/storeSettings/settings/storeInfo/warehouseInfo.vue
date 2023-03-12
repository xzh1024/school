<template>
  <store-tpl :node-data="nodeData">
    <template v-slot:options>
      <add-ware-area
        v-if="!isEasyMode"
        :warehouse-id="nodeData.data.id"
        style="margin-right:10px"
      />
      <add-position
        v-if="isEasyMode"
        :node-data="nodeData"
        style="margin-right:10px"
      />
      <el-button type="primary" size="small" @click.stop="saveWarehouse">
        保存
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click.stop="triggerWarehouseDisable"
      >
        {{ disableBtnText }}
      </el-button>
      <el-button
        type="primary"
        size="small"
        :disabled="nodeData.data.flags === 2 || nodeData.data.flags === 3"
        @click.stop="deleteWarehouse"
      >
        删除
      </el-button>
    </template>

    <warehouse-form :id="nodeData.data.id" ref="formRef" />
  </store-tpl>
</template>

<script>
import store from "@/views/store/storeSettings/store";
import addWareArea from "@/views/store/storeSettings/settings/dialogs/addWareArea";
import addPosition from "@/views/store/storeSettings/settings/dialogs/addPosition";
import { reqStoreUpdate } from "@/api/store/settings";
import warehouseForm from "@/views/store/storeSettings/settings/components/warehouseForm";
import storeTpl from "@/views/store/storeSettings/settings/components/storeTpl";
import { reqStoreDelete, reqStoreStop } from "@/api/store";
import { mapState } from "vuex";

export default {
  name: "WarehouseInfo",
  components: {
    storeTpl,
    warehouseForm,
    addWareArea,
    addPosition
  },
  inject: ["laodData"],

  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {
          data: {
            id: 0
          }
        };
      }
    }
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    disableBtnText() {
      let text = "停用";
      if (
        this.nodeData.data &&
        this.nodeData.data.status == store.DisabledStat
      ) {
        text = "启用";
      }
      return text;
    }
  },
  methods: {
    deleteWarehouse() {
      const info = this.$refs["formRef"].formData;
      if (info.id == 0) {
        this.$message({ message: "请选中仓库" });
        return;
      }

      this.$confirm(`确定要删除仓库 ${info.name} ？`, "提示", {
        type: "warning"
      })
        .then(() => {
          reqStoreDelete(info.id)
            .then(() => {
              this.$message.success({ message: `成功删除仓库 ${info.name}` });
              this.laodData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },

    disableStore(info) {
      const reqData = { id: info.id, status: store.DisabledStat };
      this.$prompt("请输入停用原因", "提示", {
        inputType: "textarea",
        inputValidator: val => {
          if (!val) {
            return "请输入停用原因";
          } else {
            return true;
          }
        }
      })
        .then(data => {
          reqData.reason = data.value;
          reqStoreStop(reqData)
            .then(() => {
              this.$message.success({ message: "停用成功" });
              this.$refs["formRef"].formData.status = store.DisabledStat;
              this.laodData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    enableStore(info) {
      const reqData = { id: info.id, status: store.EnableStat };
      this.$confirm(`确定要启用仓库 ${info.name} ？`, "提示", {
        type: "warning"
      })
        .then(() => {
          reqStoreStop(reqData)
            .then(() => {
              this.$message.success({ message: "启用成功" });
              this.$refs["formRef"].formData.status = store.EnableStat;
              this.laodData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    triggerWarehouseDisable() {
      const info = this.$refs["formRef"].formData;
      if (info.id == 0) {
        this.$message({ message: "请选中仓库" });
        return;
      }
      if (info.status === store.DisabledStat) {
        this.enableStore(info);
      } else {
        this.disableStore(info);
      }
    },
    saveWarehouse() {
      const formRef = this.$refs["formRef"];
      const data = formRef.formData;

      formRef.validate((val, err) => {
        if (val) {
          const reqData = { ...data };
          reqData.areaId = reqData.areaIds[2];
          delete reqData.areaIds;

          reqStoreUpdate(reqData).then(() => {
            this.$message.success({ message: "保存成功" });
            this.laodData();
          });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
