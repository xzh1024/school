export interface listItem {
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
   * 是否允许添加子分类（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductClassifyListDto
   */
  children?: {
    [k: string]: unknown;
  };
}
