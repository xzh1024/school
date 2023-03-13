<template>
  <div class="tables-wrap">
    <ht-setting-table
      tableName="car-info"
      :columns="tableColumns"
      :data="table1"
      :show-header="false"
      :index-column="false"
      :selection-type="null"
      disabled-hotkeys
    />
    <ht-setting-table
      tableName="car-info"
      :columns="tableColumns"
      :data="table2"
      :show-header="false"
      :index-column="false"
      :selection-type="null"
      disabled-hotkeys
    />
    <ht-setting-table
      tableName="car-info"
      :columns="tableColumns"
      :data="table3"
      :show-header="false"
      :index-column="false"
      :selection-type="null"
      disabled-hotkeys
    />
  </div>
</template>

<script>
// import { baseDictionary } from "@/api/base/base";
import { dateFormatFull } from "@/utils/date";
import { getBillsDetail } from "@/api/repairs/bills";
export default {
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    billId: {
      handler(value) {
        if (value) {
          this.getBillInfo();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      billInfo: {},
      tableColumns: [
        {
          prop: "name",
          label: "",
          width: "100"
        },
        { prop: "content", label: "", width: "120" }
      ],
      table1Info: {},
      table2Info: {},
      table31Info: {},
      totalBalance: null
    };
  },
  computed: {
    table1() {
      return [
        {
          name: "车牌号",
          content: (
            <span style="color:#409EFF">{this.table1Info.plateNumber}</span>
          )
        },
        {
          name: "车辆级别",
          content: (
            <span style="color:#409EFF">
              {this.table1Info.vehicleLevelName}
            </span>
          )
        },
        {
          name: "车架号",
          content: <span style="color:#409EFF">{this.table1Info.vin}</span>
        },
        {
          name: "品牌",
          content: <span style="color:#409EFF">{this.table1Info.vehBrand}</span>
        },
        {
          name: "厂牌",
          content: <span style="color:#409EFF">{this.table1Info.facBrand}</span>
        },
        {
          name: "车型组",
          content: (
            <span style="color:#409EFF">{this.table1Info.vehicleGroup}</span>
          )
        },
        {
          name: "年款",
          content: <span style="color:#409EFF">{this.table1Info.year}</span>
        },
        {
          name: "排量 | 发动机",
          content: (
            <span style="color:#409EFF">
              {this.table1Info.displacementEngine
                ? this.table1Info.displacementEngine
                : `${this.table1Info.displacement} | ${this.table1Info.engine}`}
            </span>
          )
        },
        {
          name: "变速箱",
          content: (
            <span style="color:#409EFF">{this.table1Info.transmission}</span>
          )
        },
        {
          name: "发动机号",
          content: <span style="color:#409EFF">{this.table1Info.engineNo}</span>
        },
        {
          name: "客户名称",
          content: (
            <span style="color:#409EFF">{this.table1Info.cooperatorName}</span>
          )
        },
        {
          name: "客户电话",
          content: (
            <span style="color:#409EFF">{this.table1Info.cooperatorPhone}</span>
          )
        },
        {
          name: "送修人",
          content: (
            <span style="color:#409EFF">{this.table1Info.contactsName}</span>
          )
        },
        {
          name: "送修人电话",
          content: (
            <span style="color:#409EFF">{this.table1Info.contactsPhone}</span>
          )
        },
        {
          name: "送修人证件号码",
          content: (
            <span style="color:#409EFF">
              {this.table1Info.contactsCertNumber}
            </span>
          )
        }
      ];
    },
    table2() {
      return [
        {
          name: "接待顾问",
          content: (
            <span style="color:#409EFF">
              {this.table2Info.receptionManName}
            </span>
          )
        },
        {
          name: "接待时间",
          content: (
            <span style="color:#409EFF">
              {dateFormatFull(this.table2Info.receptionTime)}
            </span>
          )
        },
        {
          name: "进厂里程",
          content: (
            <span style="color:#409EFF">{`${
              this.table2Info.mileage ? this.table2Info.mileage + "km" : ""
            }`}</span>
          )
        },
        {
          name: "存油量",
          content: (
            <span style="color:#409EFF">{this.table2Info.oilDegree}</span>
          )
        },
        {
          name: "下次保养里程",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.nextMaintenanceMileage
                ? this.table2Info.nextMaintenanceMileage + "km"
                : ""}
            </span>
          )
        },
        {
          name: "下次保养日期",
          content: (
            <span style="color:#409EFF">
              {dateFormatFull(
                this.table2Info?.vehicle?.statistic?.nextMaintenanceDate
              ) || ""}
            </span>
          )
        },
        {
          name: "洗车",
          content: <span style="color:#409EFF">{this.table2Info.isWash}</span>
        },
        {
          name: "回收旧件",
          content: (
            <span style="color:#409EFF">{this.table2Info.isRecovery}</span>
          )
        },
        {
          name: "客户描述",
          content: (
            <span style="color:#409EFF">{this.table2Info.contactsRemark}</span>
          )
        },
        {
          name: "接待描述",
          content: (
            <span style="color:#409EFF">{this.table2Info.receptionRemark}</span>
          )
        },
        {
          name: "首次来厂",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.statistic?.firstComeDate || "从未到厂"}{" "}
              /{this.table2Info?.vehicle?.statistic?.firstComeMileage || 0}
              {"km"}
            </span>
          )
        },
        {
          name: "最后离厂",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.statistic?.lastLeaveDate || "从未到厂"}{" "}
              /{this.table2Info?.vehicle?.statistic?.lastLeaveMileage || 0}
              {"km"}
            </span>
          )
        },
        {
          name: "平均来厂",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.statistic?.monthAvg} 次/月
              {this.table2Info?.vehicle?.statistic?.mileageAvg} km/次
            </span>
          )
        },
        {
          name: "送修人电话",
          content: (
            <span style="color:#409EFF">{this.table2Info.contactsPhone}</span>
          )
        },
        {
          name: "服务次数",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.statistic?.count}
            </span>
          )
        }
      ];
    },
    table3() {
      return [
        {
          name: "会员等级",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.member?.grade?.name}
            </span>
          )
        },
        {
          name: "会员卡余额",
          content: <span style="color:#409EFF">{this.totalBalance}</span>
        },
        {
          name: "客户欠款",
          content: (
            <span style="color:#409EFF">
              {this.table2Info?.vehicle?.usedCreditAmount}
            </span>
          )
        },
        {
          name: "年审月份",
          content: (
            <span style="color:#409EFF">{this.table1Info.auditMonth}</span>
          )
        },
        {
          name: "保险到期",
          content: (
            <span style="color:#409EFF">{this.table1Info.insuranceExpiry}</span>
          )
        },
        {
          name: "保险公司",
          content: (
            <span style="color:#409EFF">
              {this.table1Info.insuranceCompanyName}
            </span>
          )
        }
      ];
    }
  },
  mounted() {
    if (this.billId) {
      this.getBillInfo();
    }
  },
  methods: {
    getBillInfo() {
      getBillsDetail(this.billId).then(res => {
        this.billInfo = { ...res };
        const {
          contactsPhone,
          contactsCertNumber,
          contactsName,
          cooperatorName,
          cooperatorPhone,
          vehicle,
          flags
        } = res;
        this.table1Info = {
          contactsPhone,
          contactsCertNumber,
          contactsName,
          cooperatorName,
          cooperatorPhone,
          ...vehicle
        };
        this.table2Info = {
          ...res,
          isWash: flags.wash ? "是" : "否",
          isRecovery: flags.recovery ? "是" : "否"
        };
        try {
          if (vehicle && vehicle.member && vehicle.member.cards) {
            let totalBalance = 0;
            vehicle.member.cards.forEach(item => {
              totalBalance += Number(Number(item.balance).toFixed(2));
            });
            this.totalBalance = totalBalance;
          }
        } catch (e) {
          console.log(e);
        }
        // this.getVehicleLevel(vehicle.vehicleLevelId);
      });
    }
    // getVehicleLevel(id) {
    //   baseDictionary({ type: "vehicleLevel" }).then(res => {
    //     const vehicle = res.options.find(item => item.id === id);
    //     this.$nextTick(() => {
    //       this.table1Info.vehicleLevel = vehicle ? vehicle.name : "";
    //     });
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.tables-wrap {
  display: flex;
  justify-content: center;
}
</style>
