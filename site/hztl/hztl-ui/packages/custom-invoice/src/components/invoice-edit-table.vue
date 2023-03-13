<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import HtResizeBox from "hztl-ui/packages/resize-box";
import AlternativeFiles from "./alternative-files";
import {getCurStyles} from "../until";

export default {
    props: {
        templateData: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState("invoice", ["curEditField"]),
        ...mapGetters("invoice", ["tableData", "curEdit"]),
        soureFile() {
            return this.templateData.soureFile;
        },
        content() {
            return this.templateData.content;
        },
        detail() {
            return this.tableData[this.soureFile][0] ?this.tableData[this.soureFile][0] : {};
        }
    },
    methods: {
        ...mapMutations("invoice", ["setCurEditKey"]),
        handleTemplateChange(data) {
            this.$emit("change", data);
        },
        handleChangeWidth(width, file) {
            file.width = width;
            this.handleTemplateChange(this.content);
        }
    },
    render() {
        return (
            <div class={`ht-invoice-edit-table${this.templateData === this.curEdit ? " active" : ""}${!this.content.length ? " no-data-content" : ""}`}>
                <AlternativeFiles
                    group={`body${this.soureFile}`}
                    handle=".dragghandle"
                    list={this.content}
                    on={this.$listeners}
                    attrs={this.$attrs}
                    scopedSlots={{
                        default: list =>
                            list.length ? (
                                list.map(item => (
                                    <HtResizeBox
                                        width={item.width}
                                        on-change-width={width =>
                                            this.handleChangeWidth(width, item)
                                        }
                                        class={`list-group-item ${this.curEditField.curEditKey === item.key ? "active": ""}`}
                                        style={getCurStyles(item, true)}
                                    >
                                        <div class="dragghandle" on-click={() => this.setCurEditKey(item.key)}>
                                            <div
                                                class="file-item file-name text-ellipsis"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </div>
                                            <div
                                                class="file-item ht-invoice-sample-class text-ellipsis"
                                                title={this.detail[item.file]}
                                            >
                                                [{this.detail[item.file]}]
                                            </div>
                                        </div>
                                    </HtResizeBox>
                                ))
                            ) : (
                                <div class="no-data">拖拽标题列数据设置表格</div>
                            )
                    }}
                />
            </div>
        );
    }
};
</script>