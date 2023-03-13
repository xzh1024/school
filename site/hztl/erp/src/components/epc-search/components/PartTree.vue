<template>
  <div v-loading="loading" class="box-container">
    <el-tree
      v-if="showTree"
      :load="loadNode"
      :props="defaultProps"
      highlight-current
      lazy
      @node-click="handleNodeClick"
      class="tree-item"
    />
    <div class="img-list">
      <span
        v-for="(item, index) in imgData"
        :key="index"
        :class="
          item.isActive ? 'img-container img-container-active' : 'img-container'
        "
        @click.stop="handleImgItemChange(item)"
      >
        <img :src="item.imgUrl" alt="装配图" class="img-content" />
        <div class="img-title">{{ item.imageName }}</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartTree",
  props: {
    reqFunction: {
      type: Function,
      required: true
    },
    showTree: Boolean
  },
  data() {
    return {
      loading: false,
      defaultProps: {
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
      },
      imgData: []
    };
  },
  methods: {
    loadNode(node, resolve) {
      this.loading = true;
      if (node.level === 0) {
        this.reqFunction({
          firstLevelId: ""
        })
          .then(res => {
            const data =
              res && res.length
                ? res.map(item => ({
                    ...item,
                    label: item.firstLevelName,
                    isLeaf: item.structureTreeLevel === "1"
                  }))
                : [];
            return resolve(data);
          })
          .finally(() => {
            this.loading = false;
          });
      } else if (node.level === 1) {
        this.reqFunction({
          firstLevelId: node.data.firstLevelId,
          secondLevelId: ""
        })
          .then(res => {
            const data =
              res && res.length
                ? res.map(item => ({
                    ...item,
                    label: item.secondLevelName,
                    isLeaf: true
                  }))
                : [];
            return resolve(data);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleNodeClick(data) {
      if (data.structureTreeLevel === "1" || data.secondLevelId) {
        this.reqFunction({
          firstLevelId: data.firstLevelId,
          secondLevelId: data.secondLevelId
        }).then(res => {
          this.imgData =
            res && res.length
              ? res.map((item, index) => ({
                  ...item,
                  id: index + 1,
                  isActive: false
                }))
              : [];
        });
      }
    },
    handleImgItemChange(val) {
      this.imgData = this.imgData.map(item => ({
        ...item,
        isActive: val.id === item.id
      }));
      this.$emit("img-change", val);
    },
    clearData() {
      this.imgData = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.box-container {
  display: flex;
  height: 100%;
  border: solid 1px rgba(222, 225, 231, 1);

  .tree-item {
    flex: none;
    width: 250px;
    overflow: auto;
    border-right: solid 1px rgba(222, 225, 231, 1);
  }

  .img-list {
    margin: 2px 5px 5px 5px;
    height: calc(100% - 10px);
    overflow-y: auto;

    .img-container {
      display: inline-block;
      margin: 5px 0 0 5px;
      width: 170px;
      height: 230px;
      border: solid 2px rgba(222, 225, 231, 1);
      cursor: pointer;
      text-align: center;
      vertical-align: bottom;

      .img-content {
        width: 100%;
        height: calc(100% - 60px);
        display: block;
      }

      .img-title {
        padding: 0 2px;
        width: 100%;
        height: 60px;
        line-height: 60px;
        border-top: solid 2px rgba(222, 225, 231, 1);
        background: rgba(228, 231, 237, 1);
        overflow: hidden;
        font-size: 12px;
      }

      &:hover {
        border: solid 2px $color-primary;
        @include border_color("color-primary");

        .img-title {
          border-top: solid 2px $color-primary;
          @include border_top_color("color-primary");
          color: $color-primary;
          @include font_color("color-primary");
          background: rgba(0, 155, 242, 0.156862745098039);
        }
      }
    }

    .img-container-active {
      border: solid 2px $color-primary;
      @include border_color("color-primary");

      .img-title {
        border-top: solid 2px $color-primary;
        @include border_top_color("color-primary");
        color: $color-primary;
        @include font_color("color-primary");
        background: rgba(0, 155, 242, 0.156862745098039);
      }
    }
  }
}
</style>
