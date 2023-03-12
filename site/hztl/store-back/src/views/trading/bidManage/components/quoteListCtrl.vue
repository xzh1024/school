<template>
    <el-drawer size="1080px" v-if="drawer" :visible.sync="drawer" :show-close="false">
        <div class="content">
            <div class="content-top">
                <div class="top-title">
                    <span
                        class="top-title-tag"
                        :class="{'isPxtTag':isPxt,'isZplyTag':isZply,'isSrgoTag':isSrgo}"
                    >{{formData.statusName}}</span>
                    <span
                        class="top-title-time"
                        v-if="formData.status==0||formData.status==1"
                    >剩余时间： {{formData.want.remainTimeStr}}</span>
                    <!-- <span
                        v-if="formData.ordered"
                        :class="{'top-title-right':true,'isZply':isZply,'isPxt':isPxt,'isSrgo':isSrgo}"
                        @click="Watchorder"
                    >查看相关销售单 ></span> -->
                </div>
                <div class="top-info">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content">
                                <div>
                                    <span class="grid-title">单号：</span>
                                    <span class="grid-label">{{formData.wantCode}}</span>
                                </div>
                                <div>
                                    <span class="grid-title">车型：</span>
                                    <span
                                        class="grid-label"
                                    >{{formData.want.factoryBrand}} {{formData.want.series}} {{formData.want.year}} {{formData.want.displacement}} {{formData.want.gearbox}}</span>
                                </div>
                                <div>
                                    <span class="grid-title">VIN码：</span>
                                    <span class="grid-label">{{formData.want.vin}}</span>
                                </div>
                                <div>
                                    <span
                                        class="grid-mark break-2"
                                        :title="formData.want.remarks"
                                    >备注：{{formData.want.remarks}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content">
                                <div>
                                    <span class="grid-title">公司名称：</span>
                                    <span
                                        class="grid-label"
                                        style="width:auto"
                                    >{{formData.want.companyName}}</span>
                                    <span
                                        class="company-type"
                                        :class="{'factory':formData.want.companyType=='汽修厂','dealer':formData.want.companyType=='经销商','producer':formData.want.companyType=='生产商','insurance':formData.want.companyType=='保险公司'}"
                                    ></span>
                                </div>
                                <div style="padding-top:3px;">
                                    <span class="grid-title" style="vertical-align: top;">发布人：</span>
                                    <p class="grid-label" style="margin:0">
                                        <span
                                            class="grid-label"
                                            style="width:auto"
                                        >{{formData.want.name}}</span>
                                        <span class="phone-icon"></span>
                                        <span
                                            class="grid-label"
                                            style="width:auto"
                                        >{{formData.want.phone}}</span>
                                        <a
                                            href="javascript:;"
                                            :data-id="formData.want.userId"
                                            class="infomation chats-icon"
                                            :class="{'isPxt':isPxt,'isZply':isZply,'isSrgo':isSrgo}"
                                        ></a>
                                    </p>
                                </div>
                                <div>
                                    <span
                                        class="grid-tag"
                                        v-if="formData.want.invoiceTypeName"
                                    >{{formData.want.invoiceTypeName}}</span>
                                    <span
                                        class="grid-tag"
                                        v-if="formData.want.deliveryTime"
                                    >{{formData.want.deliveryTime}}</span>
                                    <span
                                        class="grid-tag"
                                        v-if="formData.want.pushTypeName"
                                    >{{formData.want.pushTypeName}}</span>
                                </div>
                                <div>
                                    <span
                                        class="grid-pic"
                                        @click="showWantPictures()"
                                        v-if="formData.want.pictures && formData.want.pictures.length>0"
                                    >查看图片</span>
                                    <span class="grid-pic" v-else>暂无图片</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content">
                                <div>
                                    <span class="grid-title" style="vertical-align: top;">收货信息：</span>
                                    <span class="grid-label">
                                        {{formData.want.receiveName}} {{formData.want.receivePhone}}
                                        <br>
                                        {{formData.want.receiveAreaName}} {{formData.want.receiveAddress}}
                                    </span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="line"></div>
            <div class="context" v-show="!fromList" v-if="formData.details.length>0">
                <!-- <div class="detail-check" v-for="item in formData.details" :key="item.receipt.id">
                    <p class="first-line">
                        <span
                            class="good-icon"
                            :class="{'spot-goods':(item.receipt.stockType=='现货'),'order-goods':(item.receipt.stockType=='订货')}"
                        ></span>
                        <span
                            class="first-line-span break-2 break-1"
                            :title="item.receipt.partNameShow"
                        >{{item.receipt.partNameShow}}</span>
                    </p>
                    <p class="second-line">
                        <span style="color: #777B87;" class="name">OE:</span>
                        <span
                            class="OE-name"
                            style="color: #1A2231;margin-left:8px;"
                        >{{item.receipt.partCode}}</span>
                    </p>
                    <p class="third-line">
                        <span class="quality" v-if="item.want.quality">
                            <span class="quality-icon"></span>
                            <span style="float:left;margin-left:4px">{{item.want.quality}}</span>
                        </span>
                        <span class="brand-span" v-if="item.receipt.brand">{{item.receipt.brand}}</span>
                    </p>
                    <p class="fourth-line">
                        <span class="price-name" style="color: #777B87;">单价：</span>
                        <span class="price-span" v-if="item.receipt.price">
                            ￥{{item.receipt.price.split(".")[0]}}
                            <span>.00</span>
                        </span>
                    </p>
                </div>-->

                <div class="tab-pro-list">
                    <div
                        style="margin-bottom:10px;"
                        class="tab-pro"
                        v-for="item in showDetails[currentPage-1]"
                        :key="item.receipt.id"
                    >
                        <div class="tab-pro-relative">
                            <span class="tab-pro-OE">名称：</span>
                            <span class="tab-pro-label">{{item.receipt.partName}}</span>
                        </div>
                        <div>
                            <span class="tab-pro-OE">OE：</span>
                            <span class="tab-pro-OE-con">{{item.receipt.partCode}}</span>
                        </div>
                        <!-- 这里不用for循环，之前循环的时候置入一个选中的对象，
                        放在遍历出来的detail里面-->
                        <div class="tab-pro-relative" v-if="item.chosed">
                            <!-- 循环遍历当前品质数组，判断是否选中，选中的再展示出价格来，最终选中的id传入确认订单页面 -->
                            <!-- <span
                                class="tab-pro-pri"
                                v-if="item.chosed.price==''||item.chosed.price=='0'||!item.chosed.price"
                            >-</span>
                            <span class="tab-pro-num" v-else>
                                ¥ {{item.chosed.price.split('.')[0]}}
                                <span
                                    class="tab-pro-num"
                                    v-if="item.chosed.price.includes('.')"
                                >.</span>
                                <span
                                    class="tab-pro-litte"
                                    v-if="item.chosed.price.includes('.')"
                                >{{item.chosed.price.split('.')[1]}}</span>
                            </span>-->
                            <div style="display: flex;align-items: center;">
                              <!-- 订货还是现货 -->
                              <img
                                  :src="require('../../../../assets/img/inquiry/tag-xianhuo.png')"
                                  v-if="item.chosed.stockType=='现货'"
                                  class="tab-pro-tag"
                                  alt="1"
                              >
                              <img
                                  :src="require('../../../../assets/img/inquiry/icon-dinghuo.png')"
                                  v-if="item.chosed.stockType=='订货'"
                                  class="tab-pro-tag"
                                  alt="2"
                              >
                              <!-- 展示配件品牌 -->
                              <span
                                  v-if="item.chosed.brand"
                                  style="border-radius:10px;font-size:12px;padding:2px 10px;background:#dbd9d5;color:#FDFCFC;"
                              >{{item.chosed.brand}}</span>
                            </div>
                        </div>
                        <!-- 这里循环用于展示品质列表 -->
                        <div class="tab-pro-relative">
                            <p class="tab-pro-pri" style="padding:5px 0;margin:0;">
                                品质
                                <span
                                    style="font-size:12px;color:red;padding-left:10px;"
                                    v-if="item.chosed && item.chosed.orderTime && item.chosed.stockType=='订货'"
                                >订货时长：{{item.chosed.orderTime}}天</span>
                            </p>
                            <div class="quality-tab">
                                <!-- 循环遍历品质列表   品质切换时切换上面对应的配件品牌 -->
                                <span
                                    class="quality-name"
                                    v-for="(qualityName,index) in item.qualityReceiptDetails"
                                    :class="{'chosed-quality':qualityName == item.chosed}"
                                    @click="choseQuality(item,qualityName)"
                                    :key="index"
                                >{{qualityName.quality}}(￥{{qualityName.showPrice}})</span>
                            </div>
                        </div>
                    </div>
                    <el-pagination
                        :class="{'isPxtPage':isPxt,'isZplyPage':isZply,'isSrgoPage':isSrgo}"
                        background=""
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="20"
                        layout="prev, pager, next"
                        :total="totalAmount"
                        v-if="totalAmount!=0"
                    ></el-pagination>
                </div>
                <div class="remarks-details">
                    <div class="remarks-top">
                        <p class="remarks-p">发货信息</p>
                    </div>
                    <div class="remarks-content">
                        <div class="remarks-address" style="margin-bottom:10px;">
                            <span
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >发货地区：</span>
                            <span
                                class="remarks-detail-span"
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >{{formData.address}}</span>
                        </div>
                        <div class="remarks-deliverTime" style="margin-bottom:10px;">
                            <span
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >发货时长：</span>
                            <span
                                class="remarks-detail-span"
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >{{formData.deliverTime}}天</span>
                        </div>
                        <div class="remarks-arrivalTime" style="margin-bottom:10px;">
                            <span
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >到货时长：</span>
                            <span
                                class="remarks-detail-span"
                                style="float:left;margin-top:5px;vertical-align: top;font-size:14px;"
                            >{{formData.arrivalTime}}天</span>
                        </div>
                    </div>
                </div>
                <div class="remarks-details">
                    <div class="remarks-top">
                        <p class="remarks-p">备注信息</p>
                    </div>
                    <div class="remarks-content">
                        <div class="remarks-img">
                            <span style="vertical-align: top;">图片：</span>
                            <el-image
                                v-for="(item,index) in formData.pictures"
                                style="width: 48px; height: 48px;margin-left:16px;"
                                :key="item"
                                :src="item"
                                fit="fill"
                                @click="showDetailPictures(index)"
                            ></el-image>
                        </div>
                        <div class="remarks-remark">
                            <span>备注：</span>
                            <span class="remarks-detail-span">{{formData.remarks}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 根据fromList判断是修改还是查看详情 为true时为修改 -->
            <div class="context quote-sub" v-show="fromList">
                <div
                    style="margin-bottom:10px;"
                    class="detail-update"
                    v-for="item in showDetails[currentPage-1]"
                    :key="item.receipt.id"
                >
                    <div class="detail-update-info">
                        <p class="qty-num">
                            <span class="as-qty">x</span>
                            <span class="qty">{{item.want.qty}}</span>
                        </p>
                        <p class="first-line break-2 break-1">{{item.receipt.partNameShow}}</p>
                        <p class="second-line">
                            <span style="color: #777B87;" class="name">OE:</span>
                            <span
                                class="OE-name"
                                style="color: #1A2231;margin-left:8px;"
                            >{{item.receipt.partCodeShow}}</span>
                        </p>
                        <p class="third-line">
                            <span class="quality" v-if="item.want.quality">
                                <span class="quality-icon"></span>
                                <span style="float:left;margin-left:4px">{{item.want.quality}}</span>
                            </span>
                            <span
                                class="brand-span"
                                v-if="item.receipt.brandShow"
                            >{{item.receipt.brandShow}}</span>
                        </p>
                    </div>
                    <div class="update-input">
                        <el-input
                            placeholder="请输入名称"
                            v-model="item.receipt.partName"
                            class="input-receipt-info"
                            :disabled="!formData.updatePartInfo"
                        >
                            <template slot="prepend">名称</template>
                        </el-input>
                        <el-input
                            placeholder="请输入OE号"
                            v-model="item.receipt.partCode"
                            class="input-receipt-info"
                            :disabled="!formData.updatePartInfo"
                        >
                            <template slot="prepend">OE</template>
                        </el-input>
                        <!-- 订货或者现货作为开关 -->
                        <div style="clear:both"></div>
                        <div
                            class="quality-list"
                            style="overflow:hidden;height:auto;position:relative;"
                            v-for="(qualityItem,index) in item.qualityReceiptDetails"
                            :key="index"
                        >
                            <!-- 每个品质对应有品牌 -->
                            <i
                                class="el-icon-delete"
                                style="position:absolute;top:8px;left:4px;cursor:pointer;font-size:15px;"
                                v-if="item.qualityReceiptDetails.length>1"
                                @click="deleteQuality(index,item)"
                            ></i>
                            <div style="float:left;position:relative;margin-left:21px;">
                                <div
                                    class="el-input-group__prepend"
                                    style="position:absolute;top:0;left:0;height:38px;line-height:38px;z-index:10;width:52px;"
                                >品质</div>
                                <el-select
                                    style="margin-left:0;padding-left:57px;width:200px;"
                                    class="input-receipt-info"
                                    v-model="qualityItem.quality"
                                    filterable
                                    placeholder="请选择品质"
                                    @change="getBrandList(item,index)"
                                >
                                    <el-option
                                        v-for="pinzhiOption in item.qualityList"
                                        :key="pinzhiOption.key"
                                        :label="pinzhiOption.value"
                                        :value="pinzhiOption.value"
                                        :disabled="pinzhiOption.isDisabled"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div style="float:left;position:relative;margin-left:21px;">
                                <div
                                    class="el-input-group__prepend"
                                    style="position:absolute;top:0;left:0;height:38px;line-height:38px;z-index:10;width:52px;"
                                >配件品牌</div>
                                <el-select
                                    style="margin-left:0;padding-left:57px;width:200px;"
                                    class="input-receipt-info"
                                    v-model="qualityItem.brand"
                                    filterable
                                    placeholder="请选择配件品牌"
                                >
                                    <el-option
                                        v-for="brandOption in qualityItem.brandList"
                                        :key="brandOption.value"
                                        :label="brandOption.value"
                                        :value="brandOption.value"
                                    ></el-option>
                                </el-select>
                            </div>
                            <div
                                class="input-receipt-info"
                                style="margin-left:0;border:0;margin-right:21px"
                            >
                                <div class="switch-order-spot">
                                    <span
                                        class="spot"
                                        :class="{'active':(qualityItem.stockType=='现货'),'isPxt':isPxt,'isZply':isZply,'isSrgo':isSrgo}"
                                        @click="changeStockType(qualityItem,'现货')"
                                    >现货</span>
                                    <span
                                        class="order"
                                        :class="{'active':(qualityItem.stockType=='订货'),'isPxt':isPxt,'isZply':isZply,'isSrgo':isSrgo}"
                                        @click="changeStockType(qualityItem,'订货')"
                                    >订货</span>
                                </div>
                            </div>
                            <el-input
                                placeholder="请输入价格"
                                v-model="qualityItem.price"
                                class="input-receipt-info"
                                @input="toFixdTwo(qualityItem)"
                            >
                                <template slot="prepend">销售单价</template>
                                <template slot="append">/元</template>
                            </el-input>
                            <el-input
                                v-if="qualityItem.stockType=='订货'"
                                placeholder="请输入订货时长"
                                v-model="qualityItem.orderTime"
                                class="input-receipt-info"
                                @input="checkInt(qualityItem,'list')"
                            >
                                <template slot="prepend">订货时长</template>
                                <template slot="append">/天</template>
                            </el-input>
                        </div>
                        <div
                            v-if="item.qualityReceiptDetails && item.qualityReceiptDetails.length<pinzhiSearchList.length"
                            class="add-more-quality"
                            @click="addPinzhi(item)"
                        >+添加更多品质报价</div>
                    </div>
                </div>
                <el-pagination
                    :class="{'isPxtPage':isPxt,'isZplyPage':isZply,'isSrgoPage':isSrgo}"
                    background=""
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="20"
                    layout="prev, pager, next"
                    :total="totalAmount"
                    v-if="totalAmount!=0"
                ></el-pagination>
                <div class="remarks-details">
                    <div class="remarks-top">
                        <p class="remarks-p">发货信息</p>
                    </div>
                    <div class="remarks-content">
                        <div class="remarks-address">
                            <span style="float:left;margin-top:5px;vertical-align: top;">发货地区：</span>
                            <el-cascader
                                class="input-receipt-info"
                                v-model="formData.addressList"
                                :options="addressOptions"
                                @change="handleChange"
                            ></el-cascader>
                        </div>
                        <div class="remarks-deliverTime">
                            <span style="float:left;margin-top:5px;vertical-align: top;">发货时长：</span>
                            <el-input
                                placeholder="请输入发货时长"
                                class="input-receipt-info"
                                v-model="formData.deliverTime"
                                @input="checkInt(formData)"
                            >
                                <template slot="append">/天</template>
                            </el-input>
                        </div>
                        <div class="remarks-arrivalTime">
                            <span style="float:left;margin-top:5px;vertical-align: top;">到货时长：</span>
                            <el-input
                                placeholder="请输入到货时长"
                                v-model="formData.arrivalTime"
                                class="input-receipt-info"
                                @input="checkInt(formData)"
                            >
                                <template slot="append">/天</template>
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="remarks-details">
                    <div class="remarks-top">
                        <p class="remarks-p">备注信息</p>
                    </div>
                    <div class="remarks-content">
                        <div class="remarks-img">
                            <span style="float:left;margin-top:5px;vertical-align: top;">图片：</span>
                            <!-- 这里是个上传插件 -->
                            <div class="col" style="margin-top:16px">
                                <el-upload
                                    action="#"
                                    ref="upload"
                                    list-type="picture-card"
                                    :file-list="files"
                                    :limit="10"
                                    :on-exceed="exceed"
                                    :multiple="true"
                                    :before-upload="beforeUpload"
                                    :on-preview="handlePicturePreview"
                                    :on-remove="handleRemoveOld"
                                    :http-request="qiniuLoad"
                                >
                                    <i slot="default" class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog title="图片预览" :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </div>
                        <div class="remarks-remark">
                            <span style="float:left;margin-top:12px;">备注：</span>
                            <div class="padding-10-0 note" style="float:left;width:999px;">
                                <textarea
                                    style="background: #FBFBFC;
                                    border: 1px solid #EDEFF1;border-radius: 4px;width:99%;
                                    margin-left:3px;"
                                    v-model="formData.remarks"
                                    class="form-control"
                                    cols="40"
                                    rows="4"
                                    maxlength="200"
                                    placeholder="请输入报价信息"
                                ></textarea>
                                <img
                                    class="clear-textarea"
                                    @click="clearRemarks"
                                    :src="require('../../../../assets/img/inquiry/icon-del.png')"
                                >
                                <div class="num-textarea">
                                    <span class="input-num">{{formData.remarks.length}}</span>
                                    <span>/</span>
                                    <span>200</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-save-sub" v-if="fromList && (formData.status==0||formData.status==1)">
            <!-- <div class="page-control">
                <span
                    class="mins control"
                    :disabled="currentPage==1"
                    :class="{'no-control':(currentPage==1)}"
                    @click="changePage(-1)"
                ><</span>
                <span class="now-page">{{currentPage}}/{{totalPage}}</span>
                <span
                    class="plus control"
                    :class="{'no-control':(currentPage==totalPage)}"
                    :disabled="currentPage==totalPage"
                    @click="changePage(1)"
                >></span>
            </div>-->
            <a
                class="sub-quote"
                @click="subQuote(1)"
                :class="{'isPxt':isPxt,'isZply':isZply,'isSrgo':isSrgo}"
            >提交报价单</a>
            <a
                class="save-quote"
                @click="subQuote(0)"
                :class="{'isPxtListBtn':isPxt,'isZplyListBtn':isZply,'isSrgoListBtn':isSrgo}"
            >保存</a>
            <a class="end-quote" @click="stopQuote(formData.wantCode)">终止报价</a>
        </div>
        <div class="demo-image__preview" style="width:0;height:0">
            <el-image style="width: 0px; height: 0px" :src="url" :preview-src-list="srcList"></el-image>
        </div>
        <div class="demo-image__preview_want" style="width:0;height:0">
            <el-image style="width: 0px; height: 0px" :src="wantUrl" :preview-src-list="wantSrcList"></el-image>
        </div>
    </el-drawer>
</template>
<script>
import $ from "jquery";
import { Loading } from "element-ui";
import request, { SERVICE_MODULE_MAP } from "@/utils/request";
import { BidService } from '../services'
const bidService = new BidService();
import { getAddressList,getPositionAreaById } from "@/utils/splicingData";
import { uploadImgFile } from '@/api/commonService';
export default {
  name: "QuoteListCtrl",
  data() {
    return {
      wantCode: "",
      drawer: false,
      num: 0,
      fromList: true, //fromList为true的时候，代表可以修改
      url: "",
      srcList: [],
      wantUrl: "",
      wantSrcList: [],
      formData: {
        want: {
          pictures: []
        },
        details: [],
        pictures: [],
        remarks: "",
        ordered: false,
        addressList: []
      },
      addressOptions: [],
      files: [],
      dialogImageUrl: "",
      dialogVisible: false,
      fileArry: [],
      isPxt: true,
      isZply: false,
      isSrgo: false,
      timer: {},
      picturesLength: 0,
      loadingInstance: {},
      pinzhiSearchList: [],
      qualityRedom: [],
      totalPage: 0,
      currentPage: 1,
      showDetails: [],
      totalAmount: 0,
      baseURL:""
    };
  },
  created() {
    // this.isPxt = window.siteData.isPxt;
    // this.isZply = window.siteData.isZply;
    // this.isSrgo = window.siteData.isSrgo;
    //获取地址列表
    this.addressOptions = getAddressList();
    window.addEventListener("setQuote", () => {
      this.pinzhiSearchList = [];
      this.drawer = true;
      this.fromList =
        sessionStorage.getItem("quoteList") == "fromList" ? true : false;
      this.wantCode = localStorage.getItem("wantCode");
      this.files = [];
      this.fileArry = [];
      //拿到之后请求接口，获取详情数据，详情没有数据代表第一次进来报价，有数据代表进来修改或者进来继续报价
      // 初始化获取品质列表,品质列表跟品牌列表挂钩，每次切换品质要对应获取品牌列表
      this.getPinzhiList();
    });
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // show(){
    //   this.pinzhiSearchList = [];
    //   this.drawer = true;
    // },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.brandListInit();
    },
    brandListInit() {
      //获取当前页的品质列表，以供判断是否选中
      if (this.fromList) {
        for (let detail of this.showDetails[this.currentPage - 1]) {
          //这里拼接每一个detail的品质列表
          //   this.setQualityList(detail);
          if (
            detail.qualityReceiptDetails &&
            detail.qualityReceiptDetails.length > 0
          ) {
            for (let i in detail.qualityReceiptDetails) {
              this.getBrandList(detail, i);
            }
          }
        }
      }
      this.$forceUpdate();
    },
    // changePage(chaneged) {
    //   this.currentPage = this.currentPage + chaneged;
    //   this.brandListInit();
    //   this.$forceUpdate();
    // },
    getDetail() {
      this.totalAmount = 0;
      let that = this;
      if (this.wantCode) {
        bidService.getBidTableDetail(this.wantCode).then(res => {
            // 详情默认会有一条返回的品质，不需要自己加，需要拼接地址id
            if (res.deliverAreaId) {
              let address = getPositionAreaById(
                res.deliverAreaId,
                this.addressOptions
              );
              res.addressList = address.position;
              res.address = address.name;
            }
            if (
              res.want.pictures &&
              res.want.pictures != null &&
              res.want.pictures.length > 0
            ) {
              this.wantUrl = res.want.pictures[0];
              this.wantSrcList = res.want.pictures;
            } else {
              res.want.pictures = [];
            }
            if (res.pictures && res.pictures.length > 0) {
              this.srcList = res.pictures;
              this.url = res.pictures[0];
              for (const img of res.pictures) {
                this.files.push({
                  url: img,
                  name: img,
                  // saveUrl: img
                });
                this.fileArry.push({
                  url: img,
                  name: img,
                  // saveUrl: img
                });
              }
            }
            if (res.pictures == null) {
              res.pictures = [];
            }
            //如果是查看详情，拼接品质选中
            if (!this.fromList) {
              for (let item of res.details) {
                item.chosed = item.qualityReceiptDetails[0];
                //置入展示用的每个品质的单价
                if (
                  item.qualityReceiptDetails &&
                  item.qualityReceiptDetails.length > 0
                ) {
                  for (let qualityItem of item.qualityReceiptDetails) {
                    if (qualityItem.price || qualityItem.price == 0) {
                      qualityItem.showPrice = qualityItem.price;
                    } else {
                      qualityItem.showPrice = "-";
                    }
                  }
                }
              }
            }
            if (this.fromList) {
              ///在这里需要在每个details中放入一个品质列表，以供判断是否有选中
              if (res.details && res.details.length > 0) {
                for (let detail of res.details) {
                  //这里拼接每一个detail的品质列表
                  this.setQualityList(detail);
                  //   if (
                  //     detail.qualityReceiptDetails &&
                  //     detail.qualityReceiptDetails.length > 0
                  //   ) {
                  //     for (let i in detail.qualityReceiptDetails) {
                  //       this.getBrandList(detail, i);
                  //     }
                  //   }
                }
              }
            }

            res.want.remainTimeStr = "";
            this.formData = res;
            //请求完成之后修改展示用的name，并且拼接时间
            if (this.formData.details && this.formData.details.length > 0) {
              this.showFormDataWords();
            }
            this.countDown();
            //切分数组，用来做分页展示
            //清空展示用的数据
            this.showDetails = [];
            this.currentPage = 1;
            let splitDetails = JSON.parse(
              JSON.stringify(this.formData.details)
            );
            this.totalAmount = splitDetails.length;
            this.totalPage = Math.ceil(splitDetails.length / 20);
            //切分数组
            for (let i = 0; i < this.totalPage; i++) {
              this.showDetails.push(
                this.formData.details.slice(i * 20, (i + 1) * 20)
              );
            }
            this.brandListInit();
          // } else {
          //   this.$alert(res.data.message, "提示", {
          //     confirmButtonText: "确定"
          //   });
          // }
        })
      }
      this.$forceUpdate();
    },
    setQualityList(detail) {
      let that = this;
      detail.qualityList = [];
      for (let item of this.pinzhiSearchList) {
        let length = this.qualityRedom.length;
        if (length == 0) {
          this.qualityRedom.push(0);
        } else {
          this.qualityRedom.push(this.qualityRedom[length - 1] + 1);
        }
        detail.qualityList.push({
          value: item.value,
          id: item.id,
          key: that.qualityRedom[length - 1] + item.value
        });
      }
      this.$forceUpdate();
    },
    showWantPictures() {
      this.wantUrl = this.wantSrcList[0];
      $(".demo-image__preview_want .el-image__preview").click();
    },
    showDetailPictures(index) {
      this.url = this.srcList[index];
      $(".demo-image__preview .el-image__preview").click();
    },
    Watchorder() {
      window.location.href = "#/union_sales?wantCode=" + this.wantCode;
      this.drawer = false;
    },
    changeStockType(item, type) {
      item.stockType = type;
      if (type == "订货") {
        item.orderTime = 3;
      } else {
        delete item.orderTime;
      }
      this.$forceUpdate();
    },
    beforeUpload(file) {
      //上传之前
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      //加上上传数量
      this.picturesLength += 1;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      //   if (!isLt2M) {
      //     this.$message.error("图片大小不能超过 2MB!");
      //     return false;
      //   }
    },
    exceed() {
      this.$message.error("图片已超出最大个数限制!");
    },
    handlePicturePreview(file) {//点击放大镜按钮
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemoveOld: function(file, fileList) {
      let that = this;
      this.fileArry.forEach((item, index) => {
        if (item.uid == file.uid) {
          that.formData.pictures.splice(index, 1);
          that.fileArry.splice(index, 1);
          this.picturesLength = this.picturesLength - 1;
        } else if (item.url == file.url) {
          that.formData.pictures.splice(index, 1);
          that.fileArry.splice(index, 1);
          this.picturesLength = this.picturesLength - 1;
        }
      });
    },
    handleRemove (file) {
      const fileData = this.files;
      const findIndex = fileData.findIndex(item => {
        return item.uid === file.uid || item.saveUrl === file.saveUrl;
      })
      if(findIndex !== -1) {
        fileData.splice(findIndex, 1);
      }
    },
    qiniuLoad(params) {
      this.loadingInstance = Loading.service({ fullscreen: true });
      const file = params.file;
      uploadImgFile({
        file
      })
        .then(res => {
          if (res && res.length) {
            res.forEach(url => {
              this.formData.pictures.push(url);
              this.fileArry.push({
                uid: params.file.uid,
                url
              });
            })
          } else {
            this.$message.warning("图片上传失败");
          }
          this.loadingInstance.close();
        })
        .catch(() => {
          this.$message.warning("图片上传失败");
          this.loadingInstance.close();
        });
    },
    clearRemarks() {
      //清空备注
      this.formData.remarks = "";
    },
    stopQuote(code) {
      this.$prompt("终止原因", "终止报价", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea"
      })
        .then(({ value }) => {
          request({
            method: "post",
            baseURL: SERVICE_MODULE_MAP.united,
            url: "/wants-v2/receipts/receiver/offer",
            data: {
              type: -1,
              wantCode: code,
              statusRemarks: value
            }
          }).then(() => {
            this.$message({
              type: "success",
              message: "终止成功!"
            });
            window.resetSetItem("refreshList");
            this.drawer = false;
          }).catch(err => {
            if(err.message) {
              this.$alert(err.message, "提示", {
                confirmButtonText: "确定"
              });
            }
            window.resetSetItem("refreshList");
            this.drawer = false;
          });
        })
        .catch(() => {});
    },
    subQuote(type) {
      let postData = {};
      postData.qualityDetails = [];
      //将展示用的showDetails拼接成上传用的details
      this.formData.details = [];
      if (this.showDetails && this.showDetails.length) {
        for (let showDetail of this.showDetails) {
          this.formData.details = this.formData.details.concat(showDetail);
        }
      }
      //拼接多品质报价的details
      if (this.formData.details && this.formData.details.length > 0) {
        for (let detail of this.formData.details) {
          let putDetails = {};
          putDetails.partCode = detail.receipt.partCode;
          putDetails.partName = detail.receipt.partName;
          putDetails.wantDetailId = detail.want.wantDetailId;
          if (
            detail.qualityReceiptDetails &&
            detail.qualityReceiptDetails.length > 0
          ) {
            for (let quality of detail.qualityReceiptDetails) {
              // 判断orderTime是否有值
              if (quality.orderTime == "") {
                this.$alert("订货时长不能为空", "提示", {
                  confirmButtonText: "确定"
                });
                return false;
              } else if (quality.orderTime) {
                //订货时间转int
                quality.orderTime = Number(quality.orderTime);
              }
              //判断价格为空传null给后台
              if (quality.price == "" || !quality.price) {
                quality.price = null;
              } else {
                quality.price = Number(quality.price);
              }
            }
            putDetails.details = detail.qualityReceiptDetails;
            //循环去除brandList
            for (let cutBrandList of putDetails.details) {
              delete cutBrandList.brandList;
            }
          }
          postData.qualityDetails.push(putDetails);
        }
      }
      postData.pictures = this.formData.pictures;
      // postData.pictures = this.files.map(item => item.saveUrl);
      postData.remarks = this.formData.remarks;
      postData.type = type;
      postData.wantCode = this.formData.wantCode;
      postData.deliverAreaId = this.formData.deliverAreaId;
      postData.deliverTime = Number(this.formData.deliverTime);
      postData.arrivalTime = Number(this.formData.arrivalTime);
      if (
        !postData.deliverAreaId ||
        !postData.deliverTime ||
        !postData.arrivalTime
      ) {
        this.$alert("请完善发货信息", "提示", {
          confirmButtonText: "确定"
        });
        return false;
      }
      if (type == 1) {
        this.$confirm("您确认提交报价单吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.toSubQuote(postData);
          })
          .catch(() => {});
      } else {
        this.toSubQuote(postData);
      }
    },
    toFixdTwo(quality) {
      //保留两位小数
      if (quality.price.match(/\d+(\.\d{0,2})?/)) {
        quality.price = quality.price.match(/\d+(\.\d{0,2})?/)[0];
      } else {
        quality.price = "";
      }
    },
    checkInt(item, isList) {
      if (isList) {
        item.orderTime = item.orderTime.replace(/[^0-9]/g, "");
      } else {
        item.deliverTime = item.deliverTime.replace(/[^0-9]/g, "");
        item.arrivalTime = item.arrivalTime.replace(/[^0-9]/g, "");
      }
      this.$forceUpdate();
    },
    toSubQuote(postData) {
      request({
        method: "post",
        baseURL: SERVICE_MODULE_MAP.united,
        url: "/wants-v2/receipts/receiver/offer",
        data: postData
      }).then(() => {
        window.resetSetItem("refreshList");
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        if (postData.type == 1) {
          this.drawer = false;
        } else {
          this.formData.status = 1;
          this.formData.statusName = "报价中";
        }
        this.$emit('refresh');
      });
    },
    countDown() {
      let self = this;
      clearInterval(this.timer);
      this.timer = setInterval(function() {
        self.formData.want.expire -= 1;
        let t = self.formData.want.expire;
        if (t > 0) {
          let day = Math.floor(t / 86400);
          let hour = Math.floor((t / 3600) % 24);
          let min = Math.floor((t / 60) % 60);
          let sec = Math.floor(t % 60);
          day = day < 10 ? "0" + day : day;
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          format = `${day}天${hour}：${min}：${sec}`;
          self.formData.want.remainTimeStr = format;
        } else {
          // 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
          let flag = self.formData.want.expire <= 0;
          if (flag) {
            clearInterval(self.timer);
          }
          self.formData.want.remainTimeStr = `00：00：00`; // 结束文案
        }
      }, 1000);
      self.$forceUpdate();
    },
    showFormDataWords() {
      for (let item of this.formData.details) {
        item.receipt.partCodeShow = item.receipt.partCode;
        item.receipt.partNameShow = item.receipt.partName;
        item.receipt.brandShow = item.receipt.brand;
      }
    },
    addPinzhi(item) {
      // 添加品质，先判断是否超过当前请求的品质列表长度
      //判断是否有品质未填报价，没填不让添加
      let hasNull = false;
      for (let quality of item.qualityReceiptDetails) {
        if (quality.price == "" || !quality.price) {
          hasNull = true;
        }
      }
      if (hasNull) {
        this.$alert("请先对当前品质报价", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        //判断当前哪个品质可默认选中，默认选中第一个可选的品质
        let pushObj = {
          id: 0,
          stockType: "现货",
          brand: "",
          price: "",
          quality: ""
        };
        for (let qualityItem of item.qualityList) {
          if (!qualityItem.isDisabled) {
            pushObj.quality = qualityItem.value;
            break;
          }
        }
        item.qualityReceiptDetails.push(pushObj);
        this.getBrandList(item, item.qualityReceiptDetails.length - 1);
      }
      this.$forceUpdate();
    },
    deleteQuality(index, detail) {
      detail.qualityReceiptDetails.splice(index, 1);
      this.getBrandList(detail, index, true);
    },
    getPinzhiList() {
      //获取品质列表
      let _this = this;
      bidService.getPinzhiList().then(res => {
        if (res && res.length > 0) {
          for (let item of res) {
            _this.pinzhiSearchList.push({
              value: item.name,
              id: item.id
            });
          }
          _this.getDetail();
        }
      })
    },
    getBrandList(details, index, isDelete) {
      //同时判断当前有哪些已经被选中，置入isDisabled属性
      for (let qualityItem of details.qualityList) {
        qualityItem.isDisabled = false;
        //如果是删除状态，则不请求brandList
        if (!isDelete) {
          if (
            details.qualityReceiptDetails[index].quality == qualityItem.value
          ) {
            this.axiosBrandList(
              qualityItem.id,
              details.qualityReceiptDetails[index]
            );
          }
        }
        for (let detail of details.qualityReceiptDetails) {
          if (detail.quality == qualityItem.value) {
            qualityItem.isDisabled = true;
          }
        }
      }
      this.$forceUpdate();
    },
    axiosBrandList(id, quality) {
      quality.brandList = [];
      //   quality.brand = "";
      request({
        method: "get",
        url: SERVICE_MODULE_MAP.united + `/athena/brands/by-insurance-cert/${id}`
      }).then(res => {
        if (res && res.length) {
          let hasBrand = false;
          for (let item of res) {
            quality.brandList.push({
              value: item,
              id: item
            });
            if (item == quality.brand) {
              hasBrand = true;
            }
          }
          if (!hasBrand) {
            quality.brand = "";
          }
          // debugger;
          //默认选中第一项
          // quality.brand = quality.brandList[0].value;
        } else {
          quality.brand = "";
        }
      });
      this.$forceUpdate();
    },
    //获取地址，获取到一个数组，是省市区的id组合，现在只需要获取最后一个地址就行
    handleChange(value) {
      if (value && value.length == 3) {
        this.formData.deliverAreaId = value[2];
      }
    },
    choseQuality(item, quality) {
      item.chosed = quality;
      this.$forceUpdate();
    }
  }
};
</script>
<style  lang="less" scoped>
.content {
  font-family: PingFang-SC-Medium;
  text-align: left;
  margin-bottom: 81px;
  .content-top {
    margin: 0 46px 0 20px;
    .top-title {
      height: 63px;
      border-bottom: 1px solid #dddfe7;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .top-title-tag {
        position: relative;
        left: -25px;
        font-weight: bolder;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        display: inline-block;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        background-size: 100% 100%;
        &.isPxtTag {
          background-image: url("../../../../assets/img/inquiry/tag-detail-pxt.png");
        }
        &.isZplyTag {
          background-image: url("../../../../assets/img/inquiry/tag-detail-title.png");
        }
        &.isSrgoTag {
          background-image: url("../../../../assets/img/inquiry/tag-detail-pxt.png");
        }
      }
      .top-title-time {
        font-size: 12px;
        color: #1a2231;
        letter-spacing: -0.29px;
        text-align: center;
      }
      .top-title-time::before {
        content: "";
        background: url("../../../../assets/img/inquiry/icon-shizhong.png") no-repeat;
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        margin-right: 4px;
      }
      .to_deal_order {
        font-size: 12px;
        float: right;
        margin-right: 20px;
        color: #777b87;
        margin-left: auto;
      }
      .top-title-right {
        margin-left: auto;
        font-size: 14px;
        color: #0C8666;
        letter-spacing: 0;
        text-align: right;
        cursor: pointer;
        &.isZply {
          color: #0c8666;
        }
        &.isPxt {
          color: #00a8ea;
        }
        &.isSrgo {
          color: #5784fe;
        }
      }
    }
    .top-info {
      margin-top: 10px;
      min-height: 140px;
      border: 1px solid #dddfe7;
      .grid-content {
        text-align: left;
        margin: 10px 0 20px 20px;
        .grid-title {
          line-height: 22px;
          display: inline-block;
          font-size: 14px;
          color: #777b87;
          letter-spacing: -0.34px;
          vertical-align: middle;
        }
        .grid-label {
          font-size: 14px;
          color: #1a2231;
          letter-spacing: -0.34px;
          line-height: 22px;
          display: inline-block;
          width: 228px;
        }
        .grid-mark {
          font-size: 12px;
          color: #777b87;
          letter-spacing: -0.29px;
          line-height: 22px;
        }
        .grid-tag {
          font-size: 12px;
          line-height: 20px;
          color: #777b87;
          padding: 0 11px;
          border-radius: 4px;
          background: rgba(221, 223, 231, 0.3);
        }
        .grid-pic {
          font-size: 12px;
          color: #1a2231;
          letter-spacing: -0.29px;
          cursor: pointer;
        }
      }
    }
  }
  .context {
    margin: 0 46px 0 20px;
    height: auto;
    overflow: hidden;
    .tab-pro-list {
      height: auto;
      overflow: auto;
      .tab-pro {
        min-height: 150px;
        background: #ffffff;
        border: 1px solid #dcdee6;
        border-radius: 1px;
        margin-top: 20px;
        padding: 10px 20px 0 20px;
        &&:last-child {
          margin-bottom: 20px;
        }
        .disabled {
          color: #aaacb7;
        }
        .tab-pro-tag {
          width: 34px;
          height: 20px;
          margin-right:8px;
        }
        .tab-pro-label {
          font-size: 14px;
          color: #1a2231;
        }
        .tab-pro-OE {
          font-size: 12px;
          color: #777b87;
        }
        .tab-pro-OE-con {
          font-size: 12px;
          color: #1a2231;
        }
        .tab-pro-pritiy {
          border: 1px solid rgba(9, 217, 122, 0.3);
          border-radius: 9px;
          font-size: 12px;
          line-height: 14px;
          color: #07b364;
          padding: 0 6px 0 3px;
          &::before {
            content: "";
            display: inline-block;
            width: 14px;
            height: 14px;
            margin: -3px 0;
            background: url("../../../../assets/img/inquiry/icon-pingzhi.png")
              no-repeat;
            background-size: 14px 14px;
          }
        }
        .tab-pro-factory {
          font-size: 12px;
          color: #189ce3;
          padding: 0 7px;
          border: 1px solid rgba(39, 179, 255, 0.3);
          border-radius: 4px;
        }
        .tab-pro-pri {
          font-size: 12px;
          color: #777b87;
        }
        .tab-pro-num {
          font-size: 12px;
          color: #f43540;
          font-weight: bold;
        }
        .tab-pro-litte {
          font-size: 10px;
          color: #f43540;
        }
        .tab-pro-relative {
          position: relative;
        }
        .right {
          position: absolute;
          right: 0;
          .tab-pro-red {
            font-size: 12px;
            color: #f43540;
          }
          .select {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
    .detail-check {
      width: 320px;
      height: 160px;
      border: 1px solid #dcdee6;
      float: left;
      margin: 19px 19px 0 0;
      overflow: hidden;
      p {
        padding-left: 20px;
        margin: 0;
        span {
          float: left;
        }
      }
      .good-icon {
        width: 34px;
        height: 20px;
        background-size: 100% 100%;
      }
      .spot-goods {
        background-image: url("../../../../assets/img/inquiry/tag-xianhuo.png");
      }
      .order-goods {
        background-image: url("../../../../assets/img/inquiry/icon-dinghuo.png");
      }
      .first-line {
        margin-top: 20px;
        overflow: hidden;
        .first-line-span {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #1a2231;
          letter-spacing: -0.34px;
          margin-left: 4px;
        }
      }
      .second-line {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        letter-spacing: -0.29px;
        margin: 4px 0;
        overflow: hidden;
      }
      .third-line {
        overflow: hidden;
        .quality {
          border: 1px solid rgba(9, 217, 122, 0.3);
          border-radius: 9px;
          padding: 1px 6px 1px 1px;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #07b364;
          letter-spacing: -0.36px;
          float: left;
          .quality-icon {
            width: 14px;
            height: 14px;
            float: left;
            background-image: url("../../../../assets/img/inquiry/icon-pingzhi.png");
            background-size: 100% 100%;
          }
        }
        .brand-span {
          margin-left: 5px;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #189ce3;
          letter-spacing: -0.29px;
          text-align: center;
          padding: 1px 6px;
          border: 1px solid rgba(39, 179, 255, 0.3);
          border-radius: 4px;
        }
      }
      .fourth-line {
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        letter-spacing: -0.29px;
        margin: 4px 0;
        overflow: hidden;
        .price-span {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #f43540;
          letter-spacing: -0.34px;
          line-height: 14px;
          span {
            font-size: 10px;
            float: none;
          }
        }
      }
    }
    .remarks-details {
      padding: 20px 0 0;
      overflow: hidden;
      clear: both;
      .remarks-top {
        margin-bottom: 18px;
        overflow: hidden;
        .remarks-p {
          margin: 0;
          float: left;
          padding-left: 6px;
          border-left: 4px solid #1EA985;
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #1a2231;
          letter-spacing: -0.38px;
        }
      }
      .remarks-content {
        .remarks-address {
          overflow: hidden;
        }
        .remarks-deliverTime {
          overflow: hidden;
        }
        .remarks-arrivalTime {
          overflow: hidden;
        }
        .input-receipt-info {
          float: left;
          width: 226px;
          height: 30px;
          margin-left: 21px;
          background: #ffffff;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .remarks-img {
          margin-bottom: 20px;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #1a2231;
            letter-spacing: -0.34px;
          }
        }
        .remarks-remark {
          overflow: hidden;
          span {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #1a2231;
            letter-spacing: -0.34px;
          }
        }
      }
    }
    .detail-check:nth-child(3n) {
      margin-right: 0;
    }

    .detail-update {
      overflow: hidden;
      height: auto;
      background: #ffffff;
      border: 1px solid #dcdee6;
      margin-top: 20px;
      .detail-update-info {
        width: 260px;
        height: 102px;
        background: #ffffff;
        border: 1px solid #dcdee6;
        margin: 21px 0 21px 20px;
        float: left;
        position: relative;
        .qty-num {
          height: 20px;
          position: absolute;
          right: 20px;
          top: 62px;
          margin: 0;
          .as-qty {
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            color: #aaacb7;
            letter-spacing: -0.34px;
            text-align: right;
          }
          .qty {
            font-family: DINAlternate-Bold;
            font-size: 14px;
            color: #001000;
            letter-spacing: -0.34px;
            text-align: right;
            line-height: 20px;
          }
        }
        .first-line {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #1a2231;
          letter-spacing: -0.34px;
          margin: 20px 0 0 20px;
        }
        .second-line {
          margin: 4px 0 3px 20px;
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #1a2231;
          letter-spacing: -0.29px;
        }

        .third-line {
          overflow: hidden;
          margin-left: 20px;
          .quality {
            border: 1px solid rgba(9, 217, 122, 0.3);
            border-radius: 9px;
            padding: 1px 6px 1px 1px;
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #07b364;
            letter-spacing: -0.36px;
            float: left;
            .quality-icon {
              width: 14px;
              height: 14px;
              float: left;
              background-image: url("../../../../assets/img/inquiry/icon-pingzhi.png");
              background-size: 100% 100%;
            }
          }
          .brand-span {
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            color: #189ce3;
            letter-spacing: -0.29px;
            text-align: center;
            padding: 1px 6px;
            border: 1px solid rgba(39, 179, 255, 0.3);
            border-radius: 4px;
          }
        }
      }
      .update-input {
        height: auto;
        margin: 32px 0 0;
        float: left;
        max-width: 650px;
        .input-receipt-info {
          float: left;
          width: 258px;
          height: 30px;
          margin-left: 21px;
          background: #ffffff;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .switch-order-spot {
          background: #f3f5f8;
          border: 1px solid #dddfe7;
          border-radius: 4px;
          float: left;
          margin: 0 0 0 21px;
          width: 111px;
          height: 30px;
          span {
            width: 52px;
            height: 24px;
            float: left;
            background: #f3f5f8;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #777b87;
            letter-spacing: -0.34px;
            border-radius: 4px;
            line-height: 24px;
            text-align: center;
            cursor: pointer;
          }
          .active {
            color: #ffffff;
            &.isPxt {
              background-color: #00a8e7 !important;
            }
            &.isZply {
              background-color: #0c8666 !important;
            }
            &.isSrgo {
              background-color: #5784fe !important;
            }
          }
          .spot {
            margin: 3px 0 0 4px;
          }
          .order {
            margin-top: 3px;
          }
        }
        .add-more-quality {
          cursor: pointer;
          margin-left: 21px;
          width: 473px;
          border: 1px dotted #d99647;
          padding: 5px 0;
          text-align: center;
          background: #fdf0df;
          color: #e58238;
          margin-bottom: 10px;
        }
      }
    }
  }
  .line {
    height: 1px;
    width: 100%;
    background: #dddfe7;
    margin-top: 16px;
  }
}
.break-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.break-1 {
  -webkit-line-clamp: 1;
}
.bottom-save-sub {
  background: #ffffff;
  width: 1080px;
  height: 80px;
  border-top: 1px solid #dddfe7;
  position: fixed;
  bottom: 0;
  z-index: 10;
  a {
    width: 120px;
    height: 40px;
    border-radius: 4px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    letter-spacing: 0.06px;
    text-align: center;
    line-height: 40px;
    float: right;
    margin: 20px 20px 0 0;
    cursor: pointer;
  }
  .sub-quote {
    color: #ffffff;
    :hover {
      color: #ffffff;
    }
    &.isPxt {
      background-color: #00a8e7 !important;
    }
    &.isZply {
      background-color: #0c8666 !important;
    }
    &.isSrgo {
      background-color: #5784fe !important;
    }
  }
  .save-quote {
    border: 1px solid rgba(30,169,133, 0.4);
    color: #0C8666;
  }
  .end-quote {
    border: 1px solid #dddfe7;
    color: #1a2231;
  }
  .page-control {
    height: 40px;
    font-size: 14px;
    letter-spacing: 0.06px;
    text-align: center;
    line-height: 40px;
    float: left;
    margin: 20px 0 0 20px;
    .control {
      border-radius: 50%;
      border: 1px solid #0C8666;
      width: 30px;
      height: 30px;
      color: grey;
      display: inline-block;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &.isZply {
        color: #0c8666;
      }
      &.isPxt {
        color: #00a8ea;
      }
      &.isSrgo {
        color: #5784fe;
      }
    }
    .no-control {
      color: #777b87;
      border-color: #777b87;
    }
  }
}
.company-type {
  display: inline-block;
  width: 40px;
  height: 20px;
  background-size: 100% 100%;
  vertical-align: middle;
}
.factory {
  background-image: url("../../../../assets/img/inquiry/tag-qixiu.png");
}
.dealer {
  background-image: url("../../../../assets/img/inquiry/tag-jingxiao.png");
}
.producer {
  background-image: url("../../../../assets/img/inquiry/tag-shengchanchangshang.png");
}
.insurance {
  background-image: url("../../../../assets/img/inquiry/tag-insurance.png");
}
.phone-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url("../../../../assets/img/inquiry/icon-phone.png");
  background-size: 100% 100%;
  vertical-align: middle;
}
.isPxtListBtn {
  color: #00a8e7 !important;
  border: 1px solid rgba(0, 168, 231, 0.4) !important;
}
.isZplyListBtn {
  color: #0c8666 !important;
  border: 1px solid rgba(30, 169, 133, 0.4) !important;
}
&.isSrgoListBtn {
  color: #5784fe !important;
  border: 1px solid rgba(87, 132, 254, 0.4) !important;
}
.infomation {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-size: 100% 100%;
  &.isPxt {
    background-image: url("../../../../assets/img/inquiry/icon-talk-pxt.png");
  }
  &.isZply {
    background-image: url("../../../../assets/img/inquiry/icon-talk.png");
  }
  &.isSrgo {
    background-image: url("../../../../assets/img/inquiry/icon-talk-pxt.png");
  }
  position: relative;
  top: 3px;
}
.quality-tab {
  //   height: 31px;
  //   overflow: hidden;
  .quality-name {
    display: inline-block;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 12px;
    padding: 2px 15px;
    margin-right: 10px;
    border-radius: 10px;
    color: #333333;
    background: #f5f5f5;
  }
  .chosed-quality {
    color: #ed3947;
    background: #f7e9ea;
    border: 1px solid #ed3947;
  }
}
/deep/ .el-input__suffix {
  display: none;
}
/deep/.el-tabs__item {
  background: #f3f5f8;
  width: 200px;
  height: 70px;
  padding: 15px 20px;
  word-wrap: break-word;
  line-height: 20px;
  position: relative;
  text-overflow: ellipsis;
}
/deep/.el-tabs--left .el-tabs__active-bar.is-left,
/deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  left: 0;
  width: 4px;
  margin-top: 20px;
  height: 28px !important;
  background: #1EA985;
}
/deep/.el-tabs__item.is-active {
  color: #0C8666;
  background: #ffffff;
}
/deep/.el-tabs__item:hover {
  color: #0C8666;
}
/deep/ .el-tabs__nav {
  white-space: pre-wrap !important;
  height: calc(100vh - 284px);
  background: #f3f5f8;
}
/deep/.el-drawer__header {
  display: none;
}
/deep/.v-modal {
  background-color: rgba(26, 34, 49, 0.4);
  z-index: 999 !important;
}
// /deep/.el-drawer__wrapper {
//   z-index: 1000 !important;
// }
/deep/.el-input-group__prepend {
  width: 57px;
  text-align: left;
  font-family: PingFang-SC-Medium;
  font-size: 12px;
  color: #777b87;
  letter-spacing: -0.29px;
  line-height: 22px;
  padding: 0 0 0 4px;
  background: #f1f2f5;
}
/deep/.el-upload-list--picture-card .el-upload-list__item,
/deep/.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/.el-drawer__body {
  overflow-y: scroll;
}
/deep/.el-input-group__append {
  background: #ffffff;
  padding: 0 10px;
}
</style>
