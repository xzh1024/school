<template>
  <div class="home">
    <div class="home-content">
      <div class="content-left">
        <EpcCanvas
          ref="refEpcCanvas"
          :isShowCanvas="isShowCanvas"
          :tableData="tableData"
          :selectedRows="selectedRows"
          @onTableData="() => {}"
          @onSelectedRows="() => {}"
          :url="imgUrl"
          style="height: 100%"
        />
      </div>
      <div class="content-right">
        <div
          v-for="item in tableData"
          :key="item.id"
          class="item"
          :class="['item', item.id === selectedRows[0]?.id ? 'active' : '']"
          @click="handleClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EpcCanvas from '@/components/EpcCanvas.vue'
// import { Row, Col } from 'element-ui';

export default {
  name: 'HomeView',
  components: {
    EpcCanvas,
  },
  data () {
    return {
      // imgUrl: '/test.png',
      // isShowCanvas: true,
      tableData: [
        {
          id: 1,
          name: '图形1',
          partRefOnImage: 1,
          position: [10, 100, 200, 200]
        },
        {
          id: 2,
          name: '图形2',
          partRefOnImage: 2,
          position: [300, 100, 200, 200]
        },
        {
          id: 3,
          name: '图形3',
          partRefOnImage: 3,
          position: [600, 100, 200, 200]
        },
      ],
      selectedRows: [
      ]
    }
  },
  methods: {
    handleClick (item) {
      this.selectedRows = [item]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-content {
  display: flex;
  .content-left {
    flex: 1;
  }
  .content-right {
    flex: 1;
    .item {
      line-height: 40px;
      font-size: 16px;
      cursor: pointer;
      &.active {
        color: royalblue;
      }
    }
  }
}
</style>
