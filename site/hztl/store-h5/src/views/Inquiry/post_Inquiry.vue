<template>
    <div id="post_Inquiry">
        <van-nav-bar @click-left="onClickLeft">
            <span class="left-title" slot="left">发布询价</span>
            <!-- <div class="nav-botton btn-save" slot="right" @click="toList">询价单</div> -->
        </van-nav-bar>
        <div class="nav-tab">
            <span :class="{'tab-item':true,'isActive':tab.key===tabActive,'notClick':(tab.key!==tabActive&&Update)}" @click="taget(tab.key)" v-for="(tab,index) in tabList" :key="index">{{tab.value}}</span>
        </div>
        <div v-if="this.tabActive===0">
            <div class="container-car">
                <div class="pages-title">
                    <span>车辆信息</span>
                </div>
                <div class="con-input">
                    <span>VIN码：</span>
                    <input type="text" name="vin" @blur="match" v-model="vinUpper" maxlength="17" id="vin" style="width:7.466667rem;" placeholder="请输入VIN码">
                </div>
                <div class="con-input">
                    <span><span class="required">*</span>车型：</span>
                    <input type="text" name="car" v-model="formData.car" @click="chooseCar" id="car" readonly style="width:6.666667rem;" placeholder="请选择车型">
                    <span class="select" @click="chooseCar"></span>
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div class="container-part">
                <div class="pages-title">
                    <span>配件列表</span>
                    <span class="right" @click="choosePart">选配件</span>
                </div>
                <div class="part-list">
                    <div class="con-input part-item" v-for="(item,index) in formData.partDetail" :key="index">
                        <input type="text" class="input-border" maxlength="20" v-model="item.partName" placeholder="请输入配件名称">
                        <input type="number" class="input-border" @blur="checkqty(item.qty)" v-model="item.qty" placeholder="请输入数量">
                        <input type="text" class="input-border"  maxlength="15" v-model="item.quality"  placeholder="请输入品质要求">
                        <span class="select-quality" @click="Showquality(index)"></span>
                        <img src="../../assets/icon-x.png" @click="DelpartDetail(index)"  alt="删除">
                    </div>
                    <div class="part-add">
                        <img src="../../assets/icon-add-list.png" alt="" @click="AddpartDetail">
                    </div>
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div class="container-supply">
                <div class="pages-title">
                    <span>供货要求</span>
                </div>
                <div class="con-input">
                    <span>发票类型：</span>
                    <input type="radio" name='invoiceType' style="width:0" v-model="formData.invoiceType" id="receipt" value="receipt">
                    <label for="" class="radio-label" @click="IDclick('#receipt')">
                        收据
                    </label>
                    <input type="radio" name='invoiceType' v-model="formData.invoiceType" id="regularInvoice" value="regularInvoice">
                    <label for="" class="radio-label ml-5" @click="IDclick('#regularInvoice')">
                        普通发票
                    </label>
                    <input type="radio" name='invoiceType' v-model="formData.invoiceType" id="appreciationInvoice" value="appreciationInvoice">
                    <label for="" class="radio-label  ml-5" @click="IDclick('#appreciationInvoice')">
                        增值发票
                    </label>
                </div>
                <div class="con-input">
                    <span>供货时效：</span>
                    <input type="text" class="input-border windth-240" name="deliveryTime" v-model="formData.deliveryTime" id="deliveryTime" placeholder="请输入时效要求，如：3小时内能发货">
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div  class="container-remark">
                <div class="pages-title">
                    <span>备注信息</span>
                </div>
                <div class="remark-img">
                    <span>图片：</span>
                    <van-uploader
                        v-model="fileList"
                        multiple
                        :max-count="10"
                        class="file-upload"
                        :before-read="beforeRead"
                        @delete="Delete"
                        style="overflow: inherit;"
                    />
                    <!-- <span class="num">最多10张</span> -->
                </div>
                <div class="remark-note">
                    <span>备注：</span>
                    <img class="remark-x" v-if="formData.remarks!=''" @click="clearRem" src="../../assets/remark-x.png" alt="">
                    <textarea v-model="formData.remarks" cols="40" rows="4" x-webkit-speech=”x-webkit-speech” maxlength="200" placeholder="填写备注信息"></textarea>
                    <div class="num-textarea">
                            <span class="input-num">{{formData.remarks.length}}</span>
                            <span>/</span><span>200</span>
                    </div>               
                </div>
            </div>
        </div>
        <div v-if="this.tabActive===1">
            <div class="container-brand">
                <div class="pages-title">
                    <span>询价范围</span>
                    <span class="center clear" @click="batchData.brandsScope=[]">清除</span>
                    <span class="right" @click="chooseBrand">选品牌</span>
                </div>
                <div class="brand-range">
                    <span class="brand-key" v-if="batchData.brandsScope.length>0" v-for="(item,index) in batchData.brandsScope" :key="index">
                        {{item}} 
                        <span @click="delBrand(index)" class="key-del"></span>
                    </span>
                    <span class="brand-defualt" v-if="batchData.brandsScope.length==0">请选择询价范围</span>
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div class="container-part">
                <div class="pages-title">
                    <span>配件列表</span>
                    <span class="center" @click="downloadTemplate">
                        下载模板</span>
                    <span class="right" style="position: relative;">
                        <input
                            type="file"
                            id="uploadTemplate"
                            @change="Upload"
                        >
                        上传Excel
                    </span>
                </div>
                <div class="part-list">
                    <div class="con-input part-item" v-for="(item,index) in batchData.partDetail" :key="index">
                        <input type="text" class="input-border" maxlength="20" v-model="item.partCode" placeholder="请输入配件编码">
                        <input type="number" class="input-border" @blur="checkqty(item.qty)" v-model="item.qty" placeholder="请输入数量">
                        <input type="text" class="input-border"  maxlength="15" v-model="item.quality"  placeholder="请输入品质要求">
                        <span class="select-quality" @click="Showquality(index)"></span>
                        <img src="../../assets/icon-x.png" @click="DelpartDetail(index)"  alt="删除">
                    </div>
                    <div class="part-add">
                        <img src="../../assets/icon-add-list.png" alt="" @click="AddpartDetail">
                    </div>
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div class="container-supply">
                <div class="pages-title">
                    <span>供货要求</span>
                </div>
                <div class="con-input">
                    <span>发票类型：</span>
                    <input type="radio" name='invoiceType' style="width:0" v-model="batchData.invoiceType" id="batchreceipt" value="receipt">
                    <label for="" class="radio-label" @click="IDclick('#batchreceipt')">
                        收据
                    </label>
                    <input type="radio" name='invoiceType' v-model="batchData.invoiceType" id="batchregularInvoice" value="regularInvoice">
                    <label for="" class="radio-label ml-5" @click="IDclick('#batchregularInvoice')">
                        普通发票
                    </label>
                    <input type="radio" name='invoiceType' v-model="batchData.invoiceType" id="batchappreciationInvoice" value="appreciationInvoice">
                    <label for="" class="radio-label  ml-5" @click="IDclick('#batchappreciationInvoice')">
                        增值发票
                    </label>
                </div>
                <div class="con-input">
                    <span>供货时效：</span>
                    <input type="text" class="input-border windth-240" name="deliveryTime" v-model="batchData.deliveryTime" id="deliveryTime" placeholder="请输入时效要求，如：3小时内能发货">
                </div>
            </div>
            <div class="container-cleavage"></div>
            <div  class="container-remark">
                <div class="pages-title">
                    <span>备注信息</span>
                </div>
                <div class="remark-img">
                    <span>图片：</span>
                    <van-uploader
                        v-model="batchfileList"
                        multiple
                        :max-count="10"
                        class="file-upload"
                        :before-read="beforeRead"
                        @delete="Delete"
                        style="overflow: inherit;"
                    />
                </div>
                <div class="remark-note">
                    <span>备注：</span>
                    <img class="remark-x" v-if="batchData.remarks!=''" @click="clearRem" src="../../assets/remark-x.png" alt="">
                    <textarea v-model="batchData.remarks" cols="40" rows="4" x-webkit-speech=”x-webkit-speech” maxlength="200" placeholder="填写备注信息"></textarea>
                    <div class="num-textarea">
                            <span class="input-num">{{batchData.remarks.length}}</span>
                            <span>/</span><span>200</span>
                    </div>               
                </div>
            </div>
        </div>
        <div class="tab-pro-bottom">
            <div class="right">
                <span class="btn-finish" @click="save">保存</span>
                <span class="btn-submit" @click="publish">发布</span>
            </div> 
        </div>
        <van-popup v-model="showfactory" position="bottom">
            <van-picker
                show-toolbar title="请选择厂牌"
                :columns="factoryBrandFilter"
                @confirm="factoryBrandChange"
                @cancel="onCancel"
            >  
            <van-search slot="columns-top" placeholder="请输入您想要搜索的厂牌" v-model="value" show-action @search="onSearch" @clear="this.factoryBrandFilter=this.factoryBrandList">
                <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </van-picker>
        </van-popup>
        <van-popup v-model="showseries" :duration='0' position="bottom">
            <van-picker
                show-toolbar
                title="请选择车系"
                :columns="seriesList"
                @confirm="seriesChange"
                @cancel="onCancel"
            />
        </van-popup>
        <van-popup v-model="showyear" :duration='0' position="bottom">
            <van-picker
                show-toolbar title="请选择年限"
                :columns="yearList"
                @confirm="yearChange"
                @cancel="onCancel"
            />
        </van-popup>
        <van-popup v-model="showcombine" :duration='0' position="bottom">
            <van-picker title="请选择排量变速箱"
                show-toolbar
                :columns="combineList"
                @confirm="combineChange"
                @cancel="onCancel"
            />
        </van-popup>
        <van-popup v-model="qualityShow" position="bottom">
            <van-picker title="请选择品质"
                show-toolbar
                :columns="qulityList"
                @confirm="Confirm"
                @cancel="Cancel"
            />
        </van-popup>
        <van-overlay :show="show">
            <van-loading size="24px" class="load-center" color="#ffffff">图片上传中...</van-loading>
        </van-overlay>
        <van-overlay :show="Uploadshow">
            <van-loading size="24px" class="load-center" color="#ffffff">Excel解析中...</van-loading>
        </van-overlay>
    </div>
