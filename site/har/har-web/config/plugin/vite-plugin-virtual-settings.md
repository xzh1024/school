
### Introduction
`vite-plugin-virtual-settings`是一个根据目录配置构建虚拟路径以及提供当前虚拟路径下提供静态资源的插件，并且对当前目录下存在的index.json内容进行全局注入,返回CONFIG字段。

### Getting Started

```ts
 import vitePluginVirtualSettings from './plugin/vite-plugin-virtual-settings';   //发包后按包路径获取

  export default {
    plugins: [
      // ...
      vitePluginVirtualSettings(),
    ],
  }
```

### Overview

#### Vue

```vue

<template>
  <!--来源于配置 settings平台下 images目录-->
  <img src="@images/*.png" alt="">
</template>

<script setup lang="ts">
import {computed} from "vue";
const  title = computed(()=>{
  return CONFIG.title      // 来源于配置 settings 平台下 index.json 文件字段
})
</script>
```

### Configuration

#### platform

- Type: `string`
- Default: `process.env.MODE || cube`

#### root

-Type: `string`
-Default: `process.cwd()`
