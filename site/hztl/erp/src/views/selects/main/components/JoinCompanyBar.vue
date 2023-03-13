<template>
  <div class="handle-container" @click.stop="clickStepFirst">
    <div class="title-container">
      <div class="top-container">
        <i
          class="el-icon-right logo-size"
          style="padding: 3px; border: solid 2px;border-radius: 25px; font-size: 17px; font-weight: 600"
        />
        加入公司
      </div>
      <div class="btm-container">
        作为员工，加入已有公司
      </div>
    </div>
    <!-- <div class="steps-container">
            <div class="steps-box">
                <div
                    class="step-container"
                    @click.stop="clickStepFirst"
                >
                    <div class="logo-box">
                        1
                    </div>
                    <div class="text-box">
                        填写员工邀请码
                    </div>
                </div>
            </div>
        </div> -->
  </div>
</template>

<script>
export default {
  name: "JoinCompanyBar",
  methods: {
    clickStepFirst() {
      this.$emit("click-step-first");
    }
  }
};
</script>
