<script>
import PartTree from "./PartTree";
import { getEpcPartsTree, getStdPartsTree } from "@/api/epc";

const TABS = [
  { id: "epcListTree", name: "原厂目录树（EPC）" },
  { id: "stdListTree", name: "标准目录树" }
];

export default {
  name: "SearchDwg",
  components: {
    PartTree
  },
  props: {
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
      activeTab: "epcListTree",
      tabs: TABS,
      showTree: false,
      loading: false
    };
  },
  computed: {
    refPartTree() {
      return this.$refs[this.activeTab];
    }
  },
  watch: {
    saleVehModelData() {
      this.tabs = TABS;
      this.activeTab = "epcListTree";
      this.loadTree();
    },
    activeTab() {
      this.loadTree();
    }
  },
  methods: {
    handleImgChange(val) {
      this.$emit("change", {
        vinCode: this.vehModelData.vinCode,
        mjsid: this.saleVehModelData.mjsid,
        image: val.image,
        imgUrl: val.imgUrl
      });
    },
    loadTree() {
      this.showTree = false;
      this.refPartTree && this.refPartTree.clearData();
      this.$nextTick(() => {
        this.showTree = true;
      });
    },
    loadEpcPartsTree(params) {
      return new Promise((resolve, reject) => {
        if (this.activeTab === "epcListTree") {
          this.loading = true;
          return getEpcPartsTree({
            ...params,
            vin: this.vehModelData.vinCode,
            mjsid: this.saleVehModelData.mjsid,
            optionCode: this.saleVehModelData.optionCode
          })
            .then(res => {
              if (res && res.length) {
                this.tabs = TABS;
              } else {
                this.tabs = this.tabs.filter(item => item.id !== "epcListTree");
                this.activeTab = "stdListTree";
              }
              this.loading = false;
              resolve(res);
            })
            .catch(() => {
              this.loading = false;
              reject();
            });
        } else {
          reject();
        }
      });
    },
    loadstdPartsTree(params) {
      return new Promise((resolve, reject) => {
        if (this.activeTab === "stdListTree") {
          this.loading = true;
          return getStdPartsTree({
            ...params,
            vinCode: this.vehModelData.vinCode,
            mjsid: this.saleVehModelData.mjsid,
            optionCode: this.saleVehModelData.optionCode
          })
            .then(res => {
              resolve(res);
              this.loading = false;
            })
            .catch(() => {
              reject();
              this.loading = false;
            });
        } else {
          reject();
        }
      });
    }
  },

  render() {
    return (
      <div v-loading={this.loading} style="height: 100%;">
        <ht-tabs
          v-model={this.activeTab}
          tabs={this.tabs}
          class="tabs-regular"
        />
        <PartTree
          ref="epcListTree"
          v-show={this.activeTab === "epcListTree"}
          showTree={this.showTree}
          on-img-change={this.handleImgChange}
          reqFunction={this.loadEpcPartsTree}
          style="height: calc(100% - 35px);"
        />
        <PartTree
          ref="stdListTree"
          v-show={this.activeTab === "stdListTree"}
          showTree={this.showTree}
          on-img-change={this.handleImgChange}
          reqFunction={this.loadstdPartsTree}
          style="height: calc(100% - 35px);"
        />
      </div>
    );
  }
};
</script>
