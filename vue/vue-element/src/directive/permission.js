
import store from '@/store'
export default {
  inserted(el, binding) {
    const { value, arg } = binding
    const permIdList = store.getters.permIdList
    const { userName, id } = store.getters.userInfo
    if (value) {
      // 删除和编辑只能操作自己的 arg && userName !== arg
      // 超管(144115205301725056)除外
      if ((id !== '144115205301725056') && (!permIdList.includes(value) || (arg && userName !== arg))) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
    else {
      console.log(`v-perm can not be empty!`)
    }
  }
}
