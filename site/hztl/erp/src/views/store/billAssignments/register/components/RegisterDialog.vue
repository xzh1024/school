<template>
  <ht-dialog
    :title="isTitle"
    :visible.sync="visible"
    width="1200px"
    top="7vh"
    class="ht-dialog-box"
    @closed="closed"
  >
    <div class="flex-container">
      <div
        class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding"
      >
        <div class="ht-page-title page-title-divider">
          单据详情
        </div>
        <div class="search-box compact-form">
          <BillPanel
            v-if="billInfo"
            :billEnum="billEnum"
            :billData="billInfo"
            style="height: 390px;"
          ></BillPanel>
        </div>
      </div>
      <div
        class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex"
      >
        <div class="ht-page-title page-title-divider">
          库房人员登记详情
        </div>
        <div class="auto-block">
          <el-form
            ref="form"
            :model="formData"
            label-position="left"
            label-width="80px"
            class="form-item-small-margin-bottom"
          >
            <template v-if="isEnter">
              <el-form-item label="验货备注" v-if="!isAudit">
                <el-input
                  v-model="formData.checkRemark"
                  clearable
                  :disabled="isAdded"
                ></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="入库验货人">
                    <ht-select
                      v-model="formData.checkAssigneeIds"
                      value-key="id"
                      :options="checkOptions"
                      :filter-method="getCheckUsers"
                      filterable
                      placeholder
                      clearable
                      multiple
                      collapse-tags
                      :disabled="isAdded"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="tag-container" :class="{ 'disabled-bg': isAdded }">
                <el-tag
                  v-for="item in checkSet"
                  :key="item.id"
                  closable
                  effect="dark"
                  :disabled="isAdded"
                  @close="deleteCheckTag(item.id)"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </template>

            <el-form-item
              :label="isEnter ? '上架备注' : '拣货备注'"
              v-if="!isAudit"
            >
              <el-input
                v-model="formData.stockRemark"
                clearable
                :disabled="[1, 2].includes(type)"
              ></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="isEnter ? '上架人' : '拣货人'">
                  <ht-select
                    v-model="formData.stockAssigneeIds"
                    value-key="id"
                    :options="stockOptions"
                    :filter-method="getStockUsers"
                    filterable
                    placeholder
                    clearable
                    multiple
                    collapse-tags
                    :disabled="isCheck"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="tag-container" :class="{ 'disabled-bg': isCheck }">
              <el-tag
                v-for="item in stockSet"
                :key="item.id"
                closable
                effect="dark"
                :disabled="isCheck"
                @close="deleteStockTag(item.id)"
              >
                {{ item.name }}
              </el-tag>
            </div>

            <template v-if="!isEnter">
              <el-form-item label="验货备注" v-if="!isAudit">
                <el-input
                  v-model="formData.checkRemark"
                  clearable
                  :disabled="isPick"
                ></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出库验货人">
                    <ht-select
                      v-model="formData.checkAssigneeIds"
                      value-key="id"
                      :filterable="true"
                      :options="checkOptions"
                      :filter-method="getCheckUsers"
                      placeholder
                      clearable
                      multiple
                      collapse-tags
                      :disabled="isPick"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="tag-container" :class="{ 'disabled-bg': isPick }">
                <el-tag
                  v-for="item in checkSet"
                  :key="item.id"
                  :disabled="isPick"
                  closable
                  effect="dark"
                  @close="deleteCheckTag(item.id)"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </template>
            <el-form-item label="审核备注" v-if="isAudit">
              <el-input v-model="formData.auditRemark" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="dialog-footer-align" style="margin: 5px 0;">
      <el-button
        type="primary"
        plain
        class="switch-focus focus-bottun"
        size="mini"
        @click="handleConfirm"
      >
        {{ this.buttonText }}（F3）
      </el-button>
      <el-button type="primary" plain size="mini" @click="hide">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit, Watch } from "vue-property-decorator";
import BillPanel from "@/components/bill-panel/BillPanel.vue";
import SearchMixin from "@/mixins/searchMixin";
import {
  WarehouseBillItem,
  WarehousesUsersModle,
  BillEnumModel,
  PersonModel,
  RegisterRequest,
  RegisterResponse,
  RegisterModel
} from "../interface";
import registerService from "../services/registerService";

const FormData: RegisterModel = {
  type: 0, // 登记类型：0-出库拣货，1-出库验货，2-入库验货，3-入库上架
  checkRemark: "", // 验货备注
  checkAssigneeIds: [], // 验货人ID,NAME数组
  stockRemark: "", // 出库拣货/入库上架备注
  stockAssigneeIds: [], // 出库拣货/入库上架人ID,NAME数组
  auditRemark: "" // 审核确认备注
};

