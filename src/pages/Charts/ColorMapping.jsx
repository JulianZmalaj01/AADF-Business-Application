import React from "react"
import {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    ColumnSeries,
    Category,
    Tooltip,
    Legend,
    RangeColorSettingsDirective,
    RangeColorSettingDirective,
} from "@syncfusion/ej2-react-charts"
import {useNavigate} from "react-router-dom"

import {AiOutlineArrowLeft} from "react-icons/ai"
import {colorMappingData1, colorMappingData2, colorMappingData3, ColorMappingPrimaryXAxis, ColorMappingPrimaryYAxis, rangeColorMapping, ordersData} from "../../data/dummy"
import {ChartsHeader} from "../../components"
import {useStateContext} from "../../contexts/ContextProvider"

const ColorMapping = () => {
    const {currentMode, currentColor} = useStateContext()
    const navigate = useNavigate()
    let projectId = window.location.pathname.split("/color-mapping/") ? window.location.pathname.split("/color-mapping/")[1] : 0

    return (
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl color-mapping">
            <div onClick={() => navigate(-1)} className="go-back">
                <div style={{background: currentColor}}>
                    <AiOutlineArrowLeft />
                    Go Back
                </div>
            </div>
            <ChartsHeader category="Color Mappping" title={ordersData.find((item) => item?.OrderID == projectId)?.OrderItems || "[project-name]"} />
            <div className="w-full">
                <ChartComponent
                    id="charts"
                    primaryXAxis={ColorMappingPrimaryXAxis}
                    primaryYAxis={ColorMappingPrimaryYAxis}
                    chartArea={{border: {width: 0}}}
                    legendSettings={{mode: "Range", background: "white"}}
                    tooltip={{enable: true}}
                    background={currentMode === "Dark" ? "#33373E" : "#fff"}
                >
                    <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={projectId == 1 ? colorMappingData1[0] : projectId == 2 ? colorMappingData2[0] : colorMappingData3[0]}
                            name=""
                            xName="x"
                            yName="y"
                            type="Column"
                            cornerRadius={{
                                topLeft: 10,
                                topRight: 10,
                            }}
                        />
                    </SeriesCollectionDirective>
                    <RangeColorSettingsDirective>
                        {rangeColorMapping.map((item, index) => (
                            <RangeColorSettingDirective key={index} {...item} />
                        ))}
                    </RangeColorSettingsDirective>
                </ChartComponent>
            </div>
        </div>
    )
}

export default ColorMapping