</template>
<script>
import Vue from "vue";
import VehicleTypeSelector from "../../../store-common/component/VehicleTypeSelector/index";
import { NavBar,Field,Uploader,Toast,Picker,Popup,Search,Overlay,Loading,Dialog} from "vant";
import $ from "jquery";
Vue.use(NavBar).use(Field).use(Uploader).use(Toast).use(Picker).use(Popup).use(Search).use(Overlay).use(Loading).use(Dialog)
import { uploadImgFile } from "@/api/common";
import { read, utils, write } from "xlsx";
import { GetQueryString } from './../../../src/request/http'
import request, { URL_MODULE } from "@/request";
export default {
    name: "post_Inquiry",
    data() {
        return {
            showfactory:false,
            showseries:false,
            showyear:false,
            show:false,
            showcombine:false,
            qualityShow:false,
            value:'',
            partIndex:0,
            formData:{
                wantCode:'',
                pushToDealer:false,
                vin:'',
                car:'',
                factoryBrand:'',
                series:'',
                combine:'',
                year:'',
                displacement:'',
                gearbox:'',
                invoiceType:'receipt',
                deliveryTime:'',
                partDetail:[{
                    partCode: "",   
                    partName: "",   
                    qty: 1,                 
                    quality: "原厂流通件（4S）"           
                }],
                pictures:[],
                remarks:'',
            },
            batchData:{
                wantCode:'',
                pushToDealer:false,
                invoiceType:'receipt',
                deliveryTime:'',
                partDetail:[{
                    partCode: "",   
                    partName: "",   
                    qty: 1,                 
                    quality: "原厂流通件（4S）"           
                }],
                pictures:[],
                remarks:'',
                brandsScope:[]
            },
            fileList:[],
            batchfileList:[],
            factoryBrandList:[],
            factoryBrandFilter:[],
            seriesList:[],
            yearList:[],
            combineList:[],
            qulityList:[],
            dotype:'',
            tabList:[{
                key:0,
                value:"车型询价"
            },{
                key:1,
                value:"批量询价"
            }],
            tabActive:0,
            Update:false,//false：新增，true：编辑
            Uploadshow:false,
            sheet:["* 配件编码","* 数量","品质"],
            sheetClomns:[
                {
                    key:"* 配件编码",
                    value:'partCode'
                },{
                    key:"* 数量",
                    value:'qty'
                },{
                    key:"品质",
                    value:'quality'
                }
            ],
        };
    },
    computed : {
        vinUpper: {
            get: function(){
                return this.formData.vin;
            },
            set : function(val){
                this.formData.vin = val.toUpperCase();
            }
        }
    },
    created(){
        this.getfactoryBrand()
        this.getinsureCertType()
        this.load()
    },
    beforeRouteEnter(to, from, next) { //路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
        to.meta['fromPath'] = from.path;
        if (from.path == '/VehicleClass'||from.path == '/brandManageAdd') {
            to.meta['needFresh'] = false;
            to.meta['formVehicleClass']=true;
        } else {
            to.meta['needFresh'] = true;
        }
        next();
    },
    activated() { //此方法在页面缓存时会被调用，根据路由元信息决定是否重新加载数据。不加载则是上次填写完的数据
        if (this.$route.meta['needFresh']) {
            this.getfactoryBrand()
            this.getinsureCertType()
            this.load()
        } else{
                let partName=decodeURIComponent(GetQueryString("partName"))
                if(partName&&partName!='null'){
                partName=partName.split(",")
                partName.forEach((part)=>{
                    this.formData.partDetail.push({
                        partCode: "",   
                        partName: part,   
                        qty: 1,                 
                        quality: "原厂流通件（4S）"  
                    })
                })
                this.formData.partDetail.forEach((item,index)=>{
                    if(item.partName==""){
                        this.formData.partDetail.splice(index,1)
                    }
                })
            }
            if(GetQueryString('chooseBrand')){
                this.batchData.brandsScope=decodeURIComponent(GetQueryString('chooseBrand')).split(",");
            }
            this.$forceUpdate();
        }
    },
    methods: {
        toList(){
            this.$router.push("Inquiry");
        },
        taget(key){
            if(this.Update){ //编辑状态下不能切换页签
                return false;
            }else{
                this.tabActive=key
            }
        },
        downloadTemplate(){
            let filepath='/excel/批量询价模板.xlsx'
            this.$router.push("downloadTemplate?fileSrc="+filepath);
        },
        Upload(event){//上传EXcel
            let file =event.srcElement.files[0];
            if(file&&file.name.indexOf('.xlsx')<0){
                Toast.fail('文件类型不正确！请上传xlsx文件。')
                return false;
            }
            if(file){
                this.Uploadshow=true;
                this.readWorkbookFromLocalFile(file);
            }
        },
        readWorkbookFromLocalFile(file) {
            let that=this;
            let reader = new FileReader();
            reader.onload=function(e){
                let data = e.target.result;
                let workbook = read(data, { type: "binary" });
                let excelJson = utils.sheet_to_json(workbook.Sheets.Sheet1);
                that.readExcelJson(excelJson);
            };
            reader.readAsBinaryString(file);
        },
        readExcelJson(excelJson) {
            try{
                if(excelJson&&excelJson.length>0){
                    this.batchData.partDetail.forEach((item,index)=>{
                        if(item.partCode==""){
                            this.batchData.partDetail.splice(index,1)
                        }
                    })
                    excelJson.forEach((item,index)=>{
                        let part={};
                        for(var prop in item){
                            if(!item.hasOwnProperty('* 配件编码')){
                                throw new Error(`第${index+1}行数据错误，配件编码必填！请修改后重新上传`);
                            }
                            if(!item.hasOwnProperty('* 数量')){
                                throw new Error(`第${index+1}行数据错误，数量必填！请修改后重新上传`);
                            }
                            if(this.sheet.includes(prop)){
                                this.sheetClomns.forEach((clomn)=>{
                                    if(prop==clomn.key&&prop=="* 数量"&&!/^[0-9]*[1-9][0-9]*$/.test(item[prop])){
                                        throw new Error(`第${index+1}行数据错误，数量只能为大于1的整数！请修改后重新上传`);
                                    }else if(prop==clomn.key){
                                        part[clomn.value]=item[prop].toString();
                                    }
                                })
                            }else{
                                this.Uploadshow=false;
                                Dialog.confirm({title: '提示',
                                    message: '模板不正确！请下载模板后重新上传',
                                    confirmButtonText:'确定'}).then(() => {
                                });
                                return false;
                            }
                        }
                        if(!part.hasOwnProperty('partName')){
                            part.partName=''
                        }
                        if(!part.hasOwnProperty('quality')){
                            part.quality=''
                        }
                        this.batchData.partDetail.push(part);
                    })
                    this.Uploadshow=false;
                }else{
                    this.Uploadshow=false;
                    Dialog.confirm({title: '提示',
                        message: '没有数据！请重新上传',
                        confirmButtonText:'确定'}).then(() => {
                    });
                    return false;
                }
            }catch(e){
                this.Uploadshow=false;
                Dialog.confirm({title: '提示',
                    message: e,
                    confirmButtonText:'确定'}).then(() => {
                });
            }
            $('#uploadTemplate').val('');
        },
        chooseBrand(){
            this.$router.push('brandManageAdd?choose=true&type=Inquiry&brand='+this.batchData.brandsScope.join(','))
        },
        delBrand(index){
            this.batchData.brandsScope.splice(index,1);
            this.$forceUpdate();
        },
        load(){
            this.formData.wantCode=GetQueryString("wantCode");
            this.dotype=GetQueryString("type")
            if(this.formData.wantCode){
                this.Update=true;
                this.loadDetail();
            }else{
                Object.assign(this.$data, this.$options.data())
                if(this.tabActive==1){
                    request({
                        baseURL: URL_MODULE.united,
                        url: '/wants-v2/wants/publisher-latest/1'
                    })
                    .then((res)=>{
                        if(res&&res.brandsScope){
                            this.batchData.brandsScope=res.brandsScope;
                        }
                    }).catch((err)=>{
                        if(err && err.message) {
                            Toast.fail(err.message);
                        }
                    })
                }
                
            }
        },
        //vin码匹配车型
        match(){
            if(this.formData.vin){
                request({
                    baseURL: URL_MODULE.united,
                    url: "/company-skus/vin",
                    params: {
                        vin:this.formData.vin
                    }
                }).then((data)=>{
                        if(data&&data.length>0){
                            this.mactchBrand(data[0])
                        }
                }).catch((data)=>{
                    if(data && data.message) {
                        Toast.fail(data.message)
                    }
                })
            }
        },
        //给车型赋值
        mactchBrand(data){
            this.formData.factoryBrand=data.maker||data.factoryBrand;
            if(!this.factoryBrandList.some((item)=>item==this.formData.factoryBrand)){
                this.factoryBrandList.push(this.formData.factoryBrand);
            }
            this.formData.series=data.vehicleChn||data.series;
            if(!this.seriesList.some((item)=>item==this.formData.series)){
                this.seriesList.push(this.formData.series);
            }
            this.formData.year=data.year;
            if(!this.yearList.some((item)=>item==this.formData.year)){
                this.yearList.push(this.formData.year);
            }
            this.formData.displacement=data.displacement;
            this.formData.gearbox=data.transmission||data.gearbox
            if(!this.combineList.some((item)=>item==this.formData.displacement+' '+this.formData.gearbox)){
                this.combineList.push(this.formData.displacement+' '+this.formData.gearbox)
            }
            this.formData.car=this.formData.factoryBrand+' '+this.formData.series+' '+
                this.formData.year+' '+this.formData.displacement+' '+this.formData.gearbox;
        },
        //vin码匹配车型
        match(){
            request({
                baseURL: URL_MODULE.united,
                url: "/company-skus/vin",
                params: {
                    vin:this.formData.vin
                }
            }).then((data)=>{
                if(data&&data.length>0){
                    this.mactchBrand(data[0])
                }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        //给车型赋值
        mactchBrand(data){
            this.formData.factoryBrand=data.maker||data.factoryBrand;
            if(!this.factoryBrandList.some((item)=>item==this.formData.factoryBrand)){
                this.factoryBrandList.push(this.formData.factoryBrand);
            }
            this.formData.series=data.vehicleChn||data.series;
            if(!this.seriesList.some((item)=>item==this.formData.series)){
                this.seriesList.push(this.formData.series);
            }
            this.formData.year=data.year;
            if(!this.yearList.some((item)=>item==this.formData.year)){
                this.yearList.push(this.formData.year);
            }
            this.formData.displacement=data.displacement;
            this.formData.gearbox=data.transmission||data.gearbox
            if(!this.combineList.some((item)=>item==this.formData.displacement+' '+this.formData.gearbox)){
                this.combineList.push(this.formData.displacement+' '+this.formData.gearbox)
            }
            this.formData.car=this.formData.factoryBrand+' '+this.formData.series+' '+
                this.formData.year+' '+this.formData.displacement+' '+this.formData.gearbox;
        },
        //数据回显 
        loadDetail(){
            request({
                baseURL: URL_MODULE.united,
                url: "/wants-v2/wants/publisher/"+GetQueryString("wantCode")
            }).then((data)=>{
                if(data.wantType){
                    this.tabActive=data.wantType;
                }else{  //适配老数据
                    this.tabActive=0;
                }
                if(this.tabActive===0){
                    this.formData=data
                    this.formData.combine=data.displacement+' '+data.gearbox;
                    this.formData.car=this.formData.factoryBrand+' '+this.formData.series+' '+
                    this.formData.year+' '+this.formData.displacement+' '+this.formData.gearbox;
                    this.factoryBrandList.push(this.formData.factoryBrand)
                    this.seriesList.push(this.formData.series)
                    this.yearList.push(this.formData.year)
                    this.combineList.push(this.formData.combine)                    
                    this.formData.partDetail=data.details
                    let pictures=data.pictures
                    if(pictures&&pictures.length>0){
                        this.fileList=[];
                        pictures.forEach((item)=>{
                            this.fileList.push({ url: item, isImage: true });
                        })
                    }
                }else{
                    this.batchData=data;
                    this.batchData.partDetail=data.details
                    let pictures=data.pictures
                    if(pictures&&pictures.length>0){
                        this.batchfileList=[];
                        pictures.forEach((item)=>{
                            this.batchfileList.push({ url: item, isImage: true });
                        })
                    }
                }
                
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        clearRem(){
            this.formData.remarks='';
            this.$forceUpdate();
        },
        onClickLeft() {
            if(this.$route.meta['formVehicleClass']){
                this.$router.push('home')
            }else{
                this.historyBack(-1);
            }
        },
        //检查数量不能小于0大于10000
        checkqty(qty){
            if(Number(qty)<=0){
                Toast.fail("数量必须大于0!")
            }else if(Number(qty)>10000){
                Toast.fail("数量必须小于10000!")
            }
        },
        IDclick(id){
            $(id).click()
        },
        onSearch(){
            if(this.value!=''){
                this.factoryBrandFilter=this.factoryBrandList.filter((item)=>{
                    return item.toLowerCase().includes(this.value.toLowerCase());
                })
            }else{
                this.factoryBrandFilter=this.factoryBrandList;
            }
        },
        choosePart(){
            if(this.formData.factoryBrand==''){
                Toast.fail("请选择车型！")
                return false;
            }
            this.$router.push('VehicleClass?factoryBrand='+this.formData.factoryBrand+
            "&series="+this.formData.series+
            "&year="+this.formData.year+
            "&displacement="+this.formData.displacement+
            "&gearbox="+this.formData.gearbox)
        },
        chooseCar(){
            this.formData.factoryBrand='';
            this.formData.series='';
            this.formData.year='';
            this.formData.combine='';
            this.selectVehicleType();
        },
        selectVehicleType() {
            let that = this;
            VehicleTypeSelector.select(this.axios.prototype.dataService)
            .then(res => {
                let vehicleTypeSearch = { ...res, combine: { ...res.combine } };
                that.formData.factoryBrand=vehicleTypeSearch.factoryBrand;
                that.formData.series=vehicleTypeSearch.series?vehicleTypeSearch.series:'';
                that.formData.year=vehicleTypeSearch.year?vehicleTypeSearch.year:'';
                that.formData.combine=vehicleTypeSearch.combine?vehicleTypeSearch.combine:'';
                that.formData.displacement=vehicleTypeSearch.combine.displacement?vehicleTypeSearch.combine.displacement:'';
                that.formData.gearbox=vehicleTypeSearch.combine.gearbox?vehicleTypeSearch.combine.gearbox:'';
                that.formData.car = that.vehicleTypeFormatter(res);
            })
            .catch(res => {
                if (res.type == "fail") {
                    Toast.fail(res.error);
                }
            });
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
        getinsureCertType(){
            request({
                url: "/dicts/invoice-and-insurecert"
            }).then((data)=>{
                this.qulityList=[]
                if(data.insureCertType&&data.insureCertType.length>0){
                        data.insureCertType.forEach((item)=>{
                            this.qulityList.push(item.name)
                        })
                    }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        getfactoryBrand(){//获取厂牌
            var params={
                type:'factoryBrand'
            };
            request({
                baseURL: URL_MODULE.united,
                url: '/open/veh-models',
                params
            }).then((data)=>{
                if(data&&data.length>0){
                    this.factoryBrandList=data;
                    this.factoryBrandList.unshift('');
                    this.factoryBrandFilter=this.factoryBrandList;
                }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        factoryBrandChange(value) {
            this.showfactory=false;
            this.showseries=true;
            this.formData.factoryBrand=value
            this.formData.car=value
            this.getseries();
        },
        getseries(){//获取车系
            var params={
                type:'series',
                factoryBrand:this.formData.factoryBrand
            }
            request({
                baseURL: URL_MODULE.united,
                url: '/open/veh-models',
                params
            }).then((data)=>{
                if(data&&data.length>0){
                    this.seriesList=data
                    this.seriesList.unshift('');
                }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message)
                }
            })
        },
        seriesChange(value) {
            this.showseries=false;
            this.showyear=true;
            this.formData.series=value
            this.formData.car+=" "+value
            this.getyear();
        },
        getyear(){//获取年限
            var params={
                type:'year',
                factoryBrand:this.formData.factoryBrand,
                series:this.formData.series
            }
            request({
                baseURL: URL_MODULE.united,
                url: '/open/veh-models',
                params
            }).then((data)=>{
                if(data&&data.length>0){
                    this.yearList=data
                    this.yearList.unshift('');
                }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        yearChange(value) {
            this.showyear=false;
            this.showcombine=true;
            this.formData.year=value
            this.formData.car+=" "+value
            this.getcombine();
        },
        getcombine(){//获取变速箱
            var params={
                type:'combine',
                factoryBrand:this.formData.factoryBrand,
                series:this.formData.series,
                year:this.formData.year,
            }
            request({
                baseURL: URL_MODULE.united,
                url: '/open/veh-models',
                params
            }).then((data)=>{
                if(data&&data.length>0){
                    data.forEach((item)=>{
                        this.combineList.push(item.displacement+' '+item.gearbox)
                    })
                    this.combineList.unshift('');
                }
            }).catch((data)=>{
                if(data && data.message) {
                    Toast.fail(data.message);
                }
            })
        },
        combineChange(value) {
            this.showcombine=false;
            this.formData.combine=value;
            this.formData.displacement=value.split(' ')[0];
            this.formData.gearbox=value.split(' ')[1];
            this.formData.car+=" "+value;
        },
        onCancel(picker, values){
            this.showfactory=false;
            this.showseries = false;
            this.showyear = false;
            this.showcombine = false;
        },
        onConfirm(value){
            this.formData.car+=' '+value;
            this.showfactory = false;
            this.showseries = false;
            this.showyear = false;
            this.showcombine = false;
        },
        Cancel(){
            this.qualityShow=false;
        },
        Confirm(value){
            if(this.tabActive===0){
                this.formData.partDetail[this.partIndex].quality=value;
            }else{
                this.batchData.partDetail[this.partIndex].quality=value;
            }
            this.qualityShow=false;
        },
        Showquality(index){
            this.qualityShow=true;
            this.partIndex=index;
        },
        beforeRead(file) {
            this.show = true;
            return new Promise((resolve, reject) => {
                // 上传文件大小限制
                if(Array.isArray(file)) {
                    const fileSizeTotal = file.reduce((total, item) => {
                        return total + item.size;
                    }, 0);
                    if(fileSizeTotal / 1024 / 1024 > 30) {
                        this.show = false;
                        Toast.fail("上传图片大于30M，请整理后重新上传！");
                        reject();
                        return;
                    }
                } else {
                    if(file.size / 1024 / 1024 > 30) {
                        this.show = false;
                        Toast.fail("上传图片大于30M，请整理后重新上传！");
                        reject();
                        return;
                    }
                }
                
                if(this.tabActive === 0) {
                    if((file.length || 1) + this.formData.pictures.length > 10) {
                        this.show = false;
                        Toast.fail("最多只能上传10张图片");
                        reject();
                    } else {
                        uploadImgFile({file}).then(res => {
                            this.show = false;
                            if(Array.isArray(res)) {
                                this.formData.pictures = [...this.formData.pictures, ...res];
                                resolve();
                            } else {
                                Toast.fail("图片上传失败！");
                                reject();
                            }
                        }).catch(() => {
                            this.show = false;
                            Toast.fail("图片上传失败！")
                        });
                    }
                } else {
                    if((file.length || 1) + this.batchData.pictures.length > 10) {
                        this.show = false;
                        Toast.fail("最多只能上传10张图片");
                        reject();
                    } else {
                        uploadImgFile({file}).then(res => {
                            this.show = false;
                            if(Array.isArray(res)) {
                                this.batchData.pictures = [...this.batchData.pictures, ...res];
                                resolve();
                            } else {
                                Toast.fail("图片上传失败！");
                                reject();
                            }
                        }).catch(() => {
                            this.show = false;
                            Toast.fail("图片上传失败！")
                        });
                    }
                }
            });
        },
        Delete(file,detail){
            if(this.tabActive===0){
                this.formData.pictures.splice(detail.index,1)
            }else{
                this.batchData.pictures.splice(detail.index,1)
            }
        },
        AddpartDetail(){ //添加配件
            if(this.tabActive===0){
                this.formData.partDetail.push({
                    partCode: "",   
                    partName: "",   
                    qty: 1,                 
                    quality: "原厂流通件（4S）"           
                })
            }else{
                this.batchData.partDetail.push({
                    partCode: "",   
                    partName: "",   
                    qty: 1,                 
                    quality: "原厂流通件（4S）"           
                })
            }
            this.$forceUpdate();
        },
        DelpartDetail(index){ //删除配件
            if(this.tabActive===0){
                this.formData.partDetail.splice(index,1);
            }else{
                this.batchData.partDetail.splice(index,1);
            }
            this.$forceUpdate();
        },
        save(){
            this.type="save"
            this.subHandle() 
            
        },
        //发布
        publish(){
            this.type="publish"
            this.subHandle() 
        },
        checkRequier(){ //判断必输项
            if(this.formData.partDetail.some((item)=>item.partName=="")&&this.tabActive===0){
                Toast.fail("请输入配件名称！")
                return false
            }
            if(this.batchData.partDetail.some((item)=>item.partCode=="")&&this.tabActive===1){
                Toast.fail("请输入配件编码！")
                return false
            }
        },
        //保存或发布
        subHandle(){
            this.checkRequier();
            let params={};
            if(this.tabActive===0){
                if(this.formData.partDetail && this.formData.partDetail.length>0){
                    for(let item of this.formData.partDetail){
                        item.qty = parseInt(item.qty);
                        if(item.partName==''){
                            Toast.fail('配件名称不能为空！')
                        }
                    }
                }
                    if(this.dotype=="new"||this.dotype=="repush"){
                    this.formData.wantCode=""
                }
                params={
                    wantCode:this.formData.wantCode,        // 需求编码,发布已保存的需求时传该字段值，其他情况（app发布需求，再来一单，重新发布）不传
                    pushToDealer: this.formData.pushToDealer,          // 需求推送规则，是否推送给经销商，true:是;false:否
                    wantType:0,
                    push2Dealer:this.formData.pushToDealer, 
                    vehBrand: this.formData.vehBrand,             // 汽车品牌,车型数据
                    factoryBrand: this.formData.factoryBrand,      // 汽车厂牌,车型数据
                    series:this.formData.series,                // 车系,车型数据
                    year: this.formData.year.toString(),                // 年款,车型数据
                    displacement: this.formData.displacement,          // 排量,车型数据
                    gearbox: this.formData.gearbox,         // 变速器,车型数据
                    vin: this.formData.vin,             // vin码
                    partDetail:this.formData.partDetail,
                    pictures:this.formData.pictures,      // 图片地址数组
                    remarks:this.formData.remarks,                   // 备注说明
                    invoiceType: this.formData.invoiceType,               // 发票类型code
                    deliveryTime: this.formData.deliveryTime,            // 供货时效
                    offiAccount:true,
                    }
            }else{
                if(this.batchData.partDetail && this.batchData.partDetail.length>0){
                    for(let item of this.batchData.partDetail){
                        item.qty = parseInt(item.qty);
                        if(item.partCode==''){
                            Toast.fail('配件编码不能为空！')
                        }
                    }
                }
                    if(this.dotype=="new"||this.dotype=="repush"){
                    this.batchData.wantCode=""
                }
                params={
                    wantCode:this.batchData.wantCode,        // 需求编码,发布已保存的需求时传该字段值，其他情况（app发布需求，再来一单，重新发布）不传
                    pushToDealer: this.batchData.pushToDealer,          // 需求推送规则，是否推送给经销商，true:是;false:否
                    wantType:1,
                    brandsScope:this.batchData.brandsScope,
                    partDetail:this.batchData.partDetail,
                    pictures:this.batchData.pictures,      // 图片地址数组
                    remarks:this.batchData.remarks,                   // 备注说明
                    invoiceType: this.batchData.invoiceType,               // 发票类型code
                    deliveryTime: this.batchData.deliveryTime,            // 供货时效
                    offiAccount:true
                }
            }
            let url='',successMsg='';
            if(this.type==="save"){
                url="/wants-v2/wants/save";
                successMsg="保存成功！"
            }else if(this.type==="publish"){
                url="/wants-v2/wants/publish";
                successMsg="发布成功！"
            }
            request({
                method: "post",
                baseURL: URL_MODULE.united,
                url,
                data: params
            }).then(data => {
                Toast.success(successMsg);
                if(this.type==="publish"){
                    this.$router.push('Inquiry')
                }else{
                    this.formData.wantCode=data
                }
            }).catch(err => {
                if(err && err.message) {
                    Toast.fail(err.message);
                }
            })
        }
    }
};
</script>
<style lang="less" scoped>
#post_Inquiry {
    font-family: PingFang-SC-Medium;
    color: #1a2231;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    .windth-240{
        width: 270px;
    }
    .ml-5{
        margin-left: 5px;
    }
    .left-title{
        font-size: 17px;
        &::before{
            content: "";
            display: inline-block;
            width: 8px;
            height: 14px;
            margin-right: 9px;
            background: url("../../assets/back-icon.png");
            background-size:100% 100%;
        }
    }
    .nav-botton{
        cursor: pointer;
        display: inline-block;
        width: 58px;
        height: 30px;
        line-height: 30px;
        border-radius: 8px;
        font-size: 14px;
        text-align: center;
        &.btn-save{
            border: 1px solid rgba(204,206,212,0.6);
            background: #ffffff;
            color: #1A2231;
        }
        &.btn-publish{
            background: #00a8ea;
            color: #FFFFFF;
        }
    }
    .nav-tab{
        margin: 0 16px;
        padding-bottom: 10px;
        background: #ffffff;
        .tab-item{
            width: 50%;
            display: inline-block;
            font-size: 16px;
            font-weight: bolder;
            line-height: 32px;
            text-align: center;
            color: #1A2231;
            &.isActive{
                color: #00a8ea;
                border-bottom: 2px solid #00a8ea;
            }
            &.notClick{
                color: #777B87;
            }
        }
    }
    .container-car,.container-brand,.container-part,.container-supply,.container-remark{
        margin: 0 16px;
        background: #ffffff;
        .pages-title{
            border-width: 0;
            align-items: center;
            border-left-width: 4px;
            border-style: solid;
            border-color: #00a8ea !important;   
            padding-left:6px;
            display: flex;
            justify-content: flex-start;
            margin: 11px 0;
            span{
                height: 16px;
                font-size: 16px;
                font-weight: bold;
                color: #1A2231;
                line-height: 16px;
                &.center{
                    font-size: 14px;
                    color: #777B87;
                    margin-left: 110px;
                    vertical-align:middle;
                    // &::after{
                    //     content:'';
                    //     display: inline-block;
                    //     background: url('../../assets/icon-zhankai.png');
                    //     background-size:100% 100%; 
                    //     margin-left: 2px; 
                    //     width: 16px;
                    //     height: 16px;
                    //     vertical-align:text-top;
                    // }
                }
                &.clear{
                    margin-left: 160px;
                }
                &.right{
                    margin-left: auto;
                    font-size: 14px;
                    color: #00a8ea;
                    &::after{
                        content:'';
                        display: inline-block;
                        background: url('../../assets/icon-enter.png');
                        background-size:100% 100%;
                        margin-left: 8px; 
                        width: 12px;
                        height: 12px;
                    }
                    #uploadTemplate{
                        position: absolute;
                        overflow: hidden;
                        right: 0;
                        top: 0;
                        opacity:0;
                        width: 90px;
                    }
                }
            }
        }
        .con-input{
            width: 100%;
            height: 44px;
            border-bottom: 0.5px solid #EDEFF1;
            font-size: 14px;
            color: #1A2231;
            line-height: 20px;
            text-align: left;
            display: flex;
            align-items: center;
            &:last-child{
                border-bottom:none;  
            }
            span.required{
                color: #FF4655;
            }
            span.select{
                background: url('../../assets/icon-xiala.png');
                background-size: 100% 100%;
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: auto;
            }
        }
        .input-border{
                border: 1px solid #EDEFF1;
                border-radius: 4px;
                height: 30px;
        }
        .part-item{
            height: 52px;
            position: relative;
            input{
                &:nth-child(1){
                    width: 114px;
                }
                &:nth-child(2){
                    width: 65px;
                }
                &:not(:first-child){
                    margin-left: 10px;
                }
                &:nth-child(3){
                    width: 114px;
                    padding-right:30px;
                }
            }
            img{
                width: 18px;
                height: 18px;
                margin-left: 10px;
            }
            .select-quality{
                position: absolute;
                left: 285px;
                background: url('../../assets/icon-xiala.png');
                background-size: 100% 100%;
                display: inline-block;
                width: 20px;
                height: 20px;
            }
        }
        .part-add{
            height: 62px;
            img{
                width:34px;
                height: 34px;
                margin-top: 10px;
            }
        }
        input[type="radio"] {
            opacity: 0;
            width: 10px;
            margin: 0;
            &+label{
                background: #F3F5F8;
                border-radius: 4px;
                display: inline-block;
                width: 80px;
                height: 30px;
                font-size: 14px;
                color: #777B87;
                line-height: 30px;
                text-align: center;
            }
            &:checked+label{
                background: #E6FAF7;
                color: #00a8ea;
            }
        }
        .brand-range{
            margin: 12px 0;
            text-align: left;
            .brand-key{
                display: inline-block;
                font-size: 12px;
                color: #777B87;
                background: #FFFFFF;
                border: 1px solid #F2F3F5;
                border-radius: 6px;
                border-radius: 6px;
                width: 75px;
                height: 26px;
                line-height: 28px;
                text-align: center;
                padding-right:24px;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                &:not(:first-child){
                    margin-left: 12px;
                }
                &:nth-child(3n+1){
                    margin-left: 0;
                    margin-top: 10px;
                }
                .key-del{
                    background:url('../../assets/icon-delete-x.png') no-repeat;
                    background-size:100% 100%;
                    display: inline-block;
                    width: 17px;
                    height: 17px; 
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .brand-defualt{
                font-size: 14px;
                line-height: 32px;
                color: #1A2231;
            }
        }
    }
    .remark-img,.remark-note{
        text-align: left;
        min-height: 64px;
        span{
            font-size: 14px;
            color: #1A2231;
            vertical-align: text-top;
        }
        .remark-x{
            width: 16px;
            height: 16px;
            position:absolute;
            right: 5px;
            top: 10px;
        }
        textarea{
            background: #F8F8FB;
            border: 1px solid #EDEFF1;
            border-radius: 4px;
            font-size: 12px;
            color: #1A2231;
            width: 300px;
            height: 58px;
            margin-top: 7px;
            text-indent: 6px;
            padding: 0 20px 14px 0;
        }
        .num-textarea{
            position: absolute;
            z-index: 2;
            right: 4px;
            top: 48px;
            span{
                font-size: 10px;
                color: #777B87;
            }
        }
        .input-num{
            color: #00a8ea !important;  
        }
    }
    .remark-img{
        border-bottom: 0.5px solid #EDEFF1;
        position: relative;
        .num{
            font-size: 10px;
            color: #777B87;
            position: absolute;
            bottom: 0px;
            right: 0;
        }
    }
    .remark-note{
        position: relative;
        padding-bottom: 60px;
    }
    .tab-pro-bottom{
        position: fixed;
        bottom: 0;
        height: 49px;
        line-height: 39px;
        display: flex;
        justify-content:center;
        align-items: center;
        border-top:0.5px solid #E8EAEF;
        background: #ffffff; 
        width: 375px;
        right: 0px;
        .right{
            margin-right: 16px;
            span:not(:first-child){
                margin-left: 15px;
            }
            .btn-finish{
                display: inline-block;
                width: 104px;
                height: 40px;
                line-height: 40px;
                border: 1px solid rgba(204,206,212, 0.6);
                border-radius: 8px;
                font-size: 14px;
                color: #1A2231;
                text-align: center;
            }
            .btn-submit{
                display: inline-block;
                width: 104px;
                height: 40px;
                line-height: 40px;
                background: #00a8ea;
                border-radius: 8px;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
            }
        }
    }
    .container-cleavage{
        width: 100%;
        height: 12px;
        background: #F1F3F6;
    }
    .load-center{
        position: fixed;
        top: 50%;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
    }
}
/deep/[class*=van-hairline]::after{
    border: 0.5px solid #EDEFF1;
}
/deep/.van-uploader__upload,.van-uploader__preview-image{
    width:48px;
    height:48px;
}
/deep/.van-uploader__preview-image{
    background: #EEEAF2;
    border-radius: 2px;
    width:48px;
    height:48px;
    img{
        width:36px;
        height: 36px;
        margin:6px;
    }
}
/deep/.van-icon-clear:before {
    color:#00a8ea;
}
/deep/.van-picker__confirm{
    color:#00a8ea;
}
/deep/.van-picker__cancel{
    color:#777B87;
}
/deep/.van-loading__text{
    color:#ffffff;
}
/deep/.van-picker-column__item{
    color:#1A2231;
}
/deep/.van-cell{
    padding: 0 !important;
}
/deep/.van-icon-search:before{
    content: '';
    background: url("../../assets/icon-serch.png") no-repeat;
    background-size: 100% 100%;
    width: 14px;
    height: 14px;
    margin-left: 4.6px;
}
/deep/.van-field__control{
    text-indent: 0;
}
/deep/.van-search__content{
    padding: 3px 0;
    width: 204px;
    border-radius: 6px;
}
/deep/.van-uploader__upload-icon{
    display: flex;
    flex-direction: column;
    align-items: center;
}
/deep/.van-uploader__upload-icon::after{
    content: '最多10张';
    font-size: 10px;
    color: #777B87;
    display:block;
    // transform: scale(0.6);
    // -webkit-transform: scale(0.6);     /* for Chrome || Safari */
    // -moz-transform: scale(0.6);        /* for Firefox */
    // -ms-transform: scale(0.6);         /* for IE */
    // -o-transform: scale(0.6);          /* for Opera */
}
</style>
<style lang="less">

</style>
