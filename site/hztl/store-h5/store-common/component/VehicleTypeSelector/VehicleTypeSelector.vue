<template>
    <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '65%' }"
    >
        <div class="content">
            <div class="operation">
                <van-nav-bar
                    :title="'选择' + searchTypes[currentSearchType].name"
                    @click-left="cancel"
                    @click-right="confirm"
                >
                    <span slot="left">取消</span>
                    <span class="to-confirm" slot="right">确定</span>
                </van-nav-bar>
                <van-search
                    v-model="searchKey"
                    :placeholder="'请输入您要搜索的' + searchTypes[currentSearchType].name"
                />
                <p class="seleted-text" v-if="currentSearchType != 0">{{ selectedText(selected) }}</p>
            </div>
            <van-cell-group class="selector">
                <van-cell
                    v-for="(value, index) in toSelects"
                    :key="index"
                    v-if="!searchFilter(value)"
                    @click="select(value)"
                >
                    <div>
                        {{ valueText(value) }}
                    </div>
                    <div v-if="value && value.tips" class="tips">
                        {{ value.tips }}
                    </div>
                </van-cell>
            </van-cell-group>
        </div>
    </van-popup>
</template>

<script>
import Vue from 'vue';
import request, { URL_MODULE } from "@/request";
import { Popup, NavBar, Search, Cell, CellGroup } from 'vant';
Vue.use(Popup).use(NavBar).use(Search).use(Cell).use(CellGroup);

