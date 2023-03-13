<template>
  <div class="company_info">
    <!-- 公司资料--VUE -->
    <el-form :model="formData" :rules="rules" ref="formData" label-width="110px">
      <div class="basic_info">
        <DetailTitle titleName="基础信息" />
        <div class="container">
          <el-form-item label="公司名称" prop="name" >
            <el-input 
              size="small" 
              class="from_item_content"
              maxlength="20"
              show-word-limit
              v-model="formData.name" 
            ></el-input>
          </el-form-item>
          <el-form-item label="公司类型" prop="type" >
            <el-select 
              size="small"
              style="width:480px;"
              v-model="formData.type"  
              placeholder="请选择公司类型">
              <el-option label="汽修厂" value="汽修厂"></el-option>
              <el-option label="经销商" value="经销商"></el-option>
              <el-option label="生产厂家" value="生产厂家"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区" prop="areaIds" >
            <SelectArea
              style="width:480px;"
              :areaData="formData.areaIds"
              @change="areaChange"/>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" >
            <el-input 
              size="small"
              class="from_item_content"
              v-model="formData.address" >
            </el-input>
          </el-form-item>
          <el-form-item label="公司名片" prop="businessCard" style="margin-top:8px;">
            <div class="upload_file">
              <UploadFileImg style="width: 220px;margin-right: 8px;"
              :maxSize="2"
              listType="picture-card" 
              :limit='1'
              :company="true"
              :fileList="businessCardList"
              :isMultiple="false"
              :showFileList="true"
              :hideFlag="true"
              @getFileList="fileList => getFileList(fileList,'businessCard')"/>
              <div class="upload_remark">上传您的企业名片，请保证图片的清晰度，图片建议尺寸：220*130</div>
            </div>
            <!-- <div class="upload_file">
              
              <UploadFileImg style="width: 220px;margin-right: 8px;"
                listType="picture-card" 
                :limit='1'
                ref="company"
                :fileList="businessCardList"
                :company="true"
                :isMultiple="false"
                :showFileList="false"
                @getFileList="fileList => getFileList(fileList,'businessCard')"/>
                <div class="upload_remark">上传您的企业名片，请保证图片的清晰度，图片建议尺寸：220*130</div>
                <div class="company_img">
                  <template v-if="formData.businessCard">
                    <img :src="businessCardUrl" alt="">
                    <div class="img_model">
                      <i class="el-icon-zoom-in" @click="previewFn"></i>
                      <i class="el-icon-delete" @click="delCompany"></i>
                    </div>
                  </template>
                  <template v-else>
                    <img :src="imgNoneUrl" alt="">
                  </template>
                  
                </div>
            </div> -->
          </el-form-item>
          <el-form-item label="公司介绍" prop="description" >
            <el-input 
            size="small"
            type="textarea"  
            style="width:480px;"
            placeholder="请输入文字"
            maxlength="200"
            show-word-limit
            v-model="formData.description" 
            :autosize="{ minRows: 1}"></el-input>
          </el-form-item>
        </div>  
      </div>

      <div class="contact_info">
        <!-- <div class="title">联系方式</div> -->
        <DetailTitle titleName="联系方式" />
        <div class="container">
          <el-form-item label="服务电话" prop="phone" >
            <el-input 
              size="small"
              class="from_item_content"
              v-model="formData.phone"></el-input>
          </el-form-item>
          <!-- 一期不做 -->
          <!-- <el-form-item label="微信客服" prop="customerServiceWeChat" class="from_item_content">
            <div class="upload_file">
              <UploadFileImg style="width: 104px;margin-right: 10px;"
              listType="picture-card" :limit='1'
              :isMultiple="false"
              :showFileList="true"/>
              <div class="upload_remark">上传一个微信二维码名片，便于展示给客户，请尽量保证图片的清晰度</div>
            </div>
            
          </el-form-item>
          <el-form-item label="微信公众号" prop="accWeChat" class="from_item_content">
            <div class="upload_file">
              <UploadFileImg style="width: 104px;margin-right: 10px;"
              listType="picture-card" :limit='1'
              :isMultiple="false"
              :showFileList="true"/>
              <div class="upload_remark">上传您的微信公众号二维码，便于展示给客户，请尽量保证图片的清晰度</div>
            </div>
          </el-form-item> -->
        </div>  
      </div>

      <div class="business_info">
        <!-- <div class="title">经营信息</div> -->
        <DetailTitle titleName="经营信息" />
        <div class="container">
          <el-form-item label="经营汽车品牌" prop="vehBrands" >
            <el-button  size="small" icon="el-icon-plus" @click="openDialogBrand">添加</el-button>
          </el-form-item>
          <div class="has-choose" style="width:826px;" v-if="formData.vehBrands && formData.vehBrands.length">
            <span v-for="(item,index) in formData.vehBrands" :key="'veh'+index" :class="['choose-key','border-key']">
              {{item}}
              <i @click="delbrand1(item,index)" class="el-icon-close key-del"></i>
            </span>
          </div>
          <el-form-item label="收款信息" prop="paymentCode" style="margin:16px 0;">
            <div class="upload_file">
              <UploadFileImg style="width: 80px;margin-right: 8px;"
              :maxSize="2"
              listType="picture-card" 
              :limit='1'
              :fileList="paymentCodeList"
              :isMultiple="false"
              :showFileList="true"
              :hideFlag="true"
              @getFileList="fileList => getFileList(fileList,'paymentCode')"/>
              <div class="upload_remark">上传您的微信收款码或者银行账户信息相关的图片，客户在订单线下支付时可看到该信息</div>
            </div>
          </el-form-item>
        </div>  
      </div>
      <div class="footer_btn">
        <div class="button-div">
          <el-button 
            type="primary" 
            size="small" 
            @click="submitForm('formData')">保存</el-button>
        </div>
      </div>
    </el-form>
    <!-- 经营汽车品牌 -->
    <el-dialog title="经营汽车品牌" :visible.sync="dialogBrand" width="776px">
        <div class="has-choose">
            <span>已选汽车品牌:</span>
            <span v-for="(item,index) in dialogVehBrands" :key="'veh'+index" :class="['choose-key']">
                {{item}}
                <span @click="delbrand(item,index)" class="el-icon-close key-del"></span>
            </span>
        </div>
        <el-tabs>
            <el-tab-pane :label="item.category" v-for="(item,index) in brandList" :key="index">
                <div class="brand-list">
                    <div>
                        <el-checkbox v-model="item.checked" @change="selectAll(item)"></el-checkbox>
                        <span style="margin-left:10px;">全选当前品牌</span>
                    </div>
                    <span :class="{'brand-item':true,'selected':dialogVehBrands&&dialogVehBrands.includes(scope.name)}"
                     @click="addbrand(scope,index)" 
                     v-for="(scope,index) in item.scopes" 
                     :key="'name'+index">{{scope.name}}</span>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="bottom-alert">
            <div class="right">
              <el-button @click="onCancel">取消</el-button>
              <el-button type="primary" @click="onSure">确定</el-button>
            </div>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogImg">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import UploadFileImg from "./components/UploadFileImg"
