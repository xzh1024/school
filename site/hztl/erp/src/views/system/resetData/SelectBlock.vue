<script lang="tsx">
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";

interface Props {
  value: boolean;
  title?: string;
  tips?: string;
}

interface Event {
  onValueChange(value: boolean): void;
  onSelectedChange(value: boolean): void;
}

@Component
export default class SelectBlock extends tsc.Component<Props, Event> {
  @Model("change") readonly value!: boolean;
  @Prop() readonly title?: string;
  @Prop() readonly tips?: string;
  private selected = false;

  @Watch("value")
  private onValueChange(val: boolean) {
    this.selected = val;
  }
  private handleSelectedChange() {
    this.selected = !this.selected;
    this.$emit("change", this.selected);
  }

  render() {
    return (
      <div
        class={this.selected ? "select-block block-avtive" : "select-block"}
        onClick={this.handleSelectedChange}
      >
        <div>
          {this.selected ? (
            <span class="icon operation-icon icon-selected-info" />
          ) : (
            <span class="icon operation-icon icon-select-info" />
          )}
        </div>
        <div class="container">
          {this.title ? (
            <div class={this.selected ? "title title-avtive" : "title"}>
              {this.title}
            </div>
          ) : null}
          {this.tips ? (
            <div class={this.selected ? "tips tips-avtive" : "tips"}>
              {this.tips}
            </div>
          ) : null}
          {this.$slots.default}
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.select-block {
  padding: 10px;
  display: flex;
  align-items: center;
  border: solid 2px $border-color-base;
  border-radius: 4px;

  .container {
    flex: 1;
    margin-left: 10px;

    .title {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .tips {
      margin-bottom: 5px;
      color: $color-text-secondary;
      padding: 0;
    }
  }

  &:hover {
    border-color: $color-primary;
    @include border_color("color-primary");
    color: $color-primary;
    @include font_color("color-primary");
    cursor: pointer;

    .title {
      border-color: $color-primary;
      @include border_color("color-primary");
      color: $color-primary;
      @include font_color("color-primary");
    }
    .tips {
      border-color: $color-primary;
      @include border_color("color-primary");
      color: $color-primary;
      @include font_color("color-primary");
    }
  }

  & + .select-block {
    margin-top: 10px;
  }
}

.block-avtive,
.title-avtive,
.tips-avtive {
  color: $color-primary;
  @include font_color("color-primary");
}
.block-avtive {
  border-color: $color-primary;
  @include border_color("color-primary");
}
</style>
