import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { MainLayout } from './layouts/MainLayout';
import { Splash } from './pages/Splash';
import { Catalog } from './pages/Catalog';
import { LegendDetail } from './pages/LegendDetail';
import { Comments } from './pages/Comments';
import { Payment } from './pages/Payment';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    element: (
      <AuthProvider>           
        <MainLayout>           
          <Outlet />     
        </MainLayout>
      </AuthProvider>
    ),
    children: [
      {
        path: "catalog",
        Component: Catalog,
      },
      {
        path: "legend/:id",
        Component: LegendDetail,
      },
      {
        path: "legend/:id/comments",
        Component: Comments,
      },
      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "*",
    element: <div className="min-h-screen flex items-center justify-center text-xl">
      <p>404 - Página no encontrada</p>
    </div>,
  },
]);