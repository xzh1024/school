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
      <span class="input-lable-row">目录类型：</span>
      <el-radio-group v-model="data.setting">
        <el-radio
          v-for="(item, index) in settingTypeList"
          :key="index"
          :label="item.value"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <div v-show="data.setting === 2">
      <el-form-item>
        <el-button
          size="small"
          :disabled="data.areas.length >= 20"
          @click="addArea"
        >
          <i class="icon-Plus"></i>
          新增一级目录
        </el-button>
        <div class="input-explain">
          最多可支持创建20个一级目录，每个一级目录下最多可支持创建50个二级目录；建议二级目录图片尺寸：120px*120px或其倍数。
        </div>
      </el-form-item>

      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in data.areas"
          :key="index"
          :name="String(index + 1)"
        >
          <div slot="title" class="collapse-item-title">
            <div>一级目录名称：</div>
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
          <div class="two-list">
            <div
              class="two"
              v-for="(twoItem, twoIndex) in item.details"
              :key="twoIndex"
            >
              <el-form-item class="two-form-item" label="二级目录名称：">
                <i
                  class="icon-delete"
                  @click.stop="deleteAreaTwo(item.details, twoIndex)"
                ></i>
                <el-input
                  v-model.trim="twoItem.name"
                  clearable
                  maxlength="15"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品类型：" class="select-wrap">
                <el-select
                  v-model="twoItem.type"
                  @change="() => (twoItem.partIds = [])"
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
                  @click="openDialog(twoItem)"
                >
                  关联商品({{ twoItem.partIds.length }})
                </el-button>
              </el-form-item>
              <el-form-item label="上传图片：">
                <ImgSingleUpload
                  :fileUrl.sync="twoItem.picture"
                  :max-size="2"
                />
              </el-form-item>
            </div>
          </div>
          <div class="two-button-wrap">
            <el-button
              size="small"
              :disabled="data.areas.length >= 50"
              @click="addAreaTwo(item)"
            >
              <i class="icon-Plus"></i>
              新增二级目录
            </el-button>
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
import ImgSingleUpload from '@/components/Upload/ImgSingleUpload.vue';
import PartsDialog from '@/components/goods/parts/partsDialog.vue';
import ProjectDialog from '@/components/goods/project/projectDialog.vue';
import PackageDialog from '@/components/goods/package/packageDialog.vue';
import { ProListSettingImg } from '@/constants/imagePath.js';

export default {
  name: 'ProListSetting',
  props: {
    data: Object,
  },
  components: {
    ImgSingleUpload,
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
      settingTypeList: [
        {
          name: '按配件品牌',
          value: 0,
        },
        {
          name: '配件分类',
          value: 1,
        },
        {
          name: '项目分类',
          value: 3,
        },
        {
          name: '自定义',
          value: 2,
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
    // 新增一级目录
    addArea() {
      this.data.areas.push({
        name: '',
        details: [
          {
            picture: ProListSettingImg,
            name: '',
            partIds: [],
          },
        ],
      });
    },
    // 新增二级目录
    addAreaTwo(item) {
      item.details.push({
        picture: ProListSettingImg,
        name: '',
        type: 0, // 关联配件类型，0:常规商品；1:组合商品；2:项目；3:套餐
        partIds: [],
      });
    },
    deleteArea(index) {
      this.data.areas.splice(index, 1);
    },
    // 删除二级目录
    deleteAreaTwo(arr, index) {
      // this.data.areas[index].splice(twoIndex, 1);
      arr.splice(index, 1);
    },
    sortArea(index, toIndex) {
      this.data.areas[index] = this.data.areas.splice(
        toIndex,
        1,
        this.data.areas[index],
      )[0];
    },
    getFileList(files, twoItem) {
      twoItem.pictures = files;
      this.$forceUpdate();
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
.advertising-img {
  width: 100px;
  height: 100px;
}

/deep/ .el-collapse {
  border-top: none;
  border-bottom: none;
  .el-collapse-item {
    border: 1px solid @border-color-base;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 2px;
    .el-collapse-item__header {
      position: relative;
      padding: 0 16px 0 34px;
      color: @text-color-base;
      font-size: 14px;
      .el-icon-arrow-right {
        position: absolute;
        left: 16px;
        top: 17px;
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
          font-size: 24px;
          color: @color-warning;
        }
      }
    }
    .el-collapse-item__wrap {
      padding: 0 16px;
      border-bottom: none;
      .el-collapse-item__content {
        padding-bottom: @margin-size-secondary;
        .two-button-wrap {
          margin-top: @margin-size-secondary;
          text-align: center;
        }
        .two-list {
          .two {
            margin-top: @margin-size-secondary;
            padding: @padding-size-main;
            background-color: @bg-color-base;
            border-radius: 2px;
            &:first-child {
              margin-top: 0;
            }
            .el-form-item {
              &:last-child {
                margin-bottom: 0 !important;
              }
              &.two-form-item {
                position: relative;
                .icon-delete {
                  position: absolute;
                  right: 0;
                  top: -30px;
                  font-size: 24px;
                  color: @color-warning;
                  cursor: pointer;
                }
              }
              &.select-wrap {
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
    }
  }
}
</style>
