<template>
    <div>
        <!--<input :type="type" :value="value" @input="$emit('input', $event.target.value)">-->
        <input :type="type" :value="value" @input="onInput">
    </div>
</template>

<script>
    export default {
        name: "Input",
        data(){
            return ({

            })
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
        },
        methods: {
            onInput(e){
                console.log(e);
                // 派发事件，通知父组件输入值变化
                this.$emit('input', e.target.value)

                // 通知父组件校验
                // this.$parent.$emit('validate');
            }
        }
    }
</script>

<style scoped>

</style>
