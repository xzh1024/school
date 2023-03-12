<template>
    <div class="search_con">
       
        <div class="search_box">
            <div class="select_box">
                <van-dropdown-menu active-color="#FF6E4C">
                    <van-dropdown-item 
                        v-model="dropVal" 
                        :options="dropList" 
                        @change="selectChange"/>
                </van-dropdown-menu>
            </div>
            <div class="border_right"></div>
            <div class="search_input_box">
                <van-search
                    background="#ffffff"
                    clearable
                    :placeholder="placeholder"
                    v-model="value"
                    @search="search"
                    @focus="handleFocus"
                >
                    
                    <div
                        v-if="data.content[activeIndex].content === 'VIN码'"
                        slot="left-icon"
                        class="left-icon"
                        @click.stop="choiceImg"
                    >
                        <input
                            v-show="false"
                            ref="picFile"
                            type="file"
                            accept="image/*"
                            @change="readFile"
                        >
                    </div>
                    <div v-else slot="left-icon" />
                    <div slot="right-icon" class="right-icon"  @click="search" />
                </van-search>
            </div>
        </div>
        <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
    </div>
</template>
<script>
import Vue from 'vue';
import VehicleTypeSelector from "../../../store-common/component/VehicleTypeSelector/index";
import { Toast,DropdownMenu,DropdownItem } from 'vant';
Vue.use(DropdownMenu)
    .use(DropdownItem);
import Compressor from 'compressorjs';
import * as imageConversion from 'image-conversion';
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";
import request, { URL_MODULE } from "@/request";

