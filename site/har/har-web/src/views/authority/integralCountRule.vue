<template>
  <div class="integralCountRule">
    <a-form
      ref="editFormRef"
      :model="editForm"
      :rules="editRules"
      layout="vertical"
      auto-label-width
    >
      <a-card title="积分规则">
        <a-row>
          <a-col :span="8">
            <a-form-item field="isOpen" label="是否开启积分" class="formItem">
              <a-select v-model="editForm.config.isOpen" placeholder="请选择">
                <a-option label="是" :value="2"> </a-option>
                <a-option label="否" :value="1"> </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="isMultiple"
              label="是否开启会员等级积分倍数"
              class="formItem"
            >
              <a-select
                v-model="editForm.config.isMultiple"
                placeholder="请选择"
              >
                <a-option label="是" :value="2"> </a-option>
                <a-option label="否" :value="1"> </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="有效期类型"
              field="validityType"
              class="formItem"
            >
              <a-select
                v-model="editForm.config.validityType"
                placeholder="请选择"
              >
                <a-option :value="1">每自然年1月1日凌晨清零</a-option>
                <a-option :value="2">从每次积分获取当日算起一年</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="不同会员等级赚取积分倍数" class="margin-top">
        <a-row v-for="(item, index) in editForm.integralList" :key="index">
          <a-col :span="8">
            <div style="margin: 20px 0 0 60px"> 等级 </div>
            <div style="margin: 20px 0 0 60px">
              {{ item.name }}
            </div>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :field="`integralList.${index}.integralMultiple`"
              label="获取积分倍数"
              required
              class="formItem"
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (index !== 0) {
                    if (item.integralMultiple <= editForm.integralList[index - 1].integralMultiple) {
                      callback('当前等级积分倍数必须比上一级积分倍数大')
                    } else {
                      callback()
                    }
                  } else if (value < 0) {
                    callback('积分倍数不能为负')
                  } else {
                    callback()
                  }
                }
              }]"
            >
              <a-input-number
                v-model="item.integralMultiple"
                placeholder="请输入"
              >
                <template #append>倍</template>
              </a-input-number>
              <template #extra>
                <div>当前等级赚取积分的倍数</div>
              </template>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="商户类型积分系数配置" class="margin-top">
        <a-row v-for="(item, index) in editForm.configList" :key="index">
          <a-col :span="8">
            <a-form-item
              :field="`configList.${index}.typeId`"
              label="商户类型"
              required
              class="formItem"
            >
              <a-select
                v-model="item.typeId"
                placeholder="请选择"
                @change="chooseMerchantType"
              >
                <a-option
                  v-for="single in merchantTypeList"
                  :key="single.id"
                  :label="single.name"
                  :value="single.id"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col
            :span="6"
            style="
              display: flex;
              justify-content: space-around;
              position: relative;
            "
          >
            <a-form-item
              label="积分系数"
              :field="`configList.${index}.amount`"
              required
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (value < 0) {
                    callback('对应积分不能为负数')
                  } else {
                    callback()
                  }
                }
              }]"
            >
              <a-input-number v-model="item.amount" placeholder="请输入">
                <template #append>元</template>
              </a-input-number>
            </a-form-item>
            <span style="position: absolute; bottom: 30%">=</span>
            <a-form-item
              label="对应积分"
              :field="`configList.${index}.integral`"
              class="margin-left"
              required
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (value < 0) {
                    callback('对应积分不能为负数')
                  } else {
                    callback()
                  }
                }
              }]"
            >
              <a-input-number v-model="item.integral" placeholder="请输入">
                <template #append>积分</template>
              </a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <div class="bottom">
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  // import {
  //   cbdApiAdminMerchantTypeTopParentGet,
  //   cbdApiAdminMembersLevelLevelSelectListPost,
  //   cbdApiAdminMembersIntegralSavePost,
  //   cbdApiAdminMembersIntegralInfoGet
  // } from '@/api';
  // import _ from 'lodash';
  // import { Message } from '@arco-design/web-vue';

  interface ConfigList {
    typeId: number;
    amount: number;
    integral: number;
    id?: number;
  }

  interface IntegralList {
    id: number;
    name: string;
    integralMultiple: number;
    sort?: number;
  }

  interface Config {
    isOpen: number;
    isMultiple: number;
    validityType: number;
    id?: number;
  }

  interface EditForm {
    config: Config;
    configList: Array<ConfigList>;
    integralList: Array<IntegralList>;
  }

  const editForm = ref<EditForm>({
    config: {
      isOpen: 1,
      isMultiple: 1,
      validityType: 1
    },
    configList: [],
    integralList: []
  });
  // const isEdit = ref<boolean>(false);

  const editRules = {
    isOpen: [
      { required: true, message: '请选择是否开启积分', trigger: 'blur' }
    ],
    isMultiple: [
      {
        required: true,
        message: '请选择是否开启会员等级积分倍数',
        trigger: 'blur'
      }
    ],
    validityType: [
      { required: true, message: '请选择有效期类型', trigger: 'blur' }
    ]
  };

  const merchantTypeList = ref<Array<any>>([]);

  const chooseMerchantType = (e: any) => {
    merchantTypeList.value = merchantTypeList.value.filter((item: any) => {
      return item.id !== e;
    });
  };

  const getTopMerchantTypeList = () => {
    // cbdApiAdminMerchantTypeTopParentGet().then((res: any) => {
    //   merchantTypeList.value = res;
    //   if (!isEdit.value) {
    //     editForm.value.configList = res.map((item: any) => {
    //       return {
    //         typeId: item.id,
    //         integral: 0,
    //         amount: 0,
    //         id: null
    //       };
    //     });
    //   } else {
    //     const list = res || [];
    //     const temArr = list.filter((el: any) => {
    //       return editForm.value.configList.every((item: any) => {
    //         return el.id !== item.typeId;
    //       });
    //     });
    //     const arr = _.cloneDeep(editForm.value.configList);
    //     temArr.forEach(() => {
    //       editForm.value.configList.push({
    //         typeId: 0,
    //         integral: 0,
    //         amount: 0,
    //         id: undefined
    //       });
    //     });
    //     nextTick(() => {
    //       arr.forEach((item: any) => {
    //         chooseMerchantType(item.typeId);
    //       });
    //     });
    //   }
    // });
  };

  const initData = async () => {
    try {
      // const res = await cbdApiAdminMembersIntegralInfoGet();
      // const { config } = res;
      // isEdit.value = !!config.id;
      // if (isEdit.value) {
      //   editForm.value = res;
      // } else {
      //   getLevelSelect();
      // }
      getTopMerchantTypeList();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  };

  const save = (element: any) => {
    element.validate((valid: boolean) => {
      if (!valid) {
        // cbdApiAdminMembersIntegralSavePost(editForm.value).then(() => {
        //   Message.success('保存成功');
        //   initData();
        // });
      }
    });
  };

  onMounted(() => {
    initData();
  });
</script>

<style scoped></style>
