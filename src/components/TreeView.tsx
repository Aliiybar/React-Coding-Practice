import Node from '../interfaces/NodeType'
import TreeNode from "./TreeNode.tsx";

type ComponentProps = {
    selectApplicationHandler: Function
    nodes: Node[]
}

const TreeView = ({nodes, selectApplicationHandler}: ComponentProps) => {

    return (<>
            <ul>
                {nodes.map(node => (
                    <TreeNode node={node} key={node.nodeName} selectApplicationHandler={selectApplicationHandler}/>))}
            </ul>
        </>)

}

export default TreeView
