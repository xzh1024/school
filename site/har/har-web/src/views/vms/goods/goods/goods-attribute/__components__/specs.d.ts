export interface SpecsListItem {
  /**
   * id
   */
  id?: number;
  /**
   * 父id
   */
  pid?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 子集数据 ,ProductSpecificationsListDto
   */
  children?: {
    [k: string]: unknown;
  };
}
