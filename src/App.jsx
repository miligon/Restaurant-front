import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { PurchaseRouter } from "./purchase";
import { TicketsRouter } from "./tickets";
import { LoginPage } from "./auth";
import './App.css'

export default function App (){

  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="tickets/*" element={<TicketsRouter />} />
            <Route path="purchase/*" element={<PurchaseRouter />} />

            <Route path="/" element={<Navigate to="/tickets" />} />

          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}