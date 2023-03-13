<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectCashierListGet"
    >
      <template #header>
        <a-button
          v-permission="['cashier:add']"
          type="primary"
          @click="onAddNew"
          >新增</a-button
        >
      </template>
      <template #typeCell="{ record }">
        {{ cashMachineTypeHash[record.type] }}
      </template>
      <template #stateCell="{ record }">
        {{ cashMachineStateHash[record.state] }}
      </template>
      <template #menu="{ record }">
        <a-space>
          <a-button
            v-permission="['cashier:modify']"
            type="text"
            @click="onEdit(record)"
            >编辑</a-button
          >
          <a-button
            v-permission="['cashier:storeSetting']"
            type="text"
            @click="onConfigShop(record)"
            >配置店铺</a-button
          >
          <a-button
            v-permission="['cashier:viewSetting']"
            type="text"
            @click="setViceView(record)"
            >客显设置</a-button
          >
          <a-button
            v-permission="['cashier:view']"
            type="text"
            @click="handleDetail(record)"
            >查看</a-button
          >
        </a-space>
      </template>
    </i-table>
    <modal-form
      :title="title + '收银机'"
      v-bind="addFormProps"
      @register="register"
      @submit="onFormSubmit"
    />
    <choose-item
      v-if="page.showChooseShop"
      v-model="page.showChooseShop"
      v-model:select-keys="selectShopsKeys"
      :search="showSearch"
      title="选择店铺"
      :options="chooseShopOptions"
      :api="cbdApiProjectCashierStoreListGet"
      @submit="handleSelectShop"
    />
    <a-modal
      :visible="page.showViceView"
      :ok-loading="isLoading"
      title="客显设置"
      width="65vw"
      @cancel="page.showViceView = false"
      @ok="onOk"
    >
      <div class="model_box">
        <h4 class="vice-title">当前可设置辅屏展示内容</h4>
        <a-row>
          <a-col :span="12">
            <a-checkbox v-model="page.view.home">同步主屏幕内容</a-checkbox>
            <img
              v-if="page.view.home"
              class="img-temp"
              src="@/assets/images/cashier-pic.png"
              alt=""
            />
          </a-col>
          <a-col :span="11" :offset="1">
            <a-checkbox v-model="page.view.vice">其他内容</a-checkbox>
            <div v-if="page.view.vice" class="upload-box">
              <i-custom-upload
                v-model="page.view.list"
                url-key="previewAddress"
                :options="{
                  limit: 20,
                  tip: '请上传文件',
                  accept: 'image/*'
                }"
              />
              <h4 style="margin-bottom: 10px">每条数据时间间隔（秒）</h4>
              <a-input-number
                v-model="page.view.interval"
                placeholder="请输入时间间隔"
              ></a-input-number>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <detail
      v-if="page.showDetail"
      :id="String(configCashierId)"
      v-model="page.showDetail"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { cashMachineTypeHash, cashMachineStateHash } from '@/utils/dic';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import Detail from './__components__/casher-detail.vue';
  import {
    cbdApiProjectCashierAddPost,
    cbdApiProjectCashierListGet,
    cbdApiProjectCashierStoreListGet,
    cbdApiProjectCashierStoreSettingPut,
    type CbdApiProjectCashierListGetResponse,
    type CbdApiProjectCashierStoreListGetResponse,
    type CbdApiProjectCashierViewSettingPutRequest,
    cbdApiProjectCashierViewSettingPut,
    cbdApiProjectCashierInfoIdGet,
    cbdApiProjectCashierModifyPut,
    CbdApiProjectCashierModifyPutRequest,
    cbdApiProjectCashierViewSettingInitIdGet
  } from '@/api';
  import ChooseItem from '@/components/choose-item/index.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    ModalForm,
    type ModalFormProps,
    useModalForm
  } from '@/components/IForm';
  type ShopItem = Required<CbdApiProjectCashierStoreListGetResponse>['rows'][0];
  type ViewInfoItem =
    Required<CbdApiProjectCashierViewSettingPutRequest>['viewInfo'][0];
  type CashierItem = Required<CbdApiProjectCashierListGetResponse>['rows'][0];
  type EditParams = CbdApiProjectCashierModifyPutRequest;
  interface Page {
    search: Recordable;
    options: Recordable;
    view: {
      home: boolean;
      vice: boolean;
      interval: number | undefined;
      list: any[];
    };
    refresh: boolean;
    showViceView: boolean;
    showDetail: boolean;
    showChooseShop: boolean;
  }
  const page = reactive<Page>({
    search: {},
    view: {
      home: true,
      vice: false,
      interval: undefined,
      list: []
    },
    refresh: false,
    showChooseShop: false,
    showDetail: false,
    showViceView: false,
    options: {
      index: true,
      indexTitle: '序号',
      columns: [
        {
          label: '收银机搜索',
          prop: 'cashierKeyword',
          search: true,
          hide: true
        },
        {
          label: '店铺搜索',
          prop: 'storeKeyword',
          search: true,
          hide: true
        },
        {
          label: '收银机编号',
          prop: 'code'
        },
        {
          label: '收银机类型',
          prop: 'type',
          search: true,
          type: 'select',
          dic: [
            {
              label: '手持',
              value: 1
            },
            {
              label: '台式',
              value: 2
            }
          ]
        },
        {
          label: '服务器地址',
          prop: 'serverUrl'
        },
        {
          label: '店铺号',
          prop: 'storeCode'
        }
      ]
    }
  });
  const addFormProps = computed<ModalFormProps>(() => {
    return {
      visible: false,
      colProps: {
        span: 12
      },
      schemas: [
        {
          label: '收银机ID',
          field: 'id',
          show: false
        },
        {
          label: '收银机类型',
          field: 'type',
          component: 'select',
          rules: { required: true, message: '收银机类型不能为空' },
          componentProps: {
            maxLength: 200,
            allowClear: false,
            options: [
              {
                label: '手持',
                value: 1
              },
              {
                label: '台式',
                value: 2
              }
            ]
          },
          colProps: {
            span: 24
          }
        },
        {
          label: '收银机设备号',
          field: 'code',
          rules: { required: true, message: '收银机设备号不能为空' },
          componentProps: {
            maxLength: 200,
            allowClear: false
          },
          colProps: {
            span: 24
          }
        },
        {
          label: '服务器地址',
          field: 'serverUrl',
          rules: { required: true, message: '服务器地址不能为空' },
          componentProps: {
            maxLength: 200,
            allowClear: false
          },
          colProps: {
            span: 24
          }
        }
      ]
    };
  });
  const isLoading = ref(false);
  const title = ref<string>('新增');
  const configCashierId = ref<number | undefined>();
  const setCashierId = (id: number) => (configCashierId.value = id);
  // 新增 编辑
  const [register, methods] = useModalForm();

  const onAddNew = () => {
    title.value = '新增';
    methods.show();
  };
  const onEdit = async (m: CashierItem) => {
    title.value = '编辑';
    try {
      methods.show();
      methods.setProps({
        loading: true
      });
      const res = await cbdApiProjectCashierInfoIdGet({
        id: String(m.id!)
      });
      methods.setFieldsValue({
        ...res
      });
    } catch (e) {
      methods.hide();
    } finally {
      methods.setProps({
        loading: false
      });
    }
  };
  // 新增编辑保存
  const onFormSubmit = async (formData: EditParams) => {
    const request =
      title.value === '新增'
        ? cbdApiProjectCashierAddPost
        : cbdApiProjectCashierModifyPut;
    await request(formData);
    Message.success('操作成功!');
    methods.hide();
    page.refresh = true;
  };
  // 配置店铺
  const selectShopsKeys = ref<string[]>([]);
  const showSearch = ref<{ keyword?: string }>({ keyword: '' });
  const chooseShopOptions = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      tableCard: false,
      menu: false,
      menuOtherOptions: {
        rowKey: 'code',
        rowSelection: {
          type: 'radio'
        },
        onSelect: (e: string[]) => {
          selectShopsKeys.value = e;
        }
      },
      columns: [
        {
          label: '店铺名称',
          prop: 'keyword',
          search: true,
          hide: true
        },
        {
          label: '店铺号',
          prop: 'code'
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '经营业态',
          prop: 'scene'
        },
        {
          label: '所属区域',
          prop: 'estateAddress'
        }
      ]
    };
  });
  const onConfigShop = (m: CashierItem) => {
    page.showChooseShop = true;
    setCashierId(m.id!);
    selectShopsKeys.value = [m.storeCode!];
  };
  const handleSelectShop = async (e: { data: ShopItem[] }) => {
    try {
      const item = e.data.find(
        (el: ShopItem) => el.code === selectShopsKeys.value[0]
      );
      await cbdApiProjectCashierStoreSettingPut({
        storeId: item!.id!,
        cashierId: configCashierId.value!
      });
      selectShopsKeys.value = [];
      page.showChooseShop = false;
      Message.success('店铺配置成功!');
      page.refresh = true;
    } catch (e) {
    } finally {
    }
  };
  // 打开客显设置
  const setViceView = async (m: CashierItem) => {
    page.showViceView = true;
    setCashierId(m.id!);
    const res = await cbdApiProjectCashierViewSettingInitIdGet({
      id: String(m.id!)
    });
    page.view.home = !!res.find((el) => el.type === 1);
    const type2Item = res.find((el) => el.type === 2);
    page.view.vice = !!type2Item;
    page.view.list = type2Item?.resourceList || [];
    page.view.interval = type2Item?.intervalTime;
  };
  // 客显设置
  const onOk = async () => {
    const viewInfo: ViewInfoItem[] = [];
    if (!page.view.home && !page.view.vice) {
      Message.error('同步主屏幕内容与其他内容至少选择一项');
      return false;
    }
    if (page.view.home) {
      viewInfo.push({
        type: 1
      });
    }
    if (page.view.vice) {
      if (!page.view.list.length) {
        Message.error('请上传文件');
        return false;
      }
      if (!page.view.interval) {
        Message.error('请输入间隔时间');
        return false;
      }
      viewInfo.push({
        type: 2,
        intervalTime: page.view.interval!,
        resourceList: page.view.list.map((e) => e.key || e.resourceId)
      });
    }
    isLoading.value = true;
    try {
      await cbdApiProjectCashierViewSettingPut({
        cashierId: configCashierId.value!,
        viewInfo
      });
      Message.success('配置成功!');
      page.showViceView = false;
      page.refresh = true;
    } catch (e) {
    } finally {
      isLoading.value = false;
    }
  };
  // 查看
  const handleDetail = (m: CashierItem) => {
    setCashierId(m.id!);
    page.showDetail = true;
  };
</script>
<style scoped lang="less">
  .vice-title {
    margin-top: 0;
  }
  .model_box {
    height: 70vh;
    .img-temp {
      width: 100%;
    }
    .upload-box {
      padding-top: 20px;
    }
  }
</style>
