<template>
  <div class="area">
    <div class="deps-list">
      <div class="deps" v-for="dep in currentStationList" :key="dep.id">
        <el-tag
          v-if="!dep.isEdit"
          closable
          :disable-transitions="false"
          @close="handleClose(dep)"
        >
          {{ dep.name }}
        </el-tag>
      </div>
      <div class="deps">
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="newTagInput"
          size="small"
          @keyup.enter.native="debouncedHandleInputEnter"
          @change="debouncedHandleInputEnter"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showNewDepInput"
          >+添加工位</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import {
  getStationList,
  addStation,
  delStation
} from "@/api/basis/stationSet/index";

export default {
  props: {
    companyId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    companyId: {
      handler() {
        this.getStationLists();
      },
      deep: true
    }
  },
  data() {
    return {
      stationId: 0, // 工位id
      currentStationList: [], // 当前工位列表
      inputVisible: false,
      inputValue: "",
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter) // 解决回车导致两个切换问题
    };
  },
  methods: {
    // 获取工位列表
    getStationLists() {
      const params = { companyId: this.companyId };
      getStationList(params)
        .then(res => {
          this.currentStationList = res.rows;
        })
        .catch(() => {
          this.currentStationList = [];
        });
    },
    // 新增
    handleInputEnter() {
      let val = this.inputValue;
      val = val.replace(/^\s+|\s+$/g, "");
      if (val) {
        const data = {
          companyId: this.companyId,
          name: val
        };
        addStation(data)
          .then(res => {
            if (res) {
              this.getStationLists();
            }
          })
          .catch(() => {});
        this.inputVisible = false;
      } else {
        this.inputVisible = false;
        this.inputValue = "";
      }
    },
    // 删除
    handleClose(val) {
      this.$confirm(`确定删除该工位吗？`, "提示", {
        type: "warning"
      }).then(() => {
        const data = {
          companyId: this.companyId,
          stationId: val.id
        };
        delStation(data)
          .then(res => {
            if (res) {
              this.getStationLists();
            }
          })
          .catch(() => {});
      });
    },
    showNewDepInput() {
      this.inputVisible = true;
      this.inputValue = "";
      this.$nextTick(() => {
        this.$refs.newTagInput.$refs.input.focus();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.deps-list {
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  .deps {
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
