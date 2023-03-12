<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    title="编辑移仓明细"
    width="720px"
    top="7vh"
    class="dialog-body"
    v-on="$listeners"
  >
    <el-row style="margin-bottom: 5px;">
      <ht-card title="配件信息">
        <div class="flex-container">
          <bill-panel
            v-loading="loading"
            :billData="moveingForm"
            :billEnum="PART_INFO_ENUM1"
          />
          <bill-panel
            v-loading="loading"
            :billData="moveingForm"
            :billEnum="PART_INFO_ENUM2"
          />
        </div>
      </ht-card>
    </el-row>
    <el-row>
      <ht-card title="移仓信息">
        <el-col :span="12">
          <bill-panel
            v-loading="loading"
            :billData="moveingForm"
            :billEnum="MOVE_INFO_ENUM"
          />
        </el-col>
        <el-col :span="12">
          <el-form
            ref="moveingForm"
            :model="moveingForm"
            :rules="moveingFormRules"
            :show-message="false"
            class="form-item-small-margin-bottom"
            label-width="71px"
            label-position="left"
            size="mini"
            style="margin-bottom: 10px; margin-left: 10px;"
          >
            <el-form-item prop="toWarehouseId" label="目标仓库">
              <ht-autoselect
                v-model="moveingForm.toWarehouseId"
                :default-value="moveingForm.toWarehouseName"
                :fetch-suggestions="
                  query =>
                    searchLoadManageWarehouses({
                      status: 0,
                      name: query,
                      managerCompanyId: store().userInfoMsg().companyId,
                      managerStaffId: store().userInfoMsg().staffId
                    })
                "
                remote
                filter-zero
                :trigger-on-focus="false"
                highlight-first-item
                class="switch-focus focus-toWarehouseId"
                placeholder="所属仓库"
                @intput-enter="debouncedHandleInputEnter"
                @change="handleWarehouseChange"
              />
            </el-form-item>
            <el-form-item label="目标货位" prop="toPositionId">
              <ht-autoselect
                v-if="isEasyMode"
                v-model="moveingForm.toPositionId"
                :keep-input-value="moveingForm.toPositionName"
                :fetch-suggestions="
                  query => getPositions(moveingForm.toWarehouseId, query)
                "
                :default-value="moveingForm.toPositionName"
                remote
                filter-zero
                keep-input
                no-match-text=""
                :trigger-on-focus="false"
                class="switch-focus focus-toPositionId"
                placeholder="请选择"
                @input-change="handlePositionNameChange"
                @intput-enter="debouncedHandleInputEnter"
                @change="handlePositionIdChange"
              />
              <ht-autoselect
                v-else
                v-model="moveingForm.toPositionId"
                :fetch-suggestions="
                  query => getPositions(moveingForm.toWarehouseId, query)
                "
                :default-value="moveingForm.toPositionName"
                remote
                filter-zero
                :trigger-on-focus="false"
                highlight-first-item
                class="switch-focus focus-toPositionId"
                placeholder="请选择"
                @intput-enter="debouncedHandleInputEnter"
                @change="handlePositionIdChange"
              />
            </el-form-item>
            <el-form-item label="移动数量" prop="movingQty">
              <ht-format-number
                v-model="moveingForm.movingQty"
                :min="0"
                class="switch-focus focus-movingQty"
                min-out
                precision-type="qty"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
            <el-form-item label="备注">
              <ht-input
                v-model="moveingForm.remark"
                class="switch-focus focus-remark"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </ht-card>
    </el-row>

    <div slot="footer" class="dialog-footer-align">
      <el-button
        v-loading="loading"
        type="primary"
        size="mini"
        class="switch-focus focus-sure"
        plain
        @click="handleSubmit"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleHide">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { searchMixin } from "@/mixins";
import { mapState } from "vuex";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import BillPanel from "@/components/bill-panel/BillPanel";

const PART_INFO_ENUM1 = [
  { label: "配件编码", value: "code" },
  { label: "配件品牌", value: "brand" },
  { label: "性质", value: "property" },
  { label: "批次号", value: "batchNo" },
  { label: "货主", value: "ownerCompanyName" }
];
const PART_INFO_ENUM2 = [
  { label: "配件名称", value: "name" },
  { label: "产地", value: "productionPlace" },
  { label: "车型", value: "wehModel" },
  { label: "供应商", value: "supplierName" }
];
const MOVE_INFO_ENUM = [
  { label: "原仓库", value: "warehouseName" },
  { label: "原货位", value: "positionName" },
  { label: "移动前数量", value: "availableQty" }
];
import * as store from "@/utils/store";

