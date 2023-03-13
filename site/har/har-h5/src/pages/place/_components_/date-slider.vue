<template>
  <view class="date-slider-box">
    <swiper class="swiper-box">
      <swiper-item
        v-for="(item, index) in dateArr"
        :key="index"
        class="swiper-item-box"
      >
        <view
          v-for="(sub, i) in item"
          :key="i"
          class="date-cell"
          :class="props.chooseDate === sub.date ? '' : 'padding-top-2'"
          @click="onChooseDate(sub)"
        >
          <view :class="props.chooseDate === sub.date ? 'text-sm' : ''">{{
            sub.monthDay
          }}</view>
          <view
            class="margin-top-6"
            :class="props.chooseDate === sub.date ? 'text-sm' : ''"
            >{{ sub.weekDay }}</view
          >
          <view v-if="props.chooseDate === sub.date" class="i-solid"></view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import dayjs from "dayjs";

  const emits = defineEmits(["getDate"]);

  const props = defineProps({
    chooseDate: {
      type: String,
      default: dayjs().format("YYYY-MM-DD")
    }
  });

  const onChooseDate = (item) => {
    //向上提交当前选择的日期
    if (item.date === props.chooseDate) return;
    emits("getDate", item.date);
  };

  const dateArr = ref([]);
  onMounted(() => {
    dateArr.value = getThirtyArr(7);
  });

  /**
   * 分割数据
   * @param arr
   * @param splitLength
   * @returns {*[]}
   */
  const splitArr = (arr, splitLength) => {
    const newArr = [];
    while (arr.length > 0) {
      const tempArr = arr.splice(0, splitLength);
      newArr.push(tempArr);
    }
    return newArr;
  };

  /**
   * 获取当前日期+指定天数的日期数组
   * @param daysNum
   * @returns {*[]}
   */
  const getThirtyArr = (daysNum = 30) => {
    const arr = [];
    for (let i = 0; i < daysNum; i++) {
      const date = dayjs().add(i, "day").format("YYYY-MM-DD");
      arr.push({
        date,
        monthDay: dayjs(date).format("MM") + "-" + dayjs(date).format("DD"),
        weekDay: formatWeekDay(date)
      });
    }
    return splitArr(arr, 5);
  };

  /**
   * 格式化星期
   * @param date
   * @returns {*|string}
   */
  const formatWeekDay = (date) => {
    const weekDayNum = dayjs(date).day();
    let weekDayName = weekDayArr.find((item) => item.value === weekDayNum).name;
    if (isNextDayByNum(date)) {
      weekDayName = "今天";
    }
    if (isNextDayByNum(date, 1)) {
      weekDayName = "明天";
    }
    if (isNextDayByNum(date, 2)) {
      weekDayName = "后天";
    }
    return weekDayName;
  };

  const isNextDayByNum = (date, num = 0) => {
    const nowDate = dayjs(date).format("YYYY-MM-DD");
    const numDate = dayjs().add(num, "day").format("YYYY-MM-DD");
    return nowDate === numDate;
  };

  const weekDayArr = [
    {
      name: "周一",
      value: 1
    },
    {
      name: "周二",
      value: 2
    },
    {
      name: "周三",
      value: 3
    },
    {
      name: "周四",
      value: 4
    },
    {
      name: "周五",
      value: 5
    },
    {
      name: "周六",
      value: 6
    },
    {
      name: "周日",
      value: 0
    }
  ];
</script>

<style scoped lang="scss">
  .text-sm {
    font-size: 28rpx;
  }
  .margin-top-6 {
    margin-top: 6rpx;
  }
  .padding-top-2 {
    padding-top: 6rpx;
  }
  .date-slider-box {
    width: 100%;
    .swiper-box {
      height: 106rpx;
      .swiper-item-box {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(5, 20%);
        .date-cell {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #666666;
          font-size: 24rpx;
          .i-solid {
            width: 44rpx;
            height: 4rpx;
            background: #fb5f05;
            border-radius: 4rpx;
            margin-top: 4rpx;
          }
        }
      }
    }
  }
</style>
