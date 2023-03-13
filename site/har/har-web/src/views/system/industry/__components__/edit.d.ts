export interface IndustryItem {
  /**
   * 分类名称
   */
  name?: string;
  /**
   * id
   */
  id?: number;
  icon?: string;
  children?: IndustryItem[];
  parentId?: number;
  /**
   * 序号
   */
  sort?: number;

  /**
   * 备注
   */
  remark?: string;
}
