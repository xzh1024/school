import { Component, Vue } from "vue-property-decorator";
import "@/utils/numberAPI";
import { namespace } from "vuex-class";
import { FRONT_PRECISION_TYPES, PRECISION_TYPES } from "@/constants";
import { getNumberByAcc } from "@/utils/tool";
const ParamsStore = namespace("admin/systemParams");

export type PrecisionTypes =
  | "money"
  | "price"
  | "qty"
  | "untaxedPrice"
  | "percentage";

/**
 * 只处理数据格式转换
 * 其它访问数据方法今后移除
 * 暂时应该只使用
 *  getFormatInvoiceType
 */

@Component
export default class PrecisionsFixedMixin extends Vue {
  @ParamsStore.State("precisions") private precisions!: {
    [key: string]: number;
  };

  getPrecisionNumber(precisionType: PrecisionTypes) {
    if (!PRECISION_TYPES.includes(precisionType)) {
      console.error(`precisionType不能为${precisionType}`);
      return 0;
    }
    return typeof this.precisions[`${precisionType}Precision`] === "number"
      ? this.precisions[`${precisionType}Precision`]
      : FRONT_PRECISION_TYPES[precisionType];
  }

  precisionByNumber(number: string | number, precision: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (["", null, undefined].includes(number as any)) {
      return 0;
    }
    return getNumberByAcc(number, precision);
  }
  precisionFormat(number: string | number, precisionType: PrecisionTypes) {
    const fixedNumber = this.getPrecisionNumber(precisionType);
    return this.precisionByNumber(number, fixedNumber);
  }
}
