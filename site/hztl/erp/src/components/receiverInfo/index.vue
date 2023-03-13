<template>
  <section @click.stop="setKeyScope(keyScope)">
    <div class="input-container">
      <ht-input :value="displayValue" readonly size="mini" />
      <el-button
        :disabled="relDisabled"
        type="primary"
        size="mini"
        @click.stop="openReceiverAddressBox"
      >
        更改收货地址
      </el-button>
    </div>
    <ht-dialog
      :title="title"
      :visible.sync="relVisible"
      v-bind="$attrs"
      width="70%"
      v-on="$listeners"
    >
      <div v-show="!isEditAdress">
        <ht-table
          :loading="tableLoading"
          :data="tableData"
          :columns="tableColumns"
          :set-height="false"
          :key-scope="keyScope"
          :selected-rows.sync="selectedRows"
          style="width: 100%"
          height="364"
          @hotkeysUp="handleSelectAddressKeyCode"
          @rowOperation="handleRow"
        />
        <div slot="footer" class="dialog-footer-align" style="margin-top: 20px">
          <el-button
            :disabled="cantSure"
            plain
            type="primary"
            size="mini"
            @click.stop="sureHandle"
          >
            确定（F3）
          </el-button>
          <el-button plain type="primary" size="mini" @click.stop="addHandle">
            新增地址（F2）
          </el-button>
          <el-button plain type="primary" size="mini" @click.stop="cacelHandle">
            取消（Esc）
          </el-button>
        </div>
      </div>
      <div v-show="isEditAdress">
        <el-form
          ref="header"
          v-switch-focus="focusData"
          :rules="rules"
          :model="header"
          :show-message="false"
          label-width="75px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="收货人" prop="receiver">
                <ht-input
                  v-model="header.receiver"
                  class="switch-focus focus-receiver"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="phone">
                <ht-input
                  v-model="header.phone"
                  class="switch-focus focus-phone"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="默认地址" prop="isDefault">
                <el-switch v-model="header.isDefault" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="13">
              <el-form-item prop="areaIds" label="收货地址">
                <area-select
                  v-model="header.areaIds"
                  placeholder="请选择"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label-width="0" prop="address">
                <ht-input
                  v-model="header.address"
                  placeholder="街道、门牌号等"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer-align" style="margin-top: 10px">
          <el-button plain type="primary" size="mini" @click.stop="saveHandle">
            保存（F3）
          </el-button>
          <el-button plain type="primary" size="mini" @click.stop="backHandle">
            返回
          </el-button>
          <el-button plain type="primary" size="mini" @click.stop="cacelHandle">
            取消（Esc）
          </el-button>
        </div>
      </div>
    </ht-dialog>
  </section>
</template>

<script>
import {
  createAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress
} from "@/api/receiverAddress";
import { validatePhone, validatePhoneTips } from "@/utils/validate";
import { CELL_WIDTH } from "@/constants";
import { formateAddress } from "@/utils/formateAddress";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { AreaSelect } from "@/components/select";
import { mapState } from "vuex";

let oldKeyScope;
const checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入电话号码"));
  }
  if (!validatePhone(value)) {
    return callback(new Error(validatePhoneTips));
  } else {
    return callback();
  }
};
const defaultFocusData = {
  updateIndex: 0,
  initial: "focus-receiver",
  type: null
};
const defaultHeader = {
  areaIds: []
};

