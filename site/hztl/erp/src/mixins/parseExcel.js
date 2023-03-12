import XLSX from "xlsx";
import eventBus from "@/event";
import { envConfig } from "envConfigPath";

export default {
  data() {
    return {
      pending: false,
      wb: "",
      tableHeader: [],
      tableTbody: [],
      excelSheets: [],
      curSheet: null
    };
  },
  methods: {
    importExcel(files) {
      if (!files) return;
      const file = files[0] || null;
      if (!file) {
        this.curSheet = null;
        this.excelSheets = [];
        eventBus.$emit("pushSheetData", null);
        return;
      }
      const types = file.name.split(".")[1],
        fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
          item => item === types
        );
      if (!fileType) {
        this.$message.warning({
          message: "文件格式错误！请重新选择",
          showClose: true
        });
        return;
      }
      this.file2Xce(file).then(data => {
        this.pending = true;
        const worker = new Worker(
          envConfig.routerPrefix
            ? envConfig.routerPrefix + "/worker/parseExcel.js"
            : "./worker/parseExcel.js"
        );
        worker.onmessage = e => {
          switch (e.data.t) {
            case "ready":
              break;
            case "e":
              this.pending = false;
              console.error(e.data.d);
              break;
            case "xlsx":
              this.pending = false;
              this.wb = JSON.parse(e.data.d);
              this.excelSheets = this.wb.SheetNames;
              this.curSheet = this.excelSheets[0];
              this.selectSheet(this.curSheet);
          }
        };
        worker.postMessage({ d: data, b: { type: "binary" }, t: "xlsx" });
        // this.wb = XLSX.read(data, { type: 'binary' });
        // this.excelSheets = this.wb.SheetNames;
        // this.curSheet = this.excelSheets[0];
        // this.selectSheet(this.curSheet);
      });
    },
    file2Xce(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          resolve(data);
        };
        reader.readAsBinaryString(file);
      });
    },
    selectSheet(sheet) {
      let merges = [];
      merges = this.wb.Sheets[sheet]["!merges"] || [];
      if (merges && merges.length > 0) {
        this.$message.warning({
          message: "导入Excel不能包含合并单元格",
          showClose: true
        });
        return;
      }
      const tabJson = XLSX.utils.sheet_to_json(this.wb.Sheets[sheet], {
        raw: false,
        defval: ""
      });
      if (tabJson && tabJson.length > 0) {
        this.tableHeader = Object.keys(tabJson[0]);
        this.tableTbody = tabJson;
        eventBus.$emit("pushSheetData", {
          header: this.tableHeader,
          body: this.tableTbody
        });
      }
    }
  }
};
