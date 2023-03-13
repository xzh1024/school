<script>
const options = [
    {
        id: 1,
        name: "1111",
    },
    {
        id: 2,
        name: "2222",
    },
];
export default {
    data() {
        return {
            b: null,
            a: null,
            flexibleTags: [],
        };
    },
    methods: {
        async searchFunc(query) {
            return options.filter((item) => item.name.includes(query));
        },
    },
    render() {
        return (
            <div class="flex-container autoselect-box">
                <ht-tags-view addRouteTag={false} v-model={this.flexibleTags} />
        本地搜索
                <ht-select v-model={this.a} options={options} />
        远程搜索
                <ht-select v-model={this.b} remote-method={this.searchFunc} />
            </div>
        );
    },
};
</script>
<style lang="scss" scoped>
.autoselect-box {
  justify-content: flex-start;
}
</style>
