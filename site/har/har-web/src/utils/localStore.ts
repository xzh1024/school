//todo  后续替换为useRequest 缓存

/**
 *
 *  dic  数据字典表
 *  local  form表单缓存处理
 * */

class LocalStore {
  private db: IDBDatabase | undefined;

  private ready: any;

  private version = 2;

  constructor() {
    this.init();
  }

  init() {
    this.ready = new Promise((res, rej) => {
      const request = window.indexedDB.open(
        'har-cbd-web',
        import.meta.env.VITE_LOCAL_STORE_VERSION || this.version
      );
      request.onerror = () => {
        console.log('数据库打开报错');
        rej();
      };
      request.onsuccess = (event: any) => {
        this.db = event?.target?.result;
        // console.log('数据库打开成功');
        res(event);
      };
      request.onupgradeneeded = (event: any) => {
        // console.log('数据库更新');
        this.db = event?.target?.result;
        if (!this.db) return;
        if (!this.db?.objectStoreNames.contains('dic')) {
          const objectStore = this.db?.createObjectStore('dic', {
            autoIncrement: true,
            keyPath: 'key'
          });
          objectStore.createIndex('key', 'key', { unique: true }); // 创建 id 索引，具有唯一性
        }
        if (!this.db?.objectStoreNames.contains('local')) {
          const objectStore = this.db?.createObjectStore('local', {
            autoIncrement: true,
            keyPath: 'key'
          });
          objectStore.createIndex('key', 'key', { unique: true }); // 创建 id 索引，具有唯一性
        }
      };
    });
  }

  async setLocal(
    name: string,
    key: string,
    value: any,
    expireTime?: number
  ): Promise<any> {
    await this.ready;
    try {
      const res = await this.getLocal(name, key);
      // console.log(res, res === undefined, 'setLocal',expireTime);
      if (res === undefined) {
        await this.addLocal(name, key, value, expireTime);
      } else {
        await this.updateLocal(name, key, value, expireTime);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async addLocal(
    name: string,
    key: string,
    value: any,
    expireTime?: number | undefined
  ): Promise<any> {
    await this.ready;
    // console.log('addLocal', this.db);
    return new Promise((resolve, reject) => {
      const request = this.db
        ?.transaction([name], 'readwrite')
        .objectStore(name)
        .add({
          key,
          version: this.version,
          value,
          expireTime,
          creatTime: new Date().getTime()
        });
      if (request) {
        request.onsuccess = () => {
          // console.log('数据写入成功');
          resolve(true);
        };
        request.onerror = () => {
          console.log('数据写入失败');
          reject();
        };
      } else {
        reject();
      }
    });
  }

  async getLocal(name: string, key: string): Promise<any> {
    await this.ready;
    return new Promise((resolve, reject) => {
      const objectStore = this.db?.transaction([name]).objectStore(name);
      const request = objectStore?.get(key);
      if (request) {
        request.onerror = () => {
          console.log('事务失败');
          reject();
        };
        request.onsuccess = () => {
          const res = request.result;
          // console.log('事务查询成功', res, e.target);
          /*const { version = '', expireTime, createTime } = res || {};
          if (version === this.version) {
            console.log(
              dayjs().diff(dayjs(createTime)),
              expireTime,
              'expireTimeExpireTime'
            );
            if (dayjs().diff(dayjs(createTime)) > expireTime) {
              resolve(undefined);
            } else {
              resolve(res);
            }
          } else {
            resolve(undefined);
          }*/
          resolve(res);
        };
      } else {
        reject();
      }
    });
  }

  async updateLocal(
    name: string,
    key: string,
    value: any,
    expireTime: number | undefined
  ) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const request = this.db
        ?.transaction([name], 'readwrite')
        .objectStore(name)
        .put({
          key,
          version: this.version,
          value,
          expireTime,
          createTime: new Date().getTime()
        });
      if (request) {
        request.onsuccess = () => {
          // console.log('数据更新成功');
          resolve(true);
        };
        request.onerror = () => {
          console.log('数据更新失败');
          reject();
        };
      } else {
        reject();
      }
    });
  }

  async deleteLocal(name: string, key: string) {
    await this.ready;
    return new Promise((resolve, reject) => {
      const request = this.db
        ?.transaction([name], 'readwrite')
        .objectStore(name)
        .delete(key);
      if (request) {
        request.onsuccess = () => {
          console.log('数据更新成功');
          resolve(true);
        };
        request.onerror = () => {
          console.log('数据更新失败');
          reject();
        };
      } else {
        reject();
      }
    });
  }
}

export default new LocalStore();
