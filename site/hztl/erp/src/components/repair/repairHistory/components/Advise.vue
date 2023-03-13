<template>
  <div class="table-wrap">
    <ht-card class="auto-card" style="background:#fff">
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="true"
        :columns="enableAdd ? tableColumnsAdd : tableColumns"
        table-name="item-list"
        height="600px"
      />
    </ht-card>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ADVISE_COLUMNS } from "../const/columns";
import { resumesSuggestions } from "@/api/repairs/resumes";
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
        plateNumber: ""
      },
      tableData: [],
      tableColumnsAdd: [
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
                  on-click={e => this.handleAddAdvice(row, e)}
                  class="icon operation-icon icon-add-info"
                />
              </el-tooltip>
            </div>
          )
        },
        ...ADVISE_COLUMNS
      ],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        ...ADVISE_COLUMNS
      ]
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      resumesSuggestions({
        keyword: this.form.keyword,
        vehicleId: this.vehicleId,
        page: 1,
        pageSize: 999
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows || [];
      });
    },
    handleAddAdvice(e) {
      this.$emit("addAdvice", e);
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
