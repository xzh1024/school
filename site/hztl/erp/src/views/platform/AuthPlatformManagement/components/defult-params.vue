<script lang="tsx">
import {
  Component,
  Mixins,
  Prop,
  PropSync,
  Watch
} from "vue-property-decorator";
import { FormatePlatformParam, PlatformParams } from "@/constants/platform";
import SearchMixin from "@/mixins/searchMixin";
import { renderParams } from "./utils";
import { paramList } from "../constants/index";

interface DefaultParamsProps {
  data: PlatformParams | null;
}

interface DefaultParamsEvents {
  onVisibleUpdate: (visible: boolean) => void;
}

@Component
export default class DefaultParams extends Mixins(SearchMixin) {
  @Prop() data!: PlatformParams;
  @PropSync("selectedRow") syncedSelectedRow!: FormatePlatformParam;
  get formatData(): FormatePlatformParam[] {
    if (!this.data) {
      return [];
    }
    return paramList.map(item => {
      return {
        name: item.name,
        value: this.data[item.key].value,
        key: item.key,
        companies: this.data[item.key].companies
      };
    });
  }
  @Watch("formatData")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormatDataChange(
    newVal: FormatePlatformParam[],
    oldVal: FormatePlatformParam[]
  ) {
    if (newVal !== oldVal) {
      this.syncedSelectedRow =
        (this.syncedSelectedRow &&
          newVal.find(item => item.key === this.syncedSelectedRow.key)) ||
        newVal[0];
    }
  }
  selectChangeHandle(newVal: FormatePlatformParam[]) {
    this.syncedSelectedRow = newVal[0];
  }
  render() {
    const columns = [
      {
        label: "参数名称",
        prop: "name",
        width: 80
      },
      {
        label: "参数值",
        prop: "value",
        width: 160,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        render: (value: any, row: any) =>
          renderParams.bind(this)(row.key, this.data[row.key])
      }
    ];
    return (
      <ht-table
        disabled-hotkeys
        data={this.formatData}
        columns={columns}
        selectedRows={[this.syncedSelectedRow]}
        on-selectChange={this.selectChangeHandle}
      />
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
</style>
