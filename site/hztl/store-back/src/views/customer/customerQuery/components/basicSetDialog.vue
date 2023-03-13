<template>
  <div class="checkDialog">
    <!-- 客户审核弹框 -->
    <el-dialog 
      :title="title" 
      :visible.sync="showDialog" 
      :close-on-click-modal="false" 
      @close="closedFn" 
      width="776px">
      <div >
        <el-form 
          :model="dataObj" 
          :rules="isSignShow?checkRules:null" 
          ref="ruleForm" 
          label-width="100px" 
          class="ruleForm">
          <el-row >
            <el-col :span="12">
              <el-form-item label="结算方式" prop="paymentType">
                <el-select 
                  v-model="dataObj.paymentType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择" 
                  @change="typeChange">
                  <el-option 
                    v-for="(item,index) in paymentTypeList"
                    :label="item.name" 
                    :value="item.Code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票类型" prop="invoiceType">
                <el-select 
                  v-model="dataObj.invoiceType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择"
                  @change="typeChange">
                  <el-option 
                    v-for="(item,index) in invoiceTypeList"
                    :label="item.name" 
                    :value="item.Code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户状态" prop="status">
                 <el-radio-group v-model="dataObj.status" @change="typeChange">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="订货价类型" prop="priceType">
                <el-select 
                  v-model="dataObj.priceType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择" 
                  @change="typeChange">
                  <el-option 
                    v-for="(item,index) in priceTypeList"
                    :label="item.name" 
                    :value="item.Code"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="折扣" prop="discount">
                <el-input
                  size="small" 
                  type="number"
                  placeholder="请输入内容"
                  step='0'
                  min='0'
                  max='100'
                  v-model="dataObj.discount"
                  @change="InputChange(dataObj)">
                  <span slot="suffix" >%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="isSignShow">
              <el-form-item label="关联本地客户" prop="swCustomerId">
                <el-select 
                  v-model="dataObj.swCustomerId" 
                  class="search_item_cont"
                  size="small" 
                  filterable
                  remote
                  placeholder="请选择"
                  :remote-method="remoteMethodSw"
                  @change="swCustomerChange">
                  <el-option 
                    v-for="(item,index) in customersList"
                    :disabled="item.related"
                    :label="item.related ? `${item.swCustomerName}（已绑定）` :item.swCustomerName" 
                    :value="item.swCustomerId"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="归属员工" >
                <el-select 
                  v-model="dataObj.businessManId" 
                  class="search_item_cont"
                  size="small" 
                  filterable
                  placeholder="请选择"
                  @change="typeChange">
                  <el-option 
                    v-for="(item,index) in businessManList"
                    :label="item.userId?item.userName+'-'+item.userPhone:item.userName" 
                    :value="item.userId"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="客户标签" >
                <el-select 
                  v-model="dataObj.labelIds" 
                  class="search_item_cont"
                  size="small" 
                  multiple filterable
                  collapse-tags
                  placeholder="请选择"
                  @change="typeChange">
                  <el-option 
                    v-for="(item,index) in labelList"
                    :label="item.name" 
                    :value="item.id"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="!isSignShow">
            <div class="tip_txt" v-if="piSetStr">
              本次批量设置的项有：{{piSetStr}}，保存后会对你勾选的客户进行批量修改，请谨慎操作！
            </div>
          </el-row>
        </el-form>
       
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel" >取消</el-button>
        <el-button size="small" type="primary" @click="onSave('ruleForm')">保存</el-button>
      </div>
    </el-dialog>  
  </div>
</template>

<script>
import { CustomerApi } from '../services'
const customerApi = new CustomerApi();

