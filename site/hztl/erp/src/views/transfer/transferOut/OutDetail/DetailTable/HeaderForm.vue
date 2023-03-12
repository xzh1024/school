<script lang="tsx">
import { Component, Mixins, Model, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { Fragment } from "vue-fragment";
import SearchMixin from "@/mixins/searchMixin";
import { getKeys } from "@/utils/tool";
import BillStatusBar from "@/components/billStatusBar";
import Collapse from "@/components/collapse";
import { Company, TransferBillItem } from "@/views/transfer/interface";
import { AreaSelect, CooperatorsSelect } from "@/components/select";
import { defaultFormData, DetailFormData } from "./constants";
import * as store from "@/utils/store";

const rules = {
  companyId: [
    {
      required: true,
      message: "请选择调出分公司!",
      trigger: "change"
    }
  ],
  relatedCompanyId: [
    {
      required: true,
      message: "请选择调入分公司!",
      trigger: "change"
    }
  ],
  billDate: [
    {
      required: true,
      message: "请选择业务日期!",
      trigger: "change"
    }
  ],
  paymentType: [
    {
      required: true,
      message: "请选择支付方式!",
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
  @Prop() readonly loading!: boolean;

  @Watch("relatedCompanies")
  private onRelatedCompaniesChange() {
    if (
      this.relatedCompanies.length === 1 &&
      (!this.header || !this.header?.id)
    ) {
      this.formData.relatedCompanyId = this.relatedCompanies[0].id;
      this.updateHeader();
    }
  }

  private logisticsCompanyName = "";
  private get spreadHeader() {
    if (!this.header) {
      return undefined;
    }
    return {
      ...this.header,
      ...this.header?.logistics!
    };
  }
  @Watch("spreadHeader", { immediate: true, deep: true })
  private onHeaderChange() {
    this.logisticsCompanyName = this.spreadHeader?.logisticsCompanyName || "";
  }
  private logisticsCompanyNameChange(val: string) {
    this.logisticsCompanyName = val;
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
    //默认禁用调出分公司，页面刷新时走vuex的异步请求，提前触发两次change事件并验证companyID
    //作为一个不可修改的项，这个必定存在，所以仅在这个项不存在的情况下放行
    if (!this.formData.companyId) return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      flag = valid;
      if (!valid) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
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

  private formData = {
    ...defaultFormData
  };

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
        <Collapse
          scopedSlots={{
            default: () => (
              <Fragment>
                <el-row gutter={10}>
                  <el-col span={7}>
                    <el-form-item label="调出分公司" prop="companyId">
                      <ht-autoselect
                        v-model={this.formData.companyId}
                        options={store.allCompanies()}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable={false}
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col span={7}>
                    <el-form-item label="调入分公司" prop="relatedCompanyId">
                      <ht-autoselect
                        v-model={this.formData.relatedCompanyId}
                        defaultValue={this.formData.relatedCompanyName}
                        on={{
                          "update:defaultValue": (val: string) =>
                            (this.formData.relatedCompanyName = val)
                        }}
                        options={this.relatedCompanies}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable={false}
                        disabled={this.header && !!this.header.sourceId}
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
                        v-model={this.formData.billDate}
                        clearable={false}
                        editable={false}
                        type="date"
                        value-format="yyyy-MM-dd"
                        onChange={this.updateHeader}
                      />
                    </el-form-item>
                  </el-col>
                  <el-col span={5}>
                    <el-form-item
                      label="业务员"
                      label-width="45px"
                      prop="businessManId"
                    >
                      <ht-autoselect
                        v-model={this.formData.businessManId}
                        options={store.myStaffs()}
                        highlight-first-item
                        trigger-on-focus={false}
                        clearable
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
              </Fragment>
            ),
            collapse: () => (
              <el-row gutter={10}>
                <el-col span={4}>
                  <el-form-item label="收货人">
                    <ht-input
                      v-model={this.formData.receiverName}
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={4}>
                  <el-form-item label="收货电话" label-width="60px">
                    <ht-input
                      v-model={this.formData.receiverPhone}
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={8}>
                  <el-row>
                    <el-col span={14}>
                      <el-form-item label="收货地址" label-width="60px">
                        <AreaSelect
                          v-model={this.formData.receiverAreaId}
                          clearable
                          placeholder="请选择"
                          onChange={this.updateHeader}
                        />
                      </el-form-item>
                    </el-col>
                    <el-col span={10}>
                      <el-form-item label-width="0">
                        <ht-input
                          v-model={this.formData.receiverAddress}
                          placeholder="街道、门牌号等"
                          onChange={this.updateHeader}
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col span={4}>
                  <el-form-item label="提货方式" label-width="60px">
                    <ht-autocomplete
                      v-model={this.formData.pickMethod}
                      fetch-suggestions={this.autocompleteSearchDeliveryType}
                      trigger-on-focus={false}
                      clearable
                      highlight-first-item
                      placeholder="请选择"
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={4}>
                  <el-form-item label="运输方式" label-width="60px">
                    <ht-autocomplete
                      v-model={this.formData.transportMethod}
                      fetch-suggestions={this.autocompleteSearchTransportType}
                      trigger-on-focus={false}
                      clearable
                      highlight-first-item
                      placeholder="请选择"
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>

                <el-col span={4}>
                  <el-form-item label="包装方式">
                    <ht-autocomplete
                      v-model={this.formData.packMethod}
                      fetch-suggestions={this.autocompleteSearchPackWay}
                      trigger-on-focus={false}
                      clearable
                      highlight-first-item
                      placeholder="请选择"
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={4}>
                  <el-form-item label="运费付款方" label-width="75px">
                    <ht-autoselect
                      v-model={this.formData.freightPayer}
                      options={store.freightPayerDictionary()}
                      trigger-on-focus={false}
                      clearable
                      highlight-first-item
                      placeholder="请选择"
                      onChange={this.updateHeader}
                    />
                  </el-form-item>
                </el-col>
                <el-col span={6}>
                  <el-form-item label="物流公司" label-width="60px">
                    <CooperatorsSelect
                      v-model={this.formData.logisticsCompanyId}
                      clearable
                      defaultValue={this.logisticsCompanyName}
                      onDefaultValueChange={this.logisticsCompanyNameChange}
                      allowCreate={true}
                      type="logistics"
                      no-data-tips="没有查询到物流公司,回车新增"
                      placeholder="请选择"
                      onChange={this.updateHeader}
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
