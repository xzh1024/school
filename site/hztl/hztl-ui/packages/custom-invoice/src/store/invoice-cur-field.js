
/**
 * 管理当前编辑字段
 * 
 *  
 */

import { flatten } from "lodash";

function state() {
    return {
        curEditKey: null,
    }
}

const actions = {
    changeCurSetting({ commit, state, getters }, payload) {
        const { templateHeader, templateBody, templateFooter, templateTail } = getters;
        if (templateHeader.find(item => item.key === state.curEditKey)) {
            commit("changeTemplateHeader", templateHeader.map(item => {
                return item.key === state.curEditKey ? {
                    ...item,
                    ...payload
                } : item;
            }))
        } else if (templateFooter.find(item => item.key === state.curEditKey)) {
            commit("changeTemplateFooter", templateFooter.map(item => {
                return item.key === state.curEditKey ? {
                    ...item,
                    ...payload
                } : item;
            }))
        } else if (templateTail.find(item => item.key === state.curEditKey)) {
            commit("changeTemplateTail", templateTail.map(item => {
                return item.key === state.curEditKey ? {
                    ...item,
                    ...payload
                } : item;
            }))
        } else if (flatten(templateBody.map(item => item.content)).find(item => item.key === state.curEditKey)) {
            commit("changeTemplateBody", templateBody.map(it => ({
                ...it,
                content: it.content.map(item => {
                    return item.key === state.curEditKey ? {
                        ...item,
                        ...payload
                    } : item;
                })
            })))
        }
    },
}

const getters = {
    curEdit(state, getters) {
        const { templateHeader, templateBody, templateFooter, templateTail } = getters;
        return [...templateHeader, ...templateFooter, ...templateTail].find(item => item.key === state.curEditKey) || flatten(templateBody.map(item => item.content)).find(item => item.key === state.curEditKey);
    }
}

const mutations = {
    setCurEditKey(state, curEditKey) {
        state.curEditKey = curEditKey;
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}