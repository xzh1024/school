import Vue from "vue";
import { Fragment } from "vue-fragment";
import { CELL_WIDTH } from "@/constants";
import {
  BillMapPart,
  BillMapRes,
  platformBillMap,
  searchParts
} from "@/api/platform";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";

const topHotkeys = new TopHotkeys();

async function queryLocalPart(query: string) {
  const res = await searchParts({ keyword: query || "" });
  return res.parts.map(item => ({
    id: item.id,
    name: `${item.code} -- ${item.name} -- ${item.brand} -- ${item.productionPlace}`
  }));
}
const BillMapConfirm = (
  params: {
    billId: number;
    billType: 0 | 1;
    platformKey: string;
  },
  searchFunc: Function
) => {
  return platformBillMap(params).then(res => {
    return Vue.prototype
      .$promiseDialog({
        topClass: "bill-map-confirm ignore-top-hotkeys",
        disabledHotkeys: true,
        width: "1200px",
        title: "平台资料与ERP资料确认",
        model: {
          ...res,
          partsMap: res.partsMap.sort((a, b) => b.mappingId - a.mappingId)
        },
        afterVisible() {
          topHotkeys.bindHotkeys(
            document.querySelector(".bill-map-confirm") as HTMLElement
          );
        },
        contentRender(data: BillMapRes) {
          const columns = [
            { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
            { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
            { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
            {
              prop: "productionPlace",
              label: "产地",
              width: CELL_WIDTH.productionPlace
            },
            {
              prop: "mappingId",
              label: "本地ERP配件资料(输入配件编码\\名称查询）",
              width: 400,
              render: (value: number, row: BillMapPart) => (
                <ht-autoselect
                  size="mini"
                  v-model={row.mappingId}
                  defaultValue={`${
                    row.mappingId
                      ? `${row.mappingcode} -- ${row.mappingname} -- ${row.mappingbrand} -- ${row.mappingproductionPlace}`
                      : ""
                  }`}
                  highlight-first-item
                  trigger-on-focus={false}
                  remote
                  filterZero
                  placeholder="新增配件资料"
                  fetch-suggestions={queryLocalPart}
                />
              )
            }
          ];
          return (
            <el-form
              size="mini"
              label-width="110px"
              label-position="left"
              class="form-item-small-margin-bottom"
            >
              {data.needMappingCooperator ? (
                <el-row>
                  <el-col span={6}>
                    <el-form-item label="平台往来单位：">
                      {data.cooperatorMap.name}
                    </el-form-item>
                  </el-col>
                  <el-col span={8}>
                    <el-form-item label="erp往来单位：">
                      <ht-autoselect
                        size="mini"
                        v-model={data.cooperatorMap.mappingId}
                        defaultValue={data.cooperatorMap.mappingName}
                        highlight-first-item
                        trigger-on-focus={false}
                        remote
                        filterZero
                        placeholder="新增往来单位"
                        attrs={{
                          "fetch-suggestions": searchFunc
                        }}
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              ) : null}
              {data.needMappingParts ? (
                <Fragment>
                  <div style={{ margin: "20px 0 10px" }}>配件资料确认</div>
                  <ht-table
                    disabledHotkeys
                    data={data.partsMap}
                    columns={columns}
                  />
                </Fragment>
              ) : null}
            </el-form>
          );
        }
      })
      .then((res: BillMapRes) => {
        const detailId2PartId: { [key: number]: number } = {};
        res.partsMap.forEach(part => {
          detailId2PartId[part.orderDetailId] = part.mappingId;
        });

        return {
          orderId: params.billId,
          cooperatorId: res.needMappingCooperator
            ? res.cooperatorMap.mappingId
            : undefined,
          detailId2PartId: res.needMappingParts ? detailId2PartId : undefined
        };
      })
      .finally(() => {
        topHotkeys.unbindHotkeys(
          document.querySelector(".bill-map-confirm") as HTMLElement
        );
      });
  });
};

export default BillMapConfirm;
