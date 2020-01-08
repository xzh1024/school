
<script>
    export default {
        name: "item",
        props:{
            id:{
                type:Number,
                default:1
            },
            msg: {
                type: String
            }
        },
        // render(){
        //     const hText=`
        //                <h${this.id}>${this.msg}</h${this.id}>
        //              `
        //     return <div domPropsInnerHTML={hText}></div>
        // },
        // render: function (createElement) {
        //     return createElement('h'+this.id, this.msg)
        // },
        render: function (createElement) {
            return createElement(
                // {String | Object | Function}
                // 一个 HTML 标签名、组件选项对象，或者
                // resolve 了上述任何一种的一个 async 函数。必填项。
                'div',

                // {Object}
                // 一个与模板中属性对应的数据对象。可选。
                {
                    // (详情见下一节)
                    style: {
                        color: 'red',
                        fontSize: '14px'
                    },
                    on: {
                        click: this.clickHandler
                    },
                },

                // {String | Array}
                // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
                // 也可以使用字符串来生成“文本虚拟节点”。可选。
                [
                    '先写一些文字',
                    createElement('h1', this.id === 1 ? '一则头条': '头条'),
                    createElement('h2', '二则头条'),
                ]
            )
        },
        methods: {
            clickHandler(){
                alert('hello');
            }
        }
    }
</script>
