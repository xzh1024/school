
/**
 * 管理可以添加到表单字段
 * 兼容旧数据，key值未设置时取name属性
 *  
 */

import { copyHeaders, isSubKey } from "../until";

const defaultTableFile = "details";

function state() {
    return {
        baseDetalisFiles: [],
        baseTableFiles: [],
        baseTailFiles: []
    }
}

const getters = {
    altDetalisFiles(state, getters) {
        return [...state.baseDetalisFiles
            .filter(item =>
                isSubKey(item.key)
                || ![
                    ...getters.templateHeader,
                    ...getters.templateFooter
                ].find(it => it.key === item.key)
            )]
    },
    altTailFiles(state, getters) {
        return state.baseTailFiles && [...state.baseTailFiles
            .filter(item =>
                isSubKey(item.key)
                || ![
                    ...getters.templateTail,
                ].find(it => it.key === item.key)
            )]
    },
    altTableFiles(state, getters) {
        return state.baseTableFiles.map(base => {
            return {
                ...base,
                content: base.content.filter(item => {
                    const curTem = getters.templateBody.find(item => item.soureFile === base.soureFile);
                    return curTem && !curTem.content.find(it => it.key === item.key)
                })
            }
        })
    },
}

const commonDetalisFiles = [{
    name: "单据标题",
    key: "defaultTitle",
    type: "defaultTitle",
    width: 4,
    fontSize: 16,
    textAlign: "center",
    isBold: true
},
{
    name: "打印时间",
    key: "defaultDate",
    type: "defaultDate",
    width: 4,
    fontSize: 12,
    textAlign: "right"
}];

const mutations = {
    setBaseFiles(state, baseFiles) {
        if (!baseFiles || !baseFiles.baseDetalisFiles || !baseFiles.baseTableFiles) {
            console.error("baseFiles 参数缺失", baseFiles)
            state.baseDetalisFiles = []
            state.baseTableFiles = [
                {
                    tableName: "",
                    soureFile: defaultTableFile,
                    content: []
                }
            ]
        } else {
            state.baseDetalisFiles = [
                ...baseFiles.baseDetalisFiles.map(item => ({
                    ...item,
                    key: `details-${item.key || item.file}`,
                    width: item.width || 1
                })),
                ...commonDetalisFiles,
                ...copyHeaders
            ];

            state.baseTailFiles = baseFiles.baseTailFiles ? [
                ...baseFiles.baseTailFiles.map(item => ({
                    ...item,
                    key: `tail-${item.key || item.file}`,
                    width: item.width || 1
                })),
                ...copyHeaders
            ] : [];
            // 兼容单表格
            const firstData = baseFiles.baseTableFiles && baseFiles.baseTableFiles[0];
            if (firstData && firstData.soureFile) {
                state.baseTableFiles = baseFiles.baseTableFiles.map(item => ({
                    ...item,
                    content: item.content.map(it => ({
                        ...it,
                        key: `table-${item.soureFile}-${it.key || it.file}`
                    })) || []
                }));
            } else {
                state.baseTableFiles = [{
                    tableName: "",
                    soureFile: defaultTableFile,
                    content: baseFiles.baseTableFiles.map(item => ({
                        ...item,
                        key:  `table-${defaultTableFile}-${item.key || item.file}`
                    })) || []
                }];
            }
        }
    },
}


export default {
    state,
    getters,
    mutations,
}