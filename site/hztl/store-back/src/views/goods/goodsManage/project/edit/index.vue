<template>
  <div class="project-edit-container" v-loading.fullscreen.lock="loading">
    <div class="project-edit-body">
      <SettingCard title="商品信息">
        <el-row :gutter="16">
          <el-col :span="6">
            <div class="col-label">项目编码：</div>
            <div class="col-value" :title="info.code">
              {{ info.code }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="col-label">项目分类：</div>
            <div class="col-value" :title="info.category">
              {{ info.category }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="col-label">项目名称：</div>
            <div class="col-value" :title="info.name">
              {{ info.name }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="col-label">备注：</div>
            <div class="col-value" :title="info.remark">
              {{ info.remark }}
            </div>
          </el-col>
        </el-row>
      </SettingCard>
      <SettingCard title="价格信息">
        <el-row :gutter="16" v-if="info.showPrices">
          <el-col
            :span="6"
            v-for="(item, index) in info.showPrices"
            :key="index"
          >
            <span class="col-label">{{ `${item.name}：` }}</span>
            <span class="col-value" :title="item.value">
              {{ item.value }}
            </span>
          </el-col>
        </el-row>
        <div class="input-item m-b-8">
          <div class="input-label">
            是否允许线上售卖：
          </div>
          <div class="input-content">
            <el-radio v-model="formData.notOnlineSale" :label="false">
              是
            </el-radio>
            <el-radio v-model="formData.notOnlineSale" :label="true">
              否
            </el-radio>
          </div>
        </div>
        <div class="input-item m-b-8">
          <div class="input-label">
            线上售价：
          </div>
          <div class="input-content">
            <el-select
              class="width-114"
              v-model="formData.priceType"
              placeholder=""
              size="small"
              slot="prepend"
            >
              <el-option
                v-for="(item, index) in info.showPrices || []"
                :key="index"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item m-b-8">
          <div class="input-label">
            划线价：
          </div>
          <div class="input-content">
            <el-radio v-model="formData.linePriceType" label="max">
              取最高价
            </el-radio>
            <el-radio v-model="formData.linePriceType" label="custom">
              自定义
            </el-radio>
            <el-input
              class="width-166 m-r-16"
              size="small"
              v-model="formData.linePrice"
              @input="
                formData.linePrice = floatNumberValidate(formData.linePrice)
              "
            >
              <template slot="append">元</template>
            </el-input>
            <div class="input-assist">
              *这里是划线价的说明这里是划线价的说明这里是划线价的说明这里是划线价的说明这里是划线价的说明这里是划线价的说明
            </div>
          </div>
        </div>
      </SettingCard>
      <SettingCard title="其他" class="clear-style">
        <div class="input-item">
          <div class="input-label">卖点</div>
          <div class="input-content">
            <el-input
              class="input-textarea"
              type="textarea"
              v-model="formData.description"
              resize="none"
              maxlength="50"
              show-word-limit
              :autosize="{ minRows: 1, maxRows: 6 }"
            ></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-label">
            图片
          </div>
          <div class="input-content">
            <div class="input-assist">*建议图片尺寸：220*220</div>
            <UploadImage :fileList="formData.images" :limit="5"></UploadImage>
          </div>
        </div>
        <div class="input-item" style="margin-bottom: 0;">
          <div class="input-label">
            详情
          </div>
          <div class="input-content">
            <Editor :content="formData.remarks" :catchData="changeEditor" />
          </div>
        </div>
      </SettingCard>
    </div>
    <div class="project-edit-footer">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button size="small" type="primary" @click="handleSave"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import SettingCard from '@/components/card/settingCard.vue';
import { base64toFile } from '@/utils/tool.js';
import { uploadImgFile } from '@/api/commonService';
import { getGoodsInfo, updateGoods } from '@/api/goods';
import UploadImage from '@/views/goods/goodsManage/components/uploadImage.vue';
import Editor from '@/views/goods/goodsEdit/components/wangEditor.vue';
import { floatNumberValidate } from '@/utils/validate';

export default {
  components: { SettingCard, UploadImage, Editor },
  data() {
    return {
      type: 1,
      loading: false,
      info: {},
      formData: {
        notOnlineSale: false, // 是否允许线上售卖 默认值：是
        priceType: '', // 线上售价
        linePrice: '', // 划线价
        linePriceType: 'max', // 划线价取值方式 max-划线价取最高价 custom-划线价自定义
        description: '', // 卖点
        remarks: '', // 详情
        images: [],
      },
      priceTypeList: [
        {
          code: '',
          name: 'A级',
        },
        {
          code: '1',
          name: 'B级',
        },
        {
          code: '2',
          name: 'C级',
        },
        {
          code: '3',
          name: 'D级',
        },
      ],
    };
  },
  computed: {
    id() {
      return Number(this.$route.query.id);
    },
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    floatNumberValidate,
    changeEditor(data) {
      this.formData.remarks = data;
    },
    getGoodsInfo() {
      this.loading = true;
      getGoodsInfo(this.id, {
        type: this.type,
      })
        .then(res => {
          this.loading = false;
          const formData = this.formData;
          if (res) {
            this.info = res;
            formData.notOnlineSale = !!res.notOnlineSale; // 是否允许线上售卖
            formData.priceType = res.priceType || ''; // 线上售价
            formData.linePrice = res.linePrice || ''; // 划线价
            formData.linePriceType = res.linePriceType || 'max'; // 划线价取值方式 max-划线价取最高价 custom-划线价自定义
            formData.description = res.description || ''; // 卖点
            formData.remarks = res.remarks || ''; // 详情
            const images = res.images || [];
            for (let imageUrl of images) {
              formData.images.push({
                name: imageUrl,
                url: imageUrl,
                saveUrl: imageUrl,
              });
            }
          }
        })
        .catch(() => (this.loading = false));
    },
    // 取消编辑
    handleCancel() {
      this.$router.go(-1);
    },
    // 保存
    async handleSave() {
      const params = {
        ...this.formData,
        type: this.type,
      };
      params.images = params.images.map(item => item.saveUrl);
      const remarks = params.remarks;
      const re = /"data:image.*?"/g;
      const matchArr = remarks.match(re);
      this.loading = true;
      // 处理base64图片
      if (matchArr) {
        const files = [];
        matchArr.forEach(matchStr => {
          files.push(base64toFile(matchStr.substring(1, matchStr.length - 1)));
        });
        const fileSizeTotal = files.reduce((total, file) => {
          return total + file.size;
        }, 0);
        if (fileSizeTotal / 1024 / 1024 > 30) {
          this.loading = false;
          this.$message.warning('上传图片大于30M，请整理后重新上传！');
          return false;
        }
        const res = await uploadImgFile({ file: files });
        if (res && res.length) {
          let index = 0;
          params.remarks = remarks.replace(re, () => `"${res[index++]}"`);
          updateGoods(this.id, params)
            .then(() => {
              this.$message.success('保存成功');
              this.loading = false;
              // this.$router.go(-1);
            })
            .catch(() => (this.loading = false));
        } else {
          this.loading = false;
        }
      } else {
        updateGoods(this.id, params)
          .then(() => {
            this.$message.success('保存成功');
            this.loading = false;
            // this.$router.go(-1);
          })
          .catch(() => (this.loading = false));
      }
    },
  },
};
</script>

<style lang="less" scoped>
.project-edit-container {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .project-edit-body {
    flex: 1;
    padding: @padding-size-main;
    overflow-y: auto;
    .set-card {
      overflow: hidden;
    }
    /deep/ .clear-style {
      .card-body {
        margin-bottom: 0;
      }
    }
    .el-col {
      display: flex;
      margin-bottom: @margin-size-secondary;
      .col-label {
        color: @text-color-secondary;
      }
      .col-value {
        flex: 1;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .project-edit-footer {
    padding: 12px;
    text-align: center;
    background-color: #ffffff;
    border-top: 1px solid @border-color-base;
  }
}
</style>
