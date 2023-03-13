<template>
  <div class="coupon-add-container">
    <div class="coupon-header">优惠券样式图</div>
    <div class="coupon-body">
      <div class="coupon-aside"></div>
      <div class="coupon-main">
        <SettingCard class="coupon-card">
          <div class="input-item">
            <div class="input-label required-style">
              优惠券名称
            </div>
            <div class="input-content">
              <el-input
                v-model.trim="formData.name"
                size="small"
                maxlength="10"
                placeholder="如：庆国庆优惠券，最多10字"
              ></el-input>
            </div>
          </div>
          <div class="input-item">
            <div class="input-label required-style">
              发放总量
            </div>
            <div class="input-content">
              <el-input
                class="m-r-8"
                v-model="formData.total"
                size="small"
                placeholder="最多10位数"
                @input="formData.total = integerValidate(formData.total)"
              >
                <template slot="append">张</template>
              </el-input>
              <div class="input-assist">
                * 修改优惠券总量时不能小于已领数，请谨慎设置
              </div>
            </div>
          </div>
          <div class="input-item" style="margin-bottom: 8px;">
            <div class="input-label required-style">
              适用商品
            </div>
            <div class="input-content">
              <el-radio v-model="formData.limitType" label="none">
                全部商品可用
              </el-radio>
              <el-radio v-model="formData.limitType" label="usable">
                指定商品可用
              </el-radio>
              <el-radio v-model="formData.limitType" label="unusable">
                指定商品不可用
              </el-radio>
            </div>
          </div>
          <div
            class="limit-container"
            v-show="['usable', 'unusable'].includes(formData.limitType)"
          >
            <div class="limit-label">指定商品</div>
            <el-checkbox-group v-model="limitCheckList">
              <div class="checkbox-item">
                <el-checkbox label="part">零配件</el-checkbox>
                <el-button
                  type="text"
                  size="small"
                  @click="showPartsDialog(formData.limits['part'].content)"
                >
                  选择配件({{
                    Object.keys(formData.limits['part'].content).length
                  }})
                </el-button>
              </div>
              <div class="checkbox-item">
                <el-checkbox label="item">服务项目</el-checkbox>
                <el-button
                  type="text"
                  size="small"
                  @click="showProjectDialog(formData.limits['item'].content)"
                >
                  选择项目({{
                    Object.keys(formData.limits['item'].content).length
                  }})
                </el-button>
              </div>
              <div class="checkbox-item">
                <el-checkbox label="set">项目套餐</el-checkbox>
                <el-button
                  type="text"
                  size="small"
                  @click="showPackageDialog(formData.limits['set'].content)"
                >
                  选择套餐({{
                    Object.keys(formData.limits['set'].content).length
                  }})
                </el-button>
              </div>
            </el-checkbox-group>
          </div>
          <div class="input-item">
            <div class="input-label required-style">
              使用门槛
            </div>
            <div class="input-content">
              <div class="radio-group">
                <el-radio v-model="formData.threshold" label="none">
                  无使用门槛
                </el-radio>
                <div class="radio-block">
                  <el-radio v-model="formData.threshold" label="amount">
                    消费满
                  </el-radio>
                  <el-input
                    class="width-166"
                    size="small"
                    v-model="formData.thresholdAmount"
                    @input="
                      formData.thresholdAmount = integerValidate(
                        formData.thresholdAmount,
                      )
                    "
                  >
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>

          <div class="input-item" v-if="type === 'reduce'">
            <div class="input-label required-style">
              优惠内容
            </div>
            <div class="input-content">
              减免
              <el-input
                class="width-166 m-r-8"
                size="small"
                v-model="formData.value"
                @input="formData.value = floatNumberValidate(formData.value)"
              >
                <template slot="append">元</template>
              </el-input>
              <div class="input-assist">
                *
                优惠内容是商家单独给消费者的优惠金额，设置大额优惠金额时需谨慎，以免造成资损（测试活动建议设置小额优惠内容）。
              </div>
            </div>
          </div>
          <template v-if="type === 'discount'">
            <div class="input-item">
              <div class="input-label required-style">
                优惠内容
              </div>
              <div class="input-content">
                打
                <el-input
                  class="width-166 m-r-8"
                  size="small"
                  v-model="formData.value"
                  @input="formData.value = discountValidate(formData.value)"
                >
                  <template slot="append">折</template>
                </el-input>
                <div class="input-assist">
                  *
                  优惠内容是商家单独给消费者的优惠金额，设置大额优惠金额时需谨慎，以免造成资损（测试活动建议设置小额优惠内容）。
                </div>
              </div>
            </div>
            <div class="input-item">
              <div class="input-label"></div>
              <div class="input-content">
                <el-checkbox v-model="formData.maxType">最多优惠</el-checkbox>
                <el-input
                  class="width-166 m-l-8"
                  size="small"
                  v-model="formData.max"
                  @input="formData.max = floatNumberValidate(formData.max)"
                >
                  <template slot="append">元</template>
                </el-input>
              </div>
            </div>
          </template>
          <div class="input-item">
            <div class="input-label required-style">
              有效期
            </div>
            <div class="input-content">
              <div class="radio-block">
                <el-radio v-model="formData.useType" label="date">
                  <span></span>
                </el-radio>
                <el-date-picker
                  size="small"
                  v-model="dateInterval"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
              <br />
              <div class="radio-block m-r-8">
                <el-radio v-model="formData.useType" label="days">
                  <span></span>
                </el-radio>
                领券当日起
                <el-input
                  class="width-114 m-l-8"
                  size="small"
                  v-model="formData.days"
                  @input="formData.days = integerValidate(formData.days)"
                >
                </el-input>
                天内可用
              </div>
              <div class="input-assist">
                *
                若设置固定用券时间，编辑保存后对已领取未使用及后续领取的券均生效。若设置领券当日n天内可用，编辑保存后仅对后续领取的券生效。
              </div>
            </div>
          </div>
        </SettingCard>
        <SettingCard title="领取和使用规则" class="coupon-card">
          <div class="input-item">
            <div class="input-label required-style">
              领取门槛
            </div>
            <div class="input-content">
              <el-radio v-model="formData.getThreshold" label="customer">
                不限制，所有人可领
              </el-radio>
              <el-radio v-model="formData.getThreshold" label="member">
                会员客户可领
              </el-radio>
              <el-radio v-model="formData.getThreshold" label="private">
                私密，所有客户不可领
              </el-radio>
            </div>
          </div>
          <div class="input-item">
            <div class="input-label">
              使用说明
            </div>
            <div class="input-content">
              <el-input
                class="input-textarea"
                type="textarea"
                v-model="formData.description"
                disabled
                resize="none"
                show-word-limit
                :autosize="{ minRows: 1, maxRows: 6 }"
              ></el-input>
            </div>
          </div>
          <div class="input-item">
            <div class="input-label">
              其他说明
            </div>
            <div class="input-content">
              <el-input
                class="input-textarea"
                type="textarea"
                v-model="formData.remarks"
                resize="none"
                maxlength="300"
                show-word-limit
                :autosize="{ minRows: 1, maxRows: 6 }"
              ></el-input>
            </div>
          </div>
        </SettingCard>
      </div>
    </div>
    <div class="coupon-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="submit">保存</el-button>
    </div>

    <PartsDialog
      :list="partsIdList"
      @hide="hidePartsDialog"
      v-if="partsDialogVisible"
    ></PartsDialog>
    <ProjectDialog
      :list="projectIdList"
      @hide="hideProjectDialog"
      v-if="projectDialogVisible"
    ></ProjectDialog>
    <PackageDialog
      :list="packageIdList"
      @hide="hidePackageDialog"
      v-if="packageDialogVisible"
    ></PackageDialog>
  </div>
