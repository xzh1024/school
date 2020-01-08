<template>
    <div class="container">
        <!--<h1>首页</h1>-->
        <!--<div>{{ doneTodos }}</div>-->
        <!--<el-button type="primary" @click="increment">主要按钮</el-button>-->
        <Header :title="'首页'" class="header"></Header>
        <div class="main">
            <div style="display: flex; align-items: center; justify-content: center; margin: 100px;">
                <router-link to="/login">登录</router-link>
            </div>
            <h1>{{ time | dateServer }}</h1>
            <h1>{{ money | money }}</h1>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { getName } from '../../utils/mixins'
    import Api from '../../utils/Api'
    import Header from '../../components/Header/Header'

    export default {
        name: "Index",
        mixins: [getName],
        data() {
            return {
                time: '20190510',
                money: 10,
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: 0
                }
            }
        },
        components: { Header },
        created() {
            console.log(this.$store);
            console.log(this.doneTodos);
            console.log(this.userData);
            this.fetchData();
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
            async fetchData(){
                const data = await Api.OldGet('/api-game-newIndex',{
                    page: 1,
                    platform: 1,
                    system: 1,
                    uid: 0
                });
                console.log(data);
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
            submitForm() {
                // alert('提交表单');
                // this.$store.dispatch('increment');
                // console.log(this.$store.getters.doneTodos);
                // console.log(this.$store.state);

                // console.log(this.$store.getters.getTodoById(2));

                this.$store.dispatch('getSeller');
            },
            resetForm() {
                alert('重置表单');
            }
        }
    }
</script>

<style scoped lang="scss">
    .container{
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
