<template>
  <div class="flex-container column-flex container-box" style="padding:5px">
    <div class="search-part">
      <search-form ref="searchRef" @search="search" @get-jump-id="getJumpId" />
    </div>
    <div class="content-part auto-block flex-container">
      <div class="urgent-list">
        <bill-list
          :bill-list-data="billListData"
          @changeBill="changeBill"
          @search="search"
        />
      </div>
      <div class="urgent-detail">
        <bill-detail
          ref="billDetail"
          :bill="billListData.rows[currentIndex]"
          @bill-change="handleBillChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchForm from "./SearchForm";
import BillList from "./BillList";
import BillDetail from "./BillDetail";
import { reqPurchaseDispatchArrivalList } from "@/api/purchase/purchaseDispatch";

export default {
  name: "Settlement",
  components: {
    SearchForm,
    BillList,
    BillDetail
  },
  data() {
    return {
      billListData: {
        totalSize: 0,
        rows: []
      },
      currentIndex: 0,
      pageSize: 10
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      autoSubmitWhenClose: state => state.params.autoSubmitWhenClose
    })
  },
  async deactivated() {
    if (this.autoSubmitWhenClose) {
      this.$refs.billDetail && (await this.$refs.billDetail.submitHandle());
    }
  },
  methods: {
    search(page, pageSize) {
      this.pageSize = pageSize;
      const req =
        this.$refs.searchRef &&
        this.$refs.searchRef.getSearchReq(page, pageSize);
      reqPurchaseDispatchArrivalList(req)
        .then(data => {
          this.billListData = data;
          this.billListData.rows = this.billListData.rows || [];
          this.currentIndex = 0;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeBill(index) {
      this.currentIndex = index;
    },
    handleBillChange() {
      this.search(1, this.pageSize);
    },
    getJumpId(jumpId) {
      this.$emit("get-jump-id", jumpId);
    }
  }
};
</script>

<style lang="stylus" scoped>
.content-part
    flex-direction row
    margin-top 5px
    .urgent-list
        width 400px
    .urgent-detail
        margin-left 5px
        flex auto
        width 1px
</style>
