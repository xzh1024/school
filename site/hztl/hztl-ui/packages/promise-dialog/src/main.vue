<script>
import HtDialog from "hztl-ui/packages/dialog";

export default {
    components: {
        HtDialog
    },
    data() {
        return {
            isLoading: false,
            topClass: "",
            width: "600px",
            visible: false,
            disabledHotkeys: false,
            keyScope: Symbol("promiseDialog"),
            model: {},
            isFocusCancel: false,
            sureText: "",
            focusData: {
                updateIndex: 0,
                initial: undefined,
                type: undefined,
                title: ""
            },
            beforeConfirm() {
                return true;
            },
            afterVisible() {}
        };
    },
    watch: {
        visible: {
            handler(val) {
                if (val) {
                    this.afterVisible();
                }
            },
            immediate: true
        }
    },
    methods: {
        async handleClose(value) {
            this.isLoading = true;
            let flag = !value;
            if (value) {
                try {
                    flag = await this.beforeConfirm(this.model);
                } catch (e) {
                    flag = false;
                }
            }
            this.isLoading = false;
            if (flag) {
                this.visible = false;
                this.closeDialog(value, this.model);
            }
        },
        contentRender() {},
        closeDialog() {}
    },
    render() {
        return (
            <ht-dialog
                class={`ht-promise-dialog ${this.topClass}`}
                visible={this.visible}
                title={this.title}
                on={{ "update:visible": this.handleClose }}
                close-on-click-modal={false}
                width={this.width}
            >
                {this.contentRender(this.model)}
                <div class="btns-group">
                    <el-button
                        ref="confirm"
                        type="primary"
                        plain
                        size="small"
                        v-loading={this.isLoading}
                        on-click={() => this.handleClose(true)}
                    >
                        {this.sureText || "确认（F3）"}
                    </el-button>
                    <el-button
                        ref="confirm"
                        type="primary"
                        plain
                        size="small"
                        on-click={() => this.handleClose(false)}
                    >
                        取消（Esc）
                    </el-button>
                </div>
            </ht-dialog>
        );
    }
};
</script>
