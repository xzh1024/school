<template>
  <div class="straight-matter">
    <a-spin :loading="loading" style="width: 100%; background: #fff">
      <a-tabs :default-active-key="tab" @change="handleChangeTab">
        <!--        <a-tab-pane :key="1" title="合同正文">-->
        <!--          <div class="straight-matter-handle">-->
        <!--            <a-space>-->
        <!--              <a-button @click="handleDownload" type="primary">下载</a-button>-->
        <!--              <a-button @click="handlePrint" type="primary">打印</a-button>-->
        <!--            </a-space>-->
        <!--          </div>-->
        <!--          <EditorContract v-model:value="html" />-->
        <!--        </a-tab-pane>-->
        <a-tab-pane :key="2" title="合同摘要">
          <div class="straight-matter-handle">
            <a-space>
              <a-button type="primary" @click="handleDownload">下载</a-button>
              <a-button type="primary" @click="handlePrint">打印</a-button>
            </a-space>
          </div>
          <div ref="abstractElRef">
            <ContractAbstract :value="abstractInfoModel" />
          </div>
        </a-tab-pane>
        <!--          // TODO  v-if="contractInfo.contractType === 2"-->
        <a-tab-pane :key="3" title="合同版本">
          <div>
            <a-divider orientation="left">
              <span>合同初始版本</span>
            </a-divider>
            <i-table :data="contractInitVersionList" :options="page1.options">
              <template #menu="{ record }">
                <a-space>
                  <a-button type="text" @click="handleViewAbstract(record)">
                    查阅
                  </a-button>
                </a-space>
              </template>
            </i-table>
          </div>
          <div style="margin-top: 40px">
            <!--              <a-button @click="handleViewAbstract({ version: 1 })"-->
            <!--                >查阅</a-button-->
            <!--              >-->
            <!--              <a-button-->
            <!--                @click="handleViewAbstract({ version: 2, prevVersionId: 18 })"-->
            <!--                >查阅</a-button-->
            <!--              >-->
            <a-divider orientation="left">
              <span>合同历史版本</span>
            </a-divider>
            <i-table
              v-model="page2.search"
              v-model:refresh-now="page2.refresh"
              :api="fetchContractHistory"
              :options="page2.options"
            >
              <template #menu="{ record }">
                <a-space>
                  <a-button type="text" @click="handleViewAbstract(record)">
                    查阅
                  </a-button>
                </a-space>
              </template>
            </i-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
    <FooterBtn
      :need-pre="true"
      :need-save="false"
      :need-next="contractInfo.businessStatus !== 1"
      :need-left-btn="false"
      :need-examine="contractInfo.handleType !== 3"
      @on-pre="emit('on-pre')"
      @on-cancel="emit('on-cancel')"
      @on-update="emit('on-update')"
      @on-next="handleSave(2)"
      @on-save="handleSave(1)"
    />
    <!--查阅单个-->
    <a-drawer
      v-if="visibleViewAbstractType === 1"
      :header="false"
      :visible="visibleViewAbstract"
      width="75%"
      unmount-on-close
      @close="visibleViewAbstract = false"
    >
      <template #footer>
        <a-button @click="handleExport">导出</a-button>
        <a-button @click="visibleViewAbstract = false">关闭</a-button>
      </template>
      <a-spin :loading="loadingAbstractInfo" style="width: 100%" tip="加载中">
        <ContractAbstract :value="abstractInfoCurrentVersionModel" />
      </a-spin>
    </a-drawer>
    <!--查阅多个-->
    <a-drawer
      v-if="visibleViewAbstractType === 2"
      :header="false"
      :visible="visibleViewAbstract"
      width="100%"
      unmount-on-close
      @close="visibleViewAbstract = false"
    >
      <template #footer>
        <a-button type="primary" @click="visibleViewAbstract = false"
          >关闭</a-button
        >
      </template>
      <a-spin :loading="loadingAbstractInfo" style="width: 100%" tip="加载中">
        <ContractAbstract2
          :value="abstractInfoCurrentVersionModel"
          :value2="abstractInfoPrevVersionModel"
        />
      </a-spin>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'StraightMatterForm'
  };
