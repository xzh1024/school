<template>
  <div class="vip-card-edit" v-loading="loading">
    <div class="body">
      <Card title="基本信息" class="card-basic">
        <div
          class="card-preview"
          v-show="formData.color"
          :style="{
            background: formData.color,
            boxShadow: `0 4px 17px -5px ${formData.color}`
          }"
        >
          <div class="card-name">{{ formData.name }}</div>
          <div class="card-number">NO.2753982798356729835</div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            卡种名称
          </div>
          <div class="input-content">
            <el-input
              v-model.trim="formData.name"
              size="small"
              maxlength="15"
            ></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            卡面背景
          </div>
          <div class="input-content">
            <el-popover
              placement="bottom-start"
              trigger="manual"
              popper-class="popover-select"
              width="265"
              v-model="colorVisible"
            >
              <div
                class="popover-color"
                v-for="(item, index) in colors"
                :key="index"
                :style="{ background: item }"
                @click="handleColor(item)"
              >
                <i class="ico-checked" v-show="item === formData.color"></i>
              </div>
              <div
                slot="reference"
                class="popover-button-wrap"
                @click="colorVisible = !colorVisible"
              >
                <div
                  class="popover-button"
                  :style="{ background: formData.color }"
                ></div>
              </div>
            </el-popover>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            库存
          </div>
          <div class="input-content">
            <el-input
              size="small"
              v-model="formData.qty"
              @input="formData.qty = integerValidate(formData.qty)"
            >
              <template slot="append">张</template>
            </el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            状态
          </div>
          <div class="input-content">
            <el-switch
              v-model="formData.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            使用门槛
          </div>
          <div class="input-content">
            <div class="radio-group">
              <el-radio
                v-model="formData.useLimit.branch.limit"
                :label="false"
                disabled
              >
                不限门店
              </el-radio>
              <el-radio v-model="formData.useLimit.branch.limit" :label="true">
                指定门店
              </el-radio>
              <el-select
                class="width-266 m-l-8"
                v-model="formData.useLimit.branch.ids"
                multiple
                collapse-tags
                placeholder=""
                size="small"
                disabled
              >
                <el-option
                  v-for="item in companieOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="radio-group" v-if="isGarage">
              <el-radio
                v-model="formData.useLimit.vehicle.limit"
                :label="false"
              >
                不限车辆
              </el-radio>
              <el-radio v-model="formData.useLimit.vehicle.limit" :label="true">
                指定车辆
              </el-radio>
            </div>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label required-style">
            开卡价格
          </div>
          <div class="input-content">
            <el-input
              size="small"
              v-model.trim="formData.price"
              @input="formData.price = floatNumberValidate(formData.price)"
              :disabled="formData.free"
            >
              <template slot="append">元</template>
            </el-input>
            <el-checkbox class="m-l-8" v-model="formData.free">
              免费
            </el-checkbox>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label">
            卡说明
          </div>
          <div class="input-content">
            <el-input
              class="descreption"
              type="textarea"
              v-model="formData.descreption"
              resize="none"
              maxlength="300"
              show-word-limit
              :autosize="{ minRows: 6, maxRows: 6 }"
            ></el-input>
          </div>
        </div>
      </Card>
      <Card title="开卡礼包">
        <div class="input-item">
          <el-checkbox v-model="formData.gifts.checked"></el-checkbox>
          <div class="input-label m-l-8">
            赠送储值金额
          </div>
          <div class="input-content">
            <el-input
              size="small"
              :disabled="!formData.gifts.checked"
              v-model="formData.gifts.amount"
              @input="
                formData.gifts.amount = floatNumberValidate(
                  formData.gifts.amount
                )
              "
            >
              <template slot="append">元</template>
            </el-input>
          </div>
        </div>
      </Card>
      <Card title="卡规则">
        <div class="subtitle">折扣规则</div>
        <div class="input-item">
          <div class="input-label">
            有效期
          </div>
          <div class="input-content">
            <el-radio
              v-model="formData.discountRule.indate.limit"
              :label="false"
            >
              永久有效
            </el-radio>
            <el-radio
              v-model="formData.discountRule.indate.limit"
              :label="true"
            >
              自办卡起
            </el-radio>
            <el-input
              class="m-l-8"
              size="small"
              :disabled="!formData.discountRule.indate.limit"
              v-model="formData.discountRule.indate.days"
              @input="
                formData.discountRule.indate.days = positiveIntegerValidate(
                  formData.discountRule.indate.days
                )
              "
            >
              <template slot="append">天</template>
            </el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label">
            折扣详情
          </div>
          <div class="input-content">
            <template v-if="isGarage">
              <el-checkbox
                v-model="formData.discountRule.detail.projectChecked"
              >
                项目折扣
              </el-checkbox>
              <el-input
                class="m-l-8"
                size="small"
                v-model="formData.discountRule.detail.project"
                @input="
                  formData.discountRule.detail.project = discountValidate(
                    formData.discountRule.detail.project
                  )
                "
                @change="
                  formData.discountRule.detail.project = zeroValidate(
                    formData.discountRule.detail.project
                  )
                "
              >
                <template slot="append">折</template>
              </el-input>
            </template>

            <el-checkbox
              class="m-l-24"
              v-model="formData.discountRule.detail.partChecked"
            >
              配件折扣
            </el-checkbox>
            <el-input
              class="m-l-8"
              size="small"
              v-model="formData.discountRule.detail.part"
              @input="
                formData.discountRule.detail.part = discountValidate(
                  formData.discountRule.detail.part
                )
              "
              @change="
                formData.discountRule.detail.part = zeroValidate(
                  formData.discountRule.detail.part
                )
              "
            >
              <template slot="append">折</template>
            </el-input>

            <template v-if="isGarage">
              <el-checkbox
                class="m-l-24"
                v-model="formData.discountRule.detail.packageChecked"
              >
                套餐折扣
              </el-checkbox>
              <el-input
                class="m-l-8"
                size="small"
                v-model="formData.discountRule.detail.package"
                @input="
                  formData.discountRule.detail.package = discountValidate(
                    formData.discountRule.detail.package
                  )
                "
                @change="
                  formData.discountRule.detail.package = zeroValidate(
                    formData.discountRule.detail.package
                  )
                "
              >
                <template slot="append">折</template>
              </el-input>
            </template>
          </div>
        </div>
        <div class="subtitle">储值规则</div>
        <div class="m-b-8">现金储值</div>
        <el-table
          class="table-base m-b-8"
          size="small"
          :data="formData.cashStoredRules"
          stripe
          border
          style="width: 580px"
        >
          <el-table-column type="index" width="40"></el-table-column>
          <el-table-column prop="amount" show-overflow-tooltip min-width="130">
            <div slot="header" class="required-style">
              充值金额满（元）
            </div>
            <template slot-scope="scope">
              <el-input
                class="width-112"
                size="small"
                v-model="scope.row.amount"
                @input="
                  scope.row.amount = floatNumberValidate(scope.row.amount)
                "
              >
                <!-- <template slot="append">元</template> -->
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="赠送" show-overflow-tooltip min-width="270">
            <div class="card-state" slot-scope="scope">
              <el-checkbox v-model="scope.row.checked">
                赠送储值金额
              </el-checkbox>
              <el-input
                size="small"
                class="m-l-8"
                v-model="scope.row.giftAmount"
                @input="
                  scope.row.giftAmount = floatNumberValidate(
                    scope.row.giftAmount
                  )
                "
              >
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="cashStoredDelete(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          class="m-b-16"
          size="mini"
          @click="cashStoredAdd"
          v-show="formData.cashStoredRules.length < 20"
        >
          + 添加储值规则
        </el-button>

        <template v-if="isGarage">
          <div class="m-b-8">项目计次</div>
          <div class="input-item" style="margin-bottom: 8px;">
            <div class="input-label">
              项目有效期
            </div>
            <div class="input-content">
              <el-radio
                :label="false"
                v-model="formData.projectStoredRules.indate.limit"
              >
                永久有效
              </el-radio>
              <el-radio
                :label="true"
                v-model="formData.projectStoredRules.indate.limit"
              >
                自充值起
              </el-radio>
              <el-input
                class="m-l-8"
                size="small"
                v-model="formData.projectStoredRules.indate.days"
                :disabled="!formData.projectStoredRules.indate.limit"
                @input="
                  formData.projectStoredRules.indate.days = positiveIntegerValidate(
                    formData.projectStoredRules.indate.days
                  )
                "
              >
                <template slot="append">天</template>
              </el-input>
            </div>
          </div>
          <el-table
            class="table-base m-b-8"
            size="small"
            :data="formData.projectStoredRules.projectPackages"
            stripe
            border
            style="width: 1020px"
          >
            <el-table-column type="index" width="40"></el-table-column>
            <el-table-column prop="name" show-overflow-tooltip min-width="150">
              <div slot="header" class="required-style">
                项目包名称
              </div>
              <template slot-scope="scope">
                <el-input
                  class="width-112"
                  size="small"
                  v-model.trim="scope.row.name"
                  maxlength="10"
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="300">
              <span slot="header" class="required-style">
                项目/套餐储值数量明细
              </span>
              <template slot-scope="scope">
                <div
                  class="project-item"
                  v-if="
                    scope.row.details.projects &&
                      scope.row.details.projects.length
                  "
                >
                  <div class="project-label">服务项目：</div>
                  <div class="project-content">
                    {{
                      scope.row.details.projects
                        .map(item => `${item.goodsName}*${item.qty}`)
                        .join("、")
                    }}
                  </div>
                </div>
                <div
                  class="project-item"
                  v-if="
                    scope.row.details.packages &&
                      scope.row.details.packages.length
                  "
                >
                  <div class="project-label">项目套餐：</div>
                  <div class="project-content">
                    {{
                      scope.row.details.packages
                        .map(item => `${item.goodsName}*${item.qty}`)
                        .join("、")
                    }}
                  </div>
                </div>
                <div>
                  <el-button
                    type="text"
                    size="mini"
                    @click="showProjectDialog(scope.row, 'details')"
                  >
                    请选择服务项目或项目套餐
                  </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="赠送" show-overflow-tooltip min-width="300">
              <template slot-scope="scope">
                <div>
                  <el-checkbox v-model="scope.row.giftChecked">
                    赠送储值金额
                  </el-checkbox>
                  <el-input
                    class="m-l-8"
                    size="small"
                    v-model="scope.row.giftAmount"
                    @input="
                      scope.row.giftAmount = floatNumberValidate(
                        scope.row.giftAmount
                      )
                    "
                  >
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="project-item">
                  <el-checkbox v-model="scope.row.giftDetailChecked">
                    赠品
                  </el-checkbox>
                  <div class="project-content m-l-8">
                    <template
                      v-if="
                        scope.row.giftDetails.projects &&
                          scope.row.giftDetails.projects.length
                      "
                    >
                      {{
                        scope.row.giftDetails.projects
                          .map(item => `${item.goodsName}*${item.qty}`)
                          .join("、")
                      }}
                    </template>
                    <template
                      v-if="
                        scope.row.giftDetails.projects &&
                          scope.row.giftDetails.projects.length &&
                          scope.row.giftDetails.packages &&
                          scope.row.giftDetails.packages.length
                      "
                      >、</template
                    >
                    <template
                      v-if="
                        scope.row.giftDetails.packages &&
                          scope.row.giftDetails.packages.length
                      "
                    >
                      {{
                        scope.row.giftDetails.packages
                          .map(item => `${item.goodsName}*${item.qty}`)
                          .join("、")
                      }}
                    </template>
                  </div>
                </div>
                <div>
                  <el-button
                    type="text"
                    size="mini"
                    @click="showProjectDialog(scope.row, 'giftDetails')"
                    >选择赠品</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="price" show-overflow-tooltip min-width="150">
              <span slot="header" class="required-style">
                价格（元）
              </span>
              <template slot-scope="scope">
                <el-input
                  class="width-112"
                  size="small"
                  v-model="scope.row.price"
                  @input="
                    scope.row.price = floatNumberValidate(scope.row.price)
                  "
                >
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="projectStoredDelete(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            size="mini"
            @click="projectStoredAdd"
            v-show="formData.projectStoredRules.projectPackages.length < 20"
          >
            + 添加项目包
          </el-button>
        </template>
      </Card>
    </div>

    <div class="footer">
      <el-button size="small" @click="$router.go(-1)">取 消</el-button>
      <el-button size="small" type="primary" @click="submit">保 存</el-button>
    </div>
    <ProjectDialog
      :type="projectType"
      :project="checkedProject"
      @updateProject="updateProject"
      @hide="hideProjectDialog"
      v-if="projectDialogVisible"
    ></ProjectDialog>
  </div>
