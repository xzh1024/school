<script>

const options = [
    {
        id: 1,
        name: "1112221",
        data: "bbb"
    },
    {
        id: 2,
        name: "22122",
        data: "sss"
    },
]
export default {
    data( ) {
        return {
            a: null,
            keepInputValue: null
        }
    },
    methods: {
        clearValue() {
            this.a = null;
            this.keepInputValue = null;
        }
    },
    render() {
        return  (
            <div class="flex-container autoselect-box">
                <HtAutocomplete
                    keep-input
                    v-model={this.a}
                    trigger-on-focus={false}
                    keep-input-value={this.keepInputValue}
                    on={{
                        "update:keepInputValue": value =>  this.keepInputValue= value
                    }}
                    highlight-first-item
                    options={options}
                    scopedSlots={{
                        default: item => {
                            console.log(111);
                            return item.id + item.data
                        }
                    }}
                >
                </HtAutocomplete>
                &emsp;
                <el-button on-click={this.clearValue}>清除</el-button>
                &emsp;
                <div>选项值： {this.a} <br/>keepValue: {this.keepInputValue}</div>
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.autoselect-box {
    justify-content: flex-start;
}
</style>