<template>
    <div class='page'>
        <div class='detail-group'>
            <div class='detail' v-for='(item,index) in info.details' :key='index'>
                <div class='item'>
                    <img class='stock-type' :src='stockTypes[item.receipt.stockType]' />
                    <div v-if="info.want.wantType!=1" class='part-name'>{{ item.want.partName }}</div>
                    <div v-if="info.want.wantType==1" class='part-name'>{{ item.want.partCode }}</div>
                </div>
                <div v-if="info.want.wantType!=1" class='item'>
                    <div class='label'>OE：</div>
                    <div class='oe-code'>{{ item.receipt.partCode }}</div>
                </div>
                <div v-if="info.want.wantType==1" class='item'>
                    <div class='label'>配件名称：</div>
                    <div class='oe-code'>{{ item.receipt.partName }}</div>
                </div>
                <div class='item'>
                    <div class='quality' v-if='item.want.quality'>
                        <img src='../../../assets/icon-quality.png' />
                        {{ item.want.quality }}
                    </div>
                    <div v-if='item.receipt.brand' class='brand'>
                        {{ item.receipt.brand }}
                    </div>
                </div>
                <div class='item'>
                    <div class='label'>单价：</div>
                    <div class='price'>
                        <span v-if='item.receipt.price' class='small' style='margin-right: 2px;'>¥</span>
                        <span class='normal'>
                            {{ item.receipt.price ? numberIntegerFunc(item.receipt.price) : '未报价' }}
                        </span>
                        <span v-if='item.receipt.price' class='small'>{{ numberDecimalFunc(item.receipt.price) }}</span>
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
                        <div class='images'>
                            <van-image
                                width="48"
                                height="48"
                                fit="cover"
                                radius='4'
                                v-for='(picture, index) in info.pictures'
                                :key='index'
                                :src='picture.url'
                                @click='previewPicFunc(picture)'
                            />
                        </div>
                    </td>
                </tr>
                <tr v-if='info.remarks !== undefined'>
                    <td class='label no-padding'>备注：</td>
                    <td>
                        <div class='text'>{{ info.remarks }}</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Image, ImagePreview } from 'vant';
Vue.use(Image).use(ImagePreview);

export default {
    name: "ReceiptDetailView",
    data(){
        return {
            stockTypes: {
                '现货': require('../../../assets/icon-xianhuo.png'),
                '订货': require('../../../assets/icon-dinghuo.png'),
            }
        }
    },
    props: {
        info: Object
    },
    methods: {
        numberIntegerFunc(number){
            return Math.floor(parseFloat(number));
        },
        numberDecimalFunc(number){
            var des = '';
            var splits = number.split('.')
            if (splits.length == 1){
                des = '00';
            }else {
                var temp = parseFloat('0.'+splits[1]);
                des = temp.toFixed(2).split('.')[1];
            }
            return '.' + des;
        },
        previewPicFunc(picture){
            ImagePreview({
                images: [picture.url],
                showIndex: false
            });
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

.detail .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 5px 0;
}

.detail .item .stock-type {
    width: 34px;
    height: auto;
}

.detail .item .part-name {
    font-size: 14px;
    color: #1A2231;
    font-weight: bold;
    margin-left: 4px;
}

.detail .item .label {
    font-size: 12px;
    color: #777B87;
}

.detail .item .oe-code {
    font-size: 12px;
    color: #1A2231;
    margin-left: 8px;
}


.detail .item .quality {
    font-size: 12px;
    color: #01CE70;
    display: flex;
    align-items: center;
    border: 1px solid rgba(9,217,122,0.30);
    border-radius: 12px;
    padding: 1px 6px 1px 1px;
}

.detail .item .quality img{
    width: 15px;
    height: auto;
    margin: 0 5px 0 1px;
}

.detail .item .brand {
    font-size: 12px;
    color: #27B3FF;
    border: 1px solid #27B3FF;
    border-radius: 4px;
    padding: 1px 6px;
    margin-left: 12px;
}

.detail .item .price {
    display: flex;
    align-items: baseline;
}

.detail .item .normal {
    font-size: 14px;
    color: #FF4655;
    font-weight: bold;
}

.detail .item .small {
    font-size: 10px;
    color: #FF4655;
    font-weight: normal;
}

.remark {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 12px 0 12px 0;
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
}

.remark .content .label{
    font-size: 14px;
    width: 50px;
    color: #1A2231;
    vertical-align: text-top;
    padding-top: 10px;
}

.remark .content .label.no-padding {
    padding-top: 0;
}

.remark .content .images {
    text-align: left;
}

.remark .content .images div{
    margin-right: 5px;
}

.remark .content .text {
    font-size: 14px;
    color: #1A2231;
    text-align: left;
}

</style>