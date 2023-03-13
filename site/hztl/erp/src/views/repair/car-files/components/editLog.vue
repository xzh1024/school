<template>
  <ht-dialog
    v-bind="$attrs"
    :title="`车辆档案修改日志- ${plateNumber}`"
    width="1150px"
    v-on="$listeners"
  >
    <div class="time-line-wrap">
      <el-timeline v-loading="loading">
        <el-scrollbar style="height:500px;" id="scrollbar" ref="scrollbar">
          <el-timeline-item
            v-for="(item, index) in timeLine"
            :key="index"
            :timestamp="
              item.createdName + '  ' + dateFormatToSecond(item.createdAt)
            "
            placement="top"
          >
            <div class="event-item">
              <p>{{ FILEACTION[item.actionType] }}</p>
              <li v-for="(info, infoIndex) in item.contents" :key="infoIndex">
                <span class="field">{{ info.fieldName }}:</span>
                <span class="old">由「{{ info.old }}」</span>
                <span class="new">修改为「{{ info.new }}」</span>
              </li>
            </div>
          </el-timeline-item>
          <div id="load" style="height:1px;width: 80%;margin: 0 auto;"></div>
          <div v-if="state" style="text-align:center;height: 28px;">
            没有更多了
          </div>
        </el-scrollbar>
      </el-timeline>
    </div>
  </ht-dialog>
</template>

<script>
import infiniteScroll from "vue-infinite-scroll";
import { vehicleLogs } from "@/api/repairs";
import {
  FIELDENUM,
  FILEACTION
} from "@/components/repair/carFile/fieldSetting";
import { dateFormatToSecond } from "@/utils/date";
export default {
  name: "EditLog",
  directives: { infiniteScroll },
  props: {
    currentFile: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.timeLine = [];
          this.page = 1;
          this.state = false;
          this.$nextTick(() => {
            document
              .getElementById("scrollbar")
              .addEventListener("scroll", this.listenScrollbar, true);
          });
          this.getLogs(1);
        }
      },
      immediate: true
    },
    currentFile: {
      handler(value) {
        if (value) {
          // console.log("编辑模式");
          this.isNew = false;
          const { plateNumber, id } = value;
          this.currentId = id;
          this.plateNumber = plateNumber;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      loading: true,
      reverse: true,
      state: false,
      flag: false,
      dateFormatToSecond,
      FIELDENUM,
      FILEACTION,
      plateNumber: "",
      page: 1,
      pageSize: 5,
      totalPage: 0,
      currentId: 0,
      timeLine: []
    };
  },
  mounted() {
    //监听事件
    this.flag = true;
  },
  methods: {
    listenScrollbar() {
      if (this.flag) {
        //scrollbar  在App.vue页面  滚动条    这个一定要找到
        // console.log(document.getElementById("scrollbar").firstChild.scrollTop);
        const let1 = document.getElementById("scrollbar").firstChild.scrollTop; //滚动条滚动距离
        const let2 = document.getElementById("scrollbar").firstChild
          .scrollHeight; //浏览器总高度
        const let3 = document.getElementById("scrollbar").scrollHeight; //浏览器可见高度
        if (let2 - let3 - let1 <= 0.05) {
          this.flag = false;
          // console.log("底部");
          if (this.page >= this.totalPage) {
            this.state = true;
            return;
          }
          const loadingInstance = this.$loading({
            target: "#load",
            text: "加载中"
          });
          ++this.page;
          // console.log(this.metaparams.page);
          setTimeout(() => {
            this.getLogs(this.page);
            loadingInstance.close();
          }, 2000);
        }
      }
    },
    getLogs(page) {
      this.busy = true;
      vehicleLogs({
        VehicleId: this.currentId,
        page,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalPage } = res;
        this.totalPage = totalPage;
        if (rows && rows.length !== 0) {
          this.timeLine = page == 1 ? rows : [...this.timeLine, ...rows];
          this.reverse = true;
          this.loading = false;
          this.flag = true;
        }
        if (this.page < totalPage) {
          this.state = false;
        } else {
          this.flag = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.time-line-wrap {
  height: 520px;
  ::v-deep {
    .el-scrollbar__wrap {
      box-sizing: border-box;
    }
    .el-scrollbar__bar .is-horizontal {
      display: none;
    }
    .el-card__body {
      overflow-y: hidden;
    }
  }
}
.event-item {
  padding: 10px 20px 20px;
  border-radius: 10px;
  background: rgb(242, 242, 242);
}
</style>
