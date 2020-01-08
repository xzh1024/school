<template>
    <div class="container-chart">
        <Header :title="'图表'" class="header">
            <div slot="left" class="header-left" @click="$router.go(-1)">
                <i class="x-button-icon" style="font-style: normal;">&lt;&nbsp;</i>
                <!-- <label>返回</label> -->
            </div>
        </Header>
        <div class="main">
            <Echarts></Echarts>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Header from '../../components/Header/Header'
    import Echarts from '../../components/Echarts/Echarts'


    export default {
        components: {
            Header,
            Echarts
        },
        data() {
            return {
                
            };
        },
        computed: {
            ...mapGetters([
                'doneTodos',
                'userData'
            ])
        },
        watch: {},
        //方法集合
        methods: {},
        created() {
            
        },
        mounted() {
            
        }
    };
</script>

<style scoped lang="scss">
    .container-chart{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .header-left{
            height: 100%;
            display: flex;
            align-items: center;
        }
        .main{
            flex: 1;
            .my-chart{
                width: 500px;
                height: 300px;
            }
        }
    }
</style>