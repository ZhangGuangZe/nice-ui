import type { ExtractPropTypes, PropType } from 'vue'

export interface TreeNode {
  label: string
  id?: string
  children?: TreeNode[]

  selected?: boolean // 选中
  checked?: boolean // 勾选
  expanded?: boolean // 展开

  disableSelect?: boolean // 禁止选中
  disableCheck?: boolean // 禁止勾选
  disableToggle?: boolean // 禁止展开
}

export interface InnerTreeNode extends TreeNode {
  parentId?: string
  level: number // 层级
  isLeaf?: boolean // 叶子节点
}

export const treeProps = {
  data: {
    type: Object as PropType<Array<TreeNode>>,
    required: true
  },
  // 是否显示连接线
  showLine: {
    type: Boolean,
    default: false
  },
  checkable: {
    type: Boolean,
    default: false
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>
