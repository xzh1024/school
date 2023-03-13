<template>
  <div class="edit-or-add-address">
    <div class="head-brand">
      <span class="backToHome" @click="backHome()"></span>
      <span class="word">编辑地址</span>
    </div>
    <div class="content">
      <div class="reciver">
        <span class="icon"></span>
        <span class="title">收货人：</span>
        <input type="text" v-model="Receiver" placeholder="请输入收货人" />
      </div>
      <div class="person-phone">
        <span class="icon"></span>
        <span class="title">联系电话：</span>
        <input type="text" v-model="Phone" placeholder="请输入联系电话" />
      </div>
      <div class="area">
        <span class="icon"></span>
        <span class="title">所在地区：</span>
        <span class="chose-area-click">{{ area ? area : '请选择地区' }}</span>
        <span class="to-chose-address"></span>
      </div>
      <div class="area-detail">
        <span class="icon"></span>
        <span class="title">详细地址：</span>
        <textarea
          class="area-textarea"
          name="Address"
          cols="30"
          rows="2"
          v-model="Address"
          placeholder="请输入详细地址"
        ></textarea>
      </div>
      <div class="defalut-address">
        <span class="title">设置默认地址</span>
        <van-switch
          v-model="isDefault"
          size="0.347rem"
          class="checked-default"
        />
      </div>
      <button type="button" @click="saveAddress()">保存</button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { DropdownMenu, DropdownItem, Switch, Toast } from 'vant';
import PickerExtend from 'picker-extend';
Vue.use(DropdownMenu)
  .use(DropdownItem)
  .use(Switch)
  .use(Toast);
import request from '@/request';

