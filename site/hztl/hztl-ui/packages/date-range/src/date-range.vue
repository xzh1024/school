<template>
    <div 
        class="ht-date-range"
    >
        <el-date-picker
            v-model="startTime"
            @change="dateChange"
            :value-format="valueFormat"
            v-bind="$attrs"
            :clearable="clearable"
            class="date-picker"
            type="date"
        />
        <div class="date-range-link">
            至
        </div>
        <el-date-picker
            v-model="endTime"
            @change="dateChange"
            :value-format="valueFormat"
            v-bind="$attrs"
            :clearable="clearable"
            class="date-picker"
            type="date"
        />
    </div>
</template>
<script>

export default {
    name: "HtDateRange",
    componentName: "HtDateRange",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            required: true
        },
        clearable: {
            type: Boolean,
            default: true
        },
        valueFormat: {
            type: String,
            default: "yyyy-MM-dd"
        }
    },
    data() {
        return {
            startTime: null,
            endTime: null
        };
    },
    watch: {
        value: {
            handler(val) {
                if (val && val.length) {
                    this.startTime = val[0];
                    this.endTime = val[1];
                } else {
                    this.startTime = null;
                    this.endTime = null;
                }
            },
            immediate: true
        }
    },
    methods: {
        dateChange() {
            this.$emit("change", [this.startTime, this.endTime]);
        }
    }
};
</script>