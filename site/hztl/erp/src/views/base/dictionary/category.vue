<script lang="tsx">
import { Component, Model } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { baseDictionaryEmun, yxDictionaryEmun } from "@/constants/base";
// import store from "@/store/store";
import { isYx } from "@/utils/store";
interface Props {
  value?: string;
}

interface Events {
  onChange: (key: string) => void;
}

@Component
export default class Category extends tsc.Component<Props, Events> {
  get hasYx() {
    return isYx();
  }
  private dictionaryEmun = this.hasYx
    ? [...baseDictionaryEmun, ...yxDictionaryEmun]
    : [...baseDictionaryEmun];
  private activeName = this.dictionaryEmun[0].key;
  @Model("change") readonly value!: string;
  private curChange(key: string) {
    this.$emit("change", key);
  }

  mounted() {
    this.curChange(this.dictionaryEmun[0].children[0].key);
  }

  render() {
    return (
      <el-collapse v-model={this.activeName} accordion class="category">
        {this.dictionaryEmun.map(dictionary => (
          <el-collapse-item key={dictionary.key} name={dictionary.key}>
            <template slot="title">
              <i class={`icon-dic-box icon-${dictionary.key}-d`} />
              <span class="dict-name">{dictionary.name}</span>
            </template>
            {dictionary.children
              .filter(item => item.isHide !== true)
              .map(item => (
                <p
                  key={item.key}
                  class={this.value === item.key ? "active" : ""}
                  on-click={() => this.curChange(item.key)}
                >
                  <span>{item.name}</span>
                </p>
              ))}
          </el-collapse-item>
        ))}
      </el-collapse>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.category {
  width: 200px;
  border-right: 1px solid #fff;
  overflow-y: scroll;

  .dict-name {
    padding: 0 10px;
    font-size: 14px;
    color: $color-text-regular;
    font-weight: 300;
  }

  p {
    margin: 0;
    padding: 10px 0;
    cursor: pointer;
    color: $color-text-regular;
    font-size: 14px;
    background: #fbfbfb;

    &.active {
      color: $color-primary;
      @include font_color("color-primary");
      border-left: 4px solid $color-primary;
      @include border_left_color("color-primary");
      background: #c0e3ff;
    }

    span {
      padding-left: 42px;
    }
  }
}
</style>
