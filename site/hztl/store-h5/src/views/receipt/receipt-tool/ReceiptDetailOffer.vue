<template>
    <div class='page'>
        <van-dialog
            v-model='showRefuseDialog'
            title="您确认终止报价单吗？"
            show-cancel-button
            @confirm='offerFunc(-1)'
            class='refuse-dialog'
        >
            <van-field
                class='refuse-text-area'
                v-model="statusRemarks"
                rows="2"
                :autosize='{maxHeight: 50, minHeight: 20}'
                type="textarea"
                :maxlength='200'
                placeholder="请填写终止原因"
                show-word-limit
            />
        </van-dialog>
        <van-dialog
            v-model='showSubmitDialog'
            title="您确认提交报价单吗？"
            show-cancel-button
            @confirm='offerFunc(1)'
            class='refuse-dialog'
        />
        <div class='detail-group'>
            <div class='detail' v-for='(item,index) in info.details' :key='index'>
                <div class='part-info'>
                    <p  v-if="info.want.wantType!=1" >{{ item.want.partName }}</p>
                    <p  v-if="info.want.wantType==1" >{{ item.want.partCode }}</p>
                    <div class='quality' v-if='item.want.quality'>
                        <img src='../../../assets/icon-quality.png' />
                        {{ item.want.quality }}
                    </div>
                </div>
                <div class='item'>
                    <div v-if="info.want.wantType!=1" class='plan input-group'>
                        <div class='label'>OE</div>
                        <input :name='"partCode"+item.receipt.id' type='text' placeholder="请输入" maxlength='20' v-model='item.receipt.partCode'/>
                    </div>
                    <div v-if="info.want.wantType==1"  class='plan input-group'>
                        <div class='label'>配件名称</div>
                        <input :name='"partCode"+item.receipt.id' type='text' placeholder="请输入" maxlength='20' v-model='item.receipt.partName'/>
                    </div>
                    <div class='plan input-group'>
                        <div class='label'>配件品牌</div>
                        <input :name='"brand"+item.receipt.id' type='text' placeholder="请输入" maxlength='8' v-model='item.receipt.brand'/>
                    </div>
                </div>
                <div class='item'>
                    <div class='plan'>
                        <van-radio-group class='radio-group' v-model="item.receipt.stockType">
                            <van-radio
                                shape="square"
                                v-for='(stockTypeItem, stockTypeIndex) in stockTypes'
                                :key='stockTypeIndex'
                                :name='stockTypeItem.value'
                            >
                                <div
                                    slot='icon'
                                    slot-scope="props"
                                    :class='props.checked ? "checked":"unchecked"'
                                >
                                    {{ stockTypeItem.name }}
                                </div>
                            </van-radio>
                        </van-radio-group>
                    </div>
                    <div class='plan input-group'>
                        <div class='label'>销售价格</div>
                        <input :name='"price"+item.receipt.id' type='number' placeholder="请输入" v-model='item.receipt.price' @blur='priceExchangeFunc(item)'/>
                    </div>
                </div>
            </div>
        </div>
        <div class='remark'>
            <div class='title'>备注信息</div>
            <table class='content'>
                <tr>
                    <td class='label'>图片：</td>
                    <td>
                        <div class='uploader'>
                            <van-uploader
                                v-model='info.pictures'
                                preview-size='48px'
                                :max-count='10'
                                multiple
                                preview-full-image
                                :before-read="beforeUploadFileFunc"
                                :after-read="afterUploadFileFunc"
                            />
                        </div>
                    </td>
                </tr>
                <tr v-if='info.remarks !== undefined'>
                    <td class='label'>备注：</td>
                    <td>
                        <div class='text-area'>
                            <van-field
                                v-model="info.remarks"
                                rows="2"
                                :autosize='{maxHeight: 50, minHeight: 20}'
                                type="textarea"
                                :maxlength='200'
                                placeholder="填写备注信息"
                                show-word-limit
                            />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class='operation'>
            <van-button @click='showRefuseDialog=true' type="default" class='button refuse'>终止报价</van-button>
            <van-button @click='offerFunc(0)' type="default" class='button save'>保存</van-button>
            <van-button @click='showSubmitDialog=true' type="default" class='button submit'>提交报价单</van-button>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { qiniuUploadFiles } from "../../../request/upload_file.js";