export default {
    name:'search_con',
    components: { ClientApplyDialog },
    data(){
        return{
            activeIndex:0,
            value:'',
            vehicleTypeSearch: {},
            contentList:[],
            dropList:[],
            dropVal:'',
            placeholder:''
        }
    },
    props:{
        data:Object
    },
    mounted(){
        sessionStorage.setItem('searchOptions',JSON.stringify(this.data.content));
        this.initData();
    },
    methods:{
        initData(){
            this.contentList = this.data.content;
            this.contentList.forEach(p=>{
                this.dropList.push({
                    text:p.content1,
                    value:p.content
                })
            })
            this.dropVal = this.dropList[0].value;
            this.placeholder = this.contentList[0].content2;
        },
        choiceImg() {
            this.$refs.picFile && this.$refs.picFile.dispatchEvent(new MouseEvent('click'))
        },
        readFile() {
            var _this = this;
            const inputFile = this.$refs.picFile.files[0];
            const toast = Toast.loading({
                duration: 0,
                message: '识别中...',
                forbidClick: true,
            });
            if (inputFile.size > 6000000) {
                new Compressor(inputFile, {
                    quality: 0.1,
                    success(result) {
                        if (result.size > 1000000) {
                            imageConversion.compressAccurately(result, 600).then(file=>{
                                _this.file2Xce(file).then(res => {
                                    _this.vinParse(_this, toast, res, file.type);
                                });
                            })
                            return;
                        }
                        _this.file2Xce(result).then(res => {
                            _this.vinParse(_this, toast, res, result.type);
                        });
                    }
                });
            } else if (inputFile.size > 600000) {
                imageConversion.compressAccurately(inputFile, 600).then(file=>{
                    _this.file2Xce(file).then(res => {
                        _this.vinParse(_this, toast, res, file.type);
                    });
                })
            } else {
                _this.file2Xce(inputFile).then(res => {
                    _this.vinParse(_this, toast, res, inputFile.type);
                });
            }
        },
        file2Xce(file) {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = e.target.result;
                    resolve(data);
                };
                reader.readAsDataURL(file);
            });
        },
        vinParse(_this, toast, fileData, fileType) {
            const imgCode = fileData.replace(`data:${fileType};base64,`, "")
            request({
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8'
                },
                method: "post",
                baseURL: URL_MODULE.united,
                url: "/ocr/vin",
                data: imgCode,
            }).then(res1 => {
                toast.clear();
                _this.value = res1;
            })
            .catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message)
                }
            })
            .finally(() => {
                toast.clear();
                _this.$refs.picFile.value = "";
            });
        },
        changeActive(item,index){
            this.activeIndex=index;
            if(item.content==="车型"){
                this.selectVehicleType();
            }
        },
        selectChange(val){
            this.contentList.forEach((p,index)=>{
                if(val == p.content){
                    this.placeholder = p.content2;
                    this.activeIndex = index;
                }
            })
            if(val==="车型"){
                this.selectVehicleType();
            }
        },
        selectVehicleType() {
            VehicleTypeSelector.select(this.axios.prototype.dataService)
            .then(res => {
                this.vehicleTypeSearch = { ...res, combine: { ...res.combine } };
                this.value = this.vehicleTypeFormatter(res);
            })
            .catch(res => {
                if (res.type == "fail") {
                    Toast.fail(res.error);
                }
            });
        },
        handleFocus() {
            const currentSearchType = this.data.content[this.activeIndex].content;
            if(currentSearchType === "车型") {
                this.selectVehicleType();
            }
        },
        handleSearch() {
            let currentSearchType = this.data.content[this.activeIndex].content;
            let content1 = this.data.content[this.activeIndex].content1;
            switch (currentSearchType) {
                case "VIN码":
                if (this.value.length != 17) {
                    Toast.fail("输入17位"+content1);
                } else {
                    this.vinInfo(this.value)
                    .then(data => {
                        this.toSkuList({
                            searchType: "vehicle",
                            brand: data.brandClass,
                            subBrand: data.maker,
                            vehSeries: data.vehicleChn,
                            year: data.year,
                            displacement: data.displacement,
                            transmission: data.transmission,
                            chassisNo:  data.chassisNo,
                            driverType: data.driverType
                        });
                    })
                    .catch(error => {
                        Toast.fail(error);
                    });
                }
                break;
                case "OE号":
                if (this.value.length < 5) {
                    Toast.fail("输入5位及以上"+content1);
                } else {
                    this.toSkuList({
                        searchType: "oe",
                        oe: this.value,
                        remark: this.value
                    });
                }
                break;
                case "关键字":
                if (this.value.length < 2) {
                    Toast.fail("请输入2位及以上"+content1);
                } else {
                    this.toSkuList({
                        searchType: "keyword",
                        keyword: this.value,
                        remark: this.value
                    });
                }
                break;
                case "车型":
                if (!this.vehicleTypeSearch.factoryBrand && !this.vehicleTypeSearch.brand) {
                    Toast.fail("请先选择"+content1);
                    this.selectVehicleType();
                } else {
                    this.toSkuList({
                        searchType: "vehicle",
                        brand: this.vehicleTypeSearch.brand,
                        subBrand: this.vehicleTypeSearch.factoryBrand || (this.vehicleTypeSearch.combine ? this.vehicleTypeSearch.combine.fname : ""),
                        vehSeries: this.vehicleTypeSearch.series,
                        year: this.vehicleTypeSearch.year || this.vehicleTypeSearch.model,
                        displacement: this.vehicleTypeSearch.combine ? this.vehicleTypeSearch.combine.displacement : "",
                        transmission: this.vehicleTypeSearch.combine ? this.vehicleTypeSearch.combine.transmission : "",
                        chassisNo: this.vehicleTypeSearch.combine ? this.vehicleTypeSearch.combine.chassisNo : "",
                        driverType: this.vehicleTypeSearch.combine ? this.vehicleTypeSearch.combine.driverType : ""
                    });
                }
                break;
            }
        },
        search() {
            this.$refs.clientApplyDialog.checkState(this.handleSearch);
        },
        vehicleTypeFormatter(value) {
            let text = "";
            let factoryBrand = value.factoryBrand || value.brand;
            let series = value.series;
            let year = value.year || value.model;
            let combine = value.combine;
            if (factoryBrand) {
                text += factoryBrand;
            }
            if (series) {
                text += " " + series;
            }
            if (year) {
                text += " " + year;
            }
            if (combine) {
                if (this.axios.prototype.dataService === "bmy") {
                    text +=  ' ' + combine.name;
                } else {
                    text +=  ' ' + combine.displacement + ' ' + combine.gearbox;
                }
            }
            return text;
        },
        vinInfo(vin) {
            return new Promise((res, rej) => {
                request({
                    baseURL: URL_MODULE.united,
                    url: "/company-skus/vin",
                    params: {
                        vin: vin
                    }
                })
                .then(
                    function(resp) {
                        if (resp.length) {
                            res(resp[0]);
                        } else {
                            rej("VIN定型失败");
                        }
                    },
                    function() {
                        rej("VIN定型失败");
                    }
                );
            });
        },
        toSkuList(querys) {
            this.$router.push({
                name: `skuList`,
                query: querys
            });
        },
    }
}
</script>
<style lang="less" scoped>
.search_con{
    background: rgba(#FF6E4C, 0.2);
    .search_box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        border-radius: 0.16rem;
        background: rgba(255, 255, 255, 0.47) !important;
        border: 0.02667rem solid #fff;
        .select_box{
            width:60px;
            height:30px;
            padding:0 4px;
            /deep/.van-dropdown-menu{
                width:60px;
                height:30px;
                background:transparent;
            }
            /deep/.van-dropdown-menu__bar{
                width:60px;
                height:30px;
                background: transparent;
                box-shadow: none;
            }
            /deep/.van-dropdown-menu__item{
                width:60px;
                height: 30px;
                .van-dropdown-menu__title::after {
                    border-bottom-color: #fff;
                    border-left-color: #fff;
                }
                // .van-dropdown-menu__title--active::after {

                // }
            }
            /deep/.van-ellipsis{
                color:#fff;
                font-size: 14px;
            }
            /deep/.van-overlay,
            /deep/.van-popup--top{
                top:.1rem;
            }
        }
        .border_right{
            width: 1px;
            height: 20px;
            background: #fff;
            margin-left: 8px;
        }
        .search_input_box{
            flex:1;
            /deep/.van-search{
                padding: 0;
                background: transparent!important;
                border: none;
            }
            /deep/.van-search__content{
                border-radius: 6px;
                background: transparent;
                border: none;
                padding-left: 0;
            }
            /deep/.van-field__control{
                color:#fff;
                font-size: 14px;
                font-weight: 400;
                &::-webkit-input-placeholder{
                    color:#fff;
                    font-weight: 400;
                }
            }
            /deep/ .van-field__left-icon {
                margin: 0 0 0 8px;
            }
        }
    }
}
.left-icon {
    margin-top: 4px;
    width: 17px;
    height: 17px;
    background-image: url('../../assets/store/icon-search-qr.png');
    background-repeat: no-repeat;
    background-size: 17px;
}
.right-icon {
    width: 17px;
    height: 17px;
    background-image: url('../../assets/store/icon-search-w.png');
    background-repeat: no-repeat;
    background-size: 17px;
}
</style>


