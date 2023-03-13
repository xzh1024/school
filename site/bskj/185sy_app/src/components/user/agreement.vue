<!--用户协议-->
<template>
  <div class="agreement">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        用户协议
      </div>
      <div class="head_right"></div>
    </div>
    <div class="agreementMain">
      <iframe src="http://api.185sy.com/index.php?g=api&m=userbox&a=userAgreement" frameborder="0"></iframe>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
  .agreement{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .agreementMain{
      flex: 1;
      overflow-y: auto;
      iframe{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
