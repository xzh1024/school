import { defineStore } from 'pinia';

interface ProgressType {
  showEngine: boolean;
  showBusiness: boolean;
  drawerTitle: string;
  examineSearchData: SearchData;
}

interface SearchData {
  dataType: number;
  sourceType: number;
  businessType: number;
  procInsId: string;
  deployId: string;
  taskId: string;
  action?: boolean;
}

const useProgressStore = defineStore('progress', {
  state: (): ProgressType => ({
    showEngine: false,
    showBusiness: false,
    drawerTitle: '审批详情',
    examineSearchData: {} as SearchData
  }),

  actions: {
    setSearchData(searchData: SearchData) {
      this.examineSearchData = searchData;
    },
    resetSearchData() {
      this.examineSearchData = {
        dataType: 0,
        sourceType: 0,
        businessType: 0,
        procInsId: '',
        deployId: '',
        taskId: ''
      };
    },
    close() {
      if (this.examineSearchData.sourceType === 1) {
        this.showBusiness = false;
      } else if (this.examineSearchData.sourceType === 2) {
        this.showEngine = false;
      }
    },
    open() {
      if (this.examineSearchData.sourceType === 1) {
        this.showBusiness = true;
      } else if (this.examineSearchData.sourceType === 2) {
        this.showEngine = true;
      }
    },
    setTitle(title: string) {
      this.drawerTitle = title;
    }
  }
});

export default useProgressStore;
