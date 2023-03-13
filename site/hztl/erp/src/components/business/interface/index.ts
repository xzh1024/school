export interface InformationRow {
  name?: string;
  content?: string | number;
  type?:
    | "billType"
    | "amount"
    | "settledAmount"
    | "discountAmount"
    | "unSettledAmount";
}

export interface SettlData {
  id: number;
  billType: string;
  amount: number | string;
  discountAmount: number | string;
  enhancedSettlementType: string;
  settledAmount?: number | string;
  paymentBy?: string;
  confirmDate?: string;
  fundAccountId?: number;
  cooperatorId?: number;
  remark?: string;

  taxRate?: number;
  billNo?: string; // 单据号
  invoiceType?: string; // 发票类型
  isUnsettle?: boolean; // 是否反结算
}

export interface SettleProps {
  loading: boolean;
  reset: boolean;
  InformationList: InformationRow[];
  settlData?: SettlData;
  companyId?: number;
}

export interface SettleEvent {
  onSolve: (isSubmit: number) => void;
}
