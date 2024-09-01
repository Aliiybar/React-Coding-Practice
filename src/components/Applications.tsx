import {IBusinessData} from "../interfaces/IBusinessData.ts";
import ApplicationBox from "./ApplicationBox.tsx";

type ComponentProps = {
    data: IBusinessData[];
}

function Applications({data}: ComponentProps) {


    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {data.map(d => (<ApplicationBox data={d}/>))}
        </div>
    )
}


export default Applications