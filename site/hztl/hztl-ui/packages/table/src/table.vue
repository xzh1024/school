<script>
/**
 * 多选单选
 *      selectionType:  单选 single（默认） 多选 "multiple"  不选 其他值
 *      selectedRows 选中数据
 *      selectable      是否可选
 *
 *      @selectChange 或 on-selectChange
 *          选择切换 newVal, curRow, oldVal，多选时候curRow为
 *
 *      @rowOperation 或 on-rowOperation
 *          双击行或者单选时候回车传出当前行
 *
 *      获取焦点
 *          autofocus
 *
 * 分页
 *      pagination  true 分页    默认 false
 *      currentPage   同步当前页
 *      原 element：current-change table 和pagination相同 改为 pageChange 时间切换table页
 *
 * columns      在有columns和slot同时，slot在前
 *      label
 *      prop
 *      key 当prop字段冲突时候，使用key值
 *      width
 *      classNames      样式名 // render 无效
 *      formatter       参数 cellValue row, index   与element比交换位置
 *      render    jsx采用箭头函数    参数   同上
 *      renderHeader jsx
 *
 * scrollToEnd  Boolean
 *      data变化时候，为true则自动滚动到底部
 *
 *
 * sort-change
 *
 *
 */

import { isFunction, findLastIndex } from "lodash";
import hotkeys from "hotkeys-js";
import { KEY_MAP } from "hztl-ui/src/constants";

const ORDER_EMUN = {
    descending: "desc",
    desc: "descending",
    ascending: "asc",
    asc: "ascending",
    null: undefined
};

const sortOrders = ["ascending", "descending"];

const pageSizesList = [10, 20, 50, 100];

