<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import {
  SearchSwapGroupParams,
  loadReplacementsGroupsCodes,
  loadReplacementsGroupsNames
} from "@/api/parts/swapGroup";

const defaultFormData = {
  name: "",
  partCode: ""
};

interface Props {
  loading: boolean;
}
interface Events {
  onChange(params: SearchSwapGroupParams): void;
}

@Component
export default class Search extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  private searchFormData = {
    ...defaultFormData
  };
  private search(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", { ...this.searchFormData });
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultFormData
    };
  }
  autocompleteSearchCodes(query: string, cb: Function) {
    loadReplacementsGroupsCodes({ code: query }).then(res => {
      const data = res || [];
      cb(data.map(item => ({ value: item.code })));
    });
  }
  autocompleteSearchNames(query: string, cb: Function) {
    loadReplacementsGroupsNames({ name: query }).then(res => {
      const data = res || [];
      cb(data.map(item => ({ value: item.name })));
    });
  }
  mounted() {
    this.search();
  }
  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
        label-width="75px"
      >
        <el-row gutter={5}>
          <el-col span={6}>
            <el-form-item label="互换组">
              <ht-autocomplete
                v-model={this.searchFormData.name}
                fetch-suggestions={this.autocompleteSearchNames}
                placeholder="互换组"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="配件编码">
              <ht-autocomplete
                v-model={this.searchFormData.partCode}
                fetch-suggestions={this.autocompleteSearchCodes}
                placeholder="配件编码"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                on-click={this.search}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" on-click={this.resetParams}>
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
</script>
