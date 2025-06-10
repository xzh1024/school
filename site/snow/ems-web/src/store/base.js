import { makeAutoObservable, observable } from 'mobx';

export default class Store {
  constructor() {
    makeAutoObservable(this);
  }
}
