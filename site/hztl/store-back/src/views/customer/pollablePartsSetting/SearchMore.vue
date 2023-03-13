<template>
  <div class="search-form">
    <div class="search">
      <Search 
        style="width:652px;"
        @onSearchFn="searchHandle" 
        @onResetFn="resetHandle"
        @onMoreSeacrh="moreSeacrhFn" 
        :placeholder="placeholder"/>
      <div style="margin-left: 10px;font-size: 14px; font-weight: bold;" >
        <span v-if="contacts">客户：{{renderCustomer()}}</span>
      </div>
      <!-- <div style="margin-left: 10px;font-size: 14px; font-weight: bold;" v-if="customerType === 0">
        <span v-if="contacts">客户：{{contacts}}</span>&emsp;
        <span v-if="contactsPhone">电话号码：{{contactsPhone}}</span>
      </div>
      <div style="margin-left: 10px;font-size: 14px; font-weight: bold;" v-if="customerType === 1">
        <span v-if="companyName">公司名称：{{companyName}}</span>&emsp;
        <span v-if="contacts">客户：{{contacts}}</span>&emsp;
        <span v-if="contactsPhone">电话号码：{{contactsPhone}}</span>
      </div> -->
    </div>
    
    <el-row class="more_search_box" v-if="moreSearch">
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">配件编码</span>
          <el-input class="search_item_cont"
            size="small" clearable
            v-model="formData.code"
          >
          </el-input>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">配件名称</span>
          <el-input class="search_item_cont"
            size="small" clearable
            v-model="formData.name"
          >
          </el-input>
        </div>
      </el-col>
      
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">规格</span>
          <el-autocomplete
            size="small" 
            v-model="formData.swSpec"
            :fetch-suggestions="fetchSwSpecs"
            clearable
            class="select-content search_item_cont"
          />
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label" style="font-size:12px;">车型/适用车型</span>
          <el-input class=" search_item_cont"
            size="small" clearable
            v-model="formData.vehModel"
          >
          </el-input>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">价格是否为0</span>
          <el-select
            v-model="formData.zeroPrice"
            clearable size="small"
            class="select-content search_item_cont"
          >
            <el-option
              v-for="(item, index) in ZERO_PRICES"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">配件分类</span>
          <el-input class="search_item_cont"
            size="small" clearable
            v-model="formData.swCategory"
          >
          </el-input>
        </div>
      </el-col>
      
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">配件品牌</span>
          <el-select
            v-model="formData.brand"
            :remote-method="remoteBrands"
            filterable size="small"
            remote
            clearable
            class="select-content search_item_cont"
          >
            <el-option
              v-for="(item, index) in brands"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">生产码</span>
          <el-input class="search_item_cont"
            size="small" clearable
            v-model="formData.manuCode"
          >
          </el-input>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">库存数量</span>
          <el-input
            class="search_item_cont"
            v-model="formData.qtyValue"
            clearable size="small"
          >
            <template slot="prepend">
              <el-select size="small"
                v-model="formData.qtyType"
                style="width: 70px;"
              >
                <el-option
                  v-for="(item, index) in QTY_TYPES"
                  :key="index"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-input>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">产地</span>
          <el-input class="search_item_cont"
            size="small" clearable
            v-model="formData.productionPlace"
          >
          </el-input>
        </div>
      </el-col>
      
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">是否可查件</span>
          <el-select
            v-model="formData.searchType"
            clearable size="small"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in SEARCH_TYPES"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
      </el-col>
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">享受价格类型</span>
          <el-select
            v-model="formData.priceType"
            clearable size="small"
            class="search_item_cont"
          >
            <el-option
              v-for="(item, index) in priceTypes"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </div>
      </el-col>
     
      <el-col  class="search_item_4">
        <div class="search_item">
          <span class="label">限购日期</span>
          <el-date-picker
            style="width:204px"
            v-model="applyTime"
            type="daterange"  unlink-panels
            range-separator="至" size="small"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00']"
            @change="changeTime">
          </el-date-picker>
        </div>
      </el-col>
      <el-col class="search_item_4" >
        <div class="search_item">
          <el-checkbox v-model="formData.onlyPromotion" 
            style="margin-left:93px;box-sizing:border-box;">
            促销
          </el-checkbox>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Search from '@/components/search/SearchCom.vue';
