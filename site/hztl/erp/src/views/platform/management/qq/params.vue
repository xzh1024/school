<!--
 * @Author: Yong
 * @Date: 2021-09-22 14:45:42
 * @LastEditors: Yong
 * @LastEditTime: 2021-11-11 13:38:56
 * @Description: 
-->
<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import RequestQQ, { UpdateParamsSettingRequest } from "@/api/qq";
import * as store from "@/utils/store";
const defaultBaseSetting: UpdateParamsSettingRequest["value"] = {
  warehouseIds: [],
  priceType: "",
  auto: true,
  noPriceAuto: false,
  noStockAuto: false,
  newCustomerAuto: false
};
const defaultPriceType = [
  { id: "平台价", name: "平台价" },
  { id: "零售价", name: "零售价" },
  { id: "批发价", name: "批发价" },
  { id: "批发价一", name: "批发价一" },
  { id: "批发价二", name: "批发价二" },
  { id: "批发价三", name: "批发价三" },
  { id: "批发价四", name: "批发价四" }
];
@Component({ name: "paramSetting" })
export default class ParamSetting extends Vue {
  public baseSetting = { ...defaultBaseSetting };
  public priceType = defaultPriceType;
  public wareHouse: { id: number; name: string }[] = [];
  async toSave() {
    if (!this.baseSetting.priceType)
      return this.$message.warning("请选择新客户享受的价格类型");
    await RequestQQ.updateParamsSetting(this.baseSetting);
    this.$message.success("保存成功");
  }
  async featchWareHouse() {
    const allWarehouse = store.administerWareHouse();
    const res =
      (await RequestQQ.getWarehouses({
        businessCompanyId: store.userInfoMsg().companyId
      })) || [];
    this.wareHouse = allWarehouse.filter(item =>
      Object.keys(res).includes(String(item.id))
    );
    defaultBaseSetting.warehouseIds = this.wareHouse.map(item => item.id);
  }
  toRest() {
    this.baseSetting = { ...defaultBaseSetting };
  }
  mounted() {
    const hasSettingPerm = this.hasPerm("transaction.platforms.paramsSettings");
    if (hasSettingPerm) {
      this.initState();
    }
  }
  async initState() {
    this.featchWareHouse();
    const res = await RequestQQ.getParamsSetting();
    this.baseSetting = res.value;
  }
  render() {
    return (
      <div class="container-box">
        <ht-card title="参数设置" style="height:calc(100vh - 136px)">
          <div slot="after-title" class="text-right" style="margin-top:-4px;">
            <el-button size="mini" type="primary" on-click={this.toSave}>
              保存(F3)
            </el-button>
            <el-button size="mini" type="primary" on-click={this.toRest}>
              重置(F6)
            </el-button>
          </div>
          <p class="label">报价基础设置</p>
          <div class="flex flex-row-center">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、在报价时需要获取配件的库存，此处是设置获取库存的仓库，
                  <br />
                  如：配件A 性质‘完好’，在001仓库库存为‘10’
                  <br />
                  002仓库库存为‘5’，支持报价的仓库为001，则报价时获取到的配件A库存为10而非15；
                  <br />
                  2、注意：报价时默认只匹配配件性质为‘完好’的配件
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>支持报价的库存仓库: </span>
            </div>
            <div class="m-l-12">
              <ht-select
                value={this.baseSetting.warehouseIds}
                options={this.wareHouse}
                on-change={(value: number[]) => {
                  this.baseSetting.warehouseIds = value;
                }}
                size="mini"
                placeholder="仓库"
                clearable
                filterable
                multiple
                collapse-tags
                has-selecte-all-val
              />
            </div>
          </div>
          <div class="flex flex-row-center m-t-12">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、新客户定义：企鹅汽配中未绑定ERP往来单位的客户为新客户，
                  <br />
                  员工在给新客户报价时默认按此处设置的价格类型来进行报价。
                  <br />
                  2、老客户定义：已绑定ERP往来单位的客户为老客户，
                  <br />
                  在报价时默认按ERP中对应的往来单位享受的价格体系进行报价，不单独在此处进行设置。
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>新客户默认享受的价格类型: </span>
            </div>
            <div class="m-l-12">
              <ht-select
                required
                value={this.baseSetting.priceType}
                options={this.priceType}
                on-change={(value: string) => {
                  this.baseSetting.priceType = value;
                }}
                size="mini"
                placeholder="享受价格"
                clearable
                filterable
                collapse-tags
              />
            </div>
          </div>
          <p>自动报价设置</p>
          <div class="flex flex-row-center m-t-6">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、若启用则当客户询价时可自动根据设置好的参数进行自动回复价格
                  <br />
                  2、若不启用则不自动回复价格
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>是否启用自动报价: </span>
            </div>
            <div class="m-l-12">
              <el-switch
                value={this.baseSetting.auto}
                on-change={(value: boolean) => {
                  this.baseSetting.auto = value;
                }}
              ></el-switch>
            </div>
          </div>
          <div class="flex flex-row-center m-t-12">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、若允许，则当配件对应的客户享受的价格为0或无价格时会直接按0价格回复
                  <br />
                  2、若不允许，则当匹配的配件对应的客户享受的价格为0或无价格时则不对该配件自动回复价格
                  <br />
                  3、因为价格为0或无价格而未自动回复报价的配件会记录到报价篮的‘报价失败’中
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>价格为0的配件是否允许自动报价: </span>
            </div>
            <div class="m-l-12">
              <el-switch
                value={this.baseSetting.noPriceAuto}
                on-change={(value: boolean) => {
                  this.baseSetting.noPriceAuto = value;
                }}
              ></el-switch>
            </div>
          </div>
          <div class="flex flex-row-center m-t-12">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、若允许，则当配件的库存为0或无库存记录时会自动回复价格
                  <br />
                  2、若不允许，则当配件库存为0或无库存记录时则不对该配件自动回复价格
                  <br />
                  3、因为库存为0或无库存记录而未自动回复报价的配件会记录到报价篮的‘报价失败’中
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>库存为0的配件是否允许自动报价: </span>
            </div>
            <div class="m-l-12">
              <el-switch
                value={this.baseSetting.noStockAuto}
                on-change={(value: boolean) => {
                  this.baseSetting.noStockAuto = value;
                }}
              ></el-switch>
            </div>
          </div>
          <div class="flex flex-row-center m-t-12">
            <div style="width:250px">
              <el-tooltip enterable={false} placement="bottom">
                <div slot="content">
                  1、若允许，则新客户询价时会自动按设置的享受价格进行自动回复价格
                  <br />
                  2、若不允许，则新客户询价时始终不会自动回复价格
                </div>
                <i class="el-icon-question text-font-warning"></i>
              </el-tooltip>
              <span>新客户是否允许自动报价: </span>
            </div>
            <div class="m-l-12">
              <el-switch
                value={this.baseSetting.newCustomerAuto}
                on-change={(value: boolean) => {
                  this.baseSetting.newCustomerAuto = value;
                }}
              ></el-switch>
            </div>
          </div>
        </ht-card>
      </div>
    );
  }
}
</script>
