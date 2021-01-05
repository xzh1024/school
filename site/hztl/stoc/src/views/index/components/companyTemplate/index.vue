<template>
  <ht-card title="推荐商家" describe="不光是品质还有服务">
    <div slot="after-title" class="title-right">
      <ht-pagination
        :currentPage.sync="queryParams.page"
        :total="total.size"
        :pageCount="total.page"
        @current-change="getDatas"
      ></ht-pagination>
      <el-button type="primary" size="mini" round @click="handlePath"
        >进入商家黄页</el-button
      >
    </div>
    <div class="company-list clearfix">
      <template v-for="(item, index) in list">
        <company-double
          v-if="index === 0"
          :key="item.companyId"
          :info="item"
        ></company-double>
        <company-item
          v-if="index > 0 && index < 9"
          :key="item.companyId"
          :info="item"
        ></company-item>
      </template>
    </div>
  </ht-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { HtCard, HtPagination } from "@/components/hztl";
import CompanyItem from "@/views/company/components/companyItem/index";
import CompanyDouble from "@/views/company/components/companyItem/companyDouble";
import { PageResponseResult } from "@/common/interface/commonInterface";
import {
  CompanyModel,
  CompanyParams
} from "@/common/interface/companyInterface";
import { CompanyService } from "@/common/services/companyService";
const companyService = new CompanyService();

@Component({
  name: "CompanyTemplate",
  components: {
    HtCard,
    HtPagination,
    CompanyItem,
    CompanyDouble
  }
})
export default class CompanyTemplate extends Vue {
  @Prop() params!: CompanyParams;

  protected list: CompanyModel[] = [
    // {
    //   companyId: 1621,
    //   name: "研发",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE=",
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/baa20a3df563723e82599537986b4a3574cd8303.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:Rin6xnXFej9zitgI1NEqBeSTEHw="
    //   ],
    //   description: "",
    //   contacts: "谢紫韩",
    //   phone: "18090202066",
    //   contacts1: "xzh",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "2",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/f610371ef112e4055d67cb1e970eae198d2266fa.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:5fqjbavLQGY8yAK8-nxHSpKH8uI="
    //   ],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: ["本田", "日产"],
    //   areaId: 2933,
    //   address: "思锐",
    //   areas: [],
    //   areaName: "四川省/成都市/双流区"
    // },
    // {
    //   companyId: 1618,
    //   name: "大发公司",
    //   pics: [],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 100,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 101,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 102,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 103,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 104,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 105,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 106,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 107,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 108,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 109,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // },
    // {
    //   companyId: 110,
    //   name: "大发公司",
    //   pics: [
    //     "https://test.qiniu.hztl3.com/qa2/img/user/4912/ace5070c896cc9d195124573f48568122de50658.jpg?e=1608184359&token=7-V8DyRk17v8_u71-a9fUh2R5HygnMXcgbzW07SQ:65xQ9qxkckx1LCCwgfosfaEMIPE="
    //   ],
    //   description: "",
    //   contacts: "大发哥",
    //   phone: "13990001234",
    //   contacts1: "",
    //   contacts2: "",
    //   contacts3: "",
    //   phone1: "",
    //   phone2: "",
    //   phone3: "",
    //   wechat: "",
    //   wechatPics: [],
    //   qq: "",
    //   qqPics: [],
    //   vehBrands: [],
    //   areaId: 3281,
    //   address: "资料地点",
    //   areas: [],
    //   areaName: "天津市/天津市/河东区"
    // }
  ];

  protected queryParams: CompanyParams = {
    page: 1,
    pageSize: 9,
    orderByAreas: ""
  };

  protected total = {
    size: 0,
    page: 1
  };

  protected handlePath() {
    this.$router.push({ path: "/company" });
  }

  public getDatas() {
    const params = {
      ...this.queryParams,
      ...this.params
    };
    companyService
      .getCompanies(params)
      .then((res: PageResponseResult<CompanyModel[]>) => {
        if (res) {
          this.list = res.rows || [];
          this.total.size = res.totalSize || 0;
          this.total.page = res.totalPage || 1;
        }
      })
      .catch(() => {
        this.list = [];
        this.queryParams.page = 1;
        this.total.size = 0;
        this.total.page = 1;
      });
  }

  // created() {
  //   this.getCompanies();
  // }
}
</script>

<style lang="scss" scoped>
.title-right {
  display: flex;
  align-items: center;
  .ht-pagination {
    margin-right: $margin-size-main;
  }
}
.company-list {
  box-sizing: border-box;
  width: 100%;
  height: 582px;
  padding: 16px 2px 8px 16px;
  .company-item,
  .company-double {
    float: left;
    margin-right: 14px;
    margin-bottom: $margin-size-main;
  }
}
</style>
