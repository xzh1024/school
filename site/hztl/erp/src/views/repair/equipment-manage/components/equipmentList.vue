<template>
  <div class="equipment-box" style="height: 100%">
    <el-button
      type="primary"
      size="mini"
      @click="addEquipment"
      style="margin-bottom:10px"
      v-if="hasBelongsPermWithoutRoute('create', 'basics.device')"
    >
      添加设备
    </el-button>
    <ht-setting-table
      v-loading="loading"
      :tableName="tableName"
      :data="tableData"
      :selectedRows.sync="selectedRows"
      :columns="clcolumns"
      class="equipment-table"
    />
    <ht-dialog
      :visible="relVisible"
      :title="
        removeBindStatus
          ? '解绑外部设备（云诊车诊断仪）'
          : '添加外部设备（云诊车诊断仪）'
      "
      width="550px"
      v-on="$listeners"
      @close="cancelHandle"
    >
      <el-form
        ref="releForm"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        size="mini"
        style="margin: 0 60px;"
        class="equipment-item"
        label-width="110px"
      >
        <el-form-item
          v-if="!removeBindStatus"
          label="绑定公司"
          prop="companyId"
        >
          <ht-select
            filterable
            v-model="ruleForm.companyId"
            :options="companyList"
            :trigger-on-focus="false"
            class="switch-focus focus-number"
            placeholder="请选择设备需绑定的公司"
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="设备编码/SN" prop="snNumber">
          <el-input
            :disabled="removeBindStatus"
            v-model="ruleForm.snNumber"
            placeholder="设备编码/SN"
          ></el-input>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="phone">
          <el-input
            :disabled="removeBindStatus"
            v-model="ruleForm.phone"
            placeholder="绑定手机号"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsCaptcha">
          <ht-input
            v-model="ruleForm.smsCaptcha"
            placeholder="绑定手机短信验证码"
            maxlength="6"
          >
            <el-button slot="append" :disabled="disabled" @click="getCode">
              {{ disabled ? nums + "s" : "获取验证码" }}
            </el-button>
          </ht-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer-align" style="margin-top: 20px; ">
        <el-button
          :loading="loading"
          type="primary"
          size="mini"
          plain
          @click="submitAddEquipments"
        >
          确定 (F3）
        </el-button>
        <el-button
          :disabled="loading"
          type="primary"
          size="mini"
          plain
          @click="cancelHandle"
        >
          取消 (Esc)
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { validatePhone } from "@/utils/validate";
import { captchasSmes } from "@/api/loginregister";
import {
  devicesList,
  devicesAdd,
  devicesDel
} from "@/api/basis/equipmentManage/index";
import { hotkeyMixin } from "@/mixins";

export default {
  mixins: [hotkeyMixin],
  props: {
    companyIds: {
      type: Array,
      default: Object
    },
    companyList: {
      type: Array,
      default: Object
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.initVehicleLevel();
        }
      },
      immediate: true
    },
    companyIds: {
      handler() {
        this.getDevicesList();
      },
      deep: true
    }
  },
  data() {
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 70,
      cantExport: true,
      render: (value, row) => (
        <div class="table-button">
          <el-button
            type="text"
            size="mini"
            v-show={this.hasBelongsPermWithoutRoute(
              "delete",
              "basics.device",
              row.belongs
            )}
            on-click={e => this.removeBind(row, e)}
          >
            解绑
          </el-button>
        </div>
      )
    };
    return {
      loading: false,
      relVisible: false,
      disabled: false,
      removeBindStatus: false,
      nums: 120,
      timer: {},
      ruleForm: {},
      msgId: "",
      rules: {
        companyId: [
          {
            required: true,
            message: "请选择设备需绑定的公司！"
          }
        ],
        snNumber: [
          {
            required: true,
            message: "请输入设备编码/SN！"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号！"
          },
          {
            max: 11,
            message: "手机号最长11位！"
          }
        ],
        smsCaptcha: [
          {
            required: true,
            message: "请输入短信验证码！"
          },
          {
            max: 6,
            message: "请输入6位短信验证码！"
          }
        ]
      },
      tableName: "equipmentTable",
      tableData: [],
      selectedRows: [],
      clcolumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "companyName",
          label: "绑定分公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "snNumber",
          label: "设备编码/SN",
          width: CELL_WIDTH.creditCode
        },
        {
          prop: "phone",
          label: "绑定手机号",
          width: CELL_WIDTH.phone
        },
        {
          prop: "staffName",
          label: "绑定人",
          width: CELL_WIDTH.personName
        },
        {
          prop: "createdAt",
          label: "绑定时间",
          type: "time",
          width: CELL_WIDTH.time
        },
        controlsColumn
      ]
    };
  },
  methods: {
    getDevicesList() {
      this.loading = true;
      this.tableData = [];
      this.$emit("tableLn", 0);
      const data = {
        companyIds: this.companyIds
      };
      devicesList(data)
        .then(res => {
          this.tableData = res.rows || [];
          this.$emit("tableLn", this.tableData.length);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addEquipment() {
      clearInterval(this.timer);
      this.nums = "120";
      this.msgId = "";
      this.disabled = false;
      this.relVisible = true;
      this.removeBindStatus = false;
      this.ruleForm = {};
    },
    cancelHandle() {
      clearInterval(this.timer);
      this.disabled = false;
      this.nums = "120";
      this.relVisible = false;
      this.$nextTick(() => {
        this.$refs["releForm"].resetFields();
      });
    },
    submitAddEquipments() {
      if (!this.removeBindStatus) {
        for (const key in this.ruleForm) {
          if (key != "companyId") {
            this.ruleForm[key] = this.ruleForm[key].replace(/^\s+|\s+$/g, "");
          }
        }
      }
      this.$refs["releForm"].validate(valid => {
        if (valid) {
          if (this.removeBindStatus) {
            // console.log(this.ruleForm);
            // 解绑
            // const data = {
            //   snNumber: this.ruleForm.snNumber,
            //   phone: this.ruleForm.phone,
            //   smsCaptcha: this.ruleForm.smsCaptcha,
            //   msgId: this.msgId
            // };
            const data = JSON.parse(JSON.stringify(this.ruleForm));
            data.msgId = this.msgId;

            devicesDel(data).then(() => {
              this.getDevicesList();
              this.relVisible = false;
              this.$message({
                message: "解绑成功！",
                type: "success"
              });
              this.$nextTick(() => {
                this.$refs["releForm"].resetFields();
              });
            });
          } else {
            const data = JSON.parse(JSON.stringify(this.ruleForm));
            data.msgId = this.msgId;
            // 添加
            devicesAdd(data).then(() => {
              this.getDevicesList();
              this.relVisible = false;
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.$nextTick(() => {
                this.$refs["releForm"].resetFields();
              });
            });
          }
        } else {
          return false;
        }
      });
    },
    removeBind(row) {
      this.cluamNum(0);
      this.nums = "120";
      this.disabled = false;
      this.msgId = "";
      this.relVisible = true;
      this.removeBindStatus = true;
      this.ruleForm = {};
      this.ruleForm.companyId = row.companyId;
      this.ruleForm.snNumber = row.snNumber;
      this.ruleForm.phone = row.phone;
      this.ruleForm.id = row.id;
      // this.$refs["releForm"].resetFields();
    },
    getCode() {
      // 获取短信验证码
      if (
        this.ruleForm.phone &&
        this.ruleForm.phone.length <= 11 &&
        validatePhone(this.ruleForm.phone)
      ) {
        this.disabled = true;
        const params = {
          phone: this.ruleForm.phone,
          erpType: 1
        };
        captchasSmes(params)
          .then(res => {
            this.cluamNum(120);
            this.msgId = res;
          })
          .catch(() => {
            this.cluamNum(0);
            this.disabled = false;
          });
      } else {
        this.$message({
          message: "请输入正确手机号码",
          type: "warning"
        });
      }
    },
    // 重新获取验证码倒计时
    cluamNum(num) {
      let times = num;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        if (times > 0) {
          times--;
          this.nums = times;
        } else {
          this.disabled = false;
          this.nums = "120";
          clearInterval(this.timer);
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.equipment-box {
  ::v-deep {
    .equipment-item {
      .el-form-item {
        margin-bottom: 15px !important;
      }
    }
    .equipment-table {
      height: calc(100% - 38px);
    }
  }
}
</style>
