<script>
import { maninRouters } from "../router";
import Print from "./Print";

const themeOptions = [
    {
        id: "light",
        name: "默认"
    },
    {
        id: "blue",
        name: "蓝色"
    },
    {
        id: "green",
        name: "绿色"
    }
];

export default {
    data() {
        return {
            flexibleTags: [],
            theme: "light"
        }
    },
    computed: {
        keepAliveComponents() {
            return this.flexibleTags.map(item => item.name);
        }
    },
    mounted() {
        this.$sidebarBox.addSidebar({
            title: "打印",
            shortcutsKey: "F5",
            contentRender: () => {
                return (<Print />)
            }
        })
    },
    methods: {
        changeTheme() {
            document.body.setAttribute("data-theme", this.theme);
        }
    },
    destroyed() {
        this.$sidebarBox.removeSidebar("Print")
    },
    render() {
        return (
            <el-container class="full-height">
                <ht-menu-aside menu-list={maninRouters} />
                <el-container>
                    <el-header style="padding: 0">
                        <div class="full-height flex-container">
                            <div class="flex-block-bg full-height auto-block">
                                <ht-select v-model={this.theme} options={themeOptions} clearable={false} on-change={this.changeTheme} />
                                <el-button type="primary">呵呵</el-button>
                            </div>
                        </div>
                    </el-header>
                    <ht-tags-view tagKey="path" v-model={this.flexibleTags}/>
                    <keep-alive include={this.keepAliveComponents}>
                        <router-view />
                    </keep-alive>
                </el-container>
            </el-container>
        );
    }
};
</script>