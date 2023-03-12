/**
 *
 * 
 * 管理已经添加到模版中数据 
 * state中存储改动数据、optionalField存储原始数据, 采用getters过滤已不再支持数据（配置中祛除列）
 * templateHeader、 templateFooter、templateBody
 * 
 */

import { isSubKey, getBaseKey } from "../until";

function state() {
    return {
        storageTemplateHeader: [],
        storageTemplateBody: [],
        storageTemplateFooter: [],
        storageTemplateTail: []
    }
}

function formaterDetailsFiled(temFiled, baseFiled) {
    /**
     * 
     * 1、数据来源是baseFiled的，额外属性通过baseFiled补全
     * 2、数据来源是可拷贝的（自定义字段），补全type属性为原始key值
     * 3、数据已被原数据移除，则清除数据
     * 
     * */ 
    return temFiled.map(item => {
        const baseData = baseFiled.find(it => it.key === item.key);
        return baseData ? {
            ...baseData,
            ...item,
            isDetails: true,
        } : (isSubKey(item.key) ? {
            ...item,
            isDetails: true,
            type: getBaseKey(item.key)
        } : null);
    }).filter(item => item);
}

const getters = {
    templateHeader(state, getters, rootState) {
        const { baseDetalisFiles } = rootState.invoice.optionalField;
        return formaterDetailsFiled(state.storageTemplateHeader, baseDetalisFiles)
    },
    templateFooter(state, getters, rootState) {
        const { baseDetalisFiles } = rootState.invoice.optionalField;
        return formaterDetailsFiled(state.storageTemplateFooter, baseDetalisFiles)
    },
    templateTail(state, getters, rootState) {
        const { baseTailFiles } = rootState.invoice.optionalField;
        return formaterDetailsFiled(state.storageTemplateTail, baseTailFiles)
    },
    templateBody(state, getters, rootState) {
        /**
             * 
             * 1、数据来源是baseFiled的，额外属性通过baseFiled补全、宽度默认100
             * 2、数据已被原数据移除，则清除数据
             * 
        * */ 
        const { baseTableFiles } = rootState.invoice.optionalField;

        return state.storageTemplateBody.map(temData => {
            return {
                ...temData,
                content: temData.content.map(item => {
                    let baseData;
                    baseTableFiles.forEach(base => {
                        if (!baseData) {
                            base.soureFile === temData.soureFile && base.content.forEach(it => {
                                if (it.key === item.key) {
                                    baseData = it;
                                }
                            })
                        }
                    })
                    return baseData ? {
                        ...baseData,
                        ...item,
                        width: item.width || 100,
                        name: baseData.name
                    } : null;
                }).filter(item => item)
            }
        })
    }
}

const actions = {
    setTemDataSource({ state, rootState }, content) {
        const { baseTableFiles } = rootState.invoice.optionalField;
        const firstData = content.templateBody && content.templateBody[0];
        state.storageTemplateHeader = content.templateHeader || [];
        state.storageTemplateFooter = content.templateFooter || [];
        state.storageTemplateTail = content.templateTail || [];
        state.storageTemplateBody = firstData && firstData.soureFile ? content.templateBody : baseTableFiles.map(item => ({
            ...item,
            content: content.templateBody || []
        })) || [];
    },
}


const mutations = {
    changeTemplateHeader(state, data) {
        state.storageTemplateHeader = data;
    },
    changeTemplateBody(state, data) {
        state.storageTemplateBody = data;
    },
    changeTemplateFooter(state, data) {
        state.storageTemplateFooter = data;
    },
    changeTemplateTail(state, data) {
        state.storageTemplateTail = data;
    },
}


export default {
    state,
    getters,
    actions,
    mutations,
}