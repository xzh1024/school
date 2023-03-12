<template>
  <div class="acountSell">
    <van-nav-bar title="" left-text="" right-text="" @click-left="onClickLeft">
      <img src="../../assets/back-icon.png" slot="left" class="Back" />
    </van-nav-bar>
    <van-cell-group>
      <van-cell>
        <template slot="icon">
          <img
            src="../../assets/icon-company.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业名称：</span>
          <input
            id="CompanyName"
            class="cell-input width-230"
            v-model="formData.name"
          />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../assets/icon-comcode.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">统一社会信用代码：</span>
          <input
            class="cell-input width-180"
            maxlength="18"
            v-model="formData.bizLicenceCode"
          />
        </template>
      </van-cell>
      <van-cell is-link @click="showTypeup">
        <template slot="icon">
          <img
            src="../../assets/icon-comtype.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业类型：</span>
          <input
            class="cell-input width-210"
            readonly
            v-model="formData.type"
          />
        </template>
        <template slot="right-icon">
          <img src="../../assets/enter@3x.png" class="my-enter" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../assets/icon-address.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">所在地区：</span>
          <input
            class="cell-input width-210"
            readonly
            v-model="formData.areaName"
          />
        </template>
        <template slot="right-icon">
          <img
            src="../../assets/enter@3x.png"
            id="areaName1"
            class="my-enter"
          />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../assets/icon-detailAddress.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">详细地址：</span>
          <input class="cell-input width-230" v-model="formData.address" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../assets/icon-reciver.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">联系人：</span>
          <input class="cell-input width-240" v-model="formData.contacts" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img src="../../assets/icon-tel.png" class="my-mes-icon icon-18" />
        </template>
        <template slot="title">
          <span class="cell-title">联系电话：</span>
          <input class="cell-input width-230" v-model="formData.phone" />
        </template>
      </van-cell>
      <!-- <van-cell is-link @click="selectBrand">
                    <template slot="icon" >
                        <img src="../../assets/brand-manage.png" class="my-mes-icon icon-18">
                    </template>
                    <template slot="title">
                        <span class="cell-title">品牌：</span>
                        <input class="cell-input width-240" v-model="formData.subscribeVehBrands">
                    </template>
                    <template slot="right-icon">
                        <img src="../../assets/enter@3x.png" class="my-enter">
                        </template>
                </van-cell> -->
      <van-cell @click="showImgActionSheet(1)" v-if="!isGarage">
        <template slot="icon">
          <img
            src="../../assets/icon-paymentCodePic.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">收款信息</span>
        </template>
        <template slot="right-icon">
          <img
            src="../../assets/enter@3x.png"
            class="my-enter"
          />
        </template>
      </van-cell>
      <van-cell @click="showImgActionSheet(2)" v-if="!isGarage">
        <template slot="icon">
          <img
            src="../../assets/icon-businessCard.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业名片</span>
        </template>
        <template slot="right-icon">
          <img
            src="../../assets/enter@3x.png"
            @click="upLoad('businessCard')"
            class="my-enter"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <!-- <div class="msg-title">
                <span class="msg-error">抱歉，该公司名称已被注册，您可以点击确认注册为个人用户并联系公司管理员添加您为员工</span>
            </div> -->
    <div class="Tobutton" @click="checkCompany">保存</div>
    <van-action-sheet
      v-model="showType"
      :actions="actions"
      @select="onSelect"
    />

    <van-action-sheet
      class="enterprises-card"
      v-model="imgActionSheetVisible"
      :title="imageType === 1 ? '收款信息' : '企业名片'"
    >
      <div class="enterprises-card-content">
        <div class="provider-pic" v-if="imageType === 1">
          <img :src="codeImage.readerUrl" />
          <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <div class="provider-pic-bottom">
              <span class="upload-btn">{{ codeImage.readerUrl == defaultUrl ? "上传图片" : "重新上传" }}</span>
            </div>
          </van-uploader>
        </div>
        <div class="provider-pic" v-if="imageType === 2">
          <img :src="cardImage.readerUrl" />
          <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <div class="provider-pic-bottom">
              <span class="upload-btn">{{ cardImage.readerUrl == defaultUrl ? "上传图片" : "重新上传" }}</span>
            </div>
          </van-uploader>
        </div>
      </div>
    </van-action-sheet>
    <van-overlay z-index="3000" class-name="overlay-upload" :show="uploadLoading">
      <van-loading size="24px">图片上传中...</van-loading>
    </van-overlay>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  NavBar,
  Popup,
  Area,
  ActionSheet,
  Uploader,
  Overlay,
  Loading,
  Toast
} from "vant";
import { getAddressList, getPositionAreaById } from "../../common/splicingData";
import { GetQueryString } from "../../request/http";
import request from "@/request";
import defaultUrl from "@/assets/payment-default.png";
import { uploadImgFile } from "@/api/common";
import PickerExtend from "picker-extend";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Popup)
  .use(Area)
  .use(Uploader)
  .use(Overlay)
  .use(Loading)
  .use(ActionSheet)
  
  .use(Toast);
