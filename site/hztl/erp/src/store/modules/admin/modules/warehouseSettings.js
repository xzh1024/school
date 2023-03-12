export default {
  namespaced: true,
  state: {
    warehousesInfo: {
      warehouseId: 0,
      wareareaId: 0,
      shelfId: 0,
      layerId: 0,
      positionId: 0,
      isBuiltin: false
    }
  },
  actions: {},
  mutations: {
    clearData(state) {
      state.warehousesInfo.warehouseId = 0;
      state.warehousesInfo.wareareaId = 0;
      state.warehousesInfo.shelfId = 0;
      state.warehousesInfo.layerId = 0;
      state.warehousesInfo.positionId = 0;
    },
    changewarehouseId(state, data) {
      state.warehousesInfo.warehouseId = data;
      state.warehousesInfo.wareareaId = 0;
      state.warehousesInfo.shelfId = 0;
      state.warehousesInfo.layerId = 0;
      state.warehousesInfo.positionId = 0;
    },
    changeWareareasId(state, data) {
      state.warehousesInfo.wareareaId = data;
      state.warehousesInfo.shelfId = 0;
      state.warehousesInfo.layerId = 0;
      state.warehousesInfo.positionId = 0;
    },
    changeshelfId(state, data) {
      state.warehousesInfo.shelfId = data;
      state.warehousesInfo.layerId = 0;
      state.warehousesInfo.positionId = 0;
    },
    changelayerId(state, data) {
      state.warehousesInfo.layerId = data;
      state.warehousesInfo.positionId = 0;
    },
    changePositionId(state, data) {
      state.warehousesInfo.positionId = data;
    },
    changeBuiltin(state, data) {
      state.warehousesInfo.isBuiltin = data;
    }
  }
};
