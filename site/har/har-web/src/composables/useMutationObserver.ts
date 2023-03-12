import { MaybeElementRef, tryOnScopeDispose, unrefElement } from '@har/use';
import { watch } from 'vue';

export function useMutationObserver(
  target: MaybeElementRef,
  callback: MutationCallback,
  options: MutationObserverInit
) {
  const supported = 'MutationObserver' in window;
  if (!supported) return () => {};
  let observer: MutationObserver | undefined;
  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  }
  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();
      if (el) {
        observer = new MutationObserver(callback);
        observer.observe(el, options);
      }
    }
  );
  function stop() {
    cleanup();
    stopWatch();
  }
  tryOnScopeDispose(stop);
  return stop;
}
