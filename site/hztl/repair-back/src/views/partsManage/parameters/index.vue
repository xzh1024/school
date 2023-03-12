<template>
  <div class="layout-container bg-color-white">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column
        label="授权价格类型"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ findPriceTypeName(scope.row.priceTypes) }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权配件性质"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.properties ? scope.row.properties.join("、") : "" }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权配件仓库"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.storeNames ? scope.row.storeNames.join("、") : "" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleClick(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <EditDialog ref="editDialog" @update="getAuthSetting"></EditDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EditDialog from "./components/editDialog.vue";
import { AUTH_PRICE_TYPES } from "@/common/constants/options";
import { AuthSettingModel } from "@/common/interface/commodityInterface";
import { CommodityService } from "@/common/services/commodityService";
const commodityService = new CommodityService();

@Component({
  name: "Parameters",
  components: {
    EditDialog
  }
})
export default class Parameters extends Vue {
  get editDialog(): EditDialog {
    return this.$refs.editDialog as EditDialog;
  }

  private loading = false;

  protected authPriceTypes = AUTH_PRICE_TYPES;
  protected tableData: AuthSettingModel[] = [];

  protected findPriceTypeName(typeIds: string[]) {
    typeIds = typeIds || [];
    return typeIds
      .map(id => {
        return AUTH_PRICE_TYPES.find(type => type.id === id)?.name;
      })
      .join("、");
  }

  protected getAuthSetting() {
    this.loading = true;
    commodityService
      .getAuthSetting()
      .then((res: AuthSettingModel) => {
        const list = [];
        if (res) {
          res.name = "配修社区";
          list.push(res);
        }
        this.tableData = list;
        this.loading = false;
      })
      .catch(() => {
        this.tableData = [];
        this.loading = false;
      });
  }

  protected handleClick(row: AuthSettingModel) {
    this.editDialog.show(row);
  }

  created() {
    this.getAuthSetting();
  }
}
</script>
