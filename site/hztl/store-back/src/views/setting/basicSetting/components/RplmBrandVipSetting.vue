<template>
  <div class="brand-vip-setting">
    <div class="brand-vip-setting-content">
      <div class="title-each">
        <el-popover placement="right" width="500" trigger="click">
          <p>设置说明
            <br>1、<品牌会员设置>设置是否启用汽车品牌会员或品牌件品牌会员，以及当一个配件的汽车品牌和配件品牌均设置了不同的会员折扣时优先使用汽车品牌的会员折扣还是配件品牌的会员折扣
          </p>
          <i class="el-icon-question" style="cursor:pointer" slot="reference"></i>
        </el-popover>品牌会员设置
      </div>
      <div style="clear:both"></div>
      <div class="content">
        <div class="con-input">
          <span class="title">是否启用汽车厂牌会员管理：</span>
          <el-select v-model="postData.useVehBrand">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </div>
        <div class="con-input">
          <span class="title">汽车厂牌会员和配件品牌会员同时满足时的优先级设置：</span>
          <el-select v-model="postData.pricePriority" :disabled="!postData.useVehBrand || !postData.useBrand">
            <el-option label="配件品牌会员优先" :value="'1'"></el-option>
            <el-option label="汽车厂牌会员优先" :value="'0'"></el-option>
          </el-select>
        </div>
        <div class="con-input">
          <span class="title">是否启用配件品牌会员管理：</span>
          <el-select v-model="postData.useBrand">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </div>
      </div>
      <div class="table-content-left">
        <ul class="left-ul">
          <li v-for="(tab,index) in tabs" :key="index">
            <a :class="{'active':componentActive==index}" @click="changeTabs(index)">{{tab.type}}</a>
          </li>
        </ul>
        <!-- 汽车品牌table -->
        <el-table
          ref="vehBrandTable"
          :data="postData.vehBrands"
          border
          style="width: 100%"
          height="420"
          v-if="componentActive==0"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="date" label="序号" type="index" width="100px"></el-table-column>
          <el-table-column prop="name" label="厂牌"></el-table-column>
          <el-table-column  label="价格类型">
            <template slot-scope="scope">
              <span>{{priceTypeName(scope.row)}}</span>
            </template>

          </el-table-column>
          <el-table-column prop="discount" label="折扣率"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 配件品牌 table -->
        <el-table
          ref="brandTable"
          :data="postData.brands"
          border
          height="420"
          style="width: 100%"
          v-if="componentActive==1"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="date" label="序号" type="index" width="100px"></el-table-column>
          <el-table-column prop="name" label="品牌"></el-table-column>
          <el-table-column label="价格类型">
            <template slot-scope="scope">
              <span>{{priceTypeName(scope.row)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="discount" label="折扣率"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top:10px;"
          size="small"
          @click="addVIPBrand"
        >+ 新增会员品牌</el-button>
      </div>
      <div class="table-content-priceLevel" v-show="showDetail&&JSON.stringify(showDetail)!='{}'">
        <div class="base-table-info">
          <div class="con-input con-input-info">
            <span class="title">{{this.componentActive==0 ? '厂牌：' : '品牌：'}}</span>
            <!-- 这是汽车品牌列表品牌 -->
            <el-select
              v-model="showDetail.name"
              placeholder="请选择"
              v-if="componentActive==0"
              disabled
            >
              <el-option
                v-for="item in allVehBrands"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <!-- 配件品牌列表 -->
            <el-select
              disabled
              v-model="showDetail.name"
              placeholder="请选择"
              v-if="componentActive==1"
            >
              <el-option
                v-for="item in allBrands"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="con-input con-input-info">
            <span class="title">价格类型：</span>
            <el-select v-model="showDetail.priceType" :disabled="!showDetail.priceType">
              <el-option
                v-for="item in priceTypeList"
                :key="'table-right-'+item.name"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="con-input con-input-info">
            <span class="title">折扣率：</span>
            <el-input
              :disabled="showDetail.discount==undefined || showDetail.discount==''"
              v-model="showDetail.discount"
              placeholder="请输入内容"
              @input="toFixdTwo(showDetail,'discount')"
            ></el-input>
          </div>
        </div>
        <!-- 会员等级table -->
        <el-table ref="priceTable" :data="showDetail.priceLevel" border 
          align="center" height="320" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.subPriceLevel"
                border="" class="subPrice"
                style="width: 100%"
                align="center"
                v-if="scope.row.subPriceLevel&&scope.row.subPriceLevel.length"
              >
                <el-table-column label="序号" type="index" width="100px"></el-table-column>
                <el-table-column label="配件类别">
                  <template slot-scope="props">
                    <el-select v-model="props.row.partType">
                      <el-option
                        v-for="item in partTypeList"
                        :key="'table-right-add'+item.Code"
                        :label="item.name"
                        :value="item.Code"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="价格类型">
                  <template slot-scope="props">
                    <el-select v-model="props.row.priceType">
                      <el-option
                        v-for="item in priceTypeList"
                        :key="'table-right-modify'+item.name"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="折扣率">
                  <template slot-scope="props">
                    <el-input
                      v-model="props.row.discount"
                      @input="toFixdTwo(props.row,'discount')"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="props">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteVIPDetails(props.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="100px"></el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.priceType">
                <el-option
                  v-for="item in priceTypeList"
                  :key="'table-right-table-'+item.name"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="折扣率">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.discount"
                @input="toFixdTwo(scope.row,'discount')"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="155">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteVIPBrands(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="addVIPBrands(scope.$index, scope.row)"
              >新增</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top:10px;"
          size="small"
          @click="addVIPLevel"
        >+ 新增会员等级</el-button>
      </div>
    </div>
    <div class="button-div">
      <button class="save-button btn btn-primary" @click="save()">保存</button>
    </div>
    <!-- 弹框 -->
    <el-dialog title="新增会员品牌" :visible.sync="showAddDialog" width="50%">
      <div class="table-content-priceLevel">
        <div class="base-table-info">
          <div class="con-input con-input-info">
            <span class="title expire">{{this.componentActive==0 ? '厂牌：' : '品牌：'}}</span>
            <!-- 这是汽车品牌列表品牌 -->
            <el-select
              v-model="addDetail.name"
              filterable
              placeholder="请选择"
              v-if="componentActive==0"
            >
              <el-option
                v-for="item in allVehBrands"
                :disabled="item.isDisabled"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
            <!-- 配件品牌列表 -->
            <el-select
              v-model="addDetail.name"
              filterable
              placeholder="请选择"
              v-if="componentActive==1"
            >
              <el-option
                v-for="item in allBrands"
                :disabled="item.isDisabled"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="con-input con-input-info">
            <span class="title expire">价格类型：</span>
            <el-select v-model="addDetail.priceType">
              <el-option
                v-for="item in priceTypeList"
                :key="'dialog-'+item.name"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="con-input con-input-info">
            <span class="title expire">折扣率：</span>
            <el-input v-model="addDetail.discount" @input="toFixdTwo(addDetail,'discount')"></el-input>
          </div>
        </div>
        <el-table ref="dialogPriceTable" :data="addDetail.priceLevel" border="" style="width:100%;margin-top:10px;">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.subPriceLevel"
                border="" class="subPrice"
                style="width: 100%"
                v-if="scope.row.subPriceLevel&&scope.row.subPriceLevel.length"
              >
                <el-table-column label="序号" type="index" width="100px"></el-table-column>
                <el-table-column label="配件类别">
                  <template slot-scope="props">
                    <el-select v-model="props.row.partType">
                      <el-option
                        v-for="part in partTypeList"
                        :key="'dialog-add'+part.Code"
                        :label="part.name"
                        :value="part.Code"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="价格类型">
                  <template slot-scope="props">
                    <el-select v-model="props.row.priceType">
                      <el-option
                        v-for="price in priceTypeList"
                        :key="'dialog-add'+price.name"
                        :label="price.name"
                        :value="price.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="折扣率">
                  <template slot-scope="props">
                    <el-input
                      v-model="props.row.discount"
                      @input="toFixdTwo(props.row,'discount')"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="props">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="dialogDeleteVIPDetails(props.$index, scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="100px"></el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="价格类型">
            <template slot-scope="scope">
              <el-select v-model="scope.row.priceType">
                <el-option
                  v-for="item in priceTypeList"
                  :key="'dialog-add-table-'+item.name"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="折扣率">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.discount"
                @input="toFixdTwo(scope.row,'discount')"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="dialogDeleteVIPBrands(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="dialogAddVIPBrands(scope.$index, scope.row)"
              >新增</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          style="margin-top:10px;"
          size="small"
          @click="dialogAddVIPLevel"
        >+ 新增会员等级</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { basic_get, accounts_get, accounts_post} from "@/utils/http";
export default {
  name: "RplmBrandVipSetting",
  data() {
    return {
      postData: {
        vehBrands: [],
        brands: []
      },
      tabs: [{ type: "汽车厂牌" }, { type: "配件品牌" }],
      componentActive: 0,
      allVehBrands: [],
      allBrands: [],
      showAddDialog: false,
      showDetail: {
        priceLevel: [
          {
            name: "",
            subPriceLevel: [
              {
                partType: ""
              }
            ]
          }
        ]
      },
      addDetail: {},
      addVIPLevelObj: {
        name: "",
        priceType: "",
        discount: "",
        priceLevel: []
      },
      addVIPBrandTypeObj: {
        partType: "",
        priceType: "",
        discount: ""
      },
      addVIPBrandObj: {
        name: "",
        priceType: "",
        discount: "",
        subPriceLevel: []
      },
      partTypeList:[],//配件类别
      priceTypeList: [
        {
          name: "平台价",
          value: "alliance"
        },
        {
          name: "零售价",
          value: "retail"
        },
        {
          name: "批发价",
          value: "p"
        },
        {
          name: "批发价一",
          value: "p1"
        },
        {
          name: "批发价二",
          value: "p2"
        },
        {
          name: "批发价三",
          value: "p3"
        },
        {
          name: "批发价四",
          value: "p4"
        }
      ],
      isPassed:true
    };
  },
  props: {
    isShow: {
      type: Boolean
    }
  },
  watch: {
    isShow: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.getAllVehBrand();
          this.getAllBrand();
          this.getCompanyList();//获取详情数据，请求两个数组
          this.getPartType();//获取配件类型
          // this.getDetail();
          
        }
      }
    }
  },
  mounted(){
    window.z = this;
  },
  methods: {
    priceTypeName(row){
      var priceName = '';
      this.priceTypeList.forEach(p=>{
        if(p.value == row.priceType){
          priceName = p.name;
        }
      })
      return priceName;
    },
    getPartType(){//获取配件类型
      this.partTypeList = [];
      accounts_get("/dicts",{ type: 'partType' }).then(res => {
        this.partTypeList = [...res];
      });
    },
    getCompanyList(){//获取详情数据，请求两个数组
      this.showDetail = {};
      accounts_get("/company/prices/detail").then(data => {
        this.postData = data;
        this.postData.vehBrands = this.toNumberFn(this.postData.vehBrands);
        this.postData.brands = this.toNumberFn(this.postData.brands);
        if (data && data.vehBrands && data.vehBrands.length) {
          // this.showDetail = data.vehBrands[0];
          this.changeShowTable(this.componentActive);
          if(this.showDetail.priceLevel == null){
            this.showDetail.priceLevel = [];
          }
        }
      });
    },
    toNumberFn(arr) {//小数转为百分比
      for(var k of arr){
        if(parseFloat(k.discount)){
          k.discount = Math.round(parseFloat(k.discount ? k.discount : 0) * 100) ;
          k.discount = k.discount + "%";
          
          if(k.priceLevel && k.priceLevel.length){
            this.toNumberFn(k.priceLevel);
          }
          if(k.subPriceLevel && k.subPriceLevel.length){
            this.toNumberFn(k.subPriceLevel);
          }
        }
      }
      return arr;
      
    },
    toNumberFn1(item, key) {//小数转为百分比
      var priceRate = Math.round(parseFloat(item[key] ? item[key] : 0) * 100) ;
      if (item[key].match(/\d+(\.\d{0,2})?/)) {
        item[key] = priceRate + "%";
      } else {
        item[key] = "0%";
      }
      this.$forceUpdate();
    },
    toFloatNumberFn(arr){//百分比转为小数
      for(let k of arr){
        if(k.discount.indexOf('%')>-1){
          k.discount = k.discount.substr(0,k.discount.length - 1);
          if(k.discount.length == 1){
            k.discount = parseFloat('0.0' + k.discount) + "";
          }else if(k.discount.length == 2){
            k.discount = '0.' + k.discount;
          }else if(k.discount.length >2){
            var intNum = k.discount.substr(0,k.discount.length - 2);//整数
            var floatNum = k.discount.substr(k.discount.length - 2);//小数
            k.discount = intNum + "." + floatNum;
            k.discount = parseFloat(k.discount) + "";
          }
          if(k.priceLevel && k.priceLevel.length){
            this.toFloatNumberFn(k.priceLevel);
          }
          if(k.subPriceLevel && k.subPriceLevel.length){
            this.toFloatNumberFn(k.subPriceLevel);
          }
        }
      }
      
      return arr;
    },
    toCheckedFn(arr){//检查录入数据是否完整
      for(var k of arr){
        if(k.priceLevel && k.priceLevel.length >0){
          for(var p of k.priceLevel){
            this.forEachFn(p);
            if(p.subPriceLevel && p.subPriceLevel.length>0){
              for(var j of p.subPriceLevel){
                this.forEachFn(j);
              }
            }
          }
        }
      }
    },
    forEachFn(obj){
      for(var i in obj){
        if(obj[i] === "" && obj[i] !== null){
          if(this.componentActive){
            this.$message.error('请检查配件品牌中数据是否录入完整');
            this.isPassed = false;
            return false;
          }else{
            this.$message.error('请检查汽车厂牌中数据是否录入完整');
            this.isPassed = false;
            return false;
          }
        }
      }
    },
    save() {
      this.isPassed = true;

      let dataObj = Object.assign({},this.postData);
      this.toCheckedFn(dataObj.vehBrands);
      this.toCheckedFn(dataObj.brands);
      if(!this.isPassed) return;
      dataObj.vehBrands = this.toFloatNumberFn(dataObj.vehBrands);
      dataObj.brands = this.toFloatNumberFn(dataObj.brands);
      accounts_post("/company/prices/upsert",dataObj).then(res =>{
        this.$message.success('保存成功');
        this.getCompanyList();//刷新数据
      }).catch(err => {
        this.$message.error(err);
      });
      
    },
    toFixdTwo(item, key) {
      if(item[key].indexOf("%")>-1){
        item[key] = item[key].replace(/\%/,"");
        item[key] = parseFloat(item[key]);
      }else if(item[key] && item[key].indexOf("%") == -1){
        item[key]=item[key];
      }else{
        item[key] = item[key].substr(0,item[key].length-1);
      }
      // if(item[key].indexOf("%")>-1){
      //   item[key] = item[key].replace(/\%/,"");
      //   item[key] = parseFloat(item[key]);
      // }else{
      //   if(item[key].length>1){
      //     item[key] = item[key].substr(0,item[key].length-1);

      //   }
      // }

      if (/^\d{1,3}?/.test(item[key])) {
        if(item[key]>100){
          item[key] = "100%";
        }else{
          item[key] = item[key] +"%";
        }
      } else {
        item[key] = "0%";
      }
      // this.$forceUpdate();
    },
    dialogAddVIPLevel() {
      this.isPassed = true;
      if(!this.addDetail.priceLevel.length){
        this.addDetail.priceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandObj))
        );
      }else{
        this.checkVIPLevelFn(this.addDetail.priceLevel[this.addDetail.priceLevel.length-1],'1');
        if(!this.isPassed) return;
        this.addDetail.priceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandObj))
        );
      }
      
    },
    dialogDeleteVIPDetails(index, scope) {
      scope.subPriceLevel.splice(index, 1);
      if(!scope.subPriceLevel.length){
        this.$refs.dialogPriceTable.toggleRowExpansion(scope,false);
      }
    },
    dialogAddVIPBrands(index, row) {
      this.isPassed = true;
      if(row.subPriceLevel==null){
        row.subPriceLevel = [];
      }
      this.$refs.dialogPriceTable.toggleRowExpansion(row,false);
      this.$refs.dialogPriceTable.toggleRowExpansion(row,true);
      if(!row.subPriceLevel.length){
        row.subPriceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandTypeObj))
        );
      }else{
        this.checkVIPLevelFn(row.subPriceLevel[row.subPriceLevel.length-1],'0');
        if(!this.isPassed) return;
        row.subPriceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandTypeObj))
        );
      }
    },
    dialogDeleteVIPBrands(index, row) {
      this.addDetail.priceLevel.splice(index, 1);
    },
    confirmAdd() {
      //校验必填
      if (!this.addDetail.name) {
        this.$message.error("请选择品牌");
        return;
      }
      if (!this.addDetail.priceType) {
        this.$message.error("请选择价格类型");
        return;
      }
      if (!this.addDetail.discount) {
        this.$message.error("请选择折扣率");
        return;
      }
      for (let item of this.priceTypeList) {
        if (this.addDetail.priceType == item.value) {
          this.addDetail.priceTypeName = item.name;
        }
      }
      if (this.componentActive) {
        this.postData.brands.push(JSON.parse(JSON.stringify(this.addDetail)));
      } else {
        this.postData.vehBrands.push(
          JSON.parse(JSON.stringify(this.addDetail))
        );
      }
      //每次添加完了之后，判断哪些可以选择
      this.showAddDialog = false;
      this.checkDisabledBrand();
    },
    addVIPBrand() {
      // 弹框，保存的时候判断active去添加数据到对应的数组
      this.addDetail = {
        name: "",
        priceType: "",
        discount: "",
        priceLevel: []
      };
      this.showAddDialog = true;
    },
    
    addVIPLevel() {
      this.isPassed = true;
      // console.log('showDetail',this.showDetail);
      if(!this.showDetail.priceLevel.length){
        this.showDetail.priceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandObj))
        );
      }else{
        this.checkVIPLevelFn(this.showDetail.priceLevel[this.showDetail.priceLevel.length-1],'1');
        if(!this.isPassed) return;
        this.showDetail.priceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandObj))
        );
      }
    },
    deleteVIPDetails(index, scope) {
      scope.subPriceLevel.splice(index, 1);
      if(!scope.subPriceLevel.length){
        this.$refs.priceTable.toggleRowExpansion(scope,false);
      }
    },
    deleteVIPBrands(index, row) {
      this.showDetail.priceLevel.splice(index, 1);
    },
    addVIPBrands(index, row) {//新增会员等级下的配件类别
      this.isPassed = true;
      if(row.subPriceLevel==null){
        row.subPriceLevel = [];
      }
      this.$refs.priceTable.toggleRowExpansion(row,false);
      this.$refs.priceTable.toggleRowExpansion(row,true);
      if(!row.subPriceLevel.length){
        row.subPriceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandTypeObj))
        );
      }else{
        this.checkVIPLevelFn(row.subPriceLevel[row.subPriceLevel.length-1],'0');
        if(!this.isPassed) return;
        row.subPriceLevel.push(
          JSON.parse(JSON.stringify(this.addVIPBrandTypeObj))
        );
      }
    },
    checkVIPLevelFn(obj,type){//检查 会员等级/配件 信息是否录入完整
      let name = type == '1' ? "会员等级" : "配件";
      for(var i in obj){
        if(i === "partType" && obj[i] === "" && obj[i] !== null){
          this.$message.error('请选择配件类别');
          this.isPassed = false;
          return false;
        }else if(i === "name" && obj[i] === "" && obj[i] !== null){
          this.$message.error('请输入会员等级名称');
          this.isPassed = false;
          return false;
        }else if(i === "priceType" && obj[i] === "" && obj[i] !== null){
          this.$message.error(`请选择${name}价格类型`);
          this.isPassed = false;
          return false;
        }else if(i === "discount" && obj[i] === "" && obj[i] !== null){
          this.$message.error(`请输入${name}折扣率`);
          this.isPassed = false;
          return false;
        }
        
      }
      return true;
    },
    
    handleCurrentChange(val) {
      //选择当前行
      if(!val)return;
      if(val.priceLevel == null){
        val.priceLevel = [];
      }
      this.showDetail = val;
      if (this.componentActive) {
        this.postData.brands.forEach((p,i)=>{
          if(p.name == val.name){
            localStorage.setItem('brandsName',val.name);
          }
        });
      } else {
        this.postData.vehBrands.forEach((p,i)=>{
          if(p.name == val.name){
            localStorage.setItem('vehBrandsName',val.name);
          }
        });
      }
    },
    getAllVehBrand() {//默认先获取所有汽车厂牌列表/brands
      
      basic_get("/brands", { type: 2 })
        .then(data => {
          if (data && data.length) {
            for (let item of data) {
              item.isDisabled = false;
            }
            this.allVehBrands = data;
          } else {
            this.allVehBrands = [];
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    getAllBrand() {
      //默认先获取所有配件品牌列表
      basic_get("/brands", { type: 3 })
        .then(data => {
          if (data && data.length) {
            for (let item of data) {
              item.isDisabled = false;
            }
            this.allBrands = data;
          } else {
            this.allBrands = [];
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleDelete(index, row) {
      //通过active来确定删除那一个列表的
      if (this.componentActive) {
        //删除配件品牌列表
        this.postData.brands.splice(index, 1);
      } else {
        this.postData.vehBrands.splice(index, 1);
      }
    },
    getDetail() {
      //获取详情数据，请求两个数组
      accounts_get("/company/brand-prices").then(data => {
        if (data && data.vehBrands && data.vehBrands.length) {
          this.showDetail = data.vehBrands[0];
        }
        this.postData = data;
      });
    },
    changeTabs(changeTab) {
      //切换
      if (this.componentActive != changeTab) {
        this.componentActive = changeTab;
      }
      this.$forceUpdate();
      setTimeout(() => {
        this.changeShowTable(changeTab);
      }, 100);
    },
    changeShowTable(tab) {
      if (tab == 0) {
        if (this.postData.vehBrands && this.postData.vehBrands.length) {
          var vehBrandsName = localStorage.getItem('vehBrandsName');
          if(vehBrandsName){
            var index = 0;
            this.postData.vehBrands.forEach((p,i)=>{
              if(p.name == vehBrandsName){
                index = i;
              }
            });
            this.showDetail = this.postData.vehBrands[index];
            this.$refs.vehBrandTable.setCurrentRow(this.postData.vehBrands[index]);
          }else{
            this.showDetail = this.postData.vehBrands[0];
            this.$refs.vehBrandTable.setCurrentRow(this.postData.vehBrands[0]);
          }
          
        } else {
          this.showDetail = {};
        }
      } else {
        if (this.postData.brands && this.postData.brands.length) {
          var brandsName = localStorage.getItem('brandsName');
          if(brandsName){
            var index = 0;
            this.postData.brands.forEach((p,i)=>{
              if(p.name == brandsName){
                index = i;
              }
            });
            this.showDetail = this.postData.brands[index];
            this.$refs.brandTable.setCurrentRow(this.postData.brands[index]);
          }else{
            this.showDetail = this.postData.brands[0];
            this.$refs.brandTable.setCurrentRow(this.postData.brands[0]);
          }
          
        } else {
          this.showDetail = {};
        }
      }
      this.$forceUpdate();
    },
    checkDisabledBrand() {
      if (
        this.postData.vehBrands &&
        this.postData.vehBrands.length &&
        this.allVehBrands &&
        this.allVehBrands.length
      ) {
        for (let item of this.postData.vehBrands) {
          for (let brand of this.allVehBrands) {
            if (item.name == brand.name) {
              brand.isDisabled = true;
            }
          }
        }
      }
      if (
        this.postData.brands &&
        this.postData.brands.length &&
        this.brands &&
        this.brands.length
      ) {
        for (let item of this.postData.brands) {
          for (let brand of this.brands) {
            if (item.name == brand.name) {
              brand.isDisabled = true;
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.brand-vip-setting {
  text-align: left;
  padding: 0 100px 0 0;
  min-height: 500px;
  .brand-vip-setting-content {
    overflow: hidden;
    min-height: 800px;
    .table-content-left {
      margin-top: 30px;
      padding-left: 40px;
      width: 49%;
      float: left;
      position: relative;
      .left-ul {
        padding: 0;
        position: absolute;
        width: 27px;
        left: 0;
        li {
          a {
            text-align: center;
            cursor: pointer;
            display: inline-block;
            width: 27px;
            border: 1px solid #b5b5b5;
            height: auto;
            padding: 5px;
            word-break: break-all;
            background: #ffffff;
            color: #929292;
            &.active {
              border: none;
              color: #ffffff;
              background: #4f9bf4;
            }
          }
        }
      }
    }
    .table-content-priceLevel {
      float: right;
      width: 49%;
      margin-top: 30px;
      .base-table-info {
        margin-bottom: 20px;
        background: #ffffff;
      }
    }
  }
}
.title-each {
  margin-bottom: 10px;
  padding: 5px 15px;
  background: #f2f2f2;
  border-bottom-right-radius: 10px;
  float: left;
  color: #929292;
}
.con-input {
  display: inline-block;
  margin-right: 40px;
  margin-top: 20px;
  .title {
    width: 260px;
    display: inline-block;
    text-align: right;
    &.expire::before {
      content: "*";
      color: #e10000;
    }
  }
  /deep/.el-input,
  /deep/.el-select {
    width: 290px;
  }
  /deep/.el-input__inner,
  /deep/.el-select__inner {
    border: 1px solid #d7d6d6;
    border-radius: 2px;
  }
}
.con-input-info {
  margin-right: 0;
  .title {
    width: 90px;
  }
  /deep/.el-input,
  /deep/.el-select {
    width: 200px;
  }
}
.content {
  width: 100%;
  max-width: 100%;
}
.button-div {
  background: #ffffff;
  position: fixed;
  bottom: 0;
  padding: 0 60px 0 230px;
  width: 100%;
  left: 0;
  .save-button {
    float: right;
    padding: 5px 10px;
    margin: 10px 0;
    color: #ffffff;
  }
}
/deep/.el-table__header thead .cell,
/deep/.el-table__header thead .is-leaf
{
  background: #6589F8!important;
  color: #fff!important;
  text-align: center;
}
/deep/.el-table td, .el-table th {
  padding:6px 0;
  text-align: center;
}
.subPrice{
  box-sizing: border-box;
  margin-left: 45px;
  width: 94%!important;
  /deep/.el-table__header thead .cell,
  /deep/.el-table__header thead .is-leaf{
    background: #fff!important;
    color: #000!important;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }
}
</style>
