<template>
  <div class="block-wrap">
    <!-- 会员信息 -->
    <div class="block">
      <div class="tag">
        <div class="title">会员信息</div>
      </div>
      <div class="line">
        <div class="label">会员等级</div>
        <div class="value">{{ member.grade ? member.grade.name : "" }}</div>
      </div>
      <div class="line">
        <div class="label">会员折扣</div>
        <div class="value">
          <span v-if="member.grade && member.grade.itemDiscount"
            >项目{{
              member.grade
                ? Number(member.grade.itemDiscount * 10).toFixed(2) || "-"
                : "-"
            }}折</span
          >
          <span v-if="member.grade && member.grade.setDiscount"
            >套餐{{
              member.grade
                ? Number(member.grade.setDiscount * 10).toFixed(2) || "-"
                : "-"
            }}折</span
          >
          <span v-if="member.grade && member.grade.partDiscount"
            >配件{{
              member.grade
                ? Number(member.grade.partDiscount * 10).toFixed(2) || "-"
                : "-"
            }}折</span
          >
        </div>
      </div>
      <div class="line">
        <div class="label">会员卡</div>
        <div class="value">
          {{ cardInfo.cardCount || 0 }}张 / {{ cardInfo.total || 0 }}元
        </div>
      </div>
      <div class="line">
        <div class="label">客户欠款</div>
        <div class="value">{{ otherInfo.usedCreditAmount || 0 }}元</div>
      </div>
      <div class="line">
        <div class="label">信用额度</div>
        <div class="value">{{ otherInfo.creditAmount || 0 }}元</div>
      </div>
      <div class="line">
        <div class="label">已购项目</div>
        <div class="value">
          {{ member.itemCount ? member.itemCount.item : 0 }}
        </div>
        <div class="label">已购套餐</div>
        <div class="value">
          {{ member.itemCount ? member.itemCount.set : 0 }}
        </div>
      </div>
      <div class="line">
        <div class="label">已购配件</div>
        <div class="value">
          {{ member.itemCount ? member.itemCount.part : 0 }}
        </div>
        <div class="value" style="cursor:pointer;" @click="showPaid">
          查看已购详情
        </div>
      </div>
    </div>
    <!-- 来厂信息 -->
    <div class="block">
      <div class="tag">
        <div class="title">来厂信息</div>
      </div>
      <div class="line">
        <div class="label">首次来厂</div>
        <div class="value">
          {{ statistic.firstComeDate || "从未到厂" }} /
          {{ statistic.firstComeMileage || 0 }}km
        </div>
      </div>
      <div class="line">
        <div class="label">最后离厂</div>
        <div class="value">
          {{ statistic.lastLeaveDate || "从未到厂" }} /
          {{ statistic.lastLeaveMileage || 0 }}km
        </div>
      </div>
      <div class="line">
        <div class="label">平均来厂</div>
        <div class="value">
          {{
            statistic.monthAvg ? Number(statistic.monthAvg).toFixed(2) || 0 : 0
          }}次/月 / {{ statistic.mileageAvg || 0 }}km/次
        </div>
      </div>
      <div class="line">
        <div class="label">服务次数</div>
        <div class="value">{{ statistic.count || 0 }} 次</div>
      </div>
    </div>
    <!-- 保险信息 -->
    <div class="block">
      <div class="tag">
        <div class="title">保险信息</div>
      </div>
      <div class="line">
        <div class="label">车辆保险公司</div>
        <div class="value">{{ otherInfo.insuranceCompanyName }}</div>
      </div>
      <div class="line">
        <div class="label">保单到期日</div>
        <div class="value">{{ otherInfo.insuranceExpiry }}</div>
      </div>
      <div class="line">
        <div class="label">绝对免赔率</div>
        <div class="value">
          {{
            otherInfo.deductionRate
              ? `${Number(otherInfo.deductionRate * 100).toFixed(2)}%`
              : ""
          }}
        </div>
      </div>
    </div>
    <Paid
      v-if="paidVisible"
      :visible="paidVisible"
      :vehicleId="otherInfo.vehicleId"
      @close="paidVisible = false"
    />
  </div>
</template>

<script>
import Paid from "./paid/paid";
export default {
  props: {
    otherInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    otherInfo: {
      handler(value) {
        console.log("会员信息", value);
        if (value && value.member) {
          const { statistic, member } = value;
          this.statistic = statistic;
          this.member = member;
          this.caluc(member);
          this.$forceUpdate();
        } else {
          this.statistic = {};
          this.member = {};
          this.caluc({});
          this.$forceUpdate();
        }
      },
      deep: true
    }
  },
  components: {
    Paid
  },
  data() {
    return {
      paidVisible: false,
      statistic: {},
      member: {},
      cardInfo: {}
    };
  },
  mounted() {
    const value = this.orderInfo;
    if (value && value.member) {
      const { statistic, member } = value;
      this.statistic = statistic;
      this.member = member;
      this.caluc(member);
      this.$forceUpdate();
    } else {
      this.statistic = {};
      this.member = {};
      this.caluc({});
      this.$forceUpdate();
    }
  },
  methods: {
    caluc(member) {
      const { cards } = member;
      let total = 0;
      if (!cards) {
        this.cardInfo = {
          cardCount: 0,
          total
        };
        return;
      }
      cards.forEach(card => {
        total += Number(Number(card.balance).toFixed(2));
      });
      this.cardInfo = {
        cardCount: cards.length,
        total
      };
    },
    showPaid() {
      this.paidVisible = true;
      console.log(this.paidVisible);
    }
  }
};
</script>

<style lang="scss" scoped>
.block-wrap {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .block {
    width: 350px;
    position: relative;
    padding: 35px 10px 0px 10px;
    border: solid 1px #eee;
    border-radius: 5px;
    margin-bottom: 10px;
    .tag {
      width: 90px;
      height: 40px;
      text-align: center;
      line-height: 20px;
      padding-bottom: 10px;
      position: absolute;
      top: 10px;
      right: -5px;
      color: #fff;
      z-index: 999;
      background-size: contain;
      background-image: url("~@/assets/images/member-tag.png");
      background-repeat: no-repeat;
    }
    .line {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      .label {
        width: 90px;
      }
      .value {
        color: rgb(22, 150, 255);
        margin-right: 20px;
      }
    }
  }
}
</style>
