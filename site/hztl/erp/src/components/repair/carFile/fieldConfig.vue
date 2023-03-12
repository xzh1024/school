<template>
  <div>
    <ht-dialog
      v-bind="$attrs"
      title="车辆档案字段自定义"
      width="1250px"
      class="dialog-config-wrap"
      v-on="$listeners"
      append-to-body
    >
      <div class="form-wrap">
        <ht-card
          padding
          title="车辆基本信息"
          class="auto-card"
          v-if="baseInfo.length"
          style="background:#fff"
        >
          <div class="table-wrap">
            <div class="line">
              <div class="index">序号</div>
              <div class="column">名称</div>
              <div class="value">是否需要</div>
              <div class="value">是否必填</div>
            </div>
            <div
              class="line"
              v-for="(item, index) in this.baseInfo"
              :key="index"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="column">{{ item.name }}</div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledNeed"
                  v-model="item.isNeed"
                  @change="formRequireChang($event, 1, item)"
                />
              </div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledRequire || !item.isNeed"
                  v-model="item.isRequire"
                />
              </div>
            </div>
          </div>
        </ht-card>
        <ht-card
          padding
          title="车主信息"
          class="auto-card"
          style="background:#fff"
          v-if="customerInfo.length"
        >
          <div class="table-wrap">
            <div class="line">
              <div class="index">序号</div>
              <div class="column">名称</div>
              <div class="value">是否需要</div>
              <div class="value">是否必填</div>
            </div>
            <div
              class="line"
              v-for="(item, index) in this.customerInfo"
              :key="index"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="column">{{ item.name }}</div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledNeed"
                  @change="formRequireChang($event, 2, item)"
                  v-model="item.isNeed"
                />
              </div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledRequire || !item.isNeed"
                  v-model="item.isRequire"
                />
              </div>
            </div>
          </div>
        </ht-card>
        <ht-card
          padding
          title="高级属性"
          class="auto-card"
          style="background:#fff"
          v-if="advanceInfo.length"
        >
          <div class="table-wrap">
            <div class="line">
              <div class="index">序号</div>
              <div class="column">名称</div>
              <div class="value">是否需要</div>
              <div class="value">是否必填</div>
            </div>
            <div
              class="line"
              v-for="(item, index) in this.advanceInfo"
              :key="index"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="column">{{ item.name }}</div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledNeed"
                  @change="formRequireChang($event, 3, item)"
                  v-model="item.isNeed"
                />
              </div>
              <div class="value">
                <el-checkbox
                  :disabled="item.disabledRequire || !item.isNeed"
                  v-model="item.isRequire"
                />
              </div>
            </div>
          </div>
        </ht-card>
      </div>
      <div class="op">
        <el-button size="small" type="primary" @click="submit"
          >确定（F3）</el-button
        >
        <el-button size="small" @click="cancelHandle">取消（ESC）</el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { FIELDFEFINE, FIELDENUM } from "./fieldSetting";