export default {
  name: "acountSell",
  data() {
    return {
      show: false,
      showType: false,
      // disable: false,
      actions: [
        { name: "汽修厂", value: "garage" },
        { name: "经销商", value: "dealer" },
        { name: "生产厂家", value: "manufacturer" }
      ],
      areaId: undefined,
      type: "",
      formData: {
        name: "",
        bizLicenceCode: "",
        type: "",
        contacts: "",
        phone: "",
        areaName: "",
        address: "",
        areaId: "",
        subscribeVehBrands: ""
      },
      id: "",

      imgActionSheetVisible: false,
      codeImage: {
        url: defaultUrl,
        readerUrl: defaultUrl
      },
      cardImage: {
        url: defaultUrl,
        readerUrl: defaultUrl
      },
      uploadLoading: false,
      defaultUrl: defaultUrl,
      imageType: 0 // 1:收款信息 2:企业名片
    };
  },
  computed: {
    isGarage() {
      return this.$store.state.storeInfo.type === "汽修厂";
    }
  },
  beforeRouteEnter(to, from, next) {
    //路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
    to.meta["fromPath"] = from.path;
    if (from.path == "/index") {
      to.meta["needFresh"] = true;
    } else {
      to.meta["needFresh"] = false;
    }
    next();
  },
  activated() {
    //此方法在页面缓存时会被调用，根据路由元信息决定是否重新加载数据。不加载则是上次填写完的数据
    if (this.$route.meta["needFresh"]) {
      this.load();
    } else {
      if (this.$route.params.subscribeVehBrands) {
        this.formData.subscribeVehBrands = this.$route.params.subscribeVehBrands.join(
          ","
        );
        this.$forceUpdate();
      }
    }
  },
  created() {
    this.load();
  },
  mounted() {
    let addressListAll = getAddressList();
    let position = [0, 0, 0];
    if (this.formData.areaId) {
      position = getPositionAreaById(this.formData.areaId, addressListAll[0].data);
    }
    let _this = this;
    let mobileSelect4 = new PickerExtend({
      trigger: "#areaName1",
      title: "选择地址",
      wheels: addressListAll,
      position: position,
      callback: function(indexArr, data) {
        const len = data.length;
        if(len) {
          _this.formData.areaName = "";
          data.forEach((item, index) => {
            _this.formData.areaName += item.value;
            if(index === len - 1) {
              _this.areaId = Number(item.id);
            }
          })
        }
        _this.$forceUpdate();
      }
    });
  },
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    load: function() {
      this.formData = [];
      this.id = GetQueryString("id");
    },
    upLoad(type) {
      this.$router.push("picCard?type=" + type + "&id=" + this.formData.id);
    },
    checkCompany: function() {
      if(!this.formData.name) {
        Toast.fail("企业名称不能为空");
        return;
      }
      request({
        url: "/companies/check-name",
        params: {
          name: this.formData.name
        }
      }).then(() => {
        this.save();
      })
      .catch(err => {
        this.disable = true;
        if (err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    selectBrand: function() {
      this.$router.push({ name: "brandManageAdd", params: { isSell: true } });
    },
    save: function() {
      let arry = [];
      if (
        this.formData.subscribeVehBrands &&
        this.formData.subscribeVehBrands.indexOf(",") > -1
      ) {
        arry = this.formData.subscribeVehBrands.split(",");
      }
      let _this = this;
      let param = {
        registerCompany: true,
        companyName: _this.formData.name, // 公司名称
        bizLicenceCode: _this.formData.bizLicenceCode, // 社会统一信用代码，注册公司时传
        companyType: _this.type, // 公司类型code
        companyAreaId: _this.areaId, // 公司所在地区ID（县级）
        address: _this.formData.address, // 所属地区，注册公司时传
        phone1: _this.formData.phone, // 公司主要联系电话，注册公司时传
        contacts1: _this.formData.contacts, // 公司主要联系人，注册公司时传
        vehBrands: arry, // 订阅的汽车品牌数组
        paymentCode: this.codeImage.url === this.defaultUrl ? "" : this.codeImage.url,
        businessCard: this.cardImage.url === this.defaultUrl ? "" : this.cardImage.url,
        offiAccount: true
      };
      request({
        method: "put",
        url: "/for-mall",
        data: param
      })
        .then(res => {
          if (res.bizCode && res.bizCode.repeat) {
            let managerPhone = res.bizCode.managerPhone;
            let repeatCompanyName = res.bizCode.repeatCompanyName;
            _this.$router.push({
              name: "Managementverification",
              params: {
                param: param,
                repeatCompanyName: repeatCompanyName,
                managerPhone: managerPhone,
                isSell: true
              }
            });
          } else {
            Toast.success("注册成功！");
            if (localStorage.getItem("remenberUrl")) {
              this.$router.push(localStorage.getItem("remenberUrl"));
              localStorage.removeItem("remenberUrl");
            } else {
              this.$router.push("/home");
            }
          }
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    showTypeup: function() {
      this.showType = true;
    },
    onSelect: function(item) {
      this.formData.type = item.name;
      this.type = item.value;
      this.showType = false;
    },
    showImgActionSheet(type) {
      this.imageType = type;
      this.imgActionSheetVisible = true;
    },
    afterRead(file) {
      switch (this.imageType) {
        case 1:
          this.codeImage.readerUrl = file.content;
          break;
        case 2:
          this.cardImage.readerUrl = file.content;
          break;
        default:
          break;
      }
    },
    beforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.length > 1) {
          Toast.fail("只能上传1张图片");
          reject();
        } else {
          this.uploadLoading = true;
          uploadImgFile({
            file
          })
            .then(res => {
              if (res && res.length) {
                switch (this.imageType) {
                  case 1:
                    this.codeImage.url = res[0];
                    break;
                  case 2:
                    this.cardImage.url = res[0];
                    break;
                  default:
                    break;
                }
                resolve(file);
              } else {
                Toast.fail("图片上传失败");
                reject();
              }
              this.uploadLoading = false;
            })
            .catch(() => {
              Toast.fail("图片上传失败！");
              this.uploadLoading = false;
              reject();
            });
        }
      });
    }
  }
};
</script>
<style lang="less">
.acountSell {
  font-family: PingFang-SC-Medium;
  min-height: 100vh;
  background: #ffffff;
  color: #333333;
  .width-180 {
    width: 180px;
  }
  .width-210 {
    width: 210px;
  }
  .width-230 {
    width: 230px;
  }
  .width-240 {
    width: 240px;
  }
  .van-cell {
    height: 52px;
    line-height: 32px;
  }
  &:last-child {
    height: 102px;
  }
  .van-cell__title {
    text-align: left;
    margin-left: 10px;
    letter-spacing: -0.34px;
    font-size: 14px;
    .cell-input {
      color: #333333;
    }
    .cell-title {
      color: #333333;
    }
    .address-detail {
      width: 242px;
    }
  }
  .my-mes-icon {
    width: 18px;
    height: 18px;
    margin-top: 6px;
  }
  .my-enter {
    width: 28px;
    height: 28px;
  }
  .msg-title {
    margin: 0 16px;
    .msg-error {
      font-size: 14px;
      line-height: 20px;
      color: firebrick;
    }
  }
  .Tobutton {
    background: #00a8ea;
    border-radius: 8px;
    width: 343px;
    height: 44px;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: -0.38px;
    text-align: center;
    line-height: 44px;
    margin: 16px;
    position: relative;
    bottom: -150px;
  }
  /deep/.van-cell:not(:last-child)::after {
    right: 16px;
    border-bottom: 0.02667rem solid #e8eaef;
  }
}
.overlay-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  .van-loading {
    .van-loading__text {
      color: #ffffff;
    }
  }
}
.enterprises-card {
  .enterprises-card-content {
    .provider-pic {
      margin: 10px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .provider-pic-top {
        font-size: 14px;
        margin-bottom: 35px;
      }
      .provider-pic-bottom {
        margin-top: 20px;
        .upload-btn {
          display: inline-block;
          width: 104px;
          height: 40px;
          line-height: 40px;
          background: #00a8ea;
          border-radius: 8px;
          font-size: 14px;
          color: #ffffff;
          text-align: center;
        }
      }
      img {
        width: 188px;
        height: 188px;
      }
    }
  }
}
</style>
