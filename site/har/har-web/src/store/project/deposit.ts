import { defineStore } from 'pinia';

interface CostProjectList {
  id?: number | string;
  expenseCode?: string;
  expenseName?: string;
  expenseItemId?: number | string;
  expenseItemName?: string;
  contractRangeDate?: string;
  receivableAmount?: number;
  receivedAmount?: number;
  processedAmount?: number;
  availableAmount?: number;
  currentAvailableAmount?: number;
}

interface CostInfo {
  projectId?: number | string;
  projectName?: string;
  merchantId?: number | string;
  merchantName?: string;
  storeId?: number | string;
  storeName?: string;
  contractCode?: string;
  constProjectList: Array<CostProjectList>;
}

type SearchData = {
  projectId?: number;
  storeId?: number;
  merchantId?: number;
  expenseCode?: string;
  disabled?: boolean;
};

export const useDepositStore = defineStore('deposit', {
  state() {
    return {
      costInfo: {} as CostInfo,
      searchData: {} as SearchData
    };
  },
  actions: {
    clearSearchData() {
      this.searchData = {};
    },
    setSearchData(payload: SearchData) {
      this.searchData = payload;
    },
    setCostInfo(payload: CostInfo) {
      this.costInfo = payload;
    },
    delChooseCostProject(id: string) {
      const index = this.costInfo.constProjectList.findIndex(
        (item) => item.expenseItemId === id
      );
      if (index > -1) {
        this.costInfo.constProjectList.splice(index, 1);
        if (this.costInfo.constProjectList.length < 1) {
          this.clearCostInfo();
        }
      }
    },
    clearCostInfo() {
      this.costInfo = {
        constProjectList: []
      };
    }
  }
});
