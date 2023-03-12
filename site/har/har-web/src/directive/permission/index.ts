import { DirectiveBinding } from 'vue';
import { getPlatformFlag } from '@/utils';
import { useUserStore } from '@/store';
import { useUserStore as usePcsUserStore } from '@/store/pcs/user';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const p = getPlatformFlag();
  const keymap = {
    pcs: usePcsUserStore()
  } as any;
  const userStore = keymap[p] || useUserStore();
  const { permissions = [] } = userStore;

  if (Array.isArray(value) && value.length > 0) {
    const permissionValues = value;
    let hasPermission: boolean;

    if (permissions.includes('*:*:*')) {
      hasPermission = true;
    } else {
      hasPermission = permissionValues.every((i) => permissions.includes(i));
    }
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } else {
    throw new Error(
      `need permissions! Like v-permission="['page:info','page:update']"`
    );
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  }
};
