<!--
 * @Author: Yong
 * @Date: 2021-10-08 11:24:39
 * @LastEditors: Yong
 * @LastEditTime: 2021-10-15 16:19:59
 * @Description: 配件映射页面
-->
<template>
  <ht-dialog
    v-bind="$attrs"
    title="平台销售与ERP配件资料确认"
    width="1200px"
    top="20vh"
    append-to-body
    v-on="$listeners"
  >
    <el-row v-if="false">
      <el-col :span="24" class="text-left m-t-6 m-b-12">
        <span class="text-bold m-l-12">绑定往来单位：</span>
        <ht-autoselect
          v-model="bindCompany"
          size="mini"
          :trigger-on-focus="false"
          placeholder="往来单位名称"
          :options="companies"
          highlight-first-item
          filter-zero
        />
      </el-col>
    </el-row>
    <ht-card>
      <ht-setting-table
        class="auto-block parts-table"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        :table-name="table.name"
        style="max-height:300px;overflow-y:auto"
      />
    </ht-card>
    <div slot="footer" class="dialog-footer-align">
      <el-button type="primary" size="mini" @click="save">
        确定（F3）
      </el-button>
      <el-button size="mini" @click="hideBox">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import {} from "@/api/parts";
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import { searchParts } from "@/api/platform";
import * as store from "@/utils/store";
export default {
  name: "newParts2erpParts",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    partsData: {
      type: Array,
      required: true
    }
  },
  mixins: [searchMixin],
  data() {
    const selectColumn = {
      label: `本地ERP配件资料(输入配件编码\\名称查询)`,
      prop: "controls",
      width: 160,
      render: (value, row) => (
        <ht-autoselect
          style="width:100%;"
          v-model={row.partId}
          size="mini"
          remote
          fetch-suggestions={this.queryLocalPart}
          trigger-on-focus={false}
          placeholder="请选择配件信息"
          highlight-first-item
        />
      )
    };
    return {
      table: {
        name: "newParts2erpParts",
        loading: false,
        data: [],
        columns: [
          {
            prop: "index",
            label: "序号",
            type: "index",
            width: CELL_WIDTH.index,
            cantHide: true,
            cantExport: true
          },
          {
            label: "配件编码",
            prop: "code",
            width: CELL_WIDTH.code
          },
          {
            label: "配件名称",
            prop: "name",
            width: CELL_WIDTH.name
          },
          {
            label: "配件品牌",
            prop: "brand",
            width: CELL_WIDTH.brand
          },
          {
            label: "产地",
            prop: "productionPlace",
            width: CELL_WIDTH.productionPlace
          },
          selectColumn
        ],
        selectedTableRows: []
      },
      bindCompany: ""
    };
  },
  computed: {
    companies() {
      return store.allCompanies();
    }
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.table.data = this.partsData.map(partData => {
          return {
            ...partData,
            productionPlace: "",
            partId: ""
          };
        });
      }
    }
  },
  methods: {
    async queryLocalPart(query) {
      const res = await searchParts({ keyword: query || "" });
      return res.parts.map(item => ({
        id: item.id,
        name: `${item.code} -- ${item.name} -- ${item.brand} -- ${item.productionPlace}`
      }));
    },
    save() {
      if (this.table.data.some(item => item.partId === "")) {
        return this.$message.warning("请确认全部配件对应完成后再试");
      }
      this.$emit("save", this.table.data);
      this.$emit("update:visible", false);
    },
    hideBox() {
      this.$emit("update:visible", false);
      this.$emit("close");
    }
  }
};
</script>
