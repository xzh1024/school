import { dateFormatToSecond } from "@/utils/date";
import { forceLogout } from "@/api/loginregister/index";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  watch: {
    passvisible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
      } else if (oldVal) {
        this.bookQtyFocus = false;
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  data() {
    return {
      bookQtyFocus: false,
      beyondMaxLoginNumberData: [],
      userPerms: [],
      userHasRootPerm: false,
      passvisible: false,
      currentStaffId: null,
      adminTableColumns: [
        {
          label: "操作",
          width: 120,
          attrs: {
            resizable: false
          },
          render: (_, row) => {
            const { staffId, belongs } = row;
            const isBelongOurs = belongs && belongs.includes("our");
            const isBelongsRests = belongs && belongs.includes("rests");
            let allowOperate = false;
            if (this.userHasRootPerm) {
              allowOperate = true;
            }
            // 如果有操作所在公司的权限,且用户为所在公司的
            if (this.checkPerm("system.onlineStaff.our") && isBelongOurs) {
              allowOperate = true;
            }
            // 如果有操作其他公司的权限，且用户为其他公司的
            if (this.checkPerm("system.onlineStaff.rests") && isBelongsRests) {
              allowOperate = true;
            }
            console.log(allowOperate);
            //自己不能踢自己
            if (this.showForceLogoutBtn(staffId) && allowOperate) {
              return (
                <el-button
                  type="primary"
                  size="mini"
                  onClick={e => this.forceOffLine(staffId, e)}
                >
                  强制下线
                </el-button>
              );
            }
          }
        },
        {
          prop: "companyName",
          attrs: { resizable: false },
          label: "分公司",
          width: 80
        },
        {
          prop: "staffName",
          attrs: { resizable: false },
          label: "员工名称",
          width: 80
        },
        {
          prop: "phone",
          attrs: { resizable: false },
          label: "手机号码",
          width: 100
        },
        {
          prop: "loginTime",
          label: "登录时间",
          width: 150,
          attrs: { resizable: false },
          formatter: text => dateFormatToSecond(text)
        },
        {
          prop: "roles",
          attrs: { resizable: false },
          label: "角色",
          width: 80
        },
        {
          prop: "departmentName",
          attrs: { resizable: false },
          label: "部门",
          width: 80
        }
      ],
      tableColumns: [
        {
          prop: "companyName",
          attrs: { resizable: false },
          label: "分公司",
          width: 80
        },
        {
          prop: "staffName",
          attrs: { resizable: false },
          label: "员工名称",
          width: 80
        },
        {
          prop: "phone",
          attrs: { resizable: false },
          label: "手机号码",
          width: 100
        },
        {
          prop: "loginTime",
          label: "登录时间",
          width: 150,
          attrs: { resizable: false },
          formatter: text => dateFormatToSecond(text)
        },
        {
          prop: "roles",
          attrs: { resizable: false },
          label: "角色",
          width: 80
        },
        {
          prop: "departmentName",
          attrs: { resizable: false },
          label: "部门",
          width: 80
        }
      ]
    };
  },
  methods: {
    beyondMaxLoginNumberTips(hasPermission) {
      const tips = hasPermission
        ? "账套当前允许同时在线员工数已达上限，请强制下线任意用户后登录或联系思锐增加同时在线员工数后再试"
        : "账套当前允许同时在线员工数已达上限，请联系公司相关管理人员进行协调或联系思锐增加同时在线员工数后再试！";
      return (
        <div>
          <div>{tips}</div>
          <ht-card noBackground={true} noPadding={true} title="在线员工列表">
            <ht-table
              style="height: 333px"
              data={this.beyondMaxLoginNumberData}
              columns={
                hasPermission ? this.adminTableColumns : this.tableColumns
              }
              selectionType={null}
            />
          </ht-card>
        </div>
      );
    },
    forceOffLine(staffId, e) {
      e.stopPropagation();
      this.passvisible = true;
      this.currentStaffId = staffId;
    },
    sureHandle() {
      this.passvisible = false;
      forceLogout({
        staffId: this.currentStaffId
      })
        .then(() => {
          this.currentStaffId = null;
          this.$msgbox.close();
          this.loadBaseData();
        })
        .catch(() => {
          this.currentStaffId = null;
        });
    },
    close() {
      this.currentStaffId = null;
      this.passvisible = false;
    },
    loginHasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      return (
        this.userHasRootPerm ||
        (this.userPerms && this.userPerms.some(item => permKey === item))
      );
    },
    checkPerm(key) {
      const pathArray = key.split(".");
      let currentPath = "";
      let checkPermStatus = false;
      pathArray.forEach((k, idx) => {
        currentPath += idx > 0 ? "." + k : k;
        if (this.userPerms && this.userPerms.includes(currentPath)) {
          checkPermStatus = true;
        }
      });
      return checkPermStatus;
    },
    showForceLogoutBtn(staffId) {
      return !(staffId == this.$store.state.admin.user?.userInfoMsg?.staffId);
    }
  }
};
