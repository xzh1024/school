<template>
  <div class="el-card box-card" style="height: 100%">
    <el-tabs v-model="activeName">
      <el-tab-pane name="tohandle">
        <span slot="label"> 待处理（{{ total1 }}） </span>
        <visitLists
          :status="'tohandle'"
          @totalSizes="totalSize1"
          @reloadSize="load"
          v-if="activeName == 'tohandle'"
        />
      </el-tab-pane>
      <el-tab-pane name="handling">
        <span slot="label"> 处理中（{{ total2 }}） </span>
        <visitLists
          :status="'handling'"
          @totalSizes="totalSize2"
          @reloadSize="load"
          v-if="activeName == 'handling'"
        />
      </el-tab-pane>
      <el-tab-pane name="completed">
        <span slot="label"> 已完成（{{ total3 }}） </span>
        <visitLists
          :status="'completed'"
          @totalSizes="totalSize3"
          @reloadSize="load"
          v-if="activeName == 'completed'"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import visitLists from "./visitList";
import { visitList } from "@/api/repairs/visit";
export default {
  name: "reception-consultant",
  components: { visitLists },
  data() {
    return {
      activeName: "tohandle",
      total1: 0,
      total2: 0,
      total3: 0
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      visitList({ status: "tohandle" }).then(res => {
        this.total1 = res.totalSize;
      });
      visitList({ status: "handling" }).then(res => {
        this.total2 = res.totalSize;
      });
      visitList({ status: "completed" }).then(res => {
        this.total3 = res.totalSize;
      });
    },
    totalSize1(num) {
      this.total1 = num;
    },
    totalSize2(num) {
      this.total2 = num;
    },
    totalSize3(num) {
      this.total3 = num;
    }
    // tab切换
    // handleClick(tab, event) {
    //   console.log(tab);
    //   console.log(event);
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .el-tabs {
    height: 100%;
    .el-tabs__nav {
      margin-left: 10px;
    }
    .el-tabs__content {
      height: calc(100% - 39px);
      overflow: auto;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .el-tabs__header {
    margin: 0;
  }
}
</style>
