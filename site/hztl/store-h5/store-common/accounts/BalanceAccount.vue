<template>
    <div class="page">
        <van-nav-bar
            class="nav-bar"
            title="我的账户"
            fixed
            left-arrow
            @click-left="back"
        >
            <img slot="left" class="back" src="../img/back-icon.png" />
        </van-nav-bar>
        <div class="content">
            <div class="total-info">
                <img src="../img/balance-pay-channel-icon.png">
                <div class="title">我的余额</div>
                <div class="balance">¥ {{ balanceInfo.amount | priceFilter }}</div>
            </div>
            <div class="item-info">
                <div class="item total-recharge">
                    <div class="label">总收入</div>
                    <div class="amount">¥ {{ balanceInfo.totalRecharge | priceFilter }}</div>
                </div>
                <div class="item total-consume">
                    <div class="label">总支出</div>
                    <div class="amount">¥ {{ balanceInfo.totalConsume | priceFilter }}</div>
                </div>
                <div class="item total-withdrawing">
                    <div class="label">提现审核中的金额</div>
                    <div class="amount">¥ {{ balanceInfo.totalWithdrawing | priceFilter }}</div>
                </div>
            </div>
            <div class="opt-plant">
                <van-button color="rgb(82, 224, 215)" class="button" block text="查看明细" @click="toBalanceList"/>
                <van-button color="rgb(82, 224, 215)" class="button" block plain text="提现" @click="confirmWithdrawShow=true"/>
            </div>
        </div>
        <van-popup
            v-model="confirmWithdrawShow"
            position="bottom"
            :style="{ height: '72%', width:'100%' }"
        >
            <div class="confirm-withdraw">
                <div class="header">
                    <van-icon name="cross" class="close" size="20px" @click="confirmWithdrawShow=false"/>
                </div>
                <div class="info">
                        <van-field v-model="withdrawAmount" type="number" label="提现金额" placeholder="请输入提现金额"/>
                        <div class="can-balance-amount">
                            <span>余额 {{ balanceInfo.amount | priceFilter }}元，</span>
                            <span class="all" @click="withdrawAmount=balanceInfo.amount">全部提现</span>
                            <van-icon class="all" name="edit" size="20px" @click="withdrawAmount=balanceInfo.amount"/>
                        </div>
                        <van-field v-model="withdrawRemark" label="提现说明" placeholder="请输入提现说明"/>
                </div>
                <div class="uploader">
                    <van-uploader
                        v-model="withdrawPictures"
                        :max-count="1"
                        class="file-upload"
                        :before-read="beforeUpload"
                        style="overflow: inherit;"
                    />
                    <div class="uploader-desc">* 请确认好自己的提现账户信息</div>
                </div>
                <div class="footer">
                    <van-button color="rgb(82, 224, 215)" class="button" block text="提现" @click="createWithdraw"/>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { NavBar, Button, Toast, Popup, CellGroup, Cell, Field, Icon, Uploader, Dialog } from "vant";
