import {
  TABLE_COLUMN_ALLOC_IN_SUMMARY,
  TABLE_COLUMN_ALLOC_IN_DETAIL
} from "@/constants/report/allocIn";
import {
  TABLE_COLUMN_ALLOC_OUT_SUMMARY,
  TABLE_COLUMN_ALLOC_OUT_DETAIL
} from "@/constants/report/allocOut";
import {
  TABLE_COLUMN_FINANICIALLOGIN_SUMMARY,
  TABLE_COLUMN_FINANICIALLOGIN_DETAIL
} from "@/constants/report/financialLogIn";
import {
  TABLE_COLUMN_FINANICIALLOGOUT_SUMMARY,
  TABLE_COLUMN_FINANICIALLOGOUT_DETAIL
} from "@/constants/report/financialLogOut";
import {
  TABLE_COLUMN_LOGREG_SUMMARY,
  TABLE_COLUMN_LOGREG_DETAIL
} from "@/constants/report/logisticReg";
import {
  TABLE_COLUMN_PAY_IN_SUMMARY,
  TABLE_COLUMN_PAY_IN_DETAIL
} from "@/constants/report/payIn";
import {
  TABLE_COLUMN_PAY_OUT_SUMMARY,
  TABLE_COLUMN_PAY_OUT_DETAIL
} from "@/constants/report/payOut";
import {
  TABLE_COLUMN_PURCHASE_SUMMARY,
  TABLE_COLUMN_PURCHASE_DETAIL
} from "@/constants/report/purchase";
import {
  TABLE_COLUMN_SALE_SUMMARY,
  TABLE_COLUMN_SALE_DETAIL
} from "@/constants/report/sale";
import {
  TABLE_COLUMN_STOCK_SUMMARY,
  TABLE_COLUMN_STOCK_DETAIL
} from "@/constants/report/stocktaking";

export const TYPE_TO_COLUMN_SUMMARY = {
  AllocIn: TABLE_COLUMN_ALLOC_IN_SUMMARY.columns,
  AllocOut: TABLE_COLUMN_ALLOC_OUT_SUMMARY.columns,
  FinancialLogIn: TABLE_COLUMN_FINANICIALLOGIN_SUMMARY.columns,
  FinancialLogOut: TABLE_COLUMN_FINANICIALLOGOUT_SUMMARY.columns,
  LogisticRegistration: TABLE_COLUMN_LOGREG_SUMMARY.columns,
  ReceivablePayableIn: TABLE_COLUMN_PAY_IN_SUMMARY.columns,
  ReceivablePayableOut: TABLE_COLUMN_PAY_OUT_SUMMARY.columns,
  Purchase: TABLE_COLUMN_PURCHASE_SUMMARY.columns,
  Sale: TABLE_COLUMN_SALE_SUMMARY.columns,
  Stocktaking: TABLE_COLUMN_STOCK_SUMMARY.columns
};

export const TYPE_TO_COLUMN_DETAIL = {
  AllocIn: TABLE_COLUMN_ALLOC_IN_DETAIL.columns,
  AllocOut: TABLE_COLUMN_ALLOC_OUT_DETAIL.columns,
  Purchase: TABLE_COLUMN_PURCHASE_DETAIL.columns,
  Sale: TABLE_COLUMN_SALE_DETAIL.columns,
  ReceivablePayableIn: TABLE_COLUMN_PAY_IN_DETAIL.columns,
  ReceivablePayableOut: TABLE_COLUMN_PAY_OUT_DETAIL.columns,
  LogisticRegistration: TABLE_COLUMN_LOGREG_DETAIL.columns,
  Stocktaking: TABLE_COLUMN_STOCK_DETAIL.columns,
  FinancialLogIn: TABLE_COLUMN_FINANICIALLOGIN_DETAIL.columns,
  FinancialLogOut: TABLE_COLUMN_FINANICIALLOGOUT_DETAIL.columns
};
