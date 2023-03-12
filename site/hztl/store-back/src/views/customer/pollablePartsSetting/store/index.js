import Vue from "vue";
import Vuex from "vuex";
import { PollablePartsSettingApi } from '../services'
const pollablePartsSettingApi = new PollablePartsSettingApi();

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    priceTypes: []
  },
  actions: {
    getPriceTypes({ state }) {
      pollablePartsSettingApi.getPriceTypesReq({ type: 'priceType' })
        .then(function(res) {
            state.priceTypes = res && res.length ?
              [{ Code: "all", name: "全部" }, ...res].map(item => ({ ...item, code: item.name }))
              : [];
        })
    }
  }
});

export default store;
