<template>
  <div class="page">
    <div ref="printRef" class="print-box">
      <div class="row flex justify-between align-end">
        <i-form v-model="formData" :options="formOptions" class="flex-1" />
        <div class="contract-no"> 合同编号：{{ formData.contractNo }} </div>
      </div>
      <a-input v-model="formData.title" class="contract-title" />
      <br />
      <div class="row flex justify-between">
        <a-avatar shape="square" :size="120" :style="{ marginRight: '100px' }">
          <IconUser />
        </a-avatar>
        <i-form v-model="formData" :options="userFormOptions" />
      </div>
      <br />
      <i-table :options="tableOptions" :data="formData.tableData" />
      <br />
      <i-form v-model="formData" :options="listFormOptions" />

      <div class="sign">
        <div>会员签名：{{ formData.signName }}</div>
        <div>签订日期：{{ formData.date }}</div>
      </div>
    </div>

    <div class="action-box">
      <a-space>
        <a-button @click="onBack">返回</a-button>
        <a-button type="primary" @click="onSave">确认</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  // import { getHtml2Pdf, toPrint } from '@/utils/print';
  import { useRouter } from 'vue-router';
  import { groundPcApiGroundContractTemplateModifyTemplatePost } from '@/api/ground-pc-api';
  import { sessionKey } from './dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  const router = useRouter();

  const formData = reactive({
    id: -1,
    contractNo: '********************',
    printType: 1,
    title: '会籍合约书',
    tableData: [{ line: '-' }],
    start: '****',
    signName: '****',
    date: '2022-12-12',
    content: `第一条：会员在卡有效期内可以在规定的使用时段内出入场馆享受相应服务。
第二条：购买的卡均须在卡有效期内使用，超过有效期将不能入场。
第三条：如果会员了解自己有任何关于身体方面的原因而导致不能使用或体验本场馆的任一器械或运动项目，请先书面告知工作人员，并停止器械使用及运动项目，否则如果因此发生身体危险，或达不到您所希望的目标，本店不负任何责任。
第四条：如果会员的卡到期，会员在到期前也没有来场馆使用的，本店同样视为卡过期，过期后将不能正常入场，本店概不退还已付钱款。
第五条：会员保证及确认
  1、 会员签署本协议时，应保证身心状况良好。会员使用本店所有设施及服务时，不会对自身或他人身体健康造成威胁。
  2.、在会员签署本协议后，本店不负责就会员使用设施及接受集体训练服务的身体状况及能力向会员提出医学意见。
  3、如会员在签署本协议之时或之后有任何健康方面的状况，应在使用设施及进行私教训练之前咨询专业医生。
第六条：由工作人员私自承诺的任何赠送课时、礼品等服务，本店概不负责。
签约人承若：工作人员已经进行了详细的讲解，本人也认真阅读并详细了解了本协议书的全部内容，本人将自觉遵守该协议的各项条款内容。本人声明本合同协议具有约束力并取代所有书面及口头协定，在充分的理解的基础上签订的本协议，若法院宣布本协议任何部分无效，本协议将不受影响并继续有效。`
  });
  const formOptions = {
    formCard: false,
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '打印方式',
        prop: 'printType',
        type: 'select',
        dic: [
          { label: '一式一联', value: 1 },
          { label: '一式两联', value: 2 },
          { label: '一式三联', value: 3 }
        ],
        span: 8
      }
    ]
  };

  const userFormOptions = {
    formCard: false,
    menuForm: false,
    menuSpan: 0,
    columns: [
      { label: '姓名：', prop: 'start', span: 8, type: 'span' },
      { label: '联系方式：', prop: 'start', span: 8, type: 'span' },
      { label: '身份证：', prop: 'start', span: 8, type: 'span' },
      { label: '销售人员：', prop: 'start', span: 8, type: 'span' }
    ]
  };

  const tableOptions = {
    index: false,
    pageShow: false,
    tableCard: false,
    menu: false,
    columns: [
      { label: '时间(天)', prop: 'line', width: 98 },
      { label: '售价(元)', prop: 'line', width: 98 },
      { label: '允许冻结天数', prop: 'line', width: 124 },
      { label: '赠送天数(天)', prop: 'line', width: 138 },
      { label: '合计天数', prop: 'line', width: 98 },
      { label: '付款方式', prop: 'line', width: 98 },
      { label: '应付金额(元)', prop: 'line', width: 136 },
      { label: '实付金额(元)', prop: 'line', width: 136 }
    ]
  };

  const listFormOptions = {
    formCard: false,
    menuForm: false,
    columns: [
      { label: '合同总金额：', prop: 'start', span: 6, type: 'span' },
      { label: '有效期：', prop: 'start', span: 6, type: 'span' },
      { label: '操作员：', prop: 'start', span: 6, type: 'span' },
      { label: '激活方式：', prop: 'start', span: 6, type: 'span' },
      { label: '支持店铺：', prop: 'start', span: 6, type: 'span' },
      { label: '支持场馆：', prop: 'start', span: 6, type: 'span' },
      { label: '转让手续费：', prop: 'start', span: 6, type: 'span' },
      { label: '备注：', prop: 'start', span: 24, type: 'span' },
      {
        label: '合同章程 ：',
        prop: 'content',
        span: 24,
        type: 'textarea',
        options: {
          'auto-size': {
            minRows: 15,
            maxRows: 30
          }
        }
      }
    ]
  };

  function onBack() {
    router.go(-1);
  }

  const printRef = ref();
  const [onSave] = useFuncProxy(async () => {
    await groundPcApiGroundContractTemplateModifyTemplatePost({
      ...formData
    });
    Message.success('操作成功!');
    onBack();
  });
  async function print() {
    // const dom = await getHtml2Pdf(printRef.value, {
    //   width: 992
    // });
    // toPrint(dom);
  }

  onMounted(() => {
    const sessionData = sessionStorage.getItem(sessionKey) || '';
    const data = JSON.parse(sessionData);
    formData.id = data.id;
    formData.content = data.content;
    formData.title = data.title;
    formData.printType = data.printType;
  });
</script>

<style lang="less" scoped>
  .page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
  }

  .contract-title {
    box-sizing: border-box;
    max-width: 300px;
    height: 48px;
    border: 1px solid #e6e6e6;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 16px;
    background-color: transparent;
    display: block;
    margin-top: 24px;

    :deep(.arco-input) {
      padding: 0;
      font-size: 24px;
      font-weight: 500;
      color: #333333;
      line-height: 48px;
      text-align: center;
    }
  }

  :deep(.arco-form-item) {
    margin-bottom: 0;
  }

  .row {
    flex-shrink: 0;
  }

  .contract-no {
    font-size: 18px;
    font-weight: 500;
    color: #333333;
    line-height: 26px;
  }

  .sign {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    & > div {
      margin-top: 16px;
      width: 220px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
    }
  }

  .print-box {
    width: 992px;
    margin: 0 auto;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(#000, 0.08);
  }

  .action-box {
    margin-top: 50px;
    text-align: right;
  }
</style>
