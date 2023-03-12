<template>
  <ht-dialog
    v-bind="$attrs"
    v-on="$listeners"
    title="批量增加货区/货架/货层/货位"
    width="600px"
    @close="editFormReset()"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="formData"
      :show-message="false"
      label-width="50px"
      size="mini"
      class="form-item-small-margin-bottom form"
    >
      <batch-add v-model="formData.batchWareArea" :label-name="'货区'" />
      <batch-add v-model="formData.batchshelf" :label-name="'货架'" />
      <batch-add v-model="formData.batchlayer" :label-name="'货层'" />
      <batch-add v-model="formData.batchposition" :label-name="'货位'" />
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px">
      <el-button
        :loading="submitLoading"
        type="primary"
        size="mini"
        plain
        @click="submit"
      >
        确 定
      </el-button>
      <el-button type="primary" size="mini" plain @click="close">
        取 消
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { reqStoreAddBatch } from "@/api/store/settings";
import batchAdd from "@/views/store/storeSettings/settings/components/batchAdd";
import { mapState } from "vuex";
import eventBus from "@/event";
export default {
  name: "BatchSettings",
  inject: ["laodData"],
  components: {
    batchAdd
  },
  props: {
    nodeData: Object
  },
  data() {
    return {
      dialogVisible: false,
      submitLoading: false,
      editTypeRadio: "single",
      formData: {
        batchWareArea: {
          type: 1,
          begin: "A",
          end: "A",
          length: 1
        },
        batchshelf: {
          type: 0,
          begin: "1",
          end: "1",
          length: 1
        },
        batchlayer: {
          type: 0,
          begin: "1",
          end: "1",
          length: 1
        },
        batchposition: {
          type: 0,
          begin: "1",
          end: "1",
          length: 1
        }
      },
      rules: {}
    };
  },
  computed: {
    ...mapState("admin/warehouseSettings", ["warehousesInfo"])
  },
  methods: {
    close() {
      this.editFormReset();
      this.$emit("update:visible", false);
    },
    editFormReset() {
      this.$refs["formRef"].resetFields();
    },
    makeBatchData(data) {
      const res = {
        type: data.type,
        start: data.begin,
        end: data.end,
        numberDigit: data.length
      };
      return res;
    },
    submit() {
      this.$confirm("是否确认批量新增仓位？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const reqData = {};
          reqData.warehouseId = this.warehousesInfo.warehouseId;
          this.submitLoading = true;
          reqData.wareareaName = this.makeBatchData(
            this.formData.batchWareArea
          );
          reqData.shelfName = this.makeBatchData(this.formData.batchshelf);
          reqData.layerName = this.makeBatchData(this.formData.batchlayer);
          reqData.positionName = this.makeBatchData(
            this.formData.batchposition
          );
          reqStoreAddBatch(reqData)
            .then(() => {
              this.submitLoading = false;
              this.$message.success({ message: "新增成功" });
              eventBus.$emit("loadArea", { page: 1 });
              this.close();
            })
            .catch(() => {
              this.submitLoading = false;
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.form
    margin 0 auto
</style>
