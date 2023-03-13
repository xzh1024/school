<template>
  <div class="confirm-order-wrap">
    <div v-if="showHeader" class="link" style="margin-bottom:10px;">
      <span style="dispaly:inline-block;width:250px"
        >链接已生成，请复制链接进行分享。</span
      >
      <el-input
        size="small"
        v-model="path"
        style="width:500px;marginRight:10px"
      ></el-input>
      <el-button size="mini" @click="copy">复制链接</el-button>
    </div>
    <div class="company">「{{ insuranceInfo.companyName }}」保险理赔申请单</div>
    <div class="no">No. {{ billForm.billNo }}</div>
    <!-- 保单信息 -->
    <div v-if="billForm" class="confirm-table">
      <div class="confirm-table-title">
        <span>保单信息</span>
      </div>
      <div class="confirm-table-detail">
        <span class="title"
          >保险公司：<span class="content">{{
            billForm.insuranceCompanyName
          }}</span></span
        >
        <span class="title"
          >保单号：<span class="content">{{ billForm.insuranceNo }}</span></span
        >
        <span class="title"
          >绝对免赔率：<span class="content">{{
            billForm.deductionRate ? billForm.deductionRate * 100 + "%" : "-"
          }}</span></span
        >
      </div>
    </div>
    <!-- 车辆信息 -->
    <div v-if="billForm" class="confirm-table">
      <div class="confirm-table-title">
        <span>车辆信息</span>
      </div>
      <div class="confirm-table-detail">
        <span class="title"
          >车牌号：<span class="content">{{
            billForm.plateNumber || "-"
          }}</span></span
        >
        <span class="title"
          >车型：<span class="content">{{
            billForm.vehicleGroup || "-"
          }}</span></span
        >
        <span class="title"
          >车架号：<span class="content">{{ billForm.vin || "-" }}</span></span
        >
        <span class="title"
          >发动机号：<span class="content">{{
            billForm.engineNo || "-"
          }}</span></span
        >
      </div>
    </div>
    <!-- 报案信息 -->
    <div v-if="billForm" class="confirm-table">
      <div class="confirm-table-title">
        <span>报案信息</span>
      </div>
      <div class="confirm-table-detail">
        <span class="title"
          >报案人：<span class="content">{{ billForm.reporter }}</span></span
        >
        <span class="title"
          >报案号：<span class="content">{{ billForm.reportNo }}</span></span
        >
        <span class="title"
          >出险时间：<span class="content">{{
            billForm.accidentTime
          }}</span></span
        >
        <span class="title"
          >出险地点：<span class="content">{{
            billForm.accidentAddress
          }}</span></span
        >
        <span class="title"
          >理赔人：<span class="content">{{
            billForm.receptionManName
          }}</span></span
        >
      </div>
    </div>
    <!-- 维修项目 -->
    <div class="confirm-table">
      <div class="confirm-table-title">
        <span>维修项目</span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="serviceData" style="width: 100%">
          <el-table-column prop="itemCode" label="项目编号" width="180">
          </el-table-column>
          <el-table-column prop="itemName" label="项目名称"> </el-table-column>
          <el-table-column
            prop="chargeManHour"
            label="索赔工时"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="manHourPrice"
            label="工时单价"
            width="180"
          ></el-table-column>
          <el-table-column prop="amount" label="索赔金额" width="180">
            <template slot-scope="scope">
              {{
                scope.row.chargeManHour > 0
                  ? Number(
                      scope.row.chargeManHour * scope.row.manHourPrice
                    ).toFixed(2)
                  : "-"
              }}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="180"
          ></el-table-column>
        </el-table>
        <div class="summary" v-if="serviceData.length">
          <span class="summary-title">小记</span>
          <span class="summary-value">{{
            insuranceInfo.totalChargeManHour
          }}</span>
        </div>
      </div>
    </div>
    <!-- 维修配件材料 -->
    <div class="confirm-table">
      <div class="confirm-table-title">
        <span>维修配件材料</span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="partData" style="width: 100%">
          <el-table-column prop="code" label="配件编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="配件名称"> </el-table-column>
          <el-table-column
            prop="qty"
            label="数量"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            width="180"
          ></el-table-column>
          <el-table-column prop="amount" label="索赔金额" width="180">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="180"
          ></el-table-column>
        </el-table>
        <div class="summary" v-if="partData.length">
          <span class="summary-title">小记</span>
          <span class="summary-value">{{
            insuranceInfo.totalChargeParts
          }}</span>
        </div>
      </div>
    </div>
    <!-- 合计费用 -->
    <div class="confirm-table">
      <div class="confirm-table-title">
        <span>合计费用</span>
      </div>
      <div class="confirm-table-content">
        <el-table :data="totalData" style="width: 100%">
          <el-table-column prop="type" label="费用类型"> </el-table-column>
          <el-table-column prop="value" label="费用金额"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="no">
      思锐软件 （010）60219478/60219479
    </div>
  </div>
