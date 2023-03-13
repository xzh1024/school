import {
  MayBeRef,
  StorageLike,
  StorageOptions,
  useStorage as useCoreStorage
} from "@har/use";

const storage: StorageLike = {
  getItem(key) {
    const { keys } = uni.getStorageInfoSync();
    return keys.includes(key) ? uni.getStorageSync(key) : null;
  },
  setItem(key, value) {
    uni.setStorageSync(key, value);
  },
  removeItem(key) {
    uni.removeStorageSync(key);
  }
};

export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MayBeRef<T>,
  options: StorageOptions<T> = {}
) {
  return useCoreStorage(key, initialValue, storage, options);
}
