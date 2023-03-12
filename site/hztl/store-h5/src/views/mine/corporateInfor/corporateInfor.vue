<template>
  <div class="corporateInfor">
    <van-nav-bar title="" left-text="" right-text="" @click-left="onClickLeft">
      <img src="../../../assets/back-icon.png" slot="left" class="Back" />
    </van-nav-bar>
    <van-cell-group>
      <van-cell>
        <template slot="icon">
          <img
            src="../../../assets/icon-company.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业名称：</span>
          <span v-if="!isManager" class="cell-input width-230">{{
            formData.name
          }}</span>
          <input class="cell-input width-230" v-else v-model="formData.name" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../../assets/icon-comcode.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">统一社会信用代码：</span>
          <span class="cell-input width-180" v-if="!isManager">{{
            formData.bizLicenceCode
          }}</span>
          <input
            class="cell-input width-180"
            v-else
            v-model="formData.bizLicenceCode"
          />
        </template>
      </van-cell>
      <van-cell is-link @click="showTypeup">
        <template slot="icon">
          <img
            src="../../../assets/icon-comtype.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业类型：</span>
          <span class="cell-input width-210" v-if="!isManager">{{
            formData.type
          }}</span>
          <input
            class="cell-input width-210"
            readonly
            v-else
            v-model="formData.type"
          />
        </template>
        <template slot="right-icon">
          <img src="../../../assets/enter@3x.png" class="my-enter" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../../assets/icon-address.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">所在地区：</span>
          <span class="cell-input width-210" v-if="!isManager">{{
            formData.areaName
          }}</span>
          <input
            class="cell-input width-210"
            readonly
            v-else
            id="areaName"
            v-model="formData.areaName"
          />
        </template>
        <template slot="right-icon">
          <img src="../../../assets/enter@3x.png" class="my-enter" />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../../assets/icon-detailAddress.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">详细地址：</span>
          <span class="cell-input address-detail width-230" v-if="!isManager">{{
            formData.address
          }}</span>
          <input
            class="cell-input width-230"
            v-else
            v-model="formData.address"
          />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img
            src="../../../assets/icon-reciver.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">联系人：</span>
          <span class="cell-input width-240" v-if="!isManager">{{
            formData.contacts
          }}</span>
          <input
            class="cell-input width-240"
            v-else
            v-model="formData.contacts"
          />
        </template>
      </van-cell>
      <van-cell>
        <template slot="icon">
          <img src="../../../assets/icon-tel.png" class="my-mes-icon icon-18" />
        </template>
        <template slot="title">
          <span class="cell-title">联系电话：</span>
          <span class="cell-input width-230" v-if="!isManager">{{
            formData.phone
          }}</span>
          <input class="cell-input width-230" v-else v-model="formData.phone" />
        </template>
      </van-cell>
      <van-cell @click="showImgActionSheet(1)" v-if="!isGarage">
        <template slot="icon">
          <img
            src="../../../assets/icon-paymentCodePic.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">收款信息</span>
        </template>
        <template slot="right-icon">
          <img src="../../../assets/enter@3x.png" class="my-enter" />
        </template>
      </van-cell>
      <van-cell class="marg-b-25" @click="showImgActionSheet(2)" v-if="!isGarage">
        <template slot="icon">
          <img
            src="../../../assets/icon-businessCard.png"
            class="my-mes-icon icon-18"
          />
        </template>
        <template slot="title">
          <span class="cell-title">企业名片</span>
        </template>
        <template slot="right-icon">
          <img src="../../../assets/enter@3x.png" class="my-enter" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="Tobutton" v-if="isManager" @click="save">保存</div>
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
import { mapState } from "vuex";
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
import {
  getAddressList,
  getPositionAreaById
} from "../../../common/splicingData";
import { uploadImgFile } from "@/api/common";
import PickerExtend from "picker-extend";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(NavBar)
  .use(Popup)
  .use(Area)
  .use(ActionSheet)
  .use(Uploader)
  .use(Overlay)
  .use(Loading)
  .use(Toast);
import request from "@/request";
import defaultUrl from "@/assets/payment-default.png";

