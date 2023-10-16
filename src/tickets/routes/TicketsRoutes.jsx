import { Route, Routes } from 'react-router-dom';

import { TicketDetailPage, TicketPage } from '../pages';



export const TicketsRouter = () => {
  return (
    <>
        <Routes>
            <Route path=":id" element={
              <TicketDetailPage />
              } />
            <Route path="/" element={<TicketPage />} />
        </Routes>
    </>
  )
}