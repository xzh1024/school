<template>
    <div>
        <button @click="sendMsg">Send</button>
    </div>
</template>
  
<script setup>

import Ws from './Ws'
// 实例
let ws = null;

// 创建
// const init = async ()=>{
//   // 实例化一个WebSocket的对象,要用await，比如重连肯定是异步的，需要返回一个ws的对象
//   // create的时候相当于new Ws
//   ws = await Ws.create('ws://localhost:8000')
// }

function wsConnect() {
    /**
     * 重连时这里要重新将实例交给ws
     * 1.发布订阅监听
     * 2.直接传
     */
    ws = Ws.create('ws://localhost:8000', wsReConnect)
}

function wsReConnect() {
    // 如果ws不存在，我们就重新创建ws
    if (!ws) {
        return wsConnect()
    }

    if (ws && ws.reconnectingTimer) {
        clearTimeout(ws.reconnectingTimer)
        ws.reconnectingTimer = null;
        wsConnect()
    }
}

const sendMsg = () => {
    // 用户信息,  HEART_BEAT封装在Ws中
    ws.sendMsg({
        mode: 'MESSAGE',
        msg: 'Hello'
    })
}

wsConnect()

</script>
  