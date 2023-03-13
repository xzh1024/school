<script>
import HtInput from "hztl-ui/packages/input";
import HtInputNumber from "hztl-ui/packages/input-number";
import HtBase64Img from "hztl-ui/packages/base64-img";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import { printLogoKey, logoTypes } from "./constants";

const tabs = [
    { id: "global", name: "模版设置" },
    { id: "local", name: "字段设置" }
];

export default {
    data() {
        return {
            activeName: "global"
        };
    },
    computed: {
        ...mapState("invoice", [
            "name",
            "invoiceGlobal",
            "curEditField",
            "invoiceLogo"
        ]),
        ...mapGetters("invoice", [
            "altDetalisFiles",
            "altTableFiles",
            "curEdit"
        ]),
        curEditKey() {
            return this.curEditField.curEditKey
        },
        disInvoiceName: {
            get() {
                return this.name;
            },
            set(value) {
                this.changeInvoiceName(value.replace(/ /g, ""));
            }
        },
        logoType: {
            get() {
                return this.invoiceLogo.logoType;
            },
            set(value) {
                this.changeLogoType(value);
            }
        },
        logoCustomUrl: {
            get() {
                return this.invoiceLogo.customUrl
            },
            set(value) {
                this.changeCustomLogoUrl(value);
            }
        }
    },
    watch: {
        curEditKey: {
            handler(value) {
                value && (this.activeName = tabs[1].id);
            }
        }
    },
    methods: {
        ...mapMutations("invoice", [
            "changeInvoiceName",
            "changeGloBalSetting",
            "changeLogoType",
            "changeCustomLogoUrl"
        ]),
        ...mapActions("invoice", ["changeCurSetting"])
    },
    render() {
        return (
            <div class="ht-tem-setting">
                <ht-tabs v-model={this.activeName} tabs={tabs} />
                {this.activeName === tabs[0].id && (
                    <div>
                        <div class="block-box">
                            <div class="page-title">模版名称</div>
                            <HtInput
                                class="form-value"
                                size="mini"
                                v-model={this.disInvoiceName}
                            />
                        </div>
                        <div class="block-box">
                            <div>全局字号</div>
                            <HtInputNumber
                                size="mini"
                                placeholder="为空则采用默认字号"
                                min={12}
                                step={1}
                                max={200}
                                step-strictly
                                value={this.invoiceGlobal.fontSize}
                                on-change={value =>
                                    this.changeGloBalSetting({
                                        fontSize: value
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
                {this.activeName === tabs[1].id &&
                    (this.curEdit ? (
                        <div>
                            <div class="block-box">
                                <div>当前字号</div>
                                <HtInputNumber
                                    size="mini"
                                    placeholder="为空则采用全局字号"
                                    min={12}
                                    max={200}
                                    step={1}
                                    step-strictly
                                    value={this.curEdit.fontSize}
                                    on-change={value =>
                                        this.changeCurSetting({
                                            fontSize: value
                                        })
                                    }
                                />
                            </div>

                            <div class="block-box">
                                <div>格式</div>
                                <div class="flex-container style-icon-group">
                                    <div
                                        class={`style-icon-box${
                                            this.curEdit.isBold ? " active" : ""
                                        }`}
                                        on-click={() =>
                                            this.changeCurSetting({
                                                isBold: !this.curEdit.isBold
                                            })
                                        }
                                    >
                                        <svg viewBox="0 0 18 18">
                                            <path
                                                class="ql-stroke"
                                                d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                                            ></path>
                                            <path
                                                class="ql-stroke"
                                                d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div
                                        class={`style-icon-box${
                                            this.curEdit.isOblique
                                                ? " active"
                                                : ""
                                        }`}
                                        on-click={() =>
                                            this.changeCurSetting({
                                                isOblique: !this.curEdit
                                                    .isOblique
                                            })
                                        }
                                    >
                                        <svg viewBox="0 0 18 18">
                                            <line
                                                class="ql-stroke"
                                                x1="7"
                                                x2="13"
                                                y1="4"
                                                y2="4"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="5"
                                                x2="11"
                                                y1="14"
                                                y2="14"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="8"
                                                x2="10"
                                                y1="14"
                                                y2="4"
                                            ></line>
                                        </svg>
                                    </div>
                                    <div
                                        class={`style-icon-box${
                                            this.curEdit.textAlign === "left"
                                                ? " active"
                                                : ""
                                        }`}
                                        on-click={() =>
                                            this.changeCurSetting({
                                                textAlign: "left"
                                            })
                                        }
                                    >
                                        <svg viewBox="0 0 18 18">
                                            <line
                                                class="ql-stroke"
                                                x1="3"
                                                x2="15"
                                                y1="9"
                                                y2="9"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="3"
                                                x2="13"
                                                y1="14"
                                                y2="14"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="3"
                                                x2="9"
                                                y1="4"
                                                y2="4"
                                            ></line>
                                        </svg>
                                    </div>
                                    <div
                                        class={`style-icon-box${
                                            this.curEdit.textAlign === "center"
                                                ? " active"
                                                : ""
                                        }`}
                                        on-click={() =>
                                            this.changeCurSetting({
                                                textAlign: "center"
                                            })
                                        }
                                    >
                                        <svg viewBox="0 0 18 18">
                                            <line
                                                class="ql-stroke"
                                                x1="15"
                                                x2="3"
                                                y1="9"
                                                y2="9"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="14"
                                                x2="4"
                                                y1="14"
                                                y2="14"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="12"
                                                x2="6"
                                                y1="4"
                                                y2="4"
                                            ></line>
                                        </svg>
                                    </div>
                                    <div
                                        class={`style-icon-box${
                                            this.curEdit.textAlign === "right"
                                                ? " active"
                                                : ""
                                        }`}
                                        on-click={() =>
                                            this.changeCurSetting({
                                                textAlign: "right"
                                            })
                                        }
                                    >
                                        <svg viewBox="0 0 18 18">
                                            <line
                                                class="ql-stroke"
                                                x1="15"
                                                x2="3"
                                                y1="9"
                                                y2="9"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="15"
                                                x2="5"
                                                y1="14"
                                                y2="14"
                                            ></line>
                                            <line
                                                class="ql-stroke"
                                                x1="15"
                                                x2="9"
                                                y1="4"
                                                y2="4"
                                            ></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {this.curEdit.isDetails ? (
                                <div class="block-box">
                                    <div>占位宽度</div>
                                    <HtInputNumber
                                        size="mini"
                                        min={1}
                                        max={4}
                                        step-strictly
                                        value={this.curEdit.width}
                                        on-change={value =>
                                            this.changeCurSetting({
                                                width: value
                                            })
                                        }
                                    />
                                </div>
                            ) : (
                                <div class="block-box">
                                    <div>占位宽度</div>
                                    <HtInputNumber
                                        size="mini"
                                        step-strictly
                                        value={this.curEdit.width}
                                        min={40}
                                        max={760}
                                        on-change={value =>
                                            this.changeCurSetting({
                                                width: value
                                            })
                                        }
                                    />
                                </div>
                            )}
                            {this.curEdit.type === "custom" && (
                                <div class="block-box">
                                    <div>文字内容</div>
                                    <el-input
                                        type="textarea"
                                        rows={3}
                                        placeholder="输入想显示在打印单上的内容"
                                        value={this.curEdit.value}
                                        on-input={value =>
                                            this.changeCurSetting({ value })
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ) : this.curEditKey === printLogoKey ? (
                        <div  class="block-box">
                            <el-radio v-model={this.logoType} label={logoTypes.custom}>
                                自定义图标(60px*60px)
                            </el-radio>
                            <HtBase64Img limit-size={200*1024} v-model={this.logoCustomUrl} />
                            <el-radio v-model={this.logoType} label={logoTypes.system}>
                                系统图标
                            </el-radio>
                            <div>图标可以拖动调整位置</div>
                        </div>
                    ) : (
                        <div>请选择当前设置项</div>
                    ))}
            </div>
        );
    }
};
</script>