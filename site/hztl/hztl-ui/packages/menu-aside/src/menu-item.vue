<script>
export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    render(h, context) {
        const { icon, title } = context.props;
        const vnodes = [];
        const shortName = title.substring(0, 2);
        if (icon) {
            return (
                <div class="menu-block">
                    <i class={`${icon} menu-icon`} />
                    <div class="menu-title">{shortName}</div>
                </div>
            );
        } else if (title) {
            return (<span slot="title">{title}</span>);
        }
        return vnodes;
    }
};
</script>