import {
  getSystemParamsDetail,
  updateSystemParamsDetail
} from "@/api/base/base";
export default {
  name: "FileConfig",
  data() {
    return {
      field: [],
      FIELDENUM,
      baseInfo: [],
      customerInfo: [],
      advanceInfo: []
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.getSystemParamsDetail();
        }
      },
      immediate: true
    }
  },
  created() {
    this.getSystemParamsDetail();
  },
  methods: {
    getSystemParamsDetail() {
      getSystemParamsDetail({
        module: "repair",
        type: "customerVehicleDefine"
      }).then(res => {
        this.initConfig(res.value);
      });
    },
    formRequireChang(val, type, item) {
      // 如果是否需要为false，那么是否必填就必须为false
      if (!val) {
        if (type == 1) {
          this.baseInfo.forEach(sub => {
            if (sub.id === item.id) {
              sub.isRequire = false;
            }
          });
        }
        if (type == 2) {
          this.customerInfo.forEach(sub => {
            if (sub.id === item.id) {
              sub.isRequire = false;
            }
          });
        }
        if (type == 3) {
          this.advanceInfo.forEach(sub => {
            if (sub.id === item.id) {
              sub.isRequire = false;
            }
          });
        }
      }
      this.$forceUpdate();
    },
    initConfig(res) {
      this.baseInfo = [];
      this.customerInfo = [];
      this.advanceInfo = [];
      for (const key in FIELDFEFINE) {
        for (const subKey in FIELDFEFINE[key]) {
          if (key == 0) {
            this.baseInfo.push({
              pid: 0,
              id: subKey,
              name: res[key][subKey]?.name,
              disabledNeed: res[key][subKey]?.isNeed === 2,
              isNeed: res[key][subKey]?.isNeed ? true : false,
              disabledRequire: res[key][subKey]?.isRequire === 2,
              isRequire: res[key][subKey]?.isRequire ? true : false
            });
          }
          if (key == 1) {
            this.customerInfo.push({
              pid: 0,
              id: subKey,
              name: res[key][subKey]?.name,
              disabledNeed: res[key][subKey]?.isNeed === 2,
              isNeed: res[key][subKey]?.isNeed ? true : false,
              disabledRequire: res[key][subKey]?.isRequire === 2,
              isRequire: res[key][subKey]?.isRequire ? true : false
            });
          }
          if (key == 2) {
            if (subKey != "isSameCustomer" && subKey != "canDiscount") {
              this.advanceInfo.push({
                pid: 0,
                id: subKey,
                name: res[key][subKey]?.name,
                disabledNeed: res[key][subKey]?.isNeed === 2,
                isNeed: res[key][subKey]?.isNeed ? true : false,
                disabledRequire: res[key][subKey]?.isRequire === 2,
                isRequire: res[key][subKey]?.isRequire ? true : false
              });
            }
          }
        }
      }
    },
    submit() {
      const baseInfo = {};
      const customerInfo = {};
      const advanceInfo = {};
      this.baseInfo.forEach(item => {
        baseInfo[item.id] = {
          isNeed: item.disabledNeed ? 2 : item.isNeed ? 1 : 0,
          isRequire: item.disabledRequire ? 2 : item.isRequire ? 1 : 0,
          name: item.name
        };
      });
      this.customerInfo.forEach(item => {
        customerInfo[item.id] = {
          isNeed: item.disabledNeed ? 2 : item.isNeed ? 1 : 0,
          isRequire: item.disabledRequire ? 2 : item.isRequire ? 1 : 0,
          name: item.name
        };
      });
      this.advanceInfo.forEach(item => {
        advanceInfo[item.id] = {
          isNeed: item.disabledNeed ? 2 : item.isNeed ? 1 : 0,
          isRequire: item.disabledRequire ? 2 : item.isRequire ? 1 : 0,
          name: item.name
        };
      });
      updateSystemParamsDetail({
        module: "repair",
        type: "customerVehicleDefine",
        value: {
          0: baseInfo,
          1: customerInfo,
          2: advanceInfo
        }
      }).then(() => {
        this.$message({
          type: "success",
          message: "更新字段成功"
        });
        this.$emit("close");
      });
    },
    cancelHandle() {
      if (this.loading) return;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-config-wrap {
  // z-index: 3099 !important;
  ::v-deep {
    .el-dialog {
      top: 10% !important;
    }
    .el-dialog__body {
      padding: 5px !important;
    }
    .el-form-item {
      margin-bottom: 13px;
    }
  }
}
.form-wrap {
  padding: 5px;
  display: flex;
  height: 560px;
  justify-content: space-between;
  ::v-deep {
    .el-card {
      width: 295px;
      margin-bottom: 15px;
    }
  }
}
.op {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.table-wrap {
  background: #fff;
  border-left: solid 1px #eee;
  border-top: solid 1px #eee;
  max-height: 500px;
  overflow-y: scroll;
}
.line {
  display: flex;
  justify-content: flex-start;
  border-bottom: solid 1px #eee;
  .index {
    width: 40px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-right: solid 1px #eee;
  }
  .column {
    width: 180px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-right: solid 1px #eee;
  }
  .value {
    width: 70px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-right: solid 1px #eee;
  }
}
</style>
