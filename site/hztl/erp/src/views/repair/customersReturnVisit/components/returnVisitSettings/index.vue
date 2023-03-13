<template>
  <div class="container-box" style="height:100%">
    <div
      class="setting-btns"
      v-if="hasBelongsPermWithoutRoute('update', 'repairs.review.setting')"
    >
      <el-button
        type="primary"
        size="small"
        style="margin-left: 10px"
        @click="savaSetting"
      >
        保存（F3）
      </el-button>
    </div>
    <div
      v-loading="loading"
      :style="
        hasBelongsPermWithoutRoute('update', 'repairs.review.setting')
          ? 'height: calc(100% - 55px)'
          : 'height: calc(100% - 10px);margin-top:5px'
      "
    >
      <el-row :gutter="10" style="height:100%;margin:0">
        <el-col :span="8" style="height:100%">
          <ht-card title="回访单生成规则" style="height:100%">
            <el-form
              ref="form"
              label-position="left"
              :model="form"
              label-width="100px"
            >
              <el-form-item label="生成时间" required>
                <span style="padding: 0 10px 0 70px">出厂后</span>
                <!-- <el-input
                  v-model="setting.durationDay"
                  size="small"
                  style="width:120px"
                >
                  <template slot="append">天</template>
                </el-input> -->
                <el-input-number
                  v-model="setting.durationDay"
                  :precision="0"
                  :disabled="
                    !hasBelongsPermWithoutRoute(
                      'update',
                      'repairs.review.setting'
                    )
                  "
                  controls-position="right"
                  size="small"
                  :min="0"
                  :max="90"
                ></el-input-number>
                <span style="display:inline-block;padding: 0 10px;">天</span>
              </el-form-item>
              <el-form-item label="指定回访人" required>
                <div>
                  <el-radio
                    v-model="setting.reviewManType"
                    :disabled="
                      !hasBelongsPermWithoutRoute(
                        'update',
                        'repairs.review.setting'
                      )
                    "
                    label="fixed"
                  >
                    指定回访客服
                  </el-radio>
                  <el-select
                    v-model="setting.reviewFixedMan"
                    size="small"
                    style="width: 130px"
                    placeholder="请选择"
                    :disabled="
                      !hasBelongsPermWithoutRoute(
                        'update',
                        'repairs.review.setting'
                      )
                    "
                  >
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-radio
                    v-model="setting.reviewManType"
                    :disabled="
                      !hasBelongsPermWithoutRoute(
                        'update',
                        'repairs.review.setting'
                      )
                    "
                    label="reception"
                  >
                    工单对应接待顾问
                  </el-radio>
                </div>
              </el-form-item>
            </el-form>
          </ht-card>
        </el-col>
        <el-col :span="16" style="height:100%">
          <ht-card title="回访问题设置" style="height:100%">
            <p>回访问题</p>
            <el-table :data="setting.questions" border style="width: 95%">
              <el-table-column label="序号" type="index" width="50">
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <span
                    class="stop"
                    v-if="
                      scope.row.status == 'enable' &&
                        hasBelongsPermWithoutRoute(
                          'update',
                          'repairs.review.setting'
                        )
                    "
                    @click="stop(scope.$index)"
                  >
                    停用
                  </span>
                  <span
                    class="open"
                    v-if="scope.row.status == 'disable'"
                    @click="open(scope.$index)"
                  >
                    启用
                  </span>
                  <i
                    v-if="
                      scope.row.status == 'disable' &&
                        !scope.row.isBuiltin &&
                        hasBelongsPermWithoutRoute(
                          'update',
                          'repairs.review.setting'
                        )
                    "
                    class="el-icon-delete-solid del"
                    @click="delQuestions(scope.$index)"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column label="问题">
                <template slot-scope="scope">
                  <span v-if="scope.row.isBuiltin">{{ scope.row.name }}</span>
                  <el-input
                    v-model="scope.row.name"
                    size="small"
                    v-if="!scope.row.isBuiltin"
                    :disabled="
                      !hasBelongsPermWithoutRoute(
                        'update',
                        'repairs.review.setting'
                      )
                    "
                  >
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column label="评分" width="100">
                1-10
              </el-table-column>
              <el-table-column label="排序" width="150">
                <template slot-scope="scope">
                  <i
                    v-if="
                      scope.$index > 0 &&
                        hasBelongsPermWithoutRoute(
                          'update',
                          'repairs.review.setting'
                        )
                    "
                    class="el-icon-top sort"
                    @click="questionsUp(scope.$index)"
                  ></i>
                  <i
                    :style="scope.$index == 0 ? 'margin-left:34px' : ''"
                    v-if="
                      scope.$index < setting.questions.length - 1 &&
                        hasBelongsPermWithoutRoute(
                          'update',
                          'repairs.review.setting'
                        )
                    "
                    class="el-icon-bottom sort"
                    @click="questionsDown(scope.$index)"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="primary"
              size="small"
              style="margin: 10px 0"
              @click="addQuestions"
              v-if="
                hasBelongsPermWithoutRoute('update', 'repairs.review.setting')
              "
            >
              +添加问题
            </el-button>
          </ht-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { getSettings, updateSettings } from "@/api/repairs/visit";