</script>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import EditorContract from '@/components/editor-contract/index.vue';
  import { ref, reactive, onMounted } from 'vue';
  import renderTemplate from '@/components/editor-contract/utils/render-template';
  import {
    CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse,
    CbdApiProjectFormalContractHistoryContractIdGetResponse,
    CbdApiProjectFormalContractHistoryContractIdGetRequest,
  } from '@/api';
  import ContractAbstract from '@/views/new-contract/__components__/content/abstract/form-single.vue';
  import ContractAbstract2 from '@/views/new-contract/__components__/content/abstract/form-double.vue';
  import { getHtml2Pdf, toPrint } from '@/utils/print';
  import { useContractStore } from '@/store/project/contract';
  import { useApi } from './use-api';
  import { download } from '@/utils/oss-upload';
  import FooterBtn from '../../footer-btn.vue';
  import {useAsyncTasks} from '@/hooks/use-async-tasks';

  interface PageConfig {
    search?: { [propName: string]: unknown };
    options?: { [propName: string]: unknown };
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: { [propName: string]: unknown };
  }

  const emit = defineEmits([
    'on-update',
    'on-pre',
    'on-save',
    'on-cancel',
    'on-next',
  ]);
  const {contractInfo, drawerVisible, tableRefresh, getExpenseTree} =
    useContractStore();
  const {abstractExportUrl, abstractInfoApi, contractHistoryApi} = useApi(
    contractInfo.contractType,
  );
  const {loading, execAsyncTasks} = useAsyncTasks();

  const tab = ref(2);
  const abstractElRef = ref();
  const visible = ref(false);
  const loadingAbstractInfo = ref(false);
  const labelStyle = ref({ width: '100px' });
  const contractInitVersionList = ref([]);
  const abstractInfoModel =
    ref<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>({});
  const abstractInfoPrevVersionModel =
    ref<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>({});
  const abstractInfoCurrentVersionModel =
    ref<CbdApiProjectIntentionContractAbstractInfoContractIdGetResponse>({});
  const visibleViewAbstract = ref(false);
  const visibleViewAbstractType = ref(1);

  const str = `<h1 style="text-align: center;">商品租赁合同</h1><p>出租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22lessor%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce3aa57d-e67b-4bd8-831a-edf62703b808%22%2C%22type%22%3A%22har-field%22%7D" style="width: 120.96px;"></span>(以下简称甲方)</p><p>联系地址：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactAddress%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22174fc93a-d93a-4925-a165-1cc781b16ae3%22%2C%22type%22%3A%22har-field%22%7D" style="width: 126.98px;"></span></p><p>承租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22tenantry%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228347794a-3c2e-469a-bb84-c1730f7ab1bd%22%2C%22type%22%3A%22har-field%22%7D" style="width: 129.98px;"></span>(以下简称乙方)</p><p>联系电话：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactPhone%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22b207fcca-aa8f-4fdf-bf5b-06a5f599b33a%22%2C%22type%22%3A%22har-field%22%7D" style="width: 127.97px;"></span></p><h3>合约信息</h3><table data-w-e-type="har-table" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contractInformation%22%2C%22children%22%3A%5B%7B%22label%22%3A%22%E6%89%BF%E7%A7%9F%E9%9D%A2%E7%A7%AF%22%2C%22field%22%3A%22test1%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%220ee33a56-090a-4ebd-990c-b0e8a6402208%22%2C%22type%22%3A%22har-field%22%7D%2C%7B%22label%22%3A%22%E8%8C%83%E5%9B%B4%E5%A4%A7%E5%B0%8F%22%2C%22field%22%3A%22test2%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228342afaa-4eef-4363-93f4-a85b2bae2493%22%2C%22type%22%3A%22har-field%22%7D%5D%2C%22uid%22%3A%229c13fb24-6485-4429-a2ca-8a45755e1d51%22%2C%22type%22%3A%22har-field%22%7D" style="width: auto;"><tbody><tr data-w-e-type="har-table-row"><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="145">承租面积</th><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="186.63">范围大小</th></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test1</td><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test2</td></tr></tbody></table><p>根据《中华人民共和国合同法规定》，就<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22shopName%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22e7d6dd6f-ae81-4b2a-af06-e3884dfe0913%22%2C%22type%22%3A%22har-field%22%7D" style="width: 25.97px;"></span>商铺达成协议，<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22year%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce57fdfd-4e26-416f-8835-bc4ac275d3cb%22%2C%22type%22%3A%22har-field%22%7D" style="width: 30.99px;"></span>年<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22moth%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2288318e52-0279-4754-951c-526f4ab82c43%22%2C%22type%22%3A%22har-field%22%7D" style="width: 31.99px;"></span>月<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22day%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2219d4b258-48f1-44b3-a4e1-0c699ea5fb7e%22%2C%22type%22%3A%22har-field%22%7D" style="width: 24.99px;"></span>日。</p><p> &nbsp;</p><p><br></p><p> &nbsp;</p>`;

  // const html = ref(` <div><h1 style="text-align: center;">商品租赁合同</h1><p>出租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22lessor%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce3aa57d-e67b-4bd8-831a-edf62703b808%22%2C%22type%22%3A%22har-field%22%7D" style="width: 120.96px;">赵先生</span>(以下简称甲方)</p><p>联系地址：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactAddress%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22174fc93a-d93a-4925-a165-1cc781b16ae3%22%2C%22type%22%3A%22har-field%22%7D" style="width: 126.98px;">四川省成都市天府新区</span></p><p>承租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22tenantry%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228347794a-3c2e-469a-bb84-c1730f7ab1bd%22%2C%22type%22%3A%22har-field%22%7D" style="width: 129.98px;">李先生</span>(以下简称乙方)</p><p>联系电话：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22b207fcca-aa8f-4fdf-bf5b-06a5f599b33a%22%2C%22type%22%3A%22har-field%22%7D" style="width: 127.97px;"></span></p><h3>合约信息</h3><table data-w-e-type="har-table" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contractInformation%22%2C%22children%22%3A%5B%7B%22label%22%3A%22%E6%89%BF%E7%A7%9F%E9%9D%A2%E7%A7%AF%22%2C%22field%22%3A%22test1%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%220ee33a56-090a-4ebd-990c-b0e8a6402208%22%2C%22type%22%3A%22har-field%22%7D%2C%7B%22label%22%3A%22%E8%8C%83%E5%9B%B4%E5%A4%A7%E5%B0%8F%22%2C%22field%22%3A%22test2%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228342afaa-4eef-4363-93f4-a85b2bae2493%22%2C%22type%22%3A%22har-field%22%7D%5D%2C%22uid%22%3A%229c13fb24-6485-4429-a2ca-8a45755e1d51%22%2C%22type%22%3A%22har-field%22%7D" style="width: auto;"><tbody><tr data-w-e-type="har-table-row"><th data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="145">承租面积</th><th data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="186.63">范围大小</th></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="auto">测试1</td><td data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="auto">测试2</td></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="auto">测试3</td><td data-w-e-type="har-table-cell" colspan="1" rowspan="1" width="auto">测试4</td></tr></tbody></table><p>根据《中华人民共和国合同法规定》，就<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22shopName%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22e7d6dd6f-ae81-4b2a-af06-e3884dfe0913%22%2C%22type%22%3A%22har-field%22%7D" style="width: 25.97px;">大米先生</span>商铺达成协议，<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22year%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce57fdfd-4e26-416f-8835-bc4ac275d3cb%22%2C%22type%22%3A%22har-field%22%7D" style="width: 30.99px;">2020</span>年<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22moth%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2288318e52-0279-4754-951c-526f4ab82c43%22%2C%22type%22%3A%22har-field%22%7D" style="width: 31.99px;">07</span>月<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22day%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2219d4b258-48f1-44b3-a4e1-0c699ea5fb7e%22%2C%22type%22%3A%22har-field%22%7D" style="width: 24.99px;">30</span>日。</p><p> &nbsp;</p><p><br></p><p> &nbsp;</p></div>`);
  // const html = ref(str);
  const html = ref(
    renderTemplate(str, {
      lessor: '赵先生',
      contactPhone: '18612341234',
      contactAddress: '四川省成都市天府新区',
      tenantry: '李先生',
      shopName: '大米先生',
      year: '2020',
      moth: '07',
      day: '30',
      contractInformation: [
        {
          test1: '测试1',
          test2: '测试2'
        },
        {
          test1: '测试3',
          test2: '测试4'
        }
      ]
    })
  );

  // console.log('html: ', html);

  const page1 = reactive<PageConfig>({
    search: {
      contractId: contractInfo.contractId
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      pageShow: false,
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '合同号',
          prop: 'contractCode'
        },
        {
          label: '纸质合同号',
          prop: 'contractPaperCode'
        },
        {
          label: '合同版本号',
          prop: 'version'
        },
        {
          label: '创建人',
          prop: 'creator'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ],
      menuOptions: {
        width: 100,
      }
    }
  });

  const page2 = reactive<PageConfig>({
    search: {
      contractId: contractInfo.contractId
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      pageShow: false,
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '合同号',
          prop: 'contractCode'
        },
        {
          label: '合同版本号',
          prop: 'version'
        },
        {
          label: '变更内容',
          prop: 'content'
        },
        {
          label: '创建人',
          prop: 'creator'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ],
      menuOptions: {
        width: 100,
      }
    }
  });

  function handleChangeTab(v: number | string) {
    tab.value = v as number;
  }

  // 合同版本接口
  async function fetchContractHistory(
    params: CbdApiProjectFormalContractHistoryContractIdGetRequest,
  ) {
    const res = await contractHistoryApi(params);
    // @ts-ignore
    contractInitVersionList.value = res.filter((t) => t.version == 1);
    return {
      total: res.length,
      rows: res.filter((t) => t.version != 1),
    };
  }

  async function handleViewAbstract(
    row: CbdApiProjectFormalContractHistoryContractIdGetResponse[number]
  ) {
    loadingAbstractInfo.value = true;
    visibleViewAbstract.value = true;
    visibleViewAbstractType.value = 1;
    abstractInfoPrevVersionModel.value = {};
    abstractInfoCurrentVersionModel.value = {};
    const tasks = [];
    // 合同历史版本，需要查询上一个版本
    if (row.version !== 1) {
      visibleViewAbstractType.value = 2;
      tasks.push(
        abstractInfoApi({
          contractId: row.prevVersionId as unknown as string
        }).then((res) => {
          abstractInfoPrevVersionModel.value = res;
        })
      );
    }
    tasks.push(
      abstractInfoApi({
        contractId: row.contractId as unknown as string
      }).then((res) => {
        abstractInfoCurrentVersionModel.value = res;
      })
    );

    Promise.all(tasks).finally(() => {
      loadingAbstractInfo.value = false;
    });
  }

  async function handleSave(type = 1) {
    type === 1 ? emit('on-save') : emit('on-next');
  }

  async function handleExport() {
    download(
      {
        method: 'post',
        url: abstractExportUrl,
        data: abstractInfoModel.value
      },
      `合同摘要-${abstractInfoModel.value.contractCode}.xlsx`
    );
  }

  async function handleDownload() {
    if (tab.value === 2) {
      await handleExport();
    }
  }

  async function handlePrint() {
    const div = document.createElement('div');
    div.style.cssText =
      'width: 210mm;position: fixed;left: -9999px;top: -999px;z-index: -9999;';
    div.innerHTML = abstractElRef.value.innerHTML;
    document.body.append(div);
    const canvas = await getHtml2Pdf(div);
    toPrint(canvas);
    div.remove();
  }

  const contractInfoModel = ref({
    contractId: 0,
    contractCode: '',
    projectName: '',
    merchantId: 0,
    merchantName: '',
    contractRemark: '',
    storeId: 0,
    storeName: '',
    brandId: 0,
    brandName: '',
    formatId: 0,
    formatName: '',
    buildingId: 0,
    buildingName: '',
    floorId: 0,
    floorName: '',
    estateFloorage: 0,
    estateUseArea: 0,
    estateId: '',
    estateName: '',
    mainEstateId: 0,
    mainEstateName: '',
    signDate: '',
    leaseStartDate: '',
    leaseEndDate: '',
    refundInfo: '',
    intentionInfo: '',
    expenseNum: 0,
    expenseList: []
  });

  onMounted(async () => {
    // 获取摘要数据
    const contractId = contractInfo.contractId as unknown as string;

    const tasks = [];
    // 详情
    tasks.push(
      abstractInfoApi({
        contractId
      }).then((res) => {
        abstractInfoModel.value = res;
      })
    );

    await execAsyncTasks(tasks);
  });
</script>

<style lang="less" scoped>
  .straight-matter {
    position: relative;

    ::v-deep .arco-spin {
      margin-bottom: 50px;

      > .arco-tabs {
        flex-grow: 1;

        > .arco-tabs-nav {
          &:before {
            display: none;
          }

          padding: 0 40px;

          > .arco-tabs-nav-tab {
            justify-content: center;

            > .arco-tabs-nav-tab-list {
              flex-grow: 1;
              display: flex;
              justify-content: space-around;
              > .arco-tabs-tab > .arco-tabs-tab-title {
                font-size: 16px;
              }
            }
          }
        }
        > .arco-tabs-content {
          border: 16px solid #efefef;
          padding: 16px;

          > .arco-tabs-content-list
          > .arco-tabs-content-item
          > .arco-tabs-pane {
            height: calc(100vh - 276px);
            overflow: auto;
          }
        }
      }
    }
  }
  .straight-matter-handle {
    margin-bottom: 24px;
  }
  .text-right {
    text-align: right;
  }
</style>
