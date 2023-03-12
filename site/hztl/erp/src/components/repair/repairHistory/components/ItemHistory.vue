<template>
  <div class="table-wrap">
    <ht-card class="auto-card" style="background:#fff">
      <el-form ref="form" :model="form" inline size="mini" label-width="50px">
        <el-form-item>
          <el-input
            style="width:200px"
            v-model="form.keyword"
            placeHolder="项目编号/项目名称/助记符"
            size="small"
          />
        </el-form-item>
        <el-button type="primary" size="small" @click="list()"
          >查询（F5）</el-button
        >
      </el-form>
      <ht-card class="auto-card" style="overflow-y:scroll">
        <ht-setting-table
          :data="itemData"
          :enable-table-setting="true"
          :columns="enableAdd ? itemColumnsAdd : itemColumns"
          pagination
          :total="totalSize"
          :current-page.sync="currentPage"
          @pageChange="_handleSizeChange"
          table-name="item-list"
          height="490px"
        />
      </ht-card>
    </ht-card>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ITEM_COLUMNS } from "../const/columns";
import { resumesItems } from "@/api/repairs/resumes";
import { mapState } from "vuex";
export default {
  props: {
    vehicleId: {
      type: Number,
      default: 0
    },
    enableAdd: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    vehicleId: {
      handler() {
        this.list();
      },
      immediate: true
    }
  },
  data() {
    return {
      form: {
        keyword: ""
      },
      currentPage: 1,
      totalSize: 0,
      itemData: [],
      itemColumnsAdd: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 40,
          cantExport: true,
          render: (value, row) => (
            <div>
              <el-tooltip enterable={false} placement="top" content="添加">
                <span
                  on-click={e => this.handleAddItem(row, e)}
                  class="icon operation-icon icon-add-info"
                />
              </el-tooltip>
            </div>
          )
        },
        ...ITEM_COLUMNS
      ],
      itemColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        ...ITEM_COLUMNS
      ]
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      resumesItems({
        keyword: this.form.keyword,
        vehicleId: this.vehicleId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        if (!rows) {
          this.itemData = [];
          return;
        }
        rows.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.totalSize = totalSize;
        this.itemData = rows || [];
      });
    },
    handleAddItem(e) {
      this.$emit("addItem", e);
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      // 查询列表
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-wrap {
  height: 600px;
  display: flex;
  flex-direction: column;
}
</style>
