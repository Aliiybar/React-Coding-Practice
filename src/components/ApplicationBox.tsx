import {IBusinessData} from "../interfaces/IBusinessData"
import "./ApplicationBox.css"

type ComponentProps = {
    data: IBusinessData;
}


function ApplicationBox({data}: ComponentProps) {

    return (
        <div className="app-box" key={data.id}>
            <h3> {data.name}</h3>
            <span>Total spend : ${data.spend}</span>
        </div>

    )
}


export default ApplicationBox