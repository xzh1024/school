<template>
  <ht-dialog
    title="预约单转工单"
    v-bind="$attrs"
    width="720px"
    top="10vh"
    @close="cancelHandle"
  >
    <div>
      <div class="repair-order-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <ht-card title="预约单详情">
              <table class="order-table" cellspacing="0">
                <tr>
                  <td>车牌号</td>
                  <td>{{ EditObj.plateNumber }}</td>
                </tr>
                <tr>
                  <td>预约人</td>
                  <td>{{ EditObj.contactsName }}</td>
                </tr>
                <tr>
                  <td>预约人电话</td>
                  <td>{{ EditObj.contactsPhone }}</td>
                </tr>
                <tr>
                  <td>预约到店日期</td>
                  <td>{{ EditObj.arrivalDate }}</td>
                </tr>
                <tr>
                  <td>预约到店时段</td>
                  <td>{{ EditObj.startTime + " 至 " + EditObj.endTime }}</td>
                </tr>
                <tr>
                  <td>预约单号</td>
                  <td>{{ EditObj.billNo }}</td>
                </tr>
                <tr>
                  <td>来源类型</td>
                  <td>{{ EditObj.sourceType }}</td>
                </tr>
                <tr>
                  <td>预约业务类型</td>
                  <td>
                    {{ businessTypes[EditObj.typeId] }}
                  </td>
                </tr>
                <tr>
                  <td>接待员</td>
                  <td>{{ userLists[EditObj.receptionistId] }}</td>
                </tr>
                <tr>
                  <td>预约备注</td>
                  <td>{{ EditObj.remark }}</td>
                </tr>
              </table>
            </ht-card>
          </el-col>
          <el-col :span="12">
            <ht-card title="转单信息">
              <el-form
                class="dialig-form"
                ref="form"
                :rules="rules"
                :model="dialigForm"
                label-width="100px"
              >
                <el-form-item label="车牌号" prop="plateNumber">
                  <el-input
                    v-model="dialigForm.plateNumber"
                    placeholder="请输入车牌号"
                    size="small"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="客户姓名">
                  <el-input
                    v-model="dialigForm.customerName"
                    size="small"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="客户电话">
                  <el-input
                    v-model="dialigForm.customerPhone"
                    size="small"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item label="业务类型" prop="businessCategoryId">
                  <el-select
                    v-model="dialigForm.businessCategoryId"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in repairBusinessCategoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="进场里程" prop="mileage">
                  <el-input
                    v-model.number="dialigForm.mileage"
                    placeholder="请输入进场里程"
                    size="small"
                  >
                    <template slot="append">km</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="存油量" prop="oilDegree">
                  <ht-select
                    v-model="dialigForm.oilDegree"
                    filterable
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in oilDegreeOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </ht-select>
                </el-form-item>
                <el-form-item label="接待时间" prop="receptionTime">
                  <el-date-picker
                    v-model="dialigForm.receptionTime"
                    type="datetime"
                    placeholder="请选择接待时间"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="送修人" prop="contactsName">
                  <el-input
                    v-model="dialigForm.contactsName"
                    placeholder="请输入送修人名称"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="送修人电话" prop="contactsPhone">
                  <el-input
                    v-model="dialigForm.contactsPhone"
                    placeholder="请输入送修人电话"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="接待顾问" prop="receptionMan">
                  <el-select
                    filterable
                    v-model="dialigForm.receptionMan"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </ht-card>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="savetHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import { listCarFile } from "@/api/repairs"; // 车辆信息
import { baseDictionary } from "@/api/base/base"; // 基础信息
import { transReception } from "@/api/repairs/bookings"; // 转接待
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息

