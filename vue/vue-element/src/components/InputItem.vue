<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- input占位符 -->
        <slot></slot>
        <!-- 错误信息展示 -->
        <p v-if="error" style="color: red;">{{error}}</p>
    </div>
</template>

<script>
    import AsyncValidator from 'async-validator'

    export default {
        name: "InputItem",
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String
            }
        },
        data(){
            return {
                error: '', // 错误信息
                validateState: '',
                validateMessage: '',
            }
        },
        created(){
            this.form.addField(this);
        },
        mounted() {
            // 监听一下校验事件
            this.$on('validate', this.validate);
            console.log(this.form);
        },
        // mounted() {
        //     if (this.prop) {
        //         this.dispatch('ElForm', 'el.form.addField', [this]);
        //
        //         let initialValue = this.fieldValue;
        //         if (Array.isArray(initialValue)) {
        //             initialValue = [].concat(initialValue);
        //         }
        //         Object.defineProperty(this, 'initialValue', {
        //             value: initialValue
        //         });
        //
        //         this.addValidateEvents();
        //     }
        // },
        methods: {
            validate(callback){
                console.log('555');
                // 执行具体校验工作
                // 1.获取校验规则
                console.log(this.form.rules[this.prop]);
                const rules = this.form.rules[this.prop];

                // 2.获取数据模型
                const value = this.form.model[this.prop];

                // 3.校验对象
                const descriptor = {[this.prop]: rules};

                // 4.创建校验器
                const validator = new AsyncValidator(descriptor);

                // 5.校验
                validator.validate({[this.prop]: value}, (errors, invalidFields) => {
                    // let required = false;
                    // rules.forEach((rule) => {
                    //     if(rule['required']){
                    //         required = true;
                    //     }
                    // });

                    // if(required){
                    //     if(errors){
                    //         this.error = errors[0].message;
                    //     } else {
                    //         this.error = '';
                    //     }
                    // } else {
                    //     this.error = '';
                    // }
                    if(errors){
                        this.error = errors[0].message;
                    } else {
                        this.error = '';
                    }
                    callback(this.error, invalidFields);
                });

                // validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
                //     this.validateState = !errors ? 'success' : 'error';
                //     this.validateMessage = errors ? errors[0].message : '';
                //
                //     callback(this.validateMessage, invalidFields);
                //     this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null);
                // });
            }
        }
    }
</script>

<style scoped>

</style>
