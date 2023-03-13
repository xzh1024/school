<script>

const options = [
    {
        id: 1,
        name: "1122211",
        data: "qwer"
    },
    {
        id: 2,
        name: "2233322",
        data: "qazw"
    },
]
export default {
    data( ) {
        return {
            a: 3,
            keepInputValue: null,
            defaultValue: 3333
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
                <ht-autoselect
                    keep-input
                    v-model={this.a}
                    trigger-on-focus={false}
                    defaultValue={this.defaultValue}
                    keep-input-value={this.keepInputValue}
                    on={{
                        "update:keepInputValue": value =>  this.keepInputValue= value
                    }}
                    highlight-first-item
                    options={options}
                    scopedSlots={{
                        default: ({item}) =>`${item.name}-${item.data}-${item.id}`
     
                    }}
                ></ht-autoselect>
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