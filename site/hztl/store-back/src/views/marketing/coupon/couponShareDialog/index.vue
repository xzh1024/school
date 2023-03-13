<template>
  <el-dialog
    title="分享"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="776px"
    @close="close"
    class="coupon-share-dialog"
  >
    <div class="share-container">
      <div class="share-poster" ref="sharePoster">
        <img src="~@/assets/img/marketing/coupon-share.png" class="share-img" />
        <div class="coupon-name">{{ share.name }}</div>
        <div class="company-name">{{ share.companyName }}</div>
        <div class="share-divider"></div>
        <div class="share-code" ref="shareCode" id="shareCode"></div>
        <div class="m-t-8">扫描或长按查看优惠券详情</div>
        <div class="share-source">
          来源：www.srgou.threesoft.com
          <br />
          东方思锐旗下线上商城管理系统
        </div>
      </div>
      <div class="share-main">
        <div class="share-title">分享链接</div>
        <div class="share-input-wrap">
          <el-input class="share-input" size="small" v-model="addr"></el-input>
          <el-button
            class="share-button"
            size="small"
            type="primary"
            @click="copy"
          >
            复制
          </el-button>
        </div>
        <div class="color-hint m-t-16">
          可复制链接或下载二维码海报发送给微信好友或发送至微信朋友圈
        </div>
        <div class="share-button-group">
          <el-button type="text" size="small" @click="downloadPoster">
            下载完整海报
          </el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" size="small" @click="downloadCode">
            仅下载二维码
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
import { getShare } from '@/views/marketing/coupon/services';

export default {
  name: 'CouponShareDialog',
  data() {
    return {
      visible: false,
      loading: false,
      addr: '',
      share: {},
      shareCode: null,
    };
  },
  methods: {
    show(id) {
      this.addr = '';
      this.share = {};
      this.getShare(id);
      this.visible = true;
    },
    close() {
      if (this.shareCode) {
        this.shareCode.clear();
      }
      this.$emit('hide');
    },
    getShare(id) {
      const params = {
        scene: 'coupon',
        id: id,
      };
      getShare(params)
        .then(res => {
          if (res) {
            this.share = res.data;
            this.addr = `${res.addr}/couponDetail?id=${id}&type=store`;
            this.createCode(this.addr);
          }
        })
        .catch(() => {
          this.share = {};
        });
    },
    createCode(text) {
      //生成二维码
      if (this.shareCode) {
        this.shareCode.makeCode(text);
      } else {
        this.shareCode = new QRCode('shareCode', {
          width: 80, // 设置宽度，单位像素
          height: 80, // 设置高度，单位像素
          text, // 设置二维码内容或跳转地址
        });
      }
    },
    copy() {
      if (this.addr) {
        this.$copyText(this.addr).then(
          () => {
            this.$message({
              message: '已复制到剪贴板',
              type: 'success',
            });
          },
          () => {
            this.$message({
              message: '复制失败',
              type: 'error',
            });
          },
        );
      } else {
        this.$message({
          message: '链接不存在',
          type: 'error',
        });
      }
    },
    // 下载海报
    downloadPoster() {
      this.$nextTick(() => {
        html2canvas(this.$refs.sharePoster).then(canvas => {
          const a = document.createElement('a');
          const base64Url = canvas.toDataURL('image/png'); //base64
          const blobUrl = this.dataURLtoBlob(base64Url);
          a.href = URL.createObjectURL(blobUrl); //下载链接
          a.setAttribute('download', `${this.share.name}海报.png`);
          a.style.display = 'none'; //a标签隐藏
          document.body.appendChild(a);
          a.click();
        });
      });
    },
    // 将base64转换为blob对象 解决低版本浏览器兼容问题
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',');
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const mime = arr[0].match(/:(.*?);/)[1];
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    // 下载二维码
    downloadCode() {
      html2canvas(this.$refs.shareCode).then(canvas => {
        let link = document.createElement('a');
        link.href = canvas.toDataURL(); //下载链接
        link.setAttribute('download', `${this.share.name}二维码.png`);
        link.style.display = 'none'; //a标签隐藏
        document.body.appendChild(link);
        link.click();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.coupon-share-dialog {
  /deep/ .el-dialog__body {
    // padding: @padding-size-main @padding-size-main 0;
    background: #ffffff;
    height: 550px;
    .share-container {
      padding: 16px 40px;
      display: flex;
      .share-poster {
        width: 250px;
        // height: 504px;
        box-sizing: border-box;
        padding: 16px;
        background: #ffffff;
        border-radius: 2px;
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
          0px 6px 16px 0px rgba(0, 0, 0, 0.08),
          0px 3px 6px -4px rgba(0, 0, 0, 0.12);
        margin-right: 40px;
        font-size: 12px;
        text-align: center;
        .share-img {
          width: 218px;
          height: 218px;
        }
        .coupon-name {
          margin-top: 16px;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
        }
        .company-name {
          margin-top: 4px;
          line-height: 22px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .share-divider {
          margin: 8px;
          width: 100%;
          height: 0;
          border-bottom: 1px dashed #d9d9d9;
        }
        .share-code {
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }
        .share-source {
          margin-top: 4px;
          line-height: 20px;
          color: #999999;
        }
      }
      .share-main {
        flex: 1;
        .share-title {
          line-height: 22px;
        }
        .share-input-wrap {
          margin-top: 16px;
          width: 332px;
          height: 32px;
          background: #ffffff;
          display: flex;
          align-items: center;
          .share-input {
            flex: 1;
            .el-input__inner {
              border-radius: 2px 0 0 2px;
            }
          }
          .share-button {
            &.el-button--small {
              border-radius: 0 2px 2px 0;
            }
          }
        }
        .share-button-group {
          margin-top: 32px;
          .el-divider--vertical {
            background-color: @color-link;
            margin: 0 8px;
          }
          .el-button--small {
            padding-left: 0;
            padding-right: 0;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
