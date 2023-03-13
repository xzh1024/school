<!-- 商品编辑 -->
<template>
  <div class="goods_edit">
    <div class="goods_edit_body">
      <!-- 商品信息 -->
      <div class="goods_div">
        <!-- <div class="goods_title title">
          商品信息
          <div class="dashed"></div>
        </div> -->
        <DetailTitle titleName="商品信息" />
        <div class="goods_info" v-if="goodsType == '零配件'">
          <el-row :gutter="20">
            <el-col :span="4">
              <div>
                <span class="goods_label">配件编码：</span>
                <span class="goods_content">{{ dataObj.swOeCode }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">配件名称：</span>
                <span class="goods_content">{{ dataObj.swOeName }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">配件品牌：</span>
                <span class="goods_content">{{ dataObj.swBrand }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">性质：</span>
                <span class="goods_content">{{ dataObj.property }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="goods_label">单位：</span>
                <span class="goods_content">{{ dataObj.swUnitName }}</span>
              </div>
            </el-col>

            <el-col :span="4">
              <div>
                <span class="goods_label">标准件号：</span>
                <span class="goods_content">{{ dataObj.stdOeCode }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">标准名称：</span>
                <span class="goods_content">{{ dataObj.stdName }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">汽车品牌：</span>
                <span class="goods_content">{{ dataObj.vehBrand }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">产地：</span>
                <span class="goods_content">{{
                  dataObj.swProductionPlace
                }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="goods_label">规格：</span>
                <span class="goods_content">{{ dataObj.swModel }}</span>
              </div>
            </el-col>

            <el-col :span="4">
              <div>
                <span class="goods_label">生产码：</span>
                <span class="goods_content">{{ dataObj.swManuCode }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">原厂名称：</span>
                <span class="goods_content">{{ dataObj.oeName }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">配件类别：</span>
                <span class="goods_content">{{ dataObj.partType }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="goods_label">配件分类：</span>
                <span class="goods_content">{{ dataObj.swCategory }}</span>
              </div>
            </el-col>

            <el-col :span="24">
              <div>
                <span class="goods_label">车型：</span>
                <span class="goods_content">{{ dataObj.swVehModel }}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div>
                <span class="goods_label">适用车型：</span>
                <span class="goods_content">{{ dataObj.vehSeries }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="goods_info" v-if="goodsType == '服务项目'">
          <el-row :gutter="20">
            <el-col :span="5">
              <div>
                <span class="goods_label">项目编码：</span>
                <span class="goods_content">{{ dataObj.code }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="goods_label">项目分类：</span>
                <span class="goods_content">{{ dataObj.partType }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="goods_label">项目名称：</span>
                <span class="goods_content">{{ dataObj.name }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="goods_info" v-if="goodsType == '项目套餐'">
          <el-row :gutter="20">
            <el-col :span="5">
              <div>
                <span class="goods_label">项目套餐编码：</span>
                <span class="goods_content">{{ dataObj.code }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="goods_label">项目套餐分类：</span>
                <span class="goods_content">{{ dataObj.partType }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="goods_label">项目套餐名称：</span>
                <span class="goods_content">{{ dataObj.name }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 价格信息 -->
      <div class="goods_div">
        <!-- <div class="goods_title">价格信息</div> -->
        <DetailTitle titleName="价格信息" />
        <div class="goods_info">
          <el-row :gutter="20" v-if="goodsType == '零配件'">
            <el-col :span="3">
              <div>
                <span class="goods_label">平台价：</span>
                <span class="goods_content"
                  >{{ dataObj.priceAlliance || '-' }}元</span
                >
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">零售价：</span>
                <span class="goods_content">{{ dataObj.priceRetail }}元</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">批发价：</span>
                <span class="goods_content">{{ dataObj.priceP || '-' }}元</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">批价一：</span>
                <span class="goods_content">{{ dataObj.priceP1 }}元</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">批价二：</span>
                <span class="goods_content">{{ dataObj.priceP2 }}元</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">批价三：</span>
                <span class="goods_content">{{ dataObj.priceP3 }}元</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">批价四：</span>
                <span class="goods_content">{{ dataObj.priceP4 }}元</span>
              </div>
            </el-col>

            <el-col :span="24">
              <div>
                <span class="goods_label">划线价：</span>
                <el-radio class="radio-style" v-model="dataObj.linePriceType" label="max">
                  取最高价
                </el-radio>
                <el-radio class="radio-style" v-model="dataObj.linePriceType" label="custom" style="margin-right: 8px;">
                  自定义
                </el-radio>
                <el-input-number
                  :min="0"
                  :precision="2"
                  :controls="false"
                  placeholder="划线价"
                  style="width:140px;"
                  size="small"
                  v-model="dataObj.linePrice"
                >
                  <!-- <span slot="suffix" >元</span> -->
                </el-input-number>
                元
                <span style="margin-left:10px;color:#999;"
                  >*
                  划线价仅展示给客户作为参考，客户订货价依然展示为实际设置的订货价，
                  建议设置划线价，让你的商品自带营销属性</span
                >
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="goodsType == '服务项目'">
            <template v-if="dataObj.showPrices && dataObj.showPrices.length">
              <el-col
                :span="3"
                v-for="(item, index) in dataObj.showPrices"
                :key="index"
              >
                <div>
                  <span class="goods_label">{{ item.name }}</span>
                  <span class="goods_content">{{ item.value }}元</span>
                </div>
              </el-col>
            </template>

            <!-- <el-col :span="3"><div>A级：{{dataObj.platformPrice}}元</div></el-col>
            <el-col :span="3"><div>B级：{{dataObj.retailPrice}}元</div></el-col>
            <el-col :span="3"><div>C级：{{dataObj.wholesalePrice}}元</div></el-col>
            <el-col :span="3"><div>D级：{{dataObj.priceP1}}元</div></el-col> -->
            <el-col :span="24">
              <div>
                <span class="goods_label">划线价：</span>
                <el-input-number
                  :min="0"
                  :precision="2"
                  :controls="false"
                  placeholder="划线价"
                  style="width:140px;"
                  size="small"
                  v-model="dataObj.linePrice"
                >
                  <!-- <span slot="suffix" >元</span> -->
                </el-input-number>
                元
                <span style="margin-left:10px;color:#999;"
                  >*
                  划线价仅展示给客户作为参考，客户订货价依然展示为实际设置的订货价，
                  建议设置划线价，让你的商品自带营销属性</span
                >
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="goodsType == '项目套餐'">
            <el-col :span="3">
              <div>
                <span class="goods_label">套餐价：</span>
                <span class="goods_content">{{ dataObj.platformPrice }}元</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div>
                <span class="goods_label">划线价：</span>
                <el-input-number
                  :min="0"
                  :precision="2"
                  :controls="false"
                  placeholder="划线价"
                  style="width:140px;"
                  size="small"
                  v-model="dataObj.linePrice"
                >
                  <!-- <span slot="suffix" >元</span> -->
                </el-input-number>
                元
                <span style="margin-left:10px;color:#999;"
                  >*
                  划线价仅展示给客户作为参考，客户订货价依然展示为实际设置的订货价，
                  建议设置划线价，让你的商品自带营销属性</span
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 库存信息 商品类型为“零配件”时才展示-->
      <div class="goods_div" v-if="goodsType == '零配件'">
        <!-- <div class="goods_title">库存信息</div> -->
        <DetailTitle titleName="库存信息" />
        <div class="goods_info">
          <el-row :gutter="20">
            <el-col :span="3">
              <div>
                <span class="goods_label">库存数量：</span>
                <span class="goods_content">{{ dataObj.qty }}</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">锁定数量：</span>
                <span class="goods_content">{{ dataObj.lockedQty }}</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <span class="goods_label">可订货数量：</span>
                <span class="goods_content">{{ dataObj.canOrderQty }}</span>
              </div>
            </el-col>
            <el-col :span="24"
              ><div>
                库存展示设置
                <span style="color:#999;"
                  >（在可订货数量的基础上设置展示给客户看的库存信息，未包含在库存区间内的将展示真实的库存）</span
                >
              </div></el-col
            >
          </el-row>
          <div class="tip_ptn" v-if="!isErpUser">
            <div class="tip_stock">
              <el-popover placement="top" width="600" trigger="click">
                <div>
                  <p>
                    举例：配件A性质完好，在仓库1有库存10个、仓库2有库存20个、仓库3有库存30个、仓库4有库存40个，此时库存分组1关联仓库1仓库2、库存分组2关联仓库3仓库4，100及以上库存状态“充足”、30及以下展示“紧张”；此时按下列三种不同的维度展示库存效果
                  </p>
                  <div class="mt-3">
                    <div class="flex">
                      <div class="tip_label">按配件：</div>
                      <div class="tip_content greyColor">配件A 库存：充足</div>
                    </div>
                    <div class="flex">
                      <div class="tip_label">按配件+库存分组：</div>
                      <div class="tip_content greyColor">
                        <p>配件A 库存分组1 库存：紧张</p>
                        <p style="margin-left: 43px;">库存分组2 库存：70个</p>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="tip_label">按配件+仓库：</div>
                      <div class="tip_content greyColor">
                        <p>配件A 仓库1 库存：紧张</p>
                        <p style="margin-left: 43px;">仓库2 库存：紧张</p>
                        <p style="margin-left: 43px;">仓库3 库存：紧张</p>
                        <p style="margin-left: 43px;">仓库4 库存：40个</p>
                      </div>
                    </div>
                  </div>
                </div>
                <i slot="reference" class="el-icon-question tips_logo"></i>
              </el-popover>
              <div style="margin-left:10px;">
                <span>库存展示纬度：</span>
              </div>
              <el-radio-group v-model="stockInfo.stockShowMode">
                <el-radio :label="0" class="radio-margin">按配件</el-radio>
                <el-radio :label="1" class="radio-margin"
                  >按配件+库存分组</el-radio
                >
                <el-radio :label="2" class="radio-margin">按配件+仓库</el-radio>
              </el-radio-group>
            </div>
            <div style="margin-left:30px;text-align:left;">
              <span class="greyColor"
                >* 若按配件+库存分组设置，需要先创建库存分组</span
              >
              <a href="#/stockGroup" class="primaryColor">去设置 ></a>
            </div>
          </div>
          <div class="stock-container">
            <div style="max-height:200px;overflow:auto;">
              <div
                v-for="(item, index) in stockInfo.showRanges"
                :key="index"
                style="display:flex;align-items:center;margin-bottom:8px;"
              >
                <el-tooltip
                  :enterable="false"
                  effect="dark"
                  content="删除"
                  placement="top"
                >
                  <i
                    class="el-icon-delete del_logo"
                    @click="clearStockItem(index)"
                  ></i>
                </el-tooltip>
                <div style="margin-right:8px;">库存区间</div>
                <!-- <el-input-number
                      v-model="item.startQty"
                      size="small"
                      placeholder="-"
                      :controls="false"
                      :min="0"
                      style="width: 90px;"
                      @change="onNumberInput('startQty', item, index)"
                    /> -->
                <el-input
                  v-model="item.startQty"
                  type="number"
                  size="small"
                  placeholder="-"
                  style="flex: none;width: 90px;"
                  @change="onNumberInput('startQty', item)"
                />
                <div style="margin:0 8px;">至</div>
                <!-- <el-input-number
                      v-model="item.endQty"
                      size="small"
                      placeholder="-"
                      :min="0"
                      :controls="false"
                      style="width: 90px;"
                      @change="onNumberInput('endQty', item, index)"
                  /> -->
                <el-input
                  v-model="item.endQty"
                  type="number"
                  size="small"
                  placeholder="-"
                  style="flex: none;width: 90px;"
                  @change="onNumberInput('endQty', item)"
                />
                <div style="margin:0 8px;">时库存展示为</div>
                <div style="display:flex;align-items:center;margin-left: 5px;">
                  <el-select v-model="item.type" size="small" style="">
                    <!-- <el-option
                              v-for="(type, index) in STOCK_TYPES"
                              :key="index"
                              :disabled=" !item.endQty && type.code==5"
                              :label="type.name"
                              :value="type.code"
                          /> -->
                    <el-option
                      v-for="(type, index) in STOCK_TYPES"
                      :key="index"
                      :label="type.name"
                      :value="type.code"
                    />
                  </el-select>
                  <!-- <el-input-number
                          v-model="item.upperLimitQty"
                          v-show="item.type === 5"
                          size="small"
                          :min="0"
                          :controls="false"
                          style="width: 80px;"
                          @change="onNumberInput('upperLimitQty', item, index)"
                      /> -->
                  <el-input
                    v-model="item.upperLimitQty"
                    v-show="item.type === 5"
                    type="number"
                    size="small"
                    style="flex: none;width: 80px;"
                    @change="onNumberInput('upperLimitQty', item, index)"
                  />
                </div>
              </div>
            </div>
            <el-button type="text" @click="addStockItem"
              >添加库存区间</el-button
            >
          </div>
        </div>
      </div>
      <!-- 其他 -->
      <div class="goods_div">
        <!-- <div class="goods_title">其他</div> -->
        <DetailTitle titleName="其他" />
        <div class="goods_info" style="padding-bottom:0;">
          <div class="flex_box " style="align-items: center;">
            <span class="label">卖点</span>
            <el-input
              style="width:70rem;"
              type="text"
              placeholder="请输入内容"
              v-model="dataObj.description"
              maxlength="50"
              show-word-limit
            >
            </el-input>
          </div>
          <div class="flex_box ">
            <span class="label">图片</span>
            <div>
              <el-upload
                ref="elUpload"
                :action="imgAction"
                accept="image/png, image/jpeg"
                list-type="picture-card"
                :limit="5"
                :file-list="fileData"
                multiple
                :on-exceed="handleExceed"
                :before-upload="beforeUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :http-request="uploadReqFn"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div style="display:flex" slot="tip">
                  <template v-for="(item, index) in fileData">
                    <div class="img_title_btn" v-if="index === 0" :key="index">
                      <span>主图</span>
                    </div>
                    <div class="img_title_btn" v-else :key="index">
                      <a @click="setImgMain(index)">设为主图</a>
                    </div>
                  </template>
                </div>
              </el-upload>
              <el-dialog title="图片" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </div>
          <div class="flex_box ">
            <span class="label">详情</span>
            <Editor :content="dataObj.remarks" :catchData="changeEditor" />
          </div>
        </div>
      </div>
    </div>
    <div class="goods_edit_footer">
      <el-button size="small" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="small" @click="onSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import Editor from './components/wangEditor.vue';
import DetailTitle from '@/components/manageCom/DetailTitle.vue';
import { base64toFile } from '@/utils/tool.js';
import { uploadImgFile } from '@/api/commonService';
import { GoodsEditApi } from './services';
const goodsEditApi = new GoodsEditApi();

export default {
  name: 'goods_edit',
  components: {
    Editor,
    DetailTitle,
  },
  data() {
    return {
      imgAction: '#', //图片上传接口
      goodsType: '零配件', //零配件 / 服务项目 / 项目套餐
      dataObj: {
        //商品信息
        // code:'12345678',//商品编码
        // partCode:'1234566',//配件编码
        // classifiy:'轮胎类',//商品分类
        // goodsType:'零配件',//商品类型：零配件/服务项目/项目套餐
        // originPlace:'国产',//产地
        // goodName:'商品名称',//商品名称
        // originName:'原厂名称',//原厂名称
        // standardName:'标准名称',//标准名称
        // unit:'个',//单位
        // nature:'完好',//性质
        // specifications:'R15',//规格
        // carBand:"奥迪",//汽车品牌
        // partBand:'博世',//商品品牌
        // productCode:'123455432',//生产码
        // models:'一汽大众，奥迪',//车型
        // applicableModels:"这里是适用车型这里是适用车型",//适用车型
        // partName:'配件名称',//配件名称
        // partClassifiy:'轮胎类',//配件类别
        // standardNo:"1234567890",//标准件号
        linePriceType: 'max', // 划线价取值方式 max-划线价取最高价 custom-划线价自定义
        description: '', // 卖点
      },

      stockInfo: {
        //库存信息
        stockNum: '500', //库存数量
        lockNum: '10', //锁定数：
        orderableNum: '198', //可订货数量
        stockShowMode: null,
        showRanges: [
          {
            startQty: '',
            endQty: '',
            upperLimitQty: '',
            type: 0,
          },
        ],
      },

      fileData: [],
      limitNum: 5,
      picturesLength: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      STOCK_TYPES: [
        { code: 0, name: '有货' },
        { code: 1, name: '充足' },
        { code: 2, name: '紧张' },
        { code: 3, name: '缺货' },
        { code: 4, name: '真实库存' },
        { code: 5, name: '设置展示上限' },
      ],
      type: null,
    };
  },
  computed: {
    isErpUser() {
      //是否是erp用户 erpType为2时是 erp用户
      return this.$store.state.base.erpType == 2 ? true : false;
    },
  },
  mounted() {
    window.z = this;
    this.type = this.$route.query.type;
    if (this.type == 0) {
      this.goodsType = '零配件';
    } else if (this.type == 1) {
      this.goodsType = '服务项目';
    } else if (this.type == 2) {
      this.goodsType = '项目套餐';
    }
    this.initData();
  },
  methods: {
    initData() {
      this.fileData = [];
      goodsEditApi
        .getGoodsDetail({
          id: this.$route.query.id,
          type: this.type,
        })
        .then(res => {
          Object.assign(this.dataObj, res);
          this.dataObj.linePriceType = res.linePriceType || 'max';
          if (res.images && res.images.length) {
            const urls = res.images || [];
            for (let url of urls) {
              this.fileData.push({
                name: url,
                url: url,
                saveUrl: url,
              });
            }
          }
          this.picturesLength = this.fileData.length;
          this.stockInfo = res.stockShowSetting;
          this.stockInfo.showRanges = res.stockShowSetting.showRanges
            ? res.stockShowSetting.showRanges
            : [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    onNumberInput(type, item, index) {
      var _this = this;
      switch (type) {
        case 'startQty':
          if (item.startQty && Number(item.startQty || 0) < 0) {
            item.startQty = 0;
          }
          break;
        case 'endQty':
          if (
            item.endQty &&
            Number(item.endQty || 0) < Number(item.startQty || 0)
          ) {
            item.endQty = item.startQty ? Number(item.startQty) + 1 : 0;
          }
          break;
        case 'upperLimitQty':
          if (
            item.upperLimitQty &&
            Number(item.upperLimitQty || 0) < Number(item.startQty || 0)
          ) {
            item.upperLimitQty = item.startQty || 0;
          }
          if (
            item.upperLimitQty &&
            Number(item.upperLimitQty || 0) > Number(item.endQty)
          ) {
            item.upperLimitQty =
              Number(item.endQty) > 0 ? Number(item.endQty) - 1 : 0;
          }
          _this.$set(
            _this.stockInfo.showRanges[index],
            'upperLimitQty',
            item.upperLimitQty,
          );

          break;
      }
      _this.$forceUpdate();
    },
    clearStockItem(itemIndex) {
      if (this.stockInfo.showRanges && this.stockInfo.showRanges.length <= 0) {
        this.$alert('不能删除', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        this.stockInfo.showRanges = this.stockInfo.showRanges.filter(
          (item, index) => itemIndex !== index,
        );
      }
    },
    addStockItem() {
      if (this.stockInfo.showRanges.length >= 50) {
        this.$alert('最多只能添加50条', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        //   先判断前面输入的数据是否有交叉，没有交叉再新增一条
        let isCross = this.checkIsCross();
        if (!isCross) {
          this.stockInfo.showRanges.push({
            startQty: '',
            endQty: '',
            upperLimitQty: '',
            type: 0,
          });
        }
      }
    },
    checkIsCross() {
      if (this.stockInfo.showRanges && this.stockInfo.showRanges.length > 0) {
        //循环判断是否有不符合规则的输入数据
        for (let item of this.stockInfo.showRanges) {
          if (!item.startQty && item.startQty != undefined && !item.endQty) {
            this.$alert('库存区间值不能全部为空', '提示', {
              confirmButtonText: '确定',
            });
            return true;
          } else if (
            // item.startQty &&
            // item.endQty &&
            Number(item.startQty) >= Number(item.endQty)
          ) {
            this.$alert('库存区间开始值不能大于等于结束值', '提示', {
              confirmButtonText: '确定',
            });
            return true;
          } else if (item.type === 5) {
            if (!item.upperLimitQty) {
              this.$alert('库存显示上限不能为空', '提示', {
                confirmButtonText: '确定',
              });
              return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },
    changeEditor(data) {
      this.dataObj.remarks = data;
    },

    /* 图片上传  */
    handlePictureCardPreview(file) {
      //点击放大镜按钮
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    clearFiles() {
      this.$message.warning('图片上传失败');
      const list = JSON.parse(JSON.stringify(this.fileData));
      this.$refs.elUpload.clearFiles();
      this.fileData = [...list];
    },
    uploadReqFn(option) {
      const file = option.file;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      uploadImgFile({
        file,
      })
        .then(res => {
          if (res && res.length) {
            // 处理图片回显
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = e => {
              this.fileData.push({
                name: file.name,
                uid: file.uid,
                url: e.target.result,
                saveUrl: res[0],
              });
              option.readerUrl = e.target.result;
            };
            fileReader.onerror = () => {
              this.clearFiles();
            };
          } else {
            this.clearFiles();
          }
          loading.close();
        })
        .catch(() => {
          this.clearFiles();
          loading.close();
        });
    },
    setImgMain(index) {
      const fileData = this.fileData;
      const arr = fileData.splice(index, 1);
      fileData.unshift(...arr);
    },
    beforeUpload(file) {
      //上传之前
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      //加上上传数量
      this.picturesLength += 1;
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!');
        return false;
      }
    },
    handleExceed(files, fileList) {
      // this.$message.error("图片已超出最大个数限制!");
      this.$message.warning(
        `当前限制选择 ${this.limitNum} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    handleRemove(file) {
      const fileData = this.fileData;
      const findIndex = fileData.findIndex(item => {
        return item.uid === file.uid || item.saveUrl === file.saveUrl;
      });
      if (findIndex !== -1) {
        fileData.splice(findIndex, 1);
      }
    },
    // 取消编辑
    handleCancel() {
      this.$router.go(-1);
    },
    async onSave() {
      //保存
      if (this.stockInfo.showRanges && this.stockInfo.showRanges.length > 0) {
        for (let item of this.stockInfo.showRanges) {
          item.startQty = item.startQty || null;
          item.endQty = item.endQty || null;
          item.upperLimitQty = item.upperLimitQty || null;
        }
      }
      if (
        this.stockInfo.showRanges &&
        (this.stockInfo.showRanges.length < 0 ||
          this.stockInfo.showRanges.length > 50)
      ) {
        this.$alert('库存区间设置条数需大于0小于等于50条', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        let _this = this;
        let params = {
          id: _this.$route.query.id,
          type: Number(_this.type),
          linePrice: _this.dataObj.linePrice,
          linePriceType: _this.dataObj.linePriceType,
          description: _this.dataObj.description,
          images: _this.fileData.map(item => item.saveUrl),
          remarks: _this.dataObj.remarks,
          ..._this.stockInfo,
        };
        const remarks = params.remarks;
        const re = /"data:image.*?"/g;
        const matchArr = remarks.match(re);
        // 处理base64图片
        if (matchArr) {
          const files = [];
          matchArr.forEach(matchStr => {
            files.push(
              base64toFile(matchStr.substring(1, matchStr.length - 1)),
            );
          });
          const fileSizeTotal = files.reduce((total, file) => {
            return total + file.size;
          }, 0);
          if (fileSizeTotal / 1024 / 1024 > 30) {
            loading.close();
            this.$message.warning('上传图片大于30M，请整理后重新上传！');
            return false;
          }
          const res = await uploadImgFile({ file: files });
          if (res && res.length) {
            let index = 0;
            params.remarks = remarks.replace(re, () => `"${res[index++]}"`);
            goodsEditApi
              .update(params)
              .then(() => {
                _this.$message.success('保存成功');
                loading.close();
              })
              .catch(() => loading.close());
          } else {
            loading.close();
          }
        } else {
          goodsEditApi
            .update(params)
            .then(() => {
              _this.$message.success('保存成功');
              loading.close();
            })
            .catch(() => loading.close());
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goods_edit {
  height: 100%;
  display: flex;
  flex-direction: column;
  .goods_edit_body {
    flex: 1;
    overflow-y: auto;
    padding: @padding-size-main;
    .goods_div {
      .goods_title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        font-weight: 500;
      }
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dashed {
          height: 1px;
          margin: 16px;
          flex: 1;
          border-bottom: 1px dashed @border-color-base;
        }
      }
      .goods_info {
        padding: @padding-size-secondary;
        /deep/.el-input__suffix {
          line-height: 40px;
        }
        .goods_label {
          color: @text-color-secondary;
        }
        .goods_content {
          color: @text-color-base;
        }
        /deep/ .radio-style {
          margin: 9px 24px 0 0;
          &:last-child {
            margin-left: 0;
          }
          .el-radio__label {
            padding-left: 4px;
          }
        }
      }
      .tip_ptn {
        display: flex;
        font-size: 14px;
        line-height: 30px;
      }
      .tip_ptn input[type='radio'] {
        opacity: 1;
      }
      .tip_stock {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .radio-margin {
          margin: 0 @margin-size-main;
        }
        .mt-3 {
          margin-top: 1rem !important;
        }
      }
      .el-radio-group label {
        margin-bottom: 0;
      }
      .tips_logo {
        color: #fa8c16;
        cursor: pointer;
      }
      .del_logo {
        color: #fa8c16;
        cursor: pointer;
        font-size: 18px;
        margin-right: 10px;
      }
      .stock-container {
        // margin: 0 15px 15px 15px;
        padding: 16px;
        text-align: left;
        width: 55rem;
        background: #f5f5f5;
        border-radius: 2px;
        /deep/input::-webkit-outer-spin-button,
        /deep/input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
      /deep/.el-input-number .el-input__inner {
        padding-left: 10px;
        padding-right: 10px;
        text-align: left;
      }
      /deep/.el-col {
        margin: 5px 0;
      }
      .flex_box {
        display: flex;
        margin: 16px 0;
        .label {
          width: 50px;
        }
        .img_box {
          display: flex;

          .img_item {
            margin-right: 16px;
            .img_item_box {
              width: 100px;
              height: 100px;
              object-fit: cover;
            }
          }
        }
        /deep/.el-upload-list--picture-card .el-upload-list__item {
          width: 104px;
          height: 104px;
        }
        /deep/.el-upload--picture-card {
          width: 104px;
          height: 104px;
          line-height: 104px;
        }
        /deep/.el-dialog {
          width: 40%;
        }
        .img_title_btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 104px;
          margin-top: 8px;
          margin-right: 8px;
          a {
            cursor: pointer;
            text-decoration: underline;
            color: @color-link;
          }
        }
      }
    }
  }
  .goods_edit_footer {
    padding: 12px 0;
    border-top: 1px solid @border-color-base;
    text-align: center;
  }
}
</style>
