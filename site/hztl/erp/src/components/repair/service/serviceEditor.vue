<template>
  <ht-dialog
    v-bind="$attrs"
    :title="isNew ? '新增服务项目' : '编辑服务项目'"
    width="750px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      class="form"
      ref="form"
      :model="form"
      :rules="rules"
      size="mini"
      label-width="90px"
    >
      <el-form-item label="项目编码" v-show="!isNew">
        <el-input
          v-model="form.code"
          :disabled="true"
          place-holder="编码"
          size="small"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="name">
        <el-input v-model="form.name" place-holder="名称/助记符" size="small" />
      </el-form-item>
      <el-form-item label="项目类型" prop="category">
        <ht-select
          v-model="form.category"
          filterable
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in repairProjectCategoryList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          />
        </ht-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" size="small" />
      </el-form-item>
      <el-form-item label="价格设置">
        <ht-setting-table
          :data="basePriceData"
          :enable-table-setting="false"
          :columns="columns(true)"
          table-name="basePrice"
          style="height:72px;"
        />
        <div class="table-row">
          <el-checkbox v-model="flags.useLevel" @change="levelVisibleChange"
            >按车辆级别设置</el-checkbox
          >
          <el-checkbox v-model="flags.commonUse">常用项目</el-checkbox>
          <el-checkbox v-model="flags.discount">允许打折</el-checkbox>
          <el-checkbox v-model="flags.status">是否停用</el-checkbox>
          <div class="row-table" v-show="flags.useLevel">
            <ht-setting-table
              :data="levelData"
              :enable-table-setting="false"
              :columns="columns(false)"
              table-name="level"
              style="height:235px;"
            />
          </div>
        </div>
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" size="small" @click="confirm"
          >确定（F3）</el-button
        >
        <el-button type="primary" size="small" @click="cancelHandle(form.name)"
          >取消（ESC）</el-button
        >
      </div>
    </el-form>
  </ht-dialog>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { createItems, updateItems } from "@/api/repairs";
