import { useState } from "react";
import Node from '../interfaces/NodeType'
import TreeView from "./TreeView.tsx";

type ComponentProps = {
    selectApplicationHandler: Function
    node: Node
}

export default function TreeNode({ node, selectApplicationHandler }: ComponentProps) {
    const { nodeName, children, level } = node;

    const [showChildren, setShowChildren] = useState(false);

    const handleClick = () => {
        selectApplicationHandler(nodeName, level)
        setShowChildren(!showChildren);
    };
    return (
        <>
            <div onClick={handleClick} className={showChildren ? 'caret caretDown' : 'caret'}>
                <span>{nodeName}</span>
            </div>
            <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
                {showChildren && <TreeView nodes={children} selectApplicationHandler={selectApplicationHandler} />}
            </ul>
        </>
    );
}