export default {
  name: "visit-setting",
  data() {
    return {
      loading: false,
      form: {},
      userOptions: [],
      setting: {}
    };
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      // this.dialigForm = {};
      this.getUsers();
      this.getSetting();
    },
    // 获取用户信息
    getUsers() {
      const params = {
        company: "self",
        roles: ["customerService", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
      });
    },
    // 获取设置信息
    getSetting() {
      this.loading = true;
      const params = {
        module: "repair",
        type: "reviewSet"
      };
      getSettings(params)
        .then(res => {
          this.setting = res.value;
          if (this.setting.reviewFixedMan == 0) {
            this.setting.reviewFixedMan = "";
          }
          // console.log(this.setting);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 启用
    open(i) {
      this.setting.questions[i].status = "enable";
    },
    // 停用
    stop(i) {
      this.setting.questions[i].status = "disable";
    },
    // 添加问题
    addQuestions() {
      this.setting.questions.push({
        isBuiltin: false,
        name: "",
        status: "enable"
      });
    },
    // 删除问题
    delQuestions(i) {
      this.setting.questions.splice(i, 1);
    },
    // 提交设置
    savaSetting() {
      // console.log(this.setting);
      const setting = JSON.parse(JSON.stringify(this.setting));
      if (
        !parseInt(setting.durationDay) ||
        parseInt(setting.durationDay) < 0 ||
        parseInt(setting.durationDay) > 90
      ) {
        if (parseInt(setting.durationDay) != 0) {
          this.$message({
            message: "生成时间仅可输入整数数字，可输入范围为[0-90]天!",
            type: "warning"
          });
          return;
        }
      }
      if (setting.reviewManType == "reception") {
        setting.reviewFixedMan = 0;
      }
      if (setting.reviewManType == "fixed" && setting.reviewFixedMan == "") {
        this.$message({
          message: "请选择指定回访客服！",
          type: "warning"
        });
        return;
      }
      for (let i = 0; i < setting.questions.length; i++) {
        const name = setting.questions[i].name.replace(/(^\s*)|(\s*$)/g, "");
        if (name == "") {
          this.$message({
            message: "问题不能为空！",
            type: "warning"
          });
          return;
        }
      }
      setting.durationDay = parseInt(setting.durationDay);
      const data = {
        module: "repair",
        type: "reviewSet",
        value: setting
      };
      updateSettings(data).then(() => {
        this.getSetting();
        this.$message({
          message: "设置成功！",
          type: "success"
        });
      });
    },
    // 向上移动
    questionsUp(ind) {
      this.swapArr(this.setting.questions, ind, ind - 1);
    },
    // 向下移动
    questionsDown(ind) {
      this.swapArr(this.setting.questions, ind, ind + 1);
    },
    swapArr(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.open,
.sort {
  color: $color-primary;
  @include font_color("color-primary");
  cursor: pointer;
  user-select: none;
}
::v-deep {
  .setting-btns {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    background: #fff;
    margin-bottom: 5px;
    padding: 5px 0;
    border-radius: 2px;
    border-bottom: 1px solid #eee;
  }
  .el-radio {
    margin-right: 10px;
  }
  .del {
    color: #f56c6c;
    cursor: pointer;
    font-size: 14px;
    margin: 0 5px;
  }
  .stop {
    color: #f56c6c;
    cursor: pointer;
    user-select: none;
  }
  .sort {
    font-size: 20px;
    margin: 5px;
  }
  .el-table--border {
    border: 1px solid #ebeef5;
  }
}
</style>
