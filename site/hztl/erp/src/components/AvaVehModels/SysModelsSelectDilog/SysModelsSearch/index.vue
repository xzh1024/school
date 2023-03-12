<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import MingJue, { SearchSysFormMingJueData } from "./MingJue";
import BeiMai, { SearchSysFormBeiMaiData } from "./BeiMai";

interface Props {
  visible: boolean;
  loading: boolean;
  isMingJue: boolean;
  isBeiMai: boolean;
}
interface Events {
  onChange(params: SearchSysFormMingJueData | SearchSysFormBeiMaiData): void;
}

@Component
export default class SysModelsSearch extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  @Prop() readonly visible!: boolean;
  @Prop() readonly isMingJue!: boolean;
  @Prop() readonly isBeiMai!: boolean;

  private onChange(params: SearchSysFormMingJueData | SearchSysFormBeiMaiData) {
    this.$emit("change", params);
  }

  render() {
    return (
      <div>
        {this.isMingJue && (
          <MingJue
            visible={this.visible}
            loading={this.loading}
            onChange={this.onChange}
          />
        )}
        {this.isBeiMai && (
          <BeiMai
            visible={this.visible}
            loading={this.loading}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
</script>
