<script lang="tsx">
import { Component, Mixins, Model, Prop } from "vue-property-decorator";
import { CompanyInterface, ContactInterface } from "@/constants/base";
import searchMixin from "@/mixins/searchMixin";
import {
  checkSelectCooperators,
  updateSelectCooperators
} from "@/api/communion/communion";

import eventBus from "@/event";
import { KeyStatusEmun } from "@/constants/interface";

const TypeEmun: KeyStatusEmun = {
  supplier: "供应商",
  customer: "客户",
  logistics: "物流公司"
};

// 根据 code和perm定义，code 1-4，perm为boolean
enum TitleEnum {
  "往来单位不存在提示" = 1,
  "往来单位无权提示",
  "往来单位停用提示",
  "往来单位类型不符提示"
}

enum ContentEnum {
  "当前输入的往来单位名称不存在！" = 1,
  "当前输入的往来单位名称已经存在于账套中，但当前公司无权使用!",
  "当前输入的往来单位名称已经存在于账套中，但为停用状态!",
  "当前输入的往来单位名称已经存在于账套中，但类型不包含($alternative)！"
}

enum SubContentEnum {
  "是否新增？" = 11,
  "请联系管理员添加往来单位后重试。" = 10,
  "是否为本店设置使用权限？" = 21,
  "请联系管理员修改往来单位权限后重新开单。" = 20,
  "是否启用？" = 31,
  "请联系管理员启用往来单位权限后重新开单。" = 30,
  "是否为该单位添加（$alternative）类型？" = 41,
  "请联系管理员修改往来单位类型后再试。" = 40
}

@Component
export default class CooperatorsSelectComponent extends Mixins(searchMixin) {
  @Model("change") readonly value!: number | null;
  @Prop(Boolean) readonly allowCreate!: boolean;
  @Prop() readonly noDataTips!: string;
  @Prop({ required: true }) readonly type!: string;
  @Prop(Boolean) readonly showTips?: boolean;
  @Prop() readonly contactInfo?: ContactInterface;

  private readonly componentId = Symbol("CooperatorsSelect");

  private get noMatchText() {
    return this.allowCreate ? this.noDataTips : "没有匹配到数据";
  }

  private fetchSuggestions(query: string) {
    return this.searchLoadCooperators(this.type, query);
  }

  private msgCanCancel = true;
  private tipsTitle = "";
  private tipsContent = "";
  private subTipsContent = "";

  private async valueCheck(val: number) {
    const res = await checkSelectCooperators(val, { type: this.type });
    const combination = res.code * 10 + Number(res.perm);
    this.tipsTitle = TitleEnum[res.code];
    const tipsContent = ContentEnum[combination] || ContentEnum[res.code];
    const subTipsContent =
      SubContentEnum[combination] || SubContentEnum[res.code];
    this.tipsContent = tipsContent?.replace(
      "$alternative",
      TypeEmun[this.type]
    );
    this.subTipsContent = subTipsContent?.replace(
      "$alternative",
      TypeEmun[this.type]
    );
    this.msgCanCancel = res.perm;
    return res.code;
  }

  private async valueChangeHandle(val: number) {
    if (val) {
      const code = await this.valueCheck(val);
      if (code) {
        await this.showMsgDialog(code)
          .then(() => {
            return this.changeCooperatorsState(val, code);
          })
          .then(() => {
            return this.valueChangeHandle(val);
          })
          .catch(() => {});
      } else {
        this.$emit("change", val);
      }
    } else {
      this.$emit("change", val);
    }
  }

  private handleEnter(val: number | null, intputVal: string) {
    if (intputVal && this.allowCreate) {
      this.valueCheck(0).then(code => {
        // 回车校验只处理
        if (code === 1) {
          this.showMsgDialog(code, intputVal);
        }
      });
    } else {
      this.$emit("intput-enter", intputVal);
    }
  }

  private messageNode() {
    return (
      <div>
        <span>{this.tipsContent}</span>
        <p style="padding: 0; margin: 0;">{this.subTipsContent}</p>
      </div>
    );
  }