import request, { URL_MODULE } from "@/request";
import { RadioGroup, Radio, Field, Uploader, Button, Toast, Dialog } from "vant";
Vue.use(RadioGroup).use(Radio).use(Field).use(Uploader).use(Button).use(Toast).use(Dialog);

const priceReg = /\d+(\.\d{0,2})?/;

export default {
    name: "ReceiptDetailOffer",
    data(){
        return {
            statusRemarks: '',
            showRefuseDialog: false,
            showSubmitDialog: false,
            uploadedURLCache: {},
            stockTypes: [
                {
                    name: '现货',
                    value: '现货'
                },
                {
                    name: '订货',
                    value: '订货'
                }
            ]
        }
    },
    props: {
        info: Object,
        offeredCallback: Function
    },
    methods: {
        // 终止、保存、提交 报价
        offerFunc(doWhat){
            let param = {
                wantCode: this.info.wantCode,
                remarks: this.info.remarks,
                statusRemarks: this.statusRemarks,
                type: doWhat,
                details: [],
                pictures: []
            }
            this.info.details.forEach((detail) => {
                let price = null;
                if (detail.receipt.price) {
                    price = parseFloat(detail.receipt.price);
                }
                param.details.push({
                    id: detail.receipt.id,
                    partName: detail.receipt.partName,
                    partCode: detail.receipt.partCode,
                    brand: detail.receipt.brand,
                    stockType: detail.receipt.stockType,
                    price: price
                });
            });
            this.info.pictures.forEach((picture) => {
                param.pictures.push(picture.url);
            });
            request({
                method: "post",
                baseURL: URL_MODULE.united,
                url: "/wants-v2/receipts/receiver/offer",
                data: param
            }).then(() => {
                // 操作成功回调
                this.uploadedURLCache = {};
                this.offeredCallback();
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            });
        },
        // 上传图片
        beforeUploadFileFunc(files, detail){
            // 传入图片转换为数组
            if (!(files instanceof Array)) {
                files = [files];
            }
            // // 图片数量拦截
            if ((this.info.pictures.length + files.length) > 10) {
                Toast.fail('最多上传10张备注图片');
                return false
            }
            // 上传到七牛云
            return new Promise((resolve, reject) =>{
                qiniuUploadFiles(files).then((urls) => {
                    urls.forEach((url, index) => {
                        this.uploadedURLCache[detail.index + index] = url;
                    });
                    resolve();
                }).catch((message) => {
                    Toast.fail(message);
                    reject();
                });
            });
        },
        // 上传后对应到model上
        afterUploadFileFunc(files, detail){
            for (let key in this.uploadedURLCache) {
                this.info.pictures[key].url = this.uploadedURLCache[key];
            }
        },
        priceExchangeFunc(item){
            if (item.receipt.price) {
                var priceMatched = item.receipt.price.match(priceReg);
                if (priceMatched){
                    item.receipt.price = priceMatched[0];
                }else{
                    item.receipt.price = '';
                }
            }
        }
    }
}
</script>

<style scoped lang='less'>
.page {
    min-height: 100%;
    width: 100%;
}

