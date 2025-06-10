import storage from '@u/storage';
import { makeAutoObservable } from 'mobx';

export default class store {
  constructor() {
    makeAutoObservable(this);
  }

  loginUser = '';

  receiptLayoutHeaderTitle = '';

  role = [];
}