import SelectArea from "@/components/selectArea/SelectArea.vue"
import DetailTitle from '@/components/manageCom/DetailTitle.vue'

import { CompanyInfoApi } from './services'
const companyInfoApi = new CompanyInfoApi();

export default {
  name:"companyInfo",
  components:{
    UploadFileImg,
    SelectArea,
    DetailTitle
  },
  data(){
    return{
      dialogBrand:false,
      brandList:[],
      addressOptions: [],
      businessCardList:[],
      paymentCodeList:[],
      businessCardUrl:'',
      dialogVehBrands:[],
      formData: {
        name: '',//公司名称
        type: '',//公司类型

        areaName: '',//所在地区
        address:"",//详细地址
        businessCard: '',//公司名片
        description: '',//公司介绍

        phone:'',//服务电话
        // customerServiceWeChat:'',//微信客服
        // accWeChat:'',//微信公众号

        vehBrands:[
          // '丰田','本田','日产','丰田','本田','日产','丰田','本田','日产','丰田','本田','日产',
          // '丰田','本田','日产','丰田','本田','日产','丰田','本田','日产','丰田','本田','日产'
        ],//经营汽车品牌
        paymentCode:'',//收款信息
      },
      companyTip:"上传您的企业名片，请保证图片的清晰度，图片建议尺寸：220*130",
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择公司类型', trigger: 'change' }
        ],
        areaIds: [
          { required: true, message: '请选择公司类型', trigger: 'change' }
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        phone: [
          { required: true, message: '请填写服务电话', trigger: 'blur' }
        ]
      },
      dialogImg:false,
      dialogImageUrl:'',
      imgNoneUrl:require('@/assets/img/inquiry/place_40_40.jpg')

    }
  },
  
  mounted(){
    this.getbrandList();
    this.getCompanyInfo();
  },
  methods:{
    areaChange(dataObj){
      this.formData.areaId = dataObj.areaId;
      this.formData.areaIds = dataObj.areaIds;
      this.formData.areaName = dataObj.areaName;
    },
    previewFn(){
      this.dialogImg = true;
      this.dialogImageUrl = this.businessCardUrl;
    },
    delCompany(){
      this.formData.businessCard = '';
      this.businessCardList = [];
    },
    getFileList(fileList,type){
      
      if(type == 'paymentCode'){
        this.paymentCodeList = fileList;
        this.formData[type] = fileList.length ? 
        (fileList[0].origin ? fileList[0].origin : fileList[0].url) : '';
      }
      if(type == 'businessCard'){
        this.businessCardList = fileList;
        this.formData[type] = fileList.length ? 
        (fileList[0].origin ? fileList[0].origin : fileList[0].url) : '';
        this.businessCardUrl = fileList.length ? fileList[0].url :'';
      }
    },
    getCompanyInfo(){
      let _this = this;
      _this.businessCardList = [];
      _this.paymentCodeList = [];
      companyInfoApi.getCompanyDetail()
      .then(res =>{
        _this.formData = res;
        // _this.companyTypeFn(res.type);
        if(res.businessCard){
           _this.businessCardList.push({
            name:'企业名片',
            url:res.businessCard
          });
          this.businessCardUrl = res.businessCard;
        }
        if(res.paymentCode){
          _this.paymentCodeList.push({
            name:'收款信息',
            url:res.paymentCode
          });
        
        }
      }).catch((err)=>{
        this.$message.error(err);
      })
    },
    getbrandList(){//获取汽车品牌
      let params = {
        type:'vehBrand'
      }
      companyInfoApi.getVehBrand(params)
      .then(res =>{
        this.brandList = res;
      }).catch((err)=>{
        this.$message.error(err);
      })
    },
   
   
    openDialogBrand(){
      this.dialogBrand = true;
      this.dialogVehBrands = [...this.formData.vehBrands];
    },
    selectAll(item){
        item.scopes.forEach((scope)=>{
            let index=this.dialogVehBrands.findIndex((brand)=>brand==scope.name);
            if(item.checked&&index==-1){
                this.dialogVehBrands.push(scope.name);
            }else if(!item.checked&&index!=-1){
                this.dialogVehBrands.splice(index,1);
            }
        })
    },
    addbrand(scope,index){
      
      let flag = false;
      let curIndex = null;
      this.dialogVehBrands.forEach( (p,i) =>{
        if(p == scope.name){
          flag = true;
          curIndex = i;
        }
      })
      if(!flag){
        this.dialogVehBrands.push(scope.name);
      }else{
        this.dialogVehBrands.splice(curIndex,1);
      }
    },
    delbrand(item,index){
        this.dialogVehBrands.splice(index,1);
        this.brandList.forEach((brand)=>{
            let index=brand.scopes.findIndex((scope)=>scope.name==item);
            if(index!=-1){
                brand.checked=false;
            }
        })
    },
    delbrand1(item,index){
        this.formData.vehBrands.splice(index,1);
        // this.brandList.forEach((brand)=>{
        //     let index=brand.scopes.findIndex((scope)=>scope.name==item);
        //     if(index!=-1){
        //         brand.checked=false;
        //     }
        // })
    },
    onSure(){
      this.dialogBrand=false;
      this.formData.vehBrands = this.dialogVehBrands;
    },
    onCancel(){
      this.dialogBrand=false;
      this.dialogVehBrands = [];
    },
    companyTypeFn(type){
      if(!type){
        return '';
      }else if(type=='汽修厂'){
        return 'garage';
      }else if(type=='经销商'){
        return 'dealer';
      }else if(type=='生产厂家'){
        return 'manufacturer';
      }
    },
    submitForm(formName) {
      let _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let companyType = _this.companyTypeFn(_this.formData.type);
          let params = {
            ..._this.formData,
            type:companyType
          }
          companyInfoApi.saveCompanyInfo(params)
          .then(res =>{
            _this.$message.success("保存成功");
            _this.getCompanyInfo();
          });
        } else {
          return false;
        }
      });
    },
    
  }
}
</script>

