<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :api="listApi"
      :options="page.options"
    >
      <template #header>
        <a-button
          type="primary"
          @click="addDialogRef.open(null, { type: 'ADD' })"
          >新增模板</a-button
        >
        <a-button
          type="primary"
          @click="visible=true"
        >查看</a-button
        >
      </template>
      <template #menu="{ record }">
        <a-space>
          <a-button
            type="text"
            @click="editDialogRef.open(record, { type: 'EDIT' })"
          >
            修改
          </a-button>
          <a-popconfirm content="确认要删除？" @ok="handleDelete(record)">
            <a-button type="text"> 删除 </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </i-table>

    <!-- 添加 -->
    <Dialog
      ref="addDialogRef"
      :api="addApi"
      :form-component="Form"
      width="70%"
      success-msg="添加成功"
      @success="page.refresh = true"
    />

    <!-- 修改 -->
    <Dialog
      ref="editDialogRef"
      :api="editApi"
      :detail-api="detailApi"
      :form-component="Form"
      width="70%"
      success-msg="修改成功"
      @success="page.refresh = true"
    />

    <TestForm v-model="visible" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';

  import Form from './__components__/form.vue';
  import ITable from '@/components/i-table/index.vue';
  import Dialog from '@/components/dialog/index.vue';
  import { IFormModel } from './interface';
  import { asyncTask } from '@/utils';
  // import { richTextDiff } from './ng/angular-rich-text-diff.js';
  import TestForm from './__components__/test-form.vue';

  const addDialogRef = ref();
  const editDialogRef = ref();
  const visible = ref(false);
  const refreshTable = ref(false);

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }

  function handleClick() {
    // console.log(richTextDiff(`<h1>呵呵呵</h1>`, `<h1>呵w呵f</h1>`));
  }

  const page = reactive<PageConfig>({
    search: {},
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '创建时间',
          prop: 'createDatetime'
        },
        {
          label: '模板名称',
          prop: 'name',
          search: true
        }
      ],
      menuOptions: {
        width: '100'
      }
    }
  });

  async function addApi() {
    return await asyncTask(1);
  }

  async function delApi() {
    return await asyncTask(1);
  }

  async function editApi() {
    return await asyncTask(1, 10000);
  }

  async function detailApi(res: unknown) {
    const data = res as IFormModel;
    return await asyncTask(
      {
        name: data.name,
        content: `<h1 style="text-align: center;">商品租1赁合同</h1><p>出租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22lessor%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce3aa57d-e67b-4bd8-831a-edf62703b808%22%2C%22type%22%3A%22har-field%22%7D" style="width: 120.96px;"></span>(以下简称甲方)</p><p>联系地址：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactAddress%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22174fc93a-d93a-4925-a165-1cc781b16ae3%22%2C%22type%22%3A%22har-field%22%7D" style="width: 126.98px;"></span></p><p>承租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22tenantry%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228347794a-3c2e-469a-bb84-c1730f7ab1bd%22%2C%22type%22%3A%22har-field%22%7D" style="width: 129.98px;"></span>(以下简称乙方)</p><p>联系电话：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22b207fcca-aa8f-4fdf-bf5b-06a5f599b33a%22%2C%22type%22%3A%22har-field%22%7D" style="width: 127.97px;"></span></p><h3>合约信息</h3><table data-w-e-type="har-table" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contractInformation%22%2C%22children%22%3A%5B%7B%22label%22%3A%22%E6%89%BF%E7%A7%9F%E9%9D%A2%E7%A7%AF%22%2C%22field%22%3A%22test1%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%220ee33a56-090a-4ebd-990c-b0e8a6402208%22%2C%22type%22%3A%22har-field%22%7D%2C%7B%22label%22%3A%22%E8%8C%83%E5%9B%B4%E5%A4%A7%E5%B0%8F%22%2C%22field%22%3A%22test2%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228342afaa-4eef-4363-93f4-a85b2bae2493%22%2C%22type%22%3A%22har-field%22%7D%5D%2C%22uid%22%3A%229c13fb24-6485-4429-a2ca-8a45755e1d51%22%2C%22type%22%3A%22har-field%22%7D" style="width: auto;"><tbody><tr data-w-e-type="har-table-row"><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="145">承租面积</th><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="186.63">范围大小</th></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test1</td><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test2</td></tr></tbody></table><p>根据《中华人民共和国合同法规定》，就<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22shopName%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22e7d6dd6f-ae81-4b2a-af06-e3884dfe0913%22%2C%22type%22%3A%22har-field%22%7D" style="width: 25.97px;"></span>商铺达成协议，<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22year%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce57fdfd-4e26-416f-8835-bc4ac275d3cb%22%2C%22type%22%3A%22har-field%22%7D" style="width: 30.99px;"></span>年<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22moth%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2288318e52-0279-4754-951c-526f4ab82c43%22%2C%22type%22%3A%22har-field%22%7D" style="width: 31.99px;"></span>月<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22day%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2219d4b258-48f1-44b3-a4e1-0c699ea5fb7e%22%2C%22type%22%3A%22har-field%22%7D" style="width: 24.99px;"></span>日。</p><p> &nbsp;</p><p><br></p><p> &nbsp;</p>`,
        createDatetime: '2020-05-02',
      },
      500,
    );
  }

  async function listApi(params: any) {
    return asyncTask(
      {
        rows: [
          {
            name: '模板1',
            content: `<h1 style="text-align: center;">商品租1赁合同</h1><p>出租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22lessor%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce3aa57d-e67b-4bd8-831a-edf62703b808%22%2C%22type%22%3A%22har-field%22%7D" style="width: 120.96px;"></span>(以下简称甲方)</p><p>联系地址：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactAddress%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22174fc93a-d93a-4925-a165-1cc781b16ae3%22%2C%22type%22%3A%22har-field%22%7D" style="width: 126.98px;"></span></p><p>承租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22tenantry%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228347794a-3c2e-469a-bb84-c1730f7ab1bd%22%2C%22type%22%3A%22har-field%22%7D" style="width: 129.98px;"></span>(以下简称乙方)</p><p>联系电话：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22b207fcca-aa8f-4fdf-bf5b-06a5f599b33a%22%2C%22type%22%3A%22har-field%22%7D" style="width: 127.97px;"></span></p><h3>合约信息</h3><table data-w-e-type="har-table" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contractInformation%22%2C%22children%22%3A%5B%7B%22label%22%3A%22%E6%89%BF%E7%A7%9F%E9%9D%A2%E7%A7%AF%22%2C%22field%22%3A%22test1%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%220ee33a56-090a-4ebd-990c-b0e8a6402208%22%2C%22type%22%3A%22har-field%22%7D%2C%7B%22label%22%3A%22%E8%8C%83%E5%9B%B4%E5%A4%A7%E5%B0%8F%22%2C%22field%22%3A%22test2%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228342afaa-4eef-4363-93f4-a85b2bae2493%22%2C%22type%22%3A%22har-field%22%7D%5D%2C%22uid%22%3A%229c13fb24-6485-4429-a2ca-8a45755e1d51%22%2C%22type%22%3A%22har-field%22%7D" style="width: auto;"><tbody><tr data-w-e-type="har-table-row"><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="145">承租面积</th><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="186.63">范围大小</th></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test1</td><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test2</td></tr></tbody></table><p>根据《中华人民共和国合同法规定》，就<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22shopName%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22e7d6dd6f-ae81-4b2a-af06-e3884dfe0913%22%2C%22type%22%3A%22har-field%22%7D" style="width: 25.97px;"></span>商铺达成协议，<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22year%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce57fdfd-4e26-416f-8835-bc4ac275d3cb%22%2C%22type%22%3A%22har-field%22%7D" style="width: 30.99px;"></span>年<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22moth%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2288318e52-0279-4754-951c-526f4ab82c43%22%2C%22type%22%3A%22har-field%22%7D" style="width: 31.99px;"></span>月<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22day%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2219d4b258-48f1-44b3-a4e1-0c699ea5fb7e%22%2C%22type%22%3A%22har-field%22%7D" style="width: 24.99px;"></span>日。</p><p> &nbsp;</p><p><br></p><p> &nbsp;</p>`,
            createDatetime: '2020-04-03'
          },
          {
            name: '模板2',
            content: `<h1 style="text-align: center;">商品租1赁合同</h1><p>出租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22lessor%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce3aa57d-e67b-4bd8-831a-edf62703b808%22%2C%22type%22%3A%22har-field%22%7D" style="width: 120.96px;"></span>(以下简称甲方)</p><p>联系地址：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contactAddress%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22174fc93a-d93a-4925-a165-1cc781b16ae3%22%2C%22type%22%3A%22har-field%22%7D" style="width: 126.98px;"></span></p><p>承租方：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22tenantry%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228347794a-3c2e-469a-bb84-c1730f7ab1bd%22%2C%22type%22%3A%22har-field%22%7D" style="width: 129.98px;"></span>(以下简称乙方)</p><p>联系电话：<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22b207fcca-aa8f-4fdf-bf5b-06a5f599b33a%22%2C%22type%22%3A%22har-field%22%7D" style="width: 127.97px;"></span></p><h3>合约信息</h3><table data-w-e-type="har-table" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22contractInformation%22%2C%22children%22%3A%5B%7B%22label%22%3A%22%E6%89%BF%E7%A7%9F%E9%9D%A2%E7%A7%AF%22%2C%22field%22%3A%22test1%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%220ee33a56-090a-4ebd-990c-b0e8a6402208%22%2C%22type%22%3A%22har-field%22%7D%2C%7B%22label%22%3A%22%E8%8C%83%E5%9B%B4%E5%A4%A7%E5%B0%8F%22%2C%22field%22%3A%22test2%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%228342afaa-4eef-4363-93f4-a85b2bae2493%22%2C%22type%22%3A%22har-field%22%7D%5D%2C%22uid%22%3A%229c13fb24-6485-4429-a2ca-8a45755e1d51%22%2C%22type%22%3A%22har-field%22%7D" style="width: auto;"><tbody><tr data-w-e-type="har-table-row"><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="145">承租面积</th><th data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="186.63">范围大小</th></tr><tr data-w-e-type="har-table-row"><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test1</td><td data-w-e-type="har-table-cell" colSpan="1" rowSpan="1" width="auto">test2</td></tr></tbody></table><p>根据《中华人民共和国合同法规定》，就<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22shopName%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22e7d6dd6f-ae81-4b2a-af06-e3884dfe0913%22%2C%22type%22%3A%22har-field%22%7D" style="width: 25.97px;"></span>商铺达成协议，<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22year%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%22ce57fdfd-4e26-416f-8835-bc4ac275d3cb%22%2C%22type%22%3A%22har-field%22%7D" style="width: 30.99px;"></span>年<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22moth%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2288318e52-0279-4754-951c-526f4ab82c43%22%2C%22type%22%3A%22har-field%22%7D" style="width: 31.99px;"></span>月<span data-w-e-type="har-field" data-info="%7B%22label%22%3A%22%22%2C%22field%22%3A%22day%22%2C%22children%22%3A%5B%5D%2C%22uid%22%3A%2219d4b258-48f1-44b3-a4e1-0c699ea5fb7e%22%2C%22type%22%3A%22har-field%22%7D" style="width: 24.99px;"></span>日。</p><p> &nbsp;</p><p><br></p><p> &nbsp;</p>`,
            createDatetime: '2020-05-02'
          }
        ],
        total: 3
      },
      500
    );
  }

  async function handleDelete(row: any) {
    console.log(row);
    await delApi();
    Message.success('删除成功');
    page.refresh = true;
  }
</script>

<style scoped></style>
