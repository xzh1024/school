import { AreaModel } from "@/common/interface/commonInterface";

interface CityStateModel {
  activeAreaCity: AreaModel | "";
  indexActiveAreaCity: AreaModel | "";
}

export default {
  namespaced: true,
  state: {
    activeAreaCity: ""
  },
  getters: {
    activeAreaCity: (state: CityStateModel) => {
      return state.activeAreaCity;
    }
  },
  mutations: {
    setActiveAreaCity(state: CityStateModel) {
      if (sessionStorage.activeAreaCity) {
        state.activeAreaCity = JSON.parse(sessionStorage.activeAreaCity);
      } else {
        state.activeAreaCity = "";
      }
    }
  }
};
