<template>
  <div class="container-box">
    <el-card class="auto-card box-card" no-background no-padding>
      <div slot="header">
        <span class="header-tit">项目分类：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ nodeData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="children-list" v-loading="loading">
        <p class="tit-box">
          <span class="tit-l">检测项目</span><span class="tit-r"></span>
        </p>
        <p class="click-light-tit">点选仪表盘上亮起的警示灯</p>
        <div class="list-box">
          <div v-for="(item, ind) in lightCheckList" :key="ind">
            <i :class="'light-img ' + dashboardWarningLightImgs[item]"></i>
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { checkItemsList } from "@/api/basis/detect/index";
export default {
  name: "light-check",
  components: {},
  props: {
    nodeData: Object
  },
  watch: {},
  data() {
    return {
      loading: false,
      lightCheckList: [],
      dashboardWarningLightImgs: {
        安全气囊: "srs",
        玻璃水: "bathofglass",
        刹车: "brake",
        发动机故障灯: "enginefailurelight",
        机油报警灯: "oilalarmlamp",
        水温: "watertemperature",
        胎压报警灯: "tirepressurealarmlamp",
        蓄电池: "storagebattery",
        ABS: "abs",
        其他: "other"
      }
    };
  },
  created() {
    this.getItemsList();
  },
  methods: {
    getItemsList() {
      this.loading = true;
      this.lightCheckList = [];
      const params = {
        categoryId: this.nodeData.id,
        categoryCode: this.nodeData.code
      };
      checkItemsList(params)
        .then(res => {
          this.lightCheckList = res.Rows[0].options || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.container-box {
  ::v-deep {
    .box-card {
      background: #f5f5f5;
      margin: 0 !important;
      .el-card__header {
        padding: 8px;
        background: #fff;
        .header-tit {
          position: relative;
          padding-left: 10px;
          &::before {
            position: absolute;
            left: 0;
            top: 3px;
            display: inline-block;
            content: "";
            width: 4px;
            background: $color-primary;
            @include background_color("color-primary");
            height: 14px;
            margin-right: 5px;
            border-radius: 100px;
          }
        }
        .el-breadcrumb {
          position: relative;
          top: 1px;
          display: inline-block;
        }
      }
    }
    .children-list {
      height: 100%;
      border-radius: 4px;
      .tit-box {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin: 0;
        border-bottom: 1px dotted #ccc;
        .tit-l {
          float: left;
        }
        .tit-r {
          float: right;
        }
      }
      .click-light-tit {
        height: 20px;
        line-height: 20px;
        margin: 10px 0 0;
      }
      .list-box {
        overflow: hidden;
        padding: 10px 0;
        div {
          position: relative;
          float: left;
          width: 130px;
          height: 65px;
          line-height: 60px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin: 0 10px 10px 0;
          background: #fff;
          text-align: center;
          .light-img {
            display: inline-block;
            width: 50px;
            height: 26px;
          }
          p {
            position: absolute;
            bottom: 5px;
            width: 100%;
            height: 20px;
            line-height: 20px;
            margin: 0;
            text-align: center;
            user-select: none;
          }
          .other {
            background: #fff url("~@/assets/images/light/other.png") no-repeat
              center center;
            background-size: auto 100%;
          }
          .abs {
            background: #fff url("~@/assets/images/light/abs.png") no-repeat
              center center;
            background-size: auto 100%;
          }
          .storagebattery {
            background: #fff url("~@/assets/images/light/storagebattery.png")
              no-repeat center center;
            background-size: auto 100%;
          }
          .tirepressurealarmlamp {
            background: #fff
              url("~@/assets/images/light/tirepressurealarmlamp.png") no-repeat
              center center;
            background-size: auto 100%;
          }
          .watertemperature {
            background: #fff url("~@/assets/images/light/watertemperature.png")
              no-repeat center center;
            background-size: auto 100%;
          }
          .oilalarmlamp {
            background: #fff url("~@/assets/images/light/oilalarmlamp.png")
              no-repeat center center;
            background-size: auto 100%;
          }
          .enginefailurelight {
            background: #fff
              url("~@/assets/images/light/enginefailurelight.png") no-repeat
              center center;
            background-size: auto 100%;
          }
          .brake {
            background: #fff url("~@/assets/images/light/brake.png") no-repeat
              center center;
            background-size: auto 100%;
          }
          .bathofglass {
            background: #fff url("~@/assets/images/light/bathofglass.png")
              no-repeat center center;
            background-size: auto 100%;
          }
          .srs {
            background: #fff url("~@/assets/images/light/srs.png") no-repeat
              center center;
            background-size: auto 100%;
          }
        }
      }
    }
  }
}
</style>
