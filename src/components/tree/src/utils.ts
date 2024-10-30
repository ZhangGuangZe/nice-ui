import { InnerTreeNode, TreeNode } from './tree-types'

export function generateInnerTreeData(
  tree: TreeNode[],
  level = 0, // 当前层级
  parentNode = {} as InnerTreeNode // 当前节点的父节点
): InnerTreeNode[] {
  level++

  return tree.reduce((prev, curr) => {
    const o = { ...curr } as InnerTreeNode
    o.level = level

    if (level > 1 && parentNode) {
      o.parentId = parentNode.id
    }

    if (o.children) {
      const children = generateInnerTreeData(o.children, level, o)
      delete o.children
      return prev.concat(o, children)
    } else {
      o.isLeaf = true
      return prev.concat(o)
    }
  }, [] as InnerTreeNode[])
}
