<script>
import TableTest from "../../components/table-test";

export default {
    name: "Basetable",
    activated() {
        this.$sidebarBox.addSidebar({
            title: "测试",
            shortcutsKey: "Ctrl+E",
            width: "90%",
            height: "80%",
            btnClass: "test-btn",
            contentRender: () => {
                return (<div>aaa</div>)
            }
        })
        this.$sidebarBox.showSidebar("F5")
    },
    deactivated() {
        this.$sidebarBox.removeSidebar("Ctrl+E")
        this.$sidebarBox.hideSidebar()
    },

    render() {
        return (
            <div style="heigth: 100%;overflow: hidden">
                <TableTest />
            </div>
        );
    }
};
</script>
<style lang="scss" >
.test-btn {
    height: 120px;
}
</style>