<template>
    <component
        :is="_elTag"
        class="el-radio-group"
        role="radiogroup"
        @keydown="handleKeydown"
    >
        <slot />
    </component>
</template>
<script>
import Emitter from "element-ui/lib/mixins/emitter";

const keyCode = Object.freeze({
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
});
export default {
    name: "HtRadioGroup",

    componentName: "HtRadioGroup",

    inject: {
        elFormItem: {
            default: ""
        }
    },

    mixins: [Emitter],

    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: {},
        size: String,
        fill: String,
        textColor: String,
        disabled: Boolean
    },

    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        _elTag() {
            return (this.$vnode.data || {}).tag || "div";
        },
        radioGroupSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        }
    },
    watch: {
        value() {
            this.dispatch("ElFormItem", "el.form.change", [this.value]);
        }
    },

    created() {
        this.$on("handleChange", value => {
            this.$emit("change", value);
        });
    },
    mounted() {
        // 当radioGroup没有默认选项时，第一个可以选中Tab导航
        const radios = this.$el.querySelectorAll("[type=radio]");
        const firstLabel = this.$el.querySelectorAll("[role=radio]")[0];
        if (![].some.call(radios, radio => radio.checked) && firstLabel) {
            firstLabel.tabIndex = 0;
        }
    },
    methods: {
        handleKeydown(e) { // 左右上下按键 可以在radio组内切换不同选项
            const target = e.target;
            const className = target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";
            const radios = this.$el.querySelectorAll(className);
            const length = radios.length;
            const index = [].indexOf.call(radios, target);
            const roleRadios = this.$el.querySelectorAll("[role=radio]");
            switch (e.keyCode) {
                case keyCode.UP:
                case keyCode.DOWN:
                    e.preventDefault();
                    break;
                case keyCode.LEFT:
                    e.stopPropagation();
                    e.preventDefault();
                    if (index === 0) {
                        roleRadios[length - 1].click();
                        roleRadios[length - 1].focus();
                    } else {
                        roleRadios[index - 1].click();
                        roleRadios[index - 1].focus();
                    }
                    break;
                case keyCode.RIGHT:
                    if (index === (length - 1)) {
                        e.stopPropagation();
                        e.preventDefault();
                        roleRadios[0].click();
                        roleRadios[0].focus();
                    } else {
                        roleRadios[index + 1].click();
                        roleRadios[index + 1].focus();
                    }
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

