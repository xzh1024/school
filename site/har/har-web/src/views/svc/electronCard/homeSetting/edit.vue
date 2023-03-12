<template>
  <div class="warp">
    <div class="left">
      <div class="top-title">电子卡基础设置</div>
      <a-divider orientation="left">广告设置</a-divider>
      <!-- 动态新增表单 -->
      <div
        v-for="(items, index) in page.form.advertList"
        :key="index"
        class="first"
      >
        <div class="first-form">
          <div class="items">
            <div class="first-form-label"> 类型</div>
            <div class="first-form-content">
              <a-select
                v-model="items.type"
                :style="{ width: '320px' }"
                placeholder="请选择"
                @change="typeChange(index)"
              >
                <a-option
                  v-for="(item, index) in typeData"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </a-select>
            </div>
          </div>
          <!-- 类型为图片时展示 -->
          <div v-if="items.type === 1" class="items">
            <div class="first-form-label"> 链接</div>
            <div class="first-form-content">
              <a-input
                v-model="items.content"
                :style="{ width: '320px' }"
                :max-length="100"
                placeholder="请输入链接"
                allow-clear
              />
            </div>
          </div>
          <!-- 类型为图片时展示 -->
          <div v-if="items.type === 2" class="items">
            <div class="first-form-label"> 活动</div>
            <div class="first-form-content">
              <a-select
                v-model="items.activityId"
                :style="{ width: '320px' }"
                placeholder="请选择"
                @change="activeChange(items.activityId, index)"
              >
                <a-option
                  v-for="(item, index) in activitySelect"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </a-select>
            </div>
          </div>
        </div>
        <div class="first-form uploadLess">
          <div class="items">
            <div class="first-form-label"> 图片</div>

            <div class="first-form-content">
              <!-- 类型为图片时展示 -->
              <i-custom-upload
                v-if="items.type === 1"
                v-model="items.pic"
                url-key="previewAddress"
                :options="{ limit: 1, accept: 'image/*' }"
              />
              <!-- 类型为活动时展示 -->
              <i-custom-upload
                v-if="items.type === 2 && items.activityId"
                v-model="items.pic"
                url-key="previewAddress"
                :options="{
                  showUploadButton: false,
                  showRemoveButton: false
                }"
              >
              </i-custom-upload>

              <div v-if="items.type === 2 && !items.activityId">
                请选择活动
              </div>
            </div>
          </div>
          <!-- 新增 删除按钮组合 -->
          <div class="btn">
            <a-button
              type="outline"
              shape="circle"
              style="margin-right: 12px"
              @click="addItems"
            >
              <icon-plus />
            </a-button>
            <a-button
              v-if="index !== 0"
              type="outline"
              status="danger"
              shape="circle"
              @click="removeItems(index)"
            >
              <icon-minus />
            </a-button>
          </div>
        </div>
      </div>

      <!-- 下方form表单 -->
      <i-form ref="HomeSettingForm" v-model="page.form" :options="formOptions">
      </i-form>

      <div class="bottom-btn">
        <a-button type="text" style="margin-right: 24px" @click="onCancel"
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
          ref="homeIframeRefs"
          :src="`${H5Url}/pages/card/tabbar/home`"
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
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { useRoute, useRouter } from 'vue-router';
  import { H5Url } from '@/utils/h5Url';
  import {
    svcWebActivityDiscountInfoIdGet,
    svcWebCardHomeDetailIdGet,
    svcWebCardHomeModifyPut,
    svcWebCardHomeSavePost,
    svcWebCommonActivitySelectCodePost,
    SvcWebCommonActivitySelectCodePostResponse
  } from '@/api/svc-web';
  import Messenger from '@har/messenger';
  import debounce from 'lodash/debounce';

  const messenger = new Messenger('homeIframeRefs', 'card');
  const homeIframeRefs: Ref = ref(null);
  const submitLoading: Ref = ref(false);

  const route = useRoute();
  const router = useRouter();
  const activitySelect = ref<SvcWebCommonActivitySelectCodePostResponse>([]);

  const typeData = ref([
    {
      label: '图片',
      value: 1
    },
    {
      label: '活动',
      value: 2
    }
  ]);
  const HomeSettingForm: Ref = ref(null); //表单ref

  //提交的form表单
  const page = reactive<any>({
    form: {
      helpInfo: '',
      applyGuide: '',
      advertList: [
        {
          type: 1,
          content: '',
          pic: []
        }
      ]
    }
  });
  //定义form 字段
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '帮助信息',
          prop: 'helpInfo',
          options: {
            maxLength: 100
          },
          rules: [{ required: true, message: '请填写帮助信息' }],
          span: 24
        },
        {
          label: '使用指引',
          prop: 'applyGuide',
          rules: [{ required: true, message: '请填写使用指引' }],
          options: {
            maxLength: 100
          },
          span: 24
        }
      ]
    };
  });
  // 活动下拉
  const { run: getActivitySelect } = useRequest(
    svcWebCommonActivitySelectCodePost,
    {
      manual: true,
      onSuccess: (data) => {
        activitySelect.value = data;
      }
    }
  );

  //新增demo
  const addItems = () => {
    if (page.form.advertList.length > 9) {
      Message.warning('最多添加10条广告！');
      return false;
    }

    page.form.advertList.push({
      type: 1,
      content: '',
      pic: []
    });
  };
  //删除指定demo
  const removeItems = (index: number) => {
    if (page.form.advertList.length == 1) {
      Message.warning('至少保留一条广告！');
      return false;
    }
    page.form.advertList.splice(index, 1);
  };
  //确认新增
  async function onBeforeOk() {
    const res = await HomeSettingForm.value.submit();
    if (!res) {
      for (let index = 0; index < page.form.advertList.length; index++) {
        const items: any = page.form.advertList[index];
        if (items.type === 1) {
          if (!items.content) {
            Message.warning(`请填写第${index + 1}行广告，链接`);
            return false;
          }
          if (items.pic?.length === 0) {
            Message.warning(`请上传第${index + 1}行 广告图片`);

            return false;
          }
        } else {
          if (!items.activityId) {
            Message.warning(`请选择第${index + 1}行广告，活动内容`);
            return false;
          }
        }
      }
      const newAdvertList = page.form.advertList.map((items: any) => {
        if (Array.isArray(items.pic)) {
          return { ...items, pic: items.pic[0].key || items.pic[0].id };
        } else {
          return { ...items, pic: items.pic.id };
        }
      });

      submitLoading.value = true;
      try {
        //编辑调用
        if (route.query.id && route.query.projectId) {
          await svcWebCardHomeModifyPut({
            ...page.form,
            advertList: newAdvertList,
            projectId: route.query.projectId,
            id: route.query.id
          });
        } else {
          await svcWebCardHomeSavePost({
            ...page.form,
            advertList: newAdvertList,
            projectId: route.query.projectId
          });
        }
        router.push({
          path: '/svc/electronCard/homeSetting'
        });
        submitLoading.value = false;
        Message.success('操作成功');
      } catch (error) {
        submitLoading.value = false;
        console.log(error);
      }
    }
  }
  //类型change
  const typeChange = (index: number) => {
    page.form.advertList[index].content = '';
    page.form.advertList[index].pic = null;
  };

  //活动change
  const activeChange = async (id: Number, index: Number) => {
    const isHave = page.form.advertList.some((items: any, i: Number) => {
      if (index === i) {
        return;
      } else {
        return items.activityId === id;
      }
    });

    if (isHave) {
      page.form.advertList[index as number].activityId = null;
      Message.warning('已经选择过该活动，请重新选择！');
      return false;
    }

    const res = await svcWebActivityDiscountInfoIdGet({
      id: id as number | any
    });
    page.form.advertList[index as number].pic = res.adPictureResourceCodes;
  };
  //取消弹窗
  const onCancel = async () => {
    await router.push({
      path: '/svc/electronCard/homeSetting'
    });
  };

  //获取详情
  const [getDetails] = useFuncProxy(async () => {
    if (route.query.id && route.query.projectId) {
      try {
        page.form = await svcWebCardHomeDetailIdGet({
          id: route.query.id as unknown as string
        });

        await iframeOnload();
      } catch (error) {
        console.log(error);
      }
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
      messenger.targets['card'].send(
        data.map((item: any) => {
          return {
            ...item,
            picUrl:
              item.pic !== null
                ? item.pic?.previewAddress || item.pic[0]?.url
                : []
          };
        })
      );
    });
  }, 500);
  watch(
    () => page.form.advertList,
    (v) => {
      sendData(v);
    },
    { deep: true, immediate: true }
  );

  onMounted(() => {
    getDetails();
    messenger.addTarget(homeIframeRefs.value.contentWindow, 'card');
    getActivitySelect({
      projectId: route.query.projectId as number | any,
      statuses: [1, 2]
    });
  });
</script>
<style scoped lang="less">
  .warp {
    display: flex;
    width: 100%;
    overflow: auto;
    height: 100%;
    .left {
      width: 70vw;
      background: #fff;
      padding: 16px;
      height: 100%;
      overflow: auto;
      border-radius: 4px;
      margin-right: 16px;
      .top-title {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .first {
      max-height: 800px;
      overflow: auto;
      border: 1px solid #eee;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      .first-form {
        display: flex;
        .btn {
          display: flex;
          align-items: flex-end;
        }
        .items {
          display: flex;
          flex-direction: column;
          margin-right: 24px;
          .first-form-label {
            margin-bottom: 12px;
          }
          .first-form-content {
            margin-bottom: 12px;
          }
        }
      }
      .uploadLess {
        display: flex;
        justify-content: space-between;
      }
    }
    .bottom-btn {
      text-align: right;
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
