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
      <span class="input-lable-row">图片高度：</span>
      <el-radio-group v-model="data.setting">
        <el-radio
          v-for="(item, index) in setting.aspectRatios"
          :key="index"
          :label="item.setting"
          >{{ item.name }}</el-radio
        >
      </el-radio-group>
      <div class="input-explain">
        * 组件宽高比参考比例：
        <span
          v-for="(item, index) in setting.aspectRatios"
          :key="index"
          class="img-type-item"
        >
          {{ item.name + ' ' + item.ratio }}
        </span>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button
        size="small"
        :disabled="data.content.length >= 5"
        @click="addItem"
      >
        <i class="icon-Plus"></i>
        添加图片
      </el-button>
    </el-form-item>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, index) in data.content"
        :key="index"
        :name="String(index + 1)"
      >
        <div slot="title">
          {{ '广告图片-' + (index + 1) }}
          <i class="icon-delete" @click.stop="deleteItem(index)"></i>
        </div>
        <el-form-item label="上传图片：">
          <ImgSingleUpload :fileUrl.sync="item.content" :max-size="2" />
        </el-form-item>
        <div class="radio-item">
          <el-radio v-model="item.checkedLink" :label="0">内部链接</el-radio>
          <br />
          <el-popover
            placement="right"
            width="200"
            trigger="manual"
            v-model="item.internalLink.visible"
          >
            <div class="popover-close">
              <i class="el-icon-error" @click="handlePop(item)"></i>
            </div>
            <el-menu
              class="popover-menu"
              unique-opened
              :default-openeds="defaultOpeneds"
            >
              <el-submenu
                v-for="(page, pageIndex) in pageTree"
                :key="pageIndex"
                :index="String(pageIndex)"
              >
                <template slot="title">{{ page.name }}</template>
                <el-menu-item
                  v-for="(subPage, subPageIndex) in page.subs"
                  :key="subPageIndex"
                  :index="pageIndex + '-' + subPageIndex"
                  @click="handleClick(subPage, page, item)"
                >
                  {{ subPage.name }}
                </el-menu-item>
              </el-submenu>
            </el-menu>
            <div slot="reference" class="link-style" @click="handlePop(item)">
              <template
                v-if="item.internalLink.name && item.internalLink.sub.name"
              >
                <span v-if="item.internalLink.sub.skuId" class="link-tag">
                  {{
                    item.internalLink.name +
                      ' > ' +
                      item.internalLink.sub.name +
                      ' > ' +
                      item.internalLink.sub.skuName
                  }}
                  <i
                    class="el-icon-close"
                    @click.stop="clearInternalLink(item)"
                  ></i>
                </span>
                <span v-else class="link-tag">
                  {{
                    item.internalLink.name + ' > ' + item.internalLink.sub.name
                  }}
                  <i
                    class="el-icon-close"
                    @click.stop="clearInternalLink(item)"
                  ></i>
                </span>
                <span class="link-update">修改</span>
              </template>
              <template v-else>
                选择跳转到的页面
              </template>
              <i class="el-icon-arrow-down"></i>
            </div>
          </el-popover>
        </div>
        <div>
          <el-radio v-model="item.checkedLink" :label="1">外部链接</el-radio>
          <el-form-item>
            <el-input v-model.trim="item.externalLink" clearable></el-input>
          </el-form-item>
        </div>
      </el-collapse-item>
    </el-collapse>

    <PartsSingleDialog
      :now="nowData"
      @hide="hidePartsDialog"
      v-if="partsDialogVisible"
    ></PartsSingleDialog>
    <ProjectSingleDialog
      :now="nowData"
      @hide="hideProjectDialog"
      v-if="projectDialogVisible"
    ></ProjectSingleDialog>
    <PackageSingleDialog
      :now="nowData"
      @hide="hidePackageDialog"
      v-if="packageDialogVisible"
    ></PackageSingleDialog>
  </el-form>
</template>

