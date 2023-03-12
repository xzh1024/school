<template>
  <!-- 洗车价格设置 -->
  <div class="container-box">
    <div class="wash-car-price-seting">
      <div class="flex-container column-flex">
        <div
          class="flex-block-bg flex-block-padding btns"
          v-if="hasBelongsPermWithoutRoute('update', 'repairs.washing.setting')"
        >
          <el-button type="primary" size="small" @click="saveSeting">
            保存（F3）
          </el-button>
        </div>
        <div class="auto-block flex-block-margin">
          <el-row :gutter="5" class="price-seting-content">
            <el-col :span="12" style="height: 100%;">
              <el-card>
                <div slot="header">
                  <span class="header-tit">按车辆类型设置</span>
                  <el-radio
                    v-model="radio"
                    label="carType"
                    v-if="hasBelongsPerm('repairs.washing.settingUpdate')"
                    >启用</el-radio
                  >
                </div>
                <el-table
                  border
                  v-loading="loading"
                  class="seting-table"
                  :data="typeList"
                >
                  <el-table-column label="序号" type="index" width="60" />
                  <el-table-column label="车辆类型" prop="name" width="150">
                  </el-table-column>
                  <el-table-column label="洗车价格" width="200">
                    <template slot-scope="scope">
                      <ht-format-number
                        v-model="scope.row.price"
                        :disabled="
                          !hasBelongsPermWithoutRoute(
                            'update',
                            'repairs.washing.setting'
                          )
                        "
                        size="mini"
                        precision-type="money"
                        placeholder="请输入洗车价格"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12" style="height: 100%;">
              <el-card>
                <div slot="header">
                  <span class="header-tit">按车辆级别设置</span>
                  <el-radio
                    v-model="radio"
                    label="carLevel"
                    v-if="hasBelongsPerm('repairs.washing.settingUpdate')"
                    >启用</el-radio
                  >
                </div>
                <el-table
                  border
                  v-loading="loading"
                  class="seting-table"
                  :data="levelList"
                >
                  <el-table-column label="序号" type="index" width="60" />
                  <el-table-column label="车辆级别" prop="name" width="150">
                  </el-table-column>
                  <el-table-column label="洗车价格" width="200">
                    <template slot-scope="scope">
                      <ht-format-number
                        v-model="scope.row.price"
                        :disabled="
                          !hasBelongsPermWithoutRoute(
                            'update',
                            'repairs.washing.setting'
                          )
                        "
                        size="mini"
                        precision-type="money"
                        placeholder="请输入洗车价格"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vehicleLevelDictionary, vehicleTypeDictionary } from "@/utils/store";
import { getSettings, updateSettings } from "@/api/repairs/washCar";

export default {
  name: "priceSeting",
  mixins: [],
  data() {
    return {
      loading: false,
      radio: "",
      setting: {},
      levelList: [],
      typeList: []
    };
  },
  activated() {
    this.getSetting();
  },
  methods: {
    getSetting() {
      this.loading = true;
      const params = {
        module: "repair",
        type: "washingSet"
      };
      getSettings(params).then(res => {
        this.setting = res.value;
        this.levelList = vehicleLevelDictionary().map(item => {
          return {
            id: item.id,
            name: item.name,
            price: ""
          };
        });
        this.typeList = vehicleTypeDictionary().map(item => {
          return {
            id: item.id,
            name: item.name,
            price: ""
          };
        });
        this.radio = this.setting.enableType
          ? this.setting.enableType
          : "carType";
        if (this.setting.carLevelSets) {
          this.setting.carLevelSets.forEach(item => {
            this.levelList.forEach(item2 => {
              if (item.id == item2.id) {
                item2.price = item.price;
              }
            });
          });
        }
        if (this.setting.carTypeSets) {
          this.setting.carTypeSets.forEach(item => {
            this.typeList.forEach(item2 => {
              if (item.id == item2.id) {
                item2.price = item.price;
              }
            });
          });
        }
        this.loading = false;
      });
    },
    saveSeting() {
      const data = {};
      data.enableType = this.radio;
      console.log(this.typeList);
      console.log(this.levelList);
      data.carTypeSets = [];
      this.typeList.forEach(item => {
        if (item.price != "" && item.price >= 0) {
          data.carTypeSets.push(item);
        }
      });
      data.carLevelSets = [];
      this.levelList.forEach(item => {
        if (item.price != "" && item.price >= 0) {
          data.carLevelSets.push(item);
        }
      });
      // data.carTypeSets = this.typeList.filter(item => {
      //   return item.price >= 0;
      // });
      // data.carLevelSets = this.levelList.filter(item => {
      //   return item.price >= 0;
      // });
      const datas = {
        module: "repair",
        type: "washingSet",
        value: data
      };
      console.log(datas);
      updateSettings(datas).then(() => {
        this.$message({
          message: "设置成功！",
          type: "success"
        });
        this.getSetting();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.el-card__header {
  padding: 8px;
  background: #fff;
  .header-tit {
    position: relative;
    padding-left: 10px;
    &::before {
      position: absolute;
      left: 0;
      top: 3px;
      display: inline-block;
      content: "";
      width: 4px;
      background: $color-primary;
      @include background_color("color-primary");
      height: 14px;
      margin-right: 5px;
      border-radius: 100px;
    }
  }
}
::v-deep {
  .wash-car-price-seting {
    height: 100%;
    .price-seting-content {
      height: 100%;
      .el-card {
        height: 100%;
        background: #fff;
        .el-card__header {
          padding: 8px;
          background: #fff;
        }
        .el-card__body {
          padding: 10px 20px;
          height: calc(100% - 40px);
          overflow-y: auto;
          box-sizing: border-box;
        }
        .el-radio {
          margin-left: 10px;
        }
        .el-table {
          background: #fff;
        }
        .el-table--border {
          border-top: 0;
        }
        .el-table--border::after,
        .el-table--group::after,
        .el-table::before {
          display: none;
        }
        .el-table th.is-leaf {
          border-top: 1px solid #ebeef5;
        }
        .el-table.is-hotkey-active,
        .ht-list.is-hotkey-active,
        .ht-tree.is-hotkey-active,
        .ht-hotkeys-block.is-hotkey-active {
          border-top-color: #fff;
        }
        .el-input-number .el-input__inner {
          text-align: left;
        }
      }
    }
  }
}
</style>
