import { Route, Routes } from 'react-router-dom';

import { PurchasePage } from '../pages';



export const PurchaseRouter = () => {
  return (
    <>
        <Routes>
            <Route path=":ticketCode" element={<PurchasePage />} />
        </Routes>
    </>
  )
}