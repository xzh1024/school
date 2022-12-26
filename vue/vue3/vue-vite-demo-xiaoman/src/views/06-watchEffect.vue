<script setup lang="ts">
import { ref, watchEffect } from 'vue'

let message = ref<string>('hello')
let message2 = ref<string>('world')

const stop = watchEffect(
  (oninvalidate) => {
    // let ipt: HTMLInputElement = document.querySelector(
    //   '#ipt'
    // ) as HTMLInputElement
    // console.log(ipt)
    console.log('message=====>', message.value)
    // console.log('message2=====>', message2.value)
    oninvalidate(() => {
      console.log('before')
    })
  },
  {
    flush: 'post', //'pre' | 'post' | 'sync'  // default: 'pre'
    onTrigger(e) {
      debugger
    }
  }
)

const stopWatch = () => stop()
</script>

<template>
  <input id="ipt" type="text" v-model="message" /><br />
  <input type="text" v-model="message2" />
  <div>
    <button @click="stopWatch">停止</button>
  </div>
</template>
