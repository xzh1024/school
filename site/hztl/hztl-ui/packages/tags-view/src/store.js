import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let router;
let defaultTags;

function baseState() {
    return {
        storeTagKey: "name",
        tagWidth: 140,
        maxLength: 10,
        defaultTags: [],
        viewTags: [],
        moreTags: [],
    };
}

const actions = {
    async addTag({ state, commit }, payload) {
        if (
            defaultTags.find(
                (item) => item[state.storeTagKey] === payload[state.storeTagKey]
            )
        ) {
            // 跳转目标在默认tag中，不做任何处理
            return;
        }
        let allTags = [...state.viewTags, ...state.moreTags];
        const curIndex = allTags.findIndex(
            (item) => item[state.storeTagKey] === payload[state.storeTagKey]
        );
        if (curIndex >= 0) {
            //当前是已经打开路由
            if (state.maxLength < curIndex + 1 + defaultTags.length) {
                // 在隐藏部分则放到显示列前部
                allTags.splice(curIndex, 1);
                allTags.unshift(payload);
            } else {
                // 在显示列，则替换
                allTags.splice(curIndex, 1, payload);
            }
        } else {
            // 当前路由未打开，添加到前
            allTags.unshift(payload);
        }
        await commit("updateTags", allTags);
    },
    async closeTag({ state, commit }, payload) {
        let allTags = [...state.viewTags, ...state.moreTags];
        const { currentRoute } = router;
        allTags = allTags.filter(
            (tag) => tag[state.storeTagKey] !== payload[state.storeTagKey]
        );
        if (currentRoute[state.storeTagKey] === payload[state.storeTagKey]) {
            if (allTags.length) {
                const firstRoute = allTags[0];
                router.push({ path: firstRoute.path, query: { ...firstRoute.query } });
            } else {
                router.push("/");
            }
        }
        await commit("updateTags", allTags);
    },
    async closeTagByType({ state, commit }, payload) {
        let allTags = [...state.viewTags, ...state.moreTags];
        switch (payload.type) {
            case "otherClose":
                allTags = allTags.filter(
                    (item) => item[state.storeTagKey] === payload.routeKey
                );
                break;
            case "allClose":
                allTags = [];
                router.push("/");
                break;
        }
        await commit("updateTags", allTags);
    },
    async changeMaxTagsByWidth({ state, commit }, payload) {
        const maxLength = Math.floor((payload.width - 30) / state.tagWidth);
        const allTags = [...state.viewTags, ...state.moreTags];
        const curIndex = allTags.findIndex(
            (item) => item.name === payload.routeKey
        );
        if (curIndex >= 0) {
            if (maxLength < curIndex + 1 + defaultTags.length) {
                // 如果调整后当前页在隐藏部分则放到显示列前部
                allTags.unshift(...allTags.splice(curIndex, 1));
            }
        }
        state.maxLength = maxLength;
        await commit("updateTags", allTags);
    },
    async initTagsData({ state, commit }, payload) {
    // 初始化必须传router、defaultTags
        router = payload.router;
        defaultTags = payload.defaultTags || [];

        let allTags = payload.flexibleTags;
        // 过滤掉失效缓存
        allTags = allTags.filter((item) => {
            const route = router.match(item.path);
            return (
                !defaultTags
                    .map((it) => it[state.storeTagKey])
                    .includes(item[state.storeTagKey]) &&
                item.disName &&
                route &&
                route.matched &&
                route.matched.length
            );
        });
        await commit("updateTags", allTags);
    },
    async clearTags({ state, commit }) {
        state.viewTags = [];
        state.moreTags = [];
        await commit("updateTags");
    },
};

const mutations = {
    updateTags(state, payload) {
        const allTags = payload || [...state.viewTags, ...state.moreTags];
        state.viewTags = allTags.splice(0, state.maxLength - defaultTags.length);
        state.moreTags = allTags;
    },
    changeTagKey(state, payload) {
        state.storeTagKey = payload;
    },
};

const tagsModules = {
    modules: {
        routeTags: {
            namespaced: true,
            state: baseState,
            actions,
            mutations,
        },
    },
};

export default function makeTagsStore() {
    return new Vuex.Store({ ...tagsModules });
}
