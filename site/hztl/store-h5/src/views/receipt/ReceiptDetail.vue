<template>
    <div class='page'>
        <van-overlay :show="loading" :z-index='1000' class='overlay'>
            <van-loading size="24px" vertical>数据加载中...</van-loading>
        </van-overlay>
        <van-image-preview
            v-model='showRemark'
            :images='info.want.pictures'
            close-on-popstate
        >
            <template v-if='info.want.remarks' v-slot:cover>
                <p class='image-preview-cover'>{{ info.want.remarks }}</p>
            </template>
        </van-image-preview>
        <van-nav-bar class='navbar' fixed :border='false' >
            <div class='navbar-left' slot='left'>
                <van-icon class='navbar-back' size='25px' color='#fff' name='arrow-left' @click='backFunc' />
                <div class='navbar-status' :style='{opacity: navbarOpacity}'>{{ info.statusName }}</div>
            </div>
            <div class='navbar-title' v-if='info.want.expire && info.want.expire>0' :style='{opacity: navbarOpacity}' slot='title'>
                <van-count-down class='count-down' :time='info.want.expire * 1000' @finish="expireFinishFunc"/>
            </div>
            <span slot="right" v-if="info.ordered" @click.stop="toOrder(info.wantCode)">查看相关销售单</span>
        </van-nav-bar>
        <div class='want'>
            <div class='header'>
                <div class='status'>{{ info.statusName }}</div>
                <div v-if='info.want.expire && info.want.expire>0' class='count-down'>
                    <img src='../../assets/icon-time.png'/>
                    <van-count-down class='time' :time='info.want.expire * 1000' format="剩余时间：HH:mm:ss"/>
                </div>
            </div>
            <div class='info'>
                <img @click='callFunc' class='to-call' src='../../assets/to-call.png'/>
                <div @click='showMoreInfoFunc' class='show-more-info' :class='showMoreInfo ? "show": ""'>
                    <div class='item'>{{ showMoreInfo ? '收起' : '展开' }}</div>
                    <img src='../../assets/icon-down.png' :class='showMoreInfo ? "img-180": ""'/>
                </div>
                <div class='info-box' :class='showMoreInfo ? "show":""'>
                    <table>
                        <template v-if='info.want.companyName'>
                            <tr>
                                <td colspan='2'>
                                    <div class='company-info'>
                                        <span class='name'>{{ info.want.companyName }}</span>
                                        <img :src='companyTypes[info.want.companyType]'/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class='label' valign="top">发布人：</td>
                                <td>{{ info.want.name }}</td>
                            </tr>
                        </template>
                        <template v-if='!info.want.companyName'>
                            <tr>
                                <td colspan='2'>
                                    <div class='company-info'>
                                        <span class='name'>{{ info.want.name }}</span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr v-if="info.want.wantType!=1">
                            <td class='label' valign="top">VIN码：</td>
                            <td>{{ info.want.vin }}</td>
                        </tr>
                        <tr v-if="info.want.wantType!=1">
                            <td class='label' valign="top">车型：</td>
                            <td>
                                <div class='car-info'>
                                    {{ info.want.factoryBrand }} {{ info.want.series }} {{ info.want.year }} {{ info.want.displacement }} {{ info.want.gearbox }}
                                </div>
                            </td>
                        </tr>
                        <tr v-if="info.want.wantType==1">
                            <td class='label' valign="top">询价范围：</td>
                            <td>
                                <div class='car-info'>
                                    {{ info.want.brandsScope.join(' ') }} 
                                </div>
                            </td>
                        </tr>
                        <div v-if='info.want.companyName && !showMoreInfo' class='split'/>
                        <tr>
                            <td class='label' valign="top">单号：</td>
                            <td>{{ info.wantCode }}</td>
                        </tr>
                        <div v-if='!info.want.companyName && !showMoreInfo' class='split'/>
                        <tr>
                            <td class='label' valign="top">收货人：</td>
                            <td>{{ info.want.receiveName }} {{ info.want.receivePhone }}</td>
                        </tr>
                        <tr>
                            <td class='label' valign="top">地址：</td>
                            <td>{{ info.want.receiveAreaName }} {{ info.want.receiveAddress }}</td>
                        </tr>
                        <tr>
                            <td colspan='2'>
                                <div class='supply-requirement'>
                                    <div v-if='info.want.invoiceTypeName' class='item'>{{ info.want.invoiceTypeName }}</div>
                                    <div v-if='info.want.deliveryTime' class='item'>{{ info.want.deliveryTime }}</div>
                                    <!-- <div v-if='info.want.pushTypeName' class='item'>{{ info.want.pushTypeName }}</div> -->
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class='remark' @click='showRemarkFunc'>
                        <div class='text'>查看备注</div>
                        <img src='../../assets/icon-right.png'/>
                    </div>
                </div>
            </div>
        </div>
        <ReceiptDetailOffer v-if='info.status == 0 || info.status == 1' :info='info' :offeredCallback='offeredCallback' />
        <ReceiptDetailView v-if='info.status !== 0 && info.status !== 1' :info='info'/>
    </div>
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { NavBar, Icon, CountDown, Overlay, Loading, ImagePreview } from "vant";
import ReceiptDetailOffer from './receipt-tool/ReceiptDetailOffer.vue';
import ReceiptDetailView from './receipt-tool/ReceiptDetailView.vue';
Vue.use(NavBar).use(Icon).use(CountDown).use(Overlay).use(Loading).use(ImagePreview);

