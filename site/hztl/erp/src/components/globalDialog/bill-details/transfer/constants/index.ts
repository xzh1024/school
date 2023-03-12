export * from "./apply-detail";
export * from "./stockin-detail";
export * from "./stockout-detail";
export * from "./stockin-return-detail";
export * from "./stockout-return-detail";

export interface DeaultHeader {
  createdByName: string;
}

export const defualtHeader = {
  createdByName: ""
};
