import { defineComponent, toRefs } from 'vue'
import { buttonProps, ButtonProps } from './button-types'

export default defineComponent({
  name: 'NiButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size } = toRefs(props)
    return () => {
      return (
        <button
          class={`ni-button ni-button--${type.value} ni-button--${size.value}`}
        >
          {slots.default?.()}
        </button>
      )
    }
  }
})
