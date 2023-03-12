<template>
  <ht-card title="急件到货单列表" class="list-card box-card auto-card">
    <div class="container-box content">
      <div class="scroll-list">
        <div
          v-for="(item, index) in billListData.rows"
          :key="index"
          :class="{ focus: index == focusIndex }"
          class="urgent-item"
          @click="updateFocusIndex(index)"
        >
          <div class="first-row">
            <bill-status-bar
              :bill-no="item.billNo"
              :bill-status="statusName(item.status)"
              style="width: 250px;"
            />
            <span>
              {{ item.billDate }}
            </span>
          </div>
          <div class="second-row">
            <i class="el-icon-user-solid" />
            <span>
              {{ item.cooperatorName }}
            </span>
          </div>
        </div>
      </div>
      <el-pagination
        style="text-align: right;"
        :small="true"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :pager-count="5"
        layout="total, sizes, prev, pager, next"
        :total="billListData.totalSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </ht-card>
</template>

<script>
import { PURCHASE_URGENT_STATUS } from "@/constants/states/purchase";
import BillStatusBar from "@/components/billStatusBar";

export default {
  name: "BillList",
  components: {
    BillStatusBar
  },
  props: {
    billListData: {
      type: Object,
      default() {
        return {
          totalSize: 0,
          rows: []
        };
      }
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      focusIndex: 0
    };
  },
  methods: {
    search() {
      this.$emit("search", this.currentPage, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.search();
    },
    updateFocusIndex(index) {
      this.focusIndex = index;
      this.$emit("changeBill", index);
    },
    statusName(stat) {
      return PURCHASE_URGENT_STATUS[stat];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.content {
  background-color: #fff !important;
}
.scroll-list {
  flex: auto;
  overflow: auto;
}
.urgent-item {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 5px;
  color: #7f7f7f;
  .first-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &.focus {
    color: $color-primary;
    @include font_color("color-primary");
    background-color: #e0f1fd;
  }
}
</style>
