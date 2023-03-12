<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import { BEIMAI, MINGJUE, DEFAULT_VIN_TYPE } from "@/constants/platform";
import MingJue, { FormMingJueData } from "./MingJue";
import BeiMai, { FormBeiMaiData } from "./BeiMai";

interface Props {
  delayFocus: boolean;
  existedInStock?: boolean;
}

interface Events {
  onChange(params: FormMingJueData | FormBeiMaiData): void;
  onClose?(): void;
  onLocalSave(params: FormMingJueData | FormBeiMaiData): void;
}

@Component
export default class StdVehModelsSearch extends tsc.Component<Props, Events> {
  @Prop() readonly delayFocus!: boolean;
  @Prop() readonly existedInStock?: boolean;
  @Prop() readonly hasImage?: boolean;
  protected get dataSource() {
    return (
      (this.$store && this.$store.state.admin.user.userInfoMsg.dataService) ||
      DEFAULT_VIN_TYPE
    );
  }
  private get isMingJue() {
    return this.dataSource === MINGJUE;
  }
  private get isBeiMai() {
    return this.dataSource === BEIMAI;
  }
  private localSave(params: FormMingJueData | FormBeiMaiData) {
    console.log(params);
    this.$emit("localSave", params);
  }
  private onChange(params: FormMingJueData | FormBeiMaiData) {
    this.$emit("change", params);
  }
  private onClose() {
    this.$emit("close");
    this.$emit("vivsible", false);
  }

  render() {
    return (
      <Fragment>
        {this.isMingJue && (
          <MingJue
            existed-in-stock={this.existedInStock}
            has-image={this.hasImage}
            delayFocus={this.delayFocus}
            onChange={this.onChange}
            onClose={this.onClose}
            on-localSave={this.localSave}
          />
        )}
        {this.isBeiMai && (
          <BeiMai
            existed-in-stock={this.existedInStock}
            has-image={this.hasImage}
            delayFocus={this.delayFocus}
            onChange={this.onChange}
            onClose={this.onClose}
            on-localSave={this.localSave}
          />
        )}
      </Fragment>
    );
  }
}
</script>
