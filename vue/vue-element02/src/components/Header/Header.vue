<template>
    <header class="x-header">
        <!--<div class="x-header-button is-left">-->
            <!--<button class="x-button">-->
                <!--<i class="x-button-icon">&lt;&nbsp;</i>-->
                <!--<label class="x-button-text">返回</label>-->
            <!--</button>-->
        <!--</div>-->
        <div class="x-header-left">
            <slot name="left" style="height: 100%;"></slot>
        </div>
        <h1 class="x-header-title">{{ title }}</h1>
        <!--<div class="x-header-button is-right"></div>-->
        <div class="x-header-right">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        props: [
            'title'
        ]
    }
</script>

<style scoped lang="scss">
    .x-header{
        height: 3rem;
        display: flex;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        padding: 0 1rem;
        .x-header-title{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
            font-size: 1.2rem;
            font-weight: 400;
            line-height: 3rem;
            text-align: center;
        }
        .x-header-button{
            width: 5rem;
            background-color: #f60;
            .x-button{
                height: 100%;
                display: flex;
                align-items: center;

                background-color: transparent;
                border: none;
                outline: none;
            }
        }
        .x-header-button.is-left {
            text-align: left;
        }
        .x-header-button.is-right {
            text-align: right;
        }

        .x-header-left{
            width: 5rem;
            height: 100%;
        }
        .x-header-right{
            width: 5rem;
        }
    }
</style>
