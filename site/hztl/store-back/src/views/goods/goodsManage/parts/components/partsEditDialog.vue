<template>
  <el-dialog
    custom-class="parts-edit-dialog"
    title="批量设置-零配件"
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
            label="showRanges"
            >库存展示设置</el-checkbox
          >
          <div class="assist">
            *
            在可订货数量的基础上设置展示给客户看的库存信息，未包含在库存区间内的将展示真实的库存
          </div>
        </div>
        <div class="edit-content">
          <div class="stock-mode" v-if="$store.state.base.erpType !== 2">
            <span class="stock-mode-label">库存展示维度</span>
            <el-radio-group v-model="formData.stockShowMode">
              <el-radio :label="0" class="radio-item">按配件</el-radio>
              <el-radio :label="1" class="radio-item">按配件+库存分组</el-radio>
              <el-radio :label="2" class="radio-item">按配件+仓库</el-radio>
            </el-radio-group>
            <div class="stock-mode-assist">
              * 若按配件+库存分组设置，需要先创建库存分组
              <span
                class="stock-mode-btn"
                @click="$router.push('/goodsManage/stockGroup')"
                >去设置 ></span
              >
            </div>
          </div>
          <div class="inventory-range">
            <div
              class="inventory-item"
              v-for="(item, index) in formData.showRanges"
              :key="index"
            >
              <el-tooltip
                :enterable="false"
                effect="dark"
                content="删除"
                placement="top"
              >
                <i class="el-icon-delete" @click="deleteStockItem(index)"></i>
              </el-tooltip>
              <div class="m-l-8">库存达到</div>
              <el-input
                class="width-120 m-l-8"
                v-model="item.startQty"
                type="number"
                size="small"
                placeholder="-"
                @change="onNumberInput('startQty', item)"
              />
              <div class="m-l-8">至</div>
              <el-input
                class="width-120 m-l-8"
                v-model="item.endQty"
                type="number"
                size="small"
                placeholder="-"
                @change="onNumberInput('endQty', item)"
              />
              <div class="m-l-8">时库存展示为</div>
              <div class="m-l-8 select-wrap">
                <el-select
                  class="select-style"
                  v-model="item.type"
                  size="small"
                >
                  <el-option
                    v-for="(type, index) in stockStatusList"
                    :key="index"
                    :label="type.name"
                    :value="type.code"
                  />
                </el-select>
                <el-input
                  class="append-input"
                  v-model="item.upperLimitQty"
                  v-show="item.type === 5"
                  type="number"
                  size="small"
                  @change="onNumberInput('upperLimitQty', item)"
                />
              </div>
            </div>
            <el-button type="text" size="small" @click="addStockItem"
              >添加库存区间</el-button
            >
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div class="checkbox-wrap">
          <el-checkbox class="checkbox-item" v-model="checkList" label="image"
            >图片</el-checkbox
          >
          <div class="assist">
            * 建议图片尺寸：220*220
          </div>
        </div>
        <div class="edit-content">
          <UploadImage :fileList="imgFileList" :limit="5"></UploadImage>
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
const showRangeModel = {
  startQty: '',
  endQty: '',
  upperLimitQty: '',
  type: 0,
};

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
      type: 0,
      visible: true,
      loading: false,
      checkList: [],
      formData: {
        stockShowMode: 0, // 库存展示维度默认按配件
        showRanges: [JSON.parse(JSON.stringify(showRangeModel))],
      },
      stockStatusList: [
        { code: 0, name: '有货' },
        { code: 1, name: '充足' },
        { code: 2, name: '紧张' },
        { code: 3, name: '缺货' },
        { code: 4, name: '真实库存' },
        { code: 5, name: '设置展示上限' },
      ],
      imgFileList: [],
    };
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    submit() {
      const formData = this.formData;
      const params = {
        type: this.type,
      };
      // 勾选的内容才做更新操作
      const opList = this.checkList;
      params.opList = opList;
      this.checkList.forEach(key => {
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
      console.log(params);
    },
    deleteStockItem(index) {
      this.formData.showRanges.splice(index, 1);
    },
    addStockItem() {
      if (this.formData.showRanges.length >= 50) {
        this.$alert('最多只能添加50条', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        //   先判断前面输入的数据是否有交叉，没有交叉再新增一条
        let isCross = this.checkIsCross();
        if (!isCross) {
          this.formData.showRanges.push(
            JSON.parse(JSON.stringify(showRangeModel)),
          );
        }
      }
    },
    checkIsCross() {
      if (this.formData.showRanges && this.formData.showRanges.length) {
        //循环判断是否有不符合规则的输入数据
        for (let item of this.formData.showRanges) {
          if (!item.startQty && item.startQty != undefined && !item.endQty) {
            this.$alert('库存区间值不能全部为空', '提示', {
              confirmButtonText: '确定',
            });
            return true;
          } else if (Number(item.startQty) >= Number(item.endQty)) {
            this.$alert('库存区间开始值不能大于等于结束值', '提示', {
              confirmButtonText: '确定',
            });
            return true;
          } else if (item.type === 5) {
            if (!item.upperLimitQty) {
              this.$alert('库存显示上限不能为空', '提示', {
                confirmButtonText: '确定',
              });
              return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },
    onNumberInput(type, item) {
      switch (type) {
        case 'startQty':
          if (item.startQty && Number(item.startQty || 0) < 0) {
            item.startQty = 0;
          }
          break;
        case 'endQty':
          if (
            item.endQty &&
            Number(item.endQty || 0) < Number(item.startQty || 0)
          ) {
            item.endQty = item.startQty ? Number(item.startQty) + 1 : 0;
          }
          break;
        case 'upperLimitQty':
          if (
            item.upperLimitQty &&
            Number(item.upperLimitQty || 0) < Number(item.startQty || 0)
          ) {
            item.upperLimitQty = item.startQty || 0;
          }
          if (
            item.upperLimitQty &&
            Number(item.upperLimitQty || 0) > Number(item.endQty)
          ) {
            item.upperLimitQty =
              Number(item.endQty) > 0 ? Number(item.endQty) : 0;
          }
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.parts-edit-dialog {
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
      .stock-mode {
        margin-top: @margin-size-secondary;
        .stock-mode-label {
          margin-right: @margin-size-secondary;
        }
        .stock-mode-assist {
          display: inline-block;
          font-size: 12px;
          color: @text-color-hint;
          .stock-mode-btn {
            color: @color-link;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .inventory-range {
        margin-top: @margin-size-secondary;
        padding: @padding-size-main;
        background: #f5f5f5;
        border-radius: 2px;
        .inventory-item {
          margin-bottom: @margin-size-secondary;
          display: flex;
          align-items: center;
          .width-120 {
            width: 120px;
          }
          .width-224 {
            width: 224px;
          }
          .el-icon-delete {
            font-size: 24px;
            color: @color-warning;
            cursor: pointer;
          }
          .select-wrap {
            width: 224px;
            display: flex;
            align-items: center;
            .select-style {
              flex: 1;
            }
            .append-input {
              width: 90px;
            }
          }
        }
      }
      .upload-image-container {
        margin-top: @margin-size-secondary;
      }
    }
  }
}
</style>