export default {
    name: "enquiry",
    components: {
        ReceiptDetailOffer, ReceiptDetailView
    },
    data() {
        return {
            info: {
                want: {}
            },
            loading: true,
            showRemark: false,
            wantCode: '',
            companyType: '经销商',
            navbarOpacity: 0,
            showMoreInfo: false,
            companyTypes: {
                '汽修厂': require('../../assets/icon-qixiuchang.png'),
                '经销商': require('../../assets/icon-jingxiaoshang.png'),
                '生产厂商': require('../../assets/icon-shengchanchangjia.png'),
            }
        };
    },
    mounted(){
        // 监听滚动
        window.addEventListener('scroll',this.handleScroll,true);
        // 加载数据
        this.loadInfo();
    },
    methods:{
        toOrder(wantCode){
            window.location.href='/salesOrder?wantCode='+wantCode;
        },
        // 获取url中询价单号
        getWantCode() {
            var query = decodeURI(window.location.search.substring(1));
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == 'wantCode') { return pair[1]; }
            }
            return null;
        },
        // 加载数据
        loadInfo(){
            request({
                baseURL: URL_MODULE.united,
                url: `/wants-v2/wants/receiver/${this.getWantCode()}`
            }).then(data => {
                if (!data.want.pictures) {
                    data.want.pictures = [];
                }
                let dataPictures = [];
                if (data.pictures){
                    data.pictures.forEach((item)=>{
                        dataPictures.push({url: item});
                    });
                }
                data.pictures = dataPictures;
                this.info = data;
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            }).finally(() => {
                this.loading = false;
            });
            // setTimeout(() => {
            //     var data = require(`../../assets/mock/want_receiver_${this.getWantCode()}.json`);
            //     if (!data.want.pictures) {
            //         data.want.pictures = [];
            //     }
            //     let dataPictures = [];
            //     if (data.pictures){
            //         data.pictures.forEach((item)=>{
            //             dataPictures.push({url: item});
            //         });
            //     }
            //     data.pictures = dataPictures;
            //     this.info = data;
            //     this.loading = false;
            // }, 500);
        },
        // 返回
        backFunc(){
            this.$router.push('/receipt');
        },
        // 倒计时结束
        expireFinishFunc(){
            this.loadInfo();
        },
        // 报价操作后回调
        offeredCallback(){
            this.loadInfo();
        },
        // 滚动
        handleScroll(e){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            var navbarOpacity = 0;
            if (scrollTop >= 36){
                navbarOpacity = 1;
            }else{
                navbarOpacity = scrollTop/36;
            }
            this.$data.navbarOpacity = navbarOpacity;
        },
        // 展开
        showMoreInfoFunc(){
            this.$data.showMoreInfo = !this.$data.showMoreInfo;
        },
        // 打电话
        callFunc(){
            window.location.href = `tel:${this.info.want.phone}`;
        },
        // 展示备注
        showRemarkFunc(){
            this.showRemark = true;
        }
    }
}
</script>

