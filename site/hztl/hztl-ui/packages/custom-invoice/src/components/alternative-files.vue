<script>
import Draggable from "vuedraggable";

export default {
    components: {
        Draggable
    },
    props: {
        list: {
            type: Array,
            required: true
        },
        clone: Function
    },
    methods: {
        changeHandle(cur) {
            this.$emit("change", this.list, cur)
        },
    },
    render() {
        return (
            <div class="ht-alternative-files">
                <Draggable
                    class="ht-invoice-data-group"
                    attrs={this.$attrs}
                    on-change={this.changeHandle}
                    list={this.list}
                    clone={this.clone}
                >
                    {
                        this.$scopedSlots.default ? this.$scopedSlots.default(this.list) :this.list.map(file => (
                            <div class="list-group-item text-ellipsis">
                                <span class="file-item file-name">{file.name}：</span>
                                <span class="file-item ht-invoice-sample-class">
                                [{file.sampleData || file.name}]
                                </span>
                            </div>
                        ))
                    }
                </Draggable>
            </div>
        );
    }
};
</script>