@Component({
  name: "RegisterDialog",
  components: {
    BillPanel
  }
})
export default class RegisterDialog extends Mixins(SearchMixin) {
  @Prop() type!: number;
  @Prop() billInfo!: WarehouseBillItem;
  @Prop() billEnum!: BillEnumModel[];
  public page = 1;
  @Emit() update() {
    return this.page;
  }
  @Watch("type", { immediate: true, deep: true })
  private typeChange(newVal: number) {
    this.formData.type = newVal;
  }

  get isEnter(): boolean {
    return [2, 3, 5].includes(this.type);
  }
  get isAudit(): boolean {
    return [4, 5].includes(this.type);
  }
  get isCheck(): boolean {
    return [1, 2].includes(this.type);
  }
  get isPick(): boolean {
    return this.type === 0;
  }
  get isAdded(): boolean {
    return this.type === 3;
  }
  public buttonText = "完成";
  get isTitle(): string {
    let title = "";
    switch (this.type) {
      case 0:
        title = "拣货登记";
        this.buttonText = "拣货完成";
        break;
      case 1:
        title = "验货登记";
        this.buttonText = "验货完成";
        break;
      case 2:
        title = "验货登记";
        this.buttonText = "验货完成";
        break;
      case 3:
        title = "上架登记";
        this.buttonText = "上架完成";
        break;
      case 4:
        title = "审核确认";
        this.buttonText = "审核通过";
        break;
      case 5:
        title = "审核确认";
        this.buttonText = "审核通过";
        break;
      default:
        title = "";
    }
    return title;
  }

  public checkSet: Set<PersonModel> = new Set();
  @Watch("formData.checkAssigneeIds", { deep: true })
  private onCheckData(val: number[]) {
    const options = this.checkOptions;
    const set = this.checkSet;
    val.forEach((id: number) => {
      options.some((item: PersonModel) => {
        const result = item.id === id;
        if (result) {
          set.add(item);
        }
        return result;
      });
    });

    const newSet: Set<PersonModel> = new Set();
    set.forEach((item: PersonModel) => {
      if (val.includes(item.id)) {
        newSet.add(item);
      }
    });

    this.checkSet = newSet;
  }
  public stockSet: Set<PersonModel> = new Set();
  @Watch("formData.stockAssigneeIds", { deep: true })
  private onStockData(val: number[]) {
    const options = this.stockOptions;
    const set = this.stockSet;
    val.forEach((id: number) => {
      options.some((item: PersonModel) => {
        const result = item.id === id;
        if (result) {
          set.add(item);
        }
        return result;
      });
    });
    const newSet: Set<PersonModel> = new Set();
    set.forEach((item: PersonModel) => {
      if (val.includes(item.id)) {
        newSet.add(item);
      }
    });
    this.stockSet = newSet;
  }

  public visible = false;

  public closed() {
    this.checkSet = new Set();
    this.stockSet = new Set();
    this.formData = JSON.parse(JSON.stringify(FormData));
  }

  public formData: RegisterModel = JSON.parse(JSON.stringify(FormData));

  private getBillRegister() {
    if (!this.billInfo.id) return;
    const params: RegisterRequest = {
      billId: this.billInfo.id,
      billType: this.billInfo.billType
    };
    registerService.getRegisterInfo(params).then((res: RegisterResponse) => {
      this.formData.checkRemark = res.checkRemark || "";
      this.formData.stockRemark = res.stockRemark || "";
      this.formData.auditRemark = res.auditRemark || "";
      const checkAssignees = res.checkAssignees || [];
      const stockAssignees = res.stockAssignees || [];
      this.formData.checkAssigneeIds = checkAssignees.map(
        (item: PersonModel) => item.id
      );
      this.formData.stockAssigneeIds = stockAssignees.map(
        (item: PersonModel) => item.id
      );
    });
  }
  public checkOptions: PersonModel[] = [];
  public stockOptions: PersonModel[] = [];
  private deleteCheckTag(id: number) {
    if (!id) return;
    if (this.isAdded) return;
    const list = this.formData.checkAssigneeIds as number[];
    this.formData.checkAssigneeIds = list.filter((item: number) => {
      return item !== id;
    });
  }
  private deleteStockTag(id: number) {
    if (!id) return;
    if (this.isCheck) return;
    const list = this.formData.stockAssigneeIds as number[];
    this.formData.stockAssigneeIds = list.filter((item: number) => {
      return item !== id;
    });
  }
  private async getCheckUsers(query = "") {
    const { id, warehouseId } = this.billInfo;
    if (!id) return;
    const params: WarehousesUsersModle = {
      name: query,
      warehouseId: warehouseId,
      roleCodes: ["warehousePartManager"]
    };
    const list = (await registerService.getWarehousesUsers(params)) || [];
    this.checkOptions = list;
  }
  private async getStockUsers(query = "") {
    const { id, warehouseId } = this.billInfo;
    if (!id) return;
    const params: WarehousesUsersModle = {
      name: query,
      warehouseId: warehouseId,
      roleCodes: ["warehousePartManager"]
    };
    const list = (await registerService.getWarehousesUsers(params)) || [];
    this.stockOptions = list;
  }

