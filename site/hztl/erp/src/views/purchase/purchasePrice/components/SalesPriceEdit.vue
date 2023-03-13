<template>
  <ht-dialog
    v-bind="$attrs"
    title="库存售价调整"
    width="1200px"
    v-on="$listeners"
    @closed="closeHandle"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="70px"
      class="form-item-small-margin-bottom"
      size="mini"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <ht-card title="配件信息" no-padding no-background>
            <el-form-item label="编码" prop="code">
              <span>{{ ruleForm.code }}</span>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <span>{{ ruleForm.name }}</span>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
              <span>{{ ruleForm.brand }}</span>
            </el-form-item>
            <el-form-item label="产地" prop="productionPlace">
              <span>{{ ruleForm.brand }}</span>
            </el-form-item>
            <el-form-item label="性质" prop="property">
              <span>{{ ruleForm.property }}</span>
            </el-form-item>
            <el-form-item label="货主" prop="ownerCompanyName">
              <span>{{ ruleForm.ownerCompanyName }}</span>
            </el-form-item>
            <el-form-item label="供应商" prop="supplierName">
              <span>{{ ruleForm.supplierName }}</span>
            </el-form-item>
            <el-form-item label="批次号" prop="batchNo">
              <span>{{ ruleForm.batchNo }}</span>
            </el-form-item>
          </ht-card>
        </el-col>
        <el-col :span="8">
          <ht-card title="价格调整" no-padding no-background>
            <el-form-item label="零售价" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="平台价" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="调拨价" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="批发价" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="批发价一" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="批发价二" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="批发价三" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
            <el-form-item label="批发价四" prop="price">
              <ht-input v-model="ruleForm.price" />
            </el-form-item>
          </ht-card>
        </el-col>
        <el-col :span="8">
          <ht-card title="更新选项" no-padding no-background>
            <el-checkbox v-model="ruleForm.flag">
              同步更新同件号、品牌、产地、性质的库存价格
            </el-checkbox>
            <div class="check-company-all">
              <span>选择要同步更新的公司</span>
              <el-checkbox v-model="ruleForm.all" class="ml-1">
                全选
              </el-checkbox>
            </div>
            <div style="height: 200px; overflow: auto;">
              <p
                v-for="item in companyList"
                :key="item.id"
                class="company-item"
              >
                <el-checkbox v-model="item.flag" />
                <span>{{ item.name }}</span>
              </p>
            </div>
          </ht-card>
        </el-col>
      </el-row>
      <div style="margin-top: 10px; text-align: center;">
        <el-button type="primary" size="mini" plain @click.stop="sureHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click.stop="hideBox">
          取消（Ecs）
        </el-button>
      </div>
    </el-form>
  </ht-dialog>
</template>

<script>
export default {
  name: "SalesPriceEdit",
  data() {
    return {
      companyList: [],
      ruleForm: {},
      rules: {}
    };
  },
  methods: {
    sureHandle() {
      this.hideBox();
    },
    closeHandle() {},
    hideBox() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
/deep/.el-dialog__body
        padding 0 20px

/deep/.el-card__header
        border none

.check-company-all
    display flex
    justify-content space-between
    padding 10px 0
.company-item
    padding 10px 0
    margin 0
</style>
