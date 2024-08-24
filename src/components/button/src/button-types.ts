import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

export type ButtonSize = 'small' | 'medium' | 'large'

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
