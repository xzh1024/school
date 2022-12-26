<script lang="ts">
//注意：setup语法糖是不可以使用render的，所以只有用setup选项才可以。
import { h, ref, reactive, getCurrentInstance } from 'vue'

interface Person {
  name: string
  age: number
}
export default {
  // data() {
  //   return {
  //     num: 100
  //   }
  // },
  setup() {
    const title = ref('render渲染')
    const person: Person = reactive({
      name: '小明',
      age: 16
    })
    const nameRef = ref()
    const onClick = () => {
      person.age++
      console.log(nameRef.value) // undefined ???
      console.log(document.querySelector('#title'))
    }
    return () => [
      h(
        'h1',
        {
          id: 'title'
        },
        title.value
      ),
      h(
        'div',
        {
          id: 'nameRef',
          ref: 'nameRef',
          class: 'font-14',
          style: {
            color: 'red'
          }
        },
        `姓名：${person.name}`
      ),
      h('div', { className: 'font-16 blue' }, `年龄：${person.age}`),
      h('ul', {}, [h('li', {}, 1), h('li', {}, 2), h('li', {}, 3)]),
      h(
        'button',
        {
          onClick: onClick
        },
        '按钮'
      )
    ]
  }
}
</script>

<style scoped>
.font-14 {
  font-size: 14px;
}
.font-16 {
  font-size: 16px;
}
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
