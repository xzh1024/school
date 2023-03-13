<template>
  <div class="container-box">
    <div class="header header-between">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click.stop="addHandle"
        >
          新增公式（F2）
        </el-button>
        <el-button
          :disabled="!canUpdate"
          type="primary"
          size="mini"
          @click.stop="editHandle"
        >
          编辑（F3）
        </el-button>
        <el-button
          :disabled="!canDelete"
          type="primary"
          size="mini"
          @click.stop="deleteHandle"
        >
          删除（F4）
        </el-button>
        <el-button
          :disabled="!this.seletedRows.length || !seletedRows[0]"
          type="primary"
          size="mini"
          @click.stop="copyHandle"
        >
          复制公式
        </el-button>
      </div>
    </div>
    <FormulaList
      ref="refFormulaList"
      @rows-change="handleFormulaListRowChange"
      @rowOperation="editHandle"
    />

    <EditSellingPriceFormulaBox
      :visible.sync="editSellingPriceFormulaVisible"
      :formulaId="formulaId"
      :isAdd="isAdd"
      @on-success="searchHandle(isAdd)"
    />
  </div>
</template>

<script>
import {
  EditSellingPriceFormulaBox,
  FormulaList,
  permMixin
} from "./components";
import { reqPurchasePriceDefineDelete } from "@/api/purchase/purchasePrice";

export default {
  name: "PurchasePriceDefine",
  components: {
    FormulaList,
    EditSellingPriceFormulaBox
  },
  mixins: [permMixin],
  data() {
    return {
      formulaId: 0,
      editSellingPriceFormulaVisible: false,
      seletedRows: [],
      isAdd: true
    };
  },
  computed: {
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canUpdate() {
      return (
        this.seletedRows.length === 1 &&
        this.hasBelongsPerm("update", this.seletedRows[0].belongs)
      );
    },
    canDelete() {
      return (
        this.seletedRows.length === 1 &&
        this.hasBelongsPerm("delete", this.seletedRows[0].belongs)
      );
    }
  },
  methods: {
    addHandle() {
      if (!this.canCreate) {
        return;
      }
      this.formulaId = 0;
      this.isAdd = true;
      this.editSellingPriceFormulaVisible = true;
    },
    copyHandle() {
      if (!this.canCreate) {
        return;
      }
      this.formulaId = this.seletedRows[0].id;
      this.isAdd = true;
      this.editSellingPriceFormulaVisible = true;
    },
    editHandle() {
      if (!this.canUpdate) {
        this.$message.error({
          message: "您无权修改该公式，请重新选择！",
          showClose: true
        });
        return;
      }
      this.formulaId = this.seletedRows[0].id;
      this.isAdd = false;
      this.editSellingPriceFormulaVisible = true;
    },
    deleteHandle() {
      if (!this.canDelete) {
        return;
      }
      this.$confirm(`确定要删除公式 ${this.seletedRows[0].name}？`, {
        type: "warning"
      }).then(() => {
        this.isAdd = false;
        this.tableLoading = true;
        reqPurchasePriceDefineDelete([this.seletedRows[0].id])
          .then(() => {
            this.tableLoading = false;
            this.searchHandle(this.isAdd);
          })
          .catch(() => {
            this.tableLoading = false;
          });
      });
    },
    handleFormulaListRowChange(rows) {
      this.seletedRows = rows || [];
      this.formulaId = rows && rows.length ? rows[0].id : 0;
    },
    searchHandle(isAdd) {
      this.$refs.refFormulaList &&
        this.$refs.refFormulaList.searchHandle(isAdd);
    }
  }
};
</script>
