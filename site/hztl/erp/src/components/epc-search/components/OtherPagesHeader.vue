<script>
export default {
  name: "OtherPagesHeader",
  props: {
    showFlag: {
      type: String,
      required: true
    },
    brandData: {
      type: Object,
      required: true
    },
    vehModelData: {
      type: Object,
      required: true
    },
    saleVehModelData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      searchData: ""
    };
  },
  methods: {
    gotoMain(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("goto-main");
    },
    gotoSearchVehModel(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("goto-search-veh-model", this.brandData);
    },
    gotoSearchDwg(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("goto-search-dwg");
    },
    showSelectVehModelBox(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("show-select-veh-model-box");
    },
    searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.searchData) {
        this.$emit("search", this.searchData);
      } else {
        this.$message.warning({
          message: "请输入配件编码或名称！",
          showClose: true
        });
      }
    },
    clearData() {
      this.searchData = "";
    }
  },

  render() {
    return (
      <div>
        <div class="veh-model-container">
          <div class="veh-model-content">
            <span class="logo-container">
              <img
                src={this.brandData.photoLink}
                alt="LOGO"
                class="logo-content"
              />
            </span>
            <span class="brand-name">{this.brandData.name}</span>
            <span
              v-show={["searchDwg", "epcPartsList"].includes(this.showFlag)}
              class="veh-model-detail"
            >
              {this.saleVehModelData.mjVehicleGroup}
              {" > "}
              {this.saleVehModelData.year}
              {" > "}
              {this.saleVehModelData.engine}｜
              {this.saleVehModelData.displacement}{" "}
              {this.saleVehModelData.transmission}
            </span>
            <el-button
              v-show={this.showFlag === "searchDwg"}
              plain
              type="primary"
              size="mini"
              class="change-btn"
              on-click={e => this.gotoSearchVehModel(e)}
            >
              更改
            </el-button>
            <span
              v-show={["searchDwg", "epcPartsList"].includes(this.showFlag)}
              class="veh-model-detail"
            >
              车辆详情：{this.saleVehModelData.salesName}
            </span>
            <el-button
              v-show={
                this.showFlag === "searchDwg" &&
                this.vehModelData &&
                this.vehModelData.salesVehicle &&
                this.vehModelData.salesVehicle.length > 1
              }
              plain
              type="primary"
              size="mini"
              class="change-btn"
              on-click={e => this.showSelectVehModelBox(e)}
            >
              更改
            </el-button>
          </div>
          <div
            class="text-font-primary"
            style="cursor: pointer;"
            on-click={e => this.gotoMain(e)}
          >
            返回首页 {">"}
          </div>
        </div>
        <div
          v-show={["searchDwg", "epcPartsList"].includes(this.showFlag)}
          class="search-container"
        >
          <div
            v-show={this.showFlag === "epcPartsList"}
            class="text-font-primary"
            style="cursor: pointer;"
            on-click={e => this.gotoSearchDwg(e)}
          >
            返回目录树 {">"}
          </div>
          <div v-show={this.showFlag === "searchDwg"}>{""}</div>
          <ht-input
            v-model={this.searchData}
            placeholder="请输入配件编码或名称"
            size="mini"
            class="search-btn-container"
            style="width: 300px;"
          >
            <el-button
              slot="append"
              type="primary"
              size="mini"
              on-click={e => this.searchHandle(e)}
            >
              查询
            </el-button>
          </ht-input>
        </div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.veh-model-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: solid 1px #dcdfe6;

  .veh-model-content {
    .logo-container {
      display: inline-block;
      width: 50px;
      height: 50px;
      border: solid 1px #dcdfe6;
      text-align: center;
      vertical-align: bottom;

      .logo-content {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .brand-name {
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
      font-size: 18px;
      font-weight: 500;
    }

    .veh-model-detail {
      display: inline-block;
      margin-left: 15px;
      vertical-align: middle;
      font-size: 14px;
    }

    .change-btn {
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
    }
  }
}
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;

  .search-btn-container {
    &::v-deep .el-button {
      border-radius: 0;
      color: rgba(255, 255, 255);
      background: #409eff;
      @include background_color("color-light");
    }
  }
}
</style>
