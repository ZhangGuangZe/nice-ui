import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
