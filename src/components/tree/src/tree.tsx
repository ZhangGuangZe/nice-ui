import { computed, defineComponent, ref, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { generateInnerTreeData } from './utils'
import { InnerTreeNode } from './tree-types'

export default defineComponent({
  name: 'NiTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const flatData = ref(generateInnerTreeData(data.value))
    console.log(flatData.value)

    const handleExpand = (node: InnerTreeNode) => {
      /* const currNode = flatData.value.find(item => item.id === node.id)
      if (currNode) {
        currNode.expanded = !currNode.expanded
      } */
      node.expanded = !node.expanded
    }

    const treeData = computed(() => {
      let excludeNodes: InnerTreeNode[] = []
      const result = []

      for (const node of flatData.value) {
        if (excludeNodes.includes(node)) continue

        if (node.expanded !== true) {
          excludeNodes = getChildren(node)
        }

        result.push(node)
      }
      console.log('result', result)
      return result
    })

    const getChildren = (node: InnerTreeNode) => {
      const result = []

      const startIndex = flatData.value.findIndex(item => item.id === node.id)

      for (
        let i = startIndex + 1;
        i < flatData.value.length && flatData.value[i].level > node.level;
        i++
      ) {
        result.push(flatData.value[i])
      }

      return result
    }

    return () => (
      <div class="ni-tree">
        {treeData.value.map(treeNode => {
          const { label, isLeaf, level, expanded } = treeNode
          return (
            <div
              class="ni-tree-node"
              style={{ paddingLeft: `${(level - 1) * 24}px` }}
            >
              {isLeaf ? (
                <span style={{ display: 'inline-block', width: '18px' }}></span>
              ) : (
                <svg
                  onClick={() => handleExpand(treeNode)}
                  style={{
                    width: '18px',
                    height: '18px',
                    display: 'inline-block',
                    cursor: 'pointer',
                    transform: expanded ? 'rotate(90deg)' : ''
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M384 192v640l384-320.064z"
                  ></path>
                </svg>
              )}
              {label}
            </div>
          )
        })}
      </div>
    )
  }
})