<style scoped lang='less'>
.page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background: #F3F5F8;
}

.overlay {
    display: flex;
    align-items: center;
    justify-content: center;
}

/deep/ .van-image-preview__index {
    top: 0;
    width: 100%;
    background-color: rgba(26, 34, 49, 0.2);
    padding: 10px;
}

/deep/ .van-image-preview__cover {
    top: unset;
    bottom: 0;
    width: 100%;
    background-color: rgba(26, 34, 49, 0.2);
    padding: 10px;
}

.image-preview-cover {
    font-size: 12px;
    color: #fff;
    text-align: left;
}

.navbar {
    background-color: #00a8ea;
}

.navbar .navbar-left {
    display: flex;
    align-items: center;
}

.navbar .navbar-left .navbar-back{
    font-weight: bold;
    margin-right: 8px;
}

.navbar .navbar-left .navbar-status{
    color: #fff;
    font-size: 18px;
}

.navbar .navbar-title {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.navbar .navbar-title .count-down{
    color: #fff;
    font-size: 16px;
}

.want {
    margin-top: 46px;
    background-color: #00a8ea;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.want .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.want .header .status {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
}

.want .header .count-down {
    display: flex;
    align-items: center;
    margin-top: 5px;
}

.want .header .count-down img {
    width: 14px;
    height: 14px;
    margin-right: 4px;
}

.want .header .count-down .time {
    font-size: 14px;
    color: #fff;
}

.want .company-info {
    display: flex;
    align-items: center;
}

.want .company-info .name {
    font-size: 14px;
    font-weight: bold;
    color: #1A2231;
    margin-right: 5px;
}

.want .company-info img {
    width: 40px;
    height: auto;
}

.want .supply-requirement {
    display: flex;
    align-items: center;
}

.want .supply-requirement .item {
    background: #F3F5F8;
    color: #777B87;
    border-radius: 4px;
    padding: 2px 4px;
    margin-right: 10px;
}

.want .remark {
    display: flex;
    align-items: center;
    margin-top: 4px;
}

.want .remark .text {
    color: #777B87;
    font-size: 14px;
    margin-right: 6px;
}

.want .remark img {
    width: 8px;
    height: auto;
}

.want .info {
    height: auto;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px 10px 12px 10px;
    position: relative;
}

.want .info .to-call{
    width: 73px;
    height: auto;
    position: absolute;
    top: 30px;
    right: -4px;
}

.want .info .show-more-info {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
}

.want .info .show-more-info.show {
    bottom: 10px;
}

.want .info .show-more-info .item{
    color: #777B87;
    font-size: 12px;
    margin-right: 3px;
}

.want .info .show-more-info img{
    width: 20px;
    height: auto;
}

.want .info-box {
    height: 100px;
    overflow: hidden;
}

.want .info-box.show {
    height: auto;
}

.want .info-box table {
    width: 100%;
    border-spacing: 4px;
}

.want .info-box table .split{
    height: 100px;
}

.want .info-box table tr{
    width: 100%;
}

.want .info-box table tr td {
    font-size: 14px;
    color: #1A2231;
    text-align: left;
}

.want .info-box table tr td .car-info{
    width: 82%;
}

.want .info-box table tr td.label {
    width: 70px;
    color: #777B87;
}

.txt-overflow {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.img-180{
    transform: rotate(180deg);
}
/deep/.van-nav-bar__left, /deep/.van-nav-bar__right{
    color: #ffffff;
}
/deep/.van-nav-bar__right{
    font-size: 17px;
}
</style>