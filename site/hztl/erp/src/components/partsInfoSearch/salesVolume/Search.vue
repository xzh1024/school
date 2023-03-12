<script>
import { MONTH_RANGE, MONTH_RANGE_MAP } from "@/constants";
import { dateFormat } from "@/utils/date";

const TYPE = "salesVolume";
const defualtFormData = {
  rangeType: null
};

export default {
  name: "Search",
  props: {
    isSales: Boolean
  },
  data() {
    return {
      formData: { ...defualtFormData }
    };
  },
  mounted() {
    this.getStorage();
    this.searchHandle();
  },
  methods: {
    searchHandle() {
      const fromDate = dateFormat(
        MONTH_RANGE_MAP[this.formData.rangeType]
          ? MONTH_RANGE_MAP[this.formData.rangeType]()[0]
          : ""
      );
      const toDate = dateFormat(
        MONTH_RANGE_MAP[this.formData.rangeType]
          ? MONTH_RANGE_MAP[this.formData.rangeType]()[1]
          : ""
      );

      this.$emit("search", {
        ...this.formData,
        fromDate,
        toDate,
        rangeType: undefined
      });
      this.setStoraqe();
    },
    setStoraqe() {
      localStorage.histRange = JSON.stringify({
        ...(localStorage.histRange ? JSON.parse(localStorage.histRange) : {}),
        [TYPE]: this.formData.rangeType
      });
    },
    getStorage() {
      let rangeType = null;
      try {
        if (localStorage.histRange) {
          rangeType = JSON.parse(localStorage.histRange)[TYPE] || {};
        }
      } catch (e) {
        console.log(e);
      }
      this.formData = {
        ...defualtFormData,
        rangeType
      };
    }
  },
  render() {
    return (
      <el-form
        model={this.formData}
        inline
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
        style="width: 685px;"
      >
        <el-form-item label="查询时段">
          <ht-autoselect
            v-model={this.formData.rangeType}
            options={MONTH_RANGE}
            trigger-on-focus={false}
            clearable
            highlight-first-item
            placeholder="请选择"
            style="width: 100px;"
            onChange={this.searchHandle}
          />
        </el-form-item>
      </el-form>
    );
  }
};
</script>
