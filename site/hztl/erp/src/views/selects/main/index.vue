<template>
  <div>
    <div class="title text-font-primary">
      欢迎使用《{{
        uiConfig ? uiConfig.appName : "思锐云管家"
      }}》，您现在是个人账号登录状态，请选择一项继续。
    </div>
    <!-- <div class="bar-container" v-if="uiConfig">
      <CreateAccountsBar @click-step-first="handleShowCompanyInfoBox" />
      <JoinCompanyBar @click-step-first="handleShowStuffApplyBox" />
    </div> -->
    <div class="new-bar-container">
      <AccountPickBar
        v-for="type in typeList"
        :key="type.accountType"
        :accountType="type.accountType"
        :accountTypeName="type.accountTypeName"
        :title="type.title"
        :subTitle="type.subTitle"
        :des="type.des"
        :color="type.color"
        @set-account-type="setAccountType"
      />
    </div>
    <CompanyInfoBx
      :visible.sync="showCompanyInfoBox"
      :projectType="defaultProjectType"
      @on-sure="creatAccountsSuccess"
    />
    <StuffApplyBox
      :visible.sync="showStuffApplyBox"
      @on-sure="toJoinCompanyResultsPage"
    />
  </div>
</template>

<script>
// import CompanyInfo from "@/views/company/company-info";
import CompanyInfoBx from "./components/CompanyInfoBx";
import StuffApplyBox from "./components/StuffApplyBox";
import AccountPickBar from "./components/AccountPickBar";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { envConfig, uiConfig } from "envConfigPath";

const yunP = [
  {
    accountType: "yp",
    accountTypeName: uiConfig ? uiConfig.appName : "思锐云配管家",
    title: "我是经销商，主要卖配件",
    subTitle:
      "配件销售、配件采购、配件仓储管理等全业务流程解决方案，云配管家助你一臂之力轻松解决",
    des: "作为超级管理员，创建一个新账套",
    color: "#02A7F0"
  }
];

const yunX = [
  {
    accountType: "yx",
    accountTypeName: uiConfig ? uiConfig.appName : "思锐云修管家",
    title: "我是汽修厂，主要做维修",
    subTitle:
      "维修保养、清洗美容、车辆检测、员工绩效统计等多项功能，云修管家为你经营门店管理保驾护航",
    des: "作为超级管理员，创建一个新账套",
    color: "#0079FE"
  }
];
const staff = [
  {
    accountType: "user",
    accountTypeName: "",
    title: "我是员工，需要加入公司",
    subTitle: "",
    des: "作为员工，加入已有公司"
  }
];

export default {
  name: "Main",
  components: {
    // CompanyInfo,
    CompanyInfoBx,
    StuffApplyBox,
    AccountPickBar
  },
  data() {
    return {
      uiConfig,
      defaultProjectType: "yp",

      // showEditCompanyInfo: false,
      showCompanyInfoBox: false,
      showStuffApplyBox: false
    };
  },
  computed: {
    typeList() {
      const yp = envConfig.hasYP ? yunP : [];
      const yx = envConfig.hasYX ? yunX : [];
      return [...yp, ...yx, ...staff];
    }
  },
  methods: {
    handleShowCompanyInfoBox() {
      this.showCompanyInfoBox = true;
    },
    creatAccountsSuccess() {
      this.$emit("on-create", this.defaultProjectType);
    },
    setAccountType(e) {
      if (e === "user") {
        this.showStuffApplyBox = true;
      } else {
        this.showCompanyInfoBox = true;
        this.$nextTick(() => {
          this.defaultProjectType = e;
        });
      }
    },
    // toCreatAccountsResultsPage() {
    //   this.$emit("on-create");
    // },
    handleShowStuffApplyBox() {
      this.showStuffApplyBox = true;
    },
    toJoinCompanyResultsPage() {
      this.$emit("on-join");
    }
  }
};
</script>

<style lang="stylus" scoped>
.title {
  color:#333;
  margin: 25px 0;
  font-size: 16px;
}

.new-bar-container {
  width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px auto;
}
.bar-container {
  margin: auto;
  display: flex;
  align-items: center;
  width: 800px;
}

.company-information {
  text-align: left;

  /deep/.el-dialog__body {
    padding: 0 5px;

    .footer {
      margin-top: -41px;
    }
  }
}
</style>