</template>

<script>
import SettingCard from '@/components/card/settingCard.vue';
import PartsDialog from '@/components/goods/parts/partsDialog.vue';
import ProjectDialog from '@/components/goods/project/projectDialog.vue';
import PackageDialog from '@/components/goods/package/packageDialog.vue';
import { addCoupon } from '../services';
import {
  integerValidate,
  floatNumberValidate,
  discountValidate,
} from '@/utils/validate';

export default {
  components: { SettingCard, PartsDialog, ProjectDialog, PackageDialog },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      formData: {
        name: '', // 优惠券名称
        total: '', // 发放数量 number
        type: '', // 优惠类型 reduce:减免 discount:折扣
        value: '', // 优惠值 减免金额/折扣值
        maxType: this.type === 'discount' ? false : '', // 最大优惠方式 none:不限制 amount:最大金额限制
        max: '', // 最大优惠金额
        limitType: 'none', // 适用商品类型 none:不限制 usable:可用 unusable:不可用
        threshold: 'none', // 使用门槛类型 none:不限制 amount:消费金额限制
        thresholdAmount: '', // 使用门槛值
        useType: 'date', // 使用时间类型 date:固定起止日期 days:领券当日起n天可用
        startDate: null, // 开始日期，useType为date时必需
        endDate: null, // 结束日期，useType为date时必需
        dateInterval: null,
        days: '', // n天可用，useType为days时必需 number
        getThreshold: 'customer', // 领取门槛 customer:不限制 member:会员可领 private:私密（后台发放）
        description: '',
        remarks: '', // 其他说明
        // 适用商品范围
        limits: {
          // 零配件
          part: {
            enable: false, // 是否启用
            // type: '', // 适用范围类型 part:零配件 item:服务项目 set:套餐
            // 适用范围内容零配件: {swPartId: [property1, property2]} 项目/套餐: {id: []}
            // '0': [''],
            content: [],
          },
          // 服务项目
          item: {
            enable: false, // 是否启用
            // type: '', // 适用范围类型 part:零配件 item:服务项目 set:套餐
            content: [],
          },
          // 套餐
          set: {
            enable: false, // 是否启用
            // type: '', // 适用范围类型 part:零配件 item:服务项目 set:套餐
            content: [],
          },
        },
      },
      dateInterval: null,
      limitCheckList: [], // part:零配件  item:服务项目  set:项目套餐
      partsIdList: [],
      partsDialogVisible: false,
      projectIdList: [],
      projectDialogVisible: false,
      packageIdList: [],
      packageDialogVisible: false,
    };
  },
  computed: {
    type() {
      return this.$route.query.type;
    },
  },
  methods: {
    // 整数验证
    integerValidate,
    // 金额验证
    floatNumberValidate,
    // 折扣验证
    discountValidate,
    cancel() {
      this.$router.go(-1);
    },
    // 配件
    showPartsDialog(list) {
      this.partsIdList = list;
      this.partsDialogVisible = true;
    },
    hidePartsDialog() {
      this.partsIdList = [];
      this.partsDialogVisible = false;
    },
    // 服务项目
    showProjectDialog(list) {
      this.projectIdList = list;
      this.projectDialogVisible = true;
    },
    hideProjectDialog() {
      this.projectIdList = [];
      this.projectDialogVisible = false;
    },
    // 项目套餐
    showPackageDialog(list) {
      this.packageIdList = list;
      this.packageDialogVisible = true;
    },
    hidePackageDialog() {
      this.packageIdList = [];
      this.packageDialogVisible = false;
    },
    submit() {
      const formData = JSON.parse(JSON.stringify(this.formData));
      const params = {
        ...formData,
      };
      params.type = this.type;
      // 优惠券名称
      if (!params.name) {
        this.$message.error('请填写优惠券名称！');
        return false;
      }
      // 发放总量
      if (params.total) {
        params.total = Number(params.total);
      } else {
        this.$message.error('请填写发放总量！');
        return false;
      }
      const limits = formData.limits;
      const limitCheckList = this.limitCheckList;
      // 适用商品
      if (params.limitType !== 'none') {
        if (limitCheckList.length) {
          for (let index = 0; index < limitCheckList.length; index++) {
            const type = limitCheckList[index];
            if (!limits[type].content.length) {
              this.$message.error('请选择商品');
              return false;
            }
          }
        } else {
          this.$message.error('请勾选指定商品');
          return false;
        }
      }
      for (const key in limits) {
        if (Object.hasOwnProperty.call(limits, key)) {
          const item = limits[key];
          const content = {};
          item.content.forEach(id => {
            content[id] = [];
          });
          item.content = content;
          if (limitCheckList.includes(key)) {
            item.enable = true;
          } else {
            item.enable = false;
          }
        }
      }
      // 使用门槛
      if (params.threshold === 'amount') {
        // params.thresholdAmount = null;
        if (params.thresholdAmount) {
          params.thresholdAmount = Number(params.thresholdAmount);
        } else {
          this.$message.error('请填写使用门槛金额！');
          return false;
        }
      }
      // 优惠内容
      if (!params.value) {
        this.$message.error('请填写优惠内容！');
        return false;
      }
      if (params.type === 'discount') {
        if (params.maxType === true) {
          params.maxType = 'amount';
          if (!params.max) {
            this.$message.error('请填写最多优惠！');
            return false;
          }
        } else {
          params.maxType = 'none';
        }
      }
      // 有效期
      if (this.dateInterval) {
        params.startDate = this.dateInterval[0];
        params.endDate = this.dateInterval[1];
      } else {
        if (params.useType === 'date') {
          this.$message.error('请选择有效期范围！');
          return false;
        }
      }
      if (params.days) {
        params.days = Number(params.total);
      } else {
        if (params.useType === 'days') {
          this.$message.error('请填写有效期天数！');
          return false;
        } else {
          params.days = null;
        }
      }
      params.limits = limits;
      addCoupon(params)
        .then(() => {
          this.$message.success('新建优惠券成功！');
          this.$router.go(-1);
        })
        .catch(err => {
          if (err && err.message) {
            this.$message.error(err.message);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-add-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .coupon-header {
    box-sizing: border-box;
    // height: 50px;
    padding: 16px;
    background: #ffffff;
    font-size: 14px;
  }
  .coupon-body {
    padding: 0 16px 16px;
    flex: 1;
    display: flex;
    background: #ffffff;
    overflow: hidden;
    .coupon-aside {
      width: 375px;
      height: 667px;
      margin-right: 32px;
      background: url('~@/assets/img/marketing/coupon-mobile-view.png')
        no-repeat;
      background-size: 100% 100%;
    }
    .coupon-main {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      .coupon-card {
        .input-label {
          width: 86px;
          text-align: right;
        }
        .radio-block {
          display: inline-block;
          .el-radio {
            margin-right: 8px;
          }
        }

        .limit-container {
          width: 544px;
          background: #f5f5f5;
          border-radius: 2px;
          margin-left: 20px;
          padding: 10px 16px;
          display: flex;
          margin-bottom: 16px;
          .limit-label {
            line-height: 32px;
          }
          .el-checkbox-group {
            flex: 1;
            margin-left: 8px;
          }
        }
      }
    }
  }
  .coupon-footer {
    height: 56px;
    background: #ffffff;
    box-shadow: 0px -1px 0px 0px #d9d9d9;
    text-align: center;
    line-height: 56px;
  }
}
</style>
