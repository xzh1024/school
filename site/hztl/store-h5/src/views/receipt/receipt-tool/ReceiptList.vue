<template>
    <div>
        <van-list
            v-model="list.loading"
            :finished="list.finished"
            finished-text="没有更多了"
            @load="receiverList"
        >
            <div class='receipt' v-for='(item,index) in list.rows' :key='index' @click='jumpToReceiptDetailFunc(item)'>
                <div class='receipt-header'>
                    <div class='receipt-status' :class='statusClass[item.status]'>
                        {{ item.statusName }}
                    </div>
                    <div class='receipt-right'>
                        <!-- 倒计时 -->
                        <div v-if='item.status == 0 || item.status == 1' class='receipt-count-down'>
                            <img src='../../../assets/icon-time-danger.png'/>
                            请尽快报价
                        </div>
                        <!-- 删除 -->
                        <div v-if='item.canOperate !== undefined && !item.canOperate' class='receipt-no-operate'>
                            <img src='../../../assets/icon-no-operate.png'/>
                        </div>
                    </div>
                </div>
                <div class='receipt-info'>
                    <div class='header'>
                        <div class='code'>{{ item.wantCode }}</div>
                        <div class='time'>
                            {{ parseTime(item.want.publishTime) }}
                        </div>
                    </div>
                    <div class='publisher'>
                        <div class='icon'>询</div>
                        <div class='name txt-overflow'>
                            {{ item.want.companyName ? item.want.companyName + '-' + item.want.name:item.want.name }}
                        </div>
                        <img :src='companyTypes[item.want.companyType]'/>
                    </div>
                    <div v-if='item.name' class='receiver'>
                        <div class='icon'>报</div>
                        <div class='name txt-overflow'>{{item.name}}</div>
                    </div>
                </div>
                <div class='split'/>
                <div class='receipt-content'>
                    <div class='header'>
                        <div v-if='item.want.vin' class='vin'>
                            {{ item.want.vin }}
                        </div>
                        <div v-if="item.want.wantType!=1" class='cart-info txt-overflow'>
                            {{ item.want.factoryBrand }} {{ item.want.series }} {{ item.want.year }} {{ item.want.displacement }} {{ item.want.gearbox }}
                        </div>
                        <div v-if="item.want.brandsScope.length>0" 
                            class='cart-info txt-overflow'>
                            {{item.want.brandsScope.join(' ')}}
                        </div>
                    </div>
                    <div class='part-info'>
                        {{ item.want.partInfo }}
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import Vue from 'vue';
import { List, Toast } from 'vant';
import request, { URL_MODULE } from "@/request";
Vue.use(Toast).use(List);

export default {
    name: 'ReceiptList',
    data(){
        return {
            item: {
                companyType: '经销商',
                vin: 'HFKGUASHDFGK84K84',
                name1: '进口奥迪',
                name2: 'TTRS',
                name3: '2.5T',
                partInfo: '大灯 、火花塞、刹车盘大灯 、火花塞刹车盘大灯 火花塞、刹车盘大灯 、火花塞、刹车盘大灯 、火花塞、刹车盘大灯 、火花塞刹车盘大灯 火花塞、刹车盘大灯 、火花塞、刹车盘'
            },
            list: {
                rows: [],
                loading: false,
                finished: false
            },
            companyTypes: {
                '汽修厂': require('../../../assets/icon-qixiuchang.png'),
                '经销商': require('../../../assets/icon-jingxiaoshang.png'),
                '生产厂家': require('../../../assets/icon-shengchanchangjia.png'),
            },
            statusClass: {
                0: 'status-wait-offer',
                1: 'status-offering',
                2: 'status-offered',
                3: 'status-end',
                4: 'status-out-of-time',
                5: 'status-refuse',
                6: 'status-been-voided',
            },
            pagenation: {
                page: 1,
                pageSize: 10
            }
        }
    },
    props: {
        status: String,
        searchKey: String
    },
    watch: {
        status: function(newVal){
            this.resetReceiverList();
        },
        searchKey: function(newVal){
            this.resetReceiverList();
        }
    },
    methods: {
        // 重置List
        resetReceiverList(){
            this.pagenation.page = 1;
            this.list.rows = [];
            this.receiverList();
        },
        // 列出报价单
        receiverList(){
            var param = {
                status: this.status,
                keyword: this.searchKey,
                page: this.pagenation.page,
                pageSize: this.pagenation.pageSize,
                offiAccount:true
            }
            request({
                url: "/wants-v2/wants/receiver",
                params: param
            }).then(data => {
                if (!data) {
                    this.list.finished = true;
                    return;
                }
                if (data.rows) {
                    this.list.rows = [...this.list.rows, ...data.rows];
                }
                if (data.totalPage <= this.pagenation.page){
                    this.list.finished = true;
                }else{
                    this.list.finished = false;
                }
                this.pagenation.page += 1;
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
                this.list.finished = true;
            }).finally(() => {
                this.list.loading = false;
            });
            // setTimeout(() => {
            //     var data = require('../../../assets/mock/want_receiver.1.json');
            //     this.list.loading = false;
            //     if (!data) {
            //         this.list.finished = true;
            //         return;
            //     }
            //     if (data.rows) {
            //         this.list.rows = [...this.list.rows, ...data.rows];
            //     }
            //     if (data.totalPage <= this.pagenation.page){
            //         this.list.finished = true;
            //         window.console.log('123');
            //     }else{
            //         this.list.finished = false;
            //         window.console.log('456');
            //     }
            //     this.pagenation.page += 1;
            // }, 500);
        },
        jumpToReceiptDetailFunc(obj){
            if (obj.canOperate !== undefined && !obj.canOperate) {
                Toast.fail('该询价单报价中，已锁定');
            }else{
                this.$router.push("/receipt/detail?wantCode=" + obj.wantCode);
            }
        },
        parseTime(timeStr){
            return timeStr.split("T")[0] + ' ' + timeStr.split("T")[1].split("+")[0].split(".")[0];
        }
    }
}
</script>

