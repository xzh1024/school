<template>
  <picker
    mode="multiSelector"
    :value="valueArr"
    :range="range"
    @columnchange="onColumnChange"
    @change="dateChange"
  >
    <slot></slot>
  </picker>
</template>

<script setup lang="ts" name="i-date-picker">
  import { computed, ref, watch, PropType } from "vue";
  import dayjs from "dayjs";
  import { onLoad } from "@dcloudio/uni-app";
  import { fmt, getColumnsIndex } from "./utils";
  const props = defineProps({
    /**
     * @param field {string} @default day
     * 时间选择类型、支持从年到秒的各级选择 默认 日
     */
    field: {
      type: String as PropType<
        "second" | "minute" | "hour" | "day" | "month" | "year"
      >,
      default: "day",
      validator: (value: string) => {
        return ["second", "minute", "hour", "day", "month", "year"].includes(
          value
        );
      }
    },
    /**
     * @param defaultDate {string} @default now date
     * 默认选择时间 默认当前日期时间
     */
    defaultDate: {
      type: String,
      default: dayjs().format("YYYY-MM-DD HH:mm:ss")
    },
    /**
     * @param startYear {number} @default 1990
     * 开始年份 - 从那年开始选择 默认 1990年
     */
    startYear: {
      type: Number,
      default: 1990
    },
    /**
     * @param endYear {number} @default 2050
     * 结束年份 - 可选最大年份 默认 2050年
     */
    endYear: {
      type: Number,
      default: 2050
    },
    /**
     * @param isUnit {boolean} @default true
     * 是否需要显示单位(年月日时分秒) 默认 true
     */
    isUnit: {
      type: Boolean,
      default: true
    }
  });

  const emits = defineEmits(["dateChange"]);

  // picker column variables
  const year = ref<number>(0);
  const month = ref<number>(0);
  const day = ref<number>(0);
  const hour = ref<number>(0);
  const minute = ref<number>(0);
  const second = ref<number>(0);
  // console.log(hour.value, minute.value, second.value);
  // picker value
  const valueArr = ref<number[]>([]);
  // year options
  const years = computed(() => {
    const arr = [];
    for (let i = props.startYear; i <= props.endYear; i++) {
      arr.push(props.isUnit ? `${i}年` : `${i}`);
    }
    return arr;
  });
  // month options
  const months = computed(() => {
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      arr.push(props.isUnit ? `${i > 9 ? i : "0" + i}月` : `${i}`);
    }
    return arr;
  });
  // day options
  const days = computed(() => {
    const num = new Date(year.value, month.value, 0).getDate() + 1;

    const arr = [];
    for (let i = 1; i < num; i++) {
      arr.push(props.isUnit ? `${i > 9 ? i : "0" + i}日` : `${i}`);
    }
    return arr;
  });
  // hour options
  const hours = computed(() => {
    const arr = [];
    for (let i = 1; i <= 23; i++) {
      arr.push(props.isUnit ? `${i > 9 ? i : "0" + i}时` : `${i}`);
    }
    return arr;
  });
  // minute options
  const minutes = computed(() => {
    const arr = [];
    for (let i = 0; i <= 59; i++) {
      arr.push(props.isUnit ? `${i > 9 ? i : "0" + i}分` : `${i}`);
    }
    return arr;
  });
  // second options
  const seconds = computed(() => {
    const arr = [];
    for (let i = 0; i <= 59; i++) {
      arr.push(props.isUnit ? `${i > 9 ? i : "0" + i}秒` : `${i}`);
    }
    return arr;
  });
  // picker options
  const range = computed(() => {
    const all = [
      years.value,
      months.value,
      days.value,
      hours.value,
      minutes.value,
      seconds.value
    ];
    const fieldKeyMap = {
      second: [...all],
      minute: all.slice(0, -1),
      hour: all.slice(0, 4),
      day: all.slice(0, 3),
      month: all.slice(0, 2),
      year: all.slice(0, 1)
    };
    // @ts-ignore
    return fieldKeyMap[props.field];
  });
  // init default date
  function initDefaultDate() {
    year.value = dayjs(props.defaultDate).get("y");
    month.value = dayjs(props.defaultDate).get("M") + 1;
    day.value = dayjs(props.defaultDate).get("D");
    hour.value = dayjs(props.defaultDate).get("h");
    minute.value = dayjs(props.defaultDate).get("m");
    second.value = dayjs(props.defaultDate).get("s");
    const all = [
      getColumnsIndex(years.value, year.value),
      getColumnsIndex(months.value, month.value),
      getColumnsIndex(days.value, day.value),
      getColumnsIndex(hours.value, hour.value),
      getColumnsIndex(minutes.value, minute.value),
      getColumnsIndex(seconds.value, second.value)
    ];
    valueArr.value = {
      second: [...all],
      minute: all.slice(0, -1),
      hour: all.slice(0, -2),
      day: all.slice(0, 3),
      month: all.slice(0, 2),
      year: all.slice(0, 1)
    }[props.field];
  }
  // column change
  function onColumnChange(e: any) {
    const { column, value } = e.detail;
    console.log(value);
    if (value !== undefined) {
      switch (column) {
        case 0:
          year.value = parseInt(years.value[value]);
          break;
        case 1:
          month.value = parseInt(months.value[value]);
          break;
        case 2:
          day.value = parseInt(days.value[value]);
          break;
        case 3:
          hour.value = parseInt(hours.value[value]);
          break;
        case 4:
          minute.value = parseInt(minutes.value[value]);
          break;
        case 5:
          second.value = parseInt(seconds.value[value]);
          break;
      }
    }
  }
  // picker right date change
  function dateChange() {
    emits(
      "dateChange",
      dayjs(
        `${year.value}-${month.value}-${day.value} ${hour.value}:${minute.value}:${second.value}`
      ).format(fmt[props.field])
    );
  }
  // watch props defaultDate
  watch(
    () => props.defaultDate,
    () => {
      initDefaultDate();
    }
  );

  onLoad(() => {
    initDefaultDate();
  });
</script>
