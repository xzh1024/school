<template>
    <el-select
        v-model="displayValue"
        :clearable="clearable"
        :multiple="multiple"
        :remote="remote"
        :filterable="relFilterable"
        :remote-method="relRemoteMethod"
        v-bind="$attrs"
        v-on="passListeners"
    >
        <slot />
        <el-option
            v-if="hasSelecteOption && selectOptions && selectOptions.length"
            :value="allSelecteVal"
            label="全部"
        />
        <el-option
            v-for="item in selectOptions"
            :key="item.id"
            :label="getCurName(item)"
            :value="item.id"
        />
    </el-select>
</template>
<script>
import { isArray, isObject, toNumber } from "lodash";

const allSelecteVal = Symbol("allSelecteVal");

export default {
    name: "HtSelect",
    componentName: "HtSelect",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: {},
        options: {
            type: [Object, Array],
            default: function() {
                return [];
            }
        },
        defaultValue: {
            type: [String, Number, Array],
            default: null
        },
        id: {
            type: String,
            default: "id"
        },
        name: {
            type: String,
            default: "name"
        },
        clearable: {
            type: Boolean,
            default: true
        },
        multiple: Boolean,
        hasSelecteAllVal: Boolean,
        filterZero: Boolean,
        formatName: Function,
        filterable: Boolean,
        remoteMethod: Function
    },
    data() {
        return {
            allSelecteVal,
            remoteOptions: []
        };
    },
    computed: {
        remote() {
            return !!this.remoteMethod
        },
        relFilterable() {
            return this.filterable || this.remote
        },
        hasSelecteOption() {
            return this.multiple && this.hasSelecteAllVal;
        },
        passListeners() {
            // eslint-disable-next-line no-unused-vars
            let { change, ...others } = this.$listeners;
            return others;
        },
        displayValue: {
            get() {
                if (
                    ["", undefined, null].includes(this.value) ||
                    (this.filterZero && this.value === 0)
                ) {
                    return this.defaultValue;
                }
                let value = this.value;
                if (this.hasSelecteOption) {
                    value = [...this.value];
                    // solt 传参数暂时不支持
                    if (this.selectOptions.length && this.value.length === this.selectOptions.length) {
                        value.unshift(allSelecteVal);
                    }
                }
                return value;
            },
            set(value) {
                let resVal = value;
                if (this.hasSelecteOption) {
                    const isOldSelecteAll =
                        !!this.value &&
                        this.value.length === this.selectOptions.length;
                    const isCurSelecteAll = resVal.includes(allSelecteVal);
                    if (isOldSelecteAll) {
                        if (!isCurSelecteAll) {
                            resVal = [];
                        } else {
                            resVal = resVal.filter(
                                item => item !== allSelecteVal
                            );
                        }
                    } else {
                        if (isCurSelecteAll) {
                            resVal = this.selectOptions.map(item => item.id);
                        }
                    }
                }
                this.$emit("change", resVal);
            }
        },
        selectOptions: function() {
            let selectOptions = [];
            const options = this.remote ? this.remoteOptions : this.options;
            if (isArray(options)) {
                selectOptions = options
                    .filter(item => ![null, undefined, ""].includes(item))
                    .map((item, index) => {
                        if (isObject(item)) {
                            return {
                                ...item,
                                id: item[this.id],
                                name: item[this.name]
                            };
                        } else {
                            return {
                                id: this.id === this.name ? item : index,
                                name: item
                            };
                        }
                    });
            } else if (isObject(options)) {
                const keys = Object.keys(options);
                keys.forEach(key => {
                    let id = key;
                    const number = toNumber(key);
                    if (`${number}` === key) {
                        id = number;
                    }
                    id = this.id === this.name ? options[key] : id;
                    selectOptions.push({
                        id,
                        name: options[key]
                    });
                });
            }
            return selectOptions;
        }
    },
    methods: {
        async relRemoteMethod(query) {
           this.remoteOptions = await this.remoteMethod(query.replace(/(^\s*)|(\s*$)/g,""));
        },
        getCurName(item) {
            if (this.formatName) {
                return this.formatName(item);
            } else {
                return item[this.name];
            }
        }
    }
};
</script>
