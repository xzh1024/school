<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { pick } from "lodash";
import SearchMixin from "@/mixins/searchMixin";
import { getKeys } from "@/utils/tool";
import { dateFormat } from "@/utils/date";
import Collapse from "@/components/collapse";
import BillStatusBar from "@/components/billStatusBar";
import { AreaSelect } from "@/components/select";
import { DetailFormData } from "./constants";
import { TransferBillItem } from "../../interface";
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
    BillStatusBar
  }
})
export default class HeaderForm extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly loading!: boolean;
  @Prop() readonly canEdit!: boolean;
  @Prop() readonly header!: TransferBillItem;
  private get spreadHeader() {
    if (!this.header) {
      return null;
    }
    return {
      ...this.header,
      ...this.header?.logistics!
    };
  }
  private formData: DetailFormData = { ...defaultFormData };
  @Watch("spreadHeader", { deep: true })
  private onHeaderChange() {
    this.formData = { ...pick(this.spreadHeader, getKeys(defaultFormData)) };
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

  public clearValidate() {
    this.$refs.form.clearValidate();
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
        label-width="75px"
        label-position="left"
        size="mini"
      >
        <Collapse>
          <el-row gutter={10}>
            <el-col span={7}>
              <el-form-item label="调出分公司" prop="companyId">
                <ht-input disabled value={this.header?.companyName} />
              </el-form-item>
            </el-col>
            <el-col span={7}>
              <el-form-item label="调入分公司" prop="relatedCompanyId">
                <ht-input
                  disabled
                  value={this.header?.relatedBill?.companyName}
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
              <el-form-item prop="billDate" label="业务日期" label-width="71px">
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
                <ht-input disabled v-model={this.formData.receiverName} />
              </el-form-item>
            </el-col>
            <el-col span={4}>
              <el-form-item label="收货电话" label-width="60px">
                <ht-input disabled v-model={this.formData.receiverPhone} />
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
              <el-form-item label="提货方式" label-width="60px">
                <ht-input disabled value={this.formData.pickMethod} />
              </el-form-item>
            </el-col>
            <el-col span={4}>
              <el-form-item label="运输方式" label-width="60px">
                <ht-input disabled value={this.formData.transportMethod} />
              </el-form-item>
            </el-col>

            <el-col span={4}>
              <el-form-item label="包装方式">
                <ht-input disabled value={this.formData.packMethod} />
              </el-form-item>
            </el-col>
            <el-col span={4}>
              <el-form-item label="运费付款方">
                <ht-input disabled value={this.formData.freightPayer} />
              </el-form-item>
            </el-col>
            <el-col span={6}>
              <el-form-item label="物流公司" label-width="60px">
                <ht-input
                  disabled
                  value={this.header?.logistics?.logisticsCompanyName}
                />
              </el-form-item>
            </el-col>
            <el-col span={6}>
              <el-form-item label="对方单号" label-width="60px">
                <ht-input disabled value={this.header?.relatedBill?.billNo} />
              </el-form-item>
            </el-col>
          </el-row>
        </Collapse>
      </el-form>
    );
  }
}
</script>
