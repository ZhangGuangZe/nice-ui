import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { useTree } from './composables/use-tree'

export default defineComponent({
  name: 'NiTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const { treeData, toggleExpand } = useTree(data)

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
                  onClick={() => toggleExpand(treeNode)}
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