export default {
    name: "HtTable2",
    componentName: "HtTable2",
    props: {
        data: Array,
        disabledHotkeys: Boolean,
        scrollToEnd: Boolean,
        keyScope: {
            type: [String, Symbol],
            default() {
                return Symbol("table");
            }
        },
        rowClassName: [Function, String],
        border: {
            type: Boolean,
            default: true
        },
        tableRef: {
            type: String,
            default() {
                return "datatable";
            }
        },
        selectionType: {
            type: String,
            default() {
                return "single";
            }
        },
        settingAllColumn: {
            type: Boolean,
            default: false
        },
        indexColumn: {
            type: Boolean,
            default() {
                return true;
            }
        },
        formatIndex: {
            type: Function
        },
        selectable: {
            type: Function,
            default: () => {
                return true;
            }
        },
        selectedRows: {
            type: Array,
            default() {
                return [];
            }
        },
        loading: Boolean,
        singleSelection: {
            type: Boolean,
            default: true
        },
        autofocus: Boolean,
        pagination: Boolean,
        pageSize: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        setHeight: {
            type: Boolean,
            default: true
        },
        showTableSetting: Boolean
    },
    data() {
        return {
            isAutoScroll: true,
            nextSelectedIndex: null,
            curSelectedRows: null,
            baseSelected: null
        };
    },
    computed: {
        isMultiSelect() {
            return this.selectionType === "multiple";
        },
        isShowDefutSelectColumn() {
            return this.isMultiSelect && !this.settingAllColumn;
        },
        isShowDefutIndexColumn() {
            return this.indexColumn && !this.settingAllColumn;
        },
        isSingleSelect() {
            return this.selectionType === "single";
        },
        isSelect() {
            return this.isSingleSelect || this.isMultiSelect;
        },
        disPalySelectedRows() {
            if (this.curSelectedRows !== null) {
                return this.curSelectedRows;
            }
            const disPalySelectedRows = this.selectedRows || [];
            return disPalySelectedRows;
        },
        isAllSelected: {
            get() {
                const { data } = this;
                return (
                    this.disPalySelectedRows.length &&
                    this.disPalySelectedRows.length ===
                    data.filter(row => this.selectable(row)).length
                );
            },
            set(value) {
                const { data } = this;
                this.setCurrentSelection(
                    value ? [...data.filter(row => this.selectable(row))] : []
                );
            }
        }
    },
    watch: {
        selectedRows(value, oldVal) {
            if (value !== oldVal) {
                if (this.isAutoScroll) {
                    if (value.length) {
                        const index = this.data.findIndex(item => item === value[0]);
                        if (index >= 0) {
                            this.scrollRow(index);
                        }
                    }
                } else {
                    this.isAutoScroll = true;
                }
                this.curSelectedRows = value;
            }
        },
        data: {
            handler(value, oldVal) {
                if (value !== oldVal) {
                    const selectedIndex = this.nextSelectedIndex;
                    this.nextSelectedIndex = null;
                    const selected = value[selectedIndex];
                    if (selected) {
                        this.$nextTick(() => {
                            this.baseSelected = selected;
                            this.setCurrentSelection([selected], selected);
                            this.scrollRow(selectedIndex);
                        });
                    } else {
                        this.$nextTick(() => {
                            const curSelected = this.disPalySelectedRows.filter(item =>
                                value.includes(item)
                            );
                            if (this.disPalySelectedRows.length !== curSelected.length) {
                                this.setCurrentSelection(curSelected);
                            }
                            if (this.data.length && this.scrollToEnd) {
                                this.scrollRow(this.data.length - 1);
                            }
                        });
                    }
                }
            },
            immediate: true
        },
        columns() {
            // 处理列表，解决表头数据在表单数据之后表头列宽错误导致的列表高度问题
            const table = this.$refs[this.tableRef];
            if (table && table.doLayout) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        table.doLayout();
                    }, 50);
                });
            }
        }
    },
    mounted() {
        this.bindhotkeys();
    },
    destroyed() {
        hotkeys.deleteScope(this.keyScope);
    },
    methods: {
        bindhotkeys() {
            if (this.disabledHotkeys) {
                return;
            }

            hotkeys(
                "*",
                {
                    scope: this.keyScope
                },
                (e, handler) => {
                    const keyCode = e.keyCode;
                    const isSingle = !e.shiftKey;
                    let curSelected = null;
                    if (!this.loading) {
                        switch (keyCode) {
                            case KEY_MAP.enter:
                                if (this.curSelectedRows && this.curSelectedRows.length === 1) {
                                    event.preventDefault();
                                    this.operationEvent(this.curSelectedRows[0]);
                                }
                                break;
                            case KEY_MAP.del:
                                if (this.curSelectedRows && this.curSelectedRows.length === 1) {
                                    event.preventDefault();
                                    this.deleteEvent(this.curSelectedRows[0]);
                                }
                                break;
                            case KEY_MAP.up:
                                // 禁止默认滚动，避免与计算滚动冲突
                                event.preventDefault();
                                if (!e.ctrlKey && !e.altKey) {
                                    curSelected = this.getCurSelectedRow({
                                        isPre: true,
                                        isSingle
                                    });
                                    if (curSelected) {
                                        this.handleCheckboxChange(curSelected, true, isSingle);
                                    }
                                }
                                break;
                            case KEY_MAP.down:
                                // 禁止默认滚动，避免与计算滚动冲突
                                event.preventDefault();
                                if (!e.ctrlKey && !e.altKey) {
                                    curSelected = this.getCurSelectedRow({
                                        isSingle
                                    });
                                    if (curSelected) {
                                        this.handleCheckboxChange(curSelected, true, isSingle);
                                    }
                                }
                                break;
                            case KEY_MAP.pageup:
                                this.goPre();
                                break;
                            case KEY_MAP.pagedown:
                                this.goNext();
                                break;
                            default:
                        }
                    }

                    this.$emit("hotkeysUp", e, handler);
                }
            );
            if (this.autofocus) {
                this.setCurScope();
            }
        },
        tableSetting(e) {
            if (!this.disabledHotkeys && e) {
                e.stopPropagation();
            }
            this.$emit("table-setting");
        },
        scrollRow(index) {
            this.$nextTick(() => {
                const rowDom = this.$refs[this.tableRef].bodyWrapper.querySelectorAll(
                    "tr"
                )[index];
                const { scrollTop, clientHeight } = this.$refs[
                    this.tableRef
                ].bodyWrapper;

                // 选择列在前，滚动到第一列为选择列
                if (rowDom.offsetTop < scrollTop) {
                    this.$refs[this.tableRef].bodyWrapper.scrollTop = rowDom.offsetTop;
                } else if (
                    rowDom.offsetTop >
                    scrollTop + clientHeight - rowDom.clientHeight
                ) {
                    // 选择列在后，滚动使最后一列为选择列
                    this.$refs[this.tableRef].bodyWrapper.scrollTop =
                        rowDom.offsetTop - clientHeight + rowDom.clientHeight;
                }
            });
        },
        goPre() {
            if (this.currentPage > 1) {
                this.nextSelectedIndex = this.pageSize - 1;
                this.pageChange(this.currentPage - 1);
            }
        },
        goNext() {
            const totalPage = this.total / this.pageSize;
            if (totalPage > this.currentPage) {
                this.nextSelectedIndex = 0;
                this.pageChange(this.currentPage + 1);
            }
        },
        sortChange({ prop, order }) {
            this.$emit("sort-change", {
                sortField: prop,
                sort: ORDER_EMUN[order]
            });
        },
        pageChange(page) {
            this.$emit("pageChange", page);
        },
        getCurSelectedRow(params) {
            const { data } = this;
            const { isPre, isSingle } = params || {};
            let curRow;
            let index;

            // 全选时，从前后开始
            if (
                isSingle &&
                this.isAllSelected &&
                this.disPalySelectedRows.length > 1
            ) {
                index = isPre ? data.length : -1;
            } else if (isPre) {
                index = data.findIndex(item => this.disPalySelectedRows.includes(item));
                if (isSingle && index === 0) {
                    this.goPre();
                    return;
                }
            } else {
                index = findLastIndex(data, item =>
                    this.disPalySelectedRows.includes(item)
                );
                if (isSingle && index === data.length - 1) {
                    this.goNext();
                    return;
                }
            }

            do {
                isPre ? index-- : index++;
                curRow = data[index];
            } while (curRow && (this.isGroupCol(curRow) || !this.selectable(curRow)));

            if (curRow) {
                this.scrollRow(index);
            }

            return curRow;
        },
        isGroupCol(row) {
            return row.colType === "colspan";
        },
        handleCheckboxChange(row, isChecked, isSingle = false) {
            if (!this.isSelect) {
                return;
            }
            if (!this.singleSelection && isSingle) {
                return;
            }
            if (!row || !this.selectable(row)) {
                return;
            }
            let curSelectedRows = [];
            if (isChecked) {
                curSelectedRows =
                    isSingle || !this.isMultiSelect
                        ? [row]
                        : [...this.disPalySelectedRows, row];
            } else {
                curSelectedRows = this.disPalySelectedRows.filter(item => item !== row);
            }
            if (isChecked && !curSelectedRows.includes(this.baseSelected)) {
                this.baseSelected = row;
            }
            this.setCurrentSelection(curSelectedRows, row);
        },
        tableRowClassName({ row, rowIndex }) {
            let defaultClass = "";
            if (this.rowClassName) {
                defaultClass = isFunction(this.rowClassName)
                    ? this.rowClassName({ row, rowIndex })
                    : this.rowClassName;
            }
            if (this.baseSelected === row) {
                defaultClass += " base-selected-row";
            }
            if (this.disPalySelectedRows.includes(row)) {
                defaultClass += " selected-row";
            }
            return defaultClass;
        },
        setCurrentSelection(newVal, curRow = null) {
            const oldVal = this.disPalySelectedRows;
            if (oldVal === newVal) return;
            this.isAutoScroll = false;
            this.$emit("update:selectedRows", newVal);
            this.$emit("selectChange", newVal, curRow, oldVal);
            this.curSelectedRows = newVal;
        },
        generateIndex(index, row) {
            if (this.formatIndex) {
                return this.formatIndex(index, row);
            }
            return (this.currentPage - 1) * this.pageSize + index + 1;
        },
        operationEvent(row) {
            this.$emit("rowOperation", row);
        },
        deleteEvent(row) {
            this.$emit("rowDelete", row);
        },
        setCurScope() {
            if (this.disabledHotkeys) {
                return;
            }
            this.$emit("keyScopeChange", this.keyScope);
            hotkeys.setScope(this.keyScope);
        },
        setCurScopeBySelectionBody(e) {
            if (e) {
                e.stopPropagation();
            }
            if (this.disabledHotkeys) {
                return;
            }
            this.$emit("keyScopeChange", this.keyScope);
            hotkeys.setScope(this.keyScope);
        }
    },
    render() {
        // eslint-disable-next-line no-unused-vars
        const {
            // eslint-disable-next-line no-unused-vars
            selection,
            "pager-count": pagerCount,
            ...attrs
        } = this.$attrs;

        const relAttrs = {
            data: this.data,
            ...attrs
        };
        if (this.setHeight && !relAttrs.height) {
            relAttrs.height = this.pagination ? "calc(100% - 33px)" : "100%";
        }

        // eslint-disable-next-line no-unused-vars
        const { "sort-change": sortChange, "current-change": currentChange, "size-change": sizeChange, ...listeners } = this.$listeners;

        const renderSelectionHeader = () => {
            const { data } = this;
            return (
                <el-checkbox
                    disabled={data && data.length === 0}
                    indeterminate={
                        this.disPalySelectedRows.length > 0 && !this.isAllSelected
                    }
                    nativeOn-click={e => e.stopPropagation()}
                    v-model={this.isAllSelected}
                />
            );
        };

        const renderSelectionBody = ({ row, $index }) => {
            return (
                <el-checkbox
                    disabled={!this.selectable(row, $index)}
                    value={this.disPalySelectedRows.includes(row)}
                    nativeOn-click={this.setCurScopeBySelectionBody}
                    on-change={ischecked => this.handleCheckboxChange(row, ischecked)}
                />
            );
        };

        const renderTableColumn = columns => {
            return columns.map(
                ({
                    key,
                    prop,
                    label,
                    width,
                    formatter,
                    render,
                    renderHeader,
                    classNames,
                    align,
                    children,
                    type,
                    attrs,
                    listeners
                }) => {
                    if (attrs) {
                        // eslint-disable-next-line no-prototype-builtins
                        if (!attrs.hasOwnProperty("showOverflowTooltip")) {
                            attrs.showOverflowTooltip = true;
                        }
                    } else {
                        attrs = {
                            showOverflowTooltip: true
                        };
                    }

                    if (attrs.sortable) {
                        attrs.sortOrders = sortOrders;
                    }

                    if (type === "index") {
                        return (
                            <el-table-column
                                label="序号"
                                min-width={width}
                                align="center"
                                prop="index-number"
                                attrs={attrs}
                                on={listeners}
                                scopedSlots={{
                                    header: this.showTableSetting
                                        ? () => (
                                            <i
                                                class={`${
                                                    this.showTableSetting ? "table-setting" : ""
                                                } el-icon-setting`}
                                                on-click={this.tableSetting}
                                            ></i>
                                        )
                                        : () => "序号"
                                }}
                                formatter={(row, columns, cellValue, index) =>
                                    this.generateIndex(index, row)
                                }
                            />
                        );
                    } else if (type === "multiple") {
                        return (
                            <el-table-column
                                min-width={width}
                                align="center"
                                attrs={attrs}
                                on={listeners}
                                scopedSlots={{
                                    default: renderSelectionBody,
                                    header: renderSelectionHeader
                                }}
                            ></el-table-column>
                        );
                    }
                    return (
                        <el-table-column
                            key={key || prop}
                            prop={prop}
                            label={label}
                            min-width={width}
                            align={align}
                            attrs={attrs}
                            on={listeners}
                            label-class-name={
                                type === "number" || type === "percent" || classNames
                                    ? "table-header-text-align-right"
                                    : ""
                            }
                            scopedSlots={{
                                default: ({ row, $index }) => {
                                    if (render) {
                                        return render(row[prop], row, $index);
                                    } else {
                                        return (
                                            <span class={classNames}>
                                                {formatter
                                                    ? formatter(row[prop], row, $index)
                                                    : row[prop]}
                                            </span>
                                        );
                                    }
                                },
                                header: renderHeader || undefined
                            }}
                        >
                            {children && children.length ? renderTableColumn(children) : null}
                        </el-table-column>
                    );
                }
            );
        };
        return (
            <div class="ht-table" on-click={this.setCurScope}>
                <el-table
                    ref={this.tableRef}
                    highlight-current-row={false}
                    border={this.border}
                    stripe
                    row-class-name={this.tableRowClassName}
                    on={listeners}
                    attrs={relAttrs}
                    v-loading={this.loading}
                    on-sort-change={this.sortChange}
                    on-row-click={row =>
                        this.handleCheckboxChange(
                            row,
                            !this.isMultiSelect
                                ? true
                                : this.disPalySelectedRows.length > 1 ||
                    !this.disPalySelectedRows.includes(row),
                            true
                        )
                    }
                    on-row-dblclick={this.operationEvent}
                    class={`table${this.disabledHotkeys ? " ignore-hotkeys" : ""}${
                        this.autofocus ? " autofocus" : ""
                    }`}
                >
                    {!this.isShowDefutIndexColumn ? null : (
                        <el-table-column
                            label="序号"
                            width="60"
                            align="center"
                            prop="index-number"
                            label-class-name={this.showTableSetting ? "table-setting" : ""}
                            scopedSlots={{
                                header: this.showTableSetting
                                    ? () => (
                                        <i
                                            class="el-icon-setting"
                                            on-click={this.tableSetting}
                                        ></i>
                                    )
                                    : () => "序号"
                            }}
                            formatter={(row, columns, cellValue, index) =>
                                this.generateIndex(index, row)
                            }
                        />
                    )}
                    {!this.isShowDefutSelectColumn ? null : (
                        <el-table-column
                            width="48"
                            align="center"
                            scopedSlots={{
                                default: renderSelectionBody,
                                header: renderSelectionHeader
                            }}
                        ></el-table-column>
                    )}
                    {this.$slots.default}
                    {renderTableColumn(this.columns)}
                </el-table>
                {this.pagination && (
                    <div class="pagination">
                        <el-pagination
                            on-current-change={currentChange}
                            on-size-change={sizeChange}
                            attrs={{
                                currentPage: this.currentPage,
                                pageSize: this.pageSize,
                                total: this.total,
                                pagerCount: pagerCount,
                            }}
                            page-sizes={pageSizesList}
                            layout="total, sizes, prev, pager, next, jumper"
                        />
                    </div>
                )}
            </div>
        );
    }
};
</script>
