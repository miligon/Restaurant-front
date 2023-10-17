import React from "react";
import { Link, useParams } from "react-router-dom";

export const TableTickets = ({data}) => {
    const { restaurant } = useParams();
    return (
        <>
            <table className="table table-sm table-striped table-hover">
                <thead>
                    <tr>
                        <th className="" scope="col">Code</th>
                        <th className="" scope="col">Name</th>
                        <th className="" scope="col">Purchased count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(({code, name, purchase_count}) => {
                            return(
                                    <tr key={code}>
                                        <td className="text-center" scope="row">
                                            <Link to={`/${restaurant}/tickets/${code}`}>
                                                {code}
                                            </Link>
                                        </td>
                                        <td className="text-center">{name}</td>
                                        <td className="text-center">{purchase_count}</td>
                                    </tr>
                            )
                    })
                    
                    }
                </tbody>
            </table>
        </>
    )
}