let oldKeyScope;
const defaultForm = {
  toWarehouseId: null,
  toWarehouseName: "",
  toPositionId: null,
  toPositionName: "",
  movingQty: ""
};

export default {
  name: "EditBox",
  components: { BillPanel },
  mixins: [searchMixin],
  props: {
    formData: Object
  },
  data() {
    return {
      PART_INFO_ENUM1,
      PART_INFO_ENUM2,
      MOVE_INFO_ENUM,
      loading: false,
      moveingForm: { ...defaultForm },
      moveingFormRules: {
        toWarehouseId: [
          {
            required: true,
            trigger: "change",
            message: "请选择仓库！"
          }
        ],
        toPositionId: [
          {
            required: true,
            trigger: "change",
            message: "请选择货位！"
          }
        ],
        movingQty: [
          {
            required: true,
            trigger: "change",
            message: "请输入数量！"
          }
        ]
      },
      ruleFormColumns: [
        { prop: "name", label: "", width: "110" },
        { prop: "content", label: "", width: "130" }
      ],
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      keyScope: Symbol("moveingForm"),
      cachePositionId: null
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    })
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.$nextTick(() => {
            this.updateFocusData({
              initial: "focus-toWarehouseId"
            });
            this.setKeyScope(this.keyScope);
            this.$refs.moveingForm.clearValidate();
          });
          this.initFormData();
        } else if (oldValue) {
          this.positionName = "";
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      if (!e.ctrlKey) {
        switch (handler.key) {
          case "f3":
            this.handleSubmit();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({
              type: handler.key
            });
            break;
        }
      }
    });
  },
  methods: {
    store() {
      return store;
    },
    initFormData() {
      this.moveingForm = { ...defaultForm, ...this.formData };
      if (this.formData.toWarehouseId) {
        this.$set(
          this.moveingForm,
          "toWarehouseId",
          this.formData.toWarehouseId
        );
      }
      if (this.formData.toWarehouseName) {
        this.$set(
          this.moveingForm,
          "toWarehouseName",
          this.formData.toWarehouseName
        );
      }
      if (this.moveingForm.toPositionId) {
        this.cachePositionId = this.moveingForm.toPositionId;
      }
      console.log("初始ID:", this.cachePositionId);
      if (this.moveingForm.toWarehouseId) {
        this.handleWarehouseChange(this.moveingForm.toWarehouseId);
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    handleHide() {
      this.$emit("update:visible", false);
    },
    async handleWarehouseChange(warehouseId) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === this.cachePositionId
        );
        console.log(position);
        if (position) {
          this.$set(this.moveingForm, "toPositionId", position.id);
          this.$set(this.moveingForm, "toPositionName", position.name);
        } else {
          this.$set(this.moveingForm, "toPositionId", null);
          this.$set(this.moveingForm, "toPositionName", "");
        }
      } else {
        this.$set(this.moveingForm, "toPositionId", null);
        this.$set(this.moveingForm, "toPositionName", "");
      }
      console.log(this.moveingForm);
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId) {
      if (!positionId) return;
      this.cachePositionId = positionId;
      console.log("当前ID：", this.cachePositionId);
    },
    handlePositionNameChange(positionName) {
      if (positionName) {
        this.moveingForm.toPositionName = positionName.replace(
          ALL_SPACE_REG_EXP,
          ""
        );
      } else {
        this.moveingForm.toPositionName = "";
      }
    },
    async handleSubmit() {
      if (this.loading) {
        return;
      }

      if (
        this.isEasyMode &&
        !this.moveingForm.toPositionId &&
        this.moveingForm.toPositionName
      ) {
        this.loading = true;
        if (
          this.moveingForm.toPositionName &&
          this.moveingForm.toPositionName.length > QUICK_ADD_POSITION_LEN
        ) {
          this.$message.warning({
            message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
            showClose: true
          });
          this.loading = false;
          return;
        }

        const positionIds = await quickGetPositions([
          {
            warehouseId: this.moveingForm.toWarehouseId,
            name: this.moveingForm.toPositionName
          }
        ]);
        this.loading = false;
        if (!positionIds) {
          return;
        }

        this.moveingForm.toPositionId = positionIds[0];
      }

      this.$refs["moveingForm"].validate((valid, err) => {
        if (valid) {
          this.$emit("handleMovingSumbit", { ...this.moveingForm });
          this.handleHide();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
