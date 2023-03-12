<template>
  <div class="warp">
    <div class="left">
      <i-form ref="AddCardForm" v-model="page.form" :options="formOptions">
        <!-- logo上传插槽 -->
        <template #marketLogoForm>
          <i-custom-upload
            v-model="page.form.marketLogo"
            url-key="previewAddress"
            :options="{ limit: 1, accept: 'image/*' }"
          />
        </template>

        <!-- 背景上传插槽 -->
        <template #cardBackForm>
          <i-custom-upload
            v-model="page.form.cardBack"
            url-key="previewAddress"
            :options="{ limit: 1, accept: 'image/*' }"
          />
        </template>
        <!-- 参考购卡及充值金额插槽 -->
        <template #cardAmountListForm>
          <div class="putAmount-title">
            <div class="amount-top">
              <div>参考购卡及充值金额</div>
              <div>
                <a-button type="primary" @click="addRow">
                  <template #icon>
                    <icon-plus />
                  </template>
                  <template #default>添加行</template>
                </a-button>
              </div>
            </div>

            <i-table
              :options="page.tableOptions"
              :data="page.form.cardAmountList"
            >
              <template #amountCell="{ record, rowIndex }">
                <a-input
                  v-model="record.amount"
                  placeholder="请输入金额"
                  :max-length="5"
                  @input="inputChange(record.amount, rowIndex)"
                  @blur="minTest(rowIndex, record.amount)"
                ></a-input>
              </template>
              <template #menu="scope">
                <a-button
                  :disabled="scope.rowIndex === 0"
                  type="text"
                  status="danger"
                  @click="deleRow(scope.rowIndex)"
                  >删除</a-button
                >
              </template>
            </i-table>
          </div>
        </template>
        <template #shopForm>
          <a-form-item label="选择店铺" required style="margin-bottom: 0">
            <apply-shop
              v-model="typeData"
              :shop-list="shopList"
              :disabled="page.isEdit"
              :project-id="page.form.projectId || null"
              @submit="getCardStoreList"
            />
          </a-form-item>
        </template>
      </i-form>

      <div class="bottom-btn">
        <a-button type="text" style="margin-right: 24px" @click="cancel"
          >取消</a-button
        >
        <a-button type="primary" :loading="submitLoading" @click="onBeforeOk"
          >确认</a-button
        >
      </div>
    </div>
    <!-- 右侧h5 -->
    <div class="right">
      <div class="bg">
        <iframe
          id="basicIframe"
          ref="basicRefs"
          :src="`${H5Url}/pages/card/cardRecord/cardRecord`"
          frameborder="0"
          class="content"
          @load="iframeOnload"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, onMounted, watch } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import ApplyShop from '@/views/svc/__components__/applyShop.vue';
  import { useRoute, useRouter } from 'vue-router';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import ITable from '@/components/i-table/index.vue';
  import { H5Url } from '@/utils/h5Url';
  import debounce from 'lodash/debounce';
  import {
    svcWebCardDetailIdGet,
    svcWebCardSavePost,
    svcWebCardModifyPut
  } from '@/api/svc-web';
  import Messenger from '@har/messenger';

  const typeData = ref(1);
  const shopList = ref<any>([]);
  const basicRefs: Ref = ref(null);
  const submitLoading: Ref = ref(false);
  const route = useRoute();
  const router = useRouter();
  const messenger = new Messenger('basciRefs', 'cardCode');

  const page = reactive<any>({
    isEdit: route.query.id ? true : false, //是否是编辑页面
    search: {
      type: 1
    },
    shopSearch: {
      type: 2
    },
    tableOptions: {
      tableCard: false,
      pageShow: false,
      indexTitle: '序号',
      index: true,
      menu: true,
      columns: [
        {
          label: '购卡及充值金额',
          prop: 'amount'
        }
      ]
    },

    form: {
      projectId: '',
      cardName: '',
      marketName: '',
      applyType: 1,
      marketLogo: [],
      cardBack: [],
      cardStoreList: [],
      cardAmountList: [
        {
          amount: ''
        }
      ]
    }
  });
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '项目',
          prop: 'projectId',
          type: 'select',
          rules: [
            { required: route.query.id ? false : true, message: '请选择项目' }
          ],
          options: {
            disabled: page.isEdit
          },
          dic: svcProjectDropList.value,
          span: 8
        },
        {
          label: '储值卡名称',
          prop: 'cardName',
          rules: [{ required: true, message: '请填写储值卡名称' }],
          options: {
            maxLength: 20
          },
          span: 8
        },
        {
          label: '商场名称',
          prop: 'marketName',
          rules: [{ required: true, message: '请填写商场名称' }],
          options: {
            maxLength: 20
          },
          span: 8
        },
        {
          label: '',
          prop: 'cardAmountList',
          span: 24
        },
        {
          prop: 'shop',
          type: 'groupTitle'
        },
        {
          prop: 'table',
          type: 'groupTitle'
        },
        {
          label: '商场LOGO',
          prop: 'marketLogo',
          rules: [{ required: true, message: '请上传商场LOGO' }],
          span: 12
        },
        {
          label: '卡背景',
          prop: 'cardBack',
          rules: [{ required: true, message: '请上传卡背景' }],
          span: 12
        },
        {
          label: '储值卡详情',
          prop: 'cardDetail',
          options: {
            maxLength: 100
          },
          rules: [{ required: true, message: '请填写储值卡详情' }],
          span: 24
        }
      ]
    };
  });
  const AddCardForm: Ref = ref(null);

  //删除行
  const deleRow = (index: number) => {
    if (page.form.cardAmountList.length == 1) {
      Message.warning('至少保留一个金额！');
      return false;
    }
    page.form.cardAmountList.splice(index, 1);
  };
  //新增行
  const addRow = () => {
    if (page.form.cardAmountList.length > 7) {
      Message.warning('最多新增8个金额！');
      return false;
    }
    page.form.cardAmountList.push({
      amount: ''
    });
  };
  function inputChange(v: string, index: number) {
    //只能输入正整数
    page.form.cardAmountList[index].amount = (page.form.cardAmountList[
      index
    ].amount.match(/\d+(\.\d)?/) || [''])[0];
  }
  //确认新增
  async function onBeforeOk() {
    const res = await AddCardForm.value.submit();
    if (!res) {
      try {
        for (let index = 0; index < page.form.cardAmountList.length; index++) {
          const items = page.form.cardAmountList[index];
          if (!items.amount) {
            Message.warning(`请填写 第${index + 1}行 参考购卡及充值金额！`);
            return false;
          }
        }
        //去除 amount key
        const newAmount = page.form.cardAmountList.map((items: any) => {
          return items.amount;
        });
        let date = null;
        if (route.query.id) {
          date = {
            ...page.form,
            cardAmountList: newAmount,
            marketLogo:
              page.form.marketLogo.key ||
              page.form.marketLogo.id ||
              page.form.marketLogo[0]?.key ||
              page.form.marketLogo[0]?.id,
            cardBack:
              page.form.cardBack.key ||
              page.form.cardBack.id ||
              page.form.cardBack[0]?.key ||
              page.form.cardBack[0]?.id
          };
        } else {
          date = {
            ...page.form,
            cardAmountList: newAmount,
            marketLogo:
              page.form.marketLogo[0]?.key || page.form.marketLogo[0]?.id,
            cardBack: page.form.cardBack[0]?.key || page.form.cardBack[0]?.id
          };
        }
        console.log(date);
        submitLoading.value = true;
        if (route.query.id) {
          const { cardStoreList = [] } = date;
          // cardStoreList.forEach((el: any) => {
          //   // el.venueApplyType = el.venueApplyType;
          // });
          //编辑调用
          await svcWebCardModifyPut({
            ...date,
            id: route.query.id,
            cardStoreList
          });
        } else {
          //新增调用
          await svcWebCardSavePost(date);
        }
        submitLoading.value = false;
        router.push({
          path: '/svc/electronCard/basicSetting'
        });
        Message.success('操作成功！');
      } catch (error) {
        submitLoading.value = false;
        console.log(error);
      }
    }
  }
  //选择店铺组件事件回调
  const getCardStoreList = (v: any) => {
    page.form.applyType = typeData.value;
    page.form.cardStoreList = v;
  };
  //取消按钮
  const cancel = () => {
    router.push({
      path: '/svc/electronCard/basicSetting'
    });
  };
  //金额输入失焦判断
  const minTest = (index: any, value: Number) => {
    if (page.form.cardAmountList[index].amount == 0) {
      page.form.cardAmountList[index].amount = '';
      Message.warning('金额不能为零，或者为空！');
      return;
    }
    if (index == 0) {
      return;
    }

    const lastAmount = page.form.cardAmountList[index - 1].amount;
    const nowAmount = value;
    if (Number(lastAmount) >= Number(nowAmount)) {
      page.form.cardAmountList[index].amount = '';
      Message.warning('输入金额不能小于,或者等于上次输入的金额！');
    }
  };
  //获取详情
  const [getDetails] = useFuncProxy(async () => {
    if (route.query.id) {
      page.form = await svcWebCardDetailIdGet({
        id: route.query.id as unknown as string
      });
      //cardAmountList转换添加 amoumt字段
      const newArrList = page.form.cardAmountList.map((it: any) => {
        const v: string = it.toString();
        return { amount: v };
      });
      typeData.value = page.form.applyType;
      shopList.value = page.form.cardStoreList.map((el: any) => {
        return {
          ...el,
          linkTel: el.contactsPhone,
          linkman: el.contacts,
          name: el.storeName,
          venueIds: el.venueApplyType === 1 ? [] : el.venueIds,
          // typeData.value === 2 部分店铺可用 如果el.venueApplyType =1 为全场地可用,
          // typeData.value === 3 所有店铺不可用 如果el.venueApplyType =1 为全场地不可用,改为-1
          spaceApplyType:
            typeData.value === 1 || typeData.value === 2
              ? el.venueApplyType
              : el.venueApplyType === 1
              ? -1
              : el.venueApplyType
        };
      });
      console.log(shopList.value);
      page.form.cardAmountList = newArrList;
      await iframeOnload();
    }
  });

  let ready: () => void;
  const readyFn = new Promise<void>((resolve) => (ready = resolve));
  //iframe 加载完成渲染h5
  const iframeOnload = () => {
    ready();
  };
  const sendData = debounce(function (data: any) {
    readyFn.then(() => {
      messenger.targets['cardCode'].send({
        cardName: data.cardName,
        marketLogoUrl:
          data.marketLogo[0]?.url || data.marketLogo?.previewAddress || [],
        cardBackgroundUrl:
          data.cardBack[0]?.url || data.cardBack?.previewAddress || []
      });
    });
  }, 500);

  watch(
    () => page.form,
    (v) => {
      sendData(v);
    },
    { deep: true }
  );

  onMounted(() => {
    getDetails();
    messenger.addTarget(basicRefs.value.contentWindow, 'cardCode');
    getSvcProjectDrop();
  });
</script>
<style scoped lang="less">
  .warp {
    display: flex;
    height: 100%;
    overflow: auto;
    .left {
      width: 70vw;
      margin-right: 16px;
      background: #fff;
      border-radius: 4px;
      padding: 16px;
      .radioLess {
        display: flex;
        width: 100%;
        .radio-items {
          width: 160px;
          margin-right: 12px;
        }
      }
      .bottom-btn {
        text-align: right;
      }

      .putAmount-title {
        display: flex;
        flex-direction: column;
        width: 100%;
        .amount-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
      }
    }

    .right {
      height: 100%;
      width: 30vw;
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      justify-content: center;

      .bg {
        width: 416px;
        height: 852px;
        background: url(@/assets/images/svc/phone-bg.png);
        background-color: #fff;
        position: relative;
        .content {
          width: 370px;
          height: 568px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee;
          position: absolute;
          left: 22px;
          top: 100px;
        }
      }
    }
  }
  .addBtn {
    display: flex;
    line-height: 40px;
    div {
      border: 1px solid #eee;
      border-top: none;
      text-align: center;
    }
  }
</style>
