import { computed, Ref, ref, unref } from 'vue'
import { generateInnerTreeData } from '../utils'
import { InnerTreeNode, TreeNode } from '../tree-types'

export function useTree(data: Ref<TreeNode[]> | TreeNode[]) {
  const flattenTreeData = ref(generateInnerTreeData(unref(data)))

  const toggleExpand = (node: InnerTreeNode) => {
    /* const currNode = flattenTreeData.value.find(item => item.id === node.id)
    if (currNode) {
      currNode.expanded = !currNode.expanded
    } */
    node.expanded = !node.expanded
  }

  const expandedTreeData = computed(() => {
    let excludeNodes: InnerTreeNode[] = []
    const result = []

    for (const node of flattenTreeData.value) {
      if (excludeNodes.includes(node)) continue

      if (node.expanded !== true) {
        excludeNodes = getChildren(node)
      }

      result.push(node)
    }
    return result
  })

  const getChildren = (node: InnerTreeNode, recursive = true) => {
    const result = []

    const startIndex = flattenTreeData.value.findIndex(
      item => item.id === node.id
    )

    for (
      let i = startIndex + 1;
      i < flattenTreeData.value.length &&
      flattenTreeData.value[i].level > node.level;
      i++
    ) {
      if (recursive) {
        result.push(flattenTreeData.value[i])
      } else if (flattenTreeData.value[i].level === node.level + 1) {
        result.push(flattenTreeData.value[i])
      }
    }

    return result
  }

  const getChildrenExpanded = (node: InnerTreeNode) => {
    const result: InnerTreeNode[] = []

    const startIndex = expandedTreeData.value.findIndex(
      item => item.id === node.id
    )

    for (
      let i = startIndex + 1;
      i < expandedTreeData.value.length &&
      expandedTreeData.value[i].level > node.level;
      i++
    ) {
      result.push(expandedTreeData.value[i])
    }

    return result
  }

  const setChecked = (node: InnerTreeNode) => {
    const parentNode = flattenTreeData.value.find(
      item => item.id === node.parentId
    )

    if (!parentNode) return

    const siblingNodes = getChildren(parentNode, false)
    const checkedSiblingNodes = siblingNodes.filter(item => item.checked)
    parentNode.checked = siblingNodes.length === checkedSiblingNodes.length

    if (parentNode.parentId) setChecked(parentNode)
  }

  const toggleCheckNode = (node: InnerTreeNode) => {
    // 全选
    node.checked = !node.checked

    getChildren(node).forEach(child => {
      child.checked = node.checked
    })

    // 反选
    setChecked(node)
  }

  return {
    flattenTreeData,
    expandedTreeData,
    toggleExpand,
    getChildren,
    getChildrenExpanded,
    toggleCheckNode
  }
}
