<template>
  <el-form
    class="form-label-top"
    size="small"
    label-position="top"
    :model="data"
  >
    <el-form-item>
      <el-checkbox v-model="data.h5">在手机端展示此组件</el-checkbox>
    </el-form-item>
    <el-form-item>
      <span class="input-lable-row">商品区：</span>
      <el-radio-group v-model="data.setting">
        <el-radio
          v-for="(item, index) in settingTypeList"
          :key="index"
          :label="item.value"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item v-show="data.setting === 1">
      <span class="input-lable-row">排布样式：</span>
      <el-radio-group v-model="data.settingStyle">
        <el-radio
          v-for="(item, index) in settingStyles"
          :key="index"
          :label="item.value"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <div v-show="data.setting === 1">
      <el-form-item>
        <el-button
          size="small"
          :disabled="data.areas.length >= 10"
          @click="addArea"
        >
          <i class="icon-Plus"></i>
          新增商品区
        </el-button>
        <div class="input-explain">
          最多可支持创建10个商品区。
        </div>
      </el-form-item>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in data.areas"
          :key="index"
          :name="String(index + 1)"
        >
          <div slot="title" class="collapse-item-title">
            <div>商品区名称：</div>
            <div
              class="input-wrap"
              @click.stop="
                event => {
                  event.stopPropagation();
                }
              "
            >
              <el-input
                v-model.trim="item.name"
                size="small"
                maxlength="8"
              ></el-input>
            </div>
            <div
              class="button"
              @click.stop="sortArea(index, index - 1)"
              v-show="index !== 0"
            >
              上移
            </div>
            <div
              class="button"
              @click.stop="sortArea(index, index + 1)"
              v-show="index < data.areas.length - 1"
            >
              下移
            </div>
            <i class="icon-delete" @click.stop="deleteArea(index)"></i>
          </div>
          <div>
            <!-- <el-form-item label="关联商品：">
              <el-button
                type="primary"
                size="small"
                plain
                @click="showPartsDialog(item.details[0].partIds)"
              >
                关联商品({{ item.details[0].partIds.length }})
              </el-button>
            </el-form-item> -->
            <el-form-item label="商品类型：" class="select-wrap">
              <el-select
                v-model="item.details[0].type"
                @change="() => (item.details[0].partIds = [])"
              >
                <el-option
                  v-for="item in goodsTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <el-button
                type="primary"
                size="small"
                plain
                @click="openDialog(item.details[0])"
              >
                关联商品({{ item.details[0].partIds.length }})
              </el-button>
            </el-form-item>
            <el-form-item label="最多展示数量：">
              <el-input-number
                size="small"
                v-model="item.showNumber"
                :min="1"
                :max="10"
                label="最多展示数量："
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <div class="input-explain">
              *商品首页最多展示10个商品，超过10个的在更多中查看
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <PartsDialog
      :list="partsIdlist"
      @hide="hidePartsDialog"
      v-if="partsVisible"
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
  </el-form>
</template>

<script>
import PartsDialog from '@/components/goods/parts/partsDialog.vue';
import ProjectDialog from '@/components/goods/project/projectDialog.vue';
import PackageDialog from '@/components/goods/package/packageDialog.vue';

export default {
  name: 'ProAreaSetting',
  props: {
    data: Object,
  },
  components: {
    PartsDialog,
    ProjectDialog,
    PackageDialog,
  },
  data() {
    return {
      partsVisible: false,
      partsIdlist: [],
      projectDialogVisible: false,
      projectIdList: [],
      packageDialogVisible: false,
      packageIdList: [],
      activeName: '1',
      settingStyles: [
        {
          name: '纵向',
          value: 0,
        },
        {
          name: '横向',
          value: 1,
        },
      ],
      settingTypeList: [
        {
          name: '全部零配件',
          value: 0,
        },
        {
          name: '全部服务项目',
          value: 2,
        },
        {
          name: '全部套餐',
          value: 3,
        },
        {
          name: '自定义',
          value: 1,
        },
      ],
      goodsTypeList: [
        {
          code: 0,
          name: '零配件',
        },
        {
          code: 2,
          name: '服务项目',
        },
        {
          code: 3,
          name: '套餐',
        },
      ],
    };
  },
  methods: {
    addArea() {
      this.data.areas.push({
        name: '',
        showNumber: 10,
        // type: 0, // 商品区域关联配件类型，0:常规商品；1:组合商品；2:项目；3:套餐
        details: [
          {
            type: 0, // 商品区域关联配件类型，0:常规商品；1:组合商品；2:项目；3:套餐
            partIds: [],
            repairIds: [],
          },
        ],
      });
    },
    deleteArea(index) {
      this.data.areas.splice(index, 1);
    },
    sortArea(index, toIndex) {
      this.data.areas[index] = this.data.areas.splice(
        toIndex,
        1,
        this.data.areas[index],
      )[0];
    },
    // 根据关联类型显示对应弹框
    openDialog(data) {
      switch (data.type) {
        // 零配件
        case 0:
          this.showPartsDialog(data.partIds);
          break;
        // 服务项目
        case 2:
          this.showProjectDialog(data.partIds);
          break;
        // 套餐
        case 3:
          this.showPackageDialog(data.partIds);
          break;
        default:
          break;
      }
    },
    // 关联配件弹框
    showPartsDialog(list) {
      this.partsIdlist = list;
      this.partsVisible = true;
    },
    hidePartsDialog() {
      this.partsIdlist = [];
      this.partsVisible = false;
    },
    // 服务项目弹框
    showProjectDialog(list) {
      this.projectIdList = list;
      this.projectDialogVisible = true;
    },
    hideProjectDialog() {
      this.projectIdList = [];
      this.projectDialogVisible = false;
    },
    // 项目套餐弹框
    showPackageDialog(list) {
      this.packageIdList = list;
      this.packageDialogVisible = true;
    },
    hidePackageDialog() {
      this.packageIdList = [];
      this.packageDialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-collapse {
  border-top: none;
  border-bottom: none;
  .el-collapse-item {
    background-color: @bg-color-base;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 2px;
    .el-collapse-item__header {
      position: relative;
      padding: 0 16px 0 34px;
      border-bottom: none;
      color: @text-color-base;
      font-size: 14px;
      background-color: transparent;
      .el-icon-arrow-right {
        position: absolute;
        left: 16px;
        top: 17px;
        // top: 26px;
        right: auto;
        bottom: auto;
      }
      &.is-active {
        .collapse-item-title {
          color: @text-color-base;
        }
      }
      .collapse-item-title {
        width: 100%;
        display: flex;
        align-items: center;
        .input-wrap {
          flex: 1;
          padding: 16px 0;
        }
        .button {
          margin-left: @margin-size-main;
          line-height: 22px;
          font-size: 14px;
          color: @color-link;
        }
        .icon-delete {
          margin-left: @margin-size-main;
          color: @color-warning;
          font-size: 24px;
        }
      }
    }
    .el-collapse-item__wrap {
      padding: 0 16px;
      border-bottom: none;
      background-color: transparent;
      .el-collapse-item__content {
        padding-bottom: @margin-size-secondary;
        .select-wrap {
          .el-form-item__content {
            display: flex;
            .el-select {
              flex: 1;
              margin-right: @margin-size-secondary;
            }
          }
        }
      }
    }
  }
}
</style>
