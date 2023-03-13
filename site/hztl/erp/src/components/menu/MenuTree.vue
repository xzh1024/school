<template>
  <ul>
    <li class="menuParent-box">
      <div
        :class="{ menuParent: menu.path === selectPth }"
        class="menu-parent-pad"
        @click="handleMenu(menu)"
      >
        <el-row>
          <el-col :span="asideCollapse ? 24 : 6">
            <span class="iconPadding">
              <i
                v-if="menu.icon"
                :class="[menu.path === selectPth ? menu.activeIocn : menu.icon]"
                class="menu-box-icons"
              />
            </span>
          </el-col>
          <el-col v-show="!asideCollapse" :span="18">
            <el-row>
              <el-col :span="20">
                <p>{{ menu.name }}</p>
              </el-col>
              <el-col :span="2">
                <div v-if="isFolder">
                  <div class="arrow-menu">
                    <span
                      :class="[open ? 'arrow-active-up' : 'arrow-active-down']"
                      class="upDownarrow"
                    >
                      <i class="el-icon-arrow-up" />
                    </span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <el-collapse-transition>
        <ul v-show="open && !asideCollapse" v-if="isFolder">
          <menu-tree
            v-for="(item, index) in menu.children"
            :key="index"
            :menu="item"
            :class="{ blod: item.path === selectPth }"
            class="menu-item single-color"
            @handleMenu="selectItem(item)"
          />
        </ul>
      </el-collapse-transition>
    </li>
  </ul>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MenuTree",
  props: {
    menu: Object,
    selectPth: String
  },
  data() {
    return {
      open: true
    };
  },
  computed: {
    isFolder() {
      return this.menu.children && this.menu.children.length;
    },
    ...mapState("admin", {
      asideCollapse: state => state.menu.asideCollapse
    })
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    handleMenu(obj) {
      this.$emit("handleMenu", obj);
      this.toggle();
    },
    selectItem(obj) {
      this.$emit("handleMenu", obj);
    }
  }
};
</script>
<style lang="stylus" scoped>
.menu-item
    cursor pointer
    font-size 16px
    font-weight 200
    .menu-box-icons
        display inline-block
        width 22px
        height 22px
        background-repeat no-repeat
        vertical-align top
    .iconPadding
        padding-left 20px
    .arrow-menu
        position relative
        width 100%
    p
        width 152px
.upDownarrow
    display inline-block
    width 26px
    height 26px
    text-align center
    line-height 26px
    color #AAB2B7
    position absolute
    right 10px
    transition all 0.3s cubic-bezier(1, 0.5, 0.8, 1)
.arrow-active-up
    transform rotate(0deg)
    transition all 0.3s cubic-bezier(1, 0.5, 0.8, 1)
.arrow-active-down
    transform rotate(-180deg)
    transition all 0.3s cubic-bezier(1, 0.5, 0.8, 1)
.blod, .menuParent
    background #E8F0FF !important
    border-left 4px solid #4D8CFF
    font-weight 400 !important
    color #4D8CFF
.menu-parent-pad
    padding 14px 10px
.single-color
	background #F2F2F2
</style>
