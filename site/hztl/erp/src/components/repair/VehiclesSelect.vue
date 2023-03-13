<template>
  <div>
    <ht-autocomplete
      v-bind="$attrs"
      v-model="plateNumberAfterFix"
      :fetch-suggestions="listCarFileAsync()"
      placeholder="车牌号"
      :no-data-text="noDataText"
      :trigger-on-focus="false"
      @intput-enter="intputEnter"
      @blur="onInputBlur"
      @select="handleSelect"
      :maxlength="50"
      highlight-first-item
    >
      <ht-select
        slot="prepend"
        v-model="plateNumberPrefix"
        :disabled="$attrs.disabled"
        :clearable="false"
        :options="plateTypes"
        placeholder
        style="width: 60px"
      />
    </ht-autocomplete>
    <FileEditor
      v-if="showFileEditor"
      :visible="showFileEditor"
      :currentFile="currentFile"
      :showCooperator="true"
      @update="update"
      @close="cancelHandle"
    />
  </div>
</template>

<script>
import FileEditor from "@/components/repair/carFile/fileEditor";
import { listCarFile } from "@/api/repairs";
export default {
  model: {
    prop: "plateNumber",
    event: "select"
  },
  props: {
    plateNumber: {
      type: String,
      default: ""
    },
    cooperatorInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    plateNumber: {
      handler(val) {
        if (!val) {
          this.plateNumberAfterFix = "";
          return;
        }
        this.lastValue = val;
        this.plateNumberPrefix = val
          ? this.plateTypes.findIndex(item => item === val.substring(0, 1))
          : 0;
        this.plateNumberAfterFix = val ? val.substring(1) : "";
      },
      immediate: true
    }
  },
  components: {
    FileEditor
  },
  data() {
    return {
      lastValue: "",
      isNoMatch: false,
      showFileEditor: false,
      plateNumberAfterFix: "",
      plateNumberPrefix: "",
      currentFile: {},
      noDataText: "新增车辆，点击回车(Enter)快速新增",
      plateTypes: [
        "京",
        "津",
        "冀",
        "晋",
        "蒙",
        "辽",
        "吉",
        "黑",
        "沪",
        "苏",
        "浙",
        "皖",
        "闽",
        "赣",
        "鲁",
        "豫",
        "鄂",
        "湘",
        "粤",
        "桂",
        "琼",
        "渝",
        "川",
        "贵",
        "云",
        "藏",
        "陕",
        "甘",
        "青",
        "宁",
        "新",
        "港",
        "澳",
        "台"
      ]
    };
  },
  methods: {
    listCarFileAsync() {
      const { plateNumberAfterFix, plateNumberPrefix } = this;
      const plateNumber =
        plateNumberPrefix > -1
          ? this.plateTypes[plateNumberPrefix] + plateNumberAfterFix
          : plateNumberAfterFix;
      return (query, callback) => {
        listCarFile({
          plateNumber: plateNumber,
          page: 1,
          pageSize: 999
        }).then(res => {
          const data = res.rows || [];
          this.isNoMatch = !data.length;
          callback(
            data.map(item => ({
              ...item,
              value: `${item.plateNumber},${item.customerName},${item.customerPhone}`
            }))
          );
        });
      };
    },
    intputEnter(e) {
      this.$emit("clear");
      if (this.isNoMatch) {
        e.preventDefault();
        const { plateNumberPrefix, plateNumberAfterFix } = this;
        this.currentFile = {
          cooperatorId: this.cooperatorInfo.cooperatorId,
          customerName: this.cooperatorInfo.cooperatorName,
          plateNumberPrefix,
          plateNumberAfterFix
        };
        this.showFileEditor = true;
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
          this.$refs.fileForm?.clearValidate();
        });
      }
    },
    handleSelect(e) {
      const { plateNumber } = e;
      this.lastValue = plateNumber;
      this.plateNumberPrefix = plateNumber
        ? this.plateTypes.findIndex(
            item => item === plateNumber.substring(0, 1)
          )
        : 0;
      this.plateNumberAfterFix = plateNumber ? plateNumber.substring(1) : "";
      this.$emit("change", e);
      this.$emit("select", plateNumber);
    },
    onInputBlur() {
      this.plateNumberPrefix = this.lastValue
        ? this.plateTypes.findIndex(
            item => item === this.lastValue.substring(0, 1)
          )
        : 0;
      this.plateNumberAfterFix = this.lastValue
        ? this.lastValue.substring(1)
        : "";
    },
    update(e) {
      const { plateNumber, plateNumberAfterFix, plateNumberPrefix } = e;
      this.lastValue = plateNumber;
      this.plateNumberAfterFix = plateNumberAfterFix;
      this.plateNumberPrefix = plateNumberPrefix;
      this.$emit("change", e);
      this.$emit("select", plateNumber);
      this.showFileEditor = false;
    },
    cancelHandle() {
      this.showFileEditor = false;
      this.$emit("reset");
    }
  }
};
</script>

<style></style>
