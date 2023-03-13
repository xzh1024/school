export default function useThrottle() {
  let timer: NodeJS.Timeout;
  let flag = true;

  function throttle(fn: () => any, delay = 1000) {
    if (timer) clearTimeout(timer);
    if (flag) {
      flag = false;
      fn();
    }
    timer = setTimeout(() => {
      flag = true;
    }, delay);
  }

  return throttle;
}
