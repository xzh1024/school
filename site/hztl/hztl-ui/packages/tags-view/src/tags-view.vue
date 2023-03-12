<template>
    <div>
        <ul
            ref="elTabs"
            :class="{ 'ht-tags-container': true, 'full-container': moreTags.length }"
        >
            <li
                :class="{ tag: true, active: curRouteKey === tag[tagKey] }"
                :style="{ minWidth: `${tagWidth}px` }"
                v-for="tag in showTags"
                :key="tag[tagKey]"
            >
                <span
                    @click="routeChange(tag)"
                    class="tag-link"
                >{{ tag.disName }}&emsp;</span>
                <span
                    v-if="showTags.length > 1 && viewTags.includes(tag)"
                    @click.stop="closeTag(tag)"
                    class="tag-icon"
                >
                    <i class="el-icon-close" />
                </span>
            </li>
            <li class="tag dropdown-tag">
                <el-dropdown size="small">
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="menu in tagsMenus"
                            :key="menu.command"
                            :command="menu"
                            class="ht-tag-dropdown-item"
                        >
                            <span
                                @click="handleMenuClick(menu)"
                                class="tag-link"
                            >{{
                                menu.name
                            }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item
                            v-if="moreTags.length"
                            divided
                        />
                        <div class="router-tags-container">
                            <el-dropdown-item
                                v-for="tag in [...moreTags]"
                                :key="tag[tagKey]"
                                :command="tag"
                                class="ht-tag-dropdown-item"
                            >
                                <span
                                    @click="routeChange(tag)"
                                    class="tag-link"
                                >{{
                                    tag.disName
                                }}</span>
                                <span
                                    @click.stop="closeTag(tag)"
                                    class="tag-icon"
                                >
                                    <i class="el-icon-close" />
                                </span>
                            </el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from "vue";
import debounce from "throttle-debounce/debounce";
import { mapState, mapActions, mapMutations } from "vuex";

import makeTagsStore from "./store";

export default {
    name: "HtTagsView",
    componentName: "HtTagsView",
    store() {
        return makeTagsStore();
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        // tagKey 支持name、path
        tagKey: {
            type: String,
            default: "name",
        },
        value: {
            type: Array,
            required: true,
        },
        defaultTags: {
            type: Array,
            default() {
                return [];
            },
        },
        addRouteTag: {
            type: Boolean,
            default: true
        },
        formateName: {
            type: Function,
            default: (route) =>
                (route.meta && (route.meta.tagName || route.meta.title)) || route.name,
        },
    },
    data() {
        const tagsMenus = [
            {
                command: "otherClose",
                name: "关闭其它",
            },
        ];
        if (this.defaultTags.length) {
            tagsMenus.push({
                command: "allClose",
                name: "关闭所有",
            });
        }
        return {
            debounceChangeMaxTags: debounce(100, this.changeMaxTags),
            curTab: null,
            tagsMenus,
        };
    },
    computed: {
        ...mapState("routeTags", [
            "storeTagKey",
            "viewTags",
            "moreTags",
            "tagWidth",
        ]),
        flexibleTags() {
            return [...this.viewTags, ...this.moreTags];
        },
        showTags() {
            return [...this.defaultTags, ...this.viewTags] || [];
        },
        curRouteKey() {
            return this.$route[this.storeTagKey];
        },
    },
    watch: {
        $route() {
            this.addRouteTag && this.changeCurTag();
        },
        flexibleTags(value) {
            this.$emit("change", value);
        },
    },
    created() {
        Vue.prototype.closePage = () => {
            this.closeTag(this.$route);
        };
        this.changeTagKey(this.tagKey);
    },
    mounted() {
        this.initTagsData({
            defaultTags: this.defaultTags,
            router: this.$router,
            flexibleTags: this.value,
        });
        window.addEventListener("resize", this.debounceChangeMaxTags);
        if (this.$route.fullPath !== "/") {
            this.changeCurTag();
        }
        this.$nextTick(() => {
            this.changeMaxTags();
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.debounceChangeMaxTags);
    },
    methods: {
        ...mapActions("routeTags", [
            "addTag",
            "closeTag",
            "closeTagByType",
            "changeMaxTagsByWidth",
            "initTagsData",
        ]),
        ...mapMutations("routeTags", ["changeTagKey"]),
        changeCurTag() {
            const params = {
                disName: this.formateName(this.$route),
                name: this.$route.name,
                path: this.$route.path,
                query: this.$route.query || ""
            };
            this.addTag(params);
            this.$emit("cur-tag-change", params);
        },
        handleMenuClick(menu) {
            this.closeTagByType({
                type: menu.command,
                routeKey: this.curRouteKey,
            });
        },
        routeChange(tag) {
            if (tag[this.storeTagKey] === this.curRouteKey) {
                return;
            }
            this.$router.push({
                path: tag.path,
                query: { ...tag.query },
            });
        },
        changeMaxTags() {
            if (this.$el) {
                this.changeMaxTagsByWidth({
                    width: this.$el.offsetWidth,
                    routeKey: this.curRouteKey,
                });
            }
        },
    },
};
</script>
