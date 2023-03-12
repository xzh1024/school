<template>
  <div class="gradeRights">
    <div v-if="data.isEditing"> 
      <div v-if="data.rights && data.rights.length" class="edit_rules">
        <template v-for="(item,index) in data.rights">
          <!-- 若当前用户非‘修理厂’则等级权益中隐藏项目和套餐权益 -->
          <p :key="index" class="rights_div" v-if="$store.state.base.companyType === 'garage' || item.type === 1">
            <span>
              <el-checkbox
                v-model="item.checked" @change="changeFn"></el-checkbox>
              <span 
                style="margin:0 8px;">
                {{renderTypeName(item)}}</span>
              <span v-if="item.type==1" 
                style="margin:0 8px;">享受价格类型</span>
              <el-select v-model="item.priceType" 
                v-if="item.type==1"
                size="mini" style="width:100px; margin:4px 8px;"
                placeholder="请选择" @change="changeFn">
                <el-option
                  v-for="item in priceTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.Code">
                </el-option>
              </el-select>
            </span>
            <span :style="{marginLeft:item.type==1?'90px':''}">
              <span>{{item.type==1?'配件折扣':item.type==2?'项目折扣':'套餐折扣'}}</span>
              <el-input 
                v-if="item.type!=0"
                v-model="item.value" 
                type="number" size="mini" 
                style="width:100px;margin:4px 8px;"
                :min='0' :max="10"
                @change="InputChange(item)"></el-input>
              折
            </span>
            
          </p>
        </template>
      </div>
    </div>
    <div v-else>
      <div v-if="data.rights && data.rights.length">
        <template v-for="(item,index) in data.rights">
          <p :key="index" v-if="item.checked">{{renderFn(item)}}</p>
        </template>
      </div>
      <div v-if="isEmpty" style="color:#999999">（空）</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'gradeRights',
  data(){
    return{
      data:{},
      priceTypeList:[//订货价类型
        {name:'零售价',Code:'retail'},
        {name:'平台价',Code:'alliance'},
        {name:'批发价',Code:'p'},
        {name:'批发价一',Code:'p1'},
        {name:'批发价二',Code:'p2'},
        {name:'批发价三',Code:'p3'},
        {name:'批发价四',Code:'p4'}
      ],
      isEmpty:false//等级权益为空
    }
  },
  props:{
    isEditing:Boolean,
    dataObj:Object
  },
  watch:{
    dataObj(){
      this.init();
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.data = this.dataObj;
      let flag = true;
      this.data.rights.forEach(p =>{
        if(p.checked){
          flag = false;
        }
      });
      if(flag){
        this.isEmpty = true;
      }
    },
    renderFn(item){
      let name_t = '';
      let priceType_t = '';
      let discount_n = '';
      // 若当前用户非‘修理厂’则等级权益中隐藏项目和套餐权益
      if(this.$store.state.base.companyType === 'garage') {
        if(item.type == 1){
          name_t = '配件权益：';
          discount_n = `配件折扣【${item.value}折】`;
          this.priceTypeList.forEach(p =>{
            if(item.priceType == p.Code){
              priceType_t += `享受价格类型【${p.name}】`;
            }
          })
        }else if(item.type == 2){
          name_t = '项目权益：';
          priceType_t = '';
          discount_n = `项目折扣【${item.value}折】`;
        }else if(item.type == 3){
          name_t = '套餐权益：';
          priceType_t = '';
          discount_n = `套餐折扣【${item.value}折】`;
        }
      } else {
        if(item.type == 1){
          name_t = '配件权益：';
          discount_n = `配件折扣【${item.value}折】`;
          this.priceTypeList.forEach(p =>{
            if(item.priceType == p.Code){
              priceType_t += `享受价格类型【${p.name}】`;
            }
          })
        }
      }
      
      return name_t + priceType_t + discount_n;
    },
    renderTypeName(item){
      let name_t = '';
      if(item.type == 1){
        name_t = '零配件权益';
      }else if(item.type == 2){
        name_t = '项目权益';
      }else if(item.type == 3){
        name_t = '套餐权益';
      }
      return name_t;
    },
    changeFn(){
      this.$emit("change",this.data);
    },
    InputChange(item){
      if(item.value && Number(item.value || 0) < 0){
        item.value = '0';
      }else if(item.value && Number(item.value || 10) > 10){
        item.value = '10';
      }
      if(item.value ){
        item.value  =  Number(item.value ).toFixed(2);
      }
      this.$forceUpdate();
      this.$emit("change",this.data);
    }
  }
}
</script>

<style lang="less" scoped>
.gradeRights{
  text-align: left;
  .edit_rules{
    .rights_div{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    /deep/input::-webkit-outer-spin-button,
    /deep/input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }
 
}
</style>