import { computed, Ref, ref, unref } from 'vue'
import { generateInnerTreeData } from '../utils'
import { InnerTreeNode, TreeNode } from '../tree-types'

export function useTree(data: Ref<TreeNode[]> | TreeNode[]) {
  const flattenTree = ref(generateInnerTreeData(unref(data)))

  const toggleExpand = (node: InnerTreeNode) => {
    /* const currNode = flattenTree.value.find(item => item.id === node.id)
    if (currNode) {
      currNode.expanded = !currNode.expanded
    } */
    node.expanded = !node.expanded
  }

  const treeData = computed(() => {
    let excludeNodes: InnerTreeNode[] = []
    const result = []

    for (const node of flattenTree.value) {
      if (excludeNodes.includes(node)) continue

      if (node.expanded !== true) {
        excludeNodes = getChildren(node)
      }

      result.push(node)
    }
    return result
  })

  const getChildren = (node: InnerTreeNode) => {
    const result = []

    const startIndex = flattenTree.value.findIndex(item => item.id === node.id)

    for (
      let i = startIndex + 1;
      i < flattenTree.value.length && flattenTree.value[i].level > node.level;
      i++
    ) {
      result.push(flattenTree.value[i])
    }

    return result
  }

  return {
    flattenTree,
    treeData,
    toggleExpand,
    getChildren
  }
}
