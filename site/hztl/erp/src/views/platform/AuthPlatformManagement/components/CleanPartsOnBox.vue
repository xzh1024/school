<template>
  <div></div>
</template>

<script>
import {
  cleanAllPartsOnShelvesEx,
  cleanPartsOnShelvesEx
} from "@/api/bussiness/partsOnShelves";
import { CLEAN_ON_COUNT } from "@/constants";

const defaultDisplayNmus = {
  totalNum: 0,
  doneNum: 0,
  candidatesNum: 0,
  conflictsNum: 0,
  unverifiedNum: 0,
  failedNum: 0
};

export default {
  name: "CleanPartsOnBox",
  props: {
    visible: Boolean,
    platformKey: String,
    ids: {
      type: Array,
      default() {
        return [];
      }
    },
    all: Boolean,
    searchCondition: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "配件清洗上架-选择清洗品牌",
      isSelectBrands: false,
      selectedBrands: [],
      isReasult: false,
      resultOffsetId: 0,
      tableLoading: false,
      displayNmus: {
        ...defaultDisplayNmus
      },
      tableRows: [],
      matchPartTotalData: [],
      unverifiedPartTotalData: [],
      offset: CLEAN_ON_COUNT
    };
  },
  watch: {
    ids() {
      this.initSelectBrands();
      this.isReasult = false;
    },
    visible: {
      immediate: true,
      handler() {
        if (this.visible) {
          this.showConfirm();
        } else {
          this.closedHandle();
        }
      }
    }
  },
  methods: {
    initSelectBrands() {
      this.isSelectBrands = true;
    },
    showConfirm() {
      this.startClean();
    },
    startClean() {
      this.tableLoading = true;
      this.isReasult = true;
      this.title = "配件上架结果";
      this.isSelectBrands = false;
      if (this.all) {
        this.getTotalData();
      } else {
        cleanPartsOnShelvesEx({
          key: this.platformKey,
          ids: this.ids
        })
          .then(data => {
            this.displayNmus.totalNum = data.total;
            this.displayNmus.doneNum = data.doneNum;
            this.displayNmus.candidatesNum = data.candidatesNum;
            this.displayNmus.conflictsNum = data.conflictsNum;
            this.displayNmus.unverifiedNum = data.unverifiedNum;
            this.displayNmus.failedNum =
              data.shelveOnData &&
              data.shelveOnData.failedIds &&
              data.shelveOnData.failedIds.length
                ? data.shelveOnData.failedIds.length
                : 0;
            this.matchPartTotalData = data.shelveOnData.candidates || [];
            this.unverifiedPartTotalData = data.shelveOnData.unverified || [];
            this.tableRows = data.rows || [];
            this.getResultListData();
            this.showTips();
          })
          .catch(() => {
            this.tableLoading = false;
          });
      }
    },
    async getTotalData() {
      try {
        const data = await cleanAllPartsOnShelvesEx({
          key: this.platformKey,
          searchCondition: this.searchCondition,
          offsetId: this.resultOffsetId,
          vehBrands: this.selectedBrands
        });
        this.displayNmus.totalNum += data.total;
        this.displayNmus.doneNum += data.doneNum;
        this.displayNmus.candidatesNum += data.candidatesNum;
        this.displayNmus.conflictsNum += data.conflictsNum;
        this.displayNmus.unverifiedNum += data.unverifiedNum;
        this.displayNmus.failedNum +=
          data.shelveOnData &&
          data.shelveOnData.failedIds &&
          data.shelveOnData.failedIds.length
            ? data.shelveOnData.failedIds.length
            : 0;
        if (
          data.shelveOnData.candidates &&
          data.shelveOnData.candidates.length
        ) {
          this.matchPartTotalData.push(...data.shelveOnData.candidates);
        }
        if (
          data.shelveOnData.unverified &&
          data.shelveOnData.unverified.length
        ) {
          this.unverifiedPartTotalData.push(...data.shelveOnData.unverified);
        }
        if (data.rows && data.rows.length) {
          this.tableRows.push(...data.rows);
        }
        this.resultOffsetId = data.offsetId;
        if (data.total < this.offset) {
          this.getResultListData();
          this.showTips();
        } else {
          this.getTotalData();
        }
      } catch (err) {
        this.tableLoading = false;
      }
    },
    showTips() {
      if (this.displayNmus.totalNum !== this.displayNmus.doneNum) {
        this.$alert(
          `共上架 ${this.displayNmus.totalNum} 条，成功${this.displayNmus.doneNum} 条，冲突${this.displayNmus.conflictsNum} 条，失败${this.displayNmus.failedNum} 条。`
        );
      } else {
        this.$message.success({
          message: "配件上架成功！",
          showClose: true
        });
      }
    },
    getResultListData() {
      this.handleOnUpdate();
      const tableRowsObj = {};
      if (this.tableRows.length) {
        this.tableRows.forEach(item => {
          tableRowsObj[item.id] = { ...item };
        });
      }
      if (this.matchPartTotalData.length) {
        this.matchPartTotalData = this.matchPartTotalData.map(item => {
          let newItem = {};
          newItem = {
            ...tableRowsObj[item.swPartId],
            ...item,
            cleantBrand: item.brand,
            brand: tableRowsObj[item.swPartId].brand
          };
          return newItem;
        });
      }
      if (this.unverifiedPartTotalData.length) {
        this.unverifiedPartTotalData = this.unverifiedPartTotalData.map(
          item => {
            let newItem = {};
            newItem = {
              ...tableRowsObj[item.swPartId],
              ...item,
              cleantBrand: item.brand,
              brand: tableRowsObj[item.swPartId].brand
            };
            return newItem;
          }
        );
      }
      this.tableLoading = false;
    },
    handleOnUpdate() {
      this.$emit("on-update");
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    closedHandle() {
      this.selectedBrands = [];
      this.matchPartTotalData = [];
      this.unverifiedPartTotalData = [];
      this.tableRows = [];
      this.isSelectBrands = false;
      this.isReasult = false;
      this.resultOffsetId = 0;
      this.displayNmus = {
        ...defaultDisplayNmus
      };
    }
  }
};
</script>
