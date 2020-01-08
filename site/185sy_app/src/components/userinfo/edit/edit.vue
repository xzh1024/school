<template> <!--编辑资料-->
	<div class="edit">
    <div class="head border_eee">
      <div class="head_left">
        <i class="icon_left_black" @click="$router.go(-1);"></i>
      </div>
      <div class="head_center">
        编辑资料
      </div>
      <div class="head_right">
        <span @click="editDesc">保存</span>
      </div>
    </div>
    <div class="drive_main" v-if="JSON.stringify(userDesc) != '{}'">
      <div class="one" @click="setRename">
        <div class="one_l">昵称</div>
        <div class="one_c color_ababab small2" v-text="userDesc.nick_name">还是下雨</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="sexFlag = true">
        <div class="one_l">性别</div>
        <div class="one_c color_ababab small2">{{ userDesc.sex|F_sex }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="addressFlag = true">
        <div class="one_l">所在地</div>
        <div class="one_c color_ababab small2">{{ userDesc.address|F_address }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="descRight = '0'">
        <div class="one_l">简介</div>
        <div class="one_c color_ababab small2">{{ userDesc.desc|F_desc }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="openDatetime('picker1');">
        <div class="one_l">生日</div>
        <div class="one_c color_ababab small2">{{ userDesc.birth|F_birth }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="setQQ">
        <div class="one_l">QQ</div>
        <div class="one_c color_ababab small2">{{ userDesc.qq|F_qq }}</div>
        <div class="one_r"><i class="icon_right_black"></i></div>
      </div>
      <div class="one" @click="setEmail">
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
    <mt-popup
      v-model="sexFlag"
      position="bottom">
      <mt-picker :slots="sexSlots" :showToolbar="true" ref="sexPicker">
        <div class="toolbar">
          <div class="toolbar_l" @click.stop="sexFlag = false">取消</div>
          <div class="toolbar_r color_blue" @click.stop="sexConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup
      v-model="addressFlag"
      position="bottom">
      <div class="toolbar">
        <div class="toolbar_l" @click.stop="addressFlag = false">取消</div>
        <div class="toolbar_r color_blue" @click.stop="setAddress">确定</div>
      </div>
      <!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
      <mt-picker :slots="addressSlots" value-key="name" @change="onAddressChange" ref="addressPicker"></mt-picker>
    </mt-popup>
    <mt-datetime-picker
      ref="picker1"
      type="date"
      v-model="birthdayValue"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="setBirthday">
    </mt-datetime-picker>

    <!--<div class="desc" v-if="descFlag">-->
    <div class="desc" :style="{right:descRight}">
      <div class="head border_eee">
        <div class="head_left">
          <i class="icon_left_black" @click="descRight = '-100%';"></i>
        </div>
        <div class="head_center">
          编辑简介
        </div>
        <div class="head_right">
          <span @click="userDesc.desc = desc; editDescFlag = true; descRight = '-100%';">保存</span>
        </div>
      </div>
      <div class="desc_main">
        <div class="desc_textbox">
          <textarea maxlength="30" class="" v-model="desc"></textarea>
          <i class="icon_clear" v-show="desc" @click="desc=''"></i>
        </div>
        <div class="desc_warn color_black">
          <p class="flex1">编辑你的个性简介，不超过30个字</p>
          <p class="small2"><span v-text="desc.length"></span>/30</p>
        </div>
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
          editDescFlag: false,
//          userDescFlag: false,
          sexFlag: false,//性别
          sexSlots: [
            {
              flex: 1,
              values: ['男', '女', '其他'],
//              defaultIndex: 0,
            }
          ],
          addressFlag: false,//地址
          birthdayValue: new Date(),//生日初始值
          startDate: new Date('1900'),
          endDate: new Date('2100'),
          myAdress: null,//地址
          addressSlots: [
            {
              flex: 1,
              values: this.address,
              defaultIndex:0,
              className: 'slot1',
              textAlign: 'center'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: this.address[0].childs,
              defaultIndex:0,
              className: 'slot3',
              textAlign: 'center'
            }
//            , {
//              divider: true,
//              content: '-',
//              className: 'slot4'
//            }, {
//              flex: 1,
//              values: this.address[0].childs[0].childs,
//              defaultIndex:0,
//              className: 'slot5',
//              textAlign: 'center'
//            }
          ],
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
      this.$nextTick(function () {

      });
    },
    methods: {
      toast (msg) {
        var msg = msg || '提示';
        Toast({
          message: msg,
          duration: 2000,
          className: 'm_toast'
        });
      },
      //昵称
      setRename(){
        MessageBox.prompt('修改昵称', '',{inputPlaceholder: '请输入昵称'}).then(({ value, action }) => {
          this.userDesc.nick_name = value;
          this.editDescFlag = true;
        });
      },
      //性别
      sexConfirm () {
        let sex = this.$refs.sexPicker.getValues()[0];
        if(sex == '男'){
          this.userDesc.sex = 1;
        } else if (sex == '女'){
          this.userDesc.sex = 2;
        } else if (sex == '其他'){
          this.userDesc.sex = 3;
        } else {
          this.userDesc.sex = 0;
        }
        this.sexFlag = false;
        this.editDescFlag = true;
      },
      //地址
      onAddressChange(picker, values){
        if(!values[0]){
          this.$nextTick(()=>{
            if(this.myAdress){
              // 赋默认值
            }else{
              picker.setValues([this.address[0],this.address[0].childs[0]]);
            }
          });
        }else{
          picker.setSlotValues(1, values[0].childs);
          let town = [];
          if(values[1]){
            town = values[1].childs;
          }
          picker.setSlotValues(2,town);
        }
      },
      setAddress(){
//        let address = this.$refs.addressPicker.getValues()[0];
//        console.log(this.$refs.addressPicker.getValues()[0].name);
        this.userDesc.address = this.$refs.addressPicker.getValues()[0].name + '-' + this.$refs.addressPicker.getValues()[1].name;
        this.addressFlag = false;
        this.editDescFlag = true;
      },
      openDatetime(picker) {
        this.$refs[picker].open();//显示日期表
      },
      //生日
      setBirthday(value){
        this.userDesc.birth = this.myType.formatTimeD(Date.parse(value));
        this.editDescFlag = true;
//        console.log(this.userDesc.birth);
      },
      setQQ(){
        MessageBox.prompt('修改QQ号', '',{inputPlaceholder: '请输入QQ号'}).then(({ value, action }) => {
          this.userDesc.qq = value;
          this.editDescFlag = true;
        });
      },
      setEmail(){
        MessageBox.prompt('修改邮箱', '',{inputPlaceholder: '请输入邮箱'}).then(({ value, action }) => {
          this.userDesc.email = value;
          this.editDescFlag = true;
        });
      },
//      indicator (msg) {
//        var msg = msg || '加载中...';
//        Indicator.open({
//          text: msg,
//          spinnerType: 'fading-circle'
//        })
//      },
//      endIndicator () {
//        Indicator.close();
//      },
      //获取用户详情
      getUserDesc(){
        var url = this.jointUrl({
          uid: this.userInfo.id,
          visit_uid: this.userInfo.id,
          channel: this.myType.channel,
          field_type: 2 //1 精简版 2用户详情页版
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        var myUrl = this.jointUrl({
          uid: this.userInfo.id,
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
//              this.userDescFlag = true;
//              console.log(this.userDesc);
              //地址
              this.$nextTick(function () {
                //性别
                {
                  let sex = this.userDesc.sex;
                  if(sex == 1){
                    this.sexSlots[0].defaultIndex = 0;
                  } else if (sex == 2){
                    this.sexSlots[0].defaultIndex = 1;
                  } else if (sex == 3){
                    this.sexSlots[0].defaultIndex = 2;
                  }
                }
                //地址
                {
                  let address = this.userDesc.address;
                  let addressAll = this.address;
                  if(address){
                    let addressArr = address.split("-", 2);
//                  console.log(addressArr[0]);
//                  console.log(addressArr[1]);
                    for(let i=0,len=addressAll.length; i < len; i++){
                      if(addressArr[0] == addressAll[i].name){
                        this.addressSlots[0].defaultIndex = i;
                      }
                      for(let j=0,len=addressAll[i].childs.length; j < len; j++){
                        if(addressArr[1] == addressAll[i].childs[j].name){
                          this.addressSlots[2].defaultIndex = j;
                        }
                      }
                    }
                  }
                }
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
      //编辑用户信息
      editDesc () {
        if(this.editDescFlag){
          this.editDescFlag = false;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            nick_name: this.userDesc.nick_name,//用户昵称
            sex: this.userDesc.sex,//性别
            address: this.userDesc.address,//所在地
            desc: this.userDesc.desc,//简介
            birth: this.userDesc.birth,//生日
            qq: this.userDesc.qq,//qq
            email: this.userDesc.email//邮箱
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          var myUrl = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            nick_name: this.userDesc.nick_name,//用户昵称
            sex: this.userDesc.sex,//性别
            address: this.userDesc.address,//所在地
            desc: this.userDesc.desc,//简介
            birth: this.userDesc.birth,//生日
            qq: this.userDesc.qq,//qq
            email: this.userDesc.email,//邮箱
            sign: mySign
          });
          this.$http.post('/api/index.php?g=api&m=userbox&a=edit_desc',myUrl)
            .then(response => {
              var datas = response.data;
              if(datas.status == 1){//1成功
                this.toast(datas.msg);
//                this.getUserDesc();
                this.$router.push({path:'/user_info'});
              }
              if(datas.status == 0){//0失败
                console.log('请求失败：' + datas.msg);
              }
              this.editDescFlag = true;
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.toast('修改失败');
        }
      },
    },
    filters: {	//自定义局部过滤器
      F_sex: (data) => {
        let sex = '';
//        switch (data){
//          case 1:
//            sex = '男';
//            break;
//          case 2:
//            sex = '女';
//            break;
//          case 3:
//            sex = '其他';
//            break;
//          default:
//            sex = '';
//        }
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

