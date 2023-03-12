<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="项目派工"
      width="1200px"
      v-on="$listeners"
    >
      <div class="card-wrap">
        <ht-card
          class="auto-card"
          style="width:600px;margin-right:5px;"
          title="班组/技师点选"
        >
          <div class="group-wrap">
            <div class="groups">
              <div
                :class="{
                  group: true,
                  active: activeGroupIndex === index
                }"
                v-for="(group, index) in groups"
                :key="index"
                @click="selectGroup(index, group)"
              >
                <p class="group-name">
                  <span class="free" v-if="group.itemCount == 0">闲</span>
                  {{ group.name }} （{{ group.technicianCount }}人）
                </p>
                <p class="group-info">
                  <span v-if="group.leaderName"
                    >组长: {{ group.leaderName }}</span
                  >
                  <span
                    >在修项目/工时: {{ group.itemCount }}/{{
                      group.chargeManHour
                    }}</span
                  >
                </p>
              </div>
            </div>
            <div class="techs">
              <div class="all-checked" v-if="techs && techs.length">
                全选
                <el-checkbox
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                />
              </div>
              <div
                :class="{
                  'tech-item': true,
                  active: tech.checked
                }"
                v-for="(tech, index) in techs"
                :key="index"
              >
                <div class="tech-info">
                  <div class="tech-name">
                    <span
                      class="free"
                      v-if="tech.itemCount == 0"
                      style="marginRight:5px;"
                      >闲</span
                    >
                    <span>{{ tech.staffName }}</span>
                    <span v-if="tech.levelName"> ({{ tech.levelName }})</span>
                    <span v-if="tech.isLeader"> (组长)</span>
                  </div>
                  <div class="tech-extra">
                    在修项目/工时: {{ tech.itemCount }}/{{ tech.chargeManHour }}
                  </div>
                </div>
                <div class="tech-check">
                  <el-checkbox
                    v-model="tech.checked"
                    @change="techSelectChange()"
                  />
                </div>
              </div>
            </div>
          </div>
        </ht-card>
        <ht-card
          class="auto-card"
          style="width:600px;margin-left:5px;"
          padding
          title="派工详情"
        >
          <div class="send-work-detail">
            <div class="send-work-item">
              <div class="send-work-item-title">班组</div>
              <div class="send-work-item-content">
                <div class="group-box">{{ selectGroupInfo.name }}</div>
              </div>
            </div>
            <div class="send-work-item">
              <div class="send-work-item-title">技师</div>
              <div class="send-work-item-content">
                <ht-setting-table
                  :data="checkedTechnicans"
                  :enable-table-setting="false"
                  :columns="techniciansColumns"
                  table-name="send-work-item"
                  style="height:200px;"
                />
              </div>
            </div>
            <div class="send-work-item">
              <div class="send-work-item-title">工位</div>
              <div class="send-work-item-content">
                <el-select
                  v-model="stationId"
                  @visible-change="getStationList"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in stations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="send-work-item">
              <div class="send-work-item-title">备注</div>
              <div class="send-work-item-content">
                <el-input v-model="remark" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </div>
        </ht-card>
      </div>
      <div
        class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
      >
        <el-button size="small" type="primary" @click="summit"
          >确定 （F3）</el-button
        >
        <el-button size="small" @click="cancelHandle">取消（ESC）</el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { getBillTechnicians } from "@/api/repairs/bills";
