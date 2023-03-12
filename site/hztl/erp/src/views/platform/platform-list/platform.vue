<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import { Platform } from "@/constants/platform";
import * as tsc from "vue-tsx-support";

interface PlatformProps {
  platformData: Platform;
}

@Component
export default class PlatformComponent extends tsc.Component<PlatformProps> {
  @Prop() platformData!: Platform;
  render() {
    if (!this.platformData) {
      return null;
    }
    return (
      <div class="platform flex-container">
        <a
          class="platform-logo auto-block"
          href={this.platformData.url}
          target="_blank"
        >
          <img src={this.platformData.logo} />
        </a>
        <div class="platform-slot">{this.$slots.default}</div>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.platform {
  width: 444px;
  height: 100px;
  background: #fff;
  border-radius: 5px;
  margin: 10px 10px 0 0;
  box-shadow: 0px 0px 5px rgba(232, 235, 238, 1);
  .platform-logo {
    padding: 20px 10px;
    &:hover {
      box-shadow: 0px 0px 5px rgba(0, 165, 255, 1);
    }
  }
  .platform-slot {
    width: 80px;
    color: $color-text-regular;
  }
}
</style>
