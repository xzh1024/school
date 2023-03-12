import { defineStore } from "pinia";
import {
  svcAppletCommonSelectProjectGet,
  SvcAppletCommonSelectProjectGetResponse
} from "@/api/card";

export const useProjectStore = defineStore({
  id: "project",
  state: () => {
    return {
      projectId: "",
      projectName: "",
      projectList: [] as SvcAppletCommonSelectProjectGetResponse
    };
  },
  getters: {
    getProjectList: async (state) => {
      const d = await svcAppletCommonSelectProjectGet();
      state.projectList = d;
      state.projectId = String(d[0]?.projectId);
      state.projectName = d[0]?.projectName;

      return {
        projectList: d,
        projectId: String(d[0]?.projectId),
        projectName: d[0]?.projectName
      };
    }
  },
  actions: {
    PROJECT_CHANGE(action: { projectId: string; projectName: string }) {
      this.projectId = action.projectId;
      this.projectName = action.projectName;
    }
  }
});
