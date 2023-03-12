export interface brandListItem {
  /**
   * id
   */
  id?: number;
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
   * 品牌logo ,GetResourceFilesResp
   */
  file?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 备注
   */
  remark?: string;
}
