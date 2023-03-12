<template>
  <ht-dialog
    title="回访详情"
    v-bind="$attrs"
    width="1040px"
    top="10vh"
    @close="cancelHandle"
  >
    <div>
      <div class="repair-order-content" style="height: 600px">
        <el-row :gutter="10" style="height:100%">
          <el-col :span="10">
            <ht-card title="工单信息">
              <table class="order-table" cellspacing="0">
                <tr>
                  <td>客户名称</td>
                  <td>{{ billsDetail.vehicle.cooperatorName || "-" }}</td>
                </tr>
                <tr>
                  <td>联系电话</td>
                  <td>{{ billsDetail.vehicle.cooperatorPhone || "-" }}</td>
                </tr>
                <tr>
                  <td>车牌号</td>
                  <td>{{ billsDetail.vehicle.plateNumber || "-" }}</td>
                </tr>
                <tr>
                  <td>车型</td>
                  <td>{{ billsDetail.vehicle.vehicleGroup || "-" }}</td>
                </tr>
                <tr>
                  <td>会员等级</td>
                  <td>
                    <span
                      v-if="
                        billsDetail.vehicle &&
                          billsDetail.vehicle.member &&
                          billsDetail.vehicle.member.grade
                      "
                      >{{ billsDetail.vehicle.member.grade.name || "-" }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>源工单号</td>
                  <td>{{ billsDetail.billNo || "-" }}</td>
                </tr>
                <tr>
                  <td>所属门店</td>
                  <td>{{ billsDetail.companyName || "-" }}</td>
                </tr>
                <tr>
                  <td>工单日期</td>
                  <td>{{ dateFormat(billsDetail.createdAt) || "-" }}</td>
                </tr>
                <tr>
                  <td>接待顾问</td>
                  <td>{{ billsDetail.receptionManName || "-" }}</td>
                </tr>
                <tr>
                  <td>业务类型</td>
                  <td>{{ billsDetail.businessCategoryName || "-" }}</td>
                </tr>
              </table>
            </ht-card>
            <ht-card title="服务项目" style="margin-top: 5px;height:218px;">
              <el-table :data="visitTableData" border height="160px">
                <template>
                  <el-table-column label="序号" width="50">
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column label="项目名字" prop="itemName">
                  </el-table-column>
                  <el-table-column
                    label="主修人"
                    prop="technician.majorTechnicianName"
                    width="100"
                  >
                  </el-table-column>
                  <el-table-column label="备注" prop="remark">
                  </el-table-column>
                </template>
              </el-table>
            </ht-card>
          </el-col>
          <el-col :span="14" style="height:100%">
            <ht-card title="回访信息" no-padding style="height:100%">
              <div style="height:565px;padding:10px;overflow-y:auto">
                <table class="order-table" cellspacing="0">
                  <tr>
                    <td>回访状态</td>
                    <td width="150px">
                      {{ VisitObj.status == "tohandle" ? "待处理" : "" }}
                      {{ VisitObj.status == "handling" ? "处理中" : "" }}
                      {{ VisitObj.status == "completed" ? "已完成" : "" }}
                    </td>
                    <td>回访人</td>
                    <td>{{ VisitObj.reviewManName }}</td>
                  </tr>
                  <tr>
                    <td>回访单生成时间</td>
                    <td>
                      {{ VisitObj.createdAt || "-" }}
                    </td>
                    <td>首次处理时间</td>
                    <td>
                      {{ VisitObj.firstProcessingTime || "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>最近更新时间</td>
                    <td>{{ VisitObj.updatedAt || "-" }}</td>
                    <td>完成时间</td>
                    <td>
                      {{
                        VisitObj.status == "completed"
                          ? VisitObj.updatedAt
                          : "-"
                      }}
                    </td>
                  </tr>
                </table>

                <p>
                  回访问题
                  <span style="float:right;padding-right: 5px;">
                    平均得分：{{ averageScore }}分
                  </span>
                </p>
                <table class="order-table2" cellspacing="0">
                  <tr>
                    <th>问题</th>
                    <th width="200px">评分</th>
                  </tr>
                  <tr v-for="(list, ind) in visitDetail.details" :key="ind">
                    <td>{{ list.name }}</td>
                    <td>
                      <el-rate
                        :class="
                          VisitObj.status != 'completed' ? 'rate-t' : 'rate-d'
                        "
                        v-model="list.score"
                        :max="5"
                        @change="scoreChange"
                        :allow-half="true"
                        disabled-void-icon-class="el-icon-star-off disabled-rate"
                        :disabled="VisitObj.status == 'completed'"
                      >
                      </el-rate>
                      <span style="position:relative;top:3px">
                        {{ list.score * 2 }}分
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="height: 30px;line-height: 30px;margin: 10px 0">
                  回访备注
                  <div style="float:right">
                    <el-select
                      v-model="remarkValue"
                      size="mini"
                      placeholder="快速备注"
                      @change="remarkChange"
                      v-if="VisitObj.status != 'completed'"
                    >
                      <el-option
                        v-for="item in remarkOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注信息"
                  v-model="visitDetail.remark"
                  :disabled="VisitObj.status == 'completed'"
                >
                </el-input>
                <p>
                  是否无效回访
                  <el-radio-group
                    v-if="VisitObj.status != 'completed'"
                    v-model="visitDetail.reviewStatus"
                  >
                    <el-radio label="无效">是</el-radio>
                    <el-radio label="有效">否</el-radio>
                  </el-radio-group>
                  <span
                    v-if="VisitObj.status == 'completed'"
                    class="main-color"
                  >
                    {{ visitDetail.reviewStatus == "无效" ? "是" : "" }}
                    {{ visitDetail.reviewStatus == "有效" ? "否" : "" }}
                  </span>
                </p>
                <div>
                  <p style="margin-bottom:5px">转交记录</p>
                  <div class="transfer-box">
                    <div
                      v-for="(list, ind) in handlersList"
                      :key="ind"
                      style="margin-bottom: 10px"
                    >
                      <label style="float:left;color: #909999">
                        {{ list.createdAt }}
                      </label>
                      <div style="margin-left: 150px">
                        <span>
                          「{{ list.name }}」转交给 「{{ list.toName }}」
                        </span>
                        <span style="display:block;padding:5px 0 0 5px">
                          转交备注：{{ list.remark || "无" }}
                        </span>
                      </div>
                    </div>
                    <div v-if="handlersList.length == 0">
                      <span style="color: #909399">无</span>
                    </div>
                  </div>
                </div>
              </div>
            </ht-card>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer-align">
        <el-button
          v-if="VisitObj.status != 'completed'"
          type="primary"
          size="mini"
          @click="saveHandle(1)"
        >
          保存
        </el-button>
        <el-button
          v-if="
            VisitObj.status != 'completed' &&
              hasBelongsPermWithoutRoute(
                'trans',
                'repairs.review.bill',
                VisitObj.belongs
              )
          "
          type="primary"
          size="mini"
          @click="transferHandle"
        >
          转交
        </el-button>
        <el-button
          v-if="
            VisitObj.status != 'completed' &&
              hasBelongsPermWithoutRoute(
                'complete',
                'repairs.review.bill',
                VisitObj.belongs
              )
          "
          type="primary"
          size="mini"
          @click="saveHandle(2)"
        >
          完成（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          {{ VisitObj.status != "completed" ? "取消" : "关闭" }}（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import { baseDictionary } from "@/api/base/base"; // 基础信息
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { getBillsDetail, getBillsItems } from "@/api/repairs/bills"; // 工单信息
import { dateFormat } from "@/utils/date";
import { getSettings, visitUpdate } from "@/api/repairs/visit";
export default {
  name: "visitDialog",
  props: {
    VisitObj: {
      type: Object
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          setTimeout(() => {
            this.getBaseDictionarys();
            this.getUsers();
            if (this.VisitObj.id) {
              this.load();
            }
          }, 100);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      billsDetail: {
        vehicle: {
          plateNumber: ""
        }
      }, //工单详情
      visitTableData: [],
      setting: {}, // 设置信息
      visitDetail: {
        reviewStatus: "", // 回访状态 有效 无效
        remark: "", // 回访备注
        details: [],
        type: "" // 类型：保存 完成
      },
      averageScore: 0,
      remarkValue: "",
      remarkOptions: [
        "无人接听",
        "非车主本人电话",
        "中途挂断",
        "车主不愿再接受回访",
        "车主忙，换个时间回访",
        "空号"
      ],
      userOptions: [], // 接待用户
      repairBusinessCategoryList: [], // 预约项目类型列表
      handlersList: [], // 转交记录
      dateFormat
    };
  },
  methods: {
    load() {
      this.visitDetail.reviewStatus = this.VisitObj.reviewStatus;
      this.visitDetail.remark = this.VisitObj.remark;
      this.getSetting();
      this.getBillsDetails(this.VisitObj.sourceBillId);
      this.handlersList = [];
      if (this.VisitObj.handlers && this.VisitObj.handlers.length > 1) {
        const handlers = this.VisitObj.handlers;
        for (let i = 1; i < handlers.length; i++) {
          this.handlersList.push({
            name: handlers[i - 1].staffName,
            toName: handlers[i].staffName,
            remark: handlers[i].remark,
            createdAt: handlers[i].createdAt
          });
        }
      }
    },
    // 获取工单详情
    getBillsDetails(id) {
      getBillsDetail(id).then(res => {
        this.billsDetail = res;
      });
      getBillsItems({ billId: id }).then(res => {
        this.visitTableData = res;
      });
    },
    // 获取设置信息
    getSetting() {
      const params = {
        module: "repair",
        type: "reviewSet"
      };
      getSettings(params).then(res => {
        res.value.questions.forEach(item => {
          item.score = 0;
        });
        this.setting = JSON.parse(JSON.stringify(res.value));
        // console.log(this.VisitObj.details);
        if (!this.VisitObj.details) {
          const arrayFilter = this.setting.questions.filter(function(item) {
            return item.status == "enable";
          });
          this.visitDetail.details = arrayFilter;
        } else {
          this.VisitObj.details.forEach(item => {
            item.score = parseFloat(item.score);
          });
          this.visitDetail.details = [];
          // setTimeout(function(){
          // },100);
          this.$set(this.visitDetail, "details", this.VisitObj.details);
        }
        this.scoreChange();
      });
    },
    // 分数变化
    scoreChange() {
      if (this.visitDetail.details.length > 0) {
        let sum = 0;
        this.visitDetail.details.forEach(item => {
          sum += item.score * 2;
        });
        this.averageScore = parseFloat(
          sum / this.visitDetail.details.length
        ).toFixed(1);
      }
    },
    // 快速备注
    remarkChange() {
      this.visitDetail.remark = this.remarkValue;
    },
    // 获取基础字典信息
    getBaseDictionarys() {
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
      });
    },
    // 获取用户信息
    getUsers() {
      const params = {
        company: "self",
        roles: ["customerService", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
      });
    },
    // 接待顾问
    reviewManName(id) {
      let reviewManName = "-";
      this.userOptions.forEach(item => {
        if (item.id == id) {
          reviewManName = item.name;
        }
      });
      return reviewManName;
    },
    // 关闭弹窗
    cancelHandle() {
      this.remarkValue = "";
      this.$emit("update:visible", false);
    },
    // 保存/完成
    saveHandle(type) {
      const data = JSON.parse(JSON.stringify(this.visitDetail));
      data.id = this.VisitObj.id;
      if (type == 1) {
        data.type = "保存";
      } else {
        data.type = "完成";
      }
      visitUpdate(data).then(() => {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
        this.cancelHandle();
        this.$emit("updateList");
      });
    },
    // 转交
    transferHandle() {
      this.cancelHandle();
      this.$emit("transferClick", this.VisitObj);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.order-table {
  width: 100%;
  border: 1px solid #eee;
  border-width: 0 1px 1px 0;
  border-radius: 3px;
  td {
    border: 1px solid #eee;
    border-width: 1px 0 0 1px;
    height: 32px;
    padding: 0 10px;
    font-size: 12px;
    &:nth-child(odd) {
      width: 120px;
      background: #f5f7fa;
      color: #606266;
    }
    &:nth-child(even) {
      color: $color-primary;
      @include font_color("color-primary");
    }
  }
}
.order-table2 {
  width: 100%;
  border: 1px solid #eee;
  border-width: 0 1px 1px 0;
  border-radius: 3px;
  th {
    height: 32px;
    padding: 0 10px;
    background: #f5f7fa;
    color: #606266;
  }
  td {
    border: 1px solid #eee;
    border-width: 1px 0 0 1px;
    height: 32px;
    padding: 0 10px;
    font-size: 12px;
    &:nth-child(odd) {
      color: $color-primary;
      @include font_color("color-primary");
    }
  }
}
.main-color {
  color: $color-primary;
  @include font_color("color-primary");
}
::v-deep {
  .el-dialog__body {
    background: #e4e7ed;
  }
  .repair-order-content {
    .dialig-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
  .dialog-footer-align {
    margin-top: 20px;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background: #e8eaef;
  }
  .el-rate {
    display: inline-block;
  }
  .el-radio-group {
    margin-left: 10px;
  }
  .el-radio {
    margin-right: 15px;
  }
  .rate-t .el-icon-star-on {
    color: #f7742d !important;
  }
  .rate-d .el-icon-star-on {
    color: #909399 !important;
  }
  .transfer-box {
    padding: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
  .disabled-rate {
    color: rgb(198, 209, 222) !important;
  }
}
</style>
