<template>
    <div class="container">
        <Header :title="'登录'" class="header">
            <div slot="left" class="header-left" @click="$router.go(-1)">
                <i class="x-button-icon" style="font-style: normal;">&lt;&nbsp;</i>
                <label>返回</label>
            </div>
        </Header>
        <div class="main">
            <k-form :model="ruleForm" :rules="rules" ref="loginForm">
                <k-input-item :label="'用户名'" prop="username">
                    <k-input :value="ruleForm.username" @input="handleUsername($event)"/>
                </k-input-item>
                <k-input-item :label="'密码'" prop="password">
                    <k-input :type="'password'" :value="ruleForm.password" @input="handlePassword($event)"/>
                </k-input-item>
                <k-input-item :label="'校验密码'" prop="checkPassword">
                    <k-input :type="'password'" :value="ruleForm.checkPassword" @input="handleCheckPassword($event)"/>
                </k-input-item>
                <el-button type="primary" @click="submitKForm('loginForm')">提交</el-button>
            </k-form>


            <div class="form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getAge } from '../../utils/mixins'
    import Header from '../../components/Header/Header'
    import KInput from '../../components/Input'
    import KInputItem from '../../components/InputItem'
    import KForm from '../../components/Form'
    export default {
        name: "Login",
        mixins: [getAge],
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    checkPassword: '',
                    age: 0
                },
                // ruleForm: {
                //     name: '',
                //     region: '',
                //     date1: '',
                //     date2: '',
                //     delivery: false,
                //     type: [],
                //     resource: '',
                //     desc: ''
                // },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    checkPassword: [
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        components: { Header, KInput, KInputItem, KForm },
        created() {
            console.log(this);
            console.log(this.$set);
            console.log(this.$store);
            console.log(this.doneTodos);
            console.log(this.userData);
            console.log(this.message);
        },
        // 计算属性
        computed: {
            // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
            ...mapGetters([
                'doneTodos',
                'userData'
            ])
        },
        methods: {
            submitKForm(formName) {
                console.log(this.$refs[formName]);
                this.$refs[formName].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleUsername(val){
                console.log(val);
                this.ruleForm.username = val;
            },
            handlePassword(val){
                console.log(val);
                this.ruleForm.password = val;
            },
            handleCheckPassword(val){
                console.log(val);
                this.ruleForm.checkPassword = val;
            },
            increment() {
                this.$store.commit('increment');
                // console.log(this.$store.state.count);
                console.log(this.$store.getters.doneTodos);
                console.log(this.$store.state);
                // this.user.uid++;
                // console.log(this.user.uid);
                // console.log(this.$store.state);
                // console.log(this.$store.getters.user);
            },
            // submitForm() {
            //     // alert('提交表单');
            //     // this.$store.dispatch('increment');
            //     // console.log(this.$store.getters.doneTodos);
            //     // console.log(this.$store.state);
            //
            //     // console.log(this.$store.getters.getTodoById(2));
            //
            //     this.$store.dispatch('getSeller');
            // },
            // resetForm() {
            //     alert('重置表单');
            // }
        }
    }
</script>

<style scoped lang="scss">
    .container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .header-left{
            height: 100%;
            display: flex;
            align-items: center;
        }
        .main{
            flex: 1;
            overflow-y: auto;
            h1{color: red}
            .form{
                padding: 50px;
            }
        }
    }
</style>