.detail-group {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.detail {
    background-color: #fff;
    margin-top: 12px;
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-shadow: -1px -1px 7px 0 rgba(0,0,0,0.03), 1px 1px 7px 0 rgba(0,0,0,0.03);
}

.detail .part-info{
    display: flex;
    align-items: center;
    width: 100%;
}

.detail .part-info p{
    font-size: 14px;
    color: #1A2231;
    font-weight: bold;
    margin-right: 10px;
}

.detail .part-info .quality {
    font-size: 12px;
    color: #01CE70;
    display: flex;
    align-items: center;
    border: 1px solid rgba(9,217,122,0.30);
    border-radius: 12px;
    padding: 1px 6px 1px 1px;
}

.detail .part-info .quality img{
    width: 15px;
    height: auto;
    margin: 0 5px 0 1px;
}

.detail .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 5px 0;
}

.detail .item .plan:first-child {
    margin-right: 5px;
}

.detail .item .plan:last-child {
    margin-left: 5px;
}

.detail .item .plan {
    width: 50%;
}

.detail .item .input-group{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #F4F5F7;
    border-radius: 3px;
}

.detail .item .input-group .label{
    height: 32px;
    line-height: 32px;
    background: #F4F5F7;
    font-size: 12px;
    color: #777B87;
    padding: 0 6px;
}

.detail .item .input-group input[type=number]{
    width: 0;
    height: 30px;
    flex: 1;
    font-size: 12px;
    color: #1A2231;
}

.detail .item .input-group input[type=number]::-webkit-input-placeholder {
    font-size: 12px;
    color: #777B87;
}

.detail .item .input-group input[type=text]{
    width: 0;
    height: 30px;
    flex: 1;
    font-size: 12px;
    color: #1A2231;
}

.detail .item .input-group input[type=text]::-webkit-input-placeholder {
    font-size: 12px;
    color: #777B87;
}

.detail .item .radio-group {
    height: 28px;
    width: 110px;
    background: #F3F5F8;
    border: 1px solid #E9ECF0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.detail .item .radio-group .checked {
    background: #00a8ea;
    border-radius: 4px;
    font-size: 14px;
    color: #FFFFFF;
    width: 50px;
    height: 24px;
    margin: 0 2.5px;
    line-height: 24px;
}

.detail .item .radio-group .unchecked {
    font-size: 14px;
    color: #777B87;
    width: 50px;
    height: 24px;
    margin: 0 2.5px;
    line-height: 24px;
}

/deep/ .van-radio__icon {
    height: 24px;
}

.remark {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 12px 0 62px 0;
    padding: 16px;
    box-shadow: -1px -1px 7px 0 rgba(0,0,0,0.03), 1px 1px 7px 0 rgba(0,0,0,0.03);
}

.remark .title {
    font-size: 16px;
    font-weight: bold;
    color: #1A2231;
    text-align: left;
    height: 16px;
    padding-left: 6px;
    border-left: 4px solid #00a8ea;
    display: flex;
    align-items: center;
}

.remark .content {
    margin-top: 16px;
    width: 100%;
}

.remark .content .label{
    font-size: 14px;
    width: 50px;
    color: #1A2231;
    vertical-align: text-top;
    padding-top: 10px;
}

.remark .content .uploader {
    text-align: left;
}

/deep/ .van-icon-clear:before {
    color: #00a8ea;
    font-size: 16px;
}

/deep/ .van-cell {
    background: #F8F8FB;
    border: 1px solid #EDEFF1;
    border-radius: 4px;
    padding: 4px 4px 0 4px !important;
}

/deep/ .van-field__word-limit {
    margin-top: 0px !important;
}

.operation {
    height: 50px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: -1px -1px 7px 0 rgba(0,0,0,0.03), 1px 1px 7px 0 rgba(0,0,0,0.03);
}

.operation .button {
    width: 104px;
    height: 38px;
    line-height: 38px;
    border-radius: 8px;
    font-size: 14px;
}

.operation .button.refuse {
    color: #1A2231;
    border: 1px solid #CCCED4;
}

.operation .button.save {
    color: #00a8ea;
    border: 1px solid #00a8ea;
}

.operation .button.submit {
    color: #FFFFFF;
    border: 1px solid #00a8ea;
    background-color: #00a8ea;
}

.refuse-dialog {
    padding: 10px;
}

</style>