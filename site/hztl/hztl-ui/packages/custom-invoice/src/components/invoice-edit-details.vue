<script>
import { mapMutations, mapState } from "vuex";
import AlternativeFiles from "./alternative-files";
import DetailsFile from "./invoice-details-file";

export default {
    props: {
        group: {
            type: String,
            required: true,
        },
        templateData: {
            type: Array,
            required: true,
        },
        noDataMsg: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState("invoice", ["curEditField"]),
    },
    methods: {
        ...mapMutations("invoice", ["setCurEditKey"]),
    },
    render() {
        return (
            <div class="ht-invoice-file-box ht-invoice-edit-details">
                <AlternativeFiles
                    on={this.$listeners}
                    attrs={this.$attrs}
                    group={this.group}
                    list={this.templateData}
                    scopedSlots={{
                        default: (list) =>
                            list.length ? (
                                list.map((item) => (
                                    <DetailsFile
                                        class={
                                            this.curEditField.curEditKey === item.key ? "active" : ""
                                        }
                                        data={item}
                                        on-click={() => this.setCurEditKey(item.key)}
                                    />
                                ))
                            ) : (
                                <div class="no-data">{this.noDataMsg}</div>
                            ),
                    }}
                />
            </div>
        );
    },
};
</script>
