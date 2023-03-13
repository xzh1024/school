<template>
  <div class="store-manage" v-loading="load">
    <div class="store-manage-head">
      <el-button size="small" type="primary" @click="handleSave">
        保存并应用
      </el-button>
      <el-button size="small" @click="shareFn">分享页面</el-button>
    </div>
    <div class="store-manage-body">
      <div class="left scrollbar-hide">
        <el-collapse v-model="activeNames">
          <el-collapse-item class="collapse-item" name="1" title="基础组件">
            <BaseElement
              :EventBus="EventBus"
              :iconList="iconList"
              :previewList="previewList"
              @setEditItem="setEditItem"
            ></BaseElement>
          </el-collapse-item>
          <el-collapse-item class="collapse-item" name="2" title="营销组件">
            <BaseElement
              moduleType="marketing"
              :EventBus="EventBus"
              :iconList="iconList"
              :previewList="previewList"
              @setEditItem="setEditItem"
            ></BaseElement>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="content">
        <PreViewElement
          :EventBus="EventBus"
          :previewList="previewList"
          @setEditItem="setEditItem"
        ></PreViewElement>
        <div class="button-group">
          <div>
            <el-button size="small" @click="handlePageSetup">
              页面设置
            </el-button>
          </div>
          <div class="margin-top-16">
            <el-button size="small" @click="handleComponentManage">
              组件管理
            </el-button>
          </div>
        </div>
      </div>
      <div class="right scrollbar-hide">
        <EditElement
          :previewList="previewList"
          :editItem="editItem"
          @updatePreviewList="updatePreviewList"
        ></EditElement>
      </div>
    </div>
    <StoreManageGuide></StoreManageGuide>
    <ShareDialog ref="sharePage" />
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus';
import { StoreManageService } from './services';
const Service = new StoreManageService();
import BaseElement from './components/baseElement.vue';
import PreViewElement from './components/preViewElement.vue';
import EditElement from './components/edit/index.vue';
import StoreManageGuide from './components/guide.vue';
import ShareDialog from './components/shareDialog.vue';
import { BannerSettingImg, ProListSettingImg } from '@/constants/imagePath.js';

