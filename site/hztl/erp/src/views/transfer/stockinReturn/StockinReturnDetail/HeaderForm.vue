<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { pick } from "lodash";
import SearchMixin from "@/mixins/searchMixin";
import { getKeys } from "@/utils/tool";
import { dateFormat } from "@/utils/date";
import Collapse from "@/components/collapse";
import BillStatusBar from "@/components/billStatusBar";
import { AreaSelect, CooperatorsSelect } from "@/components/select";
import { DetailFormData } from "./constants";
import { Company, TransferBillItem } from "../../interface";
import * as store from "@/utils/store";

const defaultFormData: DetailFormData = {
  companyId: undefined,
  relatedCompanyId: undefined,
  paymentType: "内部挂账",
  billDate: dateFormat(new Date(), "YYYY-MM-DD"),
  businessManId: undefined,
  remark: "",
  receiverName: "",
  receiverPhone: "",
  receiverAreaId: undefined,
  receiverAddress: "",
  pickMethod: "",
  transportMethod: "",
  packMethod: "",
  freightPayer: "",
  logisticsCompanyId: undefined
};

const rules = {
  companyId: [
    {
      required: true,
      message: "请选择调入分公司！",
      trigger: "change"
    }
  ],
  relatedCompanyId: [
    {
      required: true,
      message: "请选择调出分公司！",
      trigger: "change"
    }
  ],
  paymentType: [
    {
      required: true,
      message: "请选择支付方式！",
      trigger: "change"
    }
  ],
  billDate: [
    {
      required: true,
      message: "请选择业务日期！",
      trigger: "change"
    }
  ]
};

@Component({
  components: {
    Collapse,
    AreaSelect,
    CooperatorsSelect,
    BillStatusBar
  }
})
export default class HeaderForm extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly loading!: boolean;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly billId?: number;
  @Prop() readonly companyId?: number;
  @Prop() readonly businessManId?: number;
  @Prop() readonly header!: TransferBillItem;
  @Prop() readonly relatedCompanies!: Company[];

  @Watch("relatedCompanies")
  private onRelatedCompaniesChange() {
    if (
      this.relatedCompanies.length === 1 &&
      (!this.header || !this.header?.id)
    ) {
      this.formData.relatedCompanyId = this.relatedCompanies[0].id;
    }
  }

  private logisticsCompanyName = "";
  private get spreadHeader() {
    if (!this.header) {
      return null;
    }
    return {
      ...this.header,
      ...this.header?.logistics!
    };
  }
  @Watch("spreadHeader", { immediate: true, deep: true })
  private onSpreadHeaderChange() {
    this.logisticsCompanyName = this.spreadHeader?.logisticsCompanyName || "";
  }
  private logisticsCompanyNameChange(val: string) {
    this.logisticsCompanyName = val;
  }

  private formData: DetailFormData = { ...defaultFormData };
  @Watch("header", { immediate: true, deep: true })
  private onHeaderChange() {
    if (this.spreadHeader) {
      this.formData = { ...pick(this.spreadHeader, getKeys(defaultFormData)) };
    } else {
      this.formData = {
        ...defaultFormData,
        billDate: dateFormat(new Date(), "YYYY-MM-DD")
      };
    }
    if (!this.formData.companyId) {
      this.formData.companyId = this.companyId;
    }
    if (!this.formData.businessManId) {
      this.formData.businessManId = this.businessManId;
    }
    if (!this.formData.relatedCompanyId) {
      this.onRelatedCompaniesChange();
    }
    this.$nextTick(() => {
      this.$refs.form?.clearValidate();
    });
  }

  private updateHeader() {
    if (!this.header?.id && !this.getFormValid()) {
      return;
    }
    this.$nextTick(() => {
      this.$emit("formDataChange", this.formData);
    });
  }

  private relatedCompanyChange(val?: number) {
    const relatedCompany = store.allCompanies().find(item => item.id === val);
    this.$emit("relatedCompanyChange", {
      id: relatedCompany?.id,
      name: relatedCompany?.name
    });
    this.updateHeader();
  }

  public getFormValid() {
    let flag = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      flag = valid;
      if (!valid) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips });
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

  public clearData() {
    this.onHeaderChange();
    this.$nextTick(() => {
      this.$refs.form?.clearValidate();
    });
  }

  render() {
    return (
      <el-form
        ref="form"
        v-loading={this.loading}
        disabled={!this.canEdit}
        attrs={{
          model: this.formData,
          rules: rules
        }}
        show-message={false}
        class="form-item-small-margin-bottom"
        label-width="85px"
        label-position="left"
        size="mini"
      >
        <Collapse>
          <el-row gutter={10}>
            <el-col span={7}>
              <el-form-item label="调入分公司" prop="companyId">
                <ht-autoselect
                  disabled
                  v-model={this.formData.companyId}
                  options={store.allCompanies()}
                  defaultValue={this.header?.companyName}
                  trigger-on-focus={false}
                  clearable={false}
                  highlight-first-item
                  placeholder="请选择"
                  filterZero
                />
              </el-form-item>
            </el-col>
            <el-col span={7}>
              <el-form-item label="调出分公司" prop="relatedCompanyId">
                <ht-autoselect
                  disabled={!!this.billId}
                  v-model={this.formData.relatedCompanyId}
                  defaultValue={this.header?.relatedBill?.companyName}
                  options={this.relatedCompanies}
                  trigger-on-focus={false}
                  clearable={false}
                  highlight-first-item
                  placeholder="请选择"
                  filterZero
                  onChange={this.relatedCompanyChange}
                />
              </el-form-item>
            </el-col>
            <el-col span={10}>
              <el-form-item label-width="0">
                <BillStatusBar
                  billNo={this.header?.billNo}
                  billStatus={this.header?.statusName || ""}
                />
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
              <el-form-item prop="billDate" label="业务日期">
                <el-date-picker
                  v-model={this.formData.billDate}
                  clearable={false}
                  editable={false}
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  onChange={this.updateHeader}
                />
              </el-form-item>
            </el-col>
            <el-col span={5}>
              <el-form-item label="业务员" label-width="45px">
                <ht-autoselect
                  v-model={this.formData.businessManId}
                  options={store.myStaffs()}
                  defaultValue={this.header?.businessManName}
                  trigger-on-focus={false}
                  clearable
                  filterZero
                  highlight-first-item
                  placeholder="请选择"
                  onChange={this.updateHeader}
                />
              </el-form-item>
            </el-col>
            <el-col span={10}>
              <el-form-item label="备注" label-width="31px">
                <ht-input
                  v-model={this.formData.remark}
                  maxlength="100"
                  placeholder="最大支持100个字符"
                  onChange={this.updateHeader}
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row slot="collapse" gutter={10}>
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
                  onChange={this.updateHeader}
                />
              </el-form-item>
            </el-col>
          </el-row>
        </Collapse>
      </el-form>
    );
  }
}
</script>
