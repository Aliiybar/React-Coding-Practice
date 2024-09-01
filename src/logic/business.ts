import Node from "../interfaces/NodeType.ts";
import {IBusinessData} from "../interfaces/IBusinessData.ts";

const GetTreeNodes = (data:IBusinessData[] ):Node[] => {
    let nodes: Node[] = []
    const firstLevel = [...new Set(data.map(obj => obj.BCAP1))].sort()
    firstLevel.forEach(f => {
        nodes.push({nodeName: f, children: [], level:"1"})
        const secondLevel = [...new Set(data.map(obj => {
            if (obj.BCAP1 == f) return obj.BCAP2
        }))].sort()
        secondLevel.forEach(s => {
            if(s) {
                const secondLevelNode: Node = {nodeName: s, children: [], level:"2"}
                nodes.find(k => k.nodeName == f).children.push(secondLevelNode)
                const thirdLevel = [...new Set(data.map(obj => {
                    if (obj.BCAP2 == s) return obj.BCAP3
                }))].sort()
                thirdLevel.forEach(t => {
                    if (t) {
                        const thirdLevelNode: Node = {nodeName: t, children: [], level:"3"}
                        nodes.find(k => k.nodeName == f).children.find(c => c.nodeName == s).children.push(thirdLevelNode)
                    }
                })
            }
        })
    })
    return nodes
}

const businessLogic = {
    GetTreeNodes,
}

export default businessLogic