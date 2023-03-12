export interface FinanceSummaryData {
  cooperatorId: number;
  cooperatorNo: string;
  cooperatorName: string;
  mainContact: string;
  mainContactPhone: number;
  cooperatorAreaId: string;
  cooperatorArea: string;
  cooperatorAddr: string;
  cooperatorType: string;
  purchaseManId: number;
  purchaseManName: string;
  salesManId: number;
  salesManName: string;
  creditLimit: string;
  previousBalance: string;
  receivableAmount: string;
  payableAmount: string;
  settledAmount: string;
  currentBalance: string;
}

export interface FinanceSubSummaryData {
  cooperatorId: number;
  cooperatorNo: string;
  cooperatorName: string;
  mainContact: string;
  mainContactPhone: number;
  cooperatorAreaId: string;
  cooperatorArea: string;
  cooperatorAddr: string;
  cooperatorType: string;
  purchaseManId: number;
  purchaseManName: string;
  salesManId: number;
  salesManName: string;
  creditLimit: string;
  previousBalance: string;
  receivableAmount: string;
  payableAmount: string;
  settledAmount: string;
  currentBalance: string;
}

export interface FinanceSummaryDetail {
  cooperatorId: number;
  cooperatorNo: string;
  cooperatorName: string;
  mainContact: string;
  mainContactPhone: number;
  cooperatorAreaId: string;
  cooperatorArea: string;
  cooperatorAddr: string;
  creditLimit: string;
  previousBalance: string;
  receivableAmount: string;
  payableAmount: string;
  settledAmount: string;
  currentBalance: string;
}