import * as qiniu from "qiniu-js";
Vue.use(NavBar).use(Button).use(Toast).use(Popup).use(CellGroup).use(Cell).use(Field).use(Icon).use(Uploader).use(Dialog);
export default {
    name: "balanceAccount",
    data() {
        return {
            confirmWithdrawShow: false,
            withdrawAmount: null,
            withdrawRemark: "",
            withdrawPictures: [],
            balanceType: "",
            balanceInfo: {}
        };
    },
    created(){
        this.balanceType = this.$route.query.balanceType;
        this.initBalanceInfo();
        this.initWithdrawPaymentCode();
    },
    methods: {
        reloadBalanceInfo(){
            this.initBalanceInfo();
        },
        initBalanceInfo(){
            let _this = this;
            request({
                url: `/balances?balanceType=${_this.balanceType}`,
                baseURL: URL_MODULE.pay
            }).then(res => {
                _this.balanceInfo = res;
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            });
        },
        initWithdrawPaymentCode(){
            let _this = this;
            if (_this.balanceType == "company") {
                request({
                    url: `/companies/payment-code`
                }).then(res => {
                    if (res.hasPaymentCode) {
                        _this.withdrawPictures.push({
                            url: res.paymentCode
                        });
                    }
                });
            }
        },
        createWithdraw(){
            let _this = this;
            if (parseFloat(_this.withdrawAmount)<=0) {
                Toast.fail("请输入提现金额！")
            } else {
                Dialog.confirm({
                    message: '确认提现吗？',
                })
                .then(() => {
                    let withdrawPictures = [];
                    _this.withdrawPictures.forEach(withdrawPicture => {
                        if (withdrawPicture.url) {
                            withdrawPictures.push(withdrawPicture.url);
                        } else if (withdrawPicture.file && withdrawPicture.file.url) {
                            withdrawPictures.push(withdrawPicture.file.url);
                        }
                    });
                    let type = -1;
                    switch (_this.balanceType) {
                        case "user":
                            type = 0;
                            break;
                        case "company":
                            type = 1;
                            break;
                    }
                    request({
                        method: 'post',
                        data: {
                            type: type,
                            amount: _this.withdrawAmount,
                            remark: _this.withdrawRemark,
                            withdrawPictures: withdrawPictures
                        },
                        url: `/balances/withdraw`,
                        baseURL: URL_MODULE.pay
                    }).then(() => {
                        Toast.success("提现申请提交成功，请等待管理员审核！");
                        _this.confirmWithdrawShow = false;
                        _this.withdrawAmount = null;
                        _this.withdrawRemark = "";
                        _this.reloadBalanceInfo();
                    }).catch(err => {
                        if(err && err.message) {
                            Toast.fail(err.message);
                        }
                    });
                });
            }
        },
        beforeUpload(file) {
            let _this = this;
            return new Promise((resolve, reject) => {
                _this.getToken(file).then(picUrl => {
                    if (!picUrl) {
                        reject();
                    } else {
                        file.url = picUrl;
                        resolve();
                    }
                });
            });
        },
        getToken(file) {
            return new Promise(resolve => {
                $.ajax({
                    type: "get",
                    url: URL_MODULE.accounts + "/img/upToken",
                    async: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(data) {
                        if (data.code == "ok") {
                            let sendData = data.data;
                            let observer = {
                                error(err) {
                                    resolve(false);
                                },
                                complete(res) {
                                    if (res && res.key) {
                                        resolve(sendData.url);
                                    } else {
                                        resolve(false);
                                    }
                                }
                            };
                            let putExtra = {
                                fname: file.name,
                                params: {},
                                mimeType: ["image/png", "image/jpeg", "image/jpg"]
                            };
                            let config = {
                                useCdnDomain: true,
                                region: "z1"
                            };
                            let observable = qiniu.upload(
                                file,
                                sendData.key,
                                sendData.token,
                                putExtra
                                // config
                            );
                            let subscription = observable.subscribe(observer);
                        } else {
                            Toast.fail(data.data.message);
                        }
                    }
                });
            });
        },
        toBalanceList(){
            this.$router.push({
                name: `balanceList`,
                query: {
                    balanceType: this.balanceType
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
    }
};
</script>

<style lang="less" scoped>
.page {
    background: #f8f8f8;
    min-height: 100%;
    .nav-bar {
        .back {
            width: 8px;
            height: 14px;
        }
    }
    .content {
        margin-top: 45px;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        .total-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 40px;
            img {
                height: 60px;
                width: 60px;
            }
            .title {
                margin-top: 10px;
                font-size: 16px;
            }
            .balance {
                font-size: 24px;
                font-weight: bold;
                color: #ff424d;
            }
        }
        .item-info {
            padding: 0 20px;
            margin-top: 80px;
            display: flex;
            justify-content: space-between;
            .item {
                padding: 10px 6px;
                margin: 6px;
                flex: 1;
                border: 1px solid #bbb;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .label {
                    font-size: 14px;
                }
                .amount {
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .item.total-recharge {
                border-color: rgba(16, 183, 1, 1);
                color: rgba(16, 183, 1, 1);
                background: rgba(168, 234, 162, 0.294117647058824);
            }
            .item.total-consume {
                border-color: rgb(213, 22, 85);
                color: rgb(213, 22, 85);
                background: rgba(227, 152, 174, 0.286274509803922);
            }
            .item.total-withdrawing {
                border-color: rgb(240, 173, 0);;
                color: rgb(240, 173, 0);;
                background: rgba(242, 183, 31, 0.243137254901961);
            }
        }
        .opt-plant {
            position: absolute;;
            bottom: 0;
            width: 100%;
            padding: 20px 20%;
            margin-top: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            .button {
                border-radius: 6px;
            }
            .button:not(:first-child) {
                margin-top: 10px;
            }
        }
    }
    .confirm-withdraw {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .header {
            display: flex;
            justify-content: flex-end;
            height: 40px;
            align-items: center;
            .close {
                margin-right: 10px;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            .can-balance-amount {
                font-size: 14px;
                margin-right: auto;
                margin-left: 16px;
                display: flex;
                align-items: center;
                color: #BDBCBC;
                .all {
                    color: #52E0D7;
                }
            }
            /deep/ .van-cell__title.van-field__label{
                text-align: left;
            }
            /deep/ .van-cell::after {
                border: none;
            }
        }
        .uploader {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            /deep/ .van-uploader__preview-image {
                width: 180px;
                height: 180px;
            }
            /deep/ .van-uploader__upload {
                width: 180px;
                height: 180px;
            }
            /deep/ .van-uploader__file {
                width: 180px;
                height: 180px;
            }
            /deep/ .van-uploader__preview-delete {
                font-size: 25px;
            }
            .uploader-desc {
                margin-top: 10px;
                font-size: 12px;
            }
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    }
}
</style>
