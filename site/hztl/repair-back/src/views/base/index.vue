<template>
  <layout-main>
    <div class="base-component ht-container">
      <div class="ht-header">
        <el-button
          type="primary"
          size="mini"
          :disabled="!validate"
          @click="submit"
        >
          保存
        </el-button>
      </div>
      <div class="ht-main">
        <el-form
          size="mini"
          label-width="80px"
          class="form-item-small-margin-bottom clearfix"
        >
          <div class="main-left">
            <ht-card title="商家信息">
              <span
                slot="after-title"
                class="font12 text-grey"
                style="margin-left: 8px"
              >
                *可上传门店门头照、企业名片等，不能大于2MB，参考尺寸220*130
              </span>
              <el-form-item label="商家名称:" required>
                <el-input
                  v-model.trim="formData.name"
                  :maxlength="20"
                  show-word-limit
                  clearable
                />
              </el-form-item>
              <el-form-item label="所在地区:" required>
                <el-cascader
                  v-model="areaIds"
                  :options="cascaderAreas"
                  :show-all-levels="false"
                  placeholder=""
                ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址:">
                <el-input
                  v-model.trim="formData.address"
                  :maxlength="50"
                  show-word-limit
                  clearable
                />
              </el-form-item>
              <el-form-item label="商家图片:">
                <ImgCutterUpload
                  :file-list="pics"
                  :limit="4"
                  :maxSize="2"
                  @get-file-list="getFileList"
                ></ImgCutterUpload>
              </el-form-item>
              <el-form-item label="商家描述:">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="请输入公司描述"
                  v-model.trim="formData.description"
                  :maxlength="200"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </ht-card>
            <ht-card title="联系方式">
              <el-form-item label="联系人:" required>
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone = phoneValidate(formData.phone)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人1:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts1"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone1"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone1 = phoneValidate(formData.phone1)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人2:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts2"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone2"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone2 = phoneValidate(formData.phone2)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="联系人3:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-row :gutter="8">
                      <el-col :span="8">
                        <el-input
                          v-model.trim="formData.contacts3"
                          clearable
                          placeholder="联系人姓名"
                          :maxlength="100"
                        />
                      </el-col>
                      <el-col :span="16">
                        <el-input
                          v-model.trim="formData.phone3"
                          clearable
                          placeholder="联系人电话"
                          :maxlength="100"
                          @keyup.native="
                            formData.phone3 = phoneValidate(formData.phone3)
                          "
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="微信:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-input
                      v-model.trim="formData.wechat"
                      clearable
                      :maxlength="100"
                    />
                  </el-col>
                  <el-col :span="9" class="font12 text-orange">
                    <div class="text-cut">* 可填多个微信号，用逗号分隔</div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <srimg-upload
                  :file-list="wechatPics"
                  :limit="4"
                  :max-size="2"
                  @get-file-list="getWechatFileList"
                />
              </el-form-item>
              <el-form-item label="QQ:">
                <el-row :gutter="8">
                  <el-col :span="14">
                    <el-input v-model.trim="formData.qq" clearable />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <srimg-upload
                  :file-list="qqPics"
                  :limit="4"
                  :max-size="2"
                  @get-file-list="getQqFileList"
                />
              </el-form-item>
            </ht-card>
          </div>
          <div class="main-right">
            <el-row>
              <ht-card title="主营内容">
                <span
                  slot="after-title"
                  class="font12 text-orange"
                  style="margin-left: 8px"
                >
                  *维护好主营车型可以通过车型品牌找到您哦
                </span>
                <div class="base-row">
                  <div class="base-label">主营车型:</div>
                  <div class="base-content text-blue">
                    {{ formData.vehBrands.join("、") }}
                    <i class="icon-edit" @click="showBrandDialog"></i>
                  </div>
                </div>
              </ht-card>
              <ht-card title="发货信息">
                <div class="base-row">
                  <div class="base-label">发货地区:</div>
                  <div class="base-content text-blue">
                    {{ areaNames.join("、") }}
                    <i class="icon-edit" @click="showAreaDialog"></i>
                  </div>
                </div>
              </ht-card>
            </el-row>
          </div>
        </el-form>
      </div>

      <brand-dialog
        ref="brandDialog"
        @updateVehBrands="updateVehBrands"
      ></brand-dialog>
      <area-dialog ref="areaDialog" @updateAreas="updateAreas"></area-dialog>
    </div>
  </layout-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LayoutMain from "@/components/layout/layoutMain.vue";
import SrImgUpload from "@/components/base/SrImgUpload";
import HtCard from "@/components/ht-card";
import BrandDialog from "./components/brandDialog.vue";
import AreaDialog from "./components/areaDialog.vue";
import "@/common/services/basicsService";
import { BasicsService } from "@/common/services/basicsService";
const basicsService = new BasicsService();
import {
  BaseFormParams,
  FileModel,
  AreaModel
} from "@/common/interface/baseInterface";
import ImgCutterUpload from "./components/ImgCutterUpload.vue";

interface CascaderTreeModel {
  value: number;
  label: string;
  pid: number;
  children?: CascaderTreeModel[];
}

interface IdMap {
  [key: number]: CascaderTreeModel;
}

@Component({
  name: "Base",
  components: {
    LayoutMain,
    "srimg-upload": SrImgUpload,
    HtCard,
    BrandDialog,
    AreaDialog,
    ImgCutterUpload
  }
})
export default class Base extends Vue {
  protected formData: BaseFormParams = {
    name: "",
    description: "",
    contacts: "",
    contacts1: "",
    contacts2: "",
    contacts3: "",
    phone: "",
    phone1: "",
    phone2: "",
    phone3: "",
    wechat: "",
    qq: "",
    vehBrands: [],
    areaId: 0,
    areas: [],
    address: ""
  };
  protected areaIds: number[] = [];

