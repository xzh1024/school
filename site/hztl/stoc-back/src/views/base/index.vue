<template>
  <layout-main>
    <div slot="main" class="base-component hz-container">
      <div class="ht-header">
        <el-button
          type="primary"
          size="mini"
          :disabled="!validate"
          @click="submit"
        >
          保存
        </el-button>
      </div>
      <div class="ht-main">
        <el-form
          size="mini"
          label-width="80px"
          class="form-item-small-margin-bottom clearfix"
        >
          <div class="main-left">
            <ht-card title="商家信息">
              <span
                slot="after-title"
                class="font12 text-grey"
                style="margin-left: 8px"
              >
                *可上传门店门头照、企业名片等，不能大于2MB，参考尺寸
              </span>
              <el-form-item label="商家图片:">
                <srimg-upload
                  :file-list="pics"
                  :limit="4"
                  :max-size="2"
                  @get-file-list="getFileList"
                />
              </el-form-item>
              <el-form-item label="商家描述:">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="请输入公司描述"
                  v-model.trim="formData.description"
                  :maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </ht-card>
            <ht-card title="联系方式">
              <el-form-item label="联系人:" required>
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone = phoneValidate(formData.phone)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人1:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts1"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone1"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone1 = phoneValidate(formData.phone1)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人2:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts2"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone2"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone2 = phoneValidate(formData.phone2)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人3:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts3"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone3"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone3 = phoneValidate(formData.phone3)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="微信:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-input
                      v-model.trim="formData.wechat"
                      clearable
                      :maxlength="100"
                    />
                  </el-col>
                  <el-col :span="9" class="font12 text-orange">
                    <div class="text-cut">* 可填多个微信号，用逗号分隔</div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <srimg-upload
                  :file-list="wechatPics"
                  :limit="4"
                  :max-size="2"
                  @get-file-list="getWechatFileList"
                />
              </el-form-item>
              <el-form-item label="QQ:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-input v-model.trim="formData.qq" clearable />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <srimg-upload
                  :file-list="qqPics"
                  :limit="4"
                  :max-size="2"
                  @get-file-list="getQqFileList"
                />
              </el-form-item>
            </ht-card>
          </div>
          <div class="main-right">
            <el-row>
              <ht-card title="主营内容">
                <span
                  slot="after-title"
                  class="font12 text-orange"
                  style="margin-left: 8px"
                >
                  *维护好主营车型可以通过车型品牌找到您哦
                </span>
                <div class="base-row">
                  <div class="base-label">主营车型:</div>
                  <div class="base-content text-blue">
                    {{ formData.vehBrands.join("，") }}
                    <i class="icon-edit" @click="showBrandDialog"></i>
                  </div>
                </div>
              </ht-card>
              <ht-card title="发货信息">
                <div class="base-row">
                  <div class="base-label">发货地区:</div>
                  <div class="base-content text-blue">
                    {{ formData.areas.join("，") }}
                    <i class="icon-edit" @click="showAreaDialog"></i>
                  </div>
                </div>
                <!-- <el-form-item label="发货地区:"> -->
                <!-- <el-cascader
                    v-model="formData.areas"
                    :options="areaOptions"
                    :props="{ multiple: true, checkStrictly: true }"
                    clearable
                    @change="getCheckedNodes"
                  ></el-cascader> -->
                <!-- <el-cascader
                    v-model="areas"
                    :props="areaProps"
                    @change="changeAreas"
                  ></el-cascader> -->
                <!-- </el-form-item> -->
              </ht-card>
            </el-row>
          </div>
        </el-form>
      </div>

      <brand-dialog
        ref="brandDialog"
        @updateVehBrands="updateVehBrands"
      ></brand-dialog>
      <area-dialog ref="areaDialog"></area-dialog>
    </div>
  </layout-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import layoutMain from "@/components/layout/layoutMain.vue";
import SrImgUpload from "@/components/base/SrImgUpload";
import HtCard from "@/components/ht-card";
import BrandDialog from "./components/brandDialog.vue";
import AreaDialog from "./components/areaDialog.vue";
import { ServiceFactory } from "@/common/services/ServiceFactory";
import { ServiceType } from "@/common/services/base/serviceType";
import "@/common/services/basicsService";
import { BasicsService } from "@/common/services/basicsService";
const basicsService = ServiceFactory.getService<BasicsService>(
  ServiceType.basicsService
);
import {
  BaseFormParams,
  FileModel,
  AreaItemModel
} from "@/common/interface/baseInterface";

