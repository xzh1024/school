import fs from 'fs';
import { resolve } from 'path';

export default class Settings {
  private readonly dir: string;
  private data: any;
  constructor(dir: string) {
    this.dir = dir;
    this.data = null;
    this.getFileData();
  }
  public get settingsJSON() {
    return resolve(this.dir, './index.json');
  }
  getFileData() {
    try {
      this.data = fs.readFileSync(this.settingsJSON, 'utf-8');
      // console.log(this.data);
    } catch (e) {
      console.error(e);
    }
  }
  getResData() {
    return this.data;
  }
}
