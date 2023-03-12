<template>
    <div class="rebate-overlay">
        <van-overlay :show="show" @click="show=false" z-index="100">
            <div class="rebate-rule-wrapper">
                <div class="block">
                    <div class="rebate-rule-info">
                        <div class="header">
                            {{ rebate.type | typeCN }}详情
                        </div>
                        <div class="profit-ratio" v-if="rebate.profitRatio">
                            <div class="left">购买配件返利比例</div>
                            <div class="right">{{ rebate.profitRatio }}%</div>
                        </div>
                        <div class="details" v-if="rebate.details && rebate.details.length>0">
                            <table>
                                <tr>
                                    <th class="left">被推荐人行为</th>
                                    <th class="right">{{ rebate.type | typeCN }}</th>
                                </tr>
                                <tr v-for="(detail,index) in rebate.details" :key="index">
                                    <td class="left">{{ detail.operatorTypeName }} {{ detail | operateTypeCN }}</td>
                                    <td class="right">{{ detail | rewardCN }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import Vue from 'vue';
import { Overlay } from 'vant';
Vue.use(Overlay);
export default {
    name: "rebateOverlay",
    data() {
        return {
            show: false,
            rebate: {}
        }
    },
    filters: {
        typeCN(type) {
            let typeCN = "";
            switch (type) {
                case 0:
                    typeCN = "返利";
                    break;
                case 1:
                    typeCN = "返佣";
                    break;
            }
            return typeCN;
        },
        operateTypeCN(detail) {
            let operateTypeCN = detail.operateTypeName;
            if (detail.operateTypeIdName && detail.operateTypeIdName.length>0){
                operateTypeCN += ("-" + detail.operateTypeIdName);
            }
            return operateTypeCN;
        },
        rewardCN(detail) {
            let rewardCN = "";
            switch (detail.rewardType){
                case 0:
                    rewardCN = detail.rewardQuota + "%";
                    break;
                case 1:
                    rewardCN = "¥" + detail.rewardQuota;
                    break;
            }
            return rewardCN;
        }
    }
}
</script>

<style lang="less" scoped>
.rebate-overlay {
    .rebate-rule-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 100%;
        .block {
            background-color: #fff;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80%;
            .rebate-rule-info {
                width: 100%;
                padding: 10px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .header {
                    width: 100%;
                    margin-top: 10px;
                    font-size: 16px;
                    text-align: center;
                }
                .profit-ratio {
                    margin-top: 10px;
                    width: 100%;
                    display: flex;
                    .left {
                        font-size: 14px;
                        margin-right: auto;
                    }
                    .right {
                        font-size: 14px;
                        margin-left: auto;
                    }
                }
                .details {
                    margin-top: 10px;
                    width: 100%;
                    table {
                        width: 100%;
                        border-spacing: 0;
                        .left {
                            font-size: 14px;
                            font-weight: 400;
                            text-align: left;
                        }
                        .right {
                            font-size: 14px;
                            font-weight: 400;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
}
</style>