import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from "./auth";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";

import { PurchaseRouter } from "./purchase";
import { TicketsRouter } from "./tickets";
import { LoginPage } from "./auth";
import './App.css'

export default function App (){

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              <Route path="tickets/*" element={
                <PrivateRoute>
                  <TicketsRouter />
                </PrivateRoute>
              } />
              <Route path="purchase/*" element={
                <PublicRoute>
                  <PurchaseRouter />
                </PublicRoute>
              } />

              <Route path="/*" element={<Navigate to="tickets" />} />

            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}