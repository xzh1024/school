import { Component, Vue } from "vue-property-decorator";

@Component
export default class BlankPage extends Vue {
  render() {
    return <div class="flex-container column-flex"></div>;
  }
}
