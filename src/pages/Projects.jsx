import React, {Fragment, useEffect, useState} from "react"
import {useStateContext} from "../contexts/ContextProvider"

import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject} from "@syncfusion/ej2-react-grids"

import {ordersData, contextMenuItems, ordersGrid} from "../data/dummy"
import {Header} from "../components"

const Orders = () => {
    const editing = {allowDeleting: true, allowEditing: true}
    const {baseurl} = useStateContext()

    const [loading, setLoading] = useState(false)

    const getProjects = () => {
        setLoading(true)
        let getUrl = new URL(`${baseurl}/management/projects`)
        fetch(getUrl, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false)
            })
            .catch((e) => {
                console.error(e)
                setLoading(false)
            })
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl projects-page">
            <Header category="Page" title="Projects" />
            {loading ? (
                <div className="loading-page">
                    <div className="flex items-center justify-center h-screen bg-gray-100">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                </div>
            ) : (
                <Fragment>
                    <GridComponent
                        id="gridcomp"
                        dataSource={ordersData}
                        allowPaging
                        allowSorting
                        allowExcelExport
                        allowPdfExport
                        contextMenuItems={contextMenuItems}
                        editSettings={editing}
                    >
                        <ColumnsDirective>
                            {ordersGrid.map((item, index) => (
                                <ColumnDirective key={index} {...item} />
                            ))}
                        </ColumnsDirective>
                        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
                    </GridComponent>
                </Fragment>
            )}
        </div>
    )
}
export default Orders
