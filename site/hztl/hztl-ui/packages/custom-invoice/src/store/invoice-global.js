
/**
 * 管理全局设置： 如全局字号
 * 
 */

function state() {
    return {
        fontSize: 12
    }
}

const actions = {
    initGlobalData({ commit }, payload) {
        const { fontSize } = payload;
        commit("changeGloBalSetting", {
            fontSize
        });
    }
}

const mutations = {
    changeGloBalSetting(state, payload) {
        for (let key in payload) {
            state[key] = payload[key];
        }
    }
}

export default {
    state,
    mutations,
    actions,
}