  get areaNames() {
    return this.formData.areas.map((item: AreaModel) => {
      return item.cascadeName || item.name;
    });
  }

  get validate() {
    const { name, contacts, phone } = this.formData;
    return name && this.areaIds.length && contacts && phone;
  }

  protected pics: FileModel[] = [];
  protected wechatPics: FileModel[] = [];
  protected qqPics: FileModel[] = [];

  protected getFileList(fileList: FileModel[]) {
    this.pics = fileList;
  }
  protected getWechatFileList(fileList: FileModel[]) {
    this.wechatPics = fileList;
  }
  protected getQqFileList(fileList: FileModel[]) {
    this.qqPics = fileList;
  }

  get brandDialog(): BrandDialog {
    return this.$refs.brandDialog as BrandDialog;
  }
  get areaDialog(): AreaDialog {
    return this.$refs.areaDialog as AreaDialog;
  }

  protected showBrandDialog() {
    this.brandDialog.show(this.formData.vehBrands as string[]);
  }

  public updateVehBrands(list: string[]) {
    this.formData.vehBrands = list;
  }

  protected showAreaDialog() {
    this.areaDialog.show(this.formData.areas);
  }

  public updateAreas(areas: AreaModel[]) {
    this.formData.areas = [...areas];
  }

  protected getCompanies() {
    basicsService.getCompanies().then((resp: BaseFormParams) => {
      if (resp) {
        const pics = resp.pics || [];
        this.pics = pics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        const wechatPics = resp.wechatPics || [];
        this.wechatPics = wechatPics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        const qqPics = resp.qqPics || [];
        this.qqPics = qqPics.map(origin => {
          return {
            name: "",
            url: origin,
            origin: origin
          };
        });
        resp.vehBrands = resp.vehBrands || [];
        resp.areas = resp.areas || [];
        const areaIds = new Array(3);
        if (resp.areaId) {
          const county = this.flatAreas.find(
            item => item.value === resp.areaId
          );
          if (county) {
            areaIds[2] = county.value;
            const city = this.flatAreas.find(item => item.value === county.pid);
            if (city) {
              areaIds[1] = city.value;
              areaIds[0] = city.pid;
            }
          }
        }
        this.areaIds = areaIds;
        Object.assign(this.formData, resp);
      }
    });
  }

  protected submit() {
    const formData = this.formData;
    const params = {
      ...formData,
      pics: this.pics.map(item => item.origin),
      wechatPics: this.wechatPics.map(item => item.origin),
      qqPics: this.qqPics.map(item => item.origin)
    } as BaseFormParams;
    if (this.areaIds[2]) {
      params.areaId = this.areaIds[2];
    }
    basicsService.updateCompanies(params).then(() => {
      this.$message.success("保存成功");
      this.getCompanies();
    });
  }

  public phoneValidate(value: string) {
    return value.replace(/[^\d-]/g, "");
  }

  protected flatAreas: CascaderTreeModel[] = [];
  protected cascaderAreas: CascaderTreeModel[] = [];
  protected async getAreas() {
    const list = (await basicsService.getAreas()) || [];
    this.flatAreas = this.flatTree(list);
    this.cascaderAreas = this.toTree(this.flatAreas);
    this.getCompanies();
  }
  // 按照需要的格式扁平化数据，方便通过区id回显数据
  private flatTree(list: AreaModel[], parentId = 0) {
    let tempFlat: CascaderTreeModel[] = [];
    if (!list || list.length <= 0) return tempFlat;
    list.forEach((val: AreaModel) => {
      tempFlat.push({
        value: val.id,
        label: val.name,
        pid: parentId
      });
      if (val.children) {
        const flat = this.flatTree(val.children, val.id);
        tempFlat = tempFlat.concat(flat);
      }
    });
    return tempFlat;
  }
  // 还原树形结构
  private toTree(data: CascaderTreeModel[]) {
    const val: CascaderTreeModel[] = [];
    if (!data || data.length <= 0) return val;
    // 删除 所有 children,以防止多次调用
    data.forEach((item: CascaderTreeModel) => {
      delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    const map: IdMap = {};
    data.forEach((item: CascaderTreeModel) => {
      map[item.value] = item;
    });
    data.forEach((item: CascaderTreeModel) => {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      const parent = map[item.pid];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        val.push(item);
      }
    });
    return val;
  }

  created() {
    this.getAreas();
  }
}
</script>

<style lang="scss" scoped>
.base-component {
  .ht-header {
    margin-bottom: 2px;
  }
  .ht-main {
    .el-form {
      .main-left,
      .main-right {
        float: left;
        width: 50%;
        box-sizing: border-box;
      }
      .main-left {
        padding-right: 30px;
      }
      .main-right {
        padding-left: 30px;
      }
    }
  }
  .base-row {
    display: flex;
    .base-label {
      width: 80px;
      height: 28px;
      box-sizing: border-box;
      padding-right: 4px;
      line-height: 28px;
      text-align: right;
      color: $color-text-secondary;
    }
    .base-content {
      flex: 1;
      padding-left: 6px;
      line-height: 28px;
      .icon-edit {
        margin-left: 8px;
        transform: translatey(4px);
      }
    }
  }
  .input-content {
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .icon-edit {
      margin-left: 8px;
    }
  }
}
</style>
