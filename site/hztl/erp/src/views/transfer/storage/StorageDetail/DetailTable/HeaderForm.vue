<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import Collapse from "@/components/collapse";
import { AreaSelect } from "@/components/select";
import { Form } from "hztl-ui";
import SearchMixin from "@/mixins/searchMixin";
import BillStatusBar from "@/components/billStatusBar";
import transferService from "../../transferService";
import { DetailFormData, defaultFormData } from "./constants";
import { getKeys } from "@/utils/tool";
import { pick } from "lodash";
import { Company, TransferBillItem } from "@/views/transfer/interface";
import * as store from "@/utils/store";

const rules = {
  billDate: [
    {
      required: true,
      message: "请选择业务日期!",
      trigger: "change"
    }
  ]
};

@Component({
  components: {
    BillStatusBar,
    Collapse
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };
  protected transferService = transferService;
  private formData: DetailFormData = { ...defaultFormData };
  @Prop() readonly header?: TransferBillItem;
  @Prop() readonly relatedCompanies!: Company[];
  @Prop() readonly loading!: boolean;

  @Watch("relatedCompanies")
  private onRelatedCompaniesChange() {
    if (
      this.relatedCompanies.length === 1 &&
      (!this.header || !this.header?.id)
    ) {
      this.formData.relatedCompanyId = this.relatedCompanies[0].id;
    }
  }

  private get spreadHeader() {
    if (!this.header) {
      return undefined;
    }
    return {
      ...this.header,
      ...this.header?.logistics!
    };
  }
  @Watch("spreadHeader")
  private onHeaderChange() {
    const data = pick(this.spreadHeader, getKeys(defaultFormData));
    this.formData = {
      ...data,
      billDate: this.header?.billDate || defaultFormData.billDate
    };
  }

  private updateHeader() {
    if (!this.header?.id && !this.getFormValid()) {
      return;
    }
    this.$nextTick(() => {
      this.$emit("formDataChange", this.formData);
    });
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

  render() {
    return (
      <el-form
        ref="form"
        label-position="left"
        size="mini"
        label-width="75px"
        class="form-item-small-margin-bottom"
        rules={rules}
        show-message={false}
        attrs={{
          model: this.formData
        }}
      >
        <Collapse
          scopedSlots={{
            default: () => (
              <Fragment>
                <el-row gutter={10}>
                  <el-col span={7}>
                    <el-form-item label="调入分公司" prop="companyId">
                      <ht-autoselect
                        disabled
                        v-model={this.formData.companyId}
                        options={store.allCompanies()}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable
                      />
                    </el-form-item>
                  </el-col>
                  <el-col span={7}>
                    <el-form-item label="调出分公司" prop="relatedCompanyId">
                      <ht-autoselect
                        disabled
                        v-model={this.formData.relatedCompanyId}
                        options={this.relatedCompanies}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable
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
                  <el-col span={4}>
                    <el-form-item label="支付方式" prop="paymentType">
                      <ht-input disabled v-model={this.formData.paymentType} />
                    </el-form-item>
                  </el-col>
                  <el-col span={5}>
                    <el-form-item
                      label="业务日期"
                      prop="billDate"
                      label-width="71px"
                    >
                      <el-date-picker
                        disabled={!this.header?.actions.edit}
                        v-model={this.formData.billDate}
                        type="date"
                        value-format="yyyy-MM-dd"
                        onChange={this.updateHeader}
                      />
                    </el-form-item>
                  </el-col>
                  <el-col span={5}>
                    <el-form-item
                      label="业务员"
                      prop="businessManId"
                      label-width="45px"
                    >
                      <ht-autoselect
                        disabled={!this.header?.actions.edit}
                        v-model={this.formData.businessManId}
                        defaultValue={this.header?.businessManName}
                        options={store.myStaffs()}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable
                        onChange={this.updateHeader}
                      />
                    </el-form-item>
                  </el-col>
                  <el-col span={10}>
                    <el-form-item label="备注" prop="remark" label-width="31px">
                      <ht-input
                        disabled={!this.header?.actions.edit}
                        v-model={this.formData.remark}
                        onChange={this.updateHeader}
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </Fragment>
            ),
            collapse: () => (
              <el-row gutter={10}>
                <el-col span={4}>
                  <el-form-item label="收货人" prop="receiverName">
                    <ht-input
                      disabled
                      v-model={this.formData.receiverName}
                      placeholder="收货人"
                    />
                  </el-form-item>
                </el-col>
                <el-col span={4}>
                  <el-form-item
                    label="收货电话"
                    prop="receiverPhone"
                    label-width="60px"
                  >
                    <ht-input
                      disabled
                      v-model={this.formData.receiverPhone}
                      placeholder="收货电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-row>
                    <el-col span={14}>
                      <el-form-item label="收货地址" label-width="60px">
                        <AreaSelect
                          disabled
                          v-model={this.formData.receiverAreaId}
                          placeholder="请选择"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={10}>
                      <el-form-item label-width="0">
                        <ht-input
                          disabled
                          v-model={this.formData.receiverAddress}
                          placeholder="街道、门牌号等"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col span={4}>
                  <el-form-item
                    prop="pickMethod"
                    label="提货方式"
                    label-width="60px"
                  >
                    <ht-input
                      disabled
                      v-model={this.formData.pickMethod}
                      placeholder="提货方式"
                    />
                  </el-form-item>
                </el-col>
                <el-col span={4}>
                  <el-form-item
                    prop="transportMethod"
                    label="运输方式"
                    label-width="60px"
                  >
                    <ht-input
                      disabled
                      v-model={this.formData.transportMethod}
                      placeholder="运输方式"
                    />
                  </el-form-item>
                </el-col>

                <el-col span={4}>
                  <el-form-item prop="packMethod" label="包装方式">
                    <ht-input
                      disabled
                      v-model={this.formData.packMethod}
                      placeholder="包装方式"
                    />
                  </el-form-item>
                </el-col>
                <el-col span={6}>
                  <el-form-item
                    prop="logisticsCompanyId"
                    label="物流公司"
                    label-width="60px"
                  >
                    <ht-input
                      disabled
                      value={this.header?.logistics?.logisticsCompanyName}
                      placeholder="物流公司"
                    />
                  </el-form-item>
                </el-col>
                <el-col span={6}>
                  <el-form-item label="对方单号" label-width="60px">
                    <ht-input
                      disabled
                      value={this.header?.relatedBill?.billNo}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            )
          }}
        />
      </el-form>
    );
  }
}
</script>
