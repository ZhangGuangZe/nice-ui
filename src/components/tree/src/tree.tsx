import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { useTree } from './composables/use-tree'

const NODE_INDENT = 24
const NODE_HEIGHT = 32

export default defineComponent({
  name: 'NiTree',
  props: treeProps,
  setup(props: TreeProps) {
    const { data, showLine } = toRefs(props)
    const { expandedTreeData, toggleExpand, getChildrenExpanded } =
      useTree(data)

    return () => (
      <div class="ni-tree">
        {expandedTreeData.value.map(treeNode => {
          const { label, isLeaf, level, expanded } = treeNode
          return (
            <div
              class="ni-tree-node hover:bg-slate-50 relative leading-8"
              style={{ paddingLeft: `${(level - 1) * NODE_INDENT}px` }}
            >
              {/* 连接线 */}
              {!isLeaf && expanded && showLine.value && (
                <span
                  class="absolute w-px bg-slate-300"
                  style={{
                    height: `${
                      NODE_HEIGHT * getChildrenExpanded(treeNode).length
                    }px`,
                    left: `${NODE_INDENT * (level - 1) + 8}px`,
                    top: `${NODE_HEIGHT}px`
                  }}
                ></span>
              )}
              {/* 折叠图标 */}
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
