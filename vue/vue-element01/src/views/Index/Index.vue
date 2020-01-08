<template>
    <div class="box">
        <!--<h1>首页</h1>-->
        <!--<div>{{ doneTodos }}</div>-->
        <!--<el-button type="primary" @click="add">主要按钮</el-button>-->
        <div>
            <el-form>
                <el-form-item label="密码">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Index",
        data() {
            // ruleForm: {
            //     pass: '',
            //         checkPass: '',
            //         age: 0
            // }
        },
        created() {
            console.log(this.$store);
            console.log(this.doneTodos)
        },
        computed: { //计算属性
            ...mapGetters([
                'doneTodos'
            ])
        },
        methods: {
            add() {
                this.$store.commit('increment');
                // console.log(this.$store.state.count);
                console.log(this.$store.getters.doneTodos);
                console.log(this.$store.state);
                // this.user.uid++;
                // console.log(this.user.uid);
                // console.log(this.$store.state);
                // console.log(this.$store.getters.user);
            },
            submitForm() {

            },
            resetForm() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .box{
        h1{color: red}
    }
</style>