export default {
  name: "addEditAppointmentDialog",
  props: {
    EditObj: {
      type: Object
    },
    abortSubmit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          console.log(this.EditObj);
          setTimeout(() => {
            this.getBaseDictionarys();
            this.getUsers();
            if (this.EditObj.id) {
              this.load();
            }
            this.$refs.form.clearValidate();
          }, 100);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      userOptions: [], // 接待用户
      userLists: {},
      repairBusinessCategoryList: [], // 预约项目类型列表
      businessTypes: {},
      dialigForm: {}, // 弹窗表单
      oilDegreeOptions: [
        {
          id: "空",
          name: "空"
        },
        {
          id: "小于1/4",
          name: "小于1/4"
        },
        {
          id: "1/4",
          name: "1/4"
        },
        {
          id: "1/2",
          name: "1/2"
        },
        {
          id: "3/4",
          name: "3/4"
        },
        {
          id: "满",
          name: "满"
        }
      ],
      rules: {
        plateNumber: [
          {
            required: true,
            message: "车牌号不能为空！"
          }
        ],
        contactsName: [
          {
            required: true,
            message: "请输入送修人姓名！"
          }
        ],
        contactsPhone: [
          {
            required: true,
            message: "请输入送修人电话！"
          }
        ],
        businessCategoryId: [
          {
            required: true,
            message: "请选择业务类型！"
          }
        ],
        mileage: [
          {
            required: true,
            message: "请输入进场里程！"
          },
          {
            type: "number",
            min: 0,
            message: "进场里程必须大于0！",
            trigger: "blur"
          }
        ],
        oilDegree: [
          {
            required: true,
            message: "请选择存油量！"
          }
        ],
        receptionTime: [
          {
            required: true,
            message: "请选择接待时间！"
          }
        ],
        receptionMan: [
          {
            required: true,
            message: "请选择接待顾问！"
          }
        ]
      }
    };
  },
  methods: {
    // 获取基础字典信息
    getBaseDictionarys() {
      baseDictionary({ type: "repairBusinessCategory" }).then(res => {
        this.repairBusinessCategoryList = res.options;
        this.repairBusinessCategoryList.forEach(item => {
          this.businessTypes[item.id] = item.name;
        });
      });
    },
    // 获取用户信息
    getUsers() {
      const params = {
        company: "self",
        roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
      };
      searchTypeStaffs(params).then(res => {
        this.userOptions = res;
        this.userOptions.forEach(item => {
          this.userLists[item.id] = item.name;
        });
      });
    },
    // 关闭弹窗
    cancelHandle() {
      this.$emit("update:visible", false);
      this.resetForm();
      this.$refs.form.clearValidate();
    },
    // 重置信息
    resetForm() {
      this.dialigForm = {};
      this.getBaseDictionarys();
      this.getUsers();
    },
    // 编辑信息
    load() {
      this.dialigForm = {};
      // eslint-disable-next-line prettier/prettier
      const {
        id,
        plateNumber,
        typeId,
        receptionistId,
        mileage,
        oilDegree
      } = this.EditObj;
      this.$set(this.dialigForm, "id", id);
      this.$set(this.dialigForm, "plateNumber", plateNumber);
      this.$set(this.dialigForm, "mileage", mileage);
      this.$set(this.dialigForm, "oilDegree", oilDegree);
      this.$set(this.dialigForm, "businessCategoryId", typeId); // 业务类型
      this.$set(
        this.dialigForm,
        "receptionMan",
        receptionistId ? receptionistId : ""
      ); // 接待顾问
      this.$set(this.dialigForm, "receptionTime", new Date()); // 接待时间
      this.$nextTick(() => {
        listCarFile({
          plateNumber: this.dialigForm.plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          data.map(item => ({ ...item, value: item.plateNumber }));
          this.$set(this.dialigForm, "vehicleId", data[0].id);
          this.$set(this.dialigForm, "customerName", data[0].customerName);
          this.$set(this.dialigForm, "customerPhone", data[0].customerPhone);
          this.$set(this.dialigForm, "contactsName", data[0].customerName);
          this.$set(this.dialigForm, "contactsPhone", data[0].customerPhone);
        });
      }, 100);
    },
    // 提交预约
    savetHandle() {
      this.$refs["form"].validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          if (this.abortSubmit) {
            const receptionManName = this.getReceptionManName(
              this.dialigForm.receptionMan
            );
            this.$emit("sureHandle", {
              ...this.dialigForm,
              receptionManName
            });
            return;
          }
          transReception(this.dialigForm).then(res => {
            this.$message({
              message: "接待成功！",
              type: "success"
            });
            this.$emit("updateList", 2);
            this.$emit("transfer", res);
            this.cancelHandle();
          });
        }
      });
    },
    getReceptionManName(id) {
      const index = this.userOptions.findIndex(item => item.id == id);
      if (index > -1) {
        return this.userOptions[index].name;
      }
      return "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .el-dialog__body {
    background: #e4e7ed;
  }
  .repair-order-content {
    .order-table {
      width: 100%;
      border: 1px solid #eee;
      border-width: 0 1px 1px 0;
      border-radius: 3px;
      td {
        border: 1px solid #eee;
        border-width: 1px 0 0 1px;
        height: 38px;
        padding: 0 10px;
        &:first-child {
          background: #f5f7fa;
          color: #606266;
        }
        &:last-child {
          color: $color-primary;
          @include font_color("color-primary");
        }
      }
      tr {
        &:last-child {
          td {
            height: 157px;
          }
        }
      }
    }
    .dialig-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
  .dialog-footer-align {
    margin-top: 20px;
  }
}
</style>
