class lsStore {
  private readonly version: string;
  private publicKey: string;
  constructor() {
    this.version = import.meta.env.VITE_LOCAL_STORE_VERSION || '1.0.0';
    this.publicKey = 'har';
  }
  setItem<T>(key: string, value: T) {
    const all = this.getLocalAll() || {};
    const p: Record<string, any> = {
      version: this.version,
      content: all
    };
    p.content[key] = value;
    localStorage.setItem(this.publicKey, JSON.stringify(p));
  }
  getItem(key: string) {
    const all = this.getLocalAll();
    if (all) {
      const keyArr: Array<string> = key.split('.');
      let res: any = all;
      let index = 0;
      while (keyArr[index]) {
        res = res[keyArr[index]];
        ++index;
      }
      return res;
    }
    return undefined;
  }
  getLocalAll(): Record<string, any> | undefined {
    const all = localStorage.getItem(this.publicKey) || '{}';
    const { version, content = {} } = JSON.parse(all);
    if (this.validateVersion(version)) {
      return content;
    }
    return undefined;
  }
  validateVersion(version: string): boolean {
    return version === this.version;
  }
  setPublicKey(key: string): void {
    this.publicKey = key;
  }
}

export default new lsStore();