export default {
  name: "ReceiverInfo",
  components: { AreaSelect },
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyScope: Symbol("ReceiverInfo"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        ...defaultFocusData
      },
      canHandleRow: true,
      title: "收货地址",
      isEditAdress: false,
      columns: [
        { prop: "controls", label: "操作", width: "60" },
        {
          prop: "receiver",
          label: "收货人",
          width: CELL_WIDTH.personName
        },
        { prop: "phone", label: "联系电话", width: CELL_WIDTH.phone },
        {
          prop: "address",
          label: "收货地址",
          width: CELL_WIDTH.address,
          formatter: (value, row) => formateAddress(row)
        },
        {
          prop: "isDefault",
          label: "默认地址",
          width: CELL_WIDTH.isDefault,
          render: (value, row) => {
            return value ? (
              <span class="icon operation-icon icon-selected-info" />
            ) : (
              <span
                class="icon operation-icon icon-select-info"
                on-click={e => this.setDefaultAdress(e, row)}
              />
            );
          }
        }
      ],
      tableData: [],
      selectedRows: [],
      tableLoading: false,
      tableSelection: [],
      header: { ...defaultHeader },
      id: null,
      type: "addHandle",
      rules: {
        receiver: [
          { required: true, message: "请填写姓名", trigger: "change" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "change" }],
        areaIds: [{ required: true, message: "请选择区域", trigger: "change" }],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("admin/receiverInfo", [
      "receiverInofData",
      "defaultReceiverInfo"
    ]),
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function editHandle(row, e) {
        e.stopPropagation();
        self.editHandle(row);
      }
      function deleteHandle(row, e, index) {
        e.stopPropagation();
        self.deleteHandle(row, index);
      }
      return this.columns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value, row, index) => (
              <div>
                <el-tooltip placement="top" content="编辑" enterable={false}>
                  <span
                    class="icon operation-icon icon-edit-info"
                    on-click={e => editHandle(row, e)}
                  />
                </el-tooltip>
                <el-tooltip placement="top" content="编辑" enterable={false}>
                  <span
                    class="icon operation-icon icon-delete-info"
                    on-click={e => deleteHandle(row, e, index)}
                  />
                </el-tooltip>
              </div>
            )
          };
        }
        return item;
      });
    },
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    relDisabled() {
      if (this.disabled === undefined) {
        return (this.elForm || {}).disabled;
      } else {
        return !!this.disabled;
      }
    },
    cantSure() {
      return !(
        this.tableSelection.length === 1 || this.tableSelection.length === 0
      );
    },
    displayValue() {
      if (
        !this.value.receiverName ||
        !this.value.receiverAddress ||
        !this.value.receiverPhone ||
        !this.value.receiverAreaNames ||
        !this.value.receiverAreaNames.length
      ) {
        return "";
      } else {
        const receiver = "收货人：" + this.value.receiverName;
        const phone = "（" + this.value.receiverPhone + "）";
        const address = "地址：" + formateAddress(this.value);
        return receiver + phone + "    " + address;
      }
    }
  },
  watch: {
    relVisible(value) {
      if (value) {
        this.initTable();
        oldKeyScope = hotkeys.getScope();
        setTimeout(() => {
          this.setKeyScope(this.keyScope);
        }, 100);
      } else {
        this.title = "收货地址";
        this.isEditAdress = false;
        hotkeys.setScope(oldKeyScope);
      }
    },
    isEditAdress(val) {
      if (val) {
        this.updateFocusData({ initial: "focus-receiver" });
        this.canHandleRow = true;
      } else {
        this.canHandleRow = false;
      }
    }
  },
  mounted() {
    this.initTable();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleSelectAddressKeyCode(e) {
      switch (e.code) {
        case "F2":
          this.addHandle();
          break;
        case "F3":
          if (this.isEditAdress) {
            this.saveHandle();
          } else {
            this.sureHandle();
          }
          break;
        default:
          return;
      }
    },
    handleRow(row) {
      if (!this.canHandleRow) return;
      this.editHandle(row);
    },
    setReceiverInfo(val) {
      const receiverDetail = {
        receiverName: val.receiver,
        receiverPhone: val.phone,
        receiverAddress: val.address,
        receiverAreaNames: [val.provinceName, val.cityName, val.areaName],
        receiverAreaId: val.areaId,
        receiverAddressId: val.id
      };
      this.$emit("change", receiverDetail);
    },
    checkReceiverInfo(val) {
      if (
        this.value.receiverName === val.receiver &&
        this.value.receiverPhone === val.phone &&
        this.value.receiverAddress === val.address &&
        this.value.receiverAreaNames[0] === val.provinceName &&
        this.value.receiverAreaNames[1] === val.cityName &&
        this.value.receiverAreaNames[2] === val.areaName
      ) {
        return;
      }
      this.setReceiverInfo(val);
    },
    openReceiverAddressBox() {
      this.relVisible = true;
    },
    async initTable() {
      this.tableLoading = true;
      try {
        await this.$store.dispatch("admin/receiverInfo/loadAll");
        this.tableData = [...this.receiverInofData];
        let selectedRow;
        if (this.selectedRows.length) {
          selectedRow = this.tableData.find(
            item => item.id === this.selectedRows[0].id
          );
        }
        this.selectedRows = selectedRow
          ? [selectedRow]
          : this.tableData.length
          ? [this.tableData[0]]
          : [];
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    setDefaultAdress(e, row) {
      e.stopPropagation();
      setDefaultAddress(row.id)
        .then(async () => {
          await this.initTable();
          this.selectedRows = [this.tableData[0]];
          this.$message({
            message: "设置默认地址成功!",
            type: "success",
            showClose: true
          });
        })
        .catch(() => {});
    },
    addHandle() {
      this.title = "编辑收货地址";
      this.isEditAdress = true;
      this.header = { ...defaultHeader };
      this.type = "add";
    },
    editHandle(row) {
      this.title = "编辑收货地址";
      this.isEditAdress = true;
      this.header = { ...row };
      this.id = row.id;
      this.type = "edit";
    },
    saveHandle() {
      this.$refs.header.validate((valid, err) => {
        if (valid) {
          const params = {
            ...this.header,
            areaId:
              this.header.areaIds && this.header.areaIds.length
                ? this.header.areaIds[this.header.areaIds.length - 1]
                : null
          };
          if (this.type === "add") {
            createAddress(params)
              .then(() => {
                this.initTable();
                this.$message({
                  type: "success",
                  message: "地址已添加",
                  showClose: true
                });
                this.backHandle();
              })
              .catch(() => {});
          } else {
            updateAddress(params, this.id)
              .then(() => {
                this.initTable();
                this.$message({
                  type: "success",
                  message: "地址已更新",
                  showClose: true
                });
                this.backHandle();
              })
              .catch(() => {});
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    deleteHandle(row, index) {
      this.$confirm("确定要删除 " + (index + 1) + " 号地址吗？", {
        type: "warning",
        showClose: true
      })
        .then(() => {
          deleteAddress(row.id)
            .then(() => {
              if (this.tableData.length < 2) {
                this.tableData = [];
              }
              this.initTable();
              this.$message({
                type: "success",
                message: "地址已删除",
                showClose: true
              });
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    backHandle() {
      this.title = "收货地址";
      this.isEditAdress = false;
    },
    sureHandle() {
      if (this.selectedRows.length) {
        this.checkReceiverInfo(this.selectedRows[0]);
      }
      this.cacelHandle();
    },
    cacelHandle() {
      this.relVisible = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.input-container {
    display: flex;
}

.dialog-footer {
    margin-top: 10px;
    text-align: right;
}
</style>