import { precisionsFixed } from "@/mixins";
import { baseDictionary } from "@/api/base/base";
import { repairProjectCategoryDictionary } from "@/utils/store";
import { cloneDeep } from "lodash";
export default {
  name: "ServiceEditor",
  props: {
    currentItem: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [precisionsFixed],
  data() {
    return {
      isNew: true,
      flags: {
        status: false,
        commonUse: true,
        discount: true,
        useLevel: false
      },
      form: {
        group: [],
        single: "",
        name: "",
        checked: false
      },
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        category: [
          { required: true, message: "请选择项目类型", trigger: "blur" }
        ]
      },
      basePriceData: [
        {
          vehicleLevel: 0,
          chargeManHour: 1,
          checkManHour: 1,
          manHourPrice: 0.0,
          manHourCostPrice: 0.0
        }
      ],
      levelData: [],
      levelColumns: [
        {
          prop: "vehicleLevel",
          label: "车辆级别",
          width: CELL_WIDTH.multiple,
          render: value => {
            return this.levelList.find(item => item.id === value)?.name;
          }
        }
      ],
      baseColumns: [
        {
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.multiple,
          render: (value, row, index) => {
            return (
              <HtFormatNumber
                v-model={value}
                min={1}
                precision-type="qty"
                on-change={this.qtyChange.bind(
                  this,
                  index,
                  "chargeManHour",
                  row.vehicleLevel
                )}
              />
            );
          }
        },
        {
          prop: "checkManHour",
          label: "考核工时",
          width: CELL_WIDTH.multiple,
          render: (value, row, index) => {
            return (
              <HtFormatNumber
                v-model={value}
                min={1}
                precision-type="qty"
                on-change={this.qtyChange.bind(
                  this,
                  index,
                  "checkManHour",
                  row.vehicleLevel
                )}
              />
            );
          }
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.multiple,
          render: (value, row, index) => {
            return (
              <el-input
                value={value}
                type="number"
                place-holder="工时单价"
                onInput={this.priceChange.bind(
                  this,
                  index,
                  "manHourPrice",
                  row.vehicleLevel
                )}
                size="small"
              />
            );
          }
        },
        {
          prop: "manHourCostPrice",
          label: "工时成本价",
          width: CELL_WIDTH.multiple,
          render: (value, row, index) => {
            return (
              <el-input
                value={value}
                type="number"
                place-holder="工时成本价"
                onInput={this.priceChange.bind(
                  this,
                  index,
                  "manHourCostPrice",
                  row.vehicleLevel
                )}
                size="small"
              />
            );
          }
        },
        {
          label: "收费金额",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { chargeManHour, manHourPrice } = row;
            const price = Number(chargeManHour * manHourPrice).toFixed(2);
            return <span>{price}</span>;
          }
        },
        {
          label: "成本金额",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { chargeManHour, manHourCostPrice } = row;
            const price = Number(chargeManHour * manHourCostPrice).toFixed(2);
            return <span>{price}</span>;
          }
        }
      ],
      levelList: [],
      isSet: false // 新增模式中是否已经设置过车辆级别的价格为基础价格
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          console.log("update");
        }
      },
      immediate: true
    },
    currentItem: {
      handler(value) {
        baseDictionary({ type: "vehicleLevel" }).then(res => {
          this.levelList = res.options;
          if (value && value.id) {
            console.log("编辑模式");
            this.isNew = false;
            this.initForm(cloneDeep(value));
          } else {
            this.initVehicleLevel();
            console.log("新增模式");
            this.isNew = true;
            this.isSet = false;
            this.form = {};
            this.basePriceData = [
              {
                chargeManHour: "1",
                checkManHour: "1",
                manHourCostPrice: "1",
                manHourPrice: "1"
              }
            ];
            this.flags = {
              status: false,
              commonUse: true,
              discount: true,
              useLevel: false
            };
          }
        });
      },
      deep: true
    }
  },
  computed: {
    columns() {
      return function(isBase) {
        if (isBase) {
          return this.baseColumns;
        } else {
          return [...this.levelColumns, ...this.baseColumns];
        }
      };
    },
    repairProjectCategoryList() {
      return repairProjectCategoryDictionary();
    }
  },
  methods: {
    levelVisibleChange(value) {
      // 新增状态和按车辆级别设置选项由false改为true时，应用基础价格设置到所有的级别
      if (value && this.isNew && !this.isSet) {
        const tem = [];
        this.levelList.forEach(item => {
          tem.push({
            ...this.basePriceData[0],
            vehicleLevel: item.id
          });
        });
        this.levelData = [...tem];
        this.isSet = true;
      }
    },
    qtyChange(index, key, vehicleLevel, e) {
      const value = this.precisionFormat(e, "money");
      this.levelInputValueChange(index, key, vehicleLevel, value);
    },
    priceChange(index, key, vehicleLevel, e) {
      const value = this.precisionFormat(e, "money");
      this.levelInputValueChange(index, key, vehicleLevel, value);
    },
    initForm(value) {
      const { flags, prices } = value;
      const basePriceData = [];
      const levelData = [];
      prices.forEach(item => {
        if (item.vehicleLevel) {
          levelData.push(item);
        } else {
          basePriceData.push(item);
        }
      });
      this.flags = flags;
      this.flags = {
        ...flags,
        status: flags.status == "disable" ? true : false
      };
      this.basePriceData = basePriceData;
      // 咩有车辆级别数据就生成默认的，有的话通过字典来进行一个生成，保持与字典中定义的数量一致
      if (!levelData.length) {
        this.initVehicleLevel();
      } else {
        this.initVehicleLevelByData(levelData);
      }
      this.form = { ...value };
    },
    initVehicleLevel() {
      const tem = [];
      this.levelList.forEach(item => {
        tem.push({
          ...item,
          vehicleLevel: item.id,
          chargeManHour: 1,
          checkManHour: 1,
          manHourPrice: 0,
          manHourCostPrice: 0
        });
      });
      this.levelData = [...tem];
      console.log(this.levelData);
      this.$nextTick(() => {
        this.$refs.form?.clearValidate();
      });
    },
    initVehicleLevelByData(data) {
      const tem = [];
      this.levelList.forEach(item => {
        const currentLevel = data.find(level => level.vehicleLevel === item.id);
        if (currentLevel) {
          tem.push({
            ...currentLevel
          });
        } else {
          tem.push({
            vehicleLevel: item.id,
            chargeManHour: 1,
            checkManHour: 1,
            manHourPrice: 0,
            manHourCostPrice: 0
          });
        }
      });
      this.levelData = [...tem];
      this.$refs.form?.clearValidate();
    },
    levelInputValueChange(index, key, vehicleLevel, e) {
      const isLevelData = vehicleLevel > 0;
      if (isLevelData) {
        this.levelData[index][key] = e;
      } else {
        this.basePriceData[0][key] = e;
      }
    },
    confirm() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          this.submit();
        }
      });
    },
    submit() {
      const flags = {
        ...this.flags,
        status: this.flags.status ? "disable" : "enable"
      };
      if (this.isNew) {
        createItems({
          ...this.form,
          flags,
          prices: flags.useLevel
            ? [...this.basePriceData, ...this.levelData]
            : [...this.basePriceData]
        }).then(() => {
          this.$message.success({ message: "创建服务项目成功" });
          this.cancelHandle(this.form.name);
        });
      } else {
        const { hasStore } = this.form;
        const operate = this.flags.status ? "停用" : "修改";
        if (hasStore) {
          this.$confirm(
            `${operate}该项目后，会导致店铺中该项目无法正常使用，请谨慎操作！`,
            "提示",
            {
              confirmButtonText: "确认（Enter）",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            updateItems({
              ...this.form,
              flags,
              prices: flags.useLevel
                ? [...this.basePriceData, ...this.levelData]
                : [...this.basePriceData]
            }).then(() => {
              this.$message.success({ message: "更新服务项目成功" });
              this.cancelHandle(this.form.name);
            });
          });
        } else {
          updateItems({
            ...this.form,
            flags,
            prices: flags.useLevel
              ? [...this.basePriceData, ...this.levelData]
              : [...this.basePriceData]
          }).then(() => {
            this.$message.success({ message: "更新服务项目成功" });
            this.cancelHandle(this.form.name);
          });
        }
      }
    },
    cancelHandle(name) {
      this.$emit("update", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  display: flex;
  justify-content: center;
}
.form {
  ::v-deep {
    .cell {
      text-align: right;
    }
  }
}
</style>