export default {
  name: 'StoreManageComponent',
  components: {
    BaseElement,
    PreViewElement,
    EditElement,
    StoreManageGuide,
    ShareDialog,
  },
  data() {
    return {
      EventBus,
      guideState: false,
      load: false,
      userInfo: {},
      activeNames: ['1', '2'],
      moduleDetails: [],
      baseSet: {},
      notEdit: false,
      iconList: [
        {
          moduleType: 'base',
          icon: 'icon-search-basics',
          img: 'preview-search',
          name: '搜索',
          label: '此设置适用于手机端和电脑端',
          component: 'SearchSetting',
          mum: 0,
          maxMum: 1,
          detail: {
            content: [
              {
                content: 'VIN码',
                content1: 'VIN码',
                content2: '请输入17位车架号',
              },
              {
                content: 'OE号',
                content1: 'OE号',
                content2: '请输入5位及以上的件号',
              },
              {
                content: '关键字',
                content1: '关键字',
                content2: '请输入品牌名称等关键字',
              },
              { content: '车型', content1: '车型', content2: '请选择车型' },
            ],
            moduleName: '搜索',
            show: true,
            h5: true,
            pc: true,
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-banner-basics',
          img: 'preview-advertising-2',
          // name: "轮播图",
          name: '广告图片',
          label: '此设置适用于手机端和电脑端',
          component: 'BannerSetting',
          mum: 0,
          maxMum: 50,
          setting: {
            aspectRatios: [
              { name: '小', setting: 2, ratio: '4:1' },
              { name: '中', setting: 0, ratio: '3:1' },
              { name: '大', setting: 1, ratio: '2:1' },
            ],
          },
          detail: {
            moduleName: '广告图片', // 组件名称
            h5: true, // 适用于h5端
            pc: true, // 适用于pc端
            setting: 0, // 0:轮播图组件高度中;1:轮播图组件高度大;2:轮播图组件高度小
            content: [
              // 组件对应的内容，轮播图需传该字段
              {
                // contents: [
                //   // 前端设置
                //   {
                //     name: "",
                //     origin: BannerSettingImg,
                //     url: BannerSettingImg
                //   }
                // ],
                content: BannerSettingImg, // 图片地址
                checkedLink: 0, // 选中的链接,0:内部链接;1:外部链接
                internalLink: {
                  visible: false, // 前端设置
                  // 内部链接,必须要选到最后一级
                  name: '', // 一级路径中文名称
                  code: '', // 一级真实路径名
                  sub: {
                    // 子级
                    name: '', // 二级路径中文名称
                    code: '', // 二级真实路径名
                    skuId: 1, // 关联的商品ID
                    skuName: '', // 关联的商品名称
                  },
                },
                externalLink: 'https://', // 外部链接
              },
            ],
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-directory-basics',
          img: 'preview-catalogue',
          name: '商品目录',
          label: '此设置适用于手机端和电脑端',
          component: 'ProListSetting',
          mum: 0,
          maxMum: 50,
          detail: {
            moduleName: '商品目录',
            show: true,
            h5: true,
            pc: true,
            setting: 0, // # 0:商品目录按配件品牌;1:商品目录按配件类别;2:商品目录自定义;3:商品目录按项目分类
            areas: [
              {
                name: '',
                details: [
                  {
                    picture: ProListSettingImg,
                    name: '',
                    partIds: [],
                    type: 0, // 关联配件类型，0:常规商品；1:组合商品；2:项目；3:套餐
                  },
                ],
              },
            ],
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-prefecture-basics',
          img: 'preview-column',
          name: '商品区',
          label: '此设置适用于手机端和电脑端',
          component: 'ProAreaSetting',
          mum: 0,
          maxMum: 50,
          detail: {
            moduleName: '商品区',
            show: true,
            h5: true,
            pc: true,
            setting: 0, // 商品区定义,0:全部商品;1:自定义
            settingStyle: 0, // 排布样式,0:商品区纵向;1:商品区横向
            areas: [
              {
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
              },
            ],
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-merchant-basics',
          img: 'preview-company-info',
          name: '商家信息',
          label: '此设置适用于手机端和电脑端',
          component: 'CompanySetting',
          mum: 0,
          maxMum: 1,
          detail: {
            moduleName: '商家信息',
            show: true,
            h5: true,
            pc: true,
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-announcement-basics',
          img: 'preview-notice',
          name: '公告',
          label: '此设置适用于手机端和电脑端',
          component: 'AnnouncementSetting',
          mum: 0,
          maxMum: 50,
          detail: {
            content: [
              {
                content: '我的线上店铺开通啦，快来逛逛吧~',
                // content1: "",
                // content2: ""
              },
            ],
            moduleName: '公告',
            show: true,
            h5: true,
            pc: true,
          },
        },
        {
          moduleType: 'base',
          icon: 'icon-quote-basics',
          img: 'preview-inquiry-quote',
          name: '询报价',
          label: '此设置适用于手机端',
          component: 'InquirySetting',
          mum: 0,
          maxMum: 1,
          detail: {
            moduleName: '询报价',
            h5: true,
            pc: false,
          },
        },
        // {
        //   key: "icon-quick not-add",
        //   value: "快捷入口",
        //   label: "此设置适用于手机端和电脑端"
        // },
        // {
        //   key: "icon-vedio not-add",
        //   value: "视频"
        // },
        // {
        //   key: "icon-pics",
        //   value: "图片",
        //   label: "此设置适用于手机端和电脑端",
        //   component: "picsSetting",
        //   detail: {
        //     content: [{ content: "", content1: "", content2: "" }],
        //     moduleName: "图片",
        //     show: true,
        //     h5: true,
        //     pc: true
        //   }
        // },
        {
          moduleType: 'base',
          icon: 'icon-dynamic-basics',
          img: 'preview-real-time-dynamic',
          name: '实时动态',
          label: '此设置适用于手机端',
          component: 'DynamicSetting',
          mum: 0,
          maxMum: 1,
          detail: {
            moduleName: '实时动态',
            h5: true,
            pc: false,
          },
        },
        {
          moduleType: 'marketing',
          icon: 'icon-coupons-basics',
          img: 'preview-coupon',
          name: '优惠券',
          label: '此设置适用于手机端',
          component: 'CouponSetting',
          mum: 0,
          maxMum: 1,
          detail: {
            moduleName: '优惠券',
          },
        },
      ],
      previewList: [],
      editItem: {},
      pageSetupData: {
        component: 'pageSetup',
        name: '页面设置',
        detail: {
          title: '',
          image: '',
        },
      },
      // 组件管理
      componentManageData: {
        component: 'componentManage',
        name: '组件管理',
        detail: {},
      },
    };
  },
  watch: {
    previewList: {
      handler: function(newVal) {
        // 将所有的number重置
        this.iconList.forEach(item => {
          item.mum = 0;
        });
        // 重新统计number
        newVal.forEach(item => {
          // this.moduleList.some(iconItem => {
          this.iconList.some(iconItem => {
            const result = iconItem.component === item.component;
            if (result) {
              iconItem.mum++;
            }
            return result;
          });
        });
      },
    },
  },
  methods: {
    shareFn() {
      this.$refs.sharePage.showDiaolg();
      this.$bus.$emit('getShareInfo');
    },
    // 获取组件列表
    // getModuleList() {
    //   Service.getModuleList()
    //     .then(res => {
    //       console.log(res);
    //       const list = res || [];
    //       // this.moduleList = res || [];
    //       this.pickModuleList(list);
    //       this.getStoreDetail();
    //     })
    //     .catch(() => this.getStoreDetail());
    // },
    // pickModuleList(list) {
    //   const iconList = this.iconList;
    //   list.forEach(model => {
    //     model.mum = 0;
    //     iconList.some(item => {
    //       const result = model.name === item.name;
    //       if (result) {
    //         // model.component = item.component;
    //         // model.icon = item.key;
    //         // model.img = item.img;
    //         if (item.name === "广告图片") {
    //           console.log(JSON.stringify(model.setting, "\t", null));
    //           item.setting = model.setting;
    //         }
    //       }
    //       return result;
    //     });
    //   });
    //   // this.moduleList = list;
    // },
    getStoreDetail() {
      Service.getStoreDetail().then(res => {
        // 页面设置
        this.pageSetupData.detail = res.pageSetting || {};
        sessionStorage.pageSetup = JSON.stringify(this.pageSetupData);

        this.moduleDetails = res.modules || [];
        this.initStoreDetail();
      });
    },
    initStoreDetail() {
      if (this.moduleDetails.length) {
        const previewList = [];
        this.moduleDetails.forEach(detail => {
          // 处理默认图片
          switch (detail.moduleName) {
            case '广告图片': {
              detail.content &&
                detail.content.forEach(item => {
                  if (!item.content) {
                    item.content = BannerSettingImg;
                  }
                });
              break;
            }
            case '商品目录': {
              if (detail.setting === 2) {
                detail.areas &&
                  detail.areas.forEach(area => {
                    area.details &&
                      area.details.forEach(two => {
                        if (!two.picture) {
                          two.picture = ProListSettingImg;
                        }
                      });
                  });
              }
              break;
            }
            default:
              break;
          }
          const findData = this.iconList.find(
            icon => icon.name === detail.moduleName,
          );
          if (findData) {
            const previewItem = {
              icon: findData.icon,
              img: findData.img,
              name: findData.name,
              label: findData.label,
              component: findData.component,
              detail: detail,
              // checked: false
            };
            if (findData.setting) {
              previewItem.setting = findData.setting;
            }
            if (findData.name === '广告图片') {
              previewItem.detail.content.forEach(imgItem => {
                // 内部链接弹出层标记
                imgItem.internalLink.visible = false;
              });
            }
            previewList.push(previewItem);
          }
        });
        sessionStorage.previewList = JSON.stringify(previewList);
        previewList.forEach((item, index) => {
          if (index === 0) {
            item.checked = true;
            this.editItem = item;
          } else {
            item.checked = false;
          }
        });
        this.previewList = previewList;
        // if (this.previewList.length) {
        //   this.previewList[0].checked = true;
        //   this.editItem = this.previewList[0];
        // }

        // this.$forceUpdate();
      }
    },
    // 页面设置
    handlePageSetup() {
      this.editItem = this.pageSetupData;
      this.clearPreviewChecked();
    },
    // 组件管理
    handleComponentManage() {
      this.editItem = this.componentManageData;
      this.clearPreviewChecked();
    },
    // 更新已添加的组件列表
    updatePreviewList(list) {
      this.previewList = list;
    },
    // 保存并应用
    handleSave() {
      const params = {};
      if (this.pageSetupData.detail.title) {
        params.pageSetting = this.pageSetupData.detail;
      } else {
        this.$message.error('请填写页面标题');
        return false;
      }
      const details = this.previewList.map(item => item.detail);
      const modules = [];
      details.forEach(item => {
        if (item.moduleName === '广告图片') {
          const contents = [];
          item.content.forEach(contentItem => {
            // 图片
            if (contentItem.content) {
              contents.push({
                content:
                  contentItem.content === BannerSettingImg
                    ? ''
                    : contentItem.content, // 图片地址
                checkedLink: contentItem.checkedLink, // 选中的链接,0:内部链接;1:外部链接
                internalLink: contentItem.internalLink, // 内部链接
                externalLink: contentItem.externalLink, // 外部链接
              });
            }
          });
          // 判断是否存在有效数据
          if (contents.length) {
            modules.push({
              ...item,
              content: contents,
            });
          }
        } else if (item.moduleName === '商品目录') {
          // 0:商品目录按配件品牌;1:商品目录按配件类别;2:商品目录自定义
          if (item.setting === 2) {
            const areas = [];
            item.areas.forEach(area => {
              // 判断是否设置一级目录名称
              if (area.name) {
                const areaItem = {
                  name: area.name,
                  details: [],
                };
                area.details.forEach(two => {
                  if (two.name || two.partIds.length || two.picture) {
                    areaItem.details.push({
                      ...two,
                      picture:
                        two.picture === ProListSettingImg ? '' : two.picture,
                    });
                  }
                });
                areas.push(areaItem);
              }
            });
            modules.push({
              ...item,
              areas: areas,
            });
            return;
          } else {
            modules.push({
              ...item,
              areas: [],
            });
          }
        } else if (item.moduleName === '商品区') {
          // 商品区定义,0:全部零配件;1:自定义;2:全部服务项目;3:全部套餐
          if (item.setting === 1) {
            const areas = [];
            item.areas.forEach(area => {
              // 判断是否设置目录名称或者关联商品
              if (area.name || area.details[0].partIds.length) {
                areas.push(area);
              }
            });
            modules.push({
              ...item,
              areas: areas,
            });
          } else {
            modules.push({
              ...item,
              areas: [],
            });
          }
        } else {
          modules.push(item);
        }
      });
      params.modules = modules;
      this.load = true;
      Service.updateStore(params)
        .then(() => {
          this.load = false;
          this.$message.success('保存并应用成功！');
          // this.getStoreDetail();
        })
        .catch(() => {
          this.load = false;
        });
    },
    // 设置编辑内容
    setEditItem(data = {}) {
      this.editItem = data;
    },
    clearPreviewChecked() {
      this.previewList.forEach(item => {
        item.checked = false;
      });
    },
  },
  created() {
    // this.getModuleList();
    this.getStoreDetail();
  },
};
</script>

<style lang="less" scoped>
.store-manage {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .store-manage-head {
    padding: 5px 10px;
    background-color: #ffffff;
    text-align: right;
    box-shadow: inset 0px -1px 0px 0px rgba(217, 217, 217, 1);
  }
  .store-manage-body {
    flex: 1;
    width: 100%;
    display: flex;
    overflow: hidden;
    .left {
      width: 184px;
      height: 100%;
      box-sizing: border-box;
      background-color: #ffffff;
      overflow-y: auto;
      /deep/ .el-collapse {
        border-top: none;
        .el-collapse-item {
          .el-collapse-item__header {
            border-bottom: none;
          }
          .el-collapse-item__wrap {
            border-bottom: none;
            .el-collapse-item__content {
              padding-bottom: 0;
            }
          }
          .el-collapse-item__header {
            padding: 0 @margin-size-main;
            font-size: 16px;
            font-weight: @strong;
          }
        }
      }
    }
    .content {
      flex: 1;
      height: 100%;
      position: relative;
      background: @bg-color-base;
      .button-group {
        position: absolute;
        right: 16px;
        top: 54px;
        .margin-top-16 {
          margin-top: 16px;
        }
      }
    }
    .right {
      overflow-y: auto;
      width: 440px;
      height: 100%;
      box-sizing: border-box;
      padding: @margin-size-main;
      background-color: #ffffff;
    }
  }
}
</style>