  private messageSuccess(msg: string) {
    this.$message.success(msg);
  }
  private messageError(msg: string) {
    this.$message.error(msg);
  }

  private handleConfirm() {
    const formData = this.formData;
    // 登记类型：0-出库拣货，1-出库验货，2-入库验货，3-入库上架
    const type = this.type;
    const params: RegisterModel = {
      billId: this.billInfo.id,
      type
    };
    let msg = "";
    if (type === 0) {
      if (!formData.stockAssigneeIds?.length) {
        this.messageError("请选择拣货人");
        return false;
      }
      msg = "拣货登记成功";
      params.stockRemark = formData.stockRemark;
      params.stockAssigneeIds = formData.stockAssigneeIds;
      this.storageRegister(params, msg);
    } else if (type === 1) {
      if (!formData.checkAssigneeIds?.length) {
        this.messageError("请选择出库验货人");
        return false;
      }
      msg = "验货登记成功";
      params.checkRemark = formData.checkRemark;
      params.checkAssigneeIds = formData.checkAssigneeIds;
      this.storageRegister(params, msg);
    } else if (type === 2) {
      if (!formData.checkAssigneeIds?.length) {
        this.messageError("请选择入库验货人");
        return false;
      }
      msg = "验货登记成功";
      params.checkRemark = formData.checkRemark;
      params.checkAssigneeIds = formData.checkAssigneeIds;
      this.storageRegister(params, msg);
    } else if (type === 3) {
      if (!formData.stockAssigneeIds?.length) {
        this.messageError("请选择上架人");
        return false;
      }
      msg = "上架登记成功";
      params.stockRemark = formData.stockRemark;
      params.stockAssigneeIds = formData.stockAssigneeIds;
      this.storageRegister(params, msg);
    } else if (type === 4) {
      if (!formData.stockAssigneeIds?.length) {
        this.messageError("请选择拣货人");
        return false;
      }
      if (!formData.checkAssigneeIds?.length) {
        this.messageError("请选择出库验货人");
        return false;
      }
      msg = "审核确认成功";
      params.billType = this.billInfo.billType;
      params.auditRemark = formData.auditRemark;
      params.checkAssigneeIds = formData.checkAssigneeIds;
      params.stockAssigneeIds = formData.stockAssigneeIds;
      this.storageAudit(params, msg);
    } else if (type === 5) {
      if (!formData.checkAssigneeIds?.length) {
        this.messageError("请选择入库验货人");
        return false;
      }
      if (!formData.stockAssigneeIds?.length) {
        this.messageError("请选择上架人");
        return false;
      }
      msg = "审核确认成功";
      params.billType = this.billInfo.billType;
      params.auditRemark = formData.auditRemark;
      params.checkAssigneeIds = formData.checkAssigneeIds;
      params.stockAssigneeIds = formData.stockAssigneeIds;
      this.storageAudit(params, msg);
    }
  }

  public storageRegister(params: RegisterModel, msg = "操作成功") {
    registerService.storageRegister(params).then(() => {
      this.messageSuccess(msg);
      this.page = 1;
      this.update();
      this.hide();
    });
  }

  public storageAudit(params: RegisterModel, msg = "操作成功") {
    registerService.storageAudit(params).then(() => {
      this.messageSuccess(msg);
      this.page = 1;
      this.update();
      this.hide();
    });
  }

  private async getUserOptions() {
    const { id, warehouseId } = this.billInfo;
    if (!id) return;
    const params: WarehousesUsersModle = {
      name: "",
      warehouseId: warehouseId,
      roleCodes: ["warehousePartManager"]
    };
    const list = (await registerService.getWarehousesUsers(params)) || [];
    this.checkOptions = list;
    this.stockOptions = list;
    this.getBillRegister();
  }

  public show() {
    this.visible = true;
    this.getUserOptions();
  }

  public hide() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  height: 90px;
  border: 1px solid #dcdfe6;
  margin-bottom: 3px;
  padding: 0 0 8px 10px;
  border-radius: 4px;
  overflow-y: auto;
  .el-tag {
    margin-right: 10px;
    margin-top: 8px;
  }
}
.disabled-bg {
  background-color: #e7ebed;
  cursor: not-allowed;
}
</style>
