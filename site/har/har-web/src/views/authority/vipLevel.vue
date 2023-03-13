<template>
  <div class="vipLevel">
    <a-form
      ref="editFormRef"
      :model="editForm"
      :rules="editRules"
      layout="vertical"
      auto-label-width
    >
      <a-card title="会员等级变动规则">
        <a-row v-for="(item, index) in editForm.levelList" :key="index">
          <a-col :span="8">
            <a-form-item
              :field="`levelList.${index}.name`"
              :label="index === 0 ? '初始等级名称' : `等级${index + 1}名称`"
              :rules="editRules.name"
              class="formItem"
            >
              <a-input v-model="item.name" placeholder="请输入" />
              <template #extra>
                <div>用户注册后的初始默认等级</div>
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :field="`levelList.${index}.dayAmount`"
              label="当日升级条件"
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (index !== 0) {
                    if (item.dayAmount <= editForm.levelList[index -1].dayAmount) {
                      callback('当前等级升级条件必须比上一级大')
                    } else if (item.dayAmount >= editForm.levelList[index].yearAmount && editForm.levelList[index].yearAmount) {
                      callback('当日升级条件须小于全年升级条件')
                    } else {
                      callback()
                    }
                  } else if (value< 0) {
                    callback('升级条件不能为负')
                  } else {
                    callback()
                  }
                }
              }]"
              class="formItem"
              required
            >
              <a-input-number
                v-model="item.dayAmount"
                placeholder="请输入"
                :disabled="index === 0"
              >
                <template #append>元</template>
              </a-input-number>
              <template #extra>
                <div>到达当前等级所需消费金额</div>
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="全年升级条件"
              :field="`levelList.${index}.yearAmount`"
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (index !== 0) {
                    if (item.yearAmount <= editForm.levelList[index - 1].yearAmount) {
                      callback('全年升级条件须大于上一级全年升级条件')
                    } else if (item.yearAmount <= editForm.levelList[index - 1].dayAmount) {
                      callback('全年升级条件须大于当日升级条件')
                    } else {
                      callback()
                    }
                  } else if (value < 0) {
                    callback('升级条件不能为负')
                  } else {
                    callback()
                  }
                }
              }]"
              class="formItem"
              required
            >
              <a-input-number
                v-model="item.yearAmount"
                placeholder="请输入"
                :disabled="index === 0"
              >
                <template #append>元</template>
              </a-input-number>
              <template #extra>
                <div>到达当前等级所需消费金额</div>
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="保级条件"
              :field="`levelList.${index}.protectAmount`"
              :rules="[{
                validator: (value: number, callback: Function) => {
                  if (index !== 0) {
                    if ( item.protectAmount <= editForm.levelList[index - 1].protectAmount ) {
                      callback('保级条件须大于上一级保级条件')
                    } else {
                      callback()
                    }
                  } else if ( value < 0 ) {
                    callback('保级条件不能为负')
                  } else {
                    callback()
                  }
                }
              }]"
              class="formItem"
              required
            >
              <a-input-number
                v-model="item.protectAmount"
                placeholder="请输入"
                class="baseInput"
                :disabled="index === 0"
              >
                <template #append>元</template>
              </a-input-number>
              <template #extra>
                <div>到达当前等级所需消费金额</div>
              </template>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="享有权益"
              :field="`levelList.${index}.rightsIds`"
              :rules="editRules.rightsIds"
              class="formItem"
            >
              <a-select v-model="item.rightsIds" multiple placeholder="请选择">
                <a-option
                  v-for="single in authorityList"
                  :key="single.value"
                  :label="single.label"
                  :value="single.value"
                />
              </a-select>
            </a-form-item>
          </a-col>
          <a-button
            v-if="index !== 0"
            type="primary"
            style="margin-top: 35px"
            status="danger"
            @click="deleteLevel(index, item.id)"
            >删 除</a-button
          >
          <a-divider />
        </a-row>
        <div class="addBtn" @click="addLevel">
          <a-button type="text" long>
            <template #icon>
              <icon-plus />
            </template>
            添加
          </a-button>
        </div>
      </a-card>

      <a-card title="通用规则" class="margin-top">
        <a-row>
          <a-col :span="8">
            <a-form-item
              field="levelConfig.isOpen"
              label="是否开启会员等级"
              class="formItem"
            >
              <a-select
                v-model="editForm.levelConfig.isOpen"
                placeholder="请选择"
              >
                <a-option :value="1">否</a-option>
                <a-option :value="2">是</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              field="levelConfig.statisticalType"
              label="全年统计时间段"
              class="formItem"
            >
              <a-select
                v-model="editForm.levelConfig.statisticalType"
                placeholder="请选择"
                class="baseInput"
              >
                <a-option :value="1">自然年</a-option>
                <a-option :value="2">从升级当日算起一年</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
    </a-form>
    <div class="bottom">
      <a-button type="primary" @click="saveVipLevel($refs.editFormRef)"
        >保 存</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  // import {
  //   cbdApiAdminMembersRightsSelectListGet,
  //   cbdApiAdminMembersLevelInfoGet,
  //   cbdApiAdminMembersLevelIsDeletableIdGet,
  //   cbdApiAdminMembersLevelSavePost
  // } from '@/api';

  interface LevelList {
    name: string;
    dayAmount: number;
    yearAmount: number;
    protectAmount: number;
    rightsIds: Array<string>;
    sort: number;
    id?: number;
  }

  interface EditForm {
    levelList: Array<LevelList>;
    levelConfig: {
      isOpen: number;
      statisticalType: number;
      id?: number;
    };
  }
  const editForm = ref<EditForm>({
    levelList: [
      {
        name: '',
        dayAmount: 0,
        yearAmount: 0,
        protectAmount: 0,
        rightsIds: [],
        sort: 1
      }
    ],
    levelConfig: {
      isOpen: 1,
      statisticalType: 1
    }
  });

  const editRules = {
    name: [{ required: true, message: '请输入初始等级名称', trigger: 'blur' }],
    rightsIds: [
      { required: true, message: '请输入初始等级名称', trigger: 'blur' }
    ],
    isOpen: [
      { required: true, message: '请输入初始等级名称', trigger: 'blur' }
    ],
    statisticalType: [
      { required: true, message: '请输入初始等级名称', trigger: 'blur' }
    ]
  };

  const authorityList = ref<Array<any>>([]);

  const getAuthorityList = () => {
    // cbdApiAdminMembersRightsSelectListGet().then((res: any) => {
    //   authorityList.value = res;
    // });
  };

  const getVipLevelInfo = () => {
    // cbdApiAdminMembersLevelInfoGet().then((res: any) => {
    //   console.log(res);
    //   editForm.value = res;
    //   if (editForm.value.levelList.length === 0) {
    //     editForm.value.levelList = [];
    //     editForm.value.levelList.push({
    //       name: '',
    //       dayAmount: 0,
    //       yearAmount: 0,
    //       protectAmount: 0,
    //       rightsIds: [],
    //       sort: 1
    //     });
    //   } else if (editForm.value.levelList.length > 1) {
    //     editForm.value.levelList.sort((i, k) => {
    //       return i.sort - k.sort;
    //     });
    //   }
    // });
  };

  const addLevel = () => {
    editForm.value.levelList.push({
      name: '',
      dayAmount: 0,
      yearAmount: 0,
      protectAmount: 0,
      rightsIds: [],
      sort: editForm.value.levelList.length + 1
    });
  };

  const deleteLevel = (index: number, id?: number) => {
    if (id) {
      // cbdApiAdminMembersLevelIsDeletableIdGet({ id: String(id) }).then(
      //   (res: any) => {
      //     if (res.delete) {
      //       editForm.value.levelList.splice(index, 1);
      //     } else {
      //       Message.error('当前会员等级已有用户，无法删除');
      //     }
      //   }
      // );
    } else {
      editForm.value.levelList.splice(index, 1);
    }
  };

  const saveVipLevel = (element: any) => {
    element.validate((valid: boolean) => {
      if (!valid) {
        // cbdApiAdminMembersLevelSavePost(editForm.value).then(() => {
        //   Message.success('保存成功');
        //   getVipLevelInfo();
        // });
      }
    });
  };

  onMounted(() => {
    getAuthorityList();
    getVipLevelInfo();
  });
</script>

<style lang="less" scoped>
  .formItem {
    width: 70%;
  }
  .addBtn {
    width: 35%;
    border: 1px dashed #929292;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
  .bottom {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