import { getStationList } from "@/api/basis/stationSet";
import { userInfoMsg } from "@/utils/store";
export default {
  name: "send-work",
  props: {
    vehicle: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.getGroups();
        }
      },
      immediate: true
    }
  },
  components: {},
  data() {
    return {
      selectGroupInfo: {},
      activeGroupIndex: 0,
      checkAll: false,
      stations: [],
      checkedTechnicans: [],
      remark: "",
      stationId: null,
      majorTechnicianId: null,
      techniciansColumns: [
        {
          prop: "staffName",
          label: "姓名"
        },
        {
          prop: "staffId",
          label: "主修人",
          render: value => (
            <el-radio v-model={this.majorTechnicianId} label={value}>
              <span> </span>
            </el-radio>
          )
        },
        {
          prop: "weight",
          label: "提成占比",
          formatter: value => {
            return value > 0
              ? (Number(value / this.totalWeight) * 100).toFixed(2) + "%"
              : "0%";
          }
        }
      ],
      groups: [],
      techs: []
    };
  },
  computed: {
    userInfoMsg() {
      return userInfoMsg();
    }
  },
  methods: {
    getStationList() {
      const { companyId } = this.userInfoMsg;
      getStationList({ companyId }).then(res => {
        const { rows } = res;
        this.stations = rows;
      });
    },
    cancelHandle() {
      this.$emit("close");
    },
    selectGroup(index, group) {
      this.checkAll = false;
      this.activeGroupIndex = index;
      this.selectGroupInfo = { ...group };

      this.techs = group.technicians || [];
      // 重置选中的技师
      this.techs.forEach(item => {
        item.checked = false;
      });
      this.checkedTechnicans = [];
      this.majorTechnicianId = null;
    },
    techSelectChange() {
      this.setCheckedTechnicans();
    },
    getGroups() {
      getBillTechnicians().then(res => {
        this.groups = res;
        this.selectGroup(0, this.groups[0]);
      });
    },
    setCheckedTechnicans() {
      const arr = [];
      let totalWeight = 0;
      this.techs.forEach(item => {
        if (item.checked) {
          arr.push(item);
          totalWeight += Number(Number(item.weight).toFixed(2));
        }
      });
      // console.log("totalWeight", totalWeight);
      this.totalWeight = totalWeight;
      this.checkedTechnicans = arr;
      this.checkAll = arr.length === this.techs.length;
    },
    handleCheckAllChange(val) {
      this.checkedTechnicans = val ? this.techs : [];
      this.techs.forEach(item => {
        item.checked = val;
      });
      this.setCheckedTechnicans();
    },
    summit() {
      const { id: technicianGroupId } = this.selectGroupInfo;

      if (!this.checkedTechnicans.length) {
        this.$message.warning("请选择修理技师");
        return;
      }
      if (!this.majorTechnicianId) {
        this.$message.warning("请选择主修人");
        return;
      }
      // if (!this.stationId) {
      //   this.$message.warning("请选择工位");
      //   return;
      // }
      const technicianIds = [];
      this.checkedTechnicans.forEach(item => {
        technicianIds.push(item.staffId);
      });
      const data = {
        technicianGroupId,
        technicianIds,
        majorTechnicianId: this.majorTechnicianId,
        stationId: this.stationId,
        remark: this.remark
      };
      this.$emit("dispatchWork", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  height: 600px;
  ::v-deep {
    .el-dialog {
      top: 7vh !important;
    }
    .el-card__body {
      padding: 0 !important;
    }
  }
}
.card-wrap {
  display: flex;
  justify-content: flex-start;
  height: 500px;
  .group-wrap {
    width: 585px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    .groups {
      width: 300px;
      overflow-y: scroll;
      .group {
        padding: 5px;
        border-left: solid 4px #fff;
        height: 60px;
        border-bottom: solid 1px #eee;
        p {
          margin: 0 0 6px 0;
        }
        :nth-child(2) {
          color: #999;
          span {
            margin-right: 10px;
          }
        }
      }
      .active {
        color: rgb(0, 160, 255) !important;
        background: rgb(221, 241, 255);
        border-left: solid 4px rgb(0, 160, 255) !important;
        :nth-child(2) {
          color: rgb(0, 160, 255) !important;
        }
      }
    }
    .techs {
      box-sizing: border-box;
      width: 300px;
      height: 500px;
      padding: 10px;
      background: rgb(251, 251, 251);
      overflow-y: scroll;
      .all-checked {
        text-align: right;
        padding-right: 12px;
        margin-bottom: 10px;
      }
      .active {
        color: rgb(0, 160, 255) !important;
        background: rgb(221, 241, 255) !important;
        border: solid 1px rgb(0, 160, 255) !important;
        .tech-info {
          color: rgb(0, 160, 255) !important;
        }
      }
      .tech-item {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border: solid 1px #eee;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 5px;
        text-align: left;
        .tech-info {
          width: 230px;
          height: 60px;
          padding: 10px;
          .tech-name,
          .tech-extra {
            height: 20px;
            line-height: 20px;
          }
        }
        .tech-check {
          width: 20px;
        }
      }
    }
  }
  .send-work-detail {
    flex: 1;
  }
}
.send-work-detail {
  padding: 10px 5px;
  .send-work-item {
    .send-work-item-title {
      margin-bottom: 10px;
    }
    .group-box {
      display: inline-block;
      padding: 10px;
      color: rgb(0, 160, 255) !important;
      background: rgb(221, 241, 255) !important;
      border: solid 1px rgb(0, 160, 255) !important;
      border-radius: 4px;
    }
  }
}
.free {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  background: #999;
}
</style>