<style lang="less" scoped>
.company_info{
  padding: 0 @padding-size-main;
  background: #FFFFFF;
  margin-bottom: 70px;
  /deep/.el-form-item {
    margin-bottom: @padding-size-main;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    font-weight: 500;
    margin: @margin-size-main 0;
  }
  .container{
    margin: 20px 0;
    /deep/.el-textarea__inner{
      resize: none;
      font-size: 14px;
    }
    /deep/.el-textarea .el-input__count{
      height:24px;
      line-height: 24px;
    }
  }
  .from_item_content{
    width: 480px;
    // /deep/.el-input--small .el-input__inner{
    //   width: 480px;
    // }
  }
  .upload_file{
    display:flex;
  }
  .upload_remark{
    color:@text-color-hint;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    line-height: 22px;
  }
  /deep/.el-dialog__headerbtn{
    top:10px;
  }
  .company_img{
    width: 220px;
    height: 130px;
    margin-left: 32px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
    .img_model{
      width: 100%;
      height: 100%;
      opacity: 0;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      color: #FFFFFF;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        opacity: 1;
      }
      i{
        font-size: 24px;
        margin: 0 20px;
        cursor: pointer;
      }
    }
  }
  // .business_info{
    .has-choose{
      text-align: left;
      margin: 16px 0;
      max-height:114px;
      // width: 826px;
      padding: 15px;
      background: #F5F5F5;
      border-radius: 2px;
      overflow: auto;
      .choose-key{
        background: #FFFFFF;
        border-radius: 2px;
        display: inline-block;
        padding: 0 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 22px;
        font-weight: 400;
        margin: 4px 16px 4px 0;
        .key-del{
          color: #a4a4a4;
          cursor: pointer;
        }
        .key-del:hover{
          color: #498cf0;
        }
      }
      .border-key{
        border: 1px solid #D9D9D9;
      }
    }
  // }
  .bottom-alert{
    margin-top: 20px;
    width: 100%;
    background: #ffffff;
    height: 60px;
    border-top: 1px solid  #DDDFE7;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .right{
      margin-left: auto;
      margin-right: 32px;
      
    }
  }
  .brand-list{
    min-height: 200px;
    text-align: left;
    padding: 20px;
    .brand-item{
      font-size: 16px;
      padding: 8px 16px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      margin-right: 20px;
      margin-top: 10px;
      display: inline-block;
      cursor: pointer;
      &.selected{
          border: 1px solid #498CF0;
          color: #498CF0;
      }
    }
  }
  .footer_btn{
    position: fixed;
    width:90%;
    background: #FFFFFF;
    box-shadow: 0px -1px 0px 0px rgba(217,217,217,.3);
    bottom: 8px;
    z-index: 99;
    .button-div{
      display: flex;
      justify-content: center;
      padding: 12px 0;
      border-top: 1px solid @border-color-base;
    }
  }
}
</style>