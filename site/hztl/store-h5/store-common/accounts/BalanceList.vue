<template>
    <div class="page">
        <van-nav-bar
            class="nav-bar"
            title="余额明细"
            fixed
            left-arrow
            @click-left="back"
        >
            <img slot="left" class="back" src="../img/back-icon.png" />
            <van-dropdown-menu slot="right">
                <van-dropdown-item v-model="queryOrderType" :options="orderTypeOptions" @change="reload"/>
            </van-dropdown-menu>
        </van-nav-bar>
        <div class="header">
            <div class="line">合计收入：¥ {{ total.totalRecharge | priceFilter }}</div>
            <div class="line">合计支出：¥ {{ total.totalConsume | priceFilter }}</div>
        </div>
        <div class="content">
            <van-list class="rows" v-model="loading" :finished="finished" :offset="400" @load="load">
                <div class="row" v-for="(row, index) in rows" :key="index">
                    <div class="line line-1">
                        <div class="left">{{ row | labelCN }}</div>
                        <div class="right" :class="'row-type-'+row.type">¥ {{ row | feeCN }}</div>
                    </div>
                    <div class="line line-2">
                        <div class="left">{{ row.relativeName }}</div>
                        <div class="right">余额{{ row.totalAmount | priceFilter }}</div>
                    </div>
                    <div class="line line-3">
                        <div class="left">{{ row.createdAt | timeFormat }}</div>
                    </div>
                </div>
            </van-list>
            <div class="no-rows" v-if="rows.length==0">
                <img src="../img/icon-noresult.png">
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { NavBar, List, Toast, Icon, DropdownMenu, DropdownItem } from "vant";
Vue.use(NavBar).use(List).use(Toast).use(Icon).use(DropdownMenu).use(DropdownItem);
import { timeFormat } from "../utils/timer.js";
export default {
    name: "balanceList",
    data() {
        return {
            balanceType: "",
            listBalanceURL: "",
            page: 1,
            perPage: 10,
            loading: false,
            finished: false,
            loadedData: false,
            total: {},
            rows: [],
            showFilter: false,
            queryOrderType: null,
            orderTypeOptions: [
                { text: '全部', value: null },
                { text: '配件购买', value: 1 },
                { text: '会员服务购买', value: 2 },
                { text: '余额充值', value: 3 },
                { text: '返利', value: 4 },
                { text: '返佣', value: 5 },
                { text: '提现', value: 6 }
            ]
        };
    },
    created(){
        this.balanceType = this.$route.query.balanceType;
        switch (this.balanceType) {
            case "user":
                this.listBalanceURL = "/balances/logs/user";
                break;
            case "company":
                this.listBalanceURL = "/balances/logs/my";
                break;
        }
    },
    methods: {
        reload(){
            let _this = this;
            _this.page = 1;
            _this.total = {};
            _this.rows = [];
            _this.loading = true;
            _this.finished = false;
            _this.loadedData = false;
            _this.loadData();
        },
        load(){
            this.loadData();
        },
        loadData() {
            let _this = this;
            let param = {
                fillInfoTotal: true,
                statuses: 2,
                page: _this.page,
                pageSize: _this.pageSize
            };
            if (_this.queryOrderType!=null) {
                param.orderType = _this.queryOrderType;
            }
            request({
                url: _this.listBalanceURL,
                baseURL: URL_MODULE.pay,
                params: param
            }).then(res => {
                _this.total = {
                    totalConsume: res.totalConsume,
                    totalRecharge: res.totalRecharge
                }
                // 处理返回的rows
                if (res.rows && res.rows.length > 0 && res.rows != null) {
                    for (let row of res.rows) {
                        _this.rows.push(row);
                    }
                }
                // 处理分页器
                _this.loading = false;
                if (res.totalPage) {
                    if (_this.page >= res.totalPage) {
                        _this.finished = true;
                    } else {
                        _this.page += 1;
                    }
                } else {
                    _this.finished = true;
                }
            }).catch(err => {
                _this.finished = true;
                _this.loading = false;
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            });
        },
        back() {
            this.historyBack(-1);
        }
    },
    filters: {
        priceFilter(value) {
            let realVal = "--";
            if (value !== null && !isNaN(value) && value !== "") {
                realVal = parseFloat(value).toFixed(2);
            }
            return realVal;
        },
        labelCN(row) {
            return row.prdName+"-"+row.prdDesc+"-"+row.orderCode;
        },
        feeCN(row) {
            let feeCN = "";
            switch (row.type) {
                case 1:
                    feeCN = "+" + row.amount;
                    break;
                case 2:
                    feeCN = "-" + row.amount;
                    break;
            }
            return feeCN;
        },
        timeFormat(timeStr){
            return timeFormat(timeStr)
        }
    }
};
</script>

<style lang="less" scoped>
.page {
    background: #fff;
    min-height: 100%;
    .nav-bar {
        .back {
            width: 8px;
            height: 14px;
        }
    }
    .header {
        position: fixed;
        top: 45px;
        background: #f8f8f8;
        width: 100%;
        padding: 10px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .line {
            text-align: left;
            font-size: 16px;
        }
    }
    .content {
        margin-top: 115px;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .no-rows {
            img {
                margin-top: 50px;
                width: 200px;
                height: 200px;
            }
        }
        .rows {
            flex: 1;
            background: #fff;
            display: flex;
            flex-direction: column;
            .row {
                display: flex;
                flex-direction: column;
                padding: 10px;
                border-bottom: 1px solid rgb(229, 229, 229);
                .line {
                    display: flex;
                    font-size: 14px;
                    align-items: center;
                    padding: 2px 0;
                    .left {
                        text-align: left;
                        margin-right: auto;
                    }
                    .right {
                        margin-left: auto;
                    }
                }
                .line-1 {
                    font-size: 16px;
                    font-weight: bold;
                    .left {
                        width: 70%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .row-type-1 {
                        color: rgb(6, 185, 25);
                    }
                    .row-type-2 {
                        color: rgb(210, 36, 88);
                    }
                }
                .line-2 {
                    .right {
                        color: rgb(170, 170, 170);
                    }
                }
                .line-3 {
                    color: rgb(170, 170, 170);
                }
            }
            .row:first-child {
                border-top: 1px solid rgb(229, 229, 229);
            }
        }
    }
}
</style>