<template>
  <div>
    <ht-input
      :type="password_type"
      :value="value"
      v-bind="$attrs"
      :placeholder="placeholder"
      minlength="8"
      v-on="$listeners"
      @focus="showTips = true"
      @blur="showTips = false"
    >
      <i slot="prefix" class="icon-img-prefix-s icon-img-lock" />
      <i
        slot="suffix"
        :class="[
          password_type == 'password' ? 'icon-img-eye' : 'icon-img-eyeopen'
        ]"
        class="icon-img-suffix"
        @click="handelChangPsdType"
      />
    </ht-input>
    <div
      v-show="showTips && !isLogin"
      class="text-font-danger"
      style="margin-left: 10px ;font-size: 12px;"
    >
      {{ validatePasswordTips }}
    </div>
  </div>
</template>

<script>
import { validatePasswordTips } from "@/utils/validate";

export default {
  name: "PassWords",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {},
    isLogin: Boolean,
    placeholder: {
      type: String,
      default: "请输入登录密码"
    }
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      password_type: "password",
      validatePasswordTips,
      showTips: false
    };
  },
  methods: {
    handelChangPsdType() {
      if (this.password_type == "password") {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.password_type = "text";
      } else {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.password_type = "password";
      }
    }
  }
};
</script>
