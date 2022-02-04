export { default as DeleteAccountModale } from '../..\\components\\DeleteAccountModale.vue'
export { default as DeletePostModale } from '../..\\components\\DeletePostModale.vue'
export { default as EditPostModal } from '../..\\components\\EditPostModal.vue'
export { default as EditProfileModale } from '../..\\components\\EditProfileModale.vue'
export { default as GroupomaniaLogo } from '../..\\components\\GroupomaniaLogo.vue'
export { default as LoginForm } from '../..\\components\\Login-form.vue'
export { default as Post } from '../..\\components\\Post.vue'
export { default as PostForm } from '../..\\components\\PostForm.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
