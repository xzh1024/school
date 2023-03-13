<script>
import { dateFormatFull } from "hztl-ui/src/utils/date-util";
import { mapGetters, mapState } from "vuex";
import { dateFormat } from "hztl-ui/src/utils/date-util";
import priceUppercase from "hztl-ui/src/utils/price-uppercase";
import { Fragment } from "vue-fragment";
import { reduce } from "lodash";
import { getCurStyles } from "../until";

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("invoice", ["showSample"]),
        ...mapGetters("invoice", ["typeName", "detalisData", "tableData"])
    },
    methods: {
        formatter(item) {
            let value = this.detalisData[item.file];
            if (this.showSample) {
                value = item.type === "signature" ? "" : `${value}`;
            } else {
                let total = item.total || {
                    table: "details",
                    file: item.file
                }
                switch (item.type) {
                    case "date":
                        value = dateFormat(value);
                        break;
                    case "uppercase":
                        value = priceUppercase(value);
                        break;
                    case "areaNames":
                        value = value => value.join("");
                        break;
                    case "signature":
                        value = "";
                        break;
                    case "total":
                        value = reduce(
                            this.tableData[total.table],
                            (sum, row) => sum + Number(row[total.file]),
                            0
                        );
                        break;
                    default:
                }
            }
            return value;
        },
        handleClick(e) {
            this.$emit("click", e);
        }
    },
    render() {
        const renderItem = item => {
            let itemJsx;
            switch (item.type) {
                case "defaultTitle":
                    itemJsx = (
                        <div
                            class={`file-item file-value${
                                this.showSample
                                    ? " ht-invoice-sample-class"
                                    : ""
                            }`}
                        >
                            {this.detalisData.companyName}
                            {this.typeName}
                        </div>
                    );
                    break;
                case "custom":
                    itemJsx = (
                        <pre
                            class={`file-item file-value${
                                this.showSample
                                    ? " ht-invoice-sample-class"
                                    : ""
                            }`}
                        >
                            {item.value}
                        </pre>
                    );
                    break;
                case "defaultDate":
                    itemJsx = (
                        <div
                            class={`file-item file-value${
                                this.showSample
                                    ? " ht-invoice-sample-class"
                                    : ""
                            }`}
                        >
                            {item.name}：{dateFormatFull(new Date())}（
                            {this.detalisData.printCount})
                        </div>
                    );
                    break;
                case "signature":
                    itemJsx = (
                        <Fragment>
                            <div class="file-item file-name">{item.name}：</div>
                            <div
                                class={`file-item file-value signature-file${
                                    this.showSample
                                        ? " ht-invoice-sample-class"
                                        : ""
                                }`}
                            ></div>
                        </Fragment>
                    );
                    break;
                case "divider":
                    itemJsx = <div class="file-item file-divider"></div>
                    break;
                default:
                    itemJsx = (
                        <Fragment>
                            <div class="file-item file-name">{item.name}：</div>
                            <div
                                class={`file-item file-value${
                                    this.showSample
                                        ? " ht-invoice-sample-class"
                                        : ""
                                }`}
                            >
                                {this.formatter(item)}
                            </div>
                        </Fragment>
                    );
            }
            return itemJsx;
        };

        return (
            <div
                class={`ht-invoice-file list-group-item item-flex-${this.data.width}`}
                on-click={this.handleClick}
                style={getCurStyles(this.data)}
            >
                {renderItem(this.data)}
            </div>
        );
    }
};
</script>