
/**
 * 管理徽章
 * 
 */

import { printLogoKey, logoTypes } from "../constants";

const defaultLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA19JREFUaAXtm01PE0EYx/+7bMG2BCnWlkYgXIxg4kuCJAgfwItnL15NTEz4BJxMPBgv3jx59qAeNH4A40FNtFVjomlUAiElWBdbwNKWdgX3WTPNUJZtFwYapvMkzfPMy7LPb/470+mG0bZsg20rKyvIZrMoFovY3NykqiNvuq4jFAohHo+jt7fX4dEIOJPJOLBHntADgKAHBgZgMGU9+krRRE9vd3c3dAraxYjVoDnL29jYGF888nEqlaoxEKsuywJVo/IIiFX3aJeySQFLKSsHZXBxS0La95imieXlZZTLZXR0dDibhEQigc7OTuE5tRx4fn4euVyuBmZZlgNP+4ORkRF0dXXV2kQELZ3D+Xx+GywPROALCwt8lZC45cBeFGtrayBwkdZS4Eql0pClWq027OOnQ0uBm1mUAoGAH56GfYUB/6n8bXiz+g6RSKS+alu5p6cHhiF2XRUC/ODzb5x/9A33P5ooW83/libgvr6+bZCsQKBDQ0OsKMzvG5hgb7+zXxxYW7ibMjH1dBbPZlebTnB4eBiDg4MIBoPQNM1RNBqNYnR0VPhXEiW1r+eFwfJ0mUIVN18u4uHXHO5M9OPiySDfvCMmyFgs5nx2NB5AxZ4VdoPl83ufLeHK8zlMv1rEz3WxKy1/H7/xnoAbwfJJPP6+istPfvie3/zfEBn7BvYDyxJl83vSBvczv9n1Ir0v4L3A8skurlvO/L76Yg6fzBLfdGhx04vWfmF5Ija/r50+jplLMfSHvTcX9Isqnd/Am6UiXi+twyxZmOgPYSoRxng8hHCged20ZDLpvJdmCbm90xIJy+7DfMjQMH0hilvnTuCY8T/xesC3Nmhuw31jY1/ufBNMJtwHgH+nRfdsCHyQsAya/KmwgetnIviSK8MLkL/GLeYHYGY8jnpgz0f6sGApcZrf9z6Ybgy+6uz9D5K/Ss6HgOtt14f/MGHrkzrI8q7AtF2U0XYFlhGWmBSwrMoyLqUwGwlZvVJYVmUZl1KYjYSsXiksq7KMSynMRkJWrxSWVVnGpRRmIyGrVwrLqizjUgqzkZDVK4VlVZZxKYXZSMjq205hg466uP1XfPbGWelEJlYtnU5vFQoF6eDcgJxTLXSep12MWHU6sdUO0MRIrM7JNFKYHdiS/SjeP3ZTT/xSD7+AAAAAAElFTkSuQmCC";

function state() {
    return {
        isShow: false,
        logoType: logoTypes.system,
        customUrl: "",
        position: {
            top: 0,
            left: 0,
        }
    }
}
const getters = {
    logoUrl(state, getters, rootState) {
        return state.logoType === logoTypes.system ? (rootState.invoice.showSample ? defaultLogo : getters.detalisData.companyEmblem) : state.customUrl
    }
}

const actions = {
    switchShowLogo({ state, commit }, isShow = false) {
        state.isShow = isShow;
        if (isShow) {
            commit("setCurEditKey", printLogoKey)
        }
    },
    setLogoData({ commit, dispatch }, payload = {}) {
        const { isShow, logoType, customUrl, position } = payload;
        dispatch("switchShowLogo", isShow)
        commit("changeLogoType", logoType)
        commit("changeCustomLogoUrl", customUrl)
        commit("changeLogoPosition", position)
    },
}

const mutations = {
    changeCustomLogoUrl(state, customUrl = "") {
        state.customUrl = customUrl;
    },
    changeLogoType(state, logoType) {
        state.logoType = logoType || state.logoType;
    },
    changeLogoPosition(state, position = {}) {
        let { top = 0, left = 0 } = position;
        state.position = {
            top,
            left
        };
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}