export default {
    data() {
        return {
            show: false,
            dataService: "mj",
            currentSearchType: 0,
            searchKey: "",
            toSelects: [],
            cacheToSelects: [],
            selected: {},
            confirmFunc: function(){},
            cancelFunc: function(){},
            failFunc: function(){},
        };
    },
    computed: {
        isBeMai() {
            return this.dataService === "bmy";
        },
        searchTypes() {
            let arr = [
                {
                    name: "汽车厂牌",
                    type: "factoryBrand"
                },
                {
                    name: "车系",
                    type: "series"
                },
                {
                    name: "年款",
                    type: "year"
                },
                {
                    name: "排量和变速器",
                    type: "combine"
                }
            ]
            if (this.isBeMai) {
                arr = [
                    {
                        name: "汽车品牌",
                        type: "brand"
                    },
                    {
                        name: "车系",
                        type: "series"
                    },
                    {
                        name: "年款",
                        type: "model"
                    },
                    {
                        name: "销售车型",
                        type: "combine"
                    }
                ]
            }
            return arr;
        }
    },
    mounted(){
        let _this = this;
        _this.listVehModel(0);
    },
    methods: {
        confirm() {
            let _this = this;
            _this.show = false;
            _this.confirmFunc(_this.selected);
        },
        cancel() {
            let _this = this;
            _this.show = false;
            _this.cancelFunc();
        },
        fail(error) {
            let _this = this;
            _this.show = false;
            _this.failFunc(error);
        },
        searchFilter(value) {
            let _this = this;
            let filter = false;
            let searchKey = _this.searchKey.toUpperCase();
            if (searchKey) {
                if (typeof value === "object") {
                    if (_this.isBeMai) {
                        if (
                            value.tips &&
                            value.tips.toUpperCase().search(searchKey) == -1 &&
                            value.name.toUpperCase().search(searchKey) == -1
                        ) {
                            filter = true;
                        } else if (
                            value.name.toUpperCase().search(searchKey) == -1
                        ) {
                            filter = true;
                        }
                    } else {
                        if (
                            value.displacement.toUpperCase().search(searchKey) == -1 &&
                            value.gearbox.toUpperCase().search(searchKey) == -1) {
                            filter = true;
                        }
                    }
                } else {
                    if ((value + "").toUpperCase().search(searchKey) == -1) {
                        filter = true;
                    }
                }
            }
            return filter;
        },
        select(value){
            let _this = this;
            // 赋值
            let currentSearch = _this.searchTypes[_this.currentSearchType];
            if (_this.isBeMai && currentSearch.type !== "combine") {
                _this.selected[currentSearch.type] = value.name;
            } else {
                _this.selected[currentSearch.type] = value;
            }
            
            if (_this.currentSearchType < 3) {
                // 加载下一级
                _this.listVehModel(_this.currentSearchType+1, _this.isBeMai ? value : undefined);
            } else {
                // 完成选择
                _this.confirm();
            }
        },
        listVehModel(loadIndex, value){
            let _this = this;
            let loadSearchType = _this.searchTypes[loadIndex];
            let params = {
                type: loadSearchType.type
            };
            if (_this.isBeMai) {
                if (loadIndex === 1) {
                    params.brandId = value.id
                } else if (loadIndex === 2) {
                    params.seriesId = value.id
                }
            }
            if (loadIndex > 0) {
                for (let i = 0; i < loadIndex; i++) {
                    let queryParam = _this.searchTypes[i];
                    if (!_this.isBeMai || loadIndex !== 3) {
                        params[queryParam.type] = _this.selected[queryParam.type];
                    }
                }
            }

            // *********************测试用*********************
            // if (loadIndex != 3) {
            //     _this.toSelects = ["123","345","哈哈","123","345","456","123","345","456","123","345","4561"];
            // } else {
            //     _this.toSelects = [
            //         {
            //             displacement: "1.5T",
            //             gearbox: "6AT"
            //         },
            //         {
            //             displacement: "1.5T",
            //             gearbox: "8AT"
            //         },
            //         {
            //             displacement: "2.0T",
            //             gearbox: "8AT"
            //         }
            //     ];
            // }
            // _this.currentSearchType = loadIndex;
            // *********************测试用*********************

            if (_this.isBeMai && loadIndex === 3) {
                _this.toSelects =
                    _this.cacheToSelects
                        .map(item => {
                            let newItem = {
                                ...item,
                                name: item.saleVehModel,
                                tips: `${item.driverType} / ${item.displacement} / ${item.transmission}`
                            }
                            return newItem
                        })
                        .filter(item => _this.selected.model === item.year)
                _this.currentSearchType = loadIndex;
            } else {
                _this.searchKey = "";
                _this.toSelects = [];
                _this.cacheToSelects = [];
                request({
                    method: "get",
                    baseURL: URL_MODULE.united,
                    url: "/open/veh-models",
                    params: { ...params, dataService: this.dataService }
                }).then(function (res) {
                    if (_this.isBeMai && loadIndex === 2) {
                        _this.cacheToSelects = res.map(item => {
                            let newItem = {
                                ...item,
                                saleVehModel: item.name,
                                name: item.year
                            }
                            return newItem
                        })
                        let cacheName = "";
                        _this.toSelects = _this.cacheToSelects.filter(item => {
                            let flag = true;
                            if (cacheName !== item.name) {
                                cacheName = item.name
                            } else {
                                flag = false;
                            }
                            return flag;
                        })
                    } else {
                        _this.toSelects = res;
                    }
                    _this.currentSearchType = loadIndex;
                }).catch(function (error) {
                    if(error && error.message) {
                        _this.fail(error.message);
                    }
                });
            }
        },
        valueText(value) {
            let text = value;
            if (typeof value == "object") {
                if (this.isBeMai) {
                    text = value.name
                } else {
                    text = value.displacement + ' ' + value.gearbox;
                }
            }
            return text;
        },
        selectedText(value) {
            let text = '';
            let factoryBrand = value.factoryBrand || value.brand;
            let series = value.series;
            let year = value.year || value.model;
            let combine = value.combine;
            if (factoryBrand) {
                text += factoryBrand;
            }
            if (series) {
                text +=  ' ' + series;
            }
            if (year) {
                text +=  ' ' + year;
            }
            if (combine) {
                if (this.isBeMai) {
                    text +=  ' ' + combine.name;
                } else {
                    text +=  ' ' + combine.displacement + ' ' + combine.gearbox;
                }
            }
            return text;
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    .operation {
        .to-confirm {
            color: #FF6E4C;
        }
        .seleted-text {
            text-align: center;
            margin: 0;
            padding: 6px 0;
            font-size: 14px;
            color: #323233;
            background-color: #f2f2f2;
        }
    }
    .selector {
        height: 310px;
        overflow-x: hidden;
    }
    .selector::-webkit-scrollbar {
        display: none;
    }
    .tips {
        color: #9D9FA8;
    }
}
</style>