<script>
import ImgSingleUpload from '@/components/Upload/ImgSingleUpload.vue';
import { BannerSettingImg } from '@/constants/imagePath.js';
import PartsSingleDialog from '@/components/goods/parts/partsSingleDialog.vue';
import ProjectSingleDialog from '@/components/goods/project/projectSingleDialog.vue';
import PackageSingleDialog from '@/components/goods/package/packageSingleDialog.vue';

const defaultGoodsSingleModel = {
  internalLink: {},
  page: {},
  parentPage: {},
};
const defaultInternalLink = {
  // 内部链接,必须要选到最后一级
  name: '', // 一级路径中文名称
  code: '', // 一级真实路径名
  sub: {
    // 子级
    name: '', // 二级路径中文名称
    code: '', // 二级真实路径名
    skuId: 0, // 关联的商品ID
    skuName: '', // 关联的商品名称
  },
};

export default {
  name: 'BannerSetting',
  props: {
    data: Object,
    setting: Object,
  },
  components: {
    ImgSingleUpload,
    PartsSingleDialog,
    ProjectSingleDialog,
    PackageSingleDialog,
  },
  data() {
    return {
      nowData: JSON.parse(JSON.stringify(defaultGoodsSingleModel)),
      activeName: '1',
      defaultOpeneds: ['0'],
      partsDialogVisible: false,
      projectDialogVisible: false,
      packageDialogVisible: false,
      pageTree: [
        // 前端对应页面
        {
          name: '商品', // 页面中文名称
          code: '/', // 页面真实路径名
          subs: [
            // 子页面,subs数组为空时表示没有子页面了
            {
              name: '全部零配件',
              code: '/skuList',
              operate: 0, // 操作(只会存在于返回数据的最后一层),0:不附带任何操作;1:可以关联单个商品
            },
            {
              name: '全部服务项目',
              code: '/goodsProjectList',
              operate: 0,
            },
            {
              name: '全部套餐',
              code: '/skuList',
              operate: 0,
            },
            {
              name: '单个零配件',
              code: '/skuDetail',
              operate: 1,
            },
            {
              name: '单个服务项目',
              code: '/skuDetail',
              operate: 1,
            },
            {
              name: '单个套餐',
              code: '/skuDetail',
              operate: 1,
            },
          ],
        },
      ],
    };
  },
  // created() {
  //   this.getInternalPages();
  // },
  methods: {
    handlePop(item) {
      item.internalLink.visible = !item.internalLink.visible;
      this.$forceUpdate();
    },
    handleClick(page, parentPage, data) {
      // operate：操作(只会存在于返回数据的最后一层),0:不附带任何操作;1:可以关联单个商品
      switch (page.operate) {
        case 0: {
          data.internalLink.name = parentPage.name;
          data.internalLink.code = parentPage.code;
          data.internalLink.sub || (data.internalLink.sub = {});
          // data.internalLink.sub.goodsType = page.goodsType;
          data.internalLink.sub.name = page.name;
          data.internalLink.sub.code = page.code;
          data.internalLink.sub.skuId = 0;
          data.internalLink.sub.skuName = '';
          data.internalLink.visible = false;
          this.$forceUpdate();
          break;
        }
        case 1: {
          this.nowData.page = page;
          this.nowData.parentPage = parentPage;
          this.nowData.internalLink = data.internalLink;
          // 显示对应类型的商品弹框
          switch (page.name) {
            case '单个零配件': {
              this.showPartsDialog();
              break;
            }
            case '单个服务项目': {
              this.showProjectDialog();
              break;
            }
            case '单个套餐': {
              this.showPackageDialog();
              break;
            }
            default:
              break;
          }
          break;
        }
        default:
          break;
      }
    },
    clearInternalLink(data) {
      data.internalLink = JSON.parse(JSON.stringify(defaultInternalLink));
    },
    getFileList(files, item) {
      item.contents = files;
      this.$forceUpdate();
    },
    // getInternalPages() {
    //   Service.getInternalPages({
    //     type: 0
    //   })
    //     .then(res => {
    //       const data = [
    //         // 前端对应页面
    //         {
    //           name: "商品", // 页面中文名称
    //           // code: "100", // 页面真实路径名
    //           subs: [
    //             // 子页面,subs数组为空时表示没有子页面了
    //             {
    //               name: "全部商品",
    //               code: "/skuList",
    //               operate: 0 // 操作(只会存在于返回数据的最后一层),0:不附带任何操作;1:可以关联单个商品
    //             },
    //             {
    //               name: "单个商品",
    //               code: "/skuDetail",
    //               operate: 1 // 操作(只会存在于返回数据的最后一层),0:不附带任何操作;1:可以关联单个商品
    //             }
    //           ]
    //         }
    //       ];
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    addItem() {
      this.data.content.push({
        contents: [
          {
            name: '',
            origin: BannerSettingImg,
            url: BannerSettingImg,
          },
        ],
        content: BannerSettingImg, // 图片地址
        checkedLink: 0,
        internalLink: {
          // 内部链接,必须要选到最后一级
          name: '', // 一级路径中文名称
          code: '', // 一级真实路径名
          sub: {
            // 子级
            name: '', // 二级路径中文名称
            code: '', // 二级真实路径名
            skuId: 1, // 关联的商品ID
          },
        },
        externalLink: 'https://', // 外部链接
      });
    },
    deleteItem(index) {
      this.data.content.splice(index, 1);
    },
    // 重置弹框数据
    resetGoodsSingleData() {
      this.nowData = JSON.parse(JSON.stringify(defaultGoodsSingleModel));
    },
    // 显示关联配件弹框
    showPartsDialog() {
      this.partsDialogVisible = true;
    },
    hidePartsDialog() {
      this.partsDialogVisible = false;
      this.resetGoodsSingleData();
    },
    // 服务项目
    showProjectDialog() {
      this.projectDialogVisible = true;
    },
    hideProjectDialog() {
      this.projectDialogVisible = false;
      this.resetGoodsSingleData();
    },
    // 套餐
    showPackageDialog() {
      this.packageDialogVisible = true;
    },
    hidePackageDialog() {
      this.packageDialogVisible = false;
      this.resetGoodsSingleData();
    },
  },
};
</script>

