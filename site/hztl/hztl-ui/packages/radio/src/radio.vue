<template>
    <label
        :class="[
            border && radioSize ? 'el-radio--' + radioSize : '',
            { 'is-disabled': isDisabled },
            { 'is-focus': focus },
            { 'is-bordered': border },
            { 'is-checked': model === label }
        ]"
        :aria-checked="model === label"
        :aria-disabled="isDisabled"
        :tabindex="tabIndex"
        class="el-radio"
        role="radio"
        @keydown.space.stop.prevent="model = isDisabled ? model : label"
    >
        <span
            :class="{
                'is-disabled': isDisabled,
                'is-checked': model === label
            }"
            class="el-radio__input"
        >
            <span class="el-radio__inner" />
            <input
                ref="radio"
                v-model="model"
                :value="label"
                :name="name"
                :disabled="isDisabled"
                class="el-radio__original"
                type="radio"
                aria-hidden="true"
                tabindex="-1"
                @focus="focus = true"
                @blur="focus = false"
                @change="handleChange"
            >
        </span>
        <span
            class="el-radio__label"
            @keydown.stop
        >
            <slot />
            <template v-if="!$slots.default">{{ label }}</template>
        </span>
    </label>
</template>
<script>
import Emitter from "element-ui/lib/mixins/emitter";

export default {
    name: "HtRadio",

    mixins: [Emitter],

    inject: {
        elForm: {
            default: ""
        },

        elFormItem: {
            default: ""
        }
    },

    componentName: "HtRadio",

    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: {},
        // eslint-disable-next-line vue/require-prop-types
        label: {},
        disabled: Boolean,
        name: String,
        border: Boolean,
        size: String
    },

    data() {
        return {
            focus: false
        };
    },
    computed: {
        isGroup() {
            let parent = this.$parent;
            while (parent) {
                if (parent.$options.componentName !== "HtRadioGroup") {
                    parent = parent.$parent;
                } else {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this._radioGroup = parent;
                    return true;
                }
            }
            return false;
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set(val) {
                if (this.isGroup) {
                    this.dispatch("HtRadioGroup", "input", [val]);
                } else {
                    this.$emit("input", val);
                }
                this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
            }
        },
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        radioSize() {
            const temRadioSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
            return this.isGroup
                ? this._radioGroup.radioGroupSize || temRadioSize
                : temRadioSize;
        },
        isDisabled() {
            return this.isGroup
                ? this._radioGroup.disabled || this.disabled || (this.elForm || {}).disabled
                : this.disabled || (this.elForm || {}).disabled;
        },
        tabIndex() {
            return (this.isDisabled || (this.isGroup && this.model !== this.label)) ? -1 : 0;
        }
    },

    methods: {
        handleChange() {
            this.$nextTick(() => {
                this.$emit("change", this.model);
                this.isGroup && this.dispatch("HtRadioGroup", "handleChange", this.model);
            });
        }
    }
};
</script>
