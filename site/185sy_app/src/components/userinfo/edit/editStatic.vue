<template> <!--编辑资料-->
	<div class="edit">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        司机资料
      </div>
      <div class="head_right"></div>
    </div>
    <div class="drive_main" v-if="JSON.stringify(userDesc) != '{}'">
      <div class="one">
        <div class="one_l">昵称</div>
        <div class="one_c color_ababab small2" v-text="userDesc.nick_name">还是下雨</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">性别</div>
        <div class="one_c color_ababab small2">{{ userDesc.sex|F_sex }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">所在地</div>
        <div class="one_c color_ababab small2">{{ userDesc.address|F_address }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="descRight = '0'">
        <div class="one_l">简介</div>
        <div class="one_c color_ababab small2">{{ userDesc.desc|F_desc }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">生日</div>
        <div class="one_c color_ababab small2">{{ userDesc.birth|F_birth }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">QQ</div>
        <div class="one_c color_ababab small2">{{ userDesc.qq|F_qq }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">邮箱</div>
        <div class="one_c color_ababab small2">{{ userDesc.email|F_email }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one">
        <div class="one_l">注册时间</div>
        <div class="one_c color_ababab small2" v-text="userDesc.reg_time"></div>
        <!--<div class="one_r"><i class="icon_right_black"></i></div>-->
      </div>
    </div>

    <!--<div class="desc" v-if="descFlag">-->
    <div class="desc" :style="{right:descRight}">
      <div class="head border_eee">
        <div class="head_left">
          <i class="icon_left_black" @click="descRight = '-100%';"></i>
        </div>
        <div class="head_center">
          司机简介
        </div>
        <div class="head_right">
          <!--<span @click="userDesc.desc = desc; editDescFlag = true; descRight = '-100%';">保存</span>-->
        </div>
      </div>
      <div class="desc_main">
        <div class="desc_textbox">
          <textarea maxlength="30"  readonly="readonly" placeholder="暂时没有简介" v-model="desc"></textarea>
          <i class="icon_clear" v-show="desc" @click="desc=''"></i>
        </div>
        <!--<div class="desc_warn color_black">-->
          <!--<p class="flex1">编辑你的个性简介，不超过30个字</p>-->
          <!--<p class="small2"><span v-text="desc.length"></span>/30</p>-->
        <!--</div>-->
      </div>
    </div>

	</div>
</template>

<script>
  import { Toast, MessageBox, Picker, DatetimePicker } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
    data: function () {
        return {
          user: {
            icon_url: "",
            nick_name: "",
            username: "",
            user_id: 0
          },
          userDesc:{},//用户信息
          descFlag: false,
          descRight: '-100%',
          desc: '',
        }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created(){
      this.getUserDesc();
    },
    mounted(){
      console.log(this.$route.params.id)

    },
    methods: {
      //获取用户详情
      getUserDesc(){
        var url = this.jointUrl({
          uid: this.$route.params.id,
          visit_uid: this.userInfo.id,
          channel: this.myType.channel,
          field_type: 2 //1 精简版 2用户详情页版
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.$route.params.id,
          visit_uid: this.userInfo.id,
          channel: this.myType.channel,
          field_type: 2,
          sign: mySign
        });
        this.$http.post('/api/index.php?g=api&m=userbox&a=user_desc',myUrl)
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              datas.data.reg_time = this.myType.formatTimeM(datas.data.reg_time);
              this.userDesc = datas.data;
              console.log(this.userDesc);
              this.$nextTick(function () {
                this.desc = this.userDesc.desc;//简介
              });
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
    },
    filters: {	//自定义局部过滤器
      F_sex: (data) => {
        let sex = '';
        if(data == 1){
          sex = '男';
        } else if(data == 2){
          sex = '女';
        } else if(data == 3){
          sex = '其他';
        } else {
          sex = '未设置';
        }
        return sex
      },
      F_address: (address) => {
        return address || '选择你的地区'
      },
      F_desc: (desc) => {
        return desc || '编辑你的简介'
      },
      F_birth: (birth) => {
        return birth || '选择你的生日'
      },
      F_qq: (qq) => {
        return qq || '输入你的QQ'
      },
      F_email: (email) => {
        return email || '输入你的邮箱'
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .edit{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .drive_main{
      width: 100%;
      flex: 1;
      .one{
        height: 3rem;
        line-height: 3rem;
        overflow: hidden;
        padding: 0 .6rem;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        .one_l{
          /*flex: 1;*/
        }
        .one_c{
          margin-left: .5rem;
          height: 100%;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: right;
        }
        .one_r{
          width: 1.8rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
    .toolbar{
      height: 2.8rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dddddd;
      .toolbar_l,.toolbar_r{
        height: 100%;
        line-height: 2.8rem;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .toolbar_r{
        border-left: 1px solid #dddddd;
      }
    }
  }
  /*编辑简介*/
  .desc{
    position: fixed;
    top: 0;
    /*right: -100%;*/
    width: 100%;
    height: 100%;
    background: #ffffff;
    will-change: transform;
    transition: all 500ms;
    display: flex;
    flex-direction: column;
    .desc_main{
      flex: 1;
      overflow-y: auto;
      .desc_textbox{
        width: 90%;
        /*height: 6rem;*/
        margin: 1.5rem 5% 0;
        border: 1px solid #dddddd;
        border-radius: .3rem;
        display: flex;
        align-items: center;
        textarea{
          flex: 1;
          height: 6rem;
          margin: .5rem 0 .5rem .5rem;
          border: none;
        }
      }
      .desc_warn{
        width: 88%;
        margin: .5rem 6% 0;
        line-height: 1rem;
        display: flex;
        align-items: center;
      }
    }
  }
</style>

