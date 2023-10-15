import React from "react";

export const TableTickets = ({data}) => {
    return (
        <>
            <table className="table table-sm table-striped table-hover">
                <thead>
                    <tr>
                        <th className="" scope="col">Code</th>
                        <th className="" scope="col">Name</th>
                        <th className="" scope="col">Max purchase count</th>
                        <th className="" scope="col">Purchased count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({code, name, maxPurchaseCount, purchaseCount}) => {
                            return(
                                    <tr key={code}>
                                        <td className="text-center" scope="row">{code}</td>
                                        <td className="text-center">{name}</td>
                                        <td className="text-center">{maxPurchaseCount}</td>
                                        <td className="text-center">{maxPurchaseCount-purchaseCount}</td>
                                    </tr>
                            )
                    })
                    
                    }
                </tbody>
            </table>
        </>
    )
}