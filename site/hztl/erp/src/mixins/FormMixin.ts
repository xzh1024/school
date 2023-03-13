/**
  1、验证不通过弹框提示第一个不通过项，且焦点设置到第一个不通过项
**/

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormMixin extends Vue {
  public getFormValid(form: string) {
    const refForm: any = this.$refs[form];
    if (!refForm) {
      return;
    }

    let flag = false;
    refForm.validate((valid: boolean, err: any) => {
      flag = valid;
      if (!valid) {
        // 验证不通过弹框提示第一个不通过项，且焦点设置到第一个不通过项
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips });
        setTimeout(() => {
          const input: HTMLElement | null = refForm.$el.querySelector(
            ".is-error input"
          );
          input?.focus();
        });
      }
    });
    return flag;
  }
}
