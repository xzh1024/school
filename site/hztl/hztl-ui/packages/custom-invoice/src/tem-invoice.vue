
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { INDEX_UP_CASE } from "hztl-ui/src/constants";

import makeInvoiceStore from "./store";

import {
    InvoiceTemDetails,
    InvoiceTemTable,
    InvoiceLogo,
    InvoicePageFooter
} from "./components";

export default {
    name: "HtTemInvoice",
    componentName: "HtTemInvoice",
    store() {
        return makeInvoiceStore()
    },
    props: {
        showSample: Boolean,
        typeEmun: Object,
        temData: {
            type: Object,
            required: true
        },
        baseFiles: {
            type: Object,
            required: true
        },
        invoiceData: {
            type: Object
        }
    },
    computed: {
        ...mapState("invoice", ["invoiceGlobal"]),
        ...mapGetters("invoice", [
            "tableData",
            "templateHeader",
            "templateBody",
            "templateFooter",
            "templateTail"
        ]),
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
        },
        invoiceData() {
            this.setDataSource(this.invoiceData);
        }
    },
    methods: {
        ...mapActions("invoice", ["initStoreData", "initTemData"]),
        ...mapMutations("invoice", ["setDataSource"]),
        initData() {
            this.initStoreData({
                typeEmun: this.typeEmun,
                baseFiles: this.baseFiles,
                temData: this.temData,
                showSample: this.showSample,
                invoiceData: this.invoiceData
            });
        }
    },
    render() {
        return (
            <div
                class="ht-invoice-tem-warp border-box"
                style={{
                    fontSize: `${this.invoiceGlobal.fontSize}px`,
                    fontWeight: this.invoiceGlobal.isBold ? "bold" : "normal",
                    fontStyle: this.invoiceGlobal.isOblique ? "oblique" : "normal",
                }}
            >
                <div class="ht-invoice-tem-content">
                    <InvoiceTemDetails
                        showSample={this.showSample}
                        templateData={this.templateHeader}
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
                                        <InvoiceTemTable
                                            showSample={this.showSample}
                                            data={
                                                this.tableData[item.soureFile]
                                            }
                                            templateData={item}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <InvoiceTemDetails
                        showSample={this.showSample}
                        templateData={this.templateFooter}
                    />
                    <InvoiceLogo />
                    <InvoicePageFooter />
                    <InvoiceTemDetails
                        showSample={this.showSample}
                        templateData={this.templateTail}
                    />
                </div>
            </div>
        );
    }
};
</script>