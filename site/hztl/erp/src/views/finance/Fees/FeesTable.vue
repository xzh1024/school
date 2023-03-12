<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import { FeesData } from "@/api/finance/fees";
import { TableColumn } from "@/constants/interface";
import { Fragment } from "vue-fragment";
import AdvanceFeesDetailDialog from "./AdvanceFeesDetailDialog.vue";
import { FEES_BILL_STATUS, FINANCE_FEES } from "./constants";

interface Props {
  data: FeesData[];
  total: number;
}

interface Event {
  onPageChange: (page: number) => void;
  onSelectChange: (selects: FeesData[]) => void;
  onAdvanceFeese: (row: FeesData) => void;
}

@Component({
  components: {
    AdvanceFeesDetailDialog
  }
})
export default class FeesTable extends tsx.Component<Props, Event> {
  @Prop() readonly data!: FeesData[];
  private visible = false;
  private billId?: number;
  private changenVisible(visible: boolean) {
    this.visible = visible;
  }
  private get columns(): TableColumn<FeesData>[] {
    const advanceFees = (row: FeesData, e?: MouseEvent) => {
      e?.stopPropagation();
      this.$emit("advanceFees", row);
    };
    const showSdvanceFees = (row: FeesData, e?: MouseEvent) => {
      e?.stopPropagation();
      this.visible = true;
      this.billId = row.reimbursementBillId;
    };
    return FINANCE_FEES.columns.map(item => {
      if (item.type === "controls") {
        return {
          ...item,
          render: (_, row) => {
            if (row.status === FEES_BILL_STATUS.advance) {
              return (
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => {
                    showSdvanceFees(row, e);
                  }}
                >
                  报销查看
                </el-button>
              );
            }
            if (row.status === FEES_BILL_STATUS.audited) {
              return (
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => {
                    advanceFees(row, e);
                  }}
                >
                  预支报销
                </el-button>
              );
            }
            return null;
          }
        };
      }
      return item;
    });
  }

  render() {
    return (
      <Fragment>
        <ht-setting-table
          table-name={FINANCE_FEES.name}
          columns={this.columns}
          data={this.data}
          on={this.$listeners}
          attrs={this.$attrs}
        />
        <advance-fees-detail-dialog
          visible={this.visible}
          billId={this.billId}
          onVisibleChange={this.changenVisible}
        />
      </Fragment>
    );
  }
}
</script>
