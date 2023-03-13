<template>
  <a-card :body-style="{ padding: '40px 20px 30px' }">
    <a-row style="margin-bottom: 50px" :gutter="30" justify="space-around">
      <a-col :span="6">
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div class="textItem">{{ data.validIntegral || '--' }}</div>
            <div class="text">可用积分</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #fff5dd">
              <a-image
                src="~@/assets/images/home/icon2.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div class="textItem">{{ data.protectIntegral || '--' }}</div>
            <div class="text">保护期内积分</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #ffdbdf">
              <a-image
                src="~@/assets/images/home/icon3.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div class="textItem">{{ data.grantIntegral || '--' }}</div>
            <div class="text">累计发放积分</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6">
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #f1e3ff">
              <a-image
                src="~@/assets/images/home/icon4.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div class="textItem">{{ data.consumeIntegral || '--' }}</div>
            <div class="text">累计消耗积分</div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="card-box">
      <a-col :span="6">
        <a-card
          title="积分通用规则"
          :header-style="{ ...cardHeaderStyle }"
          :body-style="{ ...cardBodyStyle }"
        >
          <h4>积分有效期</h4>
          <p v-if="data.common.validType === 1">永久有效</p>
          <p v-else-if="data.common.validType === 2"
            >从获得开始至{{ data.common.valid }}年后{{
              data.common.fixedMonth
            }}月{{ data.common.fixedDay }}日后失效</p
          >
          <p v-else-if="data.common.validType === 3"
            >从获得开始至{{ data.common.valid
            }}{{ validUnitHash[data.common.validUnit] }}</p
          >
          <p v-else>已关闭</p>

          <h4>积分保护期</h4>
          <p v-if="data.common.protectStatus === 2"
            >积分在发放{{
              data.common.protectDay
            }}天内，进入保护期，保护器内无法使用</p
          >
          <p v-else>已关闭</p>

          <h4>消费积分获取上限</h4>
          <p v-if="data.common.limitStatus === 2"
            >每个客户每天通过消费最多可获取{{ data.common.maxIntegral }}积分</p
          >
          <p v-else>已关闭</p>
          <a-button
            v-permission="['members:integral:rule']"
            type="primary"
            class="operate-btn"
            @click="handleShowEditCommon"
            >修改</a-button
          >
        </a-card>
      </a-col>
      <a-col :span="6" :offset="2">
        <a-card
          title="积分消费规则"
          :header-style="{ ...cardHeaderStyle, background: '#FEF9FA' }"
          :body-style="{ ...cardBodyStyle, background: '#FEF9FA' }"
        >
          <h4>兑换比例</h4>
          <p v-if="data.consume.exchangeRate"
            >{{ data.consume.exchangeRate }}积分可兑换1元人民币</p
          >
          <p v-else>未配置</p>
          <h4>积分抵现</h4>
          <div v-if="data.consume.ruleStatus === 2">
            <div>
              <p v-if="data.consume.cillType === 2"
                >订单金额门槛：订单金额最低为{{
                  data.consume.cillAmount
                }}元时可抵现</p
              >
              <p v-else>订单金额门槛：不限制</p>
            </div>
            <div>
              <p v-if="data.consume.limitType === 2"
                >抵现金额上限：每笔订单最多抵扣{{
                  data.consume.limitAmount
                }}元</p
              >
              <p v-else-if="data.consume.limitType === 3"
                >抵现金额上限：每笔订单最多抵扣{{
                  data.consume.limitAmount
                }}%</p
              >
              <p v-else>抵现金额上限：不限制</p>
            </div>
          </div>
          <div v-else>已关闭</div>
          <a-button
            v-permission="['members:integral:rule']"
            type="primary"
            class="operate-btn"
            style="background-color: #e9818d"
            @click="handleShowEditConsume"
            >修改</a-button
          >
        </a-card>
      </a-col>
      <a-col :span="6" :offset="2">
        <a-card
          title="积分获取规则"
          :header-style="{ ...cardHeaderStyle, background: '#FFFAF5' }"
          :body-style="{ ...cardBodyStyle, background: '#FFFAF5' }"
        >
          <h4>获取规则</h4>
          <p v-if="data.obtain.amount"
            >单笔消费订单满{{ data.obtain.amount }}元，赠送积分{{
              data.obtain.integral
            }}分</p
          >
          <p v-else>未配置</p>
          <a-button
            v-permission="['members:integral:rule']"
            type="primary"
            class="operate-btn"
            style="background-color: #f29b36"
            @click="handleShowEditObtain"
            >修改</a-button
          >
        </a-card>
      </a-col>
    </a-row>
    <edit-common
      v-if="page.showEditCommon"
      v-model="page.showEditCommon"
      @refresh="handleRefresh"
    />
    <edit-consume
      v-if="page.showEditConsume"
      v-model="page.showEditConsume"
      @refresh="handleRefresh"
    />
    <edit-obtain
      v-if="page.showEditObtain"
      v-model="page.showEditObtain"
      @refresh="handleRefresh"
    />
  </a-card>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, onMounted } from 'vue';
  // import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectMembersIntegralIntegralGet } from '@/api';
  import EditObtain from './__components__/edit-obtain.vue';
  import EditConsume from './__components__/edit-consume.vue';
  import EditCommon from './__components__/edit-common.vue';

  interface HashType {
    [index: number]: string;
  }
  interface PageConfig {
    showEditObtain: boolean;
    showEditConsume: boolean;
    showEditCommon: boolean;
  }
  const cardHeaderStyle = {
    'background': '#F4F7FF',
    'text-align': 'center',
    'fontWeight': 'bold'
  };
  const cardBodyStyle = {
    height: '550px',
    paddingBottom: '50px',
    background: '#F4F7FF'
  };
  const validUnitHash: HashType = {
    1: '年',
    2: '月',
    3: '日'
  };
  const data: Ref = ref({
    common: {},
    consume: {},
    obtain: {}
  });
  const page = reactive<PageConfig>({
    showEditObtain: false,
    showEditConsume: false,
    showEditCommon: false
  });
  function handleShowEditCommon() {
    page.showEditCommon = true;
  }
  function handleShowEditConsume() {
    page.showEditConsume = true;
  }
  function handleShowEditObtain() {
    page.showEditObtain = true;
  }
  function handleRefresh() {
    getData();
  }
  const [getData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectMembersIntegralIntegralGet({});
  });
  onMounted(() => {
    getData();
  });
</script>
<style scoped lang="less">
  .iconItem {
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    border-radius: 8px;
  }

  .rightItem {
    min-width: 140px;
    margin-left: 12px;
    color: #666;
    font-size: 14px;

    .textItem {
      color: #0a7bff;
      font-size: 24px;
    }

    .text {
      padding-top: 5px;
      color: #0a7bff;
      font-size: 16px;
    }
  }

  .operate-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    justify-content: center;
    width: 100%;
    transform: translateX(-50%);
  }

  .card-box {
    p {
      line-height: 30px;
    }
  }
</style>
