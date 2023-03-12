<template>
  <div class="gradeRules">
    <div v-if="data.isEditing"> 
      <div v-if="data.rules" class="edit_rules">
        <p>
          <el-radio-group v-model="data.rules.condType" @change="radioChangeFn">
            <el-radio :label="1" style="margin-right:16px;">满足勾选的任一条件</el-radio>
            <el-radio :label="2" style="margin-right:16px;">满足勾选的全部条件</el-radio>
            <el-radio :label="3" v-if="!isNoway">无门槛</el-radio>
          </el-radio-group>
        </p>
        <template v-for="(item,index) in data.rules.details">
          <p :key="index" >
            <el-checkbox
              v-model="item.checked" :disabled="checkboxDisabled"
              @change="val=>checkboxChangeFn(val,item)"></el-checkbox>
            <el-select 
              :disabled="checkboxDisabled"
              v-model="item.period" 
              v-if="item.type!=0"
              size="mini" style="width:100px; margin:4px 8px;"
              placeholder="请选择" @change="changeFn">
              <el-option
                v-for="item in timeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span 
              style="margin-right:10px;" 
              :style="{marginLeft:item.type==0?'8px':''}">
              {{renderTypeName(item)}}</span>
            <el-input 
              :disabled="checkboxDisabled"
              v-if="item.type!=0"
              v-model="item.value" 
              type="number" size="mini" 
              style="width:100px;"
              :min='0'
              @change="InputChange(item)"></el-input>
            {{item.type==2?'笔':item.type==0?'':'元'}}
          </p>
        </template>
      </div>
    </div>
    <div v-else>
      <div v-if="data.rules">
        <p>{{data.rules.condType == 1 ? "满足以下任一条件" : data.rules.condType == 2 ?"满足以下全部条件":"无门槛"}}</p>
        <template v-for="(item,index) in data.rules.details">
          <p :key="index" v-if="item.checked">{{renderFn(item)}}</p>
        </template>
      </div>
      <div v-if="isEmpty" >无门槛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'gradeRules',
  data(){
    return{
      data:{},
      details:[],
      timeList:[
        {label:'历史累计',value:1},
        {label:'近1年',value:2},
        {label:'近3月',value:3},
        {label:'近1月',value:4},
        {label:'近7天',value:5},
        {label:'近1天',value:6},
      ],
      checkboxDisabled:false,
      isEmpty:false//等级规则是否为空
    }
  },
  props:{
    isEditing:Boolean,
    isNoway:Boolean,
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
      if(this.isNoway){
        this.checkboxDisabled = false;
      }
      // if(this.data.rules.condType == 0){
      //   let flag = true;
      //   let rulesDetail = this.data.rules.details;
      //   rulesDetail.forEach(p =>{
      //     if(p.checked){
      //       flag = false;
      //     }
      //   });
      //   if(flag){
      //     this.isEmpty = true;
      //   }
      // }
    },
    renderFn(item){
      let time_t = '';
      let name_t = '';
      let value_t = '';
      let unit_t = '';
      
      if(item.period == 1){
        time_t = '历史累计';
      }else if(item.period == 2){
        time_t = '近1年';
      }else if(item.period == 3){
        time_t = '近3月';
      }else if(item.period == 4){
        time_t = '近1月';
      }else if(item.period == 5){
        time_t = '近7天';
      }else if(item.period == 6){
        time_t = '近1天';
      }
      value_t = item.value;
      if(item.type == 0){
        time_t = '';
        name_t = '无门槛';
        value_t = '';
        unit_t = '';
      }else if(item.type == 1){
        name_t = '购买金额达';
        unit_t = '元';
      }else if(item.type == 2){
        name_t = '消费次数达';
        unit_t = '笔';
      }else if(item.type == 3){
        name_t = '回款金额达';
        unit_t = '元';
      }else if(item.type == 4){
        name_t = '充值金额达';
        unit_t = '元';
      }
      return time_t + name_t + value_t + unit_t;
    },
    renderTypeName(item){
      let name_t = '';
      if(item.type == 0){
        name_t = '无门槛';
      }else if(item.type == 1){
        name_t = '购买金额达';
      }else if(item.type == 2){
        name_t = '消费次数达';
      }else if(item.type == 3){
        name_t = '回款金额达';
      }else if(item.type == 4){
        name_t = '充值金额达';
      }
      return name_t;
    },
    radioChangeFn(val){
      if(val == 3){
        this.data.rules.details.forEach( p=>{
          if(p.type){
            p.checked = false;
            // p.value = "";
          }
        })
        this.checkboxDisabled = true;
      }else{
        this.checkboxDisabled = false;
      }
      this.changeFn();
    },
    checkboxChangeFn(val,item){
      // if(item.type==0){
      //   this.data.rules.details.forEach( p=>{
      //     if(p.type){
      //       p.checked = false;
      //     }
      //   })
      // }else{
      //   if(val){
      //     this.data.rules.details[0].checked = false;
      //   }
      // }
      this.changeFn();
    },
    changeFn(){
      this.$emit("change",this.data);
    },
    InputChange(item){
      if(item.value && Number(item.value || 0) < 0){
        item.value = '0';
      }
      // else if(item.value && Number(item.value || 10) > 10){
      //   item.value = '10';
      // }
      if(item.value && item.type != 2){
        item.value  =  Number(item.value ).toFixed(2);
      }
      if(item.value && item.type == 2){
        item.value  =  Number(item.value ).toFixed(0);
      }
      this.$forceUpdate();
      this.$emit("change",this.data);
    }
  }
}
</script>

<style lang="less" scoped>
.gradeRules{
  text-align: left;
  .edit_rules{
    /deep/input::-webkit-outer-spin-button,
    /deep/input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }
 
}
</style>