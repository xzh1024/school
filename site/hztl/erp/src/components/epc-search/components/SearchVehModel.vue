<script>
import SearchVehModelItem from "./SearchVehModelItem";
import { getEpcVehBrandAttributes, getEpcVehBrandConfig } from "@/api/epc";

const LIST_TYPES = {
  subBrand: "厂牌",
  vehicleGroup: "车型组",
  year: "年款",
  otherAttribute: "发动机｜排量 变速箱"
};

export default {
  name: "SearchVehModel",
  components: { SearchVehModelItem },
  props: {
    brandData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      searchBrand: "",
      loading: false,
      subBrandList: [],
      isVehicleSys: true,
      vehicleGroupList: [],
      yearList: [],
      otherAttributeList: [],
      subBrand: "",
      vehicleGroup: "",
      year: "",
      transmission: "",
      displacement: "",
      engine: ""
    };
  },
  watch: {
    brandData(val) {
      this.clearData();
      if (val) {
        this.loadItemList({ brand: this.brandData.name });
      }
    },
    subBrand() {
      this.vehicleGroupList = [];
      this.yearList = [];
      this.otherAttributeList = [];
    },
    vehicleGroup() {
      this.yearList = [];
      this.otherAttributeList = [];
    },
    year() {
      this.otherAttributeList = [];
    }
  },
  methods: {
    loadItemList(qureyData, title) {
      this.loading = true;
      getEpcVehBrandAttributes({ ...qureyData })
        .then(res => {
          this.setItemData(res, title);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    setItemData(res, title) {
      if (title) {
        switch (title) {
          case LIST_TYPES.subBrand:
            if (res.vehicleGroup && res.vehicleGroup.length) {
              this.vehicleGroupList = res.vehicleGroup;
              this.isVehicleSys = false;
            } else {
              this.vehicleGroupList = res.vehicleSys || [];
              this.isVehicleSys = true;
            }
            break;
          case LIST_TYPES.vehicleGroup:
            this.yearList = res.year.map(item => ({ name: item })) || [];
            break;
          case LIST_TYPES.year:
            this.otherAttributeList =
              res.otherAttribute && res.otherAttribute.length
                ? res.otherAttribute.map(item => ({
                    ...item,
                    name: `${item.engine}｜${item.displacement} ${item.transmission}`
                  }))
                : [];
            break;
          default:
            break;
        }
      } else {
        this.subBrandList = res.subBrand || [];
      }
    },
    handleRowChange(row, title) {
      switch (title) {
        case LIST_TYPES.subBrand:
          this.subBrand = row.name;
          this.loadItemList({ subBrand: row.name }, title);
          break;
        case LIST_TYPES.vehicleGroup:
          this.vehicleGroup = row.name;
          this.loadItemList(
            {
              subBrand: this.subBrand,
              mjVehicleGroup: this.isVehicleSys ? undefined : row.name,
              mjVehicleSys: this.isVehicleSys ? row.name : undefined
            },
            title
          );
          break;
        case LIST_TYPES.year:
          this.year = row.name;
          this.loadItemList(
            {
              subBrand: this.subBrand,
              mjVehicleGroup: this.isVehicleSys ? undefined : this.vehicleGroup,
              mjVehicleSys: this.isVehicleSys ? this.vehicleGroup : undefined,
              year: row.name
            },
            title
          );
          break;
        case LIST_TYPES.otherAttribute:
          this.displacement = row.displacement;
          this.engine = row.engine;
          this.transmission = row.transmission;
          this.loadVehModelData();
          break;
        default:
          break;
      }
    },
    loadVehModelData() {
      getEpcVehBrandConfig({
        brand: this.brandData.name,
        subBrand: this.subBrand,
        mjVehicleGroup: this.isVehicleSys ? undefined : this.vehicleGroup,
        mjVehicleSys: this.isVehicleSys ? this.vehicleGroup : undefined,
        year: this.year,
        engine: this.engine,
        transmission: this.transmission,
        displacement: this.displacement
      })
        .then(res => {
          this.$emit("change", res);
        })
        .catch(() => {});
    },
    clearData() {
      this.subBrandList = [];
      this.isVehicleSys = true;
      this.vehicleGroupList = [];
      this.yearList = [];
      this.otherAttributeList = [];
      this.subBrand = "";
      this.vehicleGroup = "";
      this.year = "";
      this.transmission = "";
      this.displacement = "";
      this.engine = "";
      this.$refs.subBrandList && this.$refs.subBrandList.clearData();
      this.$refs.vehicleGroupList && this.$refs.vehicleGroupList.clearData();
      this.$refs.yearList && this.$refs.yearList.clearData();
      this.$refs.otherAttributeList &&
        this.$refs.otherAttributeList.clearData();
    }
  },

  render() {
    return (
      <el-row v-loading={this.loading} style="height: 100%;">
        <el-col span={6} style="height: 100%;">
          <SearchVehModelItem
            ref="subBrandList"
            totalData={this.subBrandList}
            title={LIST_TYPES.subBrand}
            style="margin-left: 0;"
            on-change={this.handleRowChange}
            listTypes={LIST_TYPES}
          />
        </el-col>
        <el-col span={6} style="height: 100%;">
          <SearchVehModelItem
            ref="vehicleGroupList"
            totalData={this.vehicleGroupList}
            title={LIST_TYPES.vehicleGroup}
            on-change={this.handleRowChange}
            listTypes={LIST_TYPES}
          />
        </el-col>
        <el-col span={6} style="height: 100%;">
          <SearchVehModelItem
            ref="yearList"
            totalData={this.yearList}
            title={LIST_TYPES.year}
            on-change={this.handleRowChange}
            listTypes={LIST_TYPES}
          />
        </el-col>
        <el-col span={6} style="height: 100%;">
          <SearchVehModelItem
            ref="otherAttributeList"
            totalData={this.otherAttributeList}
            title={LIST_TYPES.otherAttribute}
            on-change={this.handleRowChange}
            listTypes={LIST_TYPES}
          />
        </el-col>
      </el-row>
    );
  }
};
</script>
