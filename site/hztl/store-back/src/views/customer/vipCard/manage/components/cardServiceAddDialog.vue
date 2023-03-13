<template>
  <el-dialog
    title="开卡"
    v-loading="loading || memberCardLoading"
    :visible.sync="visible"
    :close-on-click-modal="false"
    append-to-body
    width="1180px"
    @closed="closed"
  >
    <div class="input-item">
      <div class="input-label">选择客户</div>
      <div class="input-content">
        <!-- 远程搜索 -->
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
          <el-option
            v-for="item in customerOptions"
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
    <template v-if="checkedCustomer && checkedCustomer.id">
      <!-- 会员卡列表 -->
      <!-- <div class="card-list-wrap"> -->
      <div class="card-list">
        <!-- <div class="card-add" @click="handleAdd" v-if="templateType === 1"> -->
        <div
          class="card-add"
          :class="{ 'is-active': !isUp }"
          @click="handleAdd"
        >
          <i class="el-icon-plus"></i>
          <span>点我开卡</span>
        </div>
        <CardItem
          v-for="(item, index) in cardServices"
          :key="index"
          :item="item"
          :buttonShow="item.status !== 3"
          :class="{ 'is-active': isUp && item.active }"
          :style="{
            boxShadow:
              isUp && item.active ? `0 4px 17px -5px ${item.color}` : 'none',
          }"
          @handleClick="handleRecharge"
        ></CardItem>
      </div>
      <!-- </div> -->
      <!-- 卡信息-开卡 -->
      <div class="card-container" v-show="!isUp">
        <div class="card-title">
          卡信息<el-tooltip
            v-if="cardInfo.descreption"
            effect="dark"
            :content="cardInfo.descreption"
            placement="bottom"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </div>
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
                  @change="queryMemberCardInfo"
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
                  v-model="formData.cardNo"
                  size="small"
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
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label">开卡价格</div>
              <div class="input-content">
                <el-input
                  class="width-224"
                  size="small"
                  v-model.trim="formData.price"
                  @input="formData.price = floatNumberValidate(formData.price)"
                >
                  <template slot="append">元</template>
                </el-input>
                <el-checkbox class="m-l-8" v-model="formData.free">
                  免费
                </el-checkbox>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label">开卡人</div>
              <div class="input-content">
                <el-input
                  class="width-224"
                  v-model.trim="formData.openerName"
                  size="small"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label">开卡人电话</div>
              <div class="input-content">
                <el-input
                  class="width-224"
                  v-model="formData.openerPhone"
                  size="small"
                ></el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="input-item">
              <div class="input-label">业务员</div>
              <div class="input-content">
                <el-input
                  class="width-224"
                  v-model.trim="formData.businessManName"
                  maxlength="10"
                  size="small"
                ></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="input-item">
          <div class="input-label color-secondary">开卡礼包：</div>
          <div
            class="input-content"
            v-if="cardInfo.gifts && cardInfo.gifts.checked"
          >
            赠送现金金额{{ cardInfo.gifts.amount }}元
          </div>
        </div>
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="input-item">
              <div class="input-label color-secondary">卡折扣：</div>
              <div
                class="input-content color-warning"
                v-if="cardInfo.discountRule && cardInfo.discountRule.detail"
              >
                <span
                  class="m-r-16"
                  v-if="isGarage && cardInfo.discountRule.detail.projectChecked"
                >
                  项目折扣{{ cardInfo.discountRule.detail.project }}折
                </span>
                <span
                  class="m-r-16"
                  v-if="cardInfo.discountRule.detail.partChecked"
                >
                  配件折扣{{ cardInfo.discountRule.detail.part }}折
                </span>
                <span
                  v-if="isGarage && cardInfo.discountRule.detail.packageChecked"
                >
                  套餐折扣{{ cardInfo.discountRule.detail.package }}折
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="input-item">
              <div class="input-label color-secondary">折扣有效期：</div>
              <div class="input-content">
                {{ cardDiscountIndate }}
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="input-item">
          <div class="input-label">开卡备注</div>
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
      <!-- 卡信息-充值 -->
      <div class="card-container" v-show="isUp">
        <!-- <div class="card-title-wrap"> -->
        <div class="card-title">
          卡信息
          <el-tooltip
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
                  cardServiceInfo.useLimit && cardServiceInfo.useLimit.vehicle
                "
                :title="
                  cardServiceInfo.useLimit.vehicle.limit
                    ? cardServiceInfo.useLimit.vehicle.rows &&
                      cardServiceInfo.useLimit.vehicle.rows
                        .map(item => item.name)
                        .join('、')
                    : '所有车辆'
                "
              >
                {{
                  cardServiceInfo.useLimit.vehicle.limit
                    ? cardServiceInfo.useLimit.vehicle.rows &&
                      cardServiceInfo.useLimit.vehicle.rows
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
              v-model="formData.recharge.cash.otherAmount"
              @input="
                formData.recharge.cash.otherAmount = floatNumberValidate(
                  formData.recharge.cash.otherAmount,
                )
              "
              @change="
                formData.recharge.cash.otherAmount = zeroValidate(
                  formData.recharge.cash.otherAmount,
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
              v-model="formData.recharge.remarks"
              size="small"
              maxlength="50"
              show-word-limit
            ></el-input>
          </div>
        </div>
      </div>
    </template>

    <div slot="footer" style="text-align: left;">
      <template v-if="cardServices.length || (!isUp && cardInfo.id)">
        <div class="footer-row" v-show="isUp">
          <span class="color-error">应收金额：￥{{ receivable.amount }}</span>
          <span>+现金充值金额：￥{{ receivable.cashAmount }}</span>
          <span v-if="isGarage"
            >+项目充次金额：￥{{ receivable.projectAmount }}</span
          >
        </div>
        <div class="footer-row" v-show="!isUp">
          <span class="color-error">应收金额：￥{{ receivable.amount }}</span>
          <span>=开卡价格：￥{{ receivable.openAmount }}</span>
          <span>+现金充值金额：￥{{ receivable.cashAmount }}</span>
          <span v-if="isGarage"
            >+项目充次金额：￥{{ receivable.projectAmount }}</span
          >
        </div>
      </template>
      <div style="text-align: center;">
        <el-button size="small" @click="hide">取消</el-button>
        <el-button size="small" type="primary" @click="submit">
          确认{{
            cardServices.length || (!isUp && cardInfo.id)
              ? `(¥${receivable.amount})`
              : ''
          }}
        </el-button>
      </div>
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
  generatingCardServiceCardNo,
  checkCardServiceCardNo,
  addMemberCardService,
  memberCardServiceRecharge,
} from '../../services';
import CardItem from './cardItem.vue';
import { add } from '@/utils/mathApi.js';
import { formatDate } from '@/utils/tool.js';
import { floatNumberValidate, zeroValidate } from '@/utils/validate';

const defaultFormData = {
  customerId: '', // 客户ID
  memberCardId: '', // 会员卡ID
  cardNo: '', // 会员卡号
  limitVehicleIds: [], // 限制车辆，客户车辆ID，空数组或null表示没有车辆限制
  price: '', // 开卡价格，null表示开卡免费
  free: false, // 是否免费
  openerName: '', // 开卡人
  openerPhone: '', // 开卡人电话
  remarks: '', // 开卡备注
  // 卡充值详情
  recharge: {
    cash: {
      id: 0, // 规则ID
      otherAmount: '', // 其他金额，id>0时，该字段无效，id=0时该字段有效
    },
    projectRuleId: '', // 项目包规则ID
    remarks: '', // 充值备注
  },
  amount: '', // 应收金额
  businessManName: '', // 业务员名称，非必填
};

export default {
  name: 'EditCardDialog',
  components: {
    CardItem,
  },
  props: {
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
          const otherAmount = Number(this.formData.recharge.cash.otherAmount);
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
    // 卡折扣有效期
    cardDiscountIndate() {
      let str = '';
      const indate =
        (this.cardInfo.discountRule && this.cardInfo.discountRule.indate) ||
        false;
      // const indate = this.discountRule.indate;
      if (indate) {
        if (indate.limit === false) {
          str = '永久有效';
        } else if (indate.limit === true && Number(indate.days)) {
          const now = new Date().getTime();
          str = `${formatDate('YYYY-mm-dd', now)} 至 ${formatDate(
            'YYYY-mm-dd',
            1000 * 3600 * 24 * Number(indate.days) + now,
          )}`;
        }
      }
      return str;
    },
    // 卡服务折扣有效期
    cardServiceDiscountIndate() {
      let str = '';
      const discount = this.cardServiceInfo.discount;
      if (discount && discount.indate) {
        if (discount.indate.limit === true) {
          if (discount.indate.str) {
            str = discount.indate.date + ' ' + discount.indate.str;
            str = `${discount.indate.date} <span class="color-error">${discount.indate.str}</span>`;
          } else {
            str = discount.indate.date;
          }
        } else if (discount.indate.limit === false) {
          str = '永久有效';
        }
      }
      return str;
    },
    // 应收金额
    receivable() {
      const data = {
        amount: 0, // 应收金额
        openAmount: 0, // 开卡价格
        cashAmount: 0, // 现金充值金额
        projectAmount: 0, // 项目充次金额
      };
      const cashAmount = Number(this.cash.amount);
      if (this.isUp) {
        const projectAmount =
          Number(
            (this.checkedProjectPackage && this.checkedProjectPackage.price) ||
              0,
          ) || 0;
        data.amount = add(cashAmount, projectAmount);
        data.projectAmount = projectAmount;
      } else {
        const openAmount = Number(this.formData.price) || 0;
        const projectAmount =
          Number(
            (this.checkedProjectPackage && this.checkedProjectPackage.price) ||
              0,
          ) || 0;
        if (this.formData.free) {
          data.amount = add(cashAmount, projectAmount);
          data.cashAmount = cashAmount;
          data.projectAmount = projectAmount;
        } else {
          data.amount = add(add(openAmount, cashAmount), projectAmount);
          data.openAmount = openAmount;
          data.cashAmount = cashAmount;
          data.projectAmount = projectAmount;
        }
      }
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
            this.formData.recharge.cash.id = checkedData.id;
          } else {
            this.formData.recharge.cash.id = 0;
          }
        } else {
          this.formData.recharge.cash.id = 0;
        }
      },
      deep: true,
    },
    // 项目充值规则-当勾选套餐时记录套餐id
    projectPackages: {
      handler: function(newValue) {
        if (Array.isArray(newValue)) {
          const checkedData = newValue.find(item => item.active);
          if (checkedData) {
            this.formData.recharge.projectRuleId = checkedData.id;
          } else {
            this.formData.recharge.projectRuleId = 0;
          }
        } else {
          this.formData.recharge.projectRuleId = 0;
        }
      },
      deep: true,
    },
    checkedCustomer: {
      handler: function(newValue) {
        if (newValue) {
          this.formData.customerId = newValue.id;
          this.formData.openerName = newValue.contacts;
          this.formData.openerPhone = newValue.phone;
        } else {
          this.formData.customerId = 0;
          this.formData.openerName = '';
          this.formData.openerPhone = '';
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isUp: false, // true:充值 false:开卡
      visible: true,
      loading: false,
      selectLoading: false,
      memberCardLoading: false,
      // formData: {
      //   "cash": {
      //     "id": 1, // 规则ID
      //     "otherAmount": "" // 其他金额，id>0时，该字段无效，id=0时该字段有效
      //   },
      //   "projectRuleId": 1, // 项目包规则ID
      //   "remarks": "", // 充值备注
      //   "amount": "1000" // 应收金额
      // }
      formData: JSON.parse(JSON.stringify(defaultFormData)),
      customerOptions: [],
      checkedCustomer: {
        // id: 1, // 客户主键ID
        // customerType: 0, // 客户类型，0:个人；1:公司
        // name: "", // 客户名称
        // contacts: "", // 客户联系人
        // phone: "", // 客户联系电话
        // cardServiceCount: 1 // 会员卡服务总数
      },
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
    cardNoValidate(value) {
      value = String(value);
      value = value.replace(/[^0-9a-zA-Z]/g, '');
      return String(value);
    },
    hide() {
      this.visible = false;
    },
    closed() {
      this.$emit('hide');
    },
    // 获取客户列表
    queryCustomers(keyword = '') {
      this.selectLoading = true;
      getCustomers({
        keyword,
      })
        .then(res => {
          this.customerOptions = res || [];
          this.selectLoading = false;
        })
        .catch(() => {
          this.customerOptions = [];
          this.selectLoading = false;
        });
    },
    // 生成卡号
    generatingCardServiceCardNo() {
      generatingCardServiceCardNo().then(cardNo => {
        checkCardServiceCardNo({
          cardNo,
        })
          .then(() => {
            this.formData.cardNo = cardNo;
          })
          .catch(() => {
            // 会员卡服务卡号无效，重新生成
            this.generatingCardServiceCardNo();
          });
      });
    },
    changeCheckedCustomer() {
      this.cardInfo = {};
      this.cardServiceInfo = {};
      // 重新生成卡号
      this.generatingCardServiceCardNo();
      // 会员卡服务列表
      this.queryMemberCardServices();
      // 查询会员可开卡种列表
      this.queryMemberCards();
      // 查询用户车辆列表
      this.queryCustomerVehicles();
    },
    // 获取会员卡服务列表
    queryMemberCardServices() {
      if (!this.checkedCustomer.id) return;
      this.loading = true;
      const params = {
        customerId: this.checkedCustomer.id,
        page: 1,
        pageSize: 1000,
      };
      getMemberCardServices(params)
        .then(res => {
          this.cardServices = res.rows || [];
          this.loading = false;
        })
        .catch(() => {
          this.cardServices = [];
          this.loading = false;
        });
    },
    resetFormData() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
    },
    // 点击开卡
    handleAdd() {
      this.isUp = false;
      this.resetFormData();
      this.cardServiceInfo = {};
      this.generatingCardServiceCardNo();
      this.defaultMemberCardId();
    },
    // 点击充值
    handleRecharge(data) {
      if (this.cardServiceInfo.id === data.id) return;
      this.resetFormData();
      // 会员卡种详情
      this.queryMemberCardInfo(data.cardId);
      // 获取会员卡服务详情
      this.getMemberCardServiceInfo(data.id);
      this.isUp = true;
      this.cardServices.forEach(item => {
        if (item.id === data.id) {
          if (!item.active) {
            item.active = true;
          }
        } else {
          item.active = false;
        }
      });
    },
    defaultMemberCardId() {
      this.memberCardOptions.some(item => {
        const result = item.qty && item.qty !== '0';
        if (result) {
          this.formData.memberCardId = item.id;
          this.queryMemberCardInfo(item.id);
        }
        return result;
      });
    },
    // 查询会员卡种id和名称列表
    queryMemberCards() {
      if (!this.checkedCustomer.id) return;
      getMemberCardOptions({
        customerId: this.checkedCustomer.id,
      })
        .then(res => {
          this.memberCardOptions = res || [];
          this.defaultMemberCardId();
        })
        .catch(() => {
          this.memberCardOptions = [];
        });
    },
    // 会员卡种详情
    queryMemberCardInfo(id) {
      if (!id) return false;
      this.cardInfo = {};
      getMemberCardInfo(id).then(res => {
        if (res) {
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
          this.formData.price = res.price;
          this.formData.free = res.free;
        }
      });
    },
    // 会员卡服务详情
    getMemberCardServiceInfo(id) {
      this.cardServiceInfo = {};
      this.memberCardLoading = true;
      getMemberCardServiceInfo(id)
        .then(res => {
          this.cardServiceInfo = res || {};
          this.memberCardLoading = false;
        })
        .catch(() => {
          this.memberCardLoading = false;
        });
    },
    // 我的客户车辆id和name列表
    // queryCustomerVehicles(id) {
    queryCustomerVehicles() {
      if (!this.checkedCustomer.id) return;
      getCustomerVehicles({
        customerId: this.checkedCustomer.id,
      })
        .then(res => {
          this.customerVehicleOptions = res || [];
          // this.selectLoading = false;
        })
        .catch(() => {
          this.customerVehicleOptions = [];
        });
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
      // 重置自定义金额值
      this.formData.recharge.cash.otherAmount = '';
    },
    checkedProjectStored(data) {
      const list =
        (this.cardInfo.projectStoredRules &&
          this.cardInfo.projectStoredRules.projectPackages) ||
        [];
      list.forEach(item => {
        if (item.id === data.id) {
          item.active = !data.active;
          // if (item.giftChecked) {
          //   this.formData.recharge.projectRuleId = item.id;
          // } else {
          //   this.formData.recharge.projectRuleId = 0;
          // }
        } else {
          item.active = false;
        }
      });
    },
    submit() {
      if (this.isUp) {
        this.memberCardServiceRecharge();
      } else {
        // params = {
        //   ...this.formData
        //   // customerId: this.checkdeCustomer.id // 客户ID
        // };
        this.addMemberCardService();
      }
    },
    // 新建
    addMemberCardService() {
      if (!this.checkedCustomer.id) return;
      if (!this.cardInfo.id) return;
      const params = JSON.parse(JSON.stringify(this.formData));
      params.amount = String(this.receivable.amount);
      params.customerId = this.checkedCustomer.id;
      if (!params.memberCardId) {
        this.$message.error('请选择卡种！');
        return false;
      }
      if (!params.cardNo) {
        this.$message.error('请填写卡号！');
        return false;
      }
      if (this.cardInfo.useLimit.vehicle.limit) {
        if (!params.limitVehicleIds.length) {
          this.$message.error('请选择车辆！');
          return false;
        }
      } else {
        params.limitVehicleIds = [];
      }
      this.loading = true;
      addMemberCardService(params)
        .then(() => {
          this.$message.success('新建会员卡成功！');
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
    // 充值
    memberCardServiceRecharge() {
      if (!this.cardServiceInfo.id) return;
      const formData = this.formData;
      const params = {
        // cash: {
        //   id: 1, // 规则ID
        //   otherAmount: "" // 其他金额，id>0时，该字段无效，id=0时该字段有效
        // },
        // projectRuleId: 1, // 项目包规则ID
        // remarks: "", // 充值备注
        // amount: "1000" // 应收金额
        cash: formData.recharge.cash,
        projectRuleId: formData.recharge.projectRuleId,
        remarks: formData.recharge.remarks,
        amount: this.receivable.amount,
        businessManName: formData.businessManName,
      };
      if (
        params.cash.id === 0 &&
        !params.cash.otherAmount &&
        !params.projectRuleId
      ) {
        this.$message.error('请选择充值金额或者项目包！');
        return false;
      }
      this.loading = true;
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
    this.queryCustomers();
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
      .card-add {
        float: left;
        box-sizing: border-box;
        width: 117px;
        height: 126px;
        margin: 0;
        padding: 0;
        border: 1px dashed @border-color-base;
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
        }
        &.is-active {
          color: @color-link;
          border: 1px dashed @color-link;
        }
      }
    }
    .card-container {
      margin-top: @margin-size-secondary;
      margin-bottom: @margin-size-secondary;
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
      // margin-top: @margin-size-secondary;
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
