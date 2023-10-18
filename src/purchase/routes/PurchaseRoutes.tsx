import { Navigate, Route, Routes } from 'react-router-dom'

import { PurchasePage } from '../pages'

export const PurchaseRouter = () => {
  return (
    <>
      <Routes>
        <Route path=':ticketCode' element={<PurchasePage />} />
        <Route path='/' element={<Navigate to='invalid' />} />
      </Routes>
    </>
  )
}
