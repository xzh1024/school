import { mapState } from "vuex";
import Vue from "vue";
import { BELONGS } from "@/constants";

function getBelongsPerm(belongs) {
  if (!belongs) {
    console.error("belongs 错误");
    return [];
  } else {
    if (belongs instanceof Array) {
      return belongs && belongs.length ? belongs : BELONGS;
    }
    const keys = Object.keys(belongs);
    const arr = [];
    keys.forEach(item => {
      if (belongs[item]) {
        arr.push(item);
      }
    });
    return arr;
  }
}

export function resetBelongsItem(data, items, newItem) {
  if (!data || !data.length) {
    return data;
  }
  if (data.includes(newItem)) {
    return data;
  }
  if (data.every(item => !items.includes(item))) {
    return data;
  }
  let newData = data.filter(it => !items.includes(it));
  newData = [...newData, newItem];
  return newData;
}

export default {
  computed: {
    ...mapState("admin/user", {
      hasRootPerm: state => state.perm.hasRootPerm,
      perms: state => state.perm.perms
    })
  },
  beforeMount() {
    Vue.prototype.hasPerm = this.hasPerm;
    Vue.prototype.hasEntryPerm = this.hasEntryPerm;
    Vue.prototype.hasEntryTagsPerm = this.hasEntryTagsPerm;
    Vue.prototype.hasEntryBelongsPerm = this.hasEntryBelongsPerm;
    Vue.prototype.hasBelongsPermWithoutRoute = this.hasBelongsPermWithoutRoute;
    Vue.prototype.hasCompletePerm = this.hasCompletePerm;
    Vue.prototype.hasAutoPerm = this.hasAutoPerm;
    Vue.prototype.hasImportPerm = this.hasImportPerm;
    Vue.prototype.hasManagePerm = this.hasManagePerm;
    Vue.prototype.hasBelongsPerm = this.hasBelongsPerm;
    Vue.prototype.hasBelongsTagsPerm = this.hasBelongsTagsPerm;
  },
  methods: {
    hasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      return (
        this.perms &&
        this.perms.some(
          item =>
            new RegExp(`^${item}.`.replace(/\./g, "\\.")).test(`${permKey}.`) ||
            new RegExp(`^${permKey}`).test(`${item}`)
        )
      );
    },
    hasEntryPerm(permKey, tags, hasBelongs) {
      if (!permKey) {
        return true;
      }
      if (tags) {
        return this.hasEntryTagsPerm(permKey, tags, hasBelongs);
      } else if (hasBelongs) {
        return this.hasEntryBelongsPerm("read", permKey);
      } else {
        return this.hasPerm(permKey);
      }
    },
    hasEntryTagsPerm(permKey, tags, hasBelongs) {
      if (hasBelongs) {
        return tags.some(item =>
          this.hasEntryBelongsPerm("read", `${permKey}.${item}`)
        );
      } else {
        return tags.some(item => this.hasPerm(`${permKey}.${item}.read`));
      }
    },
    hasEntryBelongsPerm(key, permKey, belongs) {
      const belongList = belongs && belongs.length ? belongs : BELONGS;
      const perms = belongList.map(item => `${permKey}.${item}.${key}`);
      return perms.some(it => this.hasPerm(it));
    },
    hasBelongsPermWithoutRoute(key, permKey, belongs) {
      const belongList = belongs && belongs.length ? belongs : BELONGS;
      const perms = belongList.map(item => `${permKey}.${item}.${key}`);
      return perms.some(it => this.hasCompletePerm(it));
    },
    hasCompletePerm(permKey) {
      if (!permKey) {
        return true;
      }
      return (
        this.perms &&
        this.perms.some(
          item =>
            new RegExp(`^${item}.`.replace(/\./g, "\\.")).test(`${permKey}.`) ||
            new RegExp(`^${permKey}`).test(`${item}`)
        )
      );
    },
    hasAutoPerm(key) {
      let perm = "";
      if (this.$route.meta && this.$route.meta.perm) {
        perm = this.$route.meta.hasBelongs
          ? this.$route.meta.perm
          : this.$route.meta.perm.replace(".read", "");
      }
      return perm && this.hasCompletePerm(`${perm}.${key}`);
    },
    hasImportPerm(key) {
      // 期初数据导入
      let perm = "";
      if (this.$route.meta && this.$route.meta.perm) {
        perm = this.$route.meta.hasBelongs
          ? this.$route.meta.perm
          : this.$route.meta.perm.replace(".read", "");
      }
      return (
        this.perms.includes("basics") || this.perms.includes(`${perm}.${key}`)
      );
    },
    hasBelongsPerm(key, belongs, tag) {
      // 兼容老权限（主要是仓库）
      let belongList = [];
      if (belongs instanceof Object) {
        belongList = getBelongsPerm(belongs);
      } else {
        belongList = belongs && belongs.length ? belongs : BELONGS;
      }
      const perms = belongList.map(item =>
        tag ? `${tag}.${item}.${key}` : `${item}.${key}`
      );
      return perms.some(it => this.hasAutoPerm(it));
    },
    hasBelongsTagsPerm(key, belongs, defaultTag) {
      let tags = [];
      if (defaultTag) {
        tags = [defaultTag];
      } else {
        tags =
          this.$route.meta && this.$route.meta.tags
            ? this.$route.meta.tags
            : [];
      }
      return tags.some(item => this.hasBelongsPerm(key, belongs, item));
    }
  }
};
