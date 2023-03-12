<script>
import Vue from "vue";
export default {
    data() {
        return {
            visible: false
        }
    },
    mounted() {
        Vue.prototype.$sidebarBox = this.$refs.sidebarBox;
    },
    methods: {
        changeVisible(visible) {
            this.visible = visible;
        },
    },
    render() {
        return (
            <div>
                <router-view />
                <HtSidebarBox
                    ref="sidebarBox"
                    visible={this.visible}
                    on={{
                        "update:visible": this.changeVisible,
                    }}
                />
            </div>
        );
    },
};
</script>
