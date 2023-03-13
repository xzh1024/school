<template>
  <ht-dialog
    v-bind="$attrs"
    title="如何新增员工?"
    width="800px"
    v-on="$listeners"
  >
    <div class="tips-content">
      <p>1、员工用自己的手机号先自行注册个人账号。</p>
      <p>
        2、管理员在（人事>公司资料）页面/本弹框中复制「员工申请码」并发送给员工。
      </p>
      <p>3、员工登录后，选择「加入公司」并输入管理员提供的「申请码」。</p>
      <p>
        4、管理员在（工作台）或者（人事>员工管理>待审核员工）都可以看到员工加入申请，审核后即完成新增员工。
      </p>
    </div>
    <p>
      当前选中公司「 {{ companyName }} 」，员工邀请码为：
      <clipboard-code
        :staff-invite-code="staffInviteCode"
        code-dom-name="dialog-dom-code"
      />
    </p>
  </ht-dialog>
</template>

<script>
import ClipboardCode from "./ClipboardCode";
export default {
  name: "StaffInviteCodeTips",
  components: { ClipboardCode },
  props: {
    staffInviteCode: {
      type: [String, Number],
      defualt: null
    },
    companyName: {
      type: String,
      defualt: null
    }
  }
};
</script>