export default {
  name:"checkDialog",
  data(){
    return{
      title:"基础设置",
      showDialog:false,
      dataObj:{},
      checkRules:{
        paymentType: [
          { required: true, message: '请选择结算方式', trigger: 'change' }
        ],
        invoiceType:[
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择客户状态', trigger: 'change' }
        ],
        priceType: [
          { required: true, message: '请选择订货价类型', trigger: 'change' }
        ],
      },
      paymentTypeList:[],//结算方式
      invoiceTypeList:[],//发票类型
      priceTypeList:[],//订货价类型
      customersList:[],//关联本地客户
      businessManList:[],//归属员工
      labelList:[],//客户标签
      isSignShow:true,//是否是单个数据
      customerQueryObj:{},
      piSetStr:''//批量设置项
    }
  },
  props:{
    selectData:Array,
    searchAll:Boolean,
    searchCond:Object
  },
  watch:{
    selectData(){
      this.onLoad();
      // this.init();
    }
  },
  mounted(){
    this.getPaymentTypeList();//结算方式
    this.getInvoiceTypeList();//发票类型
    this.getPriceTypeList();//订货价类型
  },
  
  methods:{
    onLoad(){
      this.customerQueryObj = JSON.parse(sessionStorage.getItem('customerQueryObj'));
      this.getErpCustomersList();//关联本地客户
      if(this.customerQueryObj && this.customerQueryObj.businessManList){
          this.businessManList = this.customerQueryObj.businessManList;
      }else{
        this.getBusinessManList();//归属员工
      }
      if(this.customerQueryObj && this.customerQueryObj.labelList){
          this.labelList = this.customerQueryObj.labelList;
      }else{
        this.getLabelList();//客户标签
      }
    },
    typeChange(){
      let strArr = [];
      for(let k in this.dataObj){
        if(k == 'labelIds' && this.dataObj[k].length){
          strArr.push('【客户标签】');
        }else{
          if(this.dataObj[k]){
            switch(k){
              case 'paymentType':
                strArr.push('【结算方式】')
                break;
              case 'invoiceType':
                strArr.push('【发票类型】')
                break;
              case 'status':
                strArr.push('【客户状态】')
                break;
              case 'priceType':
                strArr.push('【订货价类型】')
                break;
              case 'discount':
                strArr.push('【折扣】')
                break;
              case 'businessManId':
                strArr.push('【归属员工】')
                break;
            }
          }
          
        }
      }
      this.piSetStr = strArr.join('、');

    },
    InputChange(dataObj){
      if(dataObj.discount && Number(dataObj.discount || 0) < 0){
        dataObj.discount = '0';
      }else if(dataObj.discount && Number(dataObj.discount || 100) > 100){
        dataObj.discount = '100';
      }
      if(dataObj.discount){
        dataObj.discount =  Number(dataObj.discount).toFixed(0);
      }
      this.typeChange();
      this.$forceUpdate();
    },
    swCustomerChange(val){
      this.customersList.forEach(p =>{
        if(p.swCustomerId && val == p.swCustomerId){
          this.dataObj.swCustomerId = p.swCustomerId;
          this.dataObj.swCustomerName = p.swCustomerName;
        }
      })
    },
    remoteMethodSw(query){
      this.getErpCustomersList(query);
    },
    getPaymentTypeList(){
      let params = {
        type:'paymentType'
      }
      customerApi
        .getDicts(params)
        .then(res => {
          this.paymentTypeList = res ? res : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getInvoiceTypeList(){
      let params = {
        type:'invoiceType'
      }
      customerApi
        .getDicts(params)
        .then(res => {
          this.invoiceTypeList = res ? res : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPriceTypeList(){
      let params = {
        type:'priceType'
      }
      customerApi
        .getDicts(params)
        .then(res => {
          this.priceTypeList = res ? res : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getErpCustomersList(query){
      let params = {
        swCustomerName:'',
        page:1,
        pageSize:500
      }
      if(query){
        params.swCustomerName = query;
      }
      this.customersList = [];
      customerApi
        .getErpList(params)
        .then(res => {
          if(res && res.rows){
            let obj = {
              "swCustomerId": 0,            //  # erp客户ID
              "swCustomerName": "请选择",           //# erp客户名称
              "related": false                 //# 为true时表示该线下客户已被关联过了
            }
            this.customersList.push(obj);
            res.rows.forEach(p =>{
              this.customersList.push(p);
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBusinessManList(){
      let params = {
        companyId:this.$store.state.base.companyId
      }
      this.businessManList = [];
      customerApi
        .getStaffsBycid(params)
        .then(res => {
          if(res){
            let obj = {
              userId: 0,
              userName: "请选择",
              userPhone: ""
            }
            this.businessManList.push(obj);
            res.forEach(p =>{
              this.businessManList.push(p);
            })
            this.customerQueryObj.businessManList = this.businessManList;
            sessionStorage.setItem('customerQueryObj',JSON.stringify(this.customerQueryObj));
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLabelList(){
      let params = {
        page:1,pageSize:100
      }
      customerApi
        .getLabelList(params)
        .then(res => {
          if(res && res.rows){
            this.customerQueryObj.labelList = res.rows;
            sessionStorage.setItem('customerQueryObj',JSON.stringify(this.customerQueryObj));
            this.labelList = res.rows;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderAppyer(row){
      let customerType = row.customerType;
      let str = '';
      if(customerType == 0){
        str += row.applyer;
      }else{
        str += row.CustomerName + '-' + row.contacts
      }
      return str;
    },
    init(){
      if(this.selectData.length == 1){
        let CustomerName = this.renderAppyer(this.selectData[0]);
        this.title = `基础设置（${CustomerName}）`;
        this.isSignShow = true;
        let params = {
          id:this.selectData[0].id
        }
        customerApi.getsCustomersById(params).then(res =>{
          this.dataObj = {
            id:res.id,
            paymentType:res.paymentType?res.paymentType:null,
            invoiceType:res.invoiceType?res.invoiceType:null,
            status:res.status!=0?res.status:1,
            priceType:res.priceType?res.priceType:null,
            discount:res.discount?res.discount*100:null,
            swCustomerId:res.swCustomerId?res.swCustomerId:null,
            businessManId:res.businessManId?res.businessManId:null,
            labelIds:res.labelIds,
            memberGradeId:res.memberGradeId?res.memberGradeId:null,
          }
        })
      }else{
        this.title = `批量基础设置`;
        this.dataObj = {
          paymentType:null,
          invoiceType:null,
          status:null,
          priceType:null,
          discount:null,
          swCustomerId:null,
          businessManId:null,
          labelIds:null,
          memberGradeId:null,
        }
        this.isSignShow = false;
      }
      
      console.log('selectData',this.selectData)
    },
    show(){
      this.showDialog = true;
      setTimeout(()=>{
        this.init();
      },500);
    },
    closedFn(){
      this.showDialog = false;
      this.$refs.ruleForm.resetFields();
    },
    onSave(formName){
      let _this = this;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let discount = _this.$intNumToPercentNum(_this.dataObj.discount);
            
            let params = {
              ids:[],
              searchAll:_this.searchAll,
              searchCond:_this.searchCond,
              ..._this.dataObj,
              discount:isNaN(discount)?null:discount
            };
            _this.selectData.forEach(p =>{
              params.ids.push(p.id);
            })
            for(let k in params){
              if(params[k]==null){
                delete params[k];
              }
            }
            // if(!params.discount){
            //   delete params.discount;
            // }
            customerApi.setsCustomers(params).then(()=>{
              _this.$message.success('保存成功');
              _this.$emit('onRefresh');
              _this.closedFn();
            })
          } else {
            _this.$message.error('你有必填项未完成');
            return false;
          }
        });
    },
    onCancel(){
      this.closedFn();
    },
  }
}
</script>

<style lang="less" scoped>
.checkDialog{
  /deep/.el-form-item__error{
    display: none;
  }
  /deep/input::-webkit-outer-spin-button,
  /deep/input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  /deep/.el-radio{
    margin-right: 30px;
    &:last-child{
      margin-right: 0;
    }
  }
  .tip_txt{
    margin-top:@margin-size-secondary;
    color:@color-error;
  }
}
</style>