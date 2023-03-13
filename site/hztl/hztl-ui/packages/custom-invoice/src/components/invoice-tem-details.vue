<script>
import DetailsFile  from "./invoice-details-file";

export default {
    props: {
        templateData: {
            type: Array,
            required: true
        }
    },
    render() {
        if (!this.templateData.length) {
            return
        }
        return (
            <div class="ht-invoice-file-box">
                <div class="ht-invoice-data-group">
                    {this.templateData.map(item => (
                        <DetailsFile data={item} />
                    ))}
                </div>
            </div>
        );
    }
};
</script>