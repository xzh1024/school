<template>
  <el-dialog
    title="修改会员卡"
    v-loading="loading || load"
    :visible.sync="visible"
    :close-on-click-modal="false"
    append-to-body
    width="1180px"
    @closed="closed"
  >
    <div class="input-item">
      <div class="input-label">选择客户</div>
      <div class="input-content">
        <el-select
          class="width-300"
          size="small"
          value-key="id"
          v-model="checkedCustomer"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="queryCustomers"
          :loading="selectLoading"
          @change="changeCheckedCustomer"
        >
          <template v-for="item in customerOptions">
            <el-option
              v-if="item.cardServiceCount"
              :key="item.id"
              :label="
                item.customerType === 1
                  ? `${item.name}-${item.contacts}-${item.phone}`
                  : `${item.contacts}-${item.phone}`
              "
              :value="item"
              :disabled="item.status === 2"
            >
            </el-option>
          </template>
        </el-select>
      </div>
      <div class="user-info">
        <template v-if="checkedCustomer.customerType === 0">
          <div class="m-r-16">客户名称：{{ checkedCustomer.contacts }}</div>
          <div class="m-r-16">客户电话：{{ checkedCustomer.phone }}</div>
          <div class="m-r-16">
            已有会员卡：{{ checkedCustomer.cardServiceCount }}
          </div>
        </template>
        <template v-if="checkedCustomer.customerType === 1">
          <div class="m-r-16">公司名称：{{ checkedCustomer.name }}</div>
          <div class="m-r-16">主联系人姓名：{{ checkedCustomer.contacts }}</div>
          <div class="m-r-16">主联系人电话：{{ checkedCustomer.phone }}</div>
          <div class="m-r-16">
            已有会员卡：{{ checkedCustomer.cardServiceCount }}
          </div>
        </template>
      </div>
    </div>
    <!-- <div v-if="cardServices.id && cardInfo.id"> -->
    <template v-if="cardServiceInfo.id">
      <!-- 会员卡列表 -->
      <div class="card-list">
        <CardItem
          buttonText="修改"
          v-for="(item, index) in cardServices"
          :key="index"
          :item="item"
          :buttonShow="item.status !== 3"
          :class="{ 'is-active': item.active }"
          :style="{
            boxShadow: item.active ? `0 4px 17px -5px ${item.color}` : 'none'
          }"
          @handleClick="handleUpdate"
        ></CardItem>
      </div>
      <!-- 卡信息 -->
      <div class="card-container" v-if="cardServiceInfo.id">
        <!-- <div class="card-title-wrap"> -->
        <div class="card-title">
          卡信息<el-tooltip
            v-if="cardServiceInfo.descreption"
            effect="dark"
            :content="cardServiceInfo.descreption"
            placement="bottom"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
        <el-row :gutter="16">
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡人：</div>
              <div class="panel-content" :title="cardServiceInfo.openerName">
                {{ cardServiceInfo.openerName }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">卡现金价值：</div>
              <div
                class="panel-content"
                :title="
                  cardServiceInfo.cardBalance &&
                    cardServiceInfo.cardBalance.cash
                "
              >
                {{
                  cardServiceInfo.cardBalance &&
                    cardServiceInfo.cardBalance.cash
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">指定门店：</div>
              <div
                class="panel-content"
                v-if="
                  cardServiceInfo.useLimit && cardServiceInfo.useLimit.branch
                "
                :title="
                  cardServiceInfo.useLimit.branch.limit
                    ? cardServiceInfo.useLimit.branch.rows
                        .map(item => item.name)
                        .join('、')
                    : '不限门店'
                "
              >
                {{
                  cardServiceInfo.useLimit.branch.limit
                    ? cardServiceInfo.useLimit.branch.rows
                        .map(item => item.name)
                        .join("、")
                    : "不限门店"
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡价格：</div>
              <div class="panel-content" :title="cardServiceInfo.price">
                {{ cardServiceInfo.price }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡门店：</div>
              <div
                class="panel-content"
                :title="cardServiceInfo.createdCompany"
              >
                {{ cardServiceInfo.createdCompany }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡日期：</div>
              <div class="panel-content" :title="cardServiceInfo.createdAt">
                {{ cardServiceInfo.createdAt }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">操作人：</div>
              <div class="panel-content" :title="cardServiceInfo.createdBy">
                {{ cardServiceInfo.createdBy }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="panel-item">
              <div class="panel-label color-secondary">开卡备注：</div>
              <div class="panel-content" :title="cardServiceInfo.remarks">
                {{ cardServiceInfo.remarks }}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label required-style">卡种</div>
              <div class="input-content">
                <el-select
                  class="width-224"
                  size="small"
                  v-model="formData.memberCardId"
                  filterable
                >
                  <el-option
                    v-for="item in memberCardOptions"
                    :key="item.id"
                    :label="`${item.name}(库存:${item.qty})`"
                    :value="item.id"
                    :disabled="!item.qty || item.qty === '0'"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label required-style">卡号</div>
              <div class="input-content">
                <el-input
                  class="width-224"
                  size="small"
                  v-model="formData.cardNo"
                  @input="formData.cardNo = cardNoValidate(formData.cardNo)"
                  @change="formData.cardNo = cardNoValidate(formData.cardNo)"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col
            :span="8"
            v-if="
              isGarage &&
                cardInfo.useLimit &&
                cardInfo.useLimit.vehicle &&
                cardInfo.useLimit.vehicle.limit
            "
          >
            <div class="input-item">
              <div class="input-label required-style">使用车辆</div>
              <div class="input-content">
                <el-select
                  class="width-224"
                  size="small"
                  v-model="formData.limitVehicleIds"
                  filterable
                  multiple
                >
                  <el-option
                    v-for="item in customerVehicleOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="input-item">
          <div class="input-label required-style">折扣有效期</div>
          <div class="input-content">
            <el-date-picker
              size="small"
              v-model="formData.discountEndDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
            <el-checkbox class="m-l-16" v-model="formData.discountLimit">
              永久有效
            </el-checkbox>
            <span
              class="color-error m-l-16"
              v-if="discount.indata && discount.indata.limit"
            >
              {{ discount.indata.str }}
            </span>
          </div>
        </div>
        <div class="panel-item">
          <div class="panel-label color-secondary">卡折扣：</div>
          <div class="panel-content color-warning" v-if="discount.detail">
            <span
              class="m-r-16"
              v-if="isGarage && discount.detail.projectChecked"
            >
              项目折扣{{ discount.detail.project }}折
            </span>
            <span class="m-r-16" v-if="discount.detail.partChecked">
              配件折扣{{ discount.detail.part }}折
            </span>
            <span v-if="isGarage && discount.detail.packageChecked">
              套餐折扣{{ discount.detail.package }}折
            </span>
          </div>
        </div>
      </div>
      <!-- 卡余额 -->
      <div class="card-container" v-if="formData.memberCardId">
        <div class="card-title">卡余额</div>
        <div class="input-item strong">
          现金储值余额：￥{{ formData.cardBalance.cash }}
        </div>
        <template v-if="isGarage">
          <div class="input-item strong">项目余额</div>
          <el-table
            class="table-base m-b-16"
            size="small"
            :data="formData.cardBalance.projects"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column
              prop="goodsCode"
              label="项目编码"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="goodsName"
              label="项目名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="qty"
              label="总数量"
              show-overflow-tooltip
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="类型"
              show-overflow-tooltip
              min-width="60"
            ></el-table-column>
            <el-table-column
              prop="usedQty"
              label="已使用数量"
              show-overflow-tooltip
              min-width="82"
            ></el-table-column>
            <el-table-column
              label="剩余可使用数量"
              show-overflow-tooltip
              width="144"
            >
              <template slot-scope="scope">
                <el-input
                  class="width-112"
                  size="small"
                  v-model="scope.row.remainQty"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="充值时间"
              show-overflow-tooltip
              min-width="142"
            ></el-table-column>
            <el-table-column label="有效期" show-overflow-tooltip width="260">
              <template slot-scope="scope">
                <el-date-picker
                  class="width-130"
                  size="small"
                  v-model="scope.row.endDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                >
                </el-date-picker>
                <el-checkbox class="m-l-16" v-model="scope.row.checked">
                  永久有效
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <div class="input-item strong">套餐余额</div>
          <el-table
            class="table-base m-b-16"
            size="small"
            :data="formData.cardBalance.packages"
            stripe
            border
            style="width: 100%"
          >
            <el-table-column
              prop="goodsCode"
              label="套餐编码"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="goodsName"
              label="套餐名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="qty"
              label="总数量"
              show-overflow-tooltip
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="sourceName"
              label="类型"
              show-overflow-tooltip
              min-width="60"
            ></el-table-column>
            <el-table-column
              prop="usedQty"
              label="已使用数量"
              show-overflow-tooltip
              min-width="82"
            ></el-table-column>
            <el-table-column
              label="剩余可使用数量"
              show-overflow-tooltip
              width="144"
            >
              <template slot-scope="scope">
                <el-input
                  class="width-112"
                  size="small"
                  v-model="scope.row.remainQty"
                  @input="
                    scope.row.remainQty = integerValidate(scope.row.remainQty)
                  "
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="充值时间"
              show-overflow-tooltip
              min-width="142"
            ></el-table-column>
            <el-table-column label="有效期" show-overflow-tooltip width="260">
              <template slot-scope="scope">
                <el-date-picker
                  class="width-130"
                  size="small"
                  v-model="scope.row.endDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                >
                </el-date-picker>
                <el-checkbox class="m-l-16" v-model="scope.row.checked">
                  永久有效
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <div class="input-item strong">备注</div>
        <div class="input-item">
          <el-input
            class="width-776"
            v-model="formData.remarks"
            size="small"
            maxlength="50"
            show-word-limit
          ></el-input>
        </div>
      </div>
    </template>

    <div slot="footer" style="text-align: center;">
      <el-button size="small" @click="hide">取消</el-button>
      <el-button size="small" type="primary" @click="submit">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getCustomers,
  getMemberCardServices,
  getMemberCardOptions,
  getMemberCardInfo,
  getMemberCardServiceInfo,
  getCustomerVehicles,
  updateMemberCardService
} from "../../services";
import CardItem from "./cardItem.vue";
import { integerValidate } from "@/utils/validate";

const defaultFormData = {
  memberCardId: "", // 会员卡ID
  cardNo: "", // 会员卡号
  limitVehicleIds: [], // 限制车辆，客户车辆ID，空数组或null表示没有车辆限制
  discountEndDate: "", // 折扣到期时间，null表示永久有效
  discountLimit: false,
  // 卡余额
  cardBalance: {
    // 服务项目
    projects: [
      // {
      //   id: 1, // 服务项目ID
      //   remainQty: "1", // 服务项目剩余次数
      //   endDate: "2023-05-18" // 永久有效，null表示永久有效
      // }
    ],
    // 套餐
    packages: [
      // {
      //   id: 1, // 套餐项目ID
      //   remainQty: "1", // 套餐项目剩余次数
      //   endDate: "2023-05-18" // 永久有效，null表示永久有效
      // }
    ],
    remarks: "" // 充值备注
  }
};

export default {
  name: "CardServiceUpdateDialog",
  components: {
    CardItem
  },
  props: {
    isGarage: Boolean,
    now: Object
  },
  watch: {
    // 观察会员卡种id变化
    "formData.memberCardId": {
      handler: function(newValue) {
        if (newValue) {
          this.queryMemberCardInfo(newValue);
        } else {
          this.cardInfo = {};
        }
      },
      deep: true
    },
    // 卡折扣
    discount: {
      handler: function(newValue) {
        if (newValue.indate) {
          if (newValue.indate.limit) {
            this.formData.discountLimit = false;
            this.formData.discountEndDate = newValue.indate.date;
          } else {
            this.formData.discountLimit = true;
            this.formData.discountEndDate = "";
          }
        } else {
          this.formData.discountLimit = true;
          this.formData.discountEndDate = "";
        }
      },
      deep: true
    }
  },
  data() {
    return {
      visible: true,
      loading: false,
      load: false,
      selectLoading: false,
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      customerOptions: [],
      checkedCustomer: {},
      cardServices: [], // 会员卡服务列表
      cardInfo: {}, // 会员卡详情
      cardServiceInfo: {}, // 会员卡服务详情
      memberCardOptions: [], // 卡种列表
      customerVehicleOptions: [], // 车辆列表
      // 卡折扣
      discount: {
        // 有效期
        indata: {
          limit: false, // false：永久有效；
          date: "", // 有效期日期
          str: "" // 有效期中文字符
        },
        // 折扣详情中文字符
        detail: {
          part: "1", // 配件折扣，null表示没有勾选
          project: "1", // 项目折扣，null表示没有勾选
          package: "1" // 套餐折扣，null表示没有勾选
        }
      }
    };
  },
  methods: {
    integerValidate,
    cardNoValidate(value) {
      value = String(value);
      value = value.replace(/[^0-9a-zA-Z]/g, "");
      return String(value);
    },
    hide() {
      this.visible = false;
    },
    closed() {
      this.$emit("hide");
    },
    // 获取客户列表
    queryCustomers(keyword, isOnce) {
      this.selectLoading = true;
      getCustomers({
        keyword
      })
        .then(res => {
          this.customerOptions = res || [];
          if (isOnce === true && this.now) {
            const findData = this.customerOptions.find(
              item => item.id === this.now.customerId
            );
            if (findData) {
              this.checkedCustomer = findData;
              this.queryMemberCardServices(this.now.id);
            }
          }
          this.selectLoading = false;
        })
        .catch(() => {
          this.customerOptions = [];
          this.selectLoading = false;
        });
    },
    // 重置表单数据、卡服务详情、卡种详情
    handleReset() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
      this.cardInfo = {};
      this.cardServiceInfo = {};
    },
    // 获取会员卡服务列表
    queryMemberCardServices(cardServiceId) {
      if (!this.checkedCustomer.id) return;
      const params = {
        customerId: this.checkedCustomer.id,
        page: 1,
        pageSize: 1000
      };
      getMemberCardServices(params)
        .then(res => {
          this.cardServices = res.rows || [];
          // if (this.cardServices.length) {
          //   this.cardServices[0].active = true;
          //   this.handleUpdate(this.cardServices[0]);
          // }
          if (cardServiceId) {
            const findCardService = this.cardServices.find(
              item => item.id === cardServiceId
            );
            if (findCardService) {
              this.handleUpdate(findCardService);
            }
          } else {
            // 默认选中第一个卡服务
            if (this.cardServices.length) {
              this.handleUpdate(this.cardServices[0]);
            } else {
              this.handleReset();
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.cardServices = [];
          this.loading = false;
        });
    },
    // 点击充值
    handleUpdate(data) {
      if (data.id === this.cardServiceInfo.id) return;
      this.cardServices.forEach(item => {
        if (item.id === data.id) {
          if (!item.active) {
            item.active = true;
          }
        } else {
          item.active = false;
        }
      });
      // 会员卡服务详情
      this.getMemberCardServiceInfo(data.id);
      // 查询会员可开卡种列表
      this.queryMemberCards(data.cardId);
      // 查询用户车辆列表
      this.queryCustomerVehicles();
    },
    // 查询会员卡种id和名称列表
    queryMemberCards(notExcludeId) {
      if (!this.checkedCustomer.id) return;
      const params = {
        customerId: this.checkedCustomer.id
      };
      if (notExcludeId) {
        params.notExcludeId = notExcludeId;
      }
      getMemberCardOptions(params)
        .then(res => {
          this.memberCardOptions = res || [];
          const findData = this.memberCardOptions.find(
            item => item.id === notExcludeId
          );
          if (findData) {
            this.formData.memberCardId = findData.id;
          }
        })
        .catch(() => {
          this.memberCardOptions = [];
        });
    },
    // 会员卡服务详情
    getMemberCardServiceInfo(id) {
      this.load = true;
      getMemberCardServiceInfo(id)
        .then(res => {
          const data = res || {};
          this.cardServiceInfo = data;
          this.discount = data.discount || {};
          this.formData.cardNo = data.cardNo; // 会员卡号
          if (
            data.useLimit &&
            data.useLimit.vehicle &&
            data.useLimit.vehicle.limit
          ) {
            // 限制车辆，客户车辆ID，空数组或null表示没有车辆限制
            this.formData.limitVehicleIds = data.useLimit.vehicle.rows.map(
              item => item.id
            );
          } else {
            this.formData.limitVehicleIds = [];
          }
          // // 卡余额
          if (data.cardBalance) {
            this.formData.cardBalance.cash = data.cardBalance.cash;
            this.formData.cardBalance.projects = this.formatBalance(
              data.cardBalance.projects
            );
            this.formData.cardBalance.packages = this.formatBalance(
              data.cardBalance.packages
            );
          }
          this.load = false;
        })
        .catch(() => {
          this.cardServiceInfo = {};
          this.load = false;
        });
    },
    formatBalance(list) {
      if (!list) return [];
      const copyList = JSON.parse(JSON.stringify(list));
      return copyList.map(item => {
        return {
          ...item,
          checked: item.endDate === null ? true : false
        };
      });
    },
    // 会员卡种详情
    queryMemberCardInfo(id) {
      getMemberCardInfo(id)
        .then(res => {
          this.cardInfo = res || {};
          // this.discount = data.discountRule || {}; // 折扣规则
          // this.formData.memberCardId = data.id; // 会员卡ID
          // this.formData.cardNo = data.name; // 会员卡号
          // this.formData.limitVehicleIds = []; // 限制车辆，客户车辆ID，空数组或null表示没有车辆限制
          this.load = false;
        })
        .catch(() => {
          this.cardInfo = {};
          this.load = false;
        });
    },
    // 我的客户车辆id和name列表
    queryCustomerVehicles() {
      if (!this.checkedCustomer.id) return;
      getCustomerVehicles({
        customerId: this.checkedCustomer.id
      })
        .then(res => {
          this.customerVehicleOptions = res || [];
        })
        .catch(() => {
          this.customerVehicleOptions = [];
        });
    },
    // 选择客户
    changeCheckedCustomer() {
      // 会员卡服务列表
      this.queryMemberCardServices();
    },
    // 提交
    submit() {
      if (!this.cardServiceInfo.id) return;
      const formData = JSON.parse(JSON.stringify(this.formData));
      const params = {
        remarks: formData.remarks,
        memberCardId: formData.memberCardId,
        cardNo: formData.cardNo,
        limitVehicleIds: formData.limitVehicleIds,
        // 折扣到期时间，null表示永久有效
        discountEndDate: formData.discountLimit
          ? null
          : formData.discountEndDate,
        cardBalance: {
          cash: formData.cardBalance.cash,
          projects: formData.cardBalance.projects.map(item => {
            const projectItem = {
              ...item,
              endDate: item.checked ? null : item.endDate
            };
            delete projectItem.checked;
            return projectItem;
          }),
          packages: formData.cardBalance.packages.map(item => {
            const packageItem = {
              ...item,
              endDate: item.checked ? null : item.endDate
            };
            delete packageItem.checked;
            return packageItem;
          })
        }
      };
      if (!params.cardNo) {
        this.$message.error("请填写卡号！");
        return false;
      }
      if (this.cardInfo.useLimit.vehicle.limit) {
        if (!params.limitVehicleIds.length) {
          this.$message.error("请选择车辆！");
          return false;
        }
      } else {
        params.limitVehicleIds = [];
      }
      if (!formData.discountLimit && !formData.discountEndDate) {
        this.$message.error("请选择折扣有效期！");
        return false;
      }
      this.loading = true;
      updateMemberCardService(params, this.cardServiceInfo.id)
        .then(() => {
          this.loading = false;
          this.$message.success("修改会员卡成功！");
          this.$emit("update");
          this.hide();
        })
        .catch(err => {
          this.loading = false;
          if(err && err.message) {
            this.$message.error(err.message);
          }
        });
    }
  },
  created() {
    let keyword = "";
    if (this.now) {
      keyword = this.now.customerContacts;
    }
    this.queryCustomers(keyword, true);
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-dialog {
  .el-dialog__body {
    max-height: 600px;
    overflow-y: auto;
    background-color: #ffffff;
    .width-105 {
      width: 105px;
    }
    .width-112 {
      width: 112px;
    }
    .width-130 {
      width: 130px;
    }
    .width-166 {
      width: 166px;
    }
    .width-224 {
      width: 224px;
    }
    .width-300 {
      width: 300px;
    }
    .width-776 {
      width: 776px;
    }
    .input-item {
      display: flex;
      align-items: center;
      margin-bottom: @margin-size-secondary;
      line-height: 22px;
      &.flex-top {
        align-items: flex-start;
      }
      .input-label {
        margin-right: @margin-size-secondary;
      }
      .user-info {
        flex: 1;
        overflow: hidden;
        margin-left: 24px;
        color: @color-warning;
        display: flex;
        flex-wrap: wrap;
        .user-info-item {
          .cmargin-right {
            margin-right: @margin-size-main;
          }
        }
      }
    }
    .panel-item {
      display: flex;
      line-height: 22px;
      margin-bottom: @margin-size-secondary;
      .panel-label {
        color: #666666;
      }
      .panel-content {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .card-list-wrap {
      margin-top: @margin-size-secondary;
      height: 126px;
      overflow-x: auto;
      overflow-y: hide;
    }
    .card-list {
      padding: @padding-size-secondary 0;
      overflow-x: auto;
      overflow-y: hide;
      white-space: nowrap;
      .card-add {
        float: left;
        box-sizing: border-box;
        width: 117px;
        height: 126px;
        margin: 0;
        padding: 0;
        border: 1px solid @border-color-base;
        border-radius: 2px;
        color: @text-color-secondary;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        .el-icon-plus {
          margin-bottom: @margin-size-main;
          font-size: 24px;
          color: @text-color-secondary;
        }
      }
    }
    .card-container {
      margin-top: @margin-size-secondary;
      margin-bottom: @margin-size-secondary;
      padding: @padding-size-secondary @padding-size-secondary 0;
      overflow: hidden;
      background: @bg-color-base;
      border-radius: 2px;
      .card-title {
        font-weight: @strong;
        line-height: 24px;
        font-size: 16px;
        margin-bottom: @margin-size-secondary;
      }
      .el-icon-question {
        margin-left: @margin-size-secondary;
        font-size: 16px;
        line-height: 24px;
        color: @color-warning;
        cursor: pointer;
      }
    }
    .radio-list {
      display: flex;
      align-items: center;
      .radio-item {
        display: inline-block;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 14px;
        margin-right: @margin-size-secondary;
        padding: @padding-size-secondary @padding-size-main;
        border: 1px solid @border-color-base;
        border-radius: 2px;
        color: @text-color-secondary;
        cursor: pointer;
        position: relative;
        .ico-checked {
          position: absolute;
          right: 0;
          bottom: 0;
          display: none;
        }
        &.is-checked {
          color: @color-link;
          border-color: @color-link;
          .ico-checked {
            display: block;
          }
        }
      }
    }
  }
  .el-dialog__footer {
    border-top: 1px solid @border-color-base;
    padding: 12px 0;
  }
}
</style>
