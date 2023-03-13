
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Draggable from "vuedraggable";
import makeInvoiceStore from "./store";

import InvoiceAlternative from "./invoice-alternative";
import InvoiceEditWarp from "./invoice-edit-warp";
import TemSetting from "./tem-setting";

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
    store() {
        return makeInvoiceStore()
    },
    props: {
        typeEmun: Object,
        temData: {
            type: Object,
            required: true
        },
        baseFiles: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("invoice", ["id", "type", "name", "invoiceGlobal", "invoiceLogo"]),
        ...mapGetters("invoice", [
            "templateHeader",
            "templateBody",
            "templateFooter",
            "templateTail"
        ])
    },
    watch: {
        baseFiles: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.initData();
                });
            }
        },
        temData() {
            this.initTemData(this.temData);
        }
    },
    methods: {
        ...mapActions("invoice", ["initStoreData", "initTemData"]),
        initData() {
            this.initStoreData({
                typeEmun: this.typeEmun,
                baseFiles: this.baseFiles,
                temData: this.temData
            });
        },
        saveAll() {
            function getSerialData(data) {
                // key + 可修改字段列
                const serialKeys = ["key", "width", "value", "fontSize", "textAlign", "isOblique", "isBold"]
                const serialData = {};
                serialKeys.forEach(key => {
                    serialData[key] = data[key];
                })
                return serialData;
            }
            this.$emit("template-change", {
                id: this.id,
                type: this.type,
                name: this.name,
                content: JSON.stringify({
                    templateHeader: this.templateHeader.map(item => getSerialData(item)),
                    templateBody: this.templateBody.map(it => {
                        return {
                            ...it,
                            content: it.content.map(item => getSerialData(item)),
                        };
                    }),
                    templateFooter: this.templateFooter.map(item => getSerialData(item)),
                    templateTail: this.templateTail.map(item => getSerialData(item)),
                    invoiceGlobal: this.invoiceGlobal,
                    invoiceLogo: this.invoiceLogo
                })
            });
        }
    },
    render() {
        return (
            <Draggable
                class="full-height full-width ht-trashzone border-box"
                group={{
                    name: "trash",
                    draggable: ".dropitem",
                    put: () => true,
                    pull: false
                }}
                handle=".no-trash-handle"
            >
                <div class="flex-container ht-custom-invoice">
                    <InvoiceAlternative class="ht-invoice-side" />
                    <div class="flex-container column-flex invoice-warp-content">
                        <div class="button-group">
                            <a class="link" on-click={this.initData}>
                                <i class="el-icon-refresh" />
                                &nbsp; 还原
                            </a>
                            &emsp;&emsp;
                            <a class="link" on-click={this.saveAll}>
                                <i class="el-icon-document-checked" />
                                &nbsp; 保存
                            </a>
                        </div>
                        <InvoiceEditWarp
                            style={{
                                fontSize: `${this.invoiceGlobal.fontSize}px`,
                                fontWeight: this.invoiceGlobal.isBold ? "bold" : "normal",
                                fontStyle: this.invoiceGlobal.isOblique ? "oblique" : "normal",
                            }}
                            class="auto-block"
                        />
                    </div>
                    <TemSetting class="ht-invoice-side" />
                </div>
            </Draggable>
        );
    }
};
</script>
