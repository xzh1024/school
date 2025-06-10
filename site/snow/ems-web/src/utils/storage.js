
export default {
  set(key, value, type = 'localStorage') {
    return new Promise((resolve, reject) => {
      if (window[type]) {
        value = typeof value === 'string' ? value : JSON.stringify(value);
        window[type].setItem(key, value);
        resolve(value);
      } else {
        reject(new Error(`Your browser does not support ${type}`));
      }
    });
  },
  get(key, type = 'localStorage') {
    if (window[type]) {
      return window[type].getItem(key);
    } else {
      throw new Error(`Your browser does not support ${type}`);
    }
  },
  remove(keys, type = 'localStorage') {
    if (window[type]) {
      if (Array.isArray(keys)) {
        for (const key in keys) {
          window[type].removeItem(key);
        }
      } else {
        window[type].removeItem(keys);
      }
    } else {
      throw new Error(`Your browser does not support ${type}`);
    }
  },
};
