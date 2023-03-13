import { ref } from "vue";
import dayjs from "dayjs";

export default function useTimeCountDown(max = 15) {
  let timer: NodeJS.Timer;
  const time = ref("0");
  const status = ref<1 | 2 | 3>(1); //是否在最大值范围内   1:loading 2:存在 3：不在范围内
  const maxSeconds = max * 60;
  const startTime = ref<dayjs.ConfigType>();
  function calcTime() {
    return dayjs().diff(dayjs(startTime.value), "seconds");
  }
  function formatTime() {
    const res = Number(calcTime());
    const calcDiffTime = maxSeconds - res;
    const m = parseInt(`${calcDiffTime / 60}`);
    const s = calcDiffTime % 60;
    time.value = `${m}:${s < 10 ? "0" + s : s}`;
  }
  function validateDuringTime() {
    if (maxSeconds >= calcTime()) {
      formatTime();
      status.value = 2;
    } else {
      status.value = 3;
    }
  }
  function interval(start: dayjs.ConfigType) {
    startTime.value = start;
    if ([1, 2].includes(status.value)) {
      validateDuringTime();
    }
    timer = setInterval(() => {
      if ([1, 2].includes(status.value)) {
        validateDuringTime();
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }
  return [time, status, interval];
}
