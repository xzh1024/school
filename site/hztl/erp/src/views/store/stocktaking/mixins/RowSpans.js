export default {
  methods: {
    getSpans({ row, column }) {
      if (
        row.rowSpan !== undefined &&
        ["供应商", "批次号", "帐面数", "盈亏数", "盈亏额"].includes(
          column.label
        )
      ) {
        return {
          rowspan: row.rowSpan,
          colspan: row.rowSpan > 0 ? 1 : 0
        };
      }
    },
    setupRowSpans(rows) {
      // 在编辑弹窗新增或者删除一行时会对subs数据多次计算rowSpan，先清除掉
      for (let i = 0; i < rows.length; i++) {
        delete rows[i].rowSpan;
      }

      let lastRow = 0;
      for (let i = 1; i < rows.length; i++) {
        // 相同批次号、供应商合并单元格
        if (
          rows[i].batchNo === rows[lastRow].batchNo &&
          rows[i].supplierId === rows[lastRow].supplierId
        ) {
          const v = rows[lastRow].rowSpan;
          rows[lastRow].rowSpan = v === undefined ? 2 : v + 1;
          rows[i].rowSpan = 0;
        } else {
          lastRow = i;
        }
      }
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function debugSpans(rows) {
  const spans = [];
  for (let i = 0; i < rows.length; i++) {
    spans.push(rows[i].rowSpan);
  }
}
