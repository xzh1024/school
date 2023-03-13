<template>
    <div
        ref="resizeWrapper"
        :class="{ 'ht-resize-wrapper': true, 'direction-colunm': isColumn }"
    >
        <el-collapse-transition>
            <div
                ref="block1"
                class="block1"
            >
                <slot name="block1" />
            </div>
        </el-collapse-transition>
        <div
            ref="resizeSlider"
            class="resize-slider"
        >
            <span
                ref="resize"
                v-show="useSeeDetails"
                class="resize"
            />
            <div class="sales-icons is-see-detilas">
                <i
                    :class="{
                        icon: true,
                        'el-icon-caret-left': useSeeDetails,
                        'el-icon-caret-right': !useSeeDetails,
                        'icon-rotate-direction': directionContrary
                    }"
                    @click="changeBoxVisible(!useSeeDetails)"
                />
            </div>
        </div>
        <div
            ref="block2"
            class="block2"
        >
            <slot name="block2" />
        </div>
    </div>
</template>

<script>
const resizeSliderWidth = 16;

export default {
    name: "HtResizeColumns",
    componentName: "HtResizeColumns",
    props: {
        isColumn: {
            type: Boolean,
            default: false
        },
        directionContrary: {
            type: Boolean,
            default: false
        },
        minLen: {
            type: Number,
            default: 100
        },
        defaultLen: {
            type: Number,
            default: 150
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            curSeeDetails: true,
            block1Dom: this.$refs.block1
        };
    },
    computed: {
        useSeeDetails: {
            get() {
                return this.curSeeDetails && this.visible;
            },
            set(value) {
                this.curSeeDetails = value;
                this.$emit("update:visible", value);
            }
        }
    },
    watch: {
        visible(value) {
            this.curSeeDetails = value;
        },
        useSeeDetails(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.changeBoxVisible(newVal);
            }
        }
    },
    mounted() {
        this.changeBoxVisible(this.useSeeDetails);
        this.initListen();
    },
    methods: {
        changeBoxVisible(useSeeDetails) {
            let len = this.defaultLen ? this.defaultLen : this.minLen;
            if (!useSeeDetails) {
                len = 0;
            }
            this.setResize(len, this.directionContrary);
        },
        initListen() {
            const resizeDom = this.$refs.resize;
            const block1Dom = this.$refs.block1;

            resizeDom.onmousedown = e => {
                let startLen;
                let beforeLen;
                if (this.isColumn) {
                    startLen = e.clientY;
                    beforeLen = block1Dom.offsetHeight;
                } else {
                    startLen = e.clientX;
                    beforeLen = block1Dom.offsetWidth;
                }

                document.onmousemove = e => {
                    const endLen = this.isColumn ? e.clientY : e.clientX;
                    const positionLen = endLen - startLen + beforeLen;
                    this.setResize(positionLen);
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    resizeDom.releaseCapture && resizeDom.releaseCapture();
                };
                resizeDom.setCapture && resizeDom.setCapture();
            };
        },
        setResize(positionLen, isRight) {
            let position = positionLen;
            const resizeWrapperLen = this.isColumn
                ? this.$refs.resizeWrapper.offsetHeight
                : this.$refs.resizeWrapper.offsetWidth;

            if (position < this.minLen) {
                position = this.directionContrary && !isRight ? this.minLen : 0;
            } else if (position > resizeWrapperLen - this.minLen) {
                position =
                    this.directionContrary && !isRight
                        ? resizeWrapperLen - resizeSliderWidth
                        : resizeWrapperLen - this.minLen;
            }
            this.useSeeDetails = !(
                position <= 0 || position >= resizeWrapperLen - resizeSliderWidth
            );
            position = isRight
                ? resizeWrapperLen - position - resizeSliderWidth
                : position;
            if (this.isColumn) {
                this.$refs.block1.style.height = position + "px";
            } else {
                this.$refs.block1.style.width = position + "px";
            }
            this.$emit("resize", position);
        }
    }
};
</script>
