<script>
const DATA_TYPE = ["业务日期", "结算日期"];
import { dateFormat } from "hztl-ui/src/utils/date-util";
const options = [
    {
        id: 1,
        name: "1111",
    },
    {
        id: 2,
        name: "2222",
    },
];
const curDate = new Date();
const defaultSearchData = {
    companyIds: [],
    logisticsIds: [],
    cooperatorIds: [],
    timeRange: [
        dateFormat(new Date().setDate(curDate.getDate() - 6)),
        dateFormat(curDate)
    ],
    dateType: 0,
    receivePayType: [],
    businessManId: null,
    settleStatus: []
};
export default {
    data() {
        return {
            searchFormData: {
                ...defaultSearchData
            }

        };
    },
    methods: {
        async searchFunc(query) {
            return options.filter((item) => item.name.includes(query));
        },
    },
    render() {
        return (
            <el-form
                label-position="left"
                size="mini"
                class="form-item-small-margin-bottom"
            >
                <el-row gutter={10}>
                    <el-col span={6}>
                        <el-form-item label="业务分店" label-width="80px">
                            <ht-select
                                v-model={this.searchFormData.companyIds}
                                options={options}
                                filterable
                                multiple
                                has-selecte-all-val
                                collapse-tags
                            />
                        </el-form-item>
                    </el-col>
                    <el-col span={6}>
                        <el-form-item label-width="95px">
                            <ht-select
                                slot="label"
                                v-model={this.searchFormData.dateType}
                                options={DATA_TYPE}
                                clearable={false}
                                class="date-label"
                                filterable
                            />
                            <ht-date-range
                                v-model={this.searchFormData.timeRange}
                                on-change={console.log}
                            />
                        </el-form-item>
                    </el-col>
                    <el-col span={6}>
                        <el-form-item label="收付类型" label-width="80px">
                            <ht-select
                                v-model={this.searchFormData.receivePayType}
                                options={["应收", "应付"]}
                                filterable
                                multiple
                                has-selecte-all-val
                                collapse-tags
                            />
                        </el-form-item>
                    </el-col>
                    <el-col span={6}>
                        <el-form-item label="结算状态" label-width="80px">
                            <ht-select
                                v-model={this.searchFormData.settleStatus}
                                options={["未结清", "已结清"]}
                                filterable
                                multiple
                                has-selecte-all-val
                                collapse-tags
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        );
    },
};
</script>
<style lang="scss" scoped>
.autoselect-box {
  justify-content: flex-start;
}
</style>
