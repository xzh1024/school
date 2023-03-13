<template>
    <div class="dynamic_con">
        <div class="dynamic_item">
            <div class="item-head" @click="toFriendCircle">
                <!-- <span class="icon"></span> -->
                <i class="iconfont icon-home_friends"></i>
                <span class="title">实时动态</span>
                <span class="more">更多<i class="iconfont icon-direction_right"></i></span>
            </div>
            <div class="item-body" v-if="!data.moments.publisherName">
                暂无动态
            </div>
            <div class="item-body" v-else @click="toFriendCircle">
            <!-- <div class="item-body" v-else @click="toDetail(data.moments.id)"> -->
                <div class="body-left">
                    <div class="con">
                        {{data.moments.content}}
                    </div>
                    <div class="des">
                        {{data.moments.publisherName}} {{data.moments.publishTime.split(' ')[0]}}
                    </div>
                </div>
                <div class="body-right">
                    <div class="img" v-if="data.moments.pictures">
                        <img :src="data.moments.pictures[0]" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'dynamic_con',
    props:{
        data:Object
    },
    created(){
        // console.log(this.data);
    },
    methods:{
        toFriendCircle(){
            this.$router.push('/friendCircle');
        },
        toDetail(id){
            this.$router.push("/friendDetail?" + id);
        }
    }
}
</script>
<style lang="less" scoped>
.dynamic_con{
    background-color: #ffffff;
    // margin: 8px 12px 0 12px;
    border-radius: 10px;
    padding: 7px 9px;
    font-size: 16px;
    .dynamic_item{
        .item-head{
            display: flex;
            align-items: center;
            .iconfont {
                font-size: 16px;
                color: #FF6E4C;
            }
            .title{
                font-size: 16px;
                font-weight: bold;
                color: #FF6E4C;
                margin-left: 5px;
            }
            .more{
                cursor: pointer;
                margin-left: auto;
                background: rgba(#FF6E4C, 0.1);
                border-radius: 6px;
                font-size: 14px;
                color: #FF6E4C;
                line-height: 20px;
                padding: 2px;
                display: flex;
                align-items: center;
                .iconfont {
                    font-size: 14px;
                }
            }
        }
        .item-body{
            // height: 105px;
            // line-height: 105px;
            color: #999999;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .body-left{
                line-height: 17px;
                text-align: left;
                font-size: 12px;
                .con{
                    width: 200px;
                    height: 64px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #333;
                }
                .des{
                    color: #666;
                    height: 20px;
                }

            }
            .body-right{
                
                .img{
                    width: 84px;
                    height: 84px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }
        }
    }
}
</style>