export default {
  name: "corporateInfor",
  data() {
    return {
      show: false,
      showType: false,
      actions: [
        { name: "汽修厂", value: "garage" },
        { name: "经销商", value: "dealer" },
        { name: "生产厂家", value: "manufacturer" }
      ],
      formData: {},
      areaId: undefined,
      type: "",
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
    ...mapState({
      isGarage: state => state.storeInfo.type === "汽修厂",
      isManager: state => state.base.staffType === "manager"
    })
  },
  created() {
    this.load();
  },
  beforeRouteEnter(to, from, next) {
    //路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
    to.meta["fromPath"] = from.path;
    if (from.path == "/picCard") {
      to.meta["needFresh"] = false;
    } else {
      to.meta["needFresh"] = true;
    }
    next();
  },
  activated() {
    //此方法在页面缓存时会被调用，根据路由元信息决定是否重新加载数据。不加载则是上次填写完的数据
    if (this.$route.meta["needFresh"]) {
      this.load();
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("mine");
    },
    setAddress() {
      let addressListAll = getAddressList();
      let position = [0, 0, 0];
      if (this.formData.areaId) {
        position = getPositionAreaById(this.formData.areaId, addressListAll[0].data);
      }
      let _this = this;
      let mobileSelect4 = new PickerExtend({
        trigger: "#areaName",
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
        }
      });
    },
    load() {
      let _this = this;
      request({
        url: "/companies"
      })
        .then(res => {
          _this.formData = res;
          _this.areaId = _this.formData.areaId;
          _this.actions.forEach(item => {
            if (_this.formData.type == item.name) {
              _this.type = item.value;
            }
          });
          _this.setAddress();

          // 收款信息
          if (res.paymentCode) {
            this.codeImage.url = res.paymentCode;
            this.codeImage.readerUrl = res.paymentCode;
          }
          // 企业名片
          if (res.businessCard) {
            this.cardImage.url = res.businessCard;
            this.cardImage.readerUrl = res.businessCard;
          }
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    save() {
      if (this.type == "" && this.formData.type == "") {
        Toast.fail("请填写企业类型！");
        return false;
      }
      let param = {
        name: this.formData.name,
        bizLicenceCode: this.formData.bizLicenceCode,
        type: this.type,
        contacts: this.formData.contacts,
        phone: this.formData.phone,
        areaName: this.formData.areaName,
        address: this.formData.address,
        areaId: this.areaId,
        paymentCode: this.codeImage.url === this.defaultUrl ? "" : this.codeImage.url,
        businessCard: this.cardImage.url === this.defaultUrl ? "" : this.cardImage.url,
      };
      request({
        method: "post",
        url: "/companies/" + this.formData.id,
        data: param
      })
        .then(res => {
          if (res && res.repeat) {
            let managerPhone = res.managerPhone;
            let repeatCompanyName = res.repeatCompanyName;
            this.$router.push({
              name: "Managementverification",
              params: {
                param: param,
                repeatCompanyName: repeatCompanyName,
                managerPhone: managerPhone,
                corporateInfor: true
              }
            });
          } else {
            Toast.success("保存成功！");
          }
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    setAddressSelect(list) {
      let _this = this;
      let mobileSelect4 = new PickerExtend({
        trigger: "#areaName",
        title: "选择地址",
        wheels: list,
        callback: function(indexArr, data) {
          _this.areaId = Number(data[2].id);
          _this.formData.areaName =
            data[0].value + data[1].value + data[2].value;
        }
      });
    },
    showTypeup() {
      if (this.isManager) {
        this.showType = true;
      }
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
.corporateInfor {
  font-family: PingFang-SC-Medium;
  min-height: 100vh;
  background: #ffffff;
  overflow: auto;
  .marg-b-25 {
    margin-bottom: 80px;
  }
  .van-cell {
    height: 52px;
    line-height: 32px;
  }
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
  .van-cell:nth-child(5) {
    height: 82px;
  }
  .van-cell__title {
    text-align: left;
    margin-left: 10px;
    letter-spacing: -0.34px;
    font-size: 14px;
    .cell-input {
      color: #1a2231;
    }
    .cell-title {
      color: #777b87;
    }
    .address-detail {
      height: 82px;
      width: 242px;
      display: inline-flex;
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
    position: fixed;
    bottom: 0;
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
