<template>
    <HtAutocomplete
        ref="autocomplete"
        :fetch-suggestions="relFetchSuggestions"
        :value="useValue"
        v-bind="$attrs"
        :no-data-text="noDataText"
        :no-match-text="noMatchText"
        @select="handleSelect"
        @input="handleInput"
        @blur="handleBlur"
        @clear="handleClear"
        @intput-enter="intputEnter"
        v-on="passListeners"
        show-suffix
    >
        <template slot-scope="{ item }">
            <slot :item="item" />
        </template>
    </HtAutocomplete>
</template>

<script>
import { mnemonicSearch, localSearchData } from "hztl-ui/src/utils/filter-data";

import HtAutocomplete from "hztl-ui/packages/autocomplete";

/**
 *
 * value 使用值 v-model （change） 传递
 *
 * defaultValue 匹配值 sync传递
 * formatName 在有匹配值的时候格式化显示值
 *
 * useValue 显示值 autocomplete中使用
 *
 *
 * */

export default {
    name: "HtAutoselect",
    componentName: "HtAutoselect",
    components: {
        HtAutocomplete
    },
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: null,
        keepInput: Boolean,
        keepInputValue: String,
        defaultValue: { type: [String, Number, Boolean], default: "" },
        formatName: Function,
        options: Array,
        fetchSuggestions: {
            type: Function
        },
        noMatchText: {
            type: String,
            default: "没有匹配到数据"
        },
        noDataText: String,
        remote: Boolean,
        mnemonic: Boolean,
        filterZero: Boolean
    },
    data() {
        return {
            useKeepInputValue: null,
            useDefaultValue: null,
            filteredOptions: [],
            isNoMatch: false,
            inputValue: null
        };
    },
    computed: {
        passListeners() {
            // eslint-disable-next-line no-unused-vars
            let { change, input, "intput-enter": InputEnter, ...others } = this.$listeners;
            return others;
        },
        useOptions() {
            let options = this.options ? this.options : this.filteredOptions || [];
            options = options.filter(item => item.name);
            return options;
        },
        useValue: {
            get() {
                //  优先使用inputValue，被清除情况下去匹配disValue
                if (this.inputValue !== null) {
                    return this.inputValue;
                }
                let obj = this.useOptions.find(item => {
                    return this.value === item.id;
                });
                if (obj) {
                    if (this.formatName) {
                        return this.formatName(obj.name);
                    }
                    return obj.name;
                }

                let disValue = this.filterZero && this.value === 0 ? null : this.useDefaultValue;
                
                if (this.keepInput) {
                    // 可输入模式显示则改变值
                    disValue = this.useKeepInputValue;
                }
                return disValue;
            },
            set(name) {
                let value = name ? this.value : null;
                let useDefaultValue = name ? this.useDefaultValue : null;

                let obj = this.useOptions.find(item => {
                    return name == item.name;
                });
                //  匹配到才更新, 没匹配到使用原值
                if (obj) {
                    value = obj.id;
                    useDefaultValue = obj.name;
                    this.inputValue = null;
                } else if (this.keepInput) {
                    value = null;
                    useDefaultValue = null;
                    this.inputValue = null;
                }

                if (
                    this.value !== value ||
                    this.useDefaultValue !== useDefaultValue
                ) {
                    this.$emit(
                        "update:defaultValue",
                        useDefaultValue,
                        this.useDefaultValue
                    );
                    this.$emit(
                        "defaultValueChange",
                        useDefaultValue,
                        this.useDefaultValue
                    );
                    this.$emit(
                        "selectObjChange",
                        {
                            id: value,
                            name: useDefaultValue
                        },
                        {
                            id: this.value,
                            name: this.useDefaultValue
                        }
                    );

                    this.$emit("change", value, this.value);
                    this.useDefaultValue = useDefaultValue;
                }
            }
        }
    },
    watch: {
        value() {
            this.inputValue = null;
        },
        keepInputValue(value) {
            if (this.keepInputValue !== this.useKeepInputValue) {
                this.useKeepInputValue = value;
            }
        },
        useKeepInputValue(value) {
            if (this.keepInputValue !== this.useKeepInputValue) {
                this.$emit("update:keepInputValue", value);
                this.$emit("input-change", this.useKeepInputValue);
            }
        },
        defaultValue: {
            handler(value) {
                this.useDefaultValue = value;
            },
            immediate: true
        }
    },
    methods: {
        foucs() {
            this.$ref.autocomplete.foucs();
        },
        intputEnter(value) {
            if (this.isNoMatch) {
                this.$emit("no-match-enter", value, this.inputValue);
            } else {
                this.$emit("intput-enter", value);
            }
        },
        async relFetchSuggestions(queryString, cb) {
            if (this.remote) {
                this.filteredOptions = await this.fetchSuggestions(queryString);
            } else {
                this.filteredOptions = this.mnemonic
                    ? this.mnemonicSearch(queryString)
                    : this.localSearchData(queryString);
            }
            // show no match tips
            this.isNoMatch = !this.filteredOptions.length;
            cb(
                this.filteredOptions.filter(item => item.name).map(item => ({
                    ...item,
                    value: item.name
                }))
            );
        },
        handleInput(val) {
            this.inputValue = val;
            if (!val) {
                this.useValue = "";
            }
            if (this.keepInput) {
                this.useKeepInputValue = this.useValue = this.inputValue;
            }
        },
        handleSelect(val) {
            this.useValue = val.value || "";
            if (this.keepInput && val.value) {
                this.useKeepInputValue = val.value;
            }
        },
        handleClear() {
            this.useKeepInputValue = "";
        },
        handleBlur() {
            this.inputValue = null;
            if (this.isNoMatch) this.isNoMatch = false;
        },
        localSearchData(...params) {
            return localSearchData(this.options, ...params);
        },
        mnemonicSearch(queryString) {
            return mnemonicSearch(this.options, queryString);
        }
    }
};
</script>
