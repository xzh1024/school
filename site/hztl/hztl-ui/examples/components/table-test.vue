<script>
const tableData1 = [
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1},
    {id: 1}
];
const tableData2 = [{id: 2},{id: 2},{id: 2},{id: 2},{id: 2},{id: 2},{id: 2},{id: 2},{id: 2},{id: 2}];
export default {
    data() {
        return {
            tableData: [],
            tableColumns: [{
                prop: "id", label: "数字", width: 100
            }],
            selectedRows: [],
            page: 1,
            size: 10,
            total: 0,
        };
    },
    mounted() {
        this.tableData = tableData1;
        this.total = tableData1.length + tableData2.length;
    },
    methods: {
        loadData() {
            if (this.page * this.size > 10) {
                this.tableData = tableData2;
                this.total = tableData1.length + tableData2.length;
            } else {
                this.tableData = tableData1;
                this.total = tableData1.length + tableData2.length;
            }
        },
        sizeChange(size) {
            this.size = size;
            this.pageChange(1);
        },
        pageChange(page) {
            this.page = page
            this.loadData();
        }
    },
    render() {
        return (
            <HtTable2
                data={this.tableData}
                columns={this.tableColumns}
                selectedRows={this.selectedRows}
                currentPage={this.page}
                pageSize={this.size}
                total={this.total}
                pagination
                on={{
                    "update:selectedRows": val => this.selectedRows = val
                }}
                on-current-change={this.pageChange}
                on-size-change={this.sizeChange}
            />
        )
    }
}
</script>
