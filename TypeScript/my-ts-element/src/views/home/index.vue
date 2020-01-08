<template>
    <div class="hemo">
        <h1 class="hemo-title">HEMO</h1>
        <div class="hemo-content">
            <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                :closeDelay="500"
                @show="show()"
                @afterEnter="afterEnter"
                @hide="hide()"
                @afterLeave="afterLeave"
                content="hover这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <div>内容内容内容</div>
                <el-button slot="reference">hover 激活</el-button>
            </el-popover>

            <el-popover
                placement="bottom"
                title="标题"
                width="200"
                trigger="click"
                :value="false"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">click 激活 fsafasfasfafas</el-button>
                <div style="width: 500px;">
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                    这是一段内容,这是一段内容,这是一段内容,这是一段内容。
                </div>
            </el-popover>

            <el-popover
                ref="popover"
                placement="right"
                title="标题"
                width="200"
                trigger="focus"
                content="focus这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            </el-popover>
            <el-button v-popover:popover>focus 激活</el-button>

            <el-popover
                placement="right-start"
                title="标题"
                width="200"
                trigger="manual"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                v-model="visible">
                <el-button slot="reference" @click="visible = !visible">手动激活</el-button>
            </el-popover>

            <el-popover
                placement="top"
                title="标题"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">click top</el-button>
            </el-popover>
            <el-popover
                placement="left"
                title="标题"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">click left</el-button>
            </el-popover>
            <el-popover
                placement="right"
                title="标题"
                width="200"
                trigger="click"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">click right</el-button>
            </el-popover>
        </div>

        <div>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
                >
                <el-button slot="reference">基础</el-button>
            </el-popconfirm>

            <el-popconfirm
                confirmButtonText='好的'
                cancelButtonText='不用了'
                icon="el-icon-info"
                iconColor="red"
                title="这是一段内容确定删除吗？"
            >
                <el-button slot="reference">自定义</el-button>
            </el-popconfirm>
        </div>

        <div>
            <h1>基础用法</h1>
            <div class="box">
                <div class="top">
                    <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                    <el-button>上左</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                    <el-button>上边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                    <el-button>上右</el-button>
                    </el-tooltip>
                </div>
                <div class="left">
                    <el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
                    <el-button>左上</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
                    <el-button>左边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
                    <el-button>左下</el-button>
                    </el-tooltip>
                </div>

                <div class="right">
                    <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
                    <el-button>右上</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <el-button>右边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
                    <el-button>右下</el-button>
                    </el-tooltip>
                </div>
                <div class="bottom">
                    <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                    <el-button>下左</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <el-button>下边</el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
                    <el-button>下右</el-button>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import {Vue, Component} from 'vue-property-decorator';
import routerService from '@/router/router.service';
import {RouterNameEnum} from '@/router/enum/RouterNameEnum';

@Component({
  components: {
      
  },
})
export default class HemoComponent extends Vue {
    private created() {
        console.log('HEMO');
    }

    private mounted() {
        // const routerList = routerService.getModuleItems();
        // // const routerList = routerService.getModuleItems(RouterNameEnum.Home);
        // console.log(routerList);
        // this.routerList = routerService.getModuleItems();
    };

    public visible = false as boolean;

    private show() {
        console.log("show：显示时触发");
    }
    private afterEnter() {
        console.log("after-enter：显示动画播放完毕后触发");
    }
    private hide() {
        console.log("hide：隐藏时触发");
    }
    private afterLeave() {
        console.log("after-leave：隐藏动画播放完毕后触发");
    }
}
</script>

<style lang="scss">
    .hemo {
        width: 100%;
        text-align: center;
        margin-top: 300px;
        .hemo-title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: red;
        }
        .hemo-content {
            // float: right;
        }
    }

    .box {
        width: 400px;

        .top {
            text-align: center;
        }

        .left {
            float: left;
            width: 60px;
        }

        .right {
            float: right;
            width: 60px;
        }

        .bottom {
            clear: both;
            text-align: center;
        }

        .item {
            margin: 4px;
        }

        .left .el-tooltip__popper,
        .right .el-tooltip__popper {
            padding: 8px 10px;
        }
    }
</style>