<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { isBaseKey, getDiffSubKey } from "./until";

import { AlternativeFiles } from "./components";

export default {
    computed: {
        ...mapState("invoice", ["invoiceLogo"]),
        ...mapGetters("invoice", [
            "templateHeader",
            "templateFooter",
            "templateTail",
            "altDetalisFiles",
            "altTableFiles",
            "altTailFiles",
        ]),
    },
    methods: {
        ...mapActions("invoice", ["switchShowLogo"]),
        cloneData(data) {
            if (isBaseKey(data.key)) {
                return {
                    ...data,
                    key: getDiffSubKey(
                        [
                            ...this.templateFooter,
                            ...this.templateHeader,
                            ...this.templateTail,
                        ],
                        data.key
                    ),
                };
            }
            return data;
        }
    },
    render() {
        return (
            <div class="ht-invoice-alternative flex-container column-flex">
                <div class="page-title">
                    <span>打印内容</span>
                    <span class="color-gray">（拖拽到画布中）</span>
                </div>
                <div class="ht-invoice-alternative-box auto-block flex-container column-flex">
                    <div class="ht-page-title sub-title">&nbsp;页头页尾独立字段</div>
                    <AlternativeFiles
                        group="header"
                        class="auto-block"
                        list={this.altDetalisFiles}
                        clone={this.cloneData}
                    />
                </div>
                {!!this.altTailFiles.length && (
                    <div class="ht-invoice-alternative-box auto-block flex-container column-flex">
                        <div class="ht-page-title sub-title">&nbsp;尾联独立字段</div>
                        <AlternativeFiles
                            group="tail"
                            class="auto-block"
                            list={this.altTailFiles}
                            clone={this.cloneData}
                        />
                    </div>
                )}
                {this.altTableFiles.map((item) => (
                    <div class="ht-invoice-alternative-box auto-block flex-container column-flex">
                        <div class="ht-page-title sub-title">
                            &nbsp;{item.tableName}表格列字段
                        </div>
                        <AlternativeFiles
                            class="auto-block"
                            group={`body${item.soureFile}`}
                            list={item.content}
                        />
                    </div>
                ))}
                <div class="ht-invoice-alternative-box auto-block">
                    <div class="ht-page-title sub-title">&nbsp;&nbsp;其他字段</div>
                    <div class="ht-other-group">
                        <div class="flex-container list-group-item">
                            <div class="file-item file-name">图标</div>
                            <div class="file-item file-value">
                                <el-switch
                                    value={this.invoiceLogo.isShow}
                                    on-change={this.switchShowLogo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