</template>

<script>
import Card from "./components/card.vue";
import ProjectDialog from "./components/projectDialog.vue";
import {
  getMemberCardInfo,
  addOrUpdateMemberCard,
  getCompanies
} from "../services";
import {
  integerValidate,
  positiveIntegerValidate,
  floatNumberValidate,
  discountValidate,
  zeroValidate
} from "@/utils/validate";

const defaultCashStoredData = {
  amount: "",
  giftAmount: "",
  checked: false
};
const defaultProjectStoredData = {
  name: "", // 项目包名称
  price: "", // 价格
  giftChecked: false, // 赠送金额开关
  giftAmount: "", // 赠送金额
  giftDetailChecked: false, // 赠品开关
  // 服务项目/项目套餐详情
  details: {
    projects: [],
    // 项目套餐
    packages: []
  },
  // 赠送的服务项目/项目套餐详情
  giftDetails: {
    // 服务项目
    projects: [],
    // 项目套餐
    packages: []
  }
};

export default {
  name: "VipCardEdit",
  components: { Card, ProjectDialog },
  data() {
    return {
      loading: false,
      projectDialogVisible: false,
      projectType: "",
      formData: {
        id: 0, // 会员卡主键ID，ID=0时为新增，ID>0时为修改
        name: "", // 卡种名称
        color: "", //卡背景颜色，空字符串表示没有设置
        qty: "999", // 库存数量
        status: true, // 会员卡种状态，1:启用；2:停用
        // 使用门槛
        useLimit: {
          // 门店限制
          branch: {
            limit: false, // 不限门店
            ids: [] // limit字段为true时，该字段表示指定门店id
          },
          vehicle: {
            limit: false // true：限制车辆；false：不限制车辆
          }
        },
        price: "", // 开卡价格，null表示没有设置
        free: true, // 开卡免费
        descreption: "", // 卡说明
        // 开卡礼包
        gifts: {
          checked: false, // 是否赠送金额
          amount: "" // 赠送金额
        },
        // 折扣规则
        discountRule: {
          // 有效期
          indate: {
            limit: false, // false：永久有效；
            days: "" // limit字段为true时，该字段有效且表示 自办卡起多少天
          },
          // 折扣详情
          detail: {
            project: "", // 项目折扣（1.0表示10%）
            projectChecked: true, // 项目折扣已勾选
            part: "", // 配件折扣（1.0表示10%）
            partChecked: true, // 配件折扣已勾选
            package: "", // 套餐折扣（1.0表示10%）
            packageChecked: true // 套餐折扣已勾选
          }
        },
        // 现金储值规则
        cashStoredRules: [],
        // 项目储值规则
        projectStoredRules: {
          // projectStoredRules.packages
          // 有效期
          indate: {
            limit: false, // false：永久有效；
            days: "" // limit字段为true时，该字段有效且表示 自办卡起多少天
          },
          // 项目储值包
          projectPackages: []
        }
      },
      companieOptions: [],
      colorVisible: false,
      colors: [
        "#D8B77D",
        "#3ABD78",
        "#5E89E6",
        "#7E7F99",
        "#A88D71",
        "#82A0E2",
        "#B8AE6C",
        "#A88DFE",
        "#7991BD",
        "#8A83B2",
        "#99A3B7",
        "#D083BC",
        "#E69C7F",
        "#EB9191",
        "#61BAA6",
        "#CCA09D",
        "#CF8972",
        "#929CED",
        "#CEB798",
        "#777EC7"
      ]
    };
  },
  computed: {
    isGarage() {
      return this.$store.state.base.companyType === "garage";
    }
  },
  methods: {
    integerValidate,
    positiveIntegerValidate,
    floatNumberValidate,
    discountValidate,
    zeroValidate,
    getCompanies() {
      getCompanies()
        .then(res => {
          this.companieOptions = res || [];
        })
        .catch(() => {
          this.companieOptions = [];
        });
    },
    // 现金储值删除
    cashStoredDelete(index) {
      this.formData.cashStoredRules.splice(index, 1);
    },
    // 现金储值新增
    cashStoredAdd() {
      this.formData.cashStoredRules.push(
        JSON.parse(JSON.stringify(defaultCashStoredData))
      );
    },
    // 项目储值删除
    projectStoredDelete(index) {
      this.formData.projectStoredRules.projectPackages.splice(index, 1);
    },
    // 项目储值添加
    projectStoredAdd() {
      this.formData.projectStoredRules.projectPackages.push(
        JSON.parse(JSON.stringify(defaultProjectStoredData))
      );
    },
    // 选择项目弹框
    showProjectDialog(project, type) {
      this.checkedProject = project;
      this.projectType = type;
      this.projectDialogVisible = true;
    },
    hideProjectDialog() {
      this.projectDialogVisible = false;
    },
    updateProject(data) {
      this.checkedProject[data.type].projects = data.projects;
      this.checkedProject[data.type].packages = data.packages;
    },
    // 选择卡面背景
    handleColor(color) {
      this.formData.color = color;
      this.colorVisible = false;
    },
    // 获取会员卡种详情
    getMemberCardInfo(id) {
      this.loading = true;
      getMemberCardInfo(id)
        .then(res => {
          if (res) {
            res.status = res.status === 1 ? true : false;
            res.useLimit.branch.ids = res.useLimit.branch.ids
              ? res.useLimit.branch.ids
              : [];
            res.projectStoredRules.projectPackages = res.projectStoredRules
              .projectPackages
              ? res.projectStoredRules.projectPackages
              : [];
            Object.assign(this.formData, res);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 保存
    submit() {
      const params = JSON.parse(JSON.stringify(this.formData));
      params.status = params.status === true ? 1 : 2;
      params.discountRule.indate.days = params.discountRule.indate.days
        ? Number(params.discountRule.indate.days)
        : null;
      params.projectStoredRules.indate.days = params.projectStoredRules.indate
        .days
        ? Number(params.projectStoredRules.indate.days)
        : null;
      if (!params.name) {
        this.$message.error("请填写卡种名称！");
        return false;
      }
      if (!params.color) {
        this.$message.error("请选择卡面背景！");
        return false;
      }
      if (!params.qty) {
        this.$message.error("请填写库存数量！");
        return false;
      }
      const useLimitBranch = params.useLimit.branch;
      if (useLimitBranch.limit && !useLimitBranch.ids.length) {
        this.$message.error("请选择指定的门店！");
        return false;
      }
      if (!params.free) {
        if (!Number(params.price)) {
          this.$message.error("开卡价格必须为大于0的值！");
          return false;
        }
      } else {
        params.price = null;
      }
      if (params.gifts.checked) {
        if (!Number(params.gifts.amount)) {
          this.$message.error("赠送储值金额必须为大于0的值！");
          return false;
        }
      } else {
        params.gifts.amount = null;
      }
      if (params.discountRule.indate.limit) {
        if (!Number(params.discountRule.indate.days)) {
          this.$message.error("折扣有效期为大于0的值！");
          return false;
        }
      } else {
        params.discountRule.indate.days = null;
      }
      if (params.discountRule.detail.projectChecked) {
        if (!Number(params.discountRule.detail.project)) {
          this.$message.error("项目折扣必须为大于0的值！");
          return false;
        }
      } else {
        params.discountRule.detail.project = null;
      }
      if (params.discountRule.detail.partChecked) {
        if (!Number(params.discountRule.detail.part)) {
          this.$message.error("配件折扣必须为大于0的值！");
          return false;
        }
      } else {
        params.discountRule.detail.part = null;
      }
      if (params.discountRule.detail.packageChecked) {
        if (!Number(params.discountRule.detail.package)) {
          this.$message.error("套餐折扣必须为大于0的值！");
          return false;
        }
      } else {
        params.discountRule.detail.package = null;
      }
      // 项目有效期
      if (params.projectStoredRules.indate.limit) {
        if (!Number(params.projectStoredRules.indate.days)) {
          this.$message.error("项目折扣有效期为大于0的值！");
          return false;
        }
      } else {
        params.projectStoredRules.indate.days = null;
      }
      const cashStoredRules = params.cashStoredRules;
      for (let index = 0, len = cashStoredRules.length; index < len; index++) {
        const item = cashStoredRules[index];
        if (!item.amount) {
          this.$message.error("充值金额不能为空！");
          return false;
        }
      }
      const projectPackages = params.projectStoredRules.projectPackages;
      for (let index = 0, len = projectPackages.length; index < len; index++) {
        const item = projectPackages[index];
        if (!item.name) {
          this.$message.error("项目包名称不能为空！");
          return false;
        }
        if (!item.details.projects.length && !item.details.packages.length) {
          this.$message.error("请选择服务项目或项目套餐！");
          return false;
        }
        if (!item.price) {
          this.$message.error("请设置项目包价格！");
          return false;
        }
      }
      this.loading = true;
      addOrUpdateMemberCard(params)
        .then(() => {
          this.loading = false;
          this.$message.success("编辑成功！");
          this.$router.go(-1);
        })
        .catch(err => {
          this.loading = false;
          if (err && err.message) {
            this.$message.error(err.message);
          }
        });
    }
  },
  created() {
    const { id } = this.$route.query;
    if (id) {
      this.getMemberCardInfo(id);
    }
    this.getCompanies();
  }
};
</script>

<style lang="less" scoped>
.popover-select {
  box-sizing: border-box;
  overflow-x: hidden;
  padding: @padding-size-main;
  display: flex;
  flex-direction: column;
  .popover-color {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-right: @margin-size-main;
    position: relative;
    cursor: pointer;
    &:nth-child(7n + 0) {
      margin-right: 0;
    }
    .ico-checked {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
.vip-card-edit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    padding-top: @padding-size-main;
    overflow-y: auto;
    .card-basic {
      position: relative;
      .card-preview {
        position: absolute;
        left: 472px;
        top: 34px;
        width: 176px;
        height: 94px;
        border-radius: 4px;
        color: #ffffff;
        box-sizing: border-box;
        padding: @padding-size-secondary;
        .card-name {
          min-height: 22px;
          line-height: 22px;
          font-size: 14px;
          font-weight: 700;
        }
        .card-number {
          font-size: 12px;
          line-height: 20px;
          font-weight: 400;
        }
        &::after {
          content: "* 仅供参考，实际以用户查看时为准";
          color: @text-color-hint;
          font-size: 12px;
          width: 200px;
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: @margin-size-secondary;
        }
      }
    }
  }
  .card {
    margin: 0 @margin-size-main;
  }
  .red {
    color: @color-error;
  }
  .m-b-8 {
    margin-bottom: @margin-size-secondary;
  }
  .m-b-16 {
    margin-bottom: @margin-size-main;
  }
  .m-l-8 {
    margin-left: @margin-size-secondary;
  }
  .m-l-24 {
    margin-left: 24px;
  }
  .el-input {
    width: 166px;
  }
  .width-112 {
    width: 112px;
  }
  .width-266 {
    width: 266px;
  }
  .el-radio {
    /deep/ .el-radio__label {
      // padding-left: @padding-size-secondary;
      padding-left: 6px;
    }
  }
  .subtitle {
    font-size: 14px;
    font-weight: @strong;
    margin-bottom: @margin-size-secondary;
  }
  // .table-base {
  //   .el-input {
  //     // width: 166px;
  //     width: 112px;
  //   }
  // }
  .input-item {
    display: flex;
    align-items: center;
    margin-bottom: @margin-size-main;
    .input-label {
      margin-right: @margin-size-secondary;
    }
    .input-content {
      // flex: 1;
      // .el-input {
      //   // max-width: 220px;
      //   width: 166px;
      // }
      line-height: 22px;
      .radio-group {
        margin-top: @margin-size-secondary;
        &:first-child {
          margin-top: 0;
        }
      }
      .el-radio {
        margin-left: 24px;
        &:first-child {
          margin-left: 0;
        }
      }
      .card-explain {
        width: 448px;
        font-size: 14px;
        line-height: 22px;
        padding: @padding-size-main;
        border: 1px solid @border-color-base;
      }
      .popover-button-wrap {
        height: 32px;
        width: 100px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        cursor: pointer;
        .popover-button {
          // width: 60px;
          // height: 24px;
          padding: 12px 32px;
          // margin: 3px 16px;
        }
      }
      .descreption {
        width: 600px;
      }
    }
  }
  .project-item {
    display: flex;
    height: 22px;
    line-height: 22px;
    .project-label {
      color: #666666;
    }
    .project-content {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .footer {
    padding: 12px 0;
    border-top: 1px solid @border-color-base;
    text-align: center;
  }
}
</style>
