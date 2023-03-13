<script>
import { mapGetters, mapMutations } from "vuex";
import { INDEX_UP_CASE } from "hztl-ui/src/constants";

import {
    InvoiceEditDetails,
    InvoiceEditTable,
    InvoiceLogo,
    InvoicePageFooter,
} from "./components";

export default {
    data() {
        return {
            isShowEditBody: true,
        };
    },
    computed: {
        ...mapGetters("invoice", [
            "templateHeader",
            "templateBody",
            "templateFooter",
            "templateTail",
            "altTailFiles"
        ]),
        ...mapGetters("invoice", ["tableData"]),
    },
    methods: {
        ...mapMutations("invoice", [
            "changeTemplateHeader",
            "changeTemplateFooter",
            "changeTemplateBody",
            "changeTemplateTail",
            "setCurEditKey",
        ]),
        bodyChange(soureFile, data) {
            let templateBody = this.templateBody;
            let curChange = templateBody.find((item) => item.soureFile === soureFile);
            curChange.content = data;
            this.changeTemplateBody(templateBody);
        },
        headerChange(data, cur) {
            this.setCurEdit(cur);
            this.changeTemplateHeader(data);
        },
        footerChange(data, cur) {
            this.setCurEdit(cur);
            this.changeTemplateFooter(data);
        },
        tailChange(data, cur) {
            this.setCurEdit(cur);
            this.changeTemplateTail(data);
        },
        setCurEdit(cur) {
            for (let editKey in cur) {
                // 依赖 vuedraggable组件数据格式
                if (["added", "moved"].includes(editKey)) {
                    let curKey = cur[editKey] && cur[editKey].element.key;
                    this.setCurEditKey(curKey);
                }
            }
        },
    },
    render() {
        return (
            <div class="ht-invoice-edit-warp">
                <div class="ht-invoice-edit-box">
                    <div class="ht-invoice-edit-content-box">
                        <div class="ht-invoice-edit-content">
                            <InvoiceEditDetails
                                group="header"
                                templateData={this.templateHeader}
                                on-change={this.headerChange}
                                noDataMsg="拖拽页头页尾部字段设置"
                            />
                            <div class="ht-invoice-body-box">
                                {this.templateBody.map((item, index) => {
                                    return (
                                        this.tableData[item.soureFile] && (
                                            <div class="ht-invoice-body-block">
                                                {item.tableName && (
                                                    <div class="ht-invoice-table">{`${
                                                        INDEX_UP_CASE[index + 1]
                                                    }、${item.tableName}`}</div>
                                                )}
                                                <InvoiceEditTable
                                                    templateData={item}
                                                    on-change={(data) =>
                                                        this.bodyChange(item.soureFile, data)
                                                    }
                                                />
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                            <InvoiceEditDetails
                                group="header"
                                templateData={this.templateFooter}
                                on-change={this.footerChange}
                                noDataMsg="拖拽页头页尾部字段设置"
                            />
                            <InvoiceLogo />
                            <InvoicePageFooter />
                            {!!this.altTailFiles.length && (
                                <InvoiceEditDetails
                                    group="tail"
                                    templateData={this.templateTail}
                                    on-change={this.tailChange}
                                    noDataMsg="拖拽尾联独立字段设置"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};
</script>
