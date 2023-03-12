<template>
  <ht-dialog
    :title="`${isAdd ? '新增' : '编辑'}${curDictionary && curDictionary.name}`"
    :visible="visible"
    width="350px"
    @close="closeDialog"
  >
    <el-form
      ref="dictionaryForm"
      :model="formData"
      :rules="rules"
      :show-message="false"
      label-width="100px"
      label-position="left"
      size="mini"
      class="form-item-small-margin-bottom"
      style="margin: 10px;"
    >
      <el-form-item
        v-if="dictionaryKey === 'partBrand'"
        :disabled="formData.builtin"
        label="名称"
        prop="name"
      >
        <ht-autocomplete
          v-model="formData.name"
          :fetch-suggestions="autocompletePartBrand"
          :trigger-on-focus="false"
          autofocus
          mnemonic
          highlight-first-item
        />
      </el-form-item>
      <el-form-item v-else label="名称" prop="name">
        <ht-input
          :disabled="formData.builtin"
          v-model="formData.name"
          :trigger-on-focus="false"
        />
      </el-form-item>
      <el-form-item
        v-if="curDictionary && curDictionary.specialName"
        :label="curDictionary && curDictionary.specialName"
        prop="specialValue"
      >
        <ht-percent-input
          v-if="dictionaryKey === 'invoiceType'"
          v-model="formData.specialValue"
        />
        <HtFormatNumber
          v-else-if="dictionaryKey === 'technicianLevel'"
          :min="0"
          :max="10"
          v-model="formData.specialValue"
          :precision-type="'money'"
          size="small"
        />
        <ht-format-number :min="0" v-else v-model="formData.specialValue" />
      </el-form-item>
      <el-form-item label="是否默认" prop="isDefault">
        <el-switch v-model="formData.isDefault" />
      </el-form-item>
      <el-form-item v-if="!formData.builtin" label="备注" prop="remark">
        <ht-input v-model="formData.remark" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :loading="loading"
        type="primary"
        plain
        size="mini"
        @click="confrim"
      >
        确定（F3）
      </el-button>
      <el-button size="mini" type="primary" plain @click="closeDialog">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Form } from "hztl-ui";
import { baseDictionary } from "@/api/base/base";
import { DictionaryItem, dictionaryList } from "@/constants/base";

interface Props {
  visible: boolean;
  editData?: DictionaryItem;
  dictionaryKey: string;
  isAdd: boolean;
}

interface Events {
  onClose(): void;
  onConfrim(data: DictionaryItem): void;
}

const defFormData = {
  name: "",
  specialValue: "",
  isDefault: false
};

@Component
export default class DetailDialog extends tsc.Component<Props, Events> {
  public $refs!: {
    dictionaryForm: Form;
  };
  @Prop() editData!: DictionaryItem;
  @Prop() dictionaryKey!: string;
  @Prop() visible!: boolean;
  @Prop() isAdd!: boolean;

  loading = false;
  formData: DictionaryItem = {
    ...defFormData
  };

  @Watch("visible")
  onVisibleChange(visible: boolean) {
    if (visible) {
      this.formData = this.isAdd ? { ...defFormData } : { ...this.editData };
      this.$nextTick(() => {
        this.dictionaryFormRef?.clearValidate();
      });
    } else {
      this.formData = {
        ...defFormData
      };
    }
  }
  get curDictionary() {
    return dictionaryList.find(item => item.key === this.dictionaryKey);
  }

  get rules() {
    return {
      name: [{ required: true, message: "请输入名称" }],
      specialValue: [
        { required: true, message: `请输入${this.curDictionary?.specialName}` }
      ]
    };
  }
  get dictionaryFormRef(): Form {
    return this.$refs.dictionaryForm;
  }

  async autocompletePartBrand(query: string, cb: Function) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await baseDictionary({
      type: "partBrand",
      keyword: query
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cb(res.options.map((item: any) => ({ ...item, value: item.name })));
  }
  confrim() {
    this.dictionaryFormRef.validate((valid, err) => {
      if (valid) {
        this.$emit("confrim", this.formData);
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }
  closeDialog() {
    this.$emit("close");
  }
}
</script>
<style lang="scss" scoped>
.ht-page-title {
  margin: 10px;
  .title-btn {
    float: right;
  }
}
</style>
