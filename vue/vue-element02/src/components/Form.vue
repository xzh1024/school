<template>
    <form action="">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: "Form",
        provide(){
            return {
                form: this
            }
        },
        props: {
            // 数据模型
            model: {
                type: Object,
                required: true // 必填项
            },
            // 规则
            rules: {
                type: Object
            }
        },
        data(){
            return {
                fields: []
            }
        },
        methods: {
            validate(callback){
                // callback('from');
                console.log('from');

                let valid = true;
                let count = 0;
                // 如果需要验证的fields为空，调用验证时立刻返回callback
                if (this.fields.length === 0 && callback) {
                    callback(true);
                }
                this.fields.forEach(field => {
                    console.log(field);
                    field.validate((message, field) => {
                        console.log(field);
                        if (message) {
                            valid = false;
                        }
                        // invalidFields = objectAssign({}, invalidFields, field);
                        if (typeof callback === 'function' && ++count === this.fields.length) {
                            // callback(valid, invalidFields);
                            callback(valid);
                        }
                    });
                });
            },
            addField(item){
                this.fields.push(item);
            }
        }
    }
</script>

<style scoped>

</style>
