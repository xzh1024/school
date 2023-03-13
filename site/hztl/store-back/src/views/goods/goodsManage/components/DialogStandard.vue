<template>
  <div class="dialog_standard_com">
    <!-- 标准化弹框 -->
    <el-dialog :title="title" :visible.sync="showDialog" 
      :close-on-click-modal="false" @close="closedFn" width="45%">
     
      <div v-if="activeStep==1"  class="contain">
        <div class="goods_tip">
          <i class="el-icon-warning icon_color" ></i>
          <span class="tip_text">编码、品牌、产地相同但性质不同的配件若选中其中某一性质的配件进行标准化时，系统将对该配件其他性质一并处理</span>
        </div>
        <div class="err_msg" v-if="errMsg1">{{errMsg1}}</div>
        <div class="text_danger">
          注：有效数据中共 
          <span class="brandCount">{{replaceBrand.brandCount}}</span> 个配件品牌，其中 
          <span class="standardCount">{{replaceBrand.standardCount}}</span> 个配件品牌为系统支持清洗的标准配件厂牌，
          <span class="brandValidCount">{{replaceBrand.brandValidCount}}</span> 个配件品牌为品牌件品牌或汽车品牌，
          <span class="brandNoneCount">{{replaceBrand.brandNoneCount}}</span> 个配件品牌为系统不支持清洗的非标准品牌。
        </div>
        <p style="margin-bottom: 1rem;">标准配件厂牌已默认指定该品牌为清洗品牌；品牌件品牌和汽车品牌可选择原品牌或汽车厂牌进行清洗，非标准品牌请指定对应的标准品牌为清洗品牌，清洗完成后，系统会将配件品牌更改为标准品牌；未指定清洗品牌的配件将跳过清洗。</p>
        <el-table
          :data="bandsTableData"
          max-height="250"
          border 
          size="small"
          class="xtable"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            label="配件品牌"
            prop="partBand"
            align="center">
            <template slot-scope="scope">
              <span class="">{{scope.row.partBand}}</span>              
            </template>
          </el-table-column>
          <el-table-column
            label="清洗品牌"
            prop="cleanBand"
            align="center" >
            <template slot-scope="scope">
              <el-select v-model="scope.row.cleanBand" size="small"
                filterable placeholder="请选择" style="width:100%;">
                <el-option
                  v-for="(item,index) in bandList"
                  :key="index"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
              
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="activeStep==2"  class="contain">
        <div class="err_msg" v-if="errMsg2">{{errMsg2}}</div>
        
        <p style="margin-bottom: 1rem;">
          本次标准化清洗异常数据 <span class="replaceCount">{{replaceResultTips.replaceCount}}</span> 条，
          其中模糊匹配 <span class="fuzzyCount">{{replaceResultTips.fuzzyCount}}</span> 条，
          清洗失败<span class="unverifiedCount">{{replaceResultTips.unverifiedCount}}</span> 条，
          可对以下异常的数据进行处理：
        </p>
        <p style="margin-bottom: 1rem;color:red;">
          * 模糊匹配：配件编号存在前后缀偏差    清洗失败：标准库里没有这个件号
        </p>
        <el-tabs type="card">
          <el-tab-pane label="模糊匹配">
            <FuzzyCount 
              :fuzzyData="replaceResultData.candidates"
              @onToStandard="toStandardFn"/>
          </el-tab-pane>
          <el-tab-pane label="清洗失败">
            <UnverifiedCount 
            :unverifiedData="replaceResultData.unverified"
            @onResetFn="resetFn" 
            :isAll="isAll"/>
          </el-tab-pane>
          
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="activeStep==1" 
          size="small" type="primary"  :loading="cleanLoading"
          @click="onStartClean">开始清洗</el-button>
        <el-button v-if="activeStep==2" 
          size="small"  type="primary" plain 
          :loading="resetStatus" :disabled="!replaceResultData.unverified.length"
          @click="onRetry">异常数据重试</el-button>
        <el-button v-if="activeStep==2" 
          size="small"  type="primary" 
          @click="closedFn" >关闭</el-button>
      
      </div>
    </el-dialog>  
    
  </div>
</template>

<script>
import FuzzyCount from './FuzzyCount.vue'
import UnverifiedCount from './UnverifiedCount.vue'
import { GoodsManageApi } from '../services'
const goodsManageApi = new GoodsManageApi();

