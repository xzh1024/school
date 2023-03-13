<script>
import Popup from "element-ui/lib/utils/popup";
import hotkeys from "hotkeys-js";

export default {
    name: "HtSidebarBox",
    componentName: "HtSidebarBox",
    mixins: [Popup],
    props: {
        visible: Boolean,
    },
    data() {
        return {
            sidebarList: [],
            curSidbarKey: null,
        };
    },
    beforeDestroy() {
        this.sidebarList.forEach((item) => {
            this.removeSidebar(item.shortcutsKey);
        });
    },
    methods: {
        addSidebar(options) {
            if (
                options.shortcutsKey &&
                !this.sidebarList.find(
                    (item) => item.shortcutsKey === options.shortcutsKey
                )
            ) {
                this.sidebarList.push({ 
                    ...options,
                    isLoad: false
                });
                options.shortcutsKey &&
                    hotkeys(options.shortcutsKey, (e, hotkeysEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        this.toggleVisible(hotkeysEvent.key);
                    });
            } else {
                console.error("sidebar 名字为空或者已经存在 ");
            }
        },
        removeSidebar(shortcutsKey) {
            const removeSidebar = this.sidebarList.find(
                (item) => item.shortcutsKey === shortcutsKey
            );
            if (removeSidebar) {
                this.sidebarList = this.sidebarList.filter(
                    (item) => item.shortcutsKey !== removeSidebar.shortcutsKey
                );
                hotkeys.unbind(removeSidebar.shortcutsKey, "all");
                if (this.curSidbarKey === removeSidebar.shortcutsKey) {
                    this.hideSidebar();
                }
            } else {
                console.error(`sidebar ${shortcutsKey} 未找到`);
            }
        },
        showSidebar(shortcutsKey) {
            const curSidbar = this.sidebarList.find(
                (item) => item.shortcutsKey === shortcutsKey
            );
            if (curSidbar) {
                this.$emit("update:visible", true);
                curSidbar.isLoad = true;
                this.curSidbarKey = curSidbar.shortcutsKey;
            } else {
                console.error(`sidebar ${shortcutsKey} 未找到`);
            }
        },
        hideSidebar() {
            this.curSidbarKey = null;
            this.$emit("update:visible", false);
        },
        toggleVisible(shortcutsKey) {
            // 目标未选中 或者是选中但是当前是隐藏时候，则采取展示
            if (this.curSidbarKey !== shortcutsKey  || (this.curSidbarKey === shortcutsKey && !this.visible)) {
                this.showSidebar(shortcutsKey);
            } else {
                this.hideSidebar();
            }
        },
        rebindShortcutsKey(shortcutsKey) {
            if (this.sidebarList.find((item) => item.shortcutsKey === shortcutsKey)) {
                hotkeys(shortcutsKey, (e, hotkeysEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.toggleVisible(hotkeysEvent.key);
                });
            } else {
                console.error(`sidebar ${shortcutsKey} 未找到`);
            }
        },
    },
    render() {
        const curSidbar = this.sidebarList.find(
            (item) => item.shortcutsKey === this.curSidbarKey
        );
        const { width = "50%", height = "70%" } = curSidbar || {};
        return (
            <div
                style={{
                    height: height,
                    width: width,
                }}
                class={`ht-sidebar-content ${
                    this.visible ? "sidebar-show" : "sidebar-hide"
                }`}
            >
                {this.sidebarList.map((item) => (
                    <div
                        class={`sidebar-main ${
                            this.curSidbarKey === item.shortcutsKey ? "active" : ""
                        }`}
                    >
                        {item.isLoad && item.contentRender ? item.contentRender() : null}
                    </div>
                ))}
                <div class="sidebar-button-warp">
                    {this.sidebarList.map((item) => (
                        <div class="sidebar-button-box">
                            <div class={`sidebar-button-container ${
                                this.visible && item.shortcutsKey === this.curSidbarKey
                                    ? "active"
                                    : ""
                            }`}>
                                <div
                                    on-click={() => this.toggleVisible(item.shortcutsKey)}
                                    class={`sidebar-button ${item.btnClass || ""}`}
                                >
                                    {item.title}
                                    <div class="sidebar-key">({item.shortcutsKey})</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
</script>
