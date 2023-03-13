<script lang="tsx">
import { Component, Mixins, Model, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import SearchMixin from "@/mixins/searchMixin";
import BillStatusBar from "@/components/billStatusBar";
import { getKeys } from "@/utils/tool";
import { Company, TransferBillItem } from "@/views/transfer/interface";
import { defaultFormData, DetailFormData } from "../../constants";
import * as store from "@/utils/store";

const rules = {
  companyId: [
    {
      required: true,
      message: "请选择调入分公司!",
      trigger: "change"
    }
  ],
  relatedCompanyId: [
    {
      required: true,
      message: "请选择调出分公司!",
      trigger: "change"
    }
  ],
  businessManId: [
    {
      required: true,
      message: "请选择请调人!",
      trigger: "change"
    }
  ],
  billDate: [
    {
      required: true,
      message: "请选择结算日期!",
      trigger: "change"
    }
  ]
};

@Component({
  components: {
    BillStatusBar
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };

  @Model("change") readonly value!: DetailFormData;
  @Prop() readonly header?: TransferBillItem;
  @Prop() readonly relatedCompanies!: Company[];
  private formData: DetailFormData = { ...defaultFormData };

  @Watch("relatedCompanies")
  private onRelatedCompaniesChange() {
    if (
      this.relatedCompanies.length === 1 &&
      (!this.header || !this.header?.id)
    ) {
      this.formData.relatedCompanyId = this.relatedCompanies[0].id;
      this.formData.relatedCompanyName = this.relatedCompanies[0].name;
      this.updateHeader();
    }
  }
  @Watch("value", { immediate: true, deep: true })
  private onValueChange(value: DetailFormData) {
    // 判断数据变动过才更新
    if (getKeys(value).some(key => this.formData[key] !== value[key])) {
      this.formData = {
        ...value
      };
    }
    if (!this.formData.relatedCompanyId) {
      this.onRelatedCompaniesChange();
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

  public getFormValid() {
    let flag = false;
    this.$refs.form.validate(valid => {
      flag = valid;
      if (!valid) {
        // 验证样式渲染之后让验证错误的
        setTimeout(() => {
          const input: HTMLElement | null = this.$refs.form.$el.querySelector(
            ".is-error input"
          );
          input?.focus();
        });
      }
    });
    return flag;
  }

  private getFormData() {
    return {
      ...this.formData
    };
  }

  public clearValidate() {
    this.$refs.form.clearValidate();
  }

  render() {
    return (
      <el-form
        ref="form"
        label-position="left"
        size="mini"
        label-width="85px"
        class="form-item-small-margin-bottom autofocus"
        rules={rules}
        show-message={false}
        attrs={{
          model: this.formData
        }}
        disabled={!!this.header && !this.header?.actions.edit}
      >
        <el-row gutter={10}>
          <el-col span={7}>
            <el-form-item label="调入分公司" prop="companyId">
              <ht-autoselect
                v-model={this.formData.companyId}
                options={store.allCompanies()}
                clearable={false}
                highlight-first-item
                trigger-on-focus={false}
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col span={7}>
            <el-form-item label="调出分公司" prop="relatedCompanyId">
              <ht-autoselect
                v-model={this.formData.relatedCompanyId}
                defaultValue={this.formData.relatedCompanyName}
                on={{
                  "update:defaultValue": (val: string) =>
                    (this.formData.relatedCompanyName = val)
                }}
                options={this.relatedCompanies}
                clearable={false}
                highlight-first-item
                trigger-on-focus={false}
                disabled={!!this.header}
                onChange={this.updateHeader}
              />
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
            <el-form-item label="请调人" prop="businessManId">
              <ht-autoselect
                v-model={this.formData.businessManId}
                defaultValue={this.formData.businessManName}
                on={{
                  "update:defaultValue": (val: string) =>
                    (this.formData.businessManName = val)
                }}
                options={store.myStaffs()}
                clearable={false}
                highlight-first-item
                trigger-on-focus={false}
                onChange={this.updateHeader}
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="申请日期" prop="billDate" label-width="71px">
              <el-date-picker
                v-model={this.formData.billDate}
                clearable={false}
                editable={false}
                value-format="yyyy-MM-dd"
                type="date"
                onChange={this.updateHeader}
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item
              label="预期到货日期"
              label-width="87px"
              prop="planDate"
            >
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model={this.formData.planDate}
                type="date"
                onChange={this.updateHeader}
              />
            </el-form-item>
          </el-col>
          <el-col span={10}>
            <el-form-item label="备注" label-width="31px" prop="remark">
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
