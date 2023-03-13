<script lang="tsx">
import { Component, Vue, Model, Prop, Watch } from "vue-property-decorator";
import BillStatusBar from "@/components/billStatusBar";
import { getKeys } from "@/utils/tool";
import { TransferBillItem } from "@/views/transfer/interface";
import { defaultFormData, AuditFormData } from "./constants";

@Component({
  components: {
    BillStatusBar
  }
})
export default class SearchPartsBox extends Vue {
  @Model("change") readonly value!: AuditFormData;
  @Prop() readonly header?: TransferBillItem;
  public formData: AuditFormData = { ...defaultFormData };

  @Watch("value", { immediate: true, deep: true })
  onValueChange(value: AuditFormData) {
    // 判断数据变动过才更新
    if (getKeys(value).some(key => this.formData[key] !== value[key])) {
      this.formData = {
        ...value
      };
    }
  }

  private updateHeader() {
    // 判断数据变动过才更新
    if (
      getKeys(this.formData).some(key => this.formData[key] !== this.value[key])
    ) {
      this.$emit("change", this.formData);
    }
  }

  render() {
    return (
      <el-form
        disabled={!!this.header && !this.header?.actions.edit}
        label-position="left"
        size="mini"
        label-width="80px"
        class="form-item-small-margin-bottom autofocus"
      >
        <el-row gutter={10}>
          <el-col span={7}>
            <el-form-item label="调入分公司">
              <ht-input disabled value={this.header?.relatedCompanyName} />
            </el-form-item>
          </el-col>
          <el-col span={7}>
            <el-form-item label="调出分公司">
              <ht-input disabled value={this.header?.companyName} />
            </el-form-item>
          </el-col>
          <el-col span={10}>
            <el-form-item label-width="0">
              <div style="display: flex;">
                <bill-status-bar
                  billStatus={this.header?.statusName}
                  billNo={this.header?.billNo}
                />
                <small class="text-font-danger remark-container">
                  {this.header?.reason}
                </small>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row gutter={10}>
          <el-col span={5}>
            <el-form-item label="请调人">
              <ht-input disabled value={this.header?.businessManName} />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="申请日期" label-width="60px">
              <el-date-picker
                disabled
                value-format="yyyy-MM-dd"
                value={this.header?.billDate}
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="预期到货日期" label-width="87px">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model={this.formData.planDate}
                type="date"
                onChange={this.updateHeader}
              />
            </el-form-item>
          </el-col>
          <el-col span={10}>
            <el-form-item label="备注" label-width="31px">
              <ht-input
                v-model={this.formData.remark}
                onChange={this.updateHeader}
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
</script>
