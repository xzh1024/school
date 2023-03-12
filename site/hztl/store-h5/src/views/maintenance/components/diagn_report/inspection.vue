<template>
  <div class="inspection_div">
    <div class="card2">
      <div class="title flex_r">
        <span>{{listObj.name}}</span>
        <span class="num">（共{{listObj.children.length}}项）</span>
        <i :class="['iconfont', 'size_14',
          inspectionShow?'icon-direction_up' :'icon-direction_down']"
          @click="openProFn('inspectionShow')"></i>
      </div>
      <div class="content" v-show="inspectionShow">
        <template v-if="listObj.children">
          <div class="c_box" 
            v-for="(item,index) in listObj.children" :key="index">
            <div class="c_title flex_r">
              <span class="dot"></span>
              <span>{{item.name}}</span>
            </div>
            <template v-if="item.itemList">
              <div class="c_cont_2 border"
                v-for="(item2,index2) in item.itemList" :key="index2">
                <div class="cont_2_t">
                  {{item2.name}}
                  <span class="color_9">（{{item2.description}}）</span>
                </div>
                <!-- <div class="cont_2_desic">{{item2.description}}</div> -->
                <div>
                  <span class="color_9">检测结果：</span>
                  <span >
                    <template v-for="(item3,i) in item2.options">
                      <span class="btn"  :key="i" 
                        v-if="item2.result.optionResult[item3]">{{item3}}</span>
                    </template>
                    <span class="color_r" 
                      v-if="item2.flags.clickInput != 1 && item2.value">
                      {{item2.value}}{{item2.unit}}
                    </span>
                  </span>
                  
                </div>
                <div class="flex_r" style="align-items:flex-start;" v-if="item2.flags.enableRemark">
                  <span class="color_9" style="flex:none;">检测备注：</span>
                  <span class="remark" >{{item2.checkRemark }}</span>
                </div>
              </div>
            </template>
          </div>
        </template>
        <!-- <div class="c_box">
          <div class="c_title flex_r">
            <span class="dot"></span>
            <span>轮胎外观</span>
          </div>
          <div class="c_cont_2 border">
            <div class="cont_2_t">破损、龟裂、鼓包：</div>
            <div class="cont_2_desic">用于检测轮胎外观破损情况项目</div>
            <div class="">
              <span class="color_9">检测结果：</span>
              <span class="btn"></span>
            </div>
            <div class="flex_r" style="align-items:flex-start;">
              <span class="color_9" style="flex:none;">检测备注：</span>
              <span class="remark">左前轮与右后轮胎压过高，需要调教，另外电子仪表盘不显示胎压Bar数值显示异常</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:"inspection",
  data(){
    return{
      inspectionShow:true,//显示/隐藏
    }
  },
  props:{
    listObj:Object
  },
  methods:{
    openProFn(name){
      this[name] = !this[name];
    }
  }
}
</script>

<style lang="less" scoped>
.inspection_div{
  .card2{
    margin: 8px 12px;
    border-radius: 8px;
    background-color: #ffffff;
    padding:12px;
    color:#333333;
    text-align: left;
    font-size: 14px;
    .title{
      height: 22px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      font-weight: 500;
      i{
        margin-left: 4px;
      }
      .num{
        font-size: 14px;
        font-weight: 400;
      }
    }
    .content{
      .c_box{
        margin:12px 0 24px;
        .c_img{
          justify-content: center;
          img{
            width: 216.5px;
            height: 434px;
            background: #FFB12D;
            
          }
        }
      }
      .c_title{
        font-weight: 500;
        margin-bottom:12px;
        .dot{
          width: 6px;
          height:6px;
          margin-right: 4px;
          border-radius: 50%;
          background: #FF6E4C;
          display: inline-block;
        }
      }
      .c_content{
        font-weight: 400;
        div{
          margin-bottom: 2px;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
      .c_cont_2{
        font-weight: 400;
        padding:0 8px;
        font-size: 13px;
        margin-bottom:8px;
        .cont_2_t{
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          margin: 12px 0 4px;
        }
        .cont_2_desic{
          font-size: 12px;
          color: #999999;
          margin: 4px 0 12px;
        }
        div{
          margin: 12px 0;
        }
        .btn{
          display: inline-block;
          padding: 4px 12px;
          margin-right: 8px;
          color:#ffffff;
          background: #FF6E4C ;
          border-radius: 20px;
        }
      }
    }
    .border_btm{
      border-bottom: 1px solid  #E6E6E6;
    }
    .border{
      border: 1px solid #999999;
      border-radius: 4px;
    }
    .foot{
      margin-top: 12px;
      justify-content: space-between;
      .c_btn{
        width: auto;
      }
    }
  }
  .flex_r{
    display: flex;
    align-items: center;
  }
  .mgn_t_b_8{
    margin:8px 0;
  }
  .color_9{
    color: #999999;
  }
  .color_r{
    color: #FF6E4C;
  }
  .size_13{
    font-size: 13px;
  }
}
</style>