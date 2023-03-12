
function state() {
    return {
        backDetalisData: {},
        backTableTable: {}
    }
}

const getters = {
    detalisData(state, getters, rootState) {
        const {baseDetalisFiles, baseTailFiles} = rootState.invoice.optionalField;
        const allBaseData =  [...baseTailFiles, ...baseDetalisFiles];
        if (rootState.invoice.showSample) {
            const detalisData = {
                printCount: 0,
                companyName: "[公司名称]"
            }
            allBaseData.forEach(item => {
                if (item.file) {
                    detalisData[item.file] = `[${item.sampleData || item.name}]`
                }
            })
            return detalisData;
        }
        return state.backDetalisData;
    },
    tableData(state, getters, rootState) {
        if (rootState.invoice.showSample) {
            let tableData = {}
            rootState.invoice.optionalField.baseTableFiles.forEach(item => {
                tableData[item.soureFile] = [{}]
                item.content.forEach(it => {
                    {
                        tableData[item.soureFile][0][it.file] = it.sampleData || it.name;
                    }
                });
            })
            return tableData;
        }
        return state.backTableTable;
    }
}

const mutations = {
    setDataSource(state, invoiceData) {
        state.backDetalisData = invoiceData && invoiceData.header || {};
        state.backTableTable = invoiceData || {};
    }
}

export default {
    state,
    getters,
    mutations,
}