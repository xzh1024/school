import { Module } from "vuex";
import { baseDictionary } from "@/api/base/base";
import { DictionaryItem, dictionaryKeys } from "@/constants/base";
import { multiply } from "@/utils/numberAPI";

export interface DictionaryState {
  [key: string]: DictionaryItem[] & { loaded?: boolean };
}
function processOptions(
  type: string,
  options: DictionaryItem[],
  useID: boolean
) {
  if (!options) return [];
  // 当用到内置字典时，id为0，所以将id赋值为name，这个参数默认不传为false
  if (!useID) {
    for (let i = 0; i < options.length; i++) {
      options[i].id = options[i].name;
    }
  }
  if (type == "settlementType" || type == "enhancedSettlementType") {
    options = options.filter((item: DictionaryItem) => item.name != "内部挂账");
  }
  return options;
}

// 构造衍生字典类型
function makeExtraDictionary(type: string, options: DictionaryItem[]) {
  if (type === "invoiceType") {
    return {
      type: "formatInvoiceType",
      options: options.map((item: DictionaryItem) => ({
        ...item,
        name: `${item.name}(${multiply(item.specialValue || 0, 100, 2)}%)`
      }))
    };
  }
}
const dictionaryTypes = dictionaryKeys.concat(["formatInvoiceType"]);

interface RootState {
  dictionary: DictionaryState;
}

const defaultDictionaryData: DictionaryState = {};

dictionaryTypes.forEach(type => {
  defaultDictionaryData[type] = [];
});

const runningLoading = {};
const dictionaryModule: Module<DictionaryState, RootState> = {
  namespaced: true,
  state(): DictionaryState {
    return {
      ...defaultDictionaryData
    };
  },
  mutations: {
    set(state, { type, options }) {
      state[type] = options || [];
      state[type].loaded = true;
    },
    clearData(state) {
      dictionaryTypes.forEach(type => {
        state[type] = [];
      });
      state.partBrand = [];
      state.companyType = [];
    }
  },
  actions: {
    async loadDictionary(context, { type, isReload = false, useID = false }) {
      if (type == "formatInvoiceType") type = "invoiceType";
      if (isReload || !context.state[type].loaded) {
        let loading = runningLoading[type];
        if (!loading) {
          loading = baseDictionary({ type, hasCode: type === "companyType" })
            .then((result: any) => {
              const options = processOptions(type, result.options, useID);
              context.commit("set", { type: type, options: options });

              const extra = makeExtraDictionary(type, options);
              if (extra) context.commit("set", extra);
            })
            .catch(console.error);
          runningLoading[type] = loading;
        }
        try {
          await loading;
        } catch (error) {
          console.error(error);
        } finally {
          delete runningLoading[type];
        }
      }
    }
  }
};
export default dictionaryModule;
