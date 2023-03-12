
<script>

import { KEY_MAP } from "hztl-ui/src/constants";

export default {
    name: "HtTabs",
    componentName: "HtTabs",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: {},
        tabs: {
            type: Array,
            default() {
                return []
            }
        }
    },
    mounted() {
        if ([null, "", undefined].includes(this.value) && this.tabs.length) {
            this.tabChange(this.tabs[0]);
        }
    },
    methods: {
        tabChange(tab) {
            this.$emit("change", tab.id);
        },
        listenKeyboard(e) {
            let index = this.tabs.findIndex(item => item.id === this.value);
            switch (e.keyCode) {
                case KEY_MAP.left:
                    event.preventDefault();
                    index--;
                    break;
                case KEY_MAP.right:
                    event.preventDefault();
                    index++;
                    break;

                default:
                    break;
            }
            if (index < 0) {
                index = this.tabs.length - 1;
            } else if (index >= this.tabs.length) {
                index = 0;
            }
            this.tabChange(this.tabs[index]);
        }
    },
    render() {
        return (
            <ul class="ht-tabs">
                {this.tabs.map(tab => (
                    <li
                        on-click={() => this.tabChange(tab)}
                        class={`tab ${this.value === tab.id ? "active" : ""}`}
                    >
                        {tab.render ? tab.render(tab.name, tab) : tab.name}
                    </li>
                ))}
            </ul>
        );
    }
};
</script>