export default {
  name: 'upsertAddress',
  data() {
    return {
      id: '',
      Receiver: '',
      Phone: '',
      Address: '',
      isDefault: false,
      addressList: [{ data: [] }],
      addressPosition: [0, 0, 0],
      addressListSelect: [],
      area: '',
    };
  },
  mounted: function() {
    if (window.location.href.indexOf('?') == -1) {
      this.getAddressAll();
    } else {
      let id = window.location.href.split('?')[1];
      this.id = id;
      this.getAddressDetail(this.id);
    }
  },
  methods: {
    getAddressDetail(id) {
      //获取地址详情
      request({
        url: '/addresses/' + id,
      }).then(res => {
        this.Receiver = res.receiver;
        this.Phone = res.phone;
        this.Address = res.address;
        this.area = res.areaNames.join(' ');
        this.isDefault = res.isDefault;
        for (let index in res.areaIds) {
          this.addressListSelect.push({
            id: res.areaIds[index],
            value: res.areaNames[index],
          });
        }
        this.getAddressAll(res.areaIds);
      });
    },
    getAddressAll(areaIds) {
      request({
        url: '/areas',
      }).then(res => {
        this.injectAddressList(res, areaIds);
      });
    },
    injectAddressList(list, areaIds) {
      //拼接省数据入
      for (let item of list) {
        if (item.type == 2) {
          this.addressList[0].data.push({
            id: item.id,
            value: item.name,
            childs: [],
          });
        }
      }
      //省拼接好后循环拼接省对应的市
      for (let item of list) {
        for (let province of this.addressList[0].data) {
          if (item.parenId == province.id) {
            province.childs.push({
              id: item.id,
              value: item.name,
              childs: [],
            });
          }
        }
      }
      //最后拼接所有市对应的县或者区
      for (let item of list) {
        for (let province of this.addressList[0].data) {
          for (let city of province.childs) {
            if (item.parenId == city.id) {
              city.childs.push({
                id: item.id,
                value: item.name,
              });
            }
          }
        }
      }
      if (areaIds) {
        this.getAddressPosition(areaIds);
      } else {
        this.setAddressSelect();
      }
    },
    getAddressPosition(areaIds) {
      //三次循环匹配需要的position
      for (let provinceIndex in this.addressList[0].data) {
        //判断省的位置，注入position
        if (areaIds[0] == this.addressList[0].data[provinceIndex].id) {
          this.addressPosition[0] = provinceIndex;
          for (let cityIndex in this.addressList[0].data[provinceIndex]
            .childs) {
            //判断市的位置，注入position
            if (
              areaIds[1] ==
              this.addressList[0].data[provinceIndex].childs[cityIndex].id
            ) {
              this.addressPosition[1] = cityIndex;
              for (let countryIndex in this.addressList[0].data[provinceIndex]
                .childs[cityIndex].childs) {
                if (
                  areaIds[2] ==
                  this.addressList[0].data[provinceIndex].childs[cityIndex]
                    .childs[countryIndex].id
                ) {
                  this.addressPosition[2] = countryIndex;
                }
              }
            }
          }
        }
      }
      //遍历完之后，注入
      this.setAddressSelect();
    },
    setAddressSelect() {
      let that = this;
      let mobileSelect4 = new PickerExtend({
        trigger: '.chose-area-click',
        title: '选择地址',
        wheels: this.addressList,
        position: this.addressPosition,
        callback: function(indexArr, data) {
          that.addressListSelect = data;
        },
      });
    },
    backHome() {
      this.historyBack(-1);
    },
    saveAddress() {
      let postURL = '/addresses';
      if (this.id) {
        postURL = postURL + '/' + this.id;
      }
      const len = this.addressListSelect.length;
      if (len < 2) {
        Toast.fail('请选择所在地区');
        return false;
      }
      let postData = {
        AreaId: this.addressListSelect[len - 1].id, //这里需要换成后来的数据
        Address: this.Address,
        isDefault: this.isDefault,
        Receiver: this.Receiver,
        Phone: this.Phone,
      };
      request({
        method: 'post',
        url: postURL,
        data: postData,
      })
        .then(() => {
          if (this.id) {
            Toast.success('修改地址成功');
          } else {
            Toast.success('新建地址成功');
          }
          setTimeout(() => {
            this.backHome();
          }, 1000);
        })
        .catch(err => {
          if (err && err.message) {
            Toast.success(err.message);
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
.edit-or-add-address {
  background: #ffffff;
  .content {
    box-sizing: border-box;
    padding: 44px 16px 0;
    font-size: 14px;
    div {
      border-bottom: 1px solid #edeff1;
      .icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin: 17px 6px 0 0;
      }
      span {
        float: left;
      }
      input {
        float: left;
        margin-top: 16px;
        color: #171c24;
        letter-spacing: -0.34px;
        height: 20px;
        padding: 0;
        border: 0;
        width: 200px;
      }
      // textarea{
      //   float: left;
      //   width:200px;
      //   margin-top: 14px;
      //   color: #171C24;
      //   letter-spacing: -0.34px;
      //   height: 52px;
      //   padding: 0;
      //   border: 0;
      //   resize: none;
      // }
      .title {
        color: #777b87;
        line-height: 52px;
      }
    }
    .reciver {
      height: 52px;
      .icon {
        background-image: url('../../../assets/reciver-icon.png');
        background-size: 100% 100%;
      }
    }
    .person-phone {
      height: 52px;
      .icon {
        background-image: url('../../../assets/reciver-phone-icon.png');
        background-size: 100% 100%;
      }
    }
    .area {
      height: 52px;
      position: relative;
      .icon {
        background-image: url('../../../assets/address-icon.png');
        background-size: 100% 100%;
      }
      .chose-area-click {
        padding-left: 5px;
        margin-top: 16px;
        width: 240px;
        text-align: left;
        position: relative;
        z-index: 2;
      }
      .to-chose-address {
        position: absolute;
        width: 28px;
        height: 28px;
        background-image: url('../../../assets/address-edit.png');
        background-size: 100% 100%;
        cursor: pointer;
        right: 0;
        top: 12px;
        z-index: 0;
      }
    }
    .area-detail {
      height: 104px;
      .icon {
        background-image: url('../../../assets/address-detail-icon.png');
        background-size: 100% 100%;
      }
      .area-textarea {
        line-height: 24px;
        float: left;
        margin-top: 14px;
        color: #171c24;
        height: 76px;
        padding: 0;
        border: 0;
        resize: none;
        &::-webkit-input-placeholder {
          line-height: 24px;
        }
        &:-ms-input-placeholder {
          line-height: 24px;
        }
        &::placeholder {
          line-height: 24px;
        }
      }
    }
    .defalut-address {
      height: 52px;
      .checked-default {
        float: right;
        margin-top: 16px;
      }
    }
    button {
      // width: 343px;
      width: 100%;
      height: 48px;
      background: #00a8ea;
      border-radius: 8px;
      border: 0;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: -0.38px;
      margin-top: 16px;
    }
  }
}
/deep/ .van-switch__node {
  top: -1px;
}
.popup {
  width: 100%;
  height: 110px;
  background: #ffffff;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;
  .pop-head {
    height: 35px;
    margin: 0 8px;
    a {
      line-height: 35px;
      color: #00a8ea;
      font-size: 16px;
    }
    a:first-child {
      float: left;
    }
    a:last-child {
      float: right;
    }
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  z-index: 2;
}
</style>