</template>
<script>
import { createShares, getSharesData } from "@/api/base";

export default {
  name: "share-insurance",
  props: {
    insuranceId: {
      type: String,
      default: ""
    },
    encryptdData: {
      type: String,
      default: ""
    },
    showHeader: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    insuranceId: {
      handler(value) {
        if (value) {
          this.createShares();
        }
      }
    },
    encryptdData: {
      handler(value) {
        if (value) {
          this.getInsurancesDetail(value);
        }
      }
    }
  },
  data() {
    return {
      path: "",
      billForm: {},
      insuranceInfo: {},
      serviceData: [],
      partData: [],
      totalData: []
    };
  },
  mounted() {
    if (this.insuranceId) {
      this.createShares();
    }
    if (this.encryptdData) {
      this.getInsurancesDetail(this.encryptdData);
    }
    //定义函数
    window.Clipboard = (function(window, document, navigator) {
      let textArea;

      // 判断是不是ios端
      function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
      }
      //创建文本元素
      function createTextArea(text) {
        textArea = document.createElement("textArea");
        textArea.innerHTML = text;
        textArea.value = text;
        document.body.appendChild(textArea);
      }
      //选择内容
      function selectText() {
        let range, selection;

        if (isOS()) {
          range = document.createRange();
          range.selectNodeContents(textArea);
          selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          textArea.setSelectionRange(0, 999999);
        } else {
          textArea.select();
        }
      }

      //复制到剪贴板
      function copyToClipboard() {
        try {
          if (document.execCommand("Copy")) {
            alert("复制成功！");
          } else {
            alert("复制失败！请手动复制！");
          }
        } catch (err) {
          alert("复制错误！请手动复制！");
        }
        document.body.removeChild(textArea);
      }

      const copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
      };

      return {
        copy: copy
      };
    })(window, document, navigator);
  },
  methods: {
    createShares() {
      createShares({
        type: "bill",
        value: {
          billType: "BL",
          billId: Number(this.insuranceId)
        }
      }).then(res => {
        const url = res.url;
        this.path = url;
        const arr = url.split("?encryptdData=");
        this.getInsurancesDetail(arr[1]);
      });
    },
    getInsurancesDetail(encryptdData) {
      getSharesData({
        encryptdData: encryptdData
      }).then(res => {
        const { item, parts, insuranceInfo, vehicleInfo } = res;
        this.serviceData = item || [];
        this.partData = parts || [];
        this.insuranceInfo = insuranceInfo;
        this.billForm = {
          ...insuranceInfo,
          ...vehicleInfo,
          deductionRate: insuranceInfo.deductionRate
        };
        const {
          totalChargeManHour,
          totalChargeParts,
          otherCharge,
          amount
        } = insuranceInfo;
        this.totalData = [
          {
            type: "工费金额",
            value: totalChargeManHour
          },
          {
            type: "料费金额",
            value: totalChargeParts
          },
          {
            type: "其他费用",
            value: otherCharge
          },
          {
            type: "合计",
            value: amount
          }
        ];
      });
    },
    copy() {
      window.Clipboard.copy(this.path);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  background: #fff;
}

// // 手机
// @media screen and (max-width: 960px) {

// }
// // pc
// @media screen and (min-width: 959px) {

// }
.confirm-order-wrap {
  background: #fff;
  padding: 0 10px 10px;
  .confirm-table {
    .confirm-table-title {
      padding: 5px 10px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          display: inline-block;
          width: 130px;
        }
      }
    }
    .confirm-table-detail {
      padding: 10px 5px;
      span {
        margin-right: 20px;
      }
      .line {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        border-bottom: 1px dotted #333;

        .line-title {
          width: 120px;
        }
        .line-colums {
          text-align: right;
          width: 200px;
        }
      }
      .line:last-child {
        border-bottom: none;
      }
    }
    .sub-header {
      .line {
        border-bottom: 2px solid #333 !important;
      }
    }
  }
  .co-line {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 25px;
    line-height: 25px;
    .co-label {
      width: 120px;
      font-weight: bold;
    }
  }
  .link {
    display: flex;
    justify-content: flex-start;
    line-height: 40px;
    padding-top: 10px;
  }
  .company {
    text-align: center;
    font-size: 28px;
    padding-top: 50px;
  }
  .no {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    height: 60px;
    line-height: 20px;
    color: #333;
  }
  .summary {
    border-top: dotted 1px #333;
    padding: 10px 0;
    margin-top: 5px;
    span {
      display: inline-block;
    }
    .summary-title {
      width: 65%;
      text-align: right;
    }
    .summary-value {
      width: 35%;
      text-align: center;
    }
  }
}
</style>
