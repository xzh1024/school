<template>
  <el-dialog
    title="充值"
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
    <!-- 没有会员卡时不显示 -->
    <template v-if="cardServices.length">
      <!-- 会员卡列表 -->
      <div class="card-list">
        <CardItem
          v-for="(item, index) in cardServices"
          :key="index"
          :item="item"
          :buttonShow="item.status !== 3"
          :class="{ 'is-active': item.active }"
          :style="{
            boxShadow: item.active ? `0 4px 17px -5px ${item.color}` : 'none',
          }"
          @handleClick="handleRecharge"
        ></CardItem>
      </div>
      <!-- 卡信息 -->
      <div class="card-container">
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
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">卡种：</div>
              <div class="panel-content" :title="cardServiceInfo.name">
                {{ cardServiceInfo.name }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">卡号：</div>
              <div class="panel-content" :title="cardServiceInfo.cardNo">
                {{ cardServiceInfo.cardNo }}
              </div>
            </div>
          </el-col>
          <el-col :span="4" v-if="isGarage">
            <div class="panel-item">
              <div class="panel-label">可用车辆：</div>
              <div
                class="panel-content"
                v-if="
                  cardServiceInfo.useLimit && cardServiceInfo.useLimit.vehicles
                "
                :title="
                  cardServiceInfo.useLimit.vehicles.limit
                    ? cardServiceInfo.useLimit.vehicles.rows &&
                      cardServiceInfo.useLimit.vehicles.rows
                        .map(item => item.name)
                        .join('、')
                    : '所有车辆'
                "
              >
                {{
                  cardServiceInfo.useLimit.vehicles.limit
                    ? cardServiceInfo.useLimit.vehicles.rows &&
                      cardServiceInfo.useLimit.vehicles.rows
                        .map(item => item.name)
                        .join('、')
                    : '所有车辆'
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡价格：</div>
              <div
                class="panel-content color-error"
                :title="
                  cardServiceInfo.price === null
                    ? '开卡免费'
                    : cardServiceInfo.price
                "
              >
                {{
                  cardServiceInfo.price === null
                    ? '开卡免费'
                    : cardServiceInfo.price
                }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡人：</div>
              <div class="panel-content" :title="cardServiceInfo.openerName">
                {{ cardServiceInfo.openerName }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">开卡人电话：</div>
              <div class="panel-content" :title="cardServiceInfo.openerPhone">
                {{ cardServiceInfo.openerPhone }}
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="panel-item">
              <div class="panel-label">业务员：</div>
              <div
                class="panel-content"
                :title="cardServiceInfo.businessManName"
              >
                {{ cardServiceInfo.businessManName }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="panel-item">
              <div class="panel-label">卡折扣：</div>
              <div
                class="panel-content color-warning"
                v-if="
                  cardServiceInfo.discount && cardServiceInfo.discount.detail
                "
              >
                <span
                  class="m-r-16"
                  v-if="
                    isGarage && cardServiceInfo.discount.detail.projectChecked
                  "
                >
                  项目折扣{{ cardServiceInfo.discount.detail.project }}折
                </span>
                <span
                  class="m-r-16"
                  v-if="cardServiceInfo.discount.detail.partChecked"
                >
                  配件折扣{{ cardServiceInfo.discount.detail.part }}折
                </span>
                <span
                  v-if="
                    isGarage && cardServiceInfo.discount.detail.packageChecked
                  "
                >
                  套餐折扣{{ cardServiceInfo.discount.detail.package }}折
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="panel-item">
              <div class="panel-label">折扣有效期：</div>
              <div
                class="panel-content"
                v-html="cardServiceDiscountIndate"
              ></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 卡充值 -->
      <div class="card-container" v-if="cardInfo.id">
        <div class="card-title">卡充值</div>
        <div class="m-b-8 strong">现金充值</div>
        <div class="radio-wrap">
          <div class="radio-label m-r-8 color-secondary">充值金额</div>
          <div class="radio-list">
            <div
              class="radio-item"
              v-for="(item, index) in cashStoredRules"
              :key="index"
              :class="{ 'is-checked': item.active }"
              @click="checkedCashStored(item)"
            >
              <i class="ico-checked"></i>
              {{ item.name }}
            </div>
            <el-input
              v-show="customOtherAmountVisible"
              class="width-166 m-b-8"
              size="small"
              v-model.trim="formData.cash.otherAmount"
              @input="
                formData.cash.otherAmount = floatNumberValidate(
                  formData.cash.otherAmount,
                )
              "
              @change="
                formData.cash.otherAmount = zeroValidate(
                  formData.cash.otherAmount,
                )
              "
            >
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label">充值赠送</div>
          <div class="input-content">赠送现金金额{{ cash.giftAmount }}元</div>
        </div>
        <div class="input-item color-warning">
          <div class="input-label">实际到账金额</div>
          <div class="input-content">{{ cash.sum }}元</div>
        </div>
        <template v-if="isGarage">
          <div class="m-b-8 strong">项目充值</div>
          <div class="radio-wrap">
            <div class="radio-label m-r-8 color-secondary">项目包名称</div>
            <div class="radio-list">
              <div
                class="radio-item"
                v-for="(item, index) in projectPackages"
                :key="index"
                :class="{ 'is-checked': item.active }"
                @click="checkedProjectStored(item)"
              >
                <i class="ico-checked"></i>
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="input-item flex-top" v-if="checkedProjectPackage">
            <div class="input-label">项目/套餐次数明细</div>
            <div class="input-content color-secondary">
              <div>
                服务项目：{{
                  checkedProjectPackage.details.projects
                    .map(item => `${item.goodsName}*${item.qty}`)
                    .join('、')
                }}
              </div>
              <div>
                项目套餐：{{
                  checkedProjectPackage.details.packages
                    .map(item => `${item.goodsName}*${item.qty}`)
                    .join('、')
                }}
              </div>
            </div>
          </div>
          <div class="input-item" v-if="checkedProjectPackage">
            <div class="input-label">价格</div>
            <div class="input-content color-error">
              ¥{{ checkedProjectPackage.price }}
            </div>
          </div>
          <div
            class="input-item flex-top"
            v-if="
              checkedProjectPackage &&
                (checkedProjectPackage.giftChecked ||
                  checkedProjectPackage.giftDetailChecked)
            "
          >
            <div class="input-label">赠送</div>
            <div class="input-content color-secondary">
              <div v-if="checkedProjectPackage.giftChecked">
                赠送现金金额{{ checkedProjectPackage.giftAmount }}元
              </div>
              <template v-if="checkedProjectPackage.giftDetailChecked">
                <div>
                  赠送服务项目：{{
                    checkedProjectPackage.giftDetails.projects
                      .map(item => `${item.goodsName}*${item.qty}`)
                      .join('、')
                  }}
                </div>
                <div>
                  赠送项目套餐：{{
                    checkedProjectPackage.giftDetails.packages
                      .map(item => `${item.goodsName}*${item.qty}`)
                      .join('、')
                  }}
                </div>
              </template>
            </div>
          </div>
        </template>

        <div class="input-item">
          <div class="input-label">充值备注</div>
          <div class="input-content">
            <el-input
              class="width-776"
              v-model="formData.remarks"
              size="small"
              maxlength="50"
              show-word-limit
            ></el-input>
          </div>
        </div>
      </div>
    </template>

    <div slot="footer" style="text-align: left;">
      <div v-if="cardServices.length" class="footer-row">
        <span class="color-error">应收金额：￥{{ receivable.amount }}</span>
        <span>+现金充值金额：￥{{ receivable.cashAmount }}</span>
        <span v-if="isGarage"
          >+项目充次金额：￥{{ receivable.projectAmount }}</span
        >
      </div>
      <div style="text-align: center;">
        <el-button size="small" @click="hide">取消</el-button>
        <el-button size="small" type="primary" @click="submit">
          确认{{ cardServices.length ? `(¥${receivable.amount})` : '' }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {
  getCustomers,
  getMemberCardServices,
  getMemberCardInfo,
  getMemberCardServiceInfo,
  memberCardServiceRecharge,
} from '../../services';
import CardItem from './cardItem.vue';
import { add } from '@/utils/mathApi.js';
import { floatNumberValidate, zeroValidate } from '@/utils/validate';

const defaultFormData = {
  cash: {
    id: 0, // 规则ID
    otherAmount: '', // 其他金额，id>0时，该字段无效，id=0时该字段有效
  },
  projectRuleId: 1, // 项目包规则ID
  remarks: '', // 充值备注
  amount: '', // 应收金额
};

export default {
  name: 'CardServiceRechargeDialog',
  components: {
    CardItem,
  },
  props: {
    now: Object,
    isGarage: Boolean,
  },
  computed: {
    // 现金储值规则
    cashStoredRules() {
      return this.cardInfo.cashStoredRules || [];
    },
    // 现金充值-赠送金额与到账金额
    cash() {
      const cash = {
        amount: 0,
        giftAmount: 0,
        sum: 0,
      };
      const list = this.cashStoredRules;
      // const checkedData = list.find(item => item.checked);
      const checkedData = list.find(item => item.active);
      if (checkedData) {
        if (checkedData.id) {
          this.customOtherAmountVisible = false;
          cash.amount = checkedData.amount;
          if (checkedData.checked) {
            cash.giftAmount = checkedData.giftAmount;
            cash.sum = add(checkedData.amount, checkedData.giftAmount);
          } else {
            cash.sum = checkedData.amount;
            for (let index = list.length - 1; index >= 0; index--) {
              const item = list[index];
              if (item.checked && Number(item.amount) <= cash.amount) {
                cash.giftAmount = item.giftAmount;
                cash.sum = add(cash.amount, item.giftAmount);
                break;
              }
            }
          }
        } else {
          this.customOtherAmountVisible = true;
          const otherAmount = Number(this.formData.cash.otherAmount);
          if (otherAmount) {
            cash.amount = otherAmount;
            cash.sum = otherAmount;
            for (let index = list.length - 1; index >= 0; index--) {
              const item = list[index];
              if (item.checked && Number(item.amount) <= otherAmount) {
                cash.giftAmount = item.giftAmount;
                cash.sum = add(otherAmount, item.giftAmount);
                break;
              }
            }
          }
        }
      } else {
        this.customOtherAmountVisible = false;
      }
      return cash;
    },
    // 项目储值规则
    projectPackages() {
      return (
        (this.cardInfo.projectStoredRules &&
          this.cardInfo.projectStoredRules.projectPackages) ||
        []
      );
    },
    checkedProjectPackage() {
      return this.projectPackages.find(item => item.active);
    },
    // 卡服务折扣有效期
    cardServiceDiscountIndate() {
      let str = '';
      const discount = this.cardServiceInfo.discount;
      if (discount && discount.indate) {
        if (discount.indate.limit === false) {
          str = '永久有效';
        } else if (discount.indate.limit === true && discount.indate.date) {
          if (discount.indate.str) {
            str = discount.indate.date + ' ' + discount.indate.str;
            str = `${discount.indate.date} <span class="color-error">${discount.indate.str}</span>`;
          } else {
            str = discount.indate.date;
          }
        }
      }
      return str;
    },
    // 应收金额
    receivable() {
      const data = {
        amount: 0, // 应收金额
        cashAmount: 0, // 现金充值金额
        projectAmount: 0, // 项目充次金额
      };
      const cashAmount = Number(this.cash.amount) || 0;
      const projectAmount =
        Number(
          (this.checkedProjectPackage && this.checkedProjectPackage.price) || 0,
        ) || 0;
      data.cashAmount = cashAmount;
      data.projectAmount = projectAmount;
      data.amount = add(cashAmount, projectAmount);
      return data;
    },
  },
  watch: {
    // 现金储值规则-当勾选套餐时记录套餐id
    cashStoredRules: {
      handler: function(newValue) {
        if (Array.isArray(newValue)) {
          const checkedData = newValue.find(item => item.active);
          if (checkedData) {
            this.formData.cash.id = checkedData.id;
          } else {
            this.formData.cash.id = 0;
          }
        } else {
          this.formData.cash.id = 0;
        }
      },
      deep: true,
      immediate: true,
    },
    // 项目充值-当勾选套餐时记录套餐id
    projectPackages: {
      handler: function(newValue) {
        if (Array.isArray(newValue)) {
          const checkedData = newValue.find(item => item.active);
          if (checkedData) {
            this.formData.projectRuleId = checkedData.id;
          } else {
            this.formData.projectRuleId = 0;
          }
        } else {
          this.formData.projectRuleId = 0;
        }
      },
      deep: true,
      immediate: true,
    },
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
      customOtherAmountVisible: false, // 控制自定义充值金额显隐
    };
  },
  methods: {
    floatNumberValidate,
    zeroValidate,
    hide() {
      this.visible = false;
    },
    closed() {
      this.$emit('hide');
    },
    // 获取客户列表
    queryCustomers(keyword, isOnce) {
      this.selectLoading = true;
      getCustomers({
        keyword,
      })
        .then(res => {
          this.customerOptions = res || [];
          if (isOnce === true && this.now) {
            const findData = this.customerOptions.find(
              item => item.id === this.now.customerId,
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
    // 获取会员卡服务列表
    queryMemberCardServices(cardServiceId) {
      if (!this.checkedCustomer.id) return;
      const params = {
        customerId: this.checkedCustomer.id,
        page: 1,
        pageSize: 1000,
      };
      getMemberCardServices(params)
        .then(res => {
          this.cardServices = res.rows || [];
          // 如果有cardServiceId则表明需要筛选指定卡数据
          if (cardServiceId) {
            const findCardService = this.cardServices.find(
              item => item.id === cardServiceId,
            );
            if (findCardService) {
              this.handleRecharge(findCardService);
            }
          } else {
            // 默认选中第一个卡服务
            if (this.cardServices.length) {
              this.handleRecharge(this.cardServices[0]);
            } else {
              this.handleReset();
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.cardServices = [];
          this.handleReset();
        });
    },
    // 重置表单数据、卡服务详情、卡种详情
    handleReset() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
      this.cardInfo = {};
      this.cardServiceInfo = {};
    },
    // 点击充值
    handleRecharge(data) {
      if (data.id === this.cardServiceInfo.id) return;
      // 先重置数据
      this.handleReset();
      this.load = true;
      // 处理卡服务卡片的选中样式
      this.cardServices.forEach(item => {
        if (item.id === data.id) {
          if (!item.active) {
            item.active = true;
          }
        } else {
          item.active = false;
        }
      });
      // 获取会员卡服务详情、会员卡种详情
      Promise.all([
        this.getMemberCardServiceInfo(data.id),
        this.queryMemberCardInfo(data.cardId),
      ])
        .then(() => {
          this.load = false;
        })
        .catch(() => {
          this.load = false;
        });
    },
    // 会员卡服务详情
    getMemberCardServiceInfo(cardId) {
      const id = cardId;
      return getMemberCardServiceInfo(id)
        .then(res => {
          this.cardServiceInfo = res || {};
        })
        .catch(() => {
          this.cardServiceInfo = {};
        });
    },
    // 会员卡种详情
    queryMemberCardInfo(memberCardId) {
      const id = memberCardId;
      return getMemberCardInfo(id)
        .then(res => {
          if (res) {
            // 卡充值-现金充值-充值金额套餐添加active标记是否选中
            if (res.cashStoredRules) {
              res.cashStoredRules.forEach(item => {
                item.active = false;
                item.name = `¥ ${item.amount}`;
              });
            } else {
              res.cashStoredRules = [];
            }
            // 现金充值添加自定义选项
            res.cashStoredRules.push({
              active: false,
              id: 0,
              amount: 0,
              name: '自定义金额',
            });
            if (res.projectStoredRules) {
              res.projectStoredRules.projectPackages.forEach(item => {
                item.active = false;
              });
            }
            this.cardInfo = res;
          } else {
            this.cardInfo = {};
          }
        })
        .catch(() => {
          this.cardInfo = {};
        });
    },
    // 选择客户
    changeCheckedCustomer() {
      this.queryMemberCardServices();
    },
    // 现金充值选择充值金额
    checkedCashStored(data) {
      this.cashStoredRules.forEach(item => {
        if (item.id === data.id) {
          item.active = !data.active;
        } else {
          item.active = false;
        }
      });
      this.formData.cash.otherAmount = '';
    },
    checkedProjectStored(data) {
      const list =
        (this.cardInfo.projectStoredRules &&
          this.cardInfo.projectStoredRules.projectPackages) ||
        [];
      list.forEach(item => {
        if (item.id === data.id) {
          item.active = !data.active;
        } else {
          item.active = false;
        }
      });
    },
    // 充值
    submit() {
      if (!this.cardServiceInfo.id) return;
      const params = JSON.parse(JSON.stringify(this.formData));
      params.amount = this.receivable.amount;
      if (
        params.cash.id === 0 &&
        !params.cash.otherAmount &&
        !params.projectRuleId
      ) {
        this.$message.error('请选择充值金额或者项目包！');
        return false;
      }
      if (params)
        memberCardServiceRecharge(params, this.cardServiceInfo.id)
          .then(() => {
            this.$message.success('充值成功！');
            this.$emit('update');
            this.loading = false;
            this.hide();
          })
          .catch(err => {
            this.loading = false;
            if(err && err.message) {
              this.$message.error(err.message);
            }
          });
    },
  },
  created() {
    let keyword = '';
    if (this.now) {
      keyword = this.now.customerContacts;
    }
    this.queryCustomers(keyword, true);
  },
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
      .input-flex {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
    .card-list {
      padding: @padding-size-secondary 0;
      overflow-x: auto;
      overflow-y: hide;
      white-space: nowrap;

      // display: flex;
      .card-add {
        float: left;
        // display: inline-block;
        box-sizing: border-box;
        width: 117px;
        height: 126px;
        // padding: 0 40px;
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
      padding: @padding-size-secondary @padding-size-secondary 0;
      overflow: hidden; // BFC
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
    .radio-wrap {
      display: flex;
      .radio-label {
        line-height: 30px;
      }
    }
    .radio-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .radio-item {
        display: inline-block;
        box-sizing: border-box;
        font-size: 14px;
        // line-height: 22px;
        line-height: 14px;
        margin-right: @margin-size-secondary;
        margin-bottom: @margin-size-secondary;
        padding: @padding-size-secondary @padding-size-main;
        border: 1px solid @border-color-base;
        border-radius: 2px;
        color: @text-color-secondary;
        cursor: pointer;
        position: relative;
        // &:first-child {
        //   margin-left: 0;
        // }
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
    .footer-row {
      padding: 0 @padding-size-secondary 12px;
      line-height: 16px;
      font-size: 14px;
    }
  }
}
</style>
