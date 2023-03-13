<template>
  <ht-dialog
    :show-close="true"
    v-bind="$attrs"
    v-on="$listeners"
    width="600px"
    :title="showTitle"
    class="dialog-body"
    top="7vh"
  >
    <div style="height: 250px; padding: 20px;" v-loading="submitLoading">
      <el-form
        v-if="!isAdd"
        ref="addFormRef"
        :rules="rules"
        :model="addFormData"
        :show-message="false"
        label-width="71px"
        size="mini"
        class="form-item-small-margin-bottom form"
        style="height: 180px"
      >
        <el-form-item label="货位名称" prop="name">
          <ht-input
            v-model="addFormData.name"
            placeholder="编码名称（最多20个字符）"
            style="width: 300px;"
            maxlength="20"
          />
        </el-form-item>
      </el-form>
      <el-form
        v-else
        ref="formRef"
        :rules="rules"
        :model="formData"
        :show-message="false"
        label-width="70px"
        size="mini"
        class="form-item-small-margin-bottom form"
        style="height: 180px"
      >
        <div style="display: flex">
          <el-radio
            v-model="editTypeRadio"
            label="batch"
            style="line-height:32px"
            @change="editFormReset"
          >
            批量
          </el-radio>
          <batch-add
            v-show="editTypeRadio === 'batch'"
            v-model="formData.batchPositions"
            :label-name="'货位名称'"
          />
        </div>

        <div style="display: flex">
          <el-radio
            v-model="editTypeRadio"
            label="single"
            style="line-height:32px"
            @change="editFormReset"
          >
            单个
          </el-radio>
          <el-form-item
            v-show="editTypeRadio === 'single'"
            prop="singleAddName"
            label="货位名称"
            label-width="80px"
          >
            <ht-input
              v-model="formData.singleAddName"
              autocomplete="off"
              placeholder="编码名称（最多20个字符）"
              maxlength="20"
              style="width: 300px;"
            />
          </el-form-item>
        </div>
      </el-form>
      <div class="dialog-footer-align" style="margin: 10px 0">
        <el-button type="primary" size="mini" plain @click="submit">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="close">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import {
  reqGetStorePosition,
  reqStorePositionAdd,
  reqStorePositionBatch,
  reqStorePositionUpdate
} from "@/api/store/settings";
import batchAdd from "@/views/store/storeSettings/settings/components/batchAdd";
import { mapState } from "vuex";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";

const topHotkeys = new TopHotkeys();
const defaultFormData = {
  batchPositions: {
    type: 0,
    begin: "1",
    end: "1",
    length: 1
  },
  singleAddName: "",
  name: "",
  remark: ""
};
export default {
  name: "AddPosition",
  inject: ["laodData"],
  components: {
    batchAdd
  },
  data() {
    return {
      submitLoading: false,
      formData: { ...defaultFormData },
      addFormData: {},
      editTypeRadio: "batch",
      rules: {
        name: [{ required: true, message: "请输入货位名称", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/warehouseSettings", ["warehousesInfo"]),
    showTitle() {
      return this.editId !== 0 ? "编辑货位" : "新增货位";
    },
    isAdd() {
      return this.editId === 0;
    }
  },
  props: {
    editId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "$attrs.visible"(now) {
      if (now) {
        topHotkeys.bindHotkeys(this.$el);
        this.loadDetail();
      } else {
        topHotkeys.unbindHotkeys(this.$el);
      }
    }
  },
  methods: {
    loadDetail() {
      if (this.editId !== 0) {
        reqGetStorePosition(this.editId).then(res => {
          this.addFormData = res;
        });
      }
    },
    close() {
      this.formData = { ...defaultFormData };
      if (this.$refs.formRef) {
        this.$refs.formRef.resetFields();
      }
      if (this.$refs.addFormRef) {
        this.$refs.addFormRef.resetFields();
      }
      this.$emit("update:visible", false);
    },
    editFormReset() {
      this.$refs["formRef"].resetFields();
    },
    submit() {
      if (this.editId !== 0) {
        this.$refs["addFormRef"].validate((valid, err) => {
          if (valid) {
            this.submitLoading = true;
            reqStorePositionUpdate(this.addFormData)
              .then(() => {
                this.submitLoading = false;
                this.$message.success({
                  message: "修改货位 " + this.addFormData.name + " 成功"
                });
                this.$emit("reload");
                this.close();
              })
              .catch(() => {
                this.submitLoading = false;
              });
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
            return false;
          }
        });
      } else {
        const reqData = {};
        reqData.layerId = this.warehousesInfo.layerId;
        if (this.editTypeRadio === "single") {
          reqData.name = this.formData.singleAddName;
          this.$refs["formRef"].validate((valid, err) => {
            if (valid) {
              this.submitLoading = true;
              reqStorePositionAdd(reqData)
                .then(() => {
                  this.submitLoading = false;
                  this.$message.success({
                    message: "新增货位 " + this.formData.singleAddName + " 成功"
                  });
                  this.$emit("reload");
                  this.close();
                })
                .catch(() => {
                  this.submitLoading = false;
                });
            } else {
              const errTips = err[Object.keys(err)[0]][0].message;
              this.$message.warning({ message: errTips, showClose: true });
              return false;
            }
          });
        } else {
          this.submitLoading = true;
          reqData.name = this.makeBatchData(this.formData.batchPositions);
          reqData.layerId = this.warehousesInfo.layerId;
          reqStorePositionBatch(reqData)
            .then(() => {
              this.submitLoading = false;
              this.$message.success({ message: "新增成功" });
              this.$emit("reload");
              this.close();
            })
            .catch(() => {
              this.submitLoading = false;
            });
        }
      }
    },
    makeBatchData(data) {
      const res = {
        type: data.type,
        start: data.begin,
        end: data.end,
        numberDigit: data.length
      };
      return res;
    }
  }
};
</script>

<style lang="stylus" scoped>
.form
    margin 0 auto
</style>
