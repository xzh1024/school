<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import layoutMain from "@/components/layout/layoutMain.vue";
import SrImgUpload from "@/components/base/SrImgUpload";
import HtCard from "@/components/ht-card";
import BrandDialog from "./components/brandDialog.vue";
import { ServiceFactory } from "@/common/services/ServiceFactory";
import { ServiceType } from "@/common/services/base/serviceType";
import "@/common/services/basicsService";
import { BasicsService } from "@/common/services/basicsService";
const basicsService = ServiceFactory.getService<BasicsService>(
  ServiceType.basicsService
);

@Component({
  name: "Base",
  components: {
    layoutMain,
    "srimg-upload": SrImgUpload,
    HtCard,
    BrandDialog
  }
})
export default class Base extends Vue {
  protected formData = {
    pics: [],
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
    vehBrands: ["五菱", "哈飞", "一汽"],
    areas: []
  };

  getBusFileList(fileList: any) {
    console.log(fileList);
    this.formData.pics = fileList;
  }

  get brandDialog(): BrandDialog {
    return this.$refs.brandDialog as BrandDialog;
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

  public updateVehBrands(list: any) {
    console.log(222);
    this.formData.vehBrands = list;
  }

  public getCompanies() {
    basicsService.getCompanies().then((resp: any) => {
      console.log(resp);
    });
  }

  created() {
    this.getCompanies();
  }

  render() {
    return (
      <layout-main>
        <div slot="main" class="base-component hz-container">
          <div class="ht-header">
            <el-button type="primary" size="mini">
              保存
            </el-button>
          </div>
          <div class="ht-main">
            <el-form
              size="mini"
              label-width="80px"
              class="form-item-small-margin-bottom clearfix"
            >
              <div class="base-left">
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
                      file-list={this.formData.pics}
                      limit={4}
                      max-size={2}
                      class="payment-voucher-img"
                      on-get-file-list="getBusFileList"
                    />
                  </el-form-item>
                  <el-form-item label="商家描述:">
                    <el-input
                      type="textarea"
                      autosize={{ minRows: 4, maxRows: 4 }}
                      placeholder="请输入公司描述"
                      v-model={this.formData.description}
                      maxlength={200}
                      show-word-limit
                    ></el-input>
                  </el-form-item>
                </ht-card>
                <ht-card title="联系方式">
                  <el-form-item label="联系人:" required>
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-row gutter={8}>
                          <el-col span={8}>
                            <el-input
                              v-model={this.formData.contacts}
                              clearable
                              placeholder="联系人姓名"
                            />
                          </el-col>
                          <el-col span={16}>
                            <el-input
                              v-model={this.formData.phone}
                              clearable
                              placeholder="联系人电话"
                            />
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="联系人1:">
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-row gutter={8}>
                          <el-col span={8}>
                            <el-input
                              v-model={this.formData.contacts1}
                              clearable
                              placeholder="联系人姓名"
                            />
                          </el-col>
                          <el-col span={16}>
                            <el-input
                              v-model={this.formData.phone1}
                              clearable
                              placeholder="联系人电话"
                            />
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="联系人2:">
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-row gutter={8}>
                          <el-col span={8}>
                            <el-input
                              v-model={this.formData.contacts2}
                              clearable
                              placeholder="联系人姓名"
                            />
                          </el-col>
                          <el-col span={16}>
                            <el-input
                              v-model={this.formData.phone2}
                              clearable
                              placeholder="联系人电话"
                            />
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="联系人3:">
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-row gutter={8}>
                          <el-col span={8}>
                            <el-input
                              v-model={this.formData.contacts3}
                              clearable
                              placeholder="联系人姓名"
                            />
                          </el-col>
                          <el-col span={16}>
                            <el-input
                              v-model={this.formData.phone3}
                              clearable
                              placeholder="联系人电话"
                            />
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="微信:">
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-input v-model={this.formData.wechat} clearable />
                      </el-col>
                      <el-col span={9} class="font12 text-orange">
                        <div class="text-cut">* 可填多个微信号，用逗号分隔</div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="QQ:">
                    <el-row gutter={8}>
                      <el-col span={14}>
                        <el-input v-model={this.formData.qq} clearable />
                      </el-col>
                    </el-row>
                  </el-form-item>
                </ht-card>
              </div>
              <div class="base-right">
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
                        {this.formData.vehBrands.join("，")}
                        <i
                          class="icon-edit"
                          on-click={this.showBrandDialog}
                        ></i>
                      </div>
                    </div>
                  </ht-card>
                  <ht-card title="发货信息">
                    <el-form-item label="发货地区:">
                      <el-cascader
                        v-model={this.formData.areas}
                        options={this.areaOptions}
                        props={{ multiple: true, checkStrictly: true }}
                        clearable
                      ></el-cascader>
                    </el-form-item>
                  </ht-card>
                </el-row>
              </div>
            </el-form>
          </div>

          <brand-dialog
            ref="brandDialog"
            onUpdateVehBrands={this.updateVehBrands}
          ></brand-dialog>
        </div>
      </layout-main>
    );
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
      .base-left,
      .base-right {
        float: left;
        width: 50%;
        box-sizing: border-box;
      }
      .base-left {
        padding-right: 30px;
      }
      .base-right {
        padding-left: 30px;
      }
    }
  }
  .base-row {
    display: flex;
    .base-label {
      width: 80px;
      height: 28px;
      line-height: 28px;
      text-align: right;
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
  .payment-voucher-img {
    // width: 120px;
    // height: 120px;
    overflow: hidden;
  }
}
</style>
