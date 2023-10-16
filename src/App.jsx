import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider } from "./auth";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";

import { PurchaseRouter } from "./purchase";
import { TicketsRouter } from "./tickets";
import { LoginPage } from "./auth/pages/LoginPage";
import { LogoutPage } from "./auth/pages/LogoutPage";
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
              <Route path="logout" element={
                  <LogoutPage />
              } />
              <Route path="tickets/*" element={
                <PrivateRoute>
                  <TicketsRouter />
                </PrivateRoute>
              } />
              <Route path="purchase/*" element={
                  <PurchaseRouter />
              } />

              <Route path="/*" element={<Navigate to="tickets" />} />

            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}