@Component({
  name: "Base",
  components: {
    layoutMain,
    "srimg-upload": SrImgUpload,
    HtCard,
    BrandDialog,
    AreaDialog
  }
})
export default class Base extends Vue {
  protected formData: BaseFormParams = {
    description: "",
    contacts: "",
    contacts1: "",
    contacts2: "",
    contacts3: "",
    phone: "",
    phone1: "",
    phone2: "",
    phone3: "",
    wechat: "",
    qq: "",
    vehBrands: [],
    areas: []
  };

  protected areas = [];

  public areaProps = {
    clearable: true,
    multiple: true,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node: any, resolve: any) {
      const { level } = node;
      console.log(node);
      if (level === 0) {
        basicsService.getProvinces().then((resp: AreaItemModel[]) => {
          console.log(resp);
          const nodes = resp.map((item: AreaItemModel) => {
            return {
              value: item.id,
              label: item.name,
              leaf: level >= 2
            };
          });
          resolve(nodes);
        });
      } else if (level === 1) {
        basicsService.getCities(node.value).then((resp: AreaItemModel[]) => {
          console.log(resp);
          const nodes = resp.map((item: AreaItemModel) => {
            return {
              value: item.id,
              label: item.name,
              leaf: level >= 2
            };
          });
          resolve(nodes);
        });
      } else if (level === 2) {
        basicsService.getCounties(node.value).then((resp: AreaItemModel[]) => {
          console.log(resp);
          const nodes = resp.map((item: AreaItemModel) => {
            return {
              value: item.id,
              label: item.name,
              leaf: true
            };
          });
          resolve(nodes);
        });
      } else {
        resolve();
      }
    }
  };

  get validate() {
    const formData = this.formData;
    return formData.contacts && formData.phone;
  }

  protected pics: FileModel[] = [];
  protected wechatPics: FileModel[] = [];
  protected qqPics: FileModel[] = [];

  protected getFileList(fileList: FileModel[]) {
    console.log(fileList);
    this.pics = fileList;
  }
  protected getWechatFileList(fileList: FileModel[]) {
    console.log(fileList);
    this.wechatPics = fileList;
  }
  protected getQqFileList(fileList: FileModel[]) {
    console.log(fileList);
    this.qqPics = fileList;
  }

  get brandDialog(): BrandDialog {
    return this.$refs.brandDialog as BrandDialog;
  }
  get areaDialog(): AreaDialog {
    return this.$refs.areaDialog as AreaDialog;
  }

  private areaOptions = [
    {
      value: "zhinan",
      label: "指南",
      children: [
        {
          value: "shejiyuanze",
          label: "设计原则",
          children: [
            {
              value: "yizhi",
              label: "一致"
            },
            {
              value: "fankui",
              label: "反馈"
            },
            {
              value: "xiaolv",
              label: "效率"
            },
            {
              value: "kekong",
              label: "可控"
            }
          ]
        },
        {
          value: "daohang",
          label: "导航",
          children: [
            {
              value: "cexiangdaohang",
              label: "侧向导航"
            },
            {
              value: "dingbudaohang",
              label: "顶部导航"
            }
          ]
        }
      ]
    },
    {
      value: "zujian",
      label: "组件",
      children: [
        {
          value: "basic",
          label: "Basic",
          children: [
            {
              value: "layout",
              label: "Layout 布局"
            },
            {
              value: "color",
              label: "Color 色彩"
            },
            {
              value: "typography",
              label: "Typography 字体"
            },
            {
              value: "icon",
              label: "Icon 图标"
            },
            {
              value: "button",
              label: "Button 按钮"
            }
          ]
        },
        {
          value: "form",
          label: "Form",
          children: [
            {
              value: "radio",
              label: "Radio 单选框"
            },
            {
              value: "checkbox",
              label: "Checkbox 多选框"
            },
            {
              value: "input",
              label: "Input 输入框"
            },
            {
              value: "input-number",
              label: "InputNumber 计数器"
            },
            {
              value: "select",
              label: "Select 选择器"
            },
            {
              value: "cascader",
              label: "Cascader 级联选择器"
            },
            {
              value: "switch",
              label: "Switch 开关"
            },
            {
              value: "slider",
              label: "Slider 滑块"
            },
            {
              value: "time-picker",
              label: "TimePicker 时间选择器"
            },
            {
              value: "date-picker",
              label: "DatePicker 日期选择器"
            },
            {
              value: "datetime-picker",
              label: "DateTimePicker 日期时间选择器"
            },
            {
              value: "upload",
              label: "Upload 上传"
            },
            {
              value: "rate",
              label: "Rate 评分"
            },
            {
              value: "form",
              label: "Form 表单"
            }
          ]
        },
        {
          value: "data",
          label: "Data",
          children: [
            {
              value: "table",
              label: "Table 表格"
            },
            {
              value: "tag",
              label: "Tag 标签"
            },
            {
              value: "progress",
              label: "Progress 进度条"
            },
            {
              value: "tree",
              label: "Tree 树形控件"
            },
            {
              value: "pagination",
              label: "Pagination 分页"
            },
            {
              value: "badge",
              label: "Badge 标记"
            }
          ]
        },
        {
          value: "notice",
          label: "Notice",
          children: [
            {
              value: "alert",
              label: "Alert 警告"
            },
            {
              value: "loading",
              label: "Loading 加载"
            },
            {
              value: "message",
              label: "Message 消息提示"
            },
            {
              value: "message-box",
              label: "MessageBox 弹框"
            },
            {
              value: "notification",
              label: "Notification 通知"
            }
          ]
        },
        {
          value: "navigation",
          label: "Navigation",
          children: [
            {
              value: "menu",
              label: "NavMenu 导航菜单"
            },
            {
              value: "tabs",
              label: "Tabs 标签页"
            },
            {
              value: "breadcrumb",
              label: "Breadcrumb 面包屑"
            },
            {
              value: "dropdown",
              label: "Dropdown 下拉菜单"
            },
            {
              value: "steps",
              label: "Steps 步骤条"
            }
          ]
        },
        {
          value: "others",
          label: "Others",
          children: [
            {
              value: "dialog",
              label: "Dialog 对话框"
            },
            {
              value: "tooltip",
              label: "Tooltip 文字提示"
            },
            {
              value: "popover",
              label: "Popover 弹出框"
            },
            {
              value: "card",
              label: "Card 卡片"
            },
            {
              value: "carousel",
              label: "Carousel 走马灯"
            },
            {
              value: "collapse",
              label: "Collapse 折叠面板"
            }
          ]
        }
      ]
    },
    {
      value: "ziyuan",
      label: "资源",
      children: [
        {
          value: "axure",
          label: "Axure Components"
        },
        {
          value: "sketch",
          label: "Sketch Templates"
        },
        {
          value: "jiaohu",
          label: "组件交互文档"
        }
      ]
    }
  ];

  public showBrandDialog() {
    this.brandDialog.show(this.formData.vehBrands as string[]);
  }
  public showAreaDialog() {
    this.areaDialog.show();
  }

  public updateVehBrands(list: string[]) {
    this.formData.vehBrands = list;
  }

  protected getCompanies() {
    basicsService.getCompanies().then((resp: BaseFormParams) => {
      console.log(resp);
      if (resp) {
        const pics = resp.pics || [];
        this.pics = pics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        const wechatPics = resp.wechatPics || [];
        this.wechatPics = wechatPics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        const qqPics = resp.qqPics || [];
        this.qqPics = qqPics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        resp.vehBrands = resp.vehBrands || [];
        resp.areas = resp.areas || [];
        Object.assign(this.formData, resp);
      }
    });
  }

  protected submit() {
    const formData = this.formData;
    const params = {
      ...formData,
      pics: this.pics.map(item => item.origin),
      wechatPics: this.wechatPics.map(item => item.origin),
      qqPics: this.qqPics.map(item => item.origin),
      areas: this.areas.map((item: any[]) => {
        const area = {
          type: "",
          id: 0,
          name: ""
        };
        const len = item.length;
        if (len === 1) {
          area.type = "Province";
        } else if (len === 2) {
          area.type = "City";
        }
        return {};
      })
    };
    basicsService.updateCompanies(params).then((resp: any) => {
      console.log(resp);
      this.$message.success("保存成功");
      this.getCompanies();
    });
  }

  changeAreas(val: any) {
    console.log(val);
  }

  public phoneValidate(value: string) {
    value = value.replace(/[^\d]/g, "");
    value = value.replace(/^(0|2|3|4|5|6|7|8|9)/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    return value;
  }

  created() {
    this.getCompanies();
  }
}
</script>

<style lang="scss" scoped>
.base-component {
  .ht-header {
    margin-bottom: 2px;
  }
  .ht-main {
    .el-form {
      .main-left,
      .main-right {
        float: left;
        width: 50%;
        box-sizing: border-box;
      }
      .main-left {
        padding-right: 30px;
      }
      .main-right {
        padding-left: 30px;
      }
    }
  }
  .base-row {
    display: flex;
    .base-label {
      width: 80px;
      height: 28px;
      box-sizing: border-box;
      padding-right: 4px;
      line-height: 28px;
      text-align: right;
      color: #606266;
    }
    .base-content {
      flex: 1;
      padding-left: 6px;
      line-height: 28px;
      .icon-edit {
        margin-left: 8px;
        transform: translatey(4px);
      }
    }
  }
  .input-content {
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .icon-edit {
      margin-left: 8px;
    }
  }
}
</style>
