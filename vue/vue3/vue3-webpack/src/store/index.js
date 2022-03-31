import { createStore } from 'vuex';
import getters from '@/store/getters';
import app from './modules/app.js';

export default createStore({
  // state: {},
  getters,
  // mutations: {},
  // actions: {},
  modules: {
    app
  }
});
