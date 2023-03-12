<template>
    <div class='page'>
        <div class='header'>
            <div class='navbar'>
                <img src="../../assets/back-icon.png" @click="onClickLeft" slot="left" class="Back title">
                <van-search class='search'
                    v-model='searchValue'
                    placeholder='发布人公司名称/姓名/车型品牌'
                    background='#F3F5F8'
                    @search="searchChange"
                >
                    <img class='icon' src='../../assets/icon-input-search.png' slot='left-icon'>
                </van-search>
            </div>
            <van-tabs
                v-model="tabs.active"
                line-width='16px'
                color='#00a8ea'
                title-active-color='#1A2231'
                title-inactive-color='#777B87'
                :swipe-threshold='5'
                @change='tabChange'>
                <van-tab
                    v-for="(item,index) in tabs.nameQueries"
                    :key="index"
                    :title='item.title'
                    :value='item.value'
                />
            </van-tabs>
        </div>
        <ReceiptList class='content' :status='receiptList.status' :searchKey='receiptList.searchKey'/>
        <!-- <TabbarComonent /> -->
    </div>
</template>

<script>
import Vue from "vue";
import { Search, Tabbar, TabbarItem, Tab, Tabs } from "vant";
import ReceiptList from './receipt-tool/ReceiptList.vue';
Vue.use(Search).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs);
import TabbarComonent from '../../../store-common/component/TabbarComponent'

export default {
    name: "enquiry",
    components: {
        ReceiptList,
        TabbarComonent
    },
    data() {
        return {
            searchValue: '',
            navBar:{
                title: '我的报价',
                border: false,
                swipeThreshold: 5
            },
            tabs:{
                active: 0,
                nameQueries: [
                    {
                        title: '全部',
                        value: ''
                    },
                    {
                        title:'待报价',
                        value: '0'
                    },
                    {
                        title:'报价中',
                        value: '1'
                    },
                    {
                        title:'已报价',
                        value: '2,3,4'
                    },
                    {
                        title:'其他',
                        value: '5,6'
                    }
                ]
            },
            receiptList: {
                status: '',
                searchKey: ''
            },
        };
    },
    methods: {
        onClickLeft(){
            this.$router.push('mine')
        },
        tabChange(index){
            this.receiptList.status = this.tabs.nameQueries[index].value;
            this.$forceUpdate();
        },
        searchChange(value){
            this.receiptList.searchKey = value;
            this.$forceUpdate();
        }
    },
}
</script>

<style lang='less' scoped>
.page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background: #F3F5F8;
}

.header {
    width: 100%;
    height: 88px;
    position: fixed;
    top: 0;
    left: 0;
}

.navbar {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 44px;
    padding: 0 16px;
}

.navbar .title {
    font-size: 17px;
    font-weight: bold;
    margin-right: 16px;
}

.navbar .search {
    height: 30px;
    flex: 1;
    padding: 0;
    border-radius: 6px;
}

.navbar .search .icon{
    margin-top: 4px;
    margin-right: 0;
    width: 16px;
    height: 16px;
}

/deep/ .van-search__content {
    border-radius: 6px;
    height: 100%;
}

/deep/ .van-search .van-cell {
    padding: 4px 5px 4px 0 !important;
}

/deep/ .van-search__content .van-field__control::-webkit-input-placeholder {
    color: #777B87;
}

/deep/ .van-search__content .van-field__control::-moz-placeholder {
    color: #777B87;
}

/deep/ .van-search__content .van-field__control:-ms-input-placeholder {
    color: #777B87;
}

/deep/ .van-tabs__line {
    margin-bottom: 6px !important;
    height: 3px !important;
}

/deep/ .van-tab--active {
    font-size: 16px;
    font-weight: bold;
}

/deep/ .van-field__left-icon {
    margin-right: 0 !important;
}

.content {
    margin: 104px 16px 66px 16px;
}
</style>