import { mapState } from "vuex";
import store from "./store";
import { PollablePartsSettingApi } from './services'
const pollablePartsSettingApi = new PollablePartsSettingApi();
const ZERO_PRICES = [
  { code: "0", name: "全部" },
  { code: "1", name: "价格为0" },
  { code: "2", name: "价格不为0" }
];
const SEARCH_TYPES = [
  { code: 0, name: "全部" },
  { code: 1, name: "是" },
  { code: 2, name: "否" }
];
const QTY_TYPES = [
  { code: "0", name: "全部" },
  { code: "1", name: "等于" },
  { code: "2", name: "大于" },
  { code: "3", name: "小于" }
];
const defaultFormData = {
  code: "",
  name: "",
  brand: "",
  swSpec: "",
  vehModel: "",
  swCategory: "",
  productionPlace: "",
  manuCode: "",
  qtyValue: "",
  qtyType: "0",
  zeroPrice: "0",
  searchType: 0,
  priceType: "",
  limitStartTime: "",
  limitEndTime: "",
  onlyPromotion: false
}

export default {
  name: "SearchMore",
  store,
  props: {
    contacts: {
      type: String,
      default: ""
    },
    customerType: Number,
    companyName: String,
    contactsPhone: String
  },
  components:{
    Search
  },
  data() {
    return {
      ZERO_PRICES,
      SEARCH_TYPES,
      QTY_TYPES,
      formData: { ...defaultFormData },
      deteRange: [],
      brands: [],
      placeholder:"配件编码、配件名称",
      moreSearch:false,//更多筛选
      applyTime:[],//日期
      searchObj:{
        keyword:'',
      },
    };
  },
  computed: {
    ...mapState(["priceTypes"])
  },
  mounted() {
    // this.$store.dispatch("getPartTypes");
    this.$store.dispatch("getPriceTypes");
    this.searchHandle();
  },
  methods: {
    renderCustomer(){
      let str = '';
      if(this.customerType === 0){//个人客户
        str += this.contacts + '-' + this.contactsPhone;
      }else if(this.customerType === 1){//公司客户
        str += this.companyName + '-' + this.contacts + '-' + this.contactsPhone;
      }
      return str;
    },
    remoteBrands(query) {
      pollablePartsSettingApi.getCompanySkus({ field: "brand", value: query })
        .then(res => {
          this.brands = res || [];
        })
        .catch(() => {
          this.brands = []
        });
    },
    fetchSwSpecs(query, cb) {
      pollablePartsSettingApi.getCompanySkus({ field: "spec", value: query })
        .then(res => {
          cb(res.map(item => ({ value: item })) || []);
        })
        .catch(() => {
          cb([]);
        })
    },
    searchHandle(data) {
      this.formData.keyword = data;
      this.$emit("search", {
        ...this.formData,
        priceType: this.formData.priceType === "全部" ? "" : this.formData.priceType,
        limitStartTime: this.deteRange && this.deteRange.length ? this.deteRange[0] : "",
        limitEndTime: this.deteRange && this.deteRange.length ? this.deteRange[1] : ""
      });
    },
    resetHandle() {
      this.deteRange = [];
      this.formData = { ...defaultFormData };
    },
    moreSeacrhFn(data){
      if(data){
        this.maxHeight = '650';
      }else{
        this.maxHeight = '712';
      }
      this.moreSearch = data;
      let keyword = this.searchObj.keyword;
      this.searchObj = {
        keyword:keyword
      }
    },
    changeTime(time){
      if(time){
        this.searchObj.limitStartTime = this.$dayjs(time[0]).format('YYYY-MM-DD');
        this.searchObj.limitEndTime = this.$dayjs(time[1]).format('YYYY-MM-DD');
      }else{
        this.searchObj.limitStartTime = "";
        this.searchObj.limitEndTime = "";
      }
      
    },
  }
}
</script>

<style lang="less" scoped>
.search-form {
  font-size: 14px;
  .search{
    display: flex;
    align-items: center;
  }
  .search_item_4{
    width:300px;
  }
  .search_item{
    .label{
      width: 90px;
      margin-right: 4px;
      display: inline-block;
    }
    .search_item_cont{
      width:204px;
    }
  }
  .more_search_box{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /deep/.el-col{
      margin:4px 8px;
    }
    /deep/.el-date-editor .el-range-separator{
      padding: 0 2px;
    }
    /deep/.el-range-editor.el-input__inner{
      padding: 3px 6px;
    }
    /deep/.el-date-editor .el-range__close-icon{
      width:15px;
    }
    /deep/.el-input-group__prepend{
        padding: 0 18px 0 12px;
    }
    /deep/.el-input--suffix .el-input__inner {
        padding-right: 20px;
    }
    /deep/.el-input__suffix{
        right:0;
    }
  }
}
.search-container {
  display: flex;
  flex-wrap: wrap;

  .search-item-container {
    flex: none;
    width: 195px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  /deep/ .el-input-group__prepend {
    padding: 2px;
  }
}
.select-container {
  display: flex;
  align-items: center;

  .select-label {
    flex: none;
    padding: 5px 2px;
    height: 32px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    color: #909399;
    background-color: #F5F7FA;
  }
  .select-content {
    flex: 1;
  }
}

</style>