  private showMsgDialog(code: number, val?: string) {
    return this.$msgbox({
      title: this.tipsTitle,
      message: this.messageNode(),
      showCancelButton: this.msgCanCancel
    }).then(() => {
      if (this.allowCreate && code === 1) {
        eventBus.$emit("showQuickCreateCooperator", {
          type: this.type,
          name: val,
          componentId: this.componentId
        });
      }
    });
  }

  private async changeCooperatorsState(id: number, code: number) {
    return await updateSelectCooperators(id, { type: this.type, code });
  }

  private afetCreateCooperator(cooperatorInfo: {
    componentId: symbol;
    cooperatorName: string;
    cooperatorId: number;
  }) {
    if (this.componentId === cooperatorInfo.componentId) {
      this.$emit("update:defaultValue", cooperatorInfo.cooperatorName);
      this.$emit("change", cooperatorInfo.cooperatorId);
    }
  }

  mounted() {
    eventBus.$on("createCooperatorSuccess", this.afetCreateCooperator);
  }

  destroyed() {
    eventBus.$off("createCooperatorSuccess", this.afetCreateCooperator);
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { change, ...passListeners } = this.$listeners;

    return (
      <div class="container">
        <ht-autoselect
          value={this.value}
          no-match-text={this.noMatchText}
          trigger-on-focus={false}
          highlight-first-item
          remote
          filter-zero
          fetch-suggestions={this.fetchSuggestions}
          on-no-match-enter={this.handleEnter}
          on-change={this.valueChangeHandle}
          attrs={this.$attrs}
          on={passListeners}
          popper-width={360}
          scopedSlots={{
            default: ({ item }: { item: CompanyInterface }) => {
              return (
                <div class="cooperator-info">
                  <div class="cooperator-name">{item.name}</div>
                  <div class="cooperator-detail">
                    <div class="half-info">
                      <i class="icon cooperator-icon cooperator-no-icon"></i>
                      <span class="label">单位编码：</span>
                      <span>{item.number}</span>
                    </div>
                    <div class="half-info">
                      <i class="icon cooperator-icon cooperator-man-icon"></i>
                      <span class="label">主联系人：</span>
                      <span>{item.contact}</span>
                    </div>
                    <div>
                      <i class="icon cooperator-icon cooperator-phone-icon"></i>
                      <span class="label">联系电话：</span>
                      <span>
                        {[item.contactPhoneNo, item.phone]
                          .filter(item => item)
                          .join("，")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          }}
          style="flex: auto;"
        />
        {this.showTips ? (
          <el-popover placement="right" width="280" trigger="hover">
            <div slot="reference" class="el-icon-info contact-tips-container" />
            <div style="margin: 0; padding: 0;">
              <div class="contact-item-container">
                <div class="contact-item-title">联系人</div>
                <div>：</div>
                <div>{this.contactInfo?.contactName}</div>
              </div>
              <div class="contact-item-container">
                <div class="contact-item-title">电话</div>
                <div>：</div>
                <div>{this.contactInfo?.contactPhone}</div>
              </div>
              <div class="contact-item-container">
                <div class="contact-item-title">归属集团</div>
                <div>：</div>
                <div>{this.contactInfo?.groupName}</div>
              </div>
            </div>
          </el-popover>
        ) : null}
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.container {
  display: contents;
}
.cooperator-info {
  margin: 5px 0;
  .cooperator-name {
    line-height: 18px;
  }
}
.cooperator-detail {
  font-size: 12px;
  line-height: 16px;

  .cooperator-icon {
    vertical-align: text-top;
    margin-right: 5px;
  }

  span {
    vertical-align: bottom;
    &.label {
      color: $color-text-secondary;
    }
  }

  .half-info {
    width: 50%;
    display: inline-block;
  }
}
.contact-tips-container {
  color: #3aa7ff;
  font-size: 18px;
  line-height: 28px;
  margin-left: 4px;
}
.contact-item-container {
  display: flex;
  align-items: center;

  .contact-item-title {
    width: 60px;
    flex: none;
  }
}
</style>
