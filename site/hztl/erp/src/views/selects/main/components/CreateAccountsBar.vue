<template>
  <div class="handle-container" @click.stop="clickStepFirst">
    <div class="title-container">
      <div class="top-container">
        <i class="el-icon-circle-plus-outline logo-size" />
        创建帐套
      </div>
      <div class="btm-container">
        作为超级管理员，新建一个账套
      </div>
    </div>
    <!-- <div class="steps-container">
            <div class="steps-box">
                <div
                    :class="canCreateAccounts ? 'step-container-suc' : 'step-container'"
                    @click.stop="clickStepFirst"
                >
                    <div :class="canCreateAccounts ? 'logo-box-suc' : 'logo-box'">
                        <i
                            v-show="canCreateAccounts"
                            class="el-icon-check"
                        />
                        <span v-show="!canCreateAccounts">1</span>
                    </div>
                    <div :class="canCreateAccounts ? 'text-box-suc' : 'text-box'">
                        填写公司资料
                    </div>
                </div>
                <div :class="canCreateAccounts ? 'line-container-suc' : 'line-container'">
                    ---------
                </div>
                <div
                    :class="canCreateAccounts ? 'step-container' : 'step-container-info'"
                    @click.stop="clickStepSecond"
                >
                    <div :class="canCreateAccounts ? 'logo-box' : 'logo-box-info'">
                        2
                    </div>
                    <div :class="canCreateAccounts ? 'text-box' : 'text-box-info'">
                        提交帐套开通申请
                    </div>
                </div>
            </div>
        </div> -->
  </div>
</template>

<script>
export default {
  name: "CreateAccountsBar",
  props: {
    canCreateAccounts: Boolean
  },
  methods: {
    clickStepFirst() {
      this.$emit("click-step-first");
    }
  }
};
</script>
