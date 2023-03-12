<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { printLogoKey } from "../constants";

export default {
    computed: {
        ...mapState("invoice", ["showSample", "invoiceLogo"]),
        ...mapGetters("invoice", ["logoUrl"]),
        logoStyle() {
            const { isShow, position } = this.invoiceLogo;
            return {
                display: isShow ? "block" : "none",
                backgroundImage: `url(${this.logoUrl})`,
                top: `${position.top}px`,
                left: `${position.left}px`
            };
        },
        invoiceLogoRef() {
            return this.$refs.invoiceLogo;
        }
    },
    mounted() {
        this.initMoveListen();
    },
    methods: {
        ...mapMutations("invoice", ["changeLogoPosition", "setCurEditKey"]),
        initMoveListen() {
            const invoiceLogoRef = this.invoiceLogoRef;
            invoiceLogoRef.onmousedown = e => {
                const { left = 0, top = 0 } = this.invoiceLogo.position;
                const startX = left - e.screenX;
                const startY = top - e.screenY;
                const maxTop =
                    this.$el.clientHeight - invoiceLogoRef.clientHeight;
                const maxLeft =
                    this.$el.clientWidth - invoiceLogoRef.clientWidth;

                document.onmousemove = e => {
                    let top = e.screenY + startY;
                    let left = e.screenX + startX;
                    if (top < 0) {
                        top = 0;
                    } else if (top > maxTop) {
                        top = maxTop;
                    }
                    if (left < 0) {
                        left = 0;
                    } else if (left > maxLeft) {
                        left = maxLeft;
                    }

                    this.changeLogoPosition({
                        top,
                        left
                    });
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    },
    render() {
        return (
            <div class="ht-invoice-logo">
                {
                    this.showSample ? (
                        <div
                            ref="invoiceLogo"
                            class="invoice-img"
                            on-click={() => this.setCurEditKey(printLogoKey)}
                            style={this.logoStyle}
                        />
                    ): (
                        <img
                            class="invoice-img"
                            style={this.logoStyle}
                            src={this.logoUrl}
                        />
                    )
                }
            </div>
        );
    }
};
</script>