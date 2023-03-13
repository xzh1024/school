import { Component, Mixins } from "vue-property-decorator";
import { CELL_WIDTH } from "@/constants";
import { multiply } from "@/utils/numberAPI";
import * as store from "@/utils/store";
import SearchMixin from "./searchMixin";

interface DictionaryOption {
  name: string;
  id: string | number;
  mnemonic?: string;
  [key: string]: string | number | boolean | undefined;
}

interface OptionsData {
  companies: DictionaryOption[];
  allStaffs: DictionaryOption[];
}

/**
 * 只处理数据格式转换
 * 其它访问数据方法今后移除
 * 暂时应该只使用
 *  getFormatInvoiceType
 */

@Component
export default class BaseDataMixin extends Mixins(SearchMixin) {
  protected CELL_WIDTH = CELL_WIDTH;

  get options(): OptionsData {
    return {
      companies: this.$store.state.admin.baseData.companies,
      allStaffs: this.$store.state.admin.staffs.allStaffs
    };
  }

  private findCompany(id: number) {
    if (!id) {
      return "";
    }
    return this.options.companies.find(item => item.id == id);
  }
  protected getCompanyName(id: number) {
    if (!id) {
      return "";
    }
    const company = this.findCompany(id);
    return company ? company.name : id;
  }
  protected getStaffName(id: number) {
    if (!id) {
      return "";
    }
    const staff = this.options.allStaffs.find(item => item.id == id);
    return staff ? staff.name : id;
  }
  protected getFormatSettleType(
    settlementType: string,
    paymentType: Array<string>
  ) {
    let formatValue = "";
    if (settlementType) {
      if (paymentType && paymentType.length > 0) {
        formatValue = `${settlementType}（${paymentType[0]})`;
      } else {
        const settleType =
          store.enhancedSettlementTypeDictionary().find(item => {
            return item.name == settlementType;
          }) || "";
        formatValue = settleType ? `${settleType.name}` : settlementType;
      }
    }
    return formatValue;
  }
  protected getFormatInvoiceType(invoiceName?: string, taxRate?: number) {
    let formatValue = "";
    if (invoiceName) {
      if (taxRate) {
        formatValue = `${invoiceName}（${multiply(Number(taxRate), 100)}%）`;
      } else {
        const invoiceType =
          store.invoiceTypeDictionary().find(item => {
            return item.name == invoiceName;
          }) || "";
        formatValue = invoiceType
          ? `${invoiceType.name}（${multiply(
              Number(invoiceType.specialValue),
              100
            )}%）`
          : invoiceName;
      }
    }
    return formatValue;
  }
}
