<script>
// 暂时去掉所有快捷键
import Main from "./components/Main";
import OtherPagesHeader from "./components/OtherPagesHeader";
import SearchVehModel from "./components/SearchVehModel";
import SearchDwg from "./components/SearchDwg";
import EpcPartsList from "./components/EpcPartsList";
import SelectVehModelBox from "./components/SelectVehModelBox";
import SearchByKeywordBox from "./components/SearchByKeywordBox";

export default {
  name: "EpcSearch",
  components: {
    Main,
    OtherPagesHeader,
    SearchVehModel,
    SearchDwg,
    EpcPartsList,
    SelectVehModelBox,
    SearchByKeywordBox
  },
  data() {
    return {
      showFlag: "main",
      vehModelData: {},
      saleVehModelData: {},
      selectVehModelBoxVisible: false,
      brandData: {},
      epcPartsQurey: {},
      searchByKeywordBoxVisible: false,
      searchKeyword: ""
    };
  },
  methods: {
    showMain() {
      this.showFlag = "main";
    },
    showSearchVehModel(brandData) {
      if (brandData) {
        this.brandData = brandData;
      }
      this.showFlag = "searchVehModle";
    },
    showSelectVehModelBox(vehModelData, brandData) {
      if (vehModelData) {
        this.vehModelData = vehModelData;
      }
      if (brandData) {
        this.brandData = brandData;
      }
      if (
        this.vehModelData.salesVehicle &&
        this.vehModelData.salesVehicle.length === 1
      ) {
        this.showSearchDwg(this.vehModelData.salesVehicle[0]);
      } else {
        this.selectVehModelBoxVisible = true;
      }
    },
    showSearchDwg(saleVehModelData) {
      if (saleVehModelData) {
        this.saleVehModelData = saleVehModelData;
        this.$refs.OtherPagesHeader && this.$refs.OtherPagesHeader.clearData();
      }
      this.showFlag = "searchDwg";
    },
    showEpcPartsList(req) {
      if (req) {
        this.epcPartsQurey = req;
      }
      this.showFlag = "epcPartsList";
    },
    searchLocalParts(params) {
      this.searchKeyword = params;
      this.searchByKeywordBoxVisible = true;
    }
  },

  render() {
    return (
      <div class="epc-container">
        <div class="epc-title">EPC查询</div>
        <div class="epc-content">
          <OtherPagesHeader
            ref="OtherPagesHeader"
            v-show={["searchVehModle", "searchDwg", "epcPartsList"].includes(
              this.showFlag
            )}
            showFlag={this.showFlag}
            brandData={this.brandData}
            vehModelData={this.vehModelData}
            saleVehModelData={this.saleVehModelData}
            on-goto-main={this.showMain}
            on-goto-search-veh-model={this.showSearchVehModel}
            on-show-select-veh-model-box={this.showSelectVehModelBox}
            on-goto-search-dwg={this.showSearchDwg}
            on-search={this.searchLocalParts}
          />
          <Main
            v-show={this.showFlag === "main"}
            on-brand-change={this.showSearchVehModel}
            on-change={this.showSelectVehModelBox}
          />
          <SearchVehModel
            v-show={this.showFlag === "searchVehModle"}
            brandData={this.brandData}
            on-change={this.showSelectVehModelBox}
            style="height: calc(100% - 65px);"
          />
          <SearchDwg
            v-show={this.showFlag === "searchDwg"}
            brandData={this.brandData}
            vehModelData={this.vehModelData}
            saleVehModelData={this.saleVehModelData}
            on-change={this.showEpcPartsList}
            style="height: calc(100% - 65px); margin-top: -33px;"
          />
          <EpcPartsList
            v-show={this.showFlag === "epcPartsList"}
            brandData={this.brandData}
            vehModelData={this.vehModelData}
            saleVehModelData={this.saleVehModelData}
            epcPartsQurey={this.epcPartsQurey}
            style="height: calc(100% - 100px);"
          />

          <SelectVehModelBox
            visible={this.selectVehModelBoxVisible}
            on={{
              "update:visible": val => (this.selectVehModelBoxVisible = val)
            }}
            vehModelData={this.vehModelData}
            on-sure={this.showSearchDwg}
          />
          <SearchByKeywordBox
            visible={this.searchByKeywordBoxVisible}
            on={{
              "update:visible": val => (this.searchByKeywordBoxVisible = val)
            }}
            upSearchData={this.searchKeyword}
            brandData={this.brandData}
            vehModelData={this.vehModelData}
            saleVehModelData={this.saleVehModelData}
          />
        </div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.epc-container {
  height: 100%;
  background: #fff;
  overflow-y: hidden;

  .epc-title {
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    background: #00a5ff;
    @include background_color("color-primary");
    color: #fff;
    font-size: 18px;
  }

  .epc-content {
    padding: 10px;
    height: calc(100% - 40px);
  }
}
</style>