export default {
  name:"DialogStandardCom",
  components:{
    FuzzyCount,
    UnverifiedCount
  },
  data(){
    return{
      dialogData:[],
      showDialog:false,
      title:"商品标准化",
      activeStep: 1,
      multipleSelection: [],
      selection: [],//已选中
      pageInfo:{
        page: 1,
        totalSize:10,
        pageSize:20
      },
      errMsg1:'',//step1的错误提示：未找到需要清洗的配件，请确认后操作
      errMsg2:'',//step2的错误提示
      bandsTableData:[
        // {partBand:'博士',cleanBand:'博士'},
      ],
      bandList:[
        // {code:'博士',name:'博士'},
      ],
      vehBrandsData:[],
      vehBrandsFactoryData:[],
      brandsData:[],

      replaceBrand:{//有效数据
        brandCount:9,//共 
        standardCount:7,//系统支持清洗的标准配件厂牌
        brandValidCount:1,//配件品牌为品牌件品牌或汽车品牌
        brandNoneCount:1,//配件品牌为系统不支持清洗的非标准品牌
      },
      replaceResultTips:{//清洗结果
        replaceCount:1,//清洗异常合计
        conflictCount:1,//冲突
        fuzzyCount:1,//模糊匹配
        unverifiedCount:1,//未认证(清洗失败)
      },
      replaceResultData:{
        done:[],
        candidates: [
          // {
          //   "swPartId": 11,
          //   "oeCode": "8E0117335",
          //   "matches": [{
          //       "matchType": "1",
          //       "oeCode": "8E0117335L",
          //       "stdOeCode": "8E0117335L",
          //       "oeName": "空气导管",
          //       "stdName": "",
          //       "vehSeries": "",
          //       "price4s": "0"
          //   }]
          // }, {
          //   "swPartId": 4,
          //   "matches": [{
          //       "matchType": "1",
          //       "oeCode": "058260511",
          //       "stdOeCode": "058260511",
          //       "oeName": "带张紧轮的支架",
          //       "stdName": "",
          //       "vehSeries": "进口奥迪A6|进口奥迪A4|一汽奥迪A6L",
          //       "price4s": "483.13"
          //   }]
          // }
        ],
        conflicts:[],
        unverified:[
          // {brand: "德尔福", swPartId: 297196, matchType: "8", oeCode: "000", stdOeCode: "", stdName: "", oeName: ""},
          // {brand: "德尔福", swPartId: 297946, matchType: "8", oeCode: "00001", stdOeCode: "", stdName: ""},
          // {brand: "德尔福", swPartId: 32702, matchType: "8", oeCode: "000097059B", stdOeCode: "", stdName: ""}
        ],
        faild:[]
      },
      groupInfo:{},
      cleanLoading:false,
      brand:'',//清洗品牌
      resetStatus:false,
    }
  },
  props:['isShow',"tableData",'isAll'],
  watch:{
    isShow(val){
      this.showDialog = val;
      if(val){
        this.activeStep = 1;
        this.cleanLoading = false;
        this.resetStatus = false;
      }
      
    },
    tableData(val){
      this.dialogData = val;
      this.viewReplaceBrands();
    }
  },
  mounted(){
    window.za = this;
    this.showDialog = this.isShow;
    this.dialogData = this.tableData;
    this.getBrands();//获取汽车品牌
    
  },
  methods:{
    
    getBrands(){
      let _this = this;
      goodsManageApi.getBrands().then(data => {
        for(var i = 0; i < data.length; i++){
						var temp = {
							code:data[i].code,
							name:data[i].name
						}
						if(data[i].isMj){
								if(data[i].type === 1){
										_this.vehBrandsData.push(temp);
								}else if(data[i].type === 2){
										temp.parentCode = data[i].parent.code;
										_this.vehBrandsFactoryData.push(temp);
								}else if(data[i].type === 3){
										_this.brandsData.push(temp);
								}
						}
        }
        
      }).catch(error => {
        console.log(error);
      });
    },
    viewReplaceBrands(){
      this.groupInfo = this.getGroupReplaceInfo();
      this.replaceBrand.brandCount = this.groupInfo.allBrandsCountArr.length;
      this.replaceBrand.standardCount = this.groupInfo.standardCountArr.length;
      this.replaceBrand.brandValidCount = this.groupInfo.brandsCountArr.length;
      this.replaceBrand.brandNoneCount = this.groupInfo.noneBrandsCountArr.length;
      let _this = this;
      _this.bandsTableData = [];
      let listBrandArr = [...this.groupInfo.noneBrandsCountArr,...this.groupInfo.brandsCountArr];
      listBrandArr.forEach((item,index) =>{
        var markClass = '';
        var val = '';
        if(index < _this.groupInfo.noneBrandsCountArr.length){
            markClass = 'text-danger';
        }else{
            val = item;
        }
        _this.bandsTableData.push({partBand:item,cleanBand:val})
      })
    },
    getGroupReplaceInfo(){
			var replaceGroupData = {
        brandList:[]
      };
			var allBrandsCountArr = [];
			var standardCountArr = [];
			var brandsCountArr = [];
      var noneBrandsCountArr = [];
      let _this = this;
			_this.dialogData.forEach(function(item){
					let brand = item.brand;
					if(!replaceGroupData[brand]){
							allBrandsCountArr.push(brand);
              replaceGroupData[brand] = [];
              let getReplaceVehBrandsData = [..._this.vehBrandsFactoryData];
              let getReplaceAllBrandsData = _this.vehBrandsData.concat(_this.vehBrandsFactoryData).concat(_this.brandsData);
              _this.bandList = getReplaceAllBrandsData;
              if(
									getReplaceVehBrandsData.find(function(bitem){
											return bitem.name === brand
									})
							){
									standardCountArr.push(brand);
							}else if(
									getReplaceAllBrandsData.find(function(bitem){
											return bitem.name === brand
									})
							){
									brandsCountArr.push(brand);
							}else{
									noneBrandsCountArr.push(brand);
							}
          }
          replaceGroupData.brandList.push({
              swId:item.swId || item.swPartId,
              brand:brand
          });
					replaceGroupData[brand].push({
							id:item.swId || item.swPartId,
							brand:brand,
					});
			});
			
			return {
					replaceGroupData:replaceGroupData,
					allBrandsCountArr:allBrandsCountArr,
					standardCountArr:standardCountArr,
					brandsCountArr:brandsCountArr,
					noneBrandsCountArr:noneBrandsCountArr
			}
    },
    
    closedFn(){
      this.$emit("onClose",false);
    },
    toStandardFn(data){//点击按此标准
      let params = {
        obj:data,
        brand:this.brand
      }
      let _this = this;
      goodsManageApi.partsClean(params).then(res => {
        console.log('res',res);
        let done = res.done ? res.done :[];
        // let unverified = res.unverified ? res.unverified :[];
        let tableData = [..._this.replaceResultData.candidates];
        if(done.length){
          done.forEach(k => {
            tableData.forEach((p,i) => {
              if(k.swPartId == p.swPartId){
                _this.replaceResultData.candidates.splice(i,1);
              }
            })
          })
          _this.$message.success("标准化成功");
        }
        // if(unverified.length){
        //   unverified.forEach(p =>{
        //     _this.replaceResultData.unverified.push(p);
        //   })
        // }
        _this.resetStatus = false;
        _this.viewResultList(res);
      }).catch(error => {
        console.log(error);
      });
    },
    resetFn(data){//点击重试 //2021-5-12
      let _this = this;
      let Arr = [];
      data.forEach(p =>{
        _this.tableData.forEach(q =>{
          if(p.swPartId == q.swId){
            Arr.push(q);
          }
        })
      })
      this.activeStep = 1;
      this.cleanLoading = false;
      this.resetStatus = false;
      this.dialogData = Arr;
      this.viewReplaceBrands();
    },
    resetFnOld(data){//点击重试
      let params = {
        obj:data,
        brand:this.brand
      }
      this.resetClearnFn(params);
    },
    resetClearnFn(params){//重试清洗
      let _this = this;
      goodsManageApi.partsClean(params).then(res => {
        let done = res.done ? res.done :[];
        let tableData = [..._this.replaceResultData.unverified];
        if(done.length){
          done.forEach(k => {
            tableData.forEach((p,i) => {
              if(k.swPartId == p.swPartId){
                _this.replaceResultData.unverified.splice(i,1);
              }
            })
          })
          _this.$message.success('清洗成功')
        }
        _this.resetStatus = false;
        _this.viewResultList(res);
      }).catch(error => {
        console.log(error);
      });
    },
    onRetry(){//异常数据重试
      let faildData = [...this.replaceResultData.candidates,...this.replaceResultData.unverified]
      let _this = this;
      let Arr = [];
      faildData.forEach(p =>{
        _this.tableData.forEach(q =>{
          if(p.swPartId == q.swId){
            Arr.push(q);
          }
        })
      })
      this.activeStep = 1;
      this.cleanLoading = false;
      this.resetStatus = false;
      this.dialogData = Arr;
      this.viewReplaceBrands();
    },
    onRetryOld(){//异常数据重试
      let _this = this;
      _this.resetStatus = true;
      let obj = {
        all:_this.isAll,
        ids:[],
        type:1
      }
      let resetData = [..._this.replaceResultData.unverified];

      resetData.forEach(p=>{
        obj.ids.push(p.swPartId);
      })
      let params = {
        obj:obj,
        brand:this.brand
      }
      this.resetClearnFn(params);
    },
   
    onStartClean(){//开始清洗
      let _this = this;
      let flag = true;
      this.bandsTableData.forEach(p =>{
        if(!p.cleanBand){
          _this.errMsg1 = '请选择配件品牌 ' + p.partBand + ' 对应的清洗品牌';
          flag = false;
          return false;
        }
      });
      if(!flag){
        return false;
      }
      let brandArr = [];
      this.bandsTableData.forEach(p =>{
        brandArr.push(p.cleanBand);
      });
      this.brand = brandArr.join(',');
      
			_this.replaceResultData = {
					done:[],
					candidates:[],
					conflicts:[],
					unverified:[],
					faild:[]
      };
      let obj={
          all:_this.isAll,
          ids:[],
          type:1 //# 0:配件（使用company_parts.id）;1:商品（使用sw_part_id）
      }
      let arr = _this.groupInfo.replaceGroupData.brandList;
      if(!arr)return;
      arr.forEach(p=>{
          obj.ids.push(p.swId);
      })
      let params = {
        obj:obj,
        brand:_this.brand
      }

      _this.clearnPartsFn(params);
      
    },
    clearnPartsFn(params){
      let _this = this;
      _this.cleanLoading = true;
      goodsManageApi.partsClean(params).then(res => {
        console.log('res',res);
        _this.cleanLoading = false;
        _this.activeStep = 2;
        

        _this.viewResultList(res);
      }).catch(error => {
        console.log(error);
      });
    },
    viewResultList(res){
      let _this = this;

      _this.replaceResultData.done = res.done ? res.done :[];
      _this.replaceResultData.candidates = res.candidates ? res.candidates :[];
      _this.replaceResultData.conflicts = res.conflicts ? res.conflicts :[];
      _this.replaceResultData.unverified = res.unverified ? res.unverified :[];
      _this.replaceResultData.faild = res.faild ? res.faild :[];

      var count = _this.replaceResultData.candidates.length +
                  _this.replaceResultData.conflicts.length +
                  _this.replaceResultData.unverified.length;
      _this.replaceResultTips.replaceCount = count;           
      _this.replaceResultTips.soldCount = _this.replaceResultData.done.length;           
      _this.replaceResultTips.conflictCount = _this.replaceResultData.conflicts.length;           
      _this.replaceResultTips.fuzzyCount = _this.replaceResultData.candidates.length;           
      _this.replaceResultTips.unverifiedCount = _this.replaceResultData.unverified.length; 

    },
    
  }
}
</script>

<style lang="less" scoped>
.dialog_standard_com{
  .contain{
    min-height: 200px;
    max-height: 500px;
    overflow: auto;
    .goods_tip{
      display: flex;
      align-items: center;
      background: #FAEEE1;
      border: 1px solid @color-warning;
      padding: 6px 0;
      margin-bottom: 8px;
      .icon_color{
        color: @color-warning;
        font-size: 16px;
        margin: 0 8px;
      }
      .tip_text{
        color:@text-color-base;
      }
    }
  }
  .err_msg{
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
  }
  .text_danger {
    color: #dc3545;
  }
  /deep/.el-dialog__body {
    padding: 20px;
  }
  /deep/.el-step__icon.is-text {
    border-color: initial;
  }
  /deep/.el-step__head.is-process,
  /deep/.el-step__title.is-process{
    color: #3a8ee6;
  }
    
  
}
</style>>