<style scoped>
.receipt {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    margin-bottom: 10px;
}

.receipt .split {
    width: 98%;
    height: 1px;
    background-color: #E8EAEF;
}

.receipt-header {
    border-radius: 6px 6px 0 0;
    width: 100%;
    background-color: #fff;
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
}

.receipt-status {
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 3px 10px;
    font-size: 12px;
    color: #fff;
}

.receipt-right {
    display: flex;
    align-items: center;
}

.receipt-no-operate img {
    width: 20px;
    height: 20px;
}

.receipt-count-down {
    display: flex;
    align-items: center;
    color: #FF4655;
    font-size: 10px;
    font-weight: 700;
    margin-right: 8px;
}

.receipt-count-down img {
    width: 14px;
    height: 14px;
    margin-right: 4px;
}


.receipt-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 8px;
    background-color: #fff;
    border-radius: 0 0 6px 6px;
    border-bottom: 1px so
}

.receipt-info .header {
    width: 100%;
    padding-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.receipt-info .header .code {
    font-size: 14px;
    font-weight: bold;
}

.receipt-info .header .time {
    font-size: 14px;
    color: #777B87;
}

.receipt-info .publisher {
    width: 100%;
    padding-bottom: 4px;
    display: flex;
    align-items: center;
}

.receipt-info .publisher .icon {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    background-color: #F0C44D;
    padding: 2px 4px;
    border-radius: 2px;
}

.receipt-info .publisher .name {
    font-size: 14px;
    color: #1A2231;
    text-align: left;
    margin-left: 8px;
}

.receipt-info .publisher img {
    height: 16px;
    width: auto;
    margin-left: 8px;
}

.receipt-info .receiver {
    width: 100%;
    padding-bottom: 4px;
    display: flex;
    align-items: center;
}

.receipt-info .receiver .icon {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    background-color: #10B187;
    padding: 2px 4px;
    border-radius: 2px;
}

.receipt-info .receiver .name {
    font-size: 14px;
    color: #1A2231;
    text-align: left;
    margin-left: 8px;
    flex: 1;
}

.receipt-content {
    width: 100%;
    font-size: 14px;
    background-color: #fff;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 8px;
}

.receipt-content .header {
    display: flex;
    align-items: center;
}

.receipt-content .header .vin {
    background: #F3F5F8;
    color: #777B87;
    font-size: 12px;
    border-radius: 4px;
    padding: 2px 4px;
    margin-right: 10px;
}

.receipt-content .header .cart-info {
    background: #F3F5F8;
    color: #777B87;
    font-size: 12px;
    border-radius: 4px;
    padding: 2px 4px;
}

.receipt-content .part-info {
    margin: 10px 0;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    text-align: left;
}

/* 待报价 */
.status-wait-offer {
    background-color: #FF4655;
}

/* 报价中 */
.status-offering {
    background-color: #FF6700;
}

/* 已报价 */
.status-offered {
    background-color: #10B187;
}

/* 已结束 */
.status-end {
    background-color: #10B187;
}

/* 已过期 */
.status-out-of-time {
    background-color: #CCCED4;
}

/* 已终止 */
.status-refuse {
    background-color: #CCCED4;
}

/* 已作废 */
.status-been-voided {
    background-color: #CCCED4;
}

.txt-overflow {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>