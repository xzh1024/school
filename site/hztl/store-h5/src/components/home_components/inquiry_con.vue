<template>
    <div class="inquiry_con">
        <div class="con">
            <div class="inquiry-1" @click="postInquiry"></div>
            <div class="inquiry-2" @click="myInquiry"></div>
        </div>

        <ClientApplyDialog ref="clientApplyDialog"></ClientApplyDialog>
    </div>
</template>
<script>
import ClientApplyDialog from "@/components/dialog/clientApplyDialog.vue";

export default {
    name:'inquiry_con',
    components: { ClientApplyDialog },
    props:{
        data:Object
    },
    methods:{
        postInquiry(){
            this.$refs.clientApplyDialog.checkState(() => {
                this.$router.push("/post_Inquiry");
            });
        },
        myInquiry(){
            this.$refs.clientApplyDialog.checkState(() => {
                this.$router.push("/Inquiry");
            });
        }
    }
}
</script>
<style lang="less" scoped>
.inquiry_con{
    // margin-top: 8px;
    // padding:0 12px;
    .con{
        display: flex;
        justify-content: space-between;
        .inquiry-1{
            width: 171px;
            height: 70px;
            content: url('../../assets/store/icon-inquiry-1.png');
            cursor: pointer;
        }
        .inquiry-2{
            width: 171px;
            height: 70px;
            content:url('../../assets/store/icon-inquiry-2.png');
            cursor: pointer;
        }
    }
}
</style>