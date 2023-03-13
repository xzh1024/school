<template>
  <el-form-item :label="labelName">
    <el-row>
      <el-col :span="5">
        <el-select
          v-model="formData.type"
          placeholder="请选择"
          @change="typeChange"
        >
          <el-option
            v-for="item in codeTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select
          v-model="formData.begin"
          placeholder="请选择"
          filterable
          @change="valueFromChange"
        >
          <el-option
            v-for="item in valueOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            :disabled="isDisabled(item.value, 1, formData.end)"
          />
        </el-select>
      </el-col>
      <el-col :span="1">
        &nbsp;~&nbsp;
      </el-col>
      <el-col :span="4">
        <el-select
          v-model="formData.end"
          placeholder="请选择"
          filterable
          @change="valueToChange"
        >
          <el-option
            v-for="item in valueOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            :disabled="isDisabled(item.value, formData.begin, 1000)"
          />
        </el-select>
      </el-col>
      <el-col :span="1" />
      <el-col
        v-show="formData.type === 0"
        :span="5"
        style="text-align:right;padding-right:10px"
      >
        数字位数
      </el-col>
      <el-col v-show="formData.type === 0" :span="4">
        <el-select
          v-model="formData.length"
          placeholder="请选择"
          filterable
          @change="
            {
            }
          "
        >
          <el-option
            v-for="item in lengthOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
const numberList1 = [];
const numberList2 = [];
const numberList3 = [];
const alphabetList = [];
for (let i = 1; i < 10; i++) {
  numberList1.push({
    value: i,
    label: i + ""
  });
}
for (let i = 1; i < 100; i++) {
  numberList2.push({
    value: i,
    label: i + ""
  });
}
for (let i = 1; i < 1000; i++) {
  numberList3.push({
    value: i,
    label: i + ""
  });
}
for (let i = 1; i < 27; i++) {
  alphabetList.push({
    value: i,
    label: String.fromCharCode(64 + i)
  });
}

export default {
  name: "BatchAdd",
  model: {
    prop: "formData",
    event: "update"
  },
  props: {
    labelName: {
      type: String,
      default: ""
    },
    formData: {
      type: Object,
      default() {
        return {
          type: 0,
          begin: "1",
          end: "1",
          length: 1
        };
      }
    }
  },
  data() {
    return {
      codeTypeOptions: [
        {
          name: "数字",
          value: 0
        },
        {
          name: "字母",
          value: 1
        }
      ],
      lengthOptions: [1, 2, 3]
    };
  },
  computed: {
    valueOptions() {
      if (this.formData.type == 0) {
        if (this.formData.length == 1) {
          return numberList1;
        } else if (this.formData.length == 2) {
          return numberList2;
        } else {
          return numberList3;
        }
      } else {
        return alphabetList;
      }
    }
  },
  methods: {
    typeChange() {
      if (this.formData.type === 0) {
        this.formData.begin = "1";
        this.formData.end = "1";
      } else {
        this.formData.begin = "A";
        this.formData.end = "A";
      }
    },
    valueFromChange(val) {
      if (this.formData.end < val) {
        this.formData.end = val;
      }
    },
    valueToChange(val) {
      if (this.formData.begin > val) {
        this.formData.begin = val;
      }
    },
    isDisabled(value, min, max) {
      if ((max > 1 && value > max) || (min > 1 && value < min)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