<style lang="less" scoped>
.img-type-item {
  margin-right: @margin-size-main;
}
.popover-close {
  text-align: right;
  margin-bottom: 8px;
  .el-icon-error {
    font-size: 16px;
    cursor: pointer;
  }
}
.popover-menu {
  border-right: none;
  /deep/ .el-submenu {
    .el-submenu__title {
      height: 40px !important;
      line-height: 40px !important;
    }
    .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}
/deep/ .el-collapse {
  border-top: none;
  border-bottom: none;
  .link-style {
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    color: @color-link;
    cursor: pointer;
    .link-tag {
      display: inline-block;
      font-size: 14px;
      color: @text-color-secondary;
      line-height: 22px;
      padding: 0 @padding-size-secondary;
      background-color: #ffffff;
      border: 1px solid @border-color-base;
      border-radius: 2px;
      .el-icon-close {
        font-size: 10px;
        color: @text-color-secondary;
      }
    }
    .link-update {
      margin-left: @margin-size-main;
    }
    .el-icon-arrow-down {
      margin-left: @margin-size-secondary;
    }
  }
  .el-radio {
    margin-bottom: @margin-size-secondary;
  }
  .radio-item {
    margin-bottom: @margin-size-main;
  }
  .el-collapse-item {
    background-color: @bg-color-base;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 2px;
    .el-collapse-item__header {
      position: relative;
      padding: 0 16px 0 34px;
      background-color: transparent;
      border-bottom: none;
      font-size: 14px;
      .el-icon-arrow-right {
        position: absolute;
        left: 16px;
        top: 17px;
        right: auto;
        bottom: auto;
      }
      .icon-delete {
        position: absolute;
        right: 10px;
        top: 0px;
        color: @color-warning;
        font-size: 24px;
      }
    }
    .el-collapse-item__wrap {
      padding: 0 16px;
      background-color: transparent;
      border-bottom: none;
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }
  }
}
</style>
