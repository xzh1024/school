<script>
import {getCurStyles} from "../until";

export default {
    props: {
        showSample: Boolean,
        templateData: {
            type: Object,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    computed: {
        content() {
            return this.templateData.content;
        },
        columns() {
            const columns = this.content.map(item => {
                let formatter;
                if (this.showSample) {
                    formatter = value => `[${value}]`;
                } else if (item.formatter) {
                    formatter = item.formatter;
                } else {
                    switch (item.type) {
                        case "index":
                            formatter = (value, row, index) => index + 1;
                            break;
                        case "date":
                            formatter = (value, row, index) => index;
                            break;
                    }
                }
                return {
                    ...item,
                    // key加上时间戳，避免key值相同渲染顺序错误
                    key: `${item.key}-${(new Date).getTime()}`,
                    formatter
                };
            });
            return columns;
        }
    },
    methods: {
        tableCellStyle({column}) {
            const curColumn = this.columns.find(item => item.file === column.property);
            return getCurStyles(curColumn);
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-table">
                <el-table
                    data={this.data}
                    border
                    row-class-name={this.showSample?"ht-invoice-sample-class": ""}
                    cell-style={this.tableCellStyle}
                    header-cell-style={this.tableCellStyle}
                    size="mini"
                    style={{
                        fontSize: this.templateData.fontSize
                            ? `${this.templateData.fontSize}px`
                            : "inherit"
                    }}
                >
                    {
                        this.columns.map(item => (
                            <el-table-column
                                key={item.key || item.prop}
                                label={item.name}
                                prop={item.file}
                                width={item.width}
                                align={item.textAlign}
                                show-overflow-tooltip
                                scopedSlots={{
                                    default: ({ row, $index }) => {
                                        return item.formatter
                                            ? item.formatter(
                                                row[item.file],
                                                row,
                                                $index
                                            )
                                            : row[item.file];
                                    }
                                }}
                            ></el-table-column>
                        ))}
                </el-table>
            </div>
        );
    }
};
</script>