<script>
export default {
    data() {
        return {
            model: {a: 123, b: {c: 123}}
        }
    },
    methods: {
        test() {
            this.$promiseDialog({
                topClass: "test-class",
                width: "1200px",
                title: "测试title",
                model: this.model,
                contentRender(data) {
                    return <el-input v-model={data.b.c} />;
                },
                afterVisible() {
                    console.log("demo show")
                }
            })
                .then(data => {
                    console.log("then", data, this.model);
                })
                .catch(data => console.log("catch", data));
        }
    },
    render() {
        return (
            <el-button on-click={this.test}>测试dialog</el-button>
        )
    }
}
</script>