<template>
  <el-dialog
    custom-class="package-edit-dialog"
    title="批量设置-套餐"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="906px"
    @close="close"
  >
    <div>
      <div class="edit-hint">勾选下列要批量设置的项</div>
      <div class="edit-item">
        <div class="checkbox-wrap">
          <el-checkbox
            class="checkbox-item"
            v-model="checkList"
            label="notOnlineSale"
          >
            是否允许线上售卖
          </el-checkbox>
          <el-radio-group v-model="formData.notOnlineSale">
            <el-radio class="radio-item" :label="false">是</el-radio>
            <el-radio class="radio-item" :label="true">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="edit-item">
        <div class="checkbox-wrap">
          <el-checkbox class="checkbox-item" v-model="checkList" label="images">
            图片
          </el-checkbox>
          <div class="assist">
            * 建议图片尺寸：220*220
          </div>
        </div>
        <div class="edit-content">
          <UploadImage :fileList="formData.images" :limit="5"></UploadImage>
        </div>
      </div>
    </div>
    <template slot="footer">
      <el-button size="small" @click="close">取消</el-button>
      <el-button
        size="small"
        type="primary"
        :disabled="!checkList.length"
        @click="submit"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import UploadImage from '../../components/uploadImage.vue';
import { batchUpdateGoods } from '@/api/goods';

export default {
  components: {
    UploadImage,
  },
  props: {
    batchEditParam: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      type: 2, // 批量修改的商品类型 1-服务 2-套餐
      visible: true,
      loading: false,
      checkList: [],
      formData: {
        notOnlineSale: false, // 是否不线上售卖 false-线上售卖 true-不线上售卖
        images: [],
      },
      stockStatusList: [
        { code: 0, name: '有货' },
        { code: 1, name: '充足' },
        { code: 2, name: '紧张' },
        { code: 3, name: '缺货' },
        { code: 4, name: '真实库存' },
        { code: 5, name: '设置展示上限' },
      ],
    };
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    // 提交
    submit() {
      const formData = this.formData;
      const params = {
        type: this.type,
      };
      // 勾选的内容才做更新操作
      const opList = this.checkList;
      params.opList = opList;
      opList.forEach(key => {
        params[key] = formData[key];
      });
      if (params.images) {
        params.images = params.images.map(item => item.saveUrl);
      }
      const batchEditParam = this.batchEditParam;
      switch (batchEditParam.type) {
        // 按查询结果
        case 'searchResult': {
          params.searchCond = batchEditParam.searchCond;
          break;
        }
        // 按选择
        case 'selection': {
          params.swIds = batchEditParam.ids;
          break;
        }
        default:
          break;
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      batchUpdateGoods(params)
        .then(() => {
          loading.close();
          this.$message.success('批量更新成功！');
          this.$emit('update');
          this.close();
        })
        .catch(err => {
          loading.close();
          if (err && err.message) {
            this.$message.error(err.message);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.package-edit-dialog {
  .radio-item {
    margin-right: @margin-size-main;
    /deep/ .el-radio__label {
      font-weight: 400;
    }
  }
  .edit-hint {
    color: @color-warning;
  }
  .edit-item {
    margin-top: @margin-size-main;
    .checkbox-wrap {
      line-height: 20px;
      .checkbox-item {
        margin-right: @margin-size-secondary;
        /deep/ .el-checkbox__label {
          font-weight: 400;
        }
      }
      .assist {
        display: inline-block;
        font-size: 12px;
        color: @text-color-hint;
      }
    }
    .edit-content {
      padding-left: 23px;
      .upload-image-container {
        margin-top: @margin-size-secondary;
      }
    }
  }
}
</style>
