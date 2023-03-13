<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import MingJue, { SearchFormMingJueData } from "./MingJue";
import BeiMai, { SearchFormBeiMaiData } from "./BeiMai";

interface Props {
  visible: boolean;
  partId: number;
  loading: boolean;
  isMingJue: boolean;
  isBeiMai: boolean;
}

interface Events {
  onChange(params: SearchFormMingJueData | SearchFormBeiMaiData): void;
}

@Component
export default class EditSearch extends tsc.Component<Props, Events> {
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly partId!: number;
  @Prop() readonly isMingJue!: boolean;
  @Prop() readonly isBeiMai!: boolean;

  private onChange(params: SearchFormMingJueData | SearchFormBeiMaiData) {
    this.$emit("change", params);
  }

  render() {
    return (
      <div>
        {this.isMingJue && (
          <MingJue
            visible={this.visible}
            loading={this.loading}
            partId={this.partId}
            onChange={this.onChange}
          />
        )}
        {this.isBeiMai && (
          <BeiMai
            visible={this.visible}
            loading={this.loading}
            partId={this.partId}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
</script>
