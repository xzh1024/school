
import Vue from 'vue'
import Loading from './loading.vue'

const Mask = Vue.extend(Loading)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      el.instance.tip = binding.arg
      el.instance.visible = true
      insertDom(el, el)
    })
  }
  else {
    el.instance.tip = ''
    el.instance.visible = false
  }
}

const insertDom = (parent, el) => {
  if (el.style.position !== 'absolute' && el.style.position !== 'fixed') {
    parent.style.position = 'relative'
  }
  parent.appendChild(el.mask)
}

export default {
  bind: function(el, binding) {
    const mask = new Mask({
      el: document.createElement('div'),
      data() {}
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStyle = {}
    binding.value && toggleLoading(el, binding)
  },
  update: function(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind: function(el) {
    el.instance && el.instance.$destroy()
  }
}
