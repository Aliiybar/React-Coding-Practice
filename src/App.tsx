import './App.css'
import {useEffect, useState} from 'react'
import {IBusinessData} from './interfaces/IBusinessData'
import getBusinessData from './services/business.service'
import TreeView from './components/TreeView.tsx'
import businessLogic from "./logic/business";
import RangeSlider from "./components/RangeSlider";
import SelectedApplication from './interfaces/SelectedApplication'
import "./components/RangeSlider.css"
import SliderValueType from "./interfaces/SliderValueType.ts";
import Applications from "./components/Applications.tsx";


const App = () => {
    const [businessData, setBusinessData] = useState<IBusinessData[]>([])
    const [applicationData, setApplicationData] = useState<IBusinessData[]>([])
    const [sliderValue, setSliderValue] = useState<SliderValueType>({min: 0, max: 100})
    const [minMaxValue, setMinMaxValue] = useState<SliderValueType>({min: 0, max: 100})
    const [application, setApplication] = useState<SelectedApplication>()

    const setSelectedApplication = (app: string, level: string) => setApplication({nodeName: app, level: level})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBusinessData();
            setBusinessData(response)
            const min = Math.min(...response.map(m => m.spend))
            const max = Math.max(...response.map(m => m.spend))
            setMinMaxValue({min, max})
            setSliderValue({min, max})
        }
        fetchData()
    }, [])

    useEffect(() => {
        const applications = businessData.filter(f => f.spend >= sliderValue.min && f.spend <= sliderValue.max && (f.BCAP1 == application?.nodeName || f.BCAP2 == application?.nodeName || f.BCAP3 == application?.nodeName))

        setApplicationData(applications)
    }, [application, sliderValue])

    const treeData = businessLogic.GetTreeNodes(businessData);

    return (<>
            <h1>React Coding Exercise</h1>
            <div style={{display: "flex", justifyContent: "flex-start",}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div>
                        <h2>Navigation</h2>
                        <TreeView nodes={treeData} selectApplicationHandler={setSelectedApplication}></TreeView>
                    </div>
                    <div>
                        <div>
                            <h2>Filters</h2>
                            Spending
                            <RangeSlider min={minMaxValue.min} max={minMaxValue.max} step={5} value={sliderValue}
                                         onChange={setSliderValue}/>
                            <p>$ <span>{sliderValue.min}</span></p>
                            <p>$ <span>{sliderValue.max}</span></p>
                        </div>
                    </div>
                </div>
                <div style={{maxWidth: "800px"}}>
                    <Applications data={applicationData}></Applications>
                </div>
            </div>
        </>)
}

export default App
