<template>
    <div>
        <Item :id="1" :msg="'hello jsx'"></Item>
    </div>
</template>

<script>
    import Item from './Item.vue'

    export default {
        name: "User",
        data(){
          return {
              name: '曼切斯特',
              level: 1
          }
        },
        components: { Item },
    }
</script>

<style scoped>

</style>
