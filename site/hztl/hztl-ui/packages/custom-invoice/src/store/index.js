import Vuex from "vuex";

import invoiceGlobal from "./invoice-global";
import curEditField from "./invoice-cur-field";
import invoiceData from "./invoice-data";
import invoiceLogo from "./invoice-logo";
import invoiceTem from "./invoice-tem";
import optionalField from "./optional-field";

function state() {
    return {
        showSample: true,       // 模版展示还是数据展示
        typeEmun: {},           // 模版类型与单据名称映射         
        type: "",               // 模版类型
        name: "",
        id: 0
    }
}

const getters = {
    typeName(state) {
        return state.typeEmun[state.type];
    }
}

const actions = {
    async initStoreData({ commit, dispatch }, payload) {
        const { typeEmun, baseFiles, temData, showSample, invoiceData } = payload;
        
        await commit("setShowSample", showSample);
        await commit("setBaseFiles", baseFiles);
        await commit("setTypeEmun", typeEmun);
        await dispatch("initTemData", temData);
        await commit("setDataSource", invoiceData);
    },
    async initTemData({ state, dispatch, commit }, templateData) {
        const content = templateData.content ? JSON.parse(templateData.content) : {};
        const { name, id, type } = templateData;
        state.name = name;
        state.id = id;
        state.type = type;
        dispatch("initGlobalData", content.invoiceGlobal || {
            fontSize: content.fontSize ? content.fontSize : 12,
        })
        dispatch("setTemDataSource", content);
        dispatch("setLogoData", content.invoiceLogo);

        // 模版重设置后祛除旧key
        commit("setCurEditKey", null);
    },
}

const mutations = {
    setShowSample(state, showSample = true) {
        state.showSample = showSample;
    },
    setTypeEmun(state, typeEmun) {
        state.typeEmun = typeEmun;
    },
    changeInvoiceName(state, name) {
        state.name = name;
    },
}

const invoiceModules = {
    modules: {
        invoice: {
            namespaced: true,
            state,
            getters,
            actions,
            mutations,
            modules: {
                invoiceGlobal,
                optionalField,
                invoiceTem,
                invoiceLogo,
                curEditField,
                invoiceData,
            }
        },
    }
}

export default function makeInvoiceStore() {
    return new Vuex.Store({
        ...invoiceModules
    });
}