<script lang="tsx">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Mixins, Prop } from "vue-property-decorator";
import { FormatePlatformParam } from "@/constants/platform";
import { LiteCompany } from "@/constants/interface";
import SearchMixin from "@/mixins/searchMixin";
import { renderParams } from "./utils";
import * as store from "@/utils/store";

interface DefaultParamsProps {
  data: FormatePlatformParam | null;
}

interface DefaultParamsEvents {
  onVisibleUpdate: (visible: boolean) => void;
}

@Component
export default class DefaultParams extends Mixins(SearchMixin) {
  @Prop() data!: FormatePlatformParam;
  get companyData(): LiteCompany[] {
    return store.allCompanies();
  }
  get formatData() {
    if (!this.data) {
      return [];
    }
    return this.companyData.map(item => {
      return {
        ...item,
        value: this.data.companies[item.id].value,
        enabled: this.data.companies[item.id].enabled,
        key: this.data.key
      };
    });
  }
  render() {
    const columns = [
      {
        label: "公司标志",
        prop: "ident",
        width: 70
      },
      {
        label: "公司名称",
        prop: "name",
        width: 100
      },
      {
        label: "参数值",
        prop: "value",
        width: 160,
        render: (value: any, row: any) =>
          renderParams.bind(this)(row.key, this.data.companies[row.id])
      },
      {
        label: "是否启用",
        prop: "enabled",
        width: 70,
        render: (value: any, row: any) => (
          <el-switch v-model={this.data.companies[row.id].enabled} />
        )
      }
    ];
    return (
      <ht-table disabled-hotkeys data={this.formatData} columns={columns} />
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
</style>
