import dayjs from "dayjs";

const dateFormat = {
	dateYmd(date, rule = "YYYY/MM/DD") {
		return date ? dayjs(date).format(rule) : "";
	},
	dateFull(date) {
		return date ? this.dateYmd(date, "YYYY/MM/DD HH:mm") : "";
	}
};

export default dateFormat;
