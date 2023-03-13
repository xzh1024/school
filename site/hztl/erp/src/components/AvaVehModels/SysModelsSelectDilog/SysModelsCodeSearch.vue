<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";

interface Props {
  visible: boolean;
  loading: boolean;
  customCodes: string[];
}
interface Events {
  onChange(params: string | number): void;
}
interface Options {
  id: string;
  name: string;
}

@Component
export default class SysModelsCodeSearch extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  @Prop() readonly customCodes!: string[];
  @Prop() readonly visible!: boolean;

  private options: Options[] = [];

  @Watch("visible", { immediate: true })
  onVisibleChange(val: boolean) {
    if (val && this.customCodes?.length) {
      this.options = this.customCodes.map(item => ({ id: item, name: item }));
      this.value = this.options[0].id || "";
      this.$nextTick(() => {
        this.onCustomCodeChange();
      });
    }
  }

  private value = "";
  @Watch("value")
  private onCustomCodeChange() {
    this.$emit("change", this.value);
  }

  render() {
    return (
      <ht-list
        v-loading={this.loading}
        v-model={this.value}
        options={this.options}
      />
    );
  }
}
</script>
