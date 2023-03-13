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
          :model="checkObj" 
          :rules="checkRules" 
          ref="ruleForm" 
          label-width="100px" 
          class="ruleForm">
          <el-row >
            <el-col :span="12">
              <el-form-item label="结算方式" prop="paymentType">
                <el-select 
                  v-model="checkObj.paymentType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择">
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
                  v-model="checkObj.invoiceType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择">
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
                 <el-radio-group v-model="checkObj.status">
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
                  v-model="checkObj.priceType" 
                  class="search_item_cont"
                  size="small" 
                  placeholder="请选择">
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
                  v-model="checkObj.discount"
                  @change="InputChange(checkObj)">
                  <span slot="suffix" >%</span>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联本地客户" prop="swCustomerId">
                <el-select 
                  v-model="checkObj.swCustomerId" 
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
                  v-model="checkObj.businessManId" 
                  class="search_item_cont"
                  size="small" 
                  filterable
                  placeholder="请选择">
                  <el-option 
                    v-for="(item,index) in businessManList"
                    :label="item.userName+'-'+item.userPhone" 
                    :value="item.userId"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="客户标签" >
                <el-select 
                  v-model="checkObj.labelIds" 
                  class="search_item_cont"
                  size="small" 
                  multiple filterable
                  collapse-tags
                  placeholder="请选择">
                  <el-option 
                    v-for="(item,index) in labelList"
                    :label="item.name" 
                    :value="item.id"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="会员等级" >
                <el-select 
                  v-model="checkObj.memberGradeId" 
                  class="search_item_cont"
                  size="small" 
                  filterable
                  placeholder="请选择">
                  <el-option 
                    v-for="(item,index) in memberGradeList"
                    :label="item.name" 
                    :value="item.id"
                    :key="index">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
       
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="onRefused" >拒绝</el-button>
        <el-button size="small" type="primary" @click="onThrough('ruleForm')">通过</el-button>
      </div>
    </el-dialog>  
  </div>
</template>

<script>
import { AuditedCustomerApi } from '../services'
const auditedCustomerApi = new AuditedCustomerApi();

export default {
  name:"checkDialog",
  data(){
    return{
      title:"客户审核",
      showDialog:false,
      checkObj:{},
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
      memberGradeList:[],//会员等级
    }
  },
  props:{
    checkData:Object
  },
  watch:{
    checkData(){
      this.getBusinessManList();//归属员工
      // this.init();
    }
  },
  created(){
    this.getPaymentTypeList();//结算方式
    this.getInvoiceTypeList();//发票类型
    this.getPriceTypeList();//订货价类型
    this.getErpCustomersList();//关联本地客户
    
    this.getLabelList();//客户标签
    this.getVipGradeList();//会员等级
  },
  methods:{
    InputChange(dataObj){
      if(dataObj.discount && Number(dataObj.discount || 0) < 0){
        dataObj.discount = '0';
      }else if(dataObj.discount && Number(dataObj.discount || 100) > 100){
        dataObj.discount = '100';
      }
      if(dataObj.discount){
        dataObj.discount =  Number(dataObj.discount).toFixed(0);
      }
      this.$forceUpdate();
    },
    swCustomerChange(val){
      this.customersList.forEach(p =>{
        if(p.swCustomerId && val == p.swCustomerId){
          this.checkObj.swCustomerId = p.swCustomerId;
          this.checkObj.swCustomerName = p.swCustomerName;
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
      auditedCustomerApi
        .getDicts(params)
        .then(res => {
          this.paymentTypeList = res ? res :[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getInvoiceTypeList(){
      let params = {
        type:'invoiceType'
      }
      auditedCustomerApi
        .getDicts(params)
        .then(res => {
          this.invoiceTypeList = res ? res :[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPriceTypeList(){
      let params = {
        type:'priceType'
      }
      auditedCustomerApi
        .getDicts(params)
        .then(res => {
          this.priceTypeList = res ? res :[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getErpCustomersList(query){
      let params = {
        swCustomerName:query?query:'',
        page:1,
        pageSize:500
      }
      auditedCustomerApi
        .getErpList(params)
        .then(res => {
          this.customersList = res&&res.rows?res.rows:[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBusinessManList(){
      let params = {
        companyId:this.$store.state.base.companyId
      }
      auditedCustomerApi
        .getStaffsBycid(params)
        .then(res => {
          this.businessManList = res?res:[];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLabelList(){
      let params = {
        page:1,pageSize:100
      }
      auditedCustomerApi
        .getLabelList(params)
        .then(res => {
          this.labelList = res.rows ? res.rows : [];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVipGradeList(){
      let params = {
        // keyword:''
      }
      auditedCustomerApi
        .getMemberGradeList(params)
        .then(res => {
          this.memberGradeList = res?res:[];
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
      if(!this.checkData.id)return;
      let CustomerName = this.renderAppyer(this.checkData);
      this.title = `客户审核（${CustomerName}）`;
      let params = {
        id:this.checkData.id
      }
      auditedCustomerApi.getsCustomersById(params).then(res =>{
        this.checkObj = {
          id:res.id,
          paymentType:res.paymentType?res.paymentType:"nowPay",
          invoiceType:res.invoiceType?res.invoiceType:"receipt",
          status:res.customerStatus?res.customerStatus:1,
          priceType:res.priceType?res.priceType:"retail",
          discount:res.discount?res.discount*100:null,
          swCustomerId:res.swCustomerId?res.swCustomerId:null,
          businessManId:res.businessManId?res.businessManId:null,
          labelIds:res.labelIds,
          memberGradeId:res.memberGradeId?res.memberGradeId:null,
        }
      }).catch(() =>{
        this.showDialog = false;
      })
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
    onThrough(formName){
      let _this = this;
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let discount = _this.$intNumToPercentNum(_this.checkObj.discount);
            let params = {
              ..._this.checkObj,
              discount:discount
            };
            auditedCustomerApi.agree(params).then(()=>{
              _this.$message.success('客户审核通过');
              _this.$emit('onRefresh');
              _this.closedFn();
            })
          } else {
            _this.$message.error('你有必填项未完成');
            return false;
          }
        });
    },
    onRefused(){
      let _this = this;
      let params = this.checkObj;
      auditedCustomerApi.refuse(params).then(()=>{
        _this.$message.success('拒绝成功');
        _this.$emit('onRefresh');
        _this.closedFn();
      })
    }
  }
}
</script>

<style lang="less" scoped>
.checkDialog{
  /deep/.el-form-item__error{
    display: none;
  }
  /deep/.el-radio{
    margin-right: 30px;
    &:last-child{
      margin-right: 0;
    }
  }
  /deep/input::-webkit-outer-spin-button,
  /